import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const route = '/extensiones-cabello-chetumal';
const canonical = `https://millergreiseland.com${route}`;
const builtFile = new URL(`../dist${route}/index.html`, import.meta.url);
const html = existsSync(builtFile) ? readFileSync(builtFile, 'utf8') : '';
const document = new JSDOM(html).window.document;

test('cada página comparte una única ficha Open Graph con sus propios datos e imagen', () => {
  const home = new JSDOM(readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')).window.document;
  const images = [];
  for (const page of [home, document]) {
    for (const property of ['type', 'title', 'description', 'url', 'image', 'image:alt', 'image:width', 'image:height', 'image:type', 'site_name', 'locale']) {
      const tags = page.querySelectorAll(`meta[property="og:${property}"]`);
      assert.equal(tags.length, 1, `Propiedad og:${property} ausente o duplicada en ${page.title}`);
      assert.ok(tags[0].content.trim());
    }
    assert.equal(page.querySelector('meta[property="og:title"]').content, page.title);
    assert.equal(page.querySelector('meta[property="og:description"]').content, page.querySelector('meta[name="description"]').content);
    assert.equal(page.querySelector('meta[property="og:url"]').content, page.querySelector('link[rel="canonical"]').href);
    const image = new URL(page.querySelector('meta[property="og:image"]').content);
    assert.equal(image.origin, 'https://millergreiseland.com');
    assert.ok(existsSync(new URL(`../public${image.pathname}`, import.meta.url)));
    images.push(image.href);
  }
  assert.notEqual(images[0], images[1], 'La portada y extensiones deben tener imágenes propias');
});

test('el logo del marcado conserva un archivo real de dimensiones suficientes y menos de 30 KB', () => {
  const salon = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)).find(s => s['@type'] === 'HairSalon');
  const url = new URL(salon.logo);
  const logo = readFileSync(new URL(`../public${url.pathname}`, import.meta.url));
  assert.ok(logo.length < 30_000, 'El logo del marcado sigue siendo demasiado pesado');
  assert.equal(logo.subarray(1, 4).toString(), 'PNG');
  assert.ok(logo.readUInt32BE(16) >= 112);
  assert.ok(logo.readUInt32BE(20) >= 112);
});

test('la caché larga se limita a bundles versionados publicados y las imágenes pueden actualizarse', () => {
  const home = new JSDOM(readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')).window.document;
  const { routes } = JSON.parse(readFileSync(new URL('../.vercel/output/config.json', import.meta.url), 'utf8'));
  const headers = path => routes.filter(r => r.src && new RegExp(`^(?:${r.src})$`).test(path)).map(r => r.headers?.['Cache-Control']).filter(Boolean);
  const bundles = [...home.querySelectorAll('script[src],link[rel="stylesheet"]')].map(el => el.getAttribute('src') || el.getAttribute('href')).filter(path => path.startsWith('/assets/'));
  assert.ok(bundles.length >= 2);
  for (const path of bundles) assert.deepEqual(headers(path), ['public, max-age=31536000, immutable']);
  assert.deepEqual(headers('/images/hero/portada-480.webp'), ['public, max-age=3600, must-revalidate']);
  assert.deepEqual(headers('/logo-miller-small.png'), ['public, max-age=3600, must-revalidate']);
  for (const path of ['/', '/extensiones-cabello-chetumal', '/robots.txt', '/sitemap.xml', '/assets/no-existe-ABC12345.js', '/assets/unversioned.js', '/images/no-existe.webp']) {
    assert.deepEqual(headers(path), [], `Caché prolongada en una URL no permitida: ${path}`);
  }
});

test('la compilación publica una página de extensiones con contenido visible sin ejecutar JavaScript', () => {
  assert.ok(html, 'Falta el HTML independiente de extensiones');
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.match(document.querySelector('h1').textContent, /Extensiones de cabello en Chetumal/);
});

test('extensiones tiene título, descripción y canónica propios desde el HTML inicial', () => {
  assert.equal(document.title, 'Extensiones de cabello en Chetumal | Miller Greiseland');
  assert.equal(document.querySelector('link[rel="canonical"]')?.href, canonical);
  assert.match(document.querySelector('meta[name="description"]')?.content || '', /valoración/);
  assert.equal(document.querySelector('meta[property="og:url"]')?.content, canonical);
});

test('la inversión se presenta por valoración sin inventar precios ni anticipos para colocación nueva', () => {
  const section = document.querySelector('#valoracion');
  assert.ok(section);
  assert.match(section.textContent, /Requiere valoración/);
  assert.doesNotMatch(section.textContent, /\$\s*\d|\d+\s*MXN/);
  const link = [...section.querySelectorAll('a')].find(a => a.textContent.includes('Solicitar valoración'));
  assert.ok(link);
  const url = new URL(link.href);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/529831373038');
  assert.match(url.searchParams.get('text'), /valoración en el salón/i);
});

test('las dos imágenes generadas conservan identificación visible, alt, dimensiones y archivos locales', () => {
  const figures = [...document.querySelectorAll('figure[data-ai-illustration]')];
  assert.equal(figures.length, 2);
  for (const figure of figures) {
    assert.match(figure.querySelector('figcaption')?.textContent || '', /Imagen ilustrativa generada con IA/);
    const image = figure.querySelector('img');
    assert.match(image.alt, /ilustrativa.*IA/i);
    assert.ok(Number(image.getAttribute('width')) > 0);
    assert.ok(Number(image.getAttribute('height')) > 0);
    assert.ok(existsSync(new URL(`../public${image.getAttribute('src')}`, import.meta.url)));
  }
  assert.doesNotMatch(document.querySelector('main')?.textContent || '', /antes y después|clientas satisfechas/i);
});

test('la navegación de la página interna vuelve a las secciones de la portada y permite volver al inicio', () => {
  assert.equal(document.querySelector('a[aria-label="Miller Greiseland Studio · Inicio"]')?.getAttribute('href'), '/');
  for (const id of ['servicios', 'experiencia', 'conoceme', 'pagos', 'faq']) {
    assert.ok(document.querySelector(`header a[href="/#${id}"]`), id);
    assert.equal(document.querySelector(`header a[href="#${id}"]`), null);
  }
});

test('los datos estructurados describen esta página y el mismo salón sin calificaciones ni importes inventados', () => {
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent));
  const serialized = JSON.stringify(schemas);
  assert.ok(schemas.some(s => s['@type'] === 'WebPage' && s.url === canonical));
  assert.ok(schemas.some(s => s['@type'] === 'HairSalon' && s['@id'] === 'https://millergreiseland.com/#salon'));
  assert.doesNotMatch(serialized, /aggregateRating|priceCurrency|ratingValue/);
});

test('el sitemap incluye la portada y la ruta nueva', () => {
  const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/millergreiseland\.com\/<\/loc>/);
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
});

test('el despliegue resuelve extensiones, normaliza su barra final y conserva un 404 real para otras rutas', () => {
  const file = new URL('../.vercel/output/config.json', import.meta.url);
  assert.ok(existsSync(file), 'Falta configuración reproducible de despliegue');
  const { routes } = JSON.parse(readFileSync(file, 'utf8'));
  assert.ok(routes.some(r => r.src === route && r.dest === `${route}/index.html`));
  assert.ok(routes.some(r => r.src === `${route}/` && r.status === 308 && r.headers.Location === route));
  assert.ok(routes.some(r => r.src === `${route}/index.html` && r.status === 308 && r.headers.Location === route));
  assert.ok(routes.some(r => r.src === '/.*' && r.status === 404));
  assert.ok(existsSync(new URL('../dist/404.html', import.meta.url)));
});
