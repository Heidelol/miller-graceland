import { register } from 'node:module';
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';

register('./tsx-loader.mjs', import.meta.url);
const { App } = await import('../src/App.tsx');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://millergreiseland.com/' });
Object.assign(globalThis, {
  window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
  Image: dom.window.Image, IS_REACT_ACT_ENVIRONMENT: true,
});
const message = 'Hola, Miller. Vi tu página y me gustaría agendar una cita para una valoración en el salón. ¿Qué disponibilidad tienes?';
let container, root, commands;
beforeEach(() => {
  window.history.replaceState(null, '', '/');
  window.localStorage.clear();
  commands = [];
  window.gtag = (...args) => commands.push(args);
  container = document.createElement('div'); document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => { await act(() => root.unmount()); container.remove(); });
async function render() { await act(() => root.render(createElement(App))); }
function valuationLinks(scope) { return [...scope.querySelectorAll('a')].filter(a => a.textContent.includes('Solicitar valoración')); }
function checkDestination(link) {
  assert.ok(link, 'La valoración debe ser un enlace directo');
  const url = new URL(link.href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/529831373038');
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(link.target, '_blank');
  assert.match(link.rel, /noopener/);
}
async function click(link) {
  assert.ok(link);
  link.addEventListener('click', event => event.preventDefault(), { once: true });
  await act(() => link.click());
}

test('la portada abre una valoración en un clic sin formulario, reserva local ni cobro', async () => {
  await render();
  const link = valuationLinks(container.querySelector('main > section'))[0];
  checkDestination(link);
  await click(link);
  assert.equal(container.querySelector('input, textarea, [role="dialog"]'), null);
  assert.equal(window.localStorage.getItem('mg_admin_demo_v1'), null);
  assert.deepEqual(commands, [['event', 'whatsapp_click', {
    click_location: 'hero_valuation', service_name: 'Valoración en salón', contact_intent: 'inquiry',
  }]]);
});

test('los nueve servicios permiten pedir la misma valoración sin preseleccionar un tratamiento', async () => {
  await render();
  const services = [...container.querySelectorAll('[data-service-id]')];
  assert.equal(services.length, 9);
  for (const service of services) {
    const links = valuationLinks(service);
    assert.equal(links.length, 1);
    checkDestination(links[0]);
  }
});

test('todos los accesos públicos a WhatsApp comparten el mensaje de valoración', async () => {
  await render();
  const links = [...container.querySelectorAll('a[href^="https://wa.me/"]')];
  assert.ok(links.length > 0);
  links.forEach(checkDestination);
});

test('la valoración móvil cierra el menú y registra un solo clic de contacto', async () => {
  await render();
  await click(container.querySelector('#mobile-menu-trigger'));
  const link = valuationLinks(container.querySelector('#mobile-menu-drawer'))[0];
  checkDestination(link);
  await click(link);
  assert.equal(container.querySelector('#mobile-menu-drawer'), null);
  assert.deepEqual(commands.map(command => [command[1], command[2].click_location]), [['whatsapp_click', 'navbar_mobile_valuation']]);
});

test('extensiones conserva su contenido y ofrece el mismo contacto sin cuestionario', async () => {
  window.history.replaceState(null, '', '/extensiones-cabello-chetumal');
  await render();
  assert.match(container.querySelector('h1').textContent, /Extensiones de cabello en Chetumal/);
  assert.equal(container.querySelectorAll('figure[data-ai-illustration]').length, 2);
  const links = valuationLinks(container.querySelector('main'));
  assert.equal(links.length, 3);
  links.forEach(checkDestination);
  await click(links[0]);
  assert.equal(container.querySelector('input, textarea, [role="dialog"]'), null);
  assert.deepEqual(commands.map(command => command[1]), ['whatsapp_click']);
});
