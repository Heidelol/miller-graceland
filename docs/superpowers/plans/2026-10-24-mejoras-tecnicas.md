# Compartir enlaces, caché y diagnóstico de fuentes

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ejecutar los cinco ajustes aprobados conservando diseño, tipografías y contenido comercial.

**Architecture:** Generar Open Graph en el prerenderizado con valores propios por ruta; usar el logo JPEG oficial existente para compartir la portada y el PNG pequeño existente para el marcado. Generar reglas exactas de caché para archivos publicados: un año inmutable para bundles versionados y una hora con revalidación para imágenes de URL estable. Medir después un único cambio de precarga, sin sustituir familias tipográficas.

**Tech Stack:** React, Vite, Node.js, Build Output API de Vercel, pruebas node:test/jsdom y PageSpeed móvil.

**Spec:** Alcance aprobado en la conversación: Open Graph por página, logo a `/`, caché diferenciada, logo optimizado en JSON-LD y diagnóstico/prueba de fuentes.

## Global Constraints

- Conservar fotos, familias tipográficas, animaciones y flujo de valoración.
- Sin páginas nuevas, marcado FAQPage, precios ni coordenadas inventadas.
- La portada comparte el logo oficial ya existente; extensiones mantiene su imagen ilustrativa identificada.
- HTML, robots, sitemap, rutas inexistentes y archivos sin hash no reciben caché inmutable.
- No retirar precargas ni conservar experimentos basándose en una sola puntuación.
- Commits breves y reversibles, push y verificación del dominio público.

## Review Focus

- Un único valor por propiedad Open Graph y metadatos independientes en ambas rutas.
- Imágenes compartidas accesibles y de dimensiones coherentes; marcado usa logo real de más de 112 px.
- Una URL inexistente bajo assets/images conserva 404 sin caché prolongada.
- Cambiar una imagen con la misma URL puede mantenerla hasta una hora; para actualizaciones inmediatas cambiar el nombre de archivo.
- Las mediciones de laboratorio se distinguen de usuarios reales y no se atribuyen a posiciones en Google.

## Task 1: Compartir enlaces y logo

- [x] Añadir pruebas de metadatos únicos por página y del enlace de inicio del logo; comprobar fallo antes de implementar.
- [x] Generar Open Graph desde la plantilla limpia y valores por ruta; referenciar el PNG pequeño en el JSON-LD y `/` en el logo.
- [x] Ejecutar compilación, linter, pruebas públicas y SEO. 45 pruebas correctas.

## Task 2: Caché de archivos existentes

- [x] Probar políticas para bundles con hash, imágenes de URL estable, HTML y rutas inexistentes.
- [x] Generar reglas exactas de archivos antes de filesystem; no aplicar políticas a rutas inexistentes.
- [x] Revisar diff, guardar commit, publicar y comprobar cabeceras públicas y metadatos. Commit `4493aa8`; cabeceras y ambas fichas OG verificadas en el dominio real, incluido 404 sin caché prolongada.

## Task 3: Diagnóstico de LCP

- [x] Obtener una medición móvil actual e identificar elemento LCP/desglose. Tres referencias: 79/79/79 y LCP 5.1/5.1/5.1 s; párrafo de presentación. API pública sin cuota; mediciones realizadas en PageSpeed Insights mediante navegador.
- [x] Comparar varias mediciones de base con una variante que precargue Cormorant Garamond cursiva en lugar de Playfair Display cursiva, sin cambiar fuentes ni diseño. Control técnico: 95/95/93 (LCP 2.7/2.7/2.9 s); variante: 78/93/78 (LCP 5.1/3.0/5.1 s).
- [x] Conservar y registrar el cambio solo con mejora consistente; si no, restaurar la base y documentar la incertidumbre. Se descarta la variante y se restaura el despliegue `dpl_7r4AJUfb2SAGEcHCDD8FKLiCP9kU`, con HTML idéntico a la compilación local y sin cambios tipográficos pendientes.
- [x] Entregar URLs, commits, pruebas y resultados medidos, sin prometer una subida de ranking. Restauración medida: 93/79/79 (LCP 3.0/5.1/5.1 s). El LCP sigue pendiente; las 53 pruebas y las cabeceras/metadatos públicos están verificados.
