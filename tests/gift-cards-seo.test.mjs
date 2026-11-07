import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const experiences = [
  ['corte-hidratacion', 'Corte e hidratación'],
  ['hidratacion', 'Hidratación capilar'],
  ['tinte-hidratacion', 'Tinte e hidratación profunda'],
  ['brazilian-blowout', 'Brazilian Blowout'],
];
const domain = 'https://millergreiseland.com';
const output = new URL('../.vercel/output/', import.meta.url);
const read = (path, base = new URL('../dist/', import.meta.url)) => readFileSync(new URL(path, base), 'utf8');

for (const [slug, name] of experiences) {
  test(`el HTML de ${slug} se puede compartir y excluye la indexación`, () => {
    const path = `/regalos/${slug}`;
    const file = `regalos/${slug}/index.html`;
    const html = read(file);
    assert.equal(read(`static/${file}`, output), html);
    const dom = new JSDOM(html);
    try {
      const { document } = dom.window;
      const single = (selector, attribute) => {
        const matches = document.querySelectorAll(selector);
        assert.equal(matches.length, 1, selector);
        return attribute ? matches[0].getAttribute(attribute) : matches[0].textContent;
      };
      assert.equal(document.documentElement.lang, 'es-MX');
      const title = `Gift Card · ${name} | Miller Greiseland Studio`;
      assert.equal(single('title'), title);
      const description = single('meta[name="description"]', 'content');
      assert.match(description, /Conoce tu regalo/);
      assert.equal(single('link[rel="canonical"]', 'href'), domain + path);
      assert.equal(single('meta[name="robots"]', 'content'), 'noindex, follow');
      assert.equal(single('meta[property="og:title"]', 'content'), title);
      assert.equal(single('meta[property="og:description"]', 'content'), description);
      assert.equal(single('meta[property="og:url"]', 'content'), domain + path);
      assert.equal(single('meta[property="og:type"]', 'content'), 'website');
      const image = new URL(single('meta[property="og:image"]', 'content'));
      assert.equal(image.origin, domain);
      assert.ok(readFileSync(new URL(`static${image.pathname}`, output)).length > 0);
      assert.equal(single('#root', 'data-ssr-path'), path);
      assert.ok(document.querySelector('main a[href^="https://wa.me/"]'));
      assert.match(single('h1'), /Una experiencia especialmente para ti/);
      assert.doesNotMatch([document.body.textContent, title, description].join(' '), /\$\s*\d|\bMXN\b/);
    } finally {
      dom.window.close();
    }
  });
}

test('las rutas de regalos se sirven antes del 404 y sus variantes redirigen', () => {
  const { routes } = JSON.parse(read('config.json', output));
  const filesystem = routes.findIndex(route => route.handle === 'filesystem');
  assert.ok(filesystem >= 0);
  const staticRoutes = routes.slice(0, filesystem);
  for (const [slug] of experiences) {
    const path = `/regalos/${slug}`;
    assert.equal(staticRoutes.find(route => route.src === path)?.dest, `${path}/index.html`);
    for (const variant of [`${path}/`, `${path}/index.html`]) {
      const redirect = staticRoutes.find(route => route.src && new RegExp(`^(?:${route.src})$`).test(variant));
      assert.equal(redirect?.status, 308);
      assert.equal(redirect?.headers.Location, path);
    }
  }
  for (const path of ['/regalos/', '/regalos/no-existe', '/regalos/hidratacion/indexXhtml', '/regalos/hidratacion/index/html']) {
    const route = routes.find(rule => rule.src && new RegExp(`^${rule.src}$`).test(path));
    assert.equal(route?.status, 404);
  }
});

test('los regalos quedan fuera del sitemap y las páginas actuales conservan su indexación', () => {
  assert.doesNotMatch(read('sitemap.xml'), /\/regalos\//);
  assert.doesNotMatch(read('robots.txt'), /disallow:\s*\/regalos/i);
  for (const path of ['index.html', 'extensiones-cabello-chetumal/index.html']) {
    const dom = new JSDOM(read(path));
    try {
      const { document } = dom.window;
      assert.doesNotMatch(document.querySelector('meta[name="robots"]')?.content ?? '', /noindex/i);
      assert.equal(document.querySelector('a[href^="/regalos/"]'), null);
    } finally {
      dom.window.close();
    }
  }
});
