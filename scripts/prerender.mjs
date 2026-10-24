import { register } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

register('./tsx-loader.mjs', import.meta.url);
const { ExtensionsPage } = await import('../src/pages/ExtensionsPage.tsx');
const { App } = await import('../src/App.tsx');
const { EXTENSIONS_PATH, EXTENSIONS_CANONICAL, EXTENSIONS_SEO } = await import('../src/data/extensionsPage.ts');
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('El HTML base no contiene el punto de montaje esperado.');

const attribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const withOpenGraph = (html, { title, description, url, image, imageAlt, width, height, imageType }) => {
  const properties = {
    type: 'website', title, description, url, image,
    'image:alt': imageAlt, 'image:width': String(width), 'image:height': String(height),
    'image:type': imageType, site_name: 'Miller Greiseland Studio', locale: 'es_MX',
  };
  // Each route replaces any inherited Open Graph tags rather than appending duplicates.
  const clean = html.replace(/<meta\b(?=[^>]*\bproperty\s*=\s*["']og:)[^>]*>\s*/gi, '');
  return clean.replace('</head>', `${Object.entries(properties).map(([property, value]) => `<meta property="og:${property}" content="${attribute(value)}" />`).join('')}\n</head>`);
};
const structuredData = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  '@id': `${EXTENSIONS_CANONICAL}#pagina`, url: EXTENSIONS_CANONICAL,
  name: EXTENSIONS_SEO.title, description: EXTENSIONS_SEO.description, inLanguage: 'es-MX',
  about: { '@type': 'Service', name: 'Valoración de extensiones de cabello', provider: { '@id': 'https://millergreiseland.com/#salon' } },
  isPartOf: { '@type': 'WebSite', '@id': 'https://millergreiseland.com/#sitio', url: 'https://millergreiseland.com/' },
};

const markup = renderToString(createElement(ExtensionsPage));
const html = withOpenGraph(template, {
  title: EXTENSIONS_SEO.title, description: EXTENSIONS_SEO.description, url: EXTENSIONS_CANONICAL,
  image: 'https://millergreiseland.com/images/extensions/cabello-ondulado-ia.webp',
  imageAlt: 'Imagen ilustrativa de cabello ondulado generada con IA',
  width: 1122, height: 1402, imageType: 'image/webp',
})
  .replace(/<title>[^<]*<\/title>/, `<title>${attribute(EXTENSIONS_SEO.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${attribute(EXTENSIONS_SEO.description)}" />`)
  .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${EXTENSIONS_CANONICAL}" />`)
  .replace('</head>', `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script></head>`)
  .replace('<div id="root"></div>', () => `<div id="root" data-ssr-path="${EXTENSIONS_PATH}">${markup}</div>`);
const directory = new URL(`../dist${EXTENSIONS_PATH}/`, import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('index.html', directory), html);
console.log(`HTML de extensiones generado: ${EXTENSIONS_PATH}`);

// Keep the same React tree for the first HTML response and client hydration.
// Read the empty Vite template before generating either public page.
const homeMarkup = renderToString(createElement(App));
const { SALON_INFO } = await import('../src/data/salonData.ts');
const homeTemplate = withOpenGraph(template, {
  title: template.match(/<title>([^<]*)<\/title>/)[1], description: SALON_INFO.description,
  url: 'https://millergreiseland.com/', image: 'https://millergreiseland.com/logo-miller.jpeg',
  imageAlt: 'Monograma dorado oficial de Miller Greiseland Studio',
  width: 1225, height: 1284, imageType: 'image/jpeg',
});
await writeFile(new URL('../dist/index.html', import.meta.url), homeTemplate.replace(
  '<div id="root"></div>', () => `<div id="root" data-ssr-path="/">${homeMarkup}</div>`
));
console.log('HTML de portada generado con contenido y enlaces utilizables sin JavaScript.');
