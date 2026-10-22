import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = process.env.SEO_TEST_BASE_URL || 'http://127.0.0.1:5182';
const path = '/extensiones-cabello-chetumal';

test('la URL directa entrega el HTML de extensiones antes de ejecutar JavaScript', async () => {
  const response = await fetch(`${base}${path}`, { redirect: 'manual' });
  assert.equal(response.status, 200);
  const document = new JSDOM(await response.text()).window.document;
  assert.equal(document.title, 'Extensiones de cabello en Chetumal | Miller Greiseland');
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.match(document.querySelector('h1').textContent, /Extensiones de cabello en Chetumal/);
});

for (const suffix of ['/', '/index.html']) {
  test(`la URL alternativa ${suffix} redirige a la URL canónica`, async () => {
    const response = await fetch(`${base}${path}${suffix}`, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), base).pathname, path);
  });
}

test('el panel retirado y sus subrutas responden 404 sin mostrar la portada', async () => {
  for (const retiredPath of ['/admin-demo', '/admin-demo/agenda']) {
    const response = await fetch(`${base}${retiredPath}`, { redirect: 'manual' });
    assert.equal(response.status, 404, `${retiredPath} sigue disponible`);
    const document = new JSDOM(await response.text()).window.document;
    assert.doesNotMatch(document.querySelector('h1')?.textContent ?? '', /El arte de sublimar/);
  }
});
