import { register } from 'node:module';
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';

register('./tsx-loader.mjs', import.meta.url);
const { PhotoCarousel } = await import('../src/components/PhotoCarousel.tsx');
const { ServicesSection } = await import('../src/components/ServicesSection.tsx');
const { BookingModal } = await import('../src/components/BookingModal.tsx');
const { ConocemeSection } = await import('../src/components/ConocemeSection.tsx');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://millergreiseland.com' });
Object.assign(globalThis, {
  window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
  Image: dom.window.Image, IS_REACT_ACT_ENVIRONMENT: true,
});

const photos = [
  { src: '/uno.webp', alt: 'Primera fotografía', width: 900, height: 1200 },
  { src: '/dos.webp', alt: 'Segunda fotografía', width: 900, height: 1200 },
  { src: '/tres.webp', alt: 'Tercera fotografía', width: 900, height: 1200 },
];
let container, root;
beforeEach(() => { container = document.createElement('div'); document.body.append(container); root = createRoot(container); });
afterEach(async () => { await act(() => root.unmount()); container.remove(); });
async function render(props = {}) { await act(() => root.render(createElement(PhotoCarousel, { images: photos, label: 'Avyna', ...props }))); }
function button(label) { return container.querySelector(`button[aria-label="${label}"]`); }
async function click(element) { assert.ok(element, 'El control debe existir'); await act(() => element.click()); }
function shown() { return container.querySelector('img')?.getAttribute('src'); }

test('avanzar y retroceder muestra cada foto y regresa al inicio sin omitir imágenes', async () => {
  await render();
  assert.equal(shown(), '/uno.webp');
  assert.equal(container.querySelectorAll('img').length, 1, 'No descarga todos los elementos al montar');
  await click(button('Siguiente fotografía de Avyna')); assert.equal(shown(), '/dos.webp');
  await click(button('Siguiente fotografía de Avyna')); assert.equal(shown(), '/tres.webp');
  await click(button('Siguiente fotografía de Avyna')); assert.equal(shown(), '/uno.webp');
  await click(button('Fotografía anterior de Avyna')); assert.equal(shown(), '/tres.webp');
});

test('los indicadores eligen una fotografía y comunican cuál está activa', async () => {
  await render(); await click(button('Ver fotografía 2 de Avyna'));
  assert.equal(shown(), '/dos.webp');
  assert.equal(button('Ver fotografía 2 de Avyna').getAttribute('aria-current'), 'true');
  assert.notEqual(button('Ver fotografía 1 de Avyna').getAttribute('aria-current'), 'true');
});

test('flechas, Inicio y Fin permiten recorrer el carrusel con teclado', async () => {
  await render(); const region = container.querySelector('[aria-roledescription="carrusel"]');
  for (const [key, src] of [['ArrowRight', '/dos.webp'], ['End', '/tres.webp'], ['Home', '/uno.webp'], ['ArrowLeft', '/tres.webp']]) {
    await act(() => region.dispatchEvent(new window.KeyboardEvent('keydown', { key, bubbles: true })));
    assert.equal(shown(), src);
  }
});

test('el gesto horizontal cambia la foto y el desplazamiento vertical no la cambia', async () => {
  await render(); const region = container.querySelector('[aria-roledescription="carrusel"]');
  async function swipe(start, end) {
    for (const [type, point] of [['pointerdown', start], ['pointerup', end]]) {
      const event = new window.MouseEvent(type, { clientX: point[0], clientY: point[1], bubbles: true });
      Object.defineProperty(event, 'pointerType', { value: 'touch' });
      await act(() => region.dispatchEvent(event));
    }
  }
  await swipe([200, 100], [50, 110]); assert.equal(shown(), '/dos.webp');
  await swipe([200, 100], [190, 260]); assert.equal(shown(), '/dos.webp');
});

test('una foto individual permite ampliación y no presenta controles de carrusel', async () => {
  await render({ images: photos.slice(0, 1) });
  assert.equal(shown(), '/uno.webp');
  assert.equal(button('Siguiente fotografía de Avyna'), null);
  assert.ok(button('Ampliar fotografía de Avyna'));
});

test('dos carruseles conservan su selección de forma independiente', async () => {
  await act(() => root.render(createElement('div', null,
    createElement(PhotoCarousel, { images: photos, label: 'Avyna' }),
    createElement(PhotoCarousel, { images: photos, label: 'Tintes' }),
  )));
  await click(button('Siguiente fotografía de Avyna'));
  assert.deepEqual([...container.querySelectorAll('img')].map(image => image.getAttribute('src')), ['/dos.webp', '/uno.webp']);
});

test('el acceso de Tintes incluye Color y Signature Blondes y conserva el filtro individual', async () => {
  await act(() => root.render(createElement(ServicesSection, { onSelectService() {} })));
  const findButton = text => [...container.querySelectorAll('button')].find(b => b.textContent.includes(text));
  await click(findButton('Ver color y rubios'));
  assert.equal(container.querySelectorAll('[data-service-id]').length, 6);
  assert.ok(container.querySelector('[data-service-id="balayage-rubio"]'));
  assert.ok(container.querySelector('[data-service-id="color-completo"]'));
  await click([...container.querySelectorAll('button')].find(b => b.textContent === 'Color'));
  assert.equal(container.querySelectorAll('[data-service-id]').length, 3);
  assert.equal(container.querySelector('[data-service-id="balayage-rubio"]'), null);
});

test('los cortes retirados no se ofrecen en el catálogo ni en la solicitud de cita', () => {
  for (const component of [
    createElement(ServicesSection, { onSelectService() {} }),
    createElement(BookingModal, { isOpen: true, onClose() {}, initialService: null }),
  ]) {
    const page = new JSDOM(renderToStaticMarkup(component));
    const text = page.window.document.body.textContent;
    assert.doesNotMatch(text, /Corte Signature|Gentlemen.s Cut|Signature Cuts/i);
    assert.match(text, /Retoque de Color/);
    assert.match(text, /Balayage Rubio/);
    assert.match(text, /Bajada de Extensiones/);
    page.window.close();
  }
});

test('Sobre mí muestra el retrato y las tres fotos de formación sin abrir la historia', async () => {
  await act(() => root.render(createElement(ConocemeSection)));
  const carousel = container.querySelector('[aria-label="Miller Greiseland y formación internacional"]');
  assert.ok(carousel, 'El carrusel debe estar en la presentación de Sobre mí');
  assert.equal(carousel.closest('details'), null, 'Las fotos no deben depender del desplegable');
  assert.equal(carousel.querySelector('img').getAttribute('src'), '/images/studio/conoceme.webp');
  for (const src of ['/images/studio/formacion-1.webp', '/images/studio/formacion-2.webp', '/images/studio/formacion-3.webp']) {
    await click(button('Siguiente fotografía de Miller Greiseland y formación internacional'));
    assert.equal(carousel.querySelector('img').getAttribute('src'), src);
    assert.equal(carousel.querySelector('img').style.objectFit, 'contain', 'La foto completa conserva visibles a las personas');
    assert.equal(container.querySelector('details').open, false);
  }
});
