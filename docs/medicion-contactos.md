# Medición de contactos

La propiedad GA4 `Miller` (559487996), flujo `Sitio Web Miller`
(16155925422), usa la etiqueta `G-ET6TSWGHZ1`.

| Evento | Qué demuestra | Qué no demuestra |
| --- | --- | --- |
| `booking_modal_open` | Se abrió el formulario | Inicio de pago |
| `booking_step` | Se visitó un paso del formulario | Solicitud recibida |
| `booking_lead_prepared` | El formulario terminó y la solicitud se preparó en el navegador | Mensaje enviado, cita confirmada o anticipo recibido |
| `whatsapp_click` | Se pulsó un enlace de contacto | Que se envió el mensaje o que el salón lo recibió |

`whatsapp_click` distingue `click_location`, `service_name` y `contact_intent`:
`inquiry` para consultas y `prepared_request` para el enlace al final del formulario.
Es un evento clave de **intención de contacto**, no una venta ni una cita confirmada.
Los clics repetidos pueden producir varios eventos; no equivalen a clientas únicas.

`booking_lead_prepared` envía únicamente el servicio, `request_status=prepared_locally`
y `contact_channel=whatsapp`. El anticipo requerido no es un ingreso. No se envían
nombres, teléfonos de clientas, correos, diagnóstico, fechas, horarios ni códigos de reserva.

No se emiten `generate_lead`, `begin_checkout`, `conversion`, `purchase` ni eventos
de citas confirmadas desde estas acciones. Las citas y pagos reales requieren
confirmación del salón y una futura integración que registre ese hecho verificable.

## Verificación

- `npm test` comprueba los eventos emitidos y que un fallo de Analytics no interrumpa el sitio.
- Tras publicar, usar **Informes → Tiempo real → Recuento de eventos por nombre**
  y abrir `whatsapp_click` para comprobar el origen y la intención de contacto.
- Una prueba de clic no requiere enviar un mensaje por WhatsApp.
- Los datos anteriores al cambio conservan su significado histórico: los antiguos
  `generate_lead` procedían de clics; no deben interpretarse como citas recibidas.
- En el flujo web, mantener activa la redacción de correos y del parámetro URL `text`:
  la medición automática de enlaces salientes no debe recoger el mensaje prellenado
  de WhatsApp. Probar con texto ficticio en la vista previa de redacción de GA4.

Referencias: [eventos de GA4](https://support.google.com/analytics/answer/9322688?hl=es)
y [redacción de datos](https://support.google.com/analytics/answer/13544947?hl=es).
