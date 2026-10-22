# SEO local

## Primer paso: base del sitio

- Dirección principal: `https://millergreiseland.com/`. La portada declara esa URL como canónica, incluidas las copias servidas desde otros dominios.
- Título y descripción centrados en extensiones, colorimetría y Chetumal.
- Datos `HairSalon` incluidos en el HTML inicial: nombre, dirección, teléfono, fotografía, logo, Instagram y enlace a la ficha de Google Maps.
- Ciudad, estado y código postal coinciden con la ficha pública de Miller Greiseland Studio consultada el 20 de octubre de 2026. El enlace a Maps utiliza esa ficha; no se han inferido coordenadas.
- `public/robots.txt` y `public/sitemap.xml` se publican como archivos estáticos reales. El sitemap contiene solo la portada, que actualmente reúne las secciones públicas del sitio. Los fragmentos como `#servicios` no son páginas independientes.
- Icono de búsqueda derivado del logo oficial, sin deformarlo: `public/favicon.png` cuadrado de 96 × 96 y `public/favicon.ico` con versiones de 16, 32 y 48 píxeles. La portada declara ambos; el logo original de 1225 × 1284 se conserva para el sitio. Google debe volver a rastrear y procesar la portada para actualizar el icono y puede elegir otro texto para el resultado.
- La exclusión de `/admin-demo` en robots es una indicación para rastreadores, no una medida de seguridad.

Al cambiar los datos del negocio, actualizar tanto `src/data/salonData.ts` como el JSON-LD de `index.html` para mantenerlos coherentes. Actualizar `lastmod` del sitemap cuando cambie el contenido de la portada.

## Comprobaciones antes de publicar

1. Ejecutar `npm test` y `npm run build`.
2. Validar que el JSON-LD se puede interpretar y que el teléfono, nombre y enlace a Maps coinciden con los datos visibles.
3. Confirmar que el sitemap contiene URLs públicas canónicas y que los archivos se han copiado a `dist`.
4. Tras publicar, comprobar respuestas HTTP y tipos de contenido de `/`, `/robots.txt` y `/sitemap.xml`.

## Verificación en Google: 20 de octubre de 2026

- Propiedad de dominio verificada en Search Console mediante un registro TXT de Vercel DNS. Conservar el registro `google-site-verification` para mantener la verificación.
- Google procesó correctamente `https://millergreiseland.com/sitemap.xml` y descubrió una página.
- La inspección de `https://millergreiseland.com/` confirma que la portada está indexada, permite rastreo e indexación y se pudo obtener correctamente.
- El rastreo mostrado corresponde al 19 de octubre de 2026, anterior a las mejoras de SEO local. El informe aún no refleja la declaración canónica añadida el día 20; Google ya identifica la URL inspeccionada como su canónica.
- Los informes de rendimiento de la propiedad recién verificada siguen procesándose. Verificar la propiedad y enviar el sitemap no garantizan una posición determinada en las búsquedas.

## Ficha de Google: 20 de octubre de 2026

- Acceso de administración confirmado en la ficha existente de Miller Greiseland Studio.
- Instagram corregido a `https://www.instagram.com/millergreiseland.studio/` y enlace al catálogo configurado como `https://millergreiseland.com/#servicios`.
- WhatsApp configurado como contacto principal de chat: `https://wa.me/529831373038`.
- Categoría principal conservada como `Beauty Salon`. Añadidas las categorías oficiales `Hairdresser` y `Hair extension technician`.
- El editor de información muestra los contactos y las categorías guardados sin avisos de revisión pendientes. Los resultados públicos todavía pueden reflejar valores anteriores mientras se actualizan.
- Añadidas y comprobadas al reabrir las descripciones en español de los servicios existentes `Hair extensions`, `Balayage`, `Tinte` y `Tratamientos para el cabello`. Se mantuvieron sin precio publicado; requieren valoración según el servicio.
- No se eliminaron otros servicios de la ficha ni se alteraron horarios, atributos o reseñas. Las fotos reales para Google y la revisión de los horarios siguen pendientes.

## Siguientes pasos

1. Revisar los informes de Search Console cuando haya datos y comprobar que un nuevo rastreo recoge el título, la descripción y los datos estructurados actuales.
2. Revisar la medición: distinguir clics a WhatsApp, solicitud preparada y cita confirmada. El anticipo requerido no es dinero cobrado. Verificar los eventos recibidos en Analytics antes de utilizarlos como conversiones de Ads.
3. Incorporar fotografías reales autorizadas para Google, facilitar el enlace de reseñas a clientas y confirmar los horarios semanales. La ficha muestra atención presencial de lunes a sábado de 11:00 a 19:00, domingo cerrado, y atención en línea hasta las 21:00; confirmar esa diferencia antes de modificarla. Revisar también directorios con direcciones anteriores.
4. Preparar páginas de servicios con contenido propio y fichas comerciales confirmadas. Validar demanda y costes estimados en el Planificador de palabras clave antes de acordar presupuesto y activar campañas de búsqueda locales.

Los días semanales de apertura siguen pendientes de confirmación y no se han añadido al JSON-LD. No se incluyen coordenadas inferidas ni valoraciones de la propia empresa en el marcado. Todavía no se han configurado campañas ni corregido el seguimiento de conversiones.


## Actualización del 22 de octubre de 2026

- El sitio público conserva 9 servicios; los cortes se retiraron previamente. La página de extensiones ya está publicada y el sitemap incluye dos URLs.
- Horarios presenciales confirmados por el propietario: lunes a sábado, 11:00–19:00; domingo cerrado. Se incorporan al texto visible y a `openingHoursSpecification` del HTML inicial de ambas páginas. La atención en línea hasta las 21:00 de la ficha se conserva como horario distinto.
- Se sustituye el logotipo de 562,238 bytes por una copia de 13,261 bytes (137 × 144), manteniendo el original para marcado y otros usos. Se reservan dimensiones en el encabezado y pie.
- Se probó servir las fuentes desde el dominio; las mediciones móviles bajaron a 74, por lo que se conservó el mecanismo original de Google Fonts. La prueba y su corrección permanecen documentadas en el historial. La recomendación de bloqueo tipográfico queda como oportunidad futura, no como mejora lograda.
- Se corrigen los avisos de contraste en etiquetas pequeñas y se ordenan los encabezados del pie manteniendo sus tamaños y tipografía.
- Analytics distingue clics de intención de contacto; no hay formulario público ni cobro. La propiedad Miller está vinculada con Search Console y se verificaron los informes de consultas y tráfico orgánico.
- La prueba móvil inicial de PageSpeed registró rendimiento 89, accesibilidad 95, buenas prácticas 100 y SEO 100; FCP/LCP 2.9 s, TBT 90 ms y CLS 0. Es una medición de laboratorio, no datos de usuarios reales ni posición en Google.


## Carga inicial: corrección posterior del 22 de octubre de 2026

Esta actualización sustituye el estado anterior de la carga tipográfica; no cambia el diseño ni los datos comerciales.

- La portada se genera ahora con su contenido completo y sus enlaces de valoración en el HTML inicial, igual que la página de extensiones. React hidrata el contenido existente. El marcador de ruta evita hidratar HTML de otra página y conserva las rutas previas sin modificarlas.
- El texto principal se muestra desde el inicio; la fotografía conserva su animación discreta. El carrusel de Conóceme muestra el retrato también si la imagen terminó de cargar antes de la hidratación y mantiene la transición entre fotografías.
- Se conservan Cormorant Garamond, Plus Jakarta Sans y Playfair Display. Sus declaraciones oficiales de Google Fonts se incluyen en el HTML, con Latin y Latin Extended, pesos originales y `font-display: swap`. Los archivos continúan alojados en Google; tres fuentes críticas se precargan. Se elimina la petición bloqueante de `fonts.googleapis.com`, sin reemplazar tipografías. El experimento posterior de incrustar el binario de la fuente del cuerpo aumentó el peso inicial y se revirtió (`71f1bef` / `e50d03e`); no forma parte del estado publicado.
- La fotografía original de portada se conserva. Las versiones WebP de 480 y 768 píxeles pesan 18,102 y 35,356 bytes; `srcset` y `sizes` permiten elegir según el espacio y la densidad de pantalla. El logo de cabecera y pie mantiene dimensiones y transparencia con una copia WebP de 7,178 bytes.
- Verificación: compilación, 65 pruebas funcionales existentes, 13 de SEO/renderizado inicial e hidratación y 3 comprobaciones HTTP contra producción. Sin errores de linter; permanecen dos advertencias antiguas del archivo de pruebas administrativo. Revisión independiente de los cambios y comprobación de igualdad entre HTML/recursos publicados y la compilación local.
- Commits: `544bd12` (Acelerar carga inicial), `c567485` (Agilizar tipografías) , `f83139e` (Aligerar imágenes de portada) y `71f1bef` (Estabilizar fuente del texto).
- La medición compartida por el propietario registraba 69 de rendimiento, FCP 3.9 s y LCP 5.2 s. El paso intermedio de HTML inicial marcó 74; las pruebas con tipografías optimizadas marcaron 70 y 82. Las pruebas conjuntas con imágenes adaptadas registraron 93 y 78; FCP 2.1–2.2 s, LCP 2.9–5.1 s. La llegada tardía de la fuente del párrafo seguía causando variación; la hipótesis de atribuir toda la variación a una descarga de fuente no quedó demostrada. No se conservaron los cambios experimentales que empeoraron el resultado. Accesibilidad, buenas prácticas y SEO: 100.
- Informe de la primera medición final: https://pagespeed.web.dev/analysis/https-millergreiseland-com/8fiqerkanr?form_factor=mobile . Las cifras son pruebas de laboratorio variables; no equivalen a una posición en Google ni a aprobar las métricas de usuarios reales. PageSpeed todavía no presenta datos de campo para esta página.


## Retirada del panel administrativo

- A petición expresa del propietario se retira la demostración administrativa: página, componentes, almacenamiento, lógica, tipos y pruebas exclusivos de la demo. La recuperación del experimento queda disponible en el historial de Git.
- Se eliminan sus reglas de acceso en Vercel. `/admin-demo` y sus subrutas responden con HTTP 404 real, tanto en producción como en los servidores locales. La antigua exclusión en robots se elimina para que los buscadores puedan procesar su retirada.
- Se conserva la portada, la página de extensiones, las fotografías, el catálogo y los enlaces de valoración por WhatsApp.
- El código inicial pasa de 410.13 KB a 313.62 KB sin comprimir (112.73 KB a 93.08 KB con gzip); los estilos pasan de 56.49 KB a 44.71 KB (11.19 KB a 9.31 KB con gzip).
- Comprobaciones actuales: 27 pruebas funcionales públicas, 13 de SEO/hidratación y 4 HTTP, incluido el rechazo de las rutas retiradas. Linter sin advertencias y compilación de producción correcta.
