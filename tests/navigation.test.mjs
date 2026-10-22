import { register } from 'node:module';
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';

register('./tsx-loader.mjs', import.meta.url);
const { Navbar } = await import('../src/components/Navbar.tsx');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://millergreiseland.com' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });

let container, root;
beforeEach(() => { container = document.createElement('div'); document.body.append(container); root = createRoot(container); });
afterEach(async () => { await act(() => root.unmount()); container.remove(); });
async function render(props = {}) { await act(() => root.render(createElement(Navbar, props))); }
function trigger(prefix = 'desktop') {
  const button = container.querySelector(`button[aria-controls="${prefix}-services-panel"]`);
  assert.ok(button, 'Servicios debe ser un control desplegable');
  return button;
}
function panel(prefix = 'desktop') { return container.querySelector(`#${prefix}-services-panel`); }
async function click(element) { assert.ok(element); await act(() => element.click()); }

test('Servicios comienza cerrado y conserva enlaces rastreables al catálogo y a extensiones', async () => {
  await render();
  assert.equal(trigger().getAttribute('aria-expanded'), 'false');
  assert.equal(panel().hidden, true);
  assert.equal(panel().querySelector('a').getAttribute('href'), '#servicios');
  assert.ok(panel().querySelector('a[href="/extensiones-cabello-chetumal"]'));
});

test('pulsar Servicios abre la lista y una segunda pulsación la cierra', async () => {
  await render(); await click(trigger());
  assert.equal(trigger().getAttribute('aria-expanded'), 'true');
  assert.equal(panel().hidden, false);
  await click(trigger());
  assert.equal(panel().hidden, true);
});

test('Escape cierra la lista y devuelve el foco a Servicios', async () => {
  await render(); await click(trigger());
  const link = panel().querySelector('a');
  await act(() => link.focus());
  await act(() => link.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  assert.equal(panel().hidden, true);
  assert.equal(document.activeElement, trigger());
});

test('pulsar fuera de la lista la cierra', async () => {
  await render(); await click(trigger());
  await act(() => document.body.dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true })));
  assert.equal(panel().hidden, true);
});

test('salir de la lista con el foco la cierra', async () => {
  await render(); await click(trigger());
  await act(() => panel().querySelector('a').focus());
  await act(() => container.querySelector('a[aria-label="Miller Greiseland Studio · Inicio"]').focus());
  assert.equal(panel().hidden, true);
});

test('seleccionar extensiones en móvil cierra también el menú principal', async () => {
  await render(); await click(container.querySelector('#mobile-menu-trigger'));
  await click(trigger('mobile'));
  assert.equal(panel('mobile').hidden, false);
  const link = panel('mobile').querySelector('a[href="/extensiones-cabello-chetumal"]');
  link.addEventListener('click', event => event.preventDefault(), { once: true });
  await click(link);
  assert.equal(container.querySelector('#mobile-menu-drawer'), null);
  assert.equal(container.querySelector('#mobile-menu-trigger').getAttribute('aria-expanded'), 'false');
});

test('desde una página interna Ver todos los servicios apunta a la portada', async () => {
  await render({ sectionLinkPrefix: '/' });
  assert.equal(panel().querySelector('a').getAttribute('href'), '/#servicios');
  await click(container.querySelector('#mobile-menu-trigger'));
  assert.equal(panel('mobile').querySelector('a').getAttribute('href'), '/#servicios');
});

test('Solicitar valoración mantiene el enlace a WhatsApp después de usar Servicios', async () => {
  await render();
  await click(trigger()); await click(trigger());
  const valuation = [...container.querySelectorAll('a')].find(a => a.textContent.trim() === 'Solicitar valoración');
  assert.ok(valuation);
  const url = new URL(valuation.href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/529831373038');
  assert.match(url.searchParams.get('text'), /valoración en el salón/);
});
