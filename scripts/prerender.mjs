import { register } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

register('./tsx-loader.mjs', import.meta.url);
const { ExtensionsPage } = await import('../src/pages/ExtensionsPage.tsx');
const { EXTENSIONS_PATH, EXTENSIONS_CANONICAL, EXTENSIONS_SEO } = await import('../src/data/extensionsPage.ts');
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('El HTML base no contiene el punto de montaje esperado.');

const attribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const structuredData = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  '@id': `${EXTENSIONS_CANONICAL}#pagina`, url: EXTENSIONS_CANONICAL,
  name: EXTENSIONS_SEO.title, description: EXTENSIONS_SEO.description, inLanguage: 'es-MX',
  about: { '@type': 'Service', name: 'Valoración de extensiones de cabello', provider: { '@id': 'https://millergreiseland.com/#salon' } },
  isPartOf: { '@type': 'WebSite', '@id': 'https://millergreiseland.com/#sitio', url: 'https://millergreiseland.com/' },
};

const markup = renderToString(createElement(ExtensionsPage));
const html = template
  .replace(/<title>[^<]*<\/title>/, `<title>${attribute(EXTENSIONS_SEO.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${attribute(EXTENSIONS_SEO.description)}" />`)
  .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${EXTENSIONS_CANONICAL}" />`)
  .replace('</head>', `<meta property="og:type" content="website" /><meta property="og:title" content="${attribute(EXTENSIONS_SEO.title)}" /><meta property="og:description" content="${attribute(EXTENSIONS_SEO.description)}" /><meta property="og:url" content="${EXTENSIONS_CANONICAL}" /><meta property="og:image" content="https://millergreiseland.com/images/extensions/cabello-ondulado-ia.webp" /><meta property="og:image:alt" content="Imagen ilustrativa de cabello ondulado generada con IA" /><script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script></head>`)
  .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`);
const directory = new URL(`../dist${EXTENSIONS_PATH}/`, import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('index.html', directory), html);
console.log(`HTML de extensiones generado: ${EXTENSIONS_PATH}`);
