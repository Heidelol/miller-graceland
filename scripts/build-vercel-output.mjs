import { mkdir, cp, rm, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { relative, join, sep } from 'node:path';

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
await writeFile(new URL('config.json', output), JSON.stringify({
  version: 3,
  routes: [
    { src: '/extensiones-cabello-chetumal/index.html', headers: { Location: '/extensiones-cabello-chetumal' }, status: 308 },
    { src: '/extensiones-cabello-chetumal/', headers: { Location: '/extensiones-cabello-chetumal' }, status: 308 },
    { src: '/extensiones-cabello-chetumal', dest: '/extensiones-cabello-chetumal/index.html' },
    ...cacheRoutes,
    { handle: 'filesystem' },
    { src: '/.*', dest: '/404.html', status: 404 },
  ],
}, null, 2));
console.log('Salida estática de Vercel preparada con ruta de extensiones y 404.');
