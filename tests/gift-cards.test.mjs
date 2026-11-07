import { register } from 'node:module';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { act, createElement } from 'react';
import { renderToString } from 'react-dom/server';

register('./tsx-loader.mjs', import.meta.url);
const { App } = await import('../src/App.tsx');
const { mountApp } = await import('../src/lib/mountApp.ts');

const experiences = [
  ['corte-hidratacion', 'Corte e hidratación', 'Corte de cabello personalizado y tratamiento de hidratación.'],
  ['hidratacion', 'Hidratación capilar', 'Una experiencia de hidratación para tu cabello.'],
  ['tinte-hidratacion', 'Tinte e hidratación profunda', 'Servicio de tinte acompañado de hidratación profunda.'],
  ['brazilian-blowout', 'Brazilian Blowout', 'Tratamiento antifrizz Brazilian Blowout.'],
];

for (const [slug, name, description] of experiences) {
  test(`${name} muestra el regalo y prepara un solo contacto por WhatsApp`, async () => {
    const pathname = `/regalos/${slug}`;
    const dom = new JSDOM('<div id="root"></div>', {
      url: `https://millergreiseland.com${pathname}?nombre=Andrea&precio=100`,
    });
    Object.assign(globalThis, { window: dom.window, document: dom.window.document, IS_REACT_ACT_ENVIRONMENT: true });
    let root;
    try {
      const { GIFT_CARDS, getGiftCardByPath } = await import('../src/data/giftCards.ts');
      assert.equal(GIFT_CARDS.length, 4);
      assert.equal(new Set(GIFT_CARDS.map(card => card.slug)).size, 4);
      assert.deepEqual(getGiftCardByPath(pathname), { slug, name, description });
      assert.equal(getGiftCardByPath('/'), undefined);
      assert.equal(getGiftCardByPath('/regalos/no-existe'), undefined);

      const app = createElement(App);
      const container = document.querySelector('#root');
      container.dataset.ssrPath = pathname;
      container.innerHTML = renderToString(app);
      const heading = container.querySelector('h1');
      assert.equal(container.querySelectorAll('h1').length, 1);
      assert.equal(heading.textContent, 'Una experiencia especialmente para ti.');
      assert.ok(container.textContent.includes(name));
      assert.ok(container.textContent.includes(description));
      assert.match(container.textContent, /Café americano, lungo, capuchino, frappuccino moka, Coca-Cola, agua y té\./);
      assert.doesNotMatch(container.textContent, /Andrea|\$\s*\d|\bMXN\b/);
      const link = container.querySelector('a[href^="https://wa.me/"]');
      assert.equal(link.textContent.trim(), 'Coordinar mi experiencia');
      const contact = new URL(link.href);
      assert.equal(contact.pathname, '/529831373038');
      assert.equal(contact.searchParams.get('text'),
        `Hola, recibí la gift card de ${name}. Me gustaría coordinar mi visita a Miller Greiseland Studio.`);

      const hydrationErrors = [];
      await act(() => {
        root = mountApp(container, app, pathname, { onRecoverableError: error => hydrationErrors.push(error) });
      });
      assert.deepEqual(hydrationErrors, []);
      assert.equal(container.querySelector('h1'), heading);

      link.addEventListener('click', event => event.preventDefault());
      await act(() => link.click());
      assert.deepEqual(window.dataLayer, [['event', 'whatsapp_click', {
        click_location: 'gift_card', service_name: name, contact_intent: 'inquiry',
      }]]);
    } finally {
      if (root) await act(() => root.unmount());
      dom.window.close();
      delete globalThis.window;
      delete globalThis.document;
      delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    }
  });
}

test('un enlace de regalo desconocido muestra una página no encontrada', () => {
  const dom = new JSDOM('', { url: 'https://millergreiseland.com/regalos/no-existe' });
  globalThis.window = dom.window;
  try {
    const markup = renderToString(createElement(App));
    assert.match(markup, /No encontramos esta página/);
    assert.doesNotMatch(markup, /Coordinar mi experiencia|El arte de sublimar/);
  } finally {
    dom.window.close();
    delete globalThis.window;
  }
});
