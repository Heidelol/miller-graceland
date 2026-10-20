# SEO local

## Primer paso: base del sitio

- Dirección principal: `https://millergreiseland.com/`. La portada declara esa URL como canónica, incluidas las copias servidas desde otros dominios.
- Título y descripción centrados en extensiones, colorimetría y Chetumal.
- Datos `HairSalon` incluidos en el HTML inicial: nombre, dirección, teléfono, fotografía, logo, Instagram y enlace a la ficha de Google Maps.
- Ciudad, estado y código postal coinciden con la ficha pública de Miller Greiseland Studio consultada el 20 de octubre de 2026. El enlace a Maps utiliza esa ficha; no se han inferido coordenadas.
- `public/robots.txt` y `public/sitemap.xml` se publican como archivos estáticos reales. El sitemap contiene solo la portada, que actualmente reúne las secciones públicas del sitio. Los fragmentos como `#servicios` no son páginas independientes.
- La exclusión de `/admin-demo` en robots es una indicación para rastreadores, no una medida de seguridad.

Al cambiar los datos del negocio, actualizar tanto `src/data/salonData.ts` como el JSON-LD de `index.html` para mantenerlos coherentes. Actualizar `lastmod` del sitemap cuando cambie el contenido de la portada.

## Comprobaciones antes de publicar

1. Ejecutar `npm test` y `npm run build`.
2. Validar que el JSON-LD se puede interpretar y que el teléfono, nombre y enlace a Maps coinciden con los datos visibles.
3. Confirmar que el sitemap contiene URLs públicas canónicas y que los archivos se han copiado a `dist`.
4. Tras publicar, comprobar respuestas HTTP y tipos de contenido de `/`, `/robots.txt` y `/sitemap.xml`.

## Siguientes pasos

1. Revisar o verificar la propiedad del dominio en Search Console, enviar `https://millergreiseland.com/sitemap.xml` y solicitar la inspección de la portada. Esta configuración se hace desde la cuenta propietaria; no se ha realizado por añadir los archivos al sitio.
2. Revisar la medición: distinguir clics a WhatsApp, solicitud preparada y cita confirmada. El anticipo requerido no es dinero cobrado. Verificar los eventos recibidos en Analytics antes de utilizarlos como conversiones de Ads.
3. Corregir el enlace de Instagram en la ficha de Maps si el perfil oficial es `@millergreiseland.studio`; revisar categorías, servicios, horarios semanales y directorios con direcciones anteriores.
4. Preparar páginas de servicios con contenido propio y fichas comerciales confirmadas. Validar demanda y costes estimados en el Planificador de palabras clave antes de acordar presupuesto y activar campañas de búsqueda locales.

Los días semanales de apertura siguen pendientes de confirmación y no se han añadido al JSON-LD. No se incluyen coordenadas inferidas ni valoraciones de la propia empresa en el marcado. Esta primera entrega no configura campañas, cuentas de Google ni seguimiento de conversiones.
