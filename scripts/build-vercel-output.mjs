import { mkdir, cp, rm, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { relative, join, sep } from 'node:path';
import { register } from 'node:module';

register('./tsx-loader.mjs', import.meta.url);
const { GIFT_CARDS, getGiftCardPath } = await import('../src/data/giftCards.ts');

const output = new URL('../.vercel/output/', import.meta.url);
await mkdir(output, { recursive: true });
await rm(new URL('static/', output), { recursive: true, force: true });
await cp(new URL('../dist/', import.meta.url), new URL('static/', output), { recursive: true });
const staticPath = fileURLToPath(new URL('static/', output));
const files = (await readdir(staticPath, { recursive: true, withFileTypes: true }))
  .filter(entry => entry.isFile())
  .map(entry => relative(staticPath, join(entry.parentPath, entry.name)).split(sep).join('/'));
const cacheRoutes = files.sort().flatMap(file => {
  const versioned = /^assets\/[^/]+-[\w-]{8,}\.(?:js|css|woff2?|avif|webp|png|jpe?g|svg)$/.test(file);
  const image = !file.startsWith('assets/') && /\.(?:avif|webp|png|jpe?g|svg|ico)$/i.test(file);
  if (!versioned && !image) return [];
  return [{
    // Exact published files only: missing asset/image URLs must remain ordinary 404s.
    src: `^/${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
    headers: { 'Cache-Control': versioned ? 'public, max-age=31536000, immutable' : 'public, max-age=3600, must-revalidate' },
    continue: true,
  }];
});
const giftRoutes = GIFT_CARDS.flatMap(card => {
  const path = getGiftCardPath(card);
  return [
    { src: `${path}/index\\.html`, headers: { Location: path }, status: 308 },
    { src: `${path}/`, headers: { Location: path }, status: 308 },
    { src: path, dest: `${path}/index.html` },
  ];
});

await writeFile(new URL('config.json', output), JSON.stringify({
  version: 3,
  routes: [
    { src: '/extensiones-cabello-chetumal/index.html', headers: { Location: '/extensiones-cabello-chetumal' }, status: 308 },
    { src: '/extensiones-cabello-chetumal/', headers: { Location: '/extensiones-cabello-chetumal' }, status: 308 },
    { src: '/extensiones-cabello-chetumal', dest: '/extensiones-cabello-chetumal/index.html' },
    ...giftRoutes,
    ...cacheRoutes,
    { handle: 'filesystem' },
    { src: '/.*', dest: '/404.html', status: 404 },
  ],
}, null, 2));
console.log('Salida estática de Vercel preparada con extensiones, gift cards y 404.');
