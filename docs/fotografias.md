# Fotografías del sitio público

La selección procede de la carpeta Documentos/Miller. Los archivos originales se conservan sin cambios; las copias web están en `public/images/studio`, con variantes de 480 px y de hasta 960 px. `src/data/studioPhotos.ts` centraliza los grupos, tamaños, encuadres y textos alternativos.

## Inventario completo

| Original | Ubicación | Versión web |
| --- | --- | --- |
| TratamientosCapilares.PNG | Carrusel de Tratamientos Capilares, foto 1 | tratamientos-1 |
| TratamientosCapilares2.PNG | Carrusel de Tratamientos Capilares, foto 2 | tratamientos-2 |
| tintesycolor1.PNG | Carrusel de Tintes y Coloración, foto 1 | tintes-1 |
| tintesycolor2.PNG | Carrusel de Tintes y Coloración, foto 2 | tintes-2 |
| ExtensionesHumanos.PNG | Presentación de Extensiones de Cabello Humano | extensiones-humanas |
| bajada+recolocaciondeextensiones.PNG | Servicio Bajada + Recolocación de Extensiones | bajada-recolocacion |
| BajadaExtensiones.PNG | Servicio Bajada de Extensiones | bajada-extensiones |
| HairWash+Extensiones.JPG | Servicio Hair Wash + Extensions; imagen ilustrativa | hair-wash-extensiones |
| Avyna1.PNG | Carrusel de Avyna, foto 1 | avyna-1 |
| Avyna2.PNG | Carrusel de Avyna, foto 2 | avyna-2 |
| Avyna5.PNG | Carrusel de Avyna, foto 3 | avyna-5 |
| Chocolatto1.PNG | Fotografía de Chocolatto | chocolatto-1 |
| Schwarzkopf1.PNG | Carrusel de Schwarzkopf, foto 1 | schwarzkopf-1 |
| Shwarzkopf2.PNG | Carrusel de Schwarzkopf, foto 2 | schwarzkopf-2 |
| schwarzkopf5.PNG | Carrusel de Schwarzkopf, foto 3; incluye Lendan | schwarzkopf-5 |
| FormacionInternacional1.PNG | Historia ampliada de Conóceme, foto 1 | formacion-1 |
| Formacioninternacional2.PNG | Historia ampliada de Conóceme, foto 2 | formacion-2 |
| FormacionInternacional3.PNG | Historia ampliada de Conóceme, foto 3 | formacion-3 |
| Portada.PNG | Portada ya existente; mismo archivo original | images/hero/portada.webp |
| conoceme.PNG | Retrato principal de Sobre mí | images/studio/conoceme.webp |
| Logo-Miller.png | Logo ya existente; mismo archivo original | logo-miller.png |

Los saltos de numeración de los originales no representan archivos faltantes. Todas las fotos de cada grupo están incluidas. Wella conserva su presentación tipográfica porque no hay foto suya en la carpeta.

## Controles

`PhotoCarousel` monta únicamente la foto seleccionada, sin reproducción automática. Permite flechas, indicadores, gestos táctiles horizontales y teclado (flechas, Inicio y Fin con el carrusel enfocado). Una foto individual conserva la ampliación y omite los controles de carrusel.

La ampliación utiliza un diálogo nativo: contiene el foco, admite Escape, bloquea el desplazamiento de fondo y devuelve el foco al control de origen. La foto completa se muestra sin recorte. Las transiciones respetan la preferencia de movimiento reducido.

Las tarjetas destacadas mantienen proporción 4:3 y las fotografías de servicios 16:9. Los retratos tienen encuadres individuales. Las fotos de formación están dentro de la historia desplegable.

## Comprobaciones reproducibles

`npm test` ejecuta las pruebas existentes y las pruebas de fotos. Estas últimas ejercitan el componente React real: navegación completa, selección mediante indicadores, teclado, distinción entre gestos horizontales y verticales, fotos individuales, independencia entre carruseles y acceso conjunto a Color y Signature Blondes.

Antes de publicar se ejecutan también `npm run build`, `npm run lint` y revisión visual del sitio compilado en móvil, tablet y escritorio. La dependencia jsdom es exclusiva de desarrollo y no forma parte del JavaScript enviado al visitante.
