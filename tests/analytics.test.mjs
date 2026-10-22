import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  trackEvent, trackWhatsAppClick,
} from '../src/lib/analytics.ts';

let commands;
beforeEach(() => {
  commands = [];
  globalThis.window = { gtag: (...args) => commands.push(args) };
});
afterEach(() => { delete globalThis.window; });

test('un clic a WhatsApp mide intención de contacto sin generar una venta ni un lead recibido', () => {
  trackWhatsAppClick('extensions_valuation', { serviceName: 'Valoración de extensiones' });
  assert.deepEqual(commands, [['event', 'whatsapp_click', {
    click_location: 'extensions_valuation',
    service_name: 'Valoración de extensiones',
    contact_intent: 'inquiry',
  }]]);
});

test('la valoración no envía datos privados adicionales ni importes a Google', () => {
  trackWhatsAppClick('hero_valuation', { serviceName: 'Valoración en salón', bookingCode: 'MG-1234', price: 1600 });
  assert.deepEqual(commands, [['event', 'whatsapp_click', {
    click_location: 'hero_valuation',
    service_name: 'Valoración en salón',
    contact_intent: 'inquiry',
  }]]);
});

test('sin gtag los eventos quedan en espera sin interrumpir el sitio', () => {
  delete window.gtag;
  trackEvent('whatsapp_click', { click_location: 'footer', absent: undefined, empty: null });
  assert.deepEqual(window.dataLayer, [['event', 'whatsapp_click', { click_location: 'footer' }]]);
});

test('Analytics no se ejecuta durante la generación de HTML del servidor', () => {
  delete globalThis.window;
  assert.doesNotThrow(() => trackWhatsAppClick('extensions_hero'));
});

test('un fallo del proveedor de Analytics no bloquea la acción de la clienta', () => {
  window.gtag = () => { throw new Error('Proveedor no disponible'); };
  assert.doesNotThrow(() => trackWhatsAppClick('navbar_desktop'));
});
