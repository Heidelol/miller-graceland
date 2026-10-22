import { register } from 'node:module';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { act, createElement, StrictMode } from 'react';

register('./tsx-loader.mjs', import.meta.url);
const { App } = await import('../src/App.tsx');

test('la portada entrega contenido y valoración utilizables sin esperar a JavaScript', () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const document = new JSDOM(html).window.document;
  assert.equal(document.querySelectorAll('h1').length, 1, 'La portada llega vacía antes de JavaScript');
  assert.match(document.querySelector('h1').textContent, /El arte de sublimar/);
  assert.equal(document.querySelectorAll('[data-service-id]').length, 9);
  const valuation = document.querySelector('main a[href^="https://wa.me/"]');
  assert.ok(valuation, 'La valoración debe funcionar desde el HTML inicial');
  assert.equal(new URL(valuation.href).pathname, '/529831373038');
  assert.ok(document.querySelector('main img[fetchpriority="high"]'));
});


for (const [path, heading] of [['/', /El arte de sublimar/], ['/extensiones-cabello-chetumal', /Extensiones de cabello en Chetumal/]]) {
  test(`hidratar ${path} conserva el contenido inicial y activa el menú sin errores`, async () => {
    const file = path === '/' ? '../dist/index.html' : `../dist${path}/index.html`;
    const dom = new JSDOM(readFileSync(new URL(file, import.meta.url), 'utf8'), { url: `https://millergreiseland.com${path}` });
    Object.assign(globalThis, {
      window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
      Image: dom.window.Image, IS_REACT_ACT_ENVIRONMENT: true,
    });
    const container = document.querySelector('#root');
    const originalHeading = container.querySelector('h1');
    assert.ok(originalHeading, 'Falta el contenido inicial que se debe hidratar');
    const hydrationErrors = [];
    let root;
    try {
      const { mountApp } = await import('../src/lib/mountApp.ts');
      await act(() => { root = mountApp(container, createElement(StrictMode, null, createElement(App)), path, { onRecoverableError: error => hydrationErrors.push(error.message) }); });
      assert.deepEqual(hydrationErrors, []);
      assert.equal(container.querySelector('h1'), originalHeading, 'La hidratación no debe reconstruir el contenido');
      assert.match(originalHeading.textContent, heading);
      const menu = container.querySelector('#mobile-menu-trigger');
      await act(() => menu.click());
      assert.equal(menu.getAttribute('aria-expanded'), 'true');
      assert.ok(container.querySelector('#mobile-menu-drawer'));
    } finally {
      if (root) await act(() => root.unmount());
      dom.window.close();
      delete globalThis.window; delete globalThis.document; delete globalThis.HTMLElement; delete globalThis.Image;
    }
  });
}


test('si el HTML pertenece a otra ruta, el arranque muestra la página solicitada sin errores de hidratación', async () => {
  const dom = new JSDOM(readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8'), { url: 'https://millergreiseland.com/extensiones-cabello-chetumal' });
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Image: dom.window.Image, IS_REACT_ACT_ENVIRONMENT: true });
  const errors = [];
  let root;
  try {
    const { mountApp } = await import('../src/lib/mountApp.ts');
    await act(() => { root = mountApp(document.querySelector('#root'), createElement(App), window.location.pathname, { onRecoverableError: error => errors.push(error.message) }); });
    assert.match(document.querySelector('h1').textContent, /Extensiones de cabello en Chetumal/);
    assert.deepEqual(errors, []);
  } finally {
    if (root) await act(() => root.unmount());
    dom.window.close();
    delete globalThis.window; delete globalThis.document; delete globalThis.HTMLElement; delete globalThis.Image;
  }
});


test('el retrato inicial permanece visible si carga antes de activar la página', async () => {
  const dom = new JSDOM(readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8'), { url: 'https://millergreiseland.com/#conoceme' });
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Image: dom.window.Image, IS_REACT_ACT_ENVIRONMENT: true });
  let root;
  try {
    const portrait = document.querySelector('.photo-carousel-fade');
    assert.ok(portrait);
    assert.equal(portrait.dataset.ready, 'true', 'El retrato debe ser visible incluso antes de JavaScript');
    Object.defineProperties(portrait, { complete: { value: true }, naturalWidth: { value: 1200 } });
    const { mountApp } = await import('../src/lib/mountApp.ts');
    await act(() => { root = mountApp(document.querySelector('#root'), createElement(StrictMode, null, createElement(App)), '/'); });
    assert.equal(document.querySelector('.photo-carousel-fade'), portrait);
    assert.equal(portrait.dataset.ready, 'true', 'No debe depender de recibir otro evento load');
    const carousel = portrait.closest('.photo-carousel');
    const next = [...carousel.querySelectorAll('button')].find(button => button.getAttribute('aria-label')?.startsWith('Siguiente'));
    await act(() => next.click());
    const following = carousel.querySelector('.photo-carousel-fade');
    assert.notEqual(following.src, portrait.src);
    assert.equal(following.dataset.ready, 'false');
    await act(() => following.dispatchEvent(new window.Event('load')));
    assert.equal(following.dataset.ready, 'true', 'Las fotos siguientes conservan su transición al cargar');
  } finally {
    if (root) await act(() => root.unmount());
    dom.window.close();
    delete globalThis.window; delete globalThis.document; delete globalThis.HTMLElement; delete globalThis.Image;
  }
});
