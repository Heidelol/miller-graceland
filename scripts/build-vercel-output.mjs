import { mkdir, cp, rm, writeFile } from 'node:fs/promises';

const output = new URL('../.vercel/output/', import.meta.url);
await mkdir(output, { recursive: true });
await rm(new URL('static/', output), { recursive: true, force: true });
await cp(new URL('../dist/', import.meta.url), new URL('static/', output), { recursive: true });
await writeFile(new URL('config.json', output), JSON.stringify({
  version: 3,
  routes: [
    { src: '/extensiones-cabello-chetumal/index.html', headers: { Location: '/extensiones-cabello-chetumal' }, status: 308 },
    { src: '/extensiones-cabello-chetumal/', headers: { Location: '/extensiones-cabello-chetumal' }, status: 308 },
    { src: '/extensiones-cabello-chetumal', dest: '/extensiones-cabello-chetumal/index.html' },
    { handle: 'filesystem' },
    { src: '/.*', dest: '/404.html', status: 404 },
  ],
}, null, 2));
console.log('Salida estática de Vercel preparada con ruta de extensiones y 404.');
