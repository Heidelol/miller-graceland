# Contenido propio de extensiones

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reforzar la página existente de extensiones con información confirmada por Miller.

**Architecture:** Conservar la ruta, el diseño editorial y los enlaces actuales. Ampliar el texto de fabricación artesanal, añadir una sección breve sobre los sistemas y completar las preguntas existentes; mantener el contenido en el HTML prerenderizado.

**Tech Stack:** React, TypeScript, Vite y prerenderizado estático.

**Spec:** `docs/seo-local.md`, apartado «Contenido de extensiones: 24 de octubre de 2026».

## Global Constraints

- Información proporcionada por el negocio: ocho años de fabricación artesanal, cabello humano personalizado, cabello virgen y efectos balayage, sistemas Tape, Tape Invisible y Mega Hair.
- No inventar idoneidad, duración, periodicidad de mantenimiento, precios ni resultados de clientas.
- Conservar imágenes ilustrativas etiquetadas, valoración por WhatsApp, título y canónica actuales.
- Un solo commit breve y reversible; publicar y comprobar la URL real.

## Review Focus

- Lectura móvil sin desbordamiento ni texto truncado.
- Preguntas accesibles por teclado y enlaces de WhatsApp intactos.
- Contenido nuevo visible en el HTML inicial.
- Sin tarifas de mantenimiento presentadas como colocación nueva.
- Sin cambios a la portada, ficha de Google ni medición.

## Task 1: Ampliar y publicar contenido confirmado

- [x] Editar `src/data/extensionsPage.ts` y `src/pages/ExtensionsPage.tsx`; actualizar únicamente la fecha de extensiones en `public/sitemap.xml`.
- [x] Ejecutar compilación, linter y pruebas públicas/SEO existentes. Resultado: compilación correcta, linter limpio, 27 pruebas públicas y 13 SEO/renderizado correctas. No se añaden tests que solo repitan el texto editorial.
- [x] Revisar escritorio y móvil en el navegador, incluidos FAQ y valoración. Sin desbordamiento horizontal en vista móvil; FAQ abierto con Enter y tres enlaces de valoración en el contenido.
- [ ] Revisar el diff y guardar un commit corto; subir a GitHub, desplegar y verificar contenido/canónica en producción.
