import { register } from 'node:module';
import { test } from 'node:test';
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

dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };

async function visit(at, path, verify) {
  const realNow = Date.now;
  Date.now = () => Date.parse(at);
  window.history.replaceState(null, '', path);
  const container = document.body.appendChild(document.createElement('div'));
  const root = createRoot(container);
  try {
    await act(() => root.render(createElement(App)));
    await verify(container);
  } finally {
    await act(() => root.unmount());
    container.remove();
    Date.now = realNow;
  }
}

const opening = '2026-11-13T00:00:00-05:00';
const findButton = (root, label) => [...root.querySelectorAll('button')].find(
  button => button.textContent.trim() === label || button.getAttribute('aria-label') === label,
);

test('solo aparece en la portada y dentro de la vigencia local, incluida la última noche', async () => {
  for (const [date, path] of [
    ['2026-11-12T23:59:59-05:00', '/'],
    [opening, '/menu'],
    ['2026-11-18T00:00:00-05:00', '/'],
  ]) {
    await visit(date, path, (page) => {
      assert.equal(document.querySelector('dialog[open]'), null);
      assert.equal(findButton(page, 'Ver promociones del Gran Fin'), undefined);
    });
  }
  await visit('2026-11-17T23:59:59-05:00', '/', () => {
    assert.ok(document.querySelector('dialog[open]'));
  });
});

test('abre con portada, conserva orden y condiciones, y se puede reabrir sin repetir el aviso automático', async () => {
  window.sessionStorage.clear();
  await visit(opening, '/', async () => {
    const dialog = document.querySelector('dialog[open]');
    assert.ok(dialog);
    assert.match(dialog.querySelector('img').src, /01-portada/);
    await act(() => findButton(dialog, 'Ver promociones').click());

    for (const [i, name, detail] of [
      [2, 'Extensiones de 18 pulgadas', /\$6,000/],
      [3, 'Brazilian Blowout + retoque de tinte', /\$1,500.*\$1,600/],
      [4, 'Tinte + ampolleta', /9:00 a 11:00 a\. m\./],
      [5, 'Corte + hidratación', /\$400.*clientas frecuentes/],
    ]) {
      const link = [...dialog.querySelectorAll('a')].find(a => a.textContent.includes('Consultar por WhatsApp'));
      const message = new URL(link.href).searchParams.get('text');
      assert.ok(message.includes(name));
      assert.match(dialog.textContent, detail);
      assert.match(dialog.querySelector('img').src, new RegExp(`0${i}-`));
      if (i < 5) await act(() => findButton(dialog, 'Siguiente promoción').click());
    }
    await act(() => findButton(dialog, 'Cerrar promociones').click());
    assert.equal(document.querySelector('dialog[open]'), null);
  });
  await visit(opening, '/', async (page) => {
    assert.equal(document.querySelector('dialog[open]'), null);
    await act(() => findButton(page, 'Ver promociones del Gran Fin').click());
    assert.match(document.querySelector('dialog[open] img').src, /01-portada/);
  });
});
