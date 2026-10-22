# Imágenes ilustrativas de extensiones

Generadas el 22 de octubre de 2026 con la herramienta integrada `image_gen`, por petición del usuario. Son referencias conceptuales, no fotografías de clientas, trabajos realizados ni productos específicos del salón.

Archivos finales:

- `public/images/extensions/cabello-ondulado-ia.webp`: 1122 × 1402 px, 118264 bytes.
- `public/images/extensions/detalle-extensiones-ia.webp`: 1200 × 900 px, 137098 bytes.

Ambas imágenes llevan la identificación visible «Imagen ilustrativa generada con IA» y textos alternativos que indican su origen. Los originales PNG se conservaron fuera del repositorio; las versiones WebP se prepararon con Sharp.

## Prompt de la imagen principal

Use case: photorealistic-natural. Asset type: vertical editorial photograph for the hair extensions service page of Miller Greiseland Studio in Chetumal, Mexico. Create a sophisticated realistic beauty photograph of an adult woman seen from behind, framing from upper back of head to waist, showcasing long dark brunette hair with softly blended caramel ends, natural soft waves, credible individual hair strands, healthy-looking but not impossibly glossy. Simple ivory silk blouse, neutral warm ivory studio background, soft natural daylight. Quiet luxury, restrained warm palette, no salon setting. Portrait 4:5 composition centered on the full hair length, enough room for a responsive crop, hair is the subject, face not shown. This is an illustrative conceptual image, not a before-and-after or evidence of a real salon result. No text, logo, watermark, split image, ornaments, fake badges or visible extension attachment claims. Generate one photograph.

## Prompt del detalle

Use case: product-mockup. Asset type: secondary editorial photograph for Miller Greiseland Studio's hair extensions page. Create a realistic premium still-life of neatly arranged long dark chestnut human-hair style extension wefts and a single fine-tooth professional comb, on a warm matte ivory surface. Detailed lifelike fibers in gently curved flowing strands, discreet muted honey brass comb handle if visible, soft side daylight and realistic restrained shadows. Minimal editorial beauty photography, tactile natural materials, no packaging, no brand names, no salon claims. Landscape 4:3 composition with ample ivory negative space, warm brunette, ivory and subtle honey palette. This is an AI-generated illustrative still-life, not an actual salon product or client result. No text, logo, watermark, glitter, hands, people or collage. Generate one photograph.

## Comprobaciones reproducibles

- `npm run build`: compila el sitio, genera HTML específico de extensiones y prepara `.vercel/output`.
- `npm test`: catálogo, reservas y fotografías existentes.
- `npm run test:seo`: HTML, metadatos, navegación, valoración, identificación de IA, sitemap y rutas.
- Iniciar `npm run preview -- --host 127.0.0.1 --port 5182 --strictPort`, después `npm run test:seo:preview`: comprueba la URL directa y las redirecciones. Se puede usar `SEO_TEST_BASE_URL` para ejecutar esas mismas pruebas contra el dominio publicado.
