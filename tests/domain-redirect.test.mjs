import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const primary = 'https://millergreiseland.com';
const alternate = 'https://www.millergreiseland.com';
const request = (url, redirect = 'manual') => fetch(url, { redirect, signal: AbortSignal.timeout(15000) });

test('www redirige permanentemente al dominio principal conservando rutas y parámetros', async () => {
  for (const path of ['/', '/extensiones-cabello-chetumal', '/extensiones-cabello-chetumal/', '/sitemap.xml', '/admin-demo', '/pagina-inexistente']) {
    const query = '?utm_source=revision_seo&nota=color%20y%20extensiones&tag=color&tag=extensiones';
    const response = await request(`${alternate}${path}${query}`);
    assert.equal(response.status, 308, `${path} debe redirigir permanentemente`);
    assert.equal(response.headers.get('location'), `${primary}${path}${query}`);
  }
});

test('portada y extensiones del dominio principal responden sin bucles y con su canónica', async () => {
  for (const path of ['/', '/extensiones-cabello-chetumal']) {
    const response = await request(`${primary}${path}`);
    assert.equal(response.status, 200);
    const document = new JSDOM(await response.text()).window.document;
    assert.equal(document.querySelector('link[rel="canonical"]')?.href, `${primary}${path}`);
    assert.equal(document.querySelectorAll('h1').length, 1);
  }
});

test('seguir www permite llegar a extensiones y conserva los errores 404 del sitio', async () => {
  for (const [path, status, finalPath] of [
    ['/extensiones-cabello-chetumal/', 200, '/extensiones-cabello-chetumal'],
    ['/admin-demo', 404, '/admin-demo'],
    ['/pagina-inexistente', 404, '/pagina-inexistente'],
  ]) {
    const query = '?utm_source=revision_seo&nota=color%20y%20extensiones&tag=color&tag=extensiones';
    const response = await request(`${alternate}${path}${query}`, 'follow');
    assert.equal(response.status, status, path);
    const final = new URL(response.url);
    assert.equal(final.origin, primary);
    assert.equal(final.pathname, finalPath);
    assert.equal(final.search, query);
  }
});


test('una entrada HTTP con www termina en HTTPS y en el dominio principal', async () => {
  const response = await request('http://www.millergreiseland.com/?utm_source=revision_seo', 'follow');
  assert.equal(response.status, 200);
  assert.equal(response.url, `${primary}/?utm_source=revision_seo`);
});
