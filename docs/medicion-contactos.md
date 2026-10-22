# Medición de contactos

La propiedad GA4 `Miller` (559487996), flujo `Sitio Web Miller`
(16155925422), usa la etiqueta `G-ET6TSWGHZ1`.

## Flujo actual: solicitar valoración

Los botones de cita abren directamente WhatsApp con el mismo mensaje de valoración
en el salón. No hay selección de servicio, cuestionario, calendario ni formulario.
No se crea una reserva local ni se calcula un importe durante este recorrido.

`whatsapp_click` registra la intención de contacto con `contact_intent=inquiry`.
Los botones de valoración envían `service_name=Valoración en salón` y su
`click_location`: por ejemplo, `hero_valuation`, `services_valuation`,
`navbar_valuation`, `navbar_mobile_valuation`, `payment_valuation` o los accesos de extensiones.

Es un evento clave de **intención de contacto**, no una venta ni una cita confirmada.
Un clic no demuestra que se envió el mensaje o que el salón lo recibió.
Los clics repetidos no equivalen a clientas únicas.

No se envían nombres, teléfonos de clientas, correos, diagnóstico, fechas, horarios,
códigos de reserva ni importes. Tampoco se emiten `generate_lead`, `begin_checkout`,
`conversion`, `purchase` o eventos de citas confirmadas desde estos enlaces.

## Historial del flujo anterior

Los informes antiguos pueden conservar `booking_modal_open`, `booking_step`,
`booking_lead_prepared` o `contact_intent=prepared_request`. Pertenecen al formulario
retirado; no son citas confirmadas. Los antiguos `generate_lead` procedían de clics.
La simplificación no modifica retroactivamente estos datos.

## Verificación

- `npm test` comprueba los destinos, el mensaje único, el cierre del menú móvil,
  la ausencia de formulario y reservas locales y que cada acción mida un solo clic.
- En **Informes → Tiempo real → Recuento de eventos por nombre**, abrir
  `whatsapp_click` para comprobar origen e intención de contacto.
- Una prueba de clic no requiere enviar un mensaje por WhatsApp.
- Mantener activa la redacción de correos y del parámetro URL `text` en el flujo web.
- Las citas y pagos reales se acuerdan con Miller en el salón; esta web no registra ese resultado automáticamente.

Referencias: [eventos de GA4](https://support.google.com/analytics/answer/9322688?hl=es)
y [redacción de datos](https://support.google.com/analytics/answer/13544947?hl=es).
