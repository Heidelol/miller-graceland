import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  trackEvent, trackWhatsAppClick, trackBookingModalOpen,
  trackBookingLeadPrepared,
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

test('WhatsApp del formulario identifica una solicitud preparada sin enviar su código privado', () => {
  trackWhatsAppClick('booking_modal_final', { serviceName: 'Balayage Rubio', bookingCode: 'MG-1234' });
  assert.deepEqual(commands, [['event', 'whatsapp_click', {
    click_location: 'booking_modal_final',
    service_name: 'Balayage Rubio',
    contact_intent: 'prepared_request',
  }]]);
});

test('abrir una solicitud no inicia un checkout ni un pago', () => {
  trackBookingModalOpen('navbar', 'Retoque de Color');
  assert.deepEqual(commands, [['event', 'booking_modal_open', {
    trigger_location: 'navbar', initial_service: 'Retoque de Color',
  }]]);
});

test('preparar el formulario registra solo su estado local, sin ingresos ni confirmación', () => {
  trackBookingLeadPrepared('Balayage Rubio', 'MG-1234', 1600, '2026-10-22', '11:00 AM');
  assert.deepEqual(commands, [['event', 'booking_lead_prepared', {
    service_name: 'Balayage Rubio', request_status: 'prepared_locally',
    contact_channel: 'whatsapp',
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
