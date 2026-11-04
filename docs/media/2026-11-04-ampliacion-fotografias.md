# Fotografías reales integradas en ambas páginas

La selección inicial de siete fotos se amplió a las23 fotografías únicas entregadas. Se excluye solamente IMG_2045 (1).HEIC, copia exacta de IMG_2045.HEIC. Los originales permanecen intactos.

El usuario aclaró que las fotos deben tener presencia dentro del contenido, además de los carruseles:

- Portada: bloque «Cabello y acabados del estudio», antes del listado de servicios. Seis fotos visibles en una cuadrícula de dos columnas en móvil y tres en escritorio:0192,2076,9823,9784,9789 y9792.
- Extensiones: hero2039, fotografía que acompaña la personalización1655, y bloque «Nuestras piezas, en detalle». Seis fotos visibles:2035,2037,2045,1654,1656 y2014.
- Carrusel de coloración: once fotografías de cabello; los cinco ángulos de esa colección que no forman parte de la cuadrícula también son navegables allí.
- Carruseles de extensiones: doce fotos de piezas castañas, oscuras y lisas. Las tomas2036,2038,2040 y2044 también se integran como vistas adicionales.
- Las cuadrículas muestran las fotos simultáneamente y permiten ampliarlas con el diálogo accesible existente. No requieren avanzar diapositivas.
- En colecciones de más de cinco fotos, flechas y contador reemplazan la fila de puntos. Conservan navegación con teclado, swipe y anuncio de foto activa.
- Las familias reservan la misma altura para los controles y mantienen alineados sus títulos.

El manifiesto `2026-11-04-cabello.json` registra69 derivados WebP (480/768/1200px), alrededor de7.05MB en archivos publicados. Cada imagen usa tamaños adaptables y carga diferida donde corresponde; no se descargan las69 imágenes al abrir la página.

Los textos describen lo visible. No se atribuyeron nuevas técnicas ni se presentaron montajes de antes/después. Las fotografías de los servicios concretos conservan su clasificación vigente hasta confirmar a qué técnica corresponde cada nuevo trabajo.

Verificación: 32 pruebas de interacción/medición, 17 de contenido inicial/SEO y 4 de HTTP local, además de compilación y linter. Revisión visual local en ambas rutas, incluido móvil390px. Los cambios se guardan en un commit independiente del anterior y no se publican sin encargo del usuario.

## Selección vigente tras la revisión del usuario

Las instrucciones posteriores sustituyen la selección amplia descrita arriba:

- Coloración: cuatro fotografías; la secuencia4–11 se reduce a una sola toma representativa de cabello oscuro. Se mantienen las tres primeras vistas distintas.
- Extensiones de cabello humano: tres fotografías, una de piezas castañas onduladas, una de piezas oscuras y una de cabello liso. Se retiran ángulos repetidos de las colecciones públicas.
- Galerías visibles: cuatro fotografías en portada y tres en extensiones. Los originales y derivados se conservan como material de reserva.
- Controles inferiores uniformes: una sola fila de44px, símbolos de14px y contador. Sin puntos ni segunda fila; los botones conservan zonas táctiles44×44.
- No mostrar reglas de pago, anticipos, porcentajes ni política de cancelación. La sección antes dedicada a pagos pasa a coordinar la visita por WhatsApp; se retiran las menciones de fichas, navegación, FAQ y footer. Los importes publicados de los servicios se conservan.

Estas decisiones prevalecen sobre las indicaciones anteriores del plan. Verificación actual:33 pruebas de interacción/medición y17 de SEO/hidratación pasan; build y lint pasan. Revisión visual de controles44px y contenido sin reglas de pago en ambas rutas; móvil390px sin desbordamiento observado.
