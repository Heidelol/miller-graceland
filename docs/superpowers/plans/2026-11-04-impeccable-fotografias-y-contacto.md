# Miller: fotografías reales, catálogo y contacto — Plan de implementación para Sol

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. El usuario eligió a Sol como ejecutor; este documento no solicita cambiar de modelo ni lanzar agentes automáticamente.

**Goal:** Reforzar la identidad real de Miller con las fotografías entregadas, facilitar el descubrimiento de servicios y hacer transparente la solicitud de valoración por WhatsApp.

**Architecture:** Mantener React, el prerender por ruta y los componentes actuales. Centralizar fotografías y mensajes de contacto en datos; reutilizar PhotoCarousel sin nuevas dependencias de interfaz. Refinar, no reconstruir el sitio.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind 4, Node test runner y jsdom; salida estática para Vercel.

**Spec:** La especificación de diseño y selección fotográfica está incluida en las secciones 1–4 de este mismo documento. Es autónomo: el ejecutor no necesita recuperar la conversación.

## 1. Contexto y alcance aprobado

- Repositorio local: `/Users/ho/Documents/Codex/2026-09-23/qu/work/miller-graceland`.
- GitHub: `Heidelol/miller-graceland`. Base revisada: `main`, commit `bae2179`.
- Web: `https://millergreiseland.com/`; segunda ruta `/extensiones-cabello-chetumal`.
- Originales: `/Users/ho/Downloads/MillerFotosCabello` (macOS también resolvió el nombre en minúsculas).
- El usuario pidió analizar fotos y preparar este MD para Sol. En esta fase NO se implementó, hizo commit, push ni despliegue.
- Al comenzar, revisar estado y diferencias respecto de la base. No sobrescribir cambios de Antigravity, del usuario u otros trabajos.
- Ejecutar las mejoras locales y verificarlas. Este documento por sí solo no ordena un despliegue; publicar cuando el usuario encargue esa acción a Sol. Mantener commits cortos en español y reversibles por alcance.

## 2. Especificación de diseño

### Dirección elegida

Refinamiento editorial con fotografías reales: marfil `#F9F6F0` / `#F2EDE3`, oliva y dorado existentes; Cormorant Garamond, Playfair Display y Plus Jakarta Sans existentes. Conservar retrato de Miller, biografía y fotografías de formación; no mover estas fotos a Sobre mí.

Alternativas consideradas: rediseño completo (descartado porque el usuario aprecia la identidad actual); galería masiva con todas las tomas (descartada porque repite encuadres y alarga la visita); selección breve integrada en los bloques existentes (elegida como propuesta ejecutable).

- Mantener composiciones abiertas, sin volver a tarjetas blancas con sombras grandes.
- Conservar los nueve servicios, sus importes, duraciones, inclusiones y políticas. No reintroducir cortes, panel administrativo, checkout ni formularios capilares.
- WhatsApp es una solicitud de valoración, no una reserva confirmada. No exigir elegir servicio; el contexto del enlace solo ayuda a iniciar la conversación.
- No añadir técnicas, resultados garantizados, gratuidad, duración de valoración o testimonios no confirmados.
- No prometer una mejora de ranking ni una puntuación PageSpeed por estos cambios.

### Contacto y catálogo

1. Etiqueta móvil «Valoración», conservando nombre accesible «Solicitar valoración» y comprobando ajuste en 320–390 px.
2. Junto al primer CTA de ambas rutas: «Por WhatsApp · coordinamos tu visita al salón».
3. Filtros visibles: **Todos · Coloración · Rubios · Extensiones**. Claves de datos existentes `todos`, `color`, `blondes`, `extensions`; no duplicar categorías con `color-family`.
4. Acceso de familia «Tintes y Coloración»: texto «Ver coloración», selecciona `color` y lleva al inicio de los filtros/resultados con scroll y foco previsibles. «Extensiones» continúa a su página. «Tratamientos» abre valoración por WhatsApp.
5. Encabezado del catálogo: eyebrow «Servicios», título «Un servicio pensado para tu cabello». Mantener el párrafo comercial existente; la firma Miller Greiseland puede permanecer pequeña, sin repetir otro gran logotipo.
6. No retirar condiciones de tarifas ni notas de cargos adicionales para lograr simetría. Mantener detalles desplegables y precios orientativos.
7. En pagos, distinguir visualmente solicitud de valoración y anticipo para reservar el servicio, sin inventar la política económica de la valoración. Suprimir el segundo enlace redundante al mismo WhatsApp si no añade una función distinta.

## 3. Inventario fotográfico verificado

Se revisaron visualmente las 24 fotos mediante copias JPEG, y fotogramas de los tres videos. Hay **23 fotografías únicas**: `IMG_2045 (1).HEIC` y `IMG_2045.HEIC` son idénticas por SHA-256. No borrar originales.

Las observaciones describen lo visible: no prueban qué técnica recibió una persona ni permiten emparejar un antes/después. La entrega del usuario autoriza usar el material para esta web; no inventar nombres o testimonios de las personas retratadas.

| Archivos | Contenido observado | Selección y destino |
|---|---|---|
| IMG_2035, IMG_2036, IMG_2037, IMG_2038, IMG_2039, IMG_2040, IMG_2044, IMG_2045 (.HEIC) | Piezas onduladas castañas con tonos claros, caja negra y carrito dorado; distintas tomas del mismo montaje | **2039** como hero de extensiones; **2037** como segundo ángulo y **2045** como detalle. Resto reserva editorial. |
| IMG_2045 (1).HEIC | Copia binaria de 2045 | No generar ni publicar otra imagen. |
| IMG_1654, IMG_1655, IMG_1656 (.HEIC) | Piezas oscuras onduladas y cajas negras en el carrito | **1655** como fotografía secundaria de extensiones; 1654/1656 alternativas, no tres diapositivas casi iguales. |
| IMG_2014.HEIC | Pieza larga castaña lisa sobre superficie clara | Reserva: útil para proceso/producto, pero el fondo es menos cuidado. No llamar «antes» ni «retiro». |
| IMG_0192.HEIC | Cabello rubio liso visto de espalda | Selección para carrusel de coloración; no asignar a Balayage Rubio sin confirmación técnica. |
| IMG_2076.HEIC | Retrato con cabello castaño largo y ondas | Selección de coloración. Reencuadrar moderadamente el techo, conservando rostro y largo. Sin atribuir extensiones aplicadas. |
| IMG_9823, IMG_9828 (.HEIC) | Cabello castaño oscuro con ondas, visto de espalda | **9828** en coloración, 9823 como alternativa. No afirmar «morena iluminada» por apariencia. |
| IMG_9784, IMG_9787, IMG_9788, IMG_9789, IMG_9790, IMG_9791, IMG_9792 (.HEIC) | Serie de cabello oscuro liso, persona con ropa roja | **9789** mejor candidata frontal de espalda y **9792** alternativa lateral. Reservar hasta conocer si corresponde a color, alisado o extensiones; no usar como prueba de colocación. 9788 tiene iluminación más lavada. |
| IMG_1652.MOV | Fotograma de cabello rubio largo; duración aproximada 14.93 s | Reserva para fase de video; no asumir que es la persona de IMG_0192. |
| IMG_9795.MOV | Fotograma de cabello oscuro liso; duración declarada aproximada 15.02 s | Reserva; extracción a 1 s no produjo imagen, primer fotograma sí. Validar continuidad antes de uso, no afirmar video completo validado. |
| IMG_9824.MOV | Detalle de cabello castaño con ondas; duración aproximada 21.15 s | Reserva para video; no publicar MOV original ni reproducir automáticamente. |

### Mapa exacto de publicación inicial

Crear derivados en `public/images/studio/` con nombres nuevos (las imágenes estables tienen caché):

| Original | Slug de derivados sin extensión | Alt sugerido |
|---|---|---|
| IMG_2039.HEIC | extensiones-castanas-presentacion | Piezas de cabello castaño ondulado junto a una caja negra sobre un carrito dorado |
| IMG_2037.HEIC | extensiones-castanas-angulo | Piezas de cabello castaño ondulado vistas desde un lateral |
| IMG_2045.HEIC | extensiones-castanas-detalle | Detalle de ondas y tonos claros en piezas de cabello castaño |
| IMG_1655.HEIC | extensiones-oscuras-presentacion | Piezas de cabello oscuro ondulado junto a cajas negras |
| IMG_0192.HEIC | cabello-rubio-liso | Cabello rubio liso visto de espalda en el salón |
| IMG_9828.HEIC | cabello-castano-ondas | Cabello castaño con ondas visto de espalda en el salón |
| IMG_2076.HEIC | cabello-castano-retrato | Retrato con cabello castaño largo peinado con ondas |

- Familia de extensiones en portada: PhotoCarousel con 2039 → 1655 → 2045. Sustituye el retrato genérico actual de dos personas. Usar 4:5 para las tres familias si hace falta preservar largos; no estirar ni cortar puntas para forzar 4:3.
- Familia de coloración: PhotoCarousel con 9828 → 0192 → 2076. Conservar herramientas/productos actuales en datos como reserva, no destruir originales. Son fotografías de presentación de cabello, no casos clínicos ni atribuciones de una técnica concreta.
- Familia tratamientos: conservar fotografías de productos actuales; ninguna foto nueva acredita un tratamiento particular.
- Página de extensiones: hero estático 2039; bloque de personalización con carrusel 1655 → 2037 → 2045 y leyenda «Detalles de las piezas de cabello del estudio». No decir que se observa integración en la raíz ni fabricación: estas fotos muestran producto presentado, no esos procesos.
- No cambiar aún fotografías de fichas de servicios concretos basándose solo en el color visible. Vincularlas a un servicio específico cuando Miller lo confirme.
- No añadir una galería separada de 24 fotos ni nuevos carruseles de resultados repetidos en cada sección.
- Las dos ilustraciones IA de la página de extensiones dejan de renderizarse. Retirar sus leyendas/atributos SOLO de las figuras efectivamente sustituidas; cualquier ilustración restante en otras zonas mantiene su identificación.

## 4. Preparación técnica de medios

- No modificar HEIC/MOV originales. No copiarlos al directorio público: la carpeta ronda 130 MB.
- `sips` generó JPEG negros en esta sesión pese a salir sin error. No aceptar una conversión solo por exit code.
- Decodificador que funcionó: `/Users/ho/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/heif-convert`.
- Pillow disponible en `/private/tmp/proinca-seo-env/bin/python`; usarlo solo si sigue accesible, no asumir que un entorno temporal existe en otra máquina. Si se necesita alternativa, usar una herramienta instalada y verificar visualmente.
- Convertir desde originales, NO desde las miniaturas de esta revisión. Aplicar orientación y conversión de perfil a sRGB cuando el origen lo requiera; comprobar que tonos/oscuros no cambian.
- Generar WebP de 480, 768 y hasta 1200 px de ancho sin ampliar la fuente. Conservar proporción y dimensiones reales. Meta orientativa ≤250 KB para imagen grande y ≤90 KB para 480; priorizar calidad del cabello y registrar excepciones justificadas.
- Para 2039 (4284×5712, 3:4) preservar producto completo; hero en contenedor 3:4 o recorte leve probado visualmente, sin forzar cara/persona inexistente. Resto de fotos son 3213×5712 (9:16): ajustar `objectPosition` por foto, no por nombre de técnica.
- Hero de extensiones con `srcSet`, `sizes`, width/height y `fetchPriority="high"`; sin lazy. Resto lazy y async. Carruseles no descargan todos los originales al montar.
- No instalar una librería de animación. Mantener transición sutil existente, controles manuales y reduced-motion. Nada de autoplay de video/fotos.
- Videos fuera del alcance de implementación inicial. Los fotogramas revisados no equivalen a verificación completa de reproducción, sonido ni color HDR.

## Global Constraints

- No cambiar dominio canónico, rutas, títulos SEO ni esquema local para resolver este trabajo visual.
- Mantener datos de contacto, horarios, precios y política vigentes; no inventar datos de valoración ni descripciones de sistemas.
- Preservar eventos `whatsapp_click`, `click_location` y `contact_intent: inquiry`; un clic no es cita ni venta.
- No incluir nombres de clientas, texto libre ni números personales en Analytics.
- Mantener accesibilidad del carrusel, diálogo nativo, Escape, restauración de foco y reduced-motion ya existentes.
- No escribir reglas de caché nuevas ni subir fotos originales pesadas.
- No publicar cambios de esta fase documental.

## Review Focus

1. El encabezado con «Valoración» debe caber a 320 px sin truncar la marca ni ocultar menú/CTA.
2. Un contexto vacío conserva el mensaje genérico; símbolos y acentos en el nombre del servicio llegan correctamente a WhatsApp.
3. Escape cierra primero el submenú Servicios si está abierto; no debe cerrar inesperadamente ambos niveles con el mismo evento.
4. Fotografías oscuras conservan detalle y las verticales no pierden puntas o rostros en móvil/escritorio.
5. La sustitución de IA se refleja en HTML prerenderizado, Open Graph y tests; no deja captions falsas ni metadatos duplicados.

## 5. Tareas ejecutables

### Tarea 1 — Derivados y fotografías reales

**Archivos:** `src/data/studioPhotos.ts`, `src/components/ServicesSection.tsx`, `src/pages/ExtensionsPage.tsx`, `public/images/studio/`, `scripts/prerender.mjs`; pruebas `tests/photos.test.mjs`, `tests/extensions.test.mjs`, `tests/valuation.test.mjs`.

**Interfaces:** ampliar StudioPhoto opcionalmente con `mediumSrc?: string` si PhotoCarousel lo necesita, conservando compatibilidad de `src`, `smallSrc`, dimensiones, alt y posición. Crear `EXTENSION_PAGE_PHOTOS` con claves `hero` y `details`, reutilizadas por la página; conservar objetos de imágenes antiguas que sigan en uso.

- [x] Convertir los siete originales seleccionados; comparar originales y derivados visualmente. Registrar dimensiones/peso en manifiesto de medios versionado, sin datos EXIF privados.
- [x] Integrar el mapa de publicación de la sección 3. No inferir la técnica por la imagen.
- [x] Adaptar `PhotoCarousel.tsx` únicamente si se añade variante mediana; mantener carga de una foto inicial y su comportamiento accesible.
- [x] En `scripts/prerender.mjs`, reemplazar OG de extensiones por URL absoluta de `extensiones-castanas-presentacion.webp`, alt descriptivo y dimensiones del derivado real. OG de portada permanece propio. Si la proporción no favorece la tarjeta social, generar un derivado real 1200×630 y verificar su recorte; nunca falsear dimensiones.
- [x] Actualizar tests que hoy exigen dos `data-ai-illustration`: tanto `tests/extensions.test.mjs` como `tests/valuation.test.mjs`. Exigir imágenes reales previstas, alt no vacío, archivos existentes, ausencia de leyendas IA obsoletas en estas figuras y conservación de cualquier disclaimer de ilustraciones aún renderizadas.
- [x] Probar que OG aparece una sola vez por propiedad/ruta y apunta a imagen existente.
- [x] Commit propuesto, solo tras verificación: `Integrar fotos de cabello`.

### Tarea 2 — Valoración clara y contexto opcional

**Archivos:** `src/data/valuation.ts`, `src/components/ValuationLink.tsx`, `Hero.tsx`, `Navbar.tsx`, `ServicesSection.tsx`, `PaymentMethodsSection.tsx`, `src/pages/ExtensionsPage.tsx`; tests `tests/valuation.test.mjs`, `tests/analytics.test.mjs`.

**Interfaces:** `buildValuationUrl(interest?: string): string`; `ValuationLink` añade `interest?: string`. Mantener `VALUATION_MESSAGE` y `VALUATION_WHATSAPP_URL` como caso genérico. Construir destino a partir de `SALON_INFO.whatsappUrl` y `encodeURIComponent`, nunca concatenar texto sin escapar.

- [x] Añadir pruebas: sin interés o solo espacios = mensaje actual exacto; interés `Balayage Rubio` = `Hola, Miller. Me interesa Balayage Rubio y quisiera solicitar una valoración en el salón. ¿Qué disponibilidad tienes?`; comprobar que `Coloración & rubios` sobrevive a encode/decode sin parámetros extra.
- [x] Implementar contexto opcional. Fichas pasan `service.name`; página especializada pasa `extensiones de cabello`; tratamientos pasa `tratamientos capilares`. Hero general, footer y pagos continúan genéricos.
- [x] Analytics conserva un evento por clic. `service_name` toma interés del catálogo o `Valoración en salón`, sin capturar información personal. No añadir listeners duplicados ni disparar evento al renderizar.
- [x] Revisar Navbar para que la página especializada transmita también su interés a sus CTAs; prop opcional `valuationInterest?: string` basta si se necesita.
- [x] Introducir «Valoración» en móvil y microtexto del canal bajo CTA principal en ambas rutas; probar 320, 390, 768 y 1280 px. No abrir formulario.
- [x] En pagos mantener una acción primaria, explicar anticipo del servicio sin insinuar que la solicitud de valoración cobra automáticamente.
- [x] Sustituir pruebas antiguas que exigen todos los mensajes idénticos por casos genérico/contextual, conservando destino/teléfono/target/rel, ausencia de formulario y ausencia de reserva local.
- [x] Commit propuesto: `Aclarar valoración por WhatsApp`.

### Tarea 3 — Catálogo sin filtros solapados

**Archivos:** `src/components/ServicesSection.tsx`; `tests/photos.test.mjs` y, si conviene, `tests/catalog.test.mjs` registrado en `package.json`.

**Interfaces:** estado `ServiceCategory` existente, cuatro filtros visibles. Ancla de resultados `id="catalogo-servicios"` y encabezado enfocable programáticamente (`tabIndex={-1}`), sin añadirlo al orden normal de tabulación.

- [x] Añadir pruebas: Todos muestra 9 fichas; Coloración muestra IDs de categoría color; Rubios los de blondes; Extensiones los de extensions; no aparecen cortes retirados. No codificar cantidades por categoría distintas del catálogo real.
- [x] Eliminar opción `color-family`, actualizar etiquetas de categorías y acceso «Ver coloración». El botón selecciona `color`, sitúa el foco en encabezado de catálogo y desplaza respetando reduced-motion y el header fijo.
- [x] No mover foco al cambiar filtros directamente; mantenerlo en el filtro y comunicar conteo con un `aria-live="polite"` discreto si se agrega.
- [x] Ajustar título a la sección 2, conservar información oficial y acción de valoración en cada ficha.
- [x] Validar que el nuevo carrusel de familias no altera alineación de las fichas, ni muestra espacios vacíos forzados al abrir detalles.
- [x] Commit propuesto: `Simplificar catálogo de servicios`.

### Tarea 4 — Acabados móviles y relato de extensiones

**Archivos:** `Navbar.tsx`, `PhotoCarousel.tsx`, `src/index.css`, `src/pages/ExtensionsPage.tsx`; tests `tests/navigation.test.mjs`, `tests/photos.test.mjs`, `tests/extensions.test.mjs`.

- [x] Prueba de Escape: con menú móvil abierto y foco en enlace, Escape cierra el menú y devuelve foco al botón. Con submenú Servicios abierto, primer Escape cierra ese submenú; segundo Escape cierra menú móvil. Conservar su comportamiento de disclosure, no convertirlo en modal.
- [x] Hacer zonas táctiles de flechas e indicadores al menos 44×44 px; el punto visible puede seguir pequeño. No introducir colisiones ni invadir rostros/producto. No afirmar que los tamaños actuales incumplen WCAG AA: esta es una mejora de comodidad.
- [x] Conservar flechas de teclado, Home/End, swipe, anuncio de foto activa, diálogo nativo y foco restaurado al cerrar. Ejecutar pruebas existentes después del cambio.
- [x] Condensar la repetición en extensiones: producto real → qué se define en valoración → mantenimiento. Mantener H1 local, nombre de sistemas, fabricación artesanal confirmada, distinción colocación/mantenimiento, información local y FAQ útiles.
- [x] No inventar explicación técnica de Tape/Tape Invisible/Mega Hair; mantener explicación general actual hasta que Miller aporte las diferencias. Esta falta de datos no bloquea las fotos ni el contacto.
- [x] Usar texto legible para captions/condiciones (objetivo 12–14 px según contexto) y revisar contraste real. No agrandar todos los textos del sitio indiscriminadamente.
- [x] Commit propuesto: `Pulir navegación y lectura móvil`.

## 6. Verificación y entrega

- [ ] `npm run build` — genera prerender y salida Vercel sin errores.
- [ ] `npm run lint` — sin errores nuevos.
- [ ] `npm test` — navegación, fotos, analytics y valoración pasan con expectativas actualizadas.
- [ ] `npm run test:seo` — HTML inicial, metadatos y extensiones pasan; no borrar assertions SEO para obtener verde.
- [ ] Ejecutar `npm run test:seo:preview` con la configuración local que sus tests requieren; revisar script antes de elegir puerto.
- [ ] Inspección real de ambas rutas en 390×844 y escritorio, más ajuste del header a 320 y 768 px. Carruseles, filtros, menú, detalles y zoom de imagen. Revisar consola e hidratación.
- [ ] Comprobar que URL de WhatsApp contiene mensaje correcto sin enviarlo; no contaminar métricas de producción con pruebas innecesarias.
- [ ] Comparar carga con condiciones iguales si se mide rendimiento: no afirmar mejora por una sola ejecución. Ningún HEIC/MOV original debe aparecer en salida pública.
- [ ] Resumen para usuario: qué cambió, siete fotos usadas, fotos en reserva, pruebas realizadas, capturas y hashes cortos. Indicar expresamente si no se desplegó.
- [ ] Si después se publica por encargo del usuario: verificar dominio real, imágenes/OG, rutas canónicas y ejecutar `npm run test:domain`. Registrar despliegue y commits que se pueden revertir con `git revert`, sin reset destructivo.

## 7. Evidencia de la revisión y límites

La auditoría previa combinó dos agentes independientes con inspección de escritorio/móvil. El detector CLI de Impeccable devolvió permiso denegado: no existe una puntuación automática ni un informe de cero errores. La propuesta conserva la identidad y corrige claridad/recorrido; no exige volver a ejecutar una auditoría masiva antes de implementar.

Previsualizaciones de esta revisión, fuera del código del sitio:
- `/Users/ho/Documents/Codex/2026-10-07/vamo/outputs/miller-fotos-2026-11-04/contacto-1.jpg`
- `/Users/ho/Documents/Codex/2026-10-07/vamo/outputs/miller-fotos-2026-11-04/contacto-2.jpg`
- `/Users/ho/Documents/Codex/2026-10-07/vamo/outputs/miller-fotos-2026-11-04/inventario.json`

No usar las previsualizaciones para producción: son copias reducidas de análisis. El original manda para calidad y encuadre. Las fotos nuevas permiten sustituir las ilustraciones por producto fotografiado; todavía no prueban integración aplicada en raíz ni el proceso de fabricación. No inventar esas escenas o testimonios.

## 8. Resultado de ejecución — 4 de noviembre de 2026

- Implementación completa de las cuatro tareas; los commits sugeridos se agrupan en **un único commit** por petición del usuario.
- Fotografías: siete originales, 21 derivados WebP, ~2.56 MB en total, sin HEIC/MOV públicos. El detalle castaño grande pesa 354518 bytes: excepción a la meta orientativa de250KB para conservar textura; todos los demás grandes cumplen la meta y las variantes480 no superan90KB.
- Los nuevos carruseles usan la transición discreta existente de180ms. No se añadió fade de carga inicial: en la revisión una foto lazy permaneció sin pintarse hasta interactuar al usar el fade adicional. La animación previa de Sobre mí se conserva.
- La revisión independiente detectó el recorte de puntas oscuras y la fila de controles estrecha. Se corrigieron con posición individual85% y controles distribuidos en dos filas en contenedores pequeños. Verificación de botones44×44 en tablet.
- Pruebas finales:30 de interacción/medición,17 de SEO/hidratación y4 de HTTP local. Compilación y linter pasan; `git diff --check` sin errores.
- Browser: ambas rutas revisadas a390px y1280px; header medido a320px y controles a768px. Sin desbordamiento observado. Escape cierra primero submenú y después menú; foco vuelve al disparador. No se enviaron mensajes ni se publicó en producción.
- Se conserva el material anterior y los nueve servicios. Las técnicas de cada foto no confirmadas y los videos quedan en reserva según este plan.
- Capturas: `outputs/miller-fotos-2026-11-04/catalogo-desktop.png`, `extensiones-desktop.png`, `inicio-mobile.png`, bajo el workspace de esta conversación.

## 9. Instrucciones posteriores que prevalecen

Tras revisar el resultado, el usuario pidió controles más discretos y uniformes, una sola foto representativa de cada secuencia repetida, y retirar las reglas de pago de la web para coordinarlas por WhatsApp. La selección vigente está documentada en `docs/media/2026-11-04-ampliacion-fotografias.md`, sección «Selección vigente». No reintroducir porcentajes, anticipos ni políticas de cancelación siguiendo las secciones antiguas de este plan.
