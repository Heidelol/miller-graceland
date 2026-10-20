export interface StudioPhoto {
  src: string;
  smallSrc?: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
  fit?: 'cover' | 'contain';
  caption?: string;
}

function photo(slug: string, alt: string, objectPosition = 'center', width = 960, height = 1280, caption?: string): StudioPhoto {
  return { src: `/images/studio/${slug}.webp`, smallSrc: `/images/studio/${slug}-480.webp`, alt, width, height, objectPosition, caption };
}

export const STUDIO_PHOTOS = {
  treatments: [
    photo('tratamientos-1', 'Productos Lendan PlexForte para el cuidado capilar', 'center 48%'),
    photo('tratamientos-2', 'Productos de la línea Brazilian Blowout', 'center 48%'),
  ],
  color: [
    photo('tintes-1', 'Herramientas y productos para preparar la coloración', 'center 58%'),
    photo('tintes-2', 'Detalle de brochas y recipiente de preparación del color', 'center 55%'),
  ],
  extensions: [
    photo('extensiones-humanas', 'Retrato de presentación de extensiones con dos personas', 'center 10%', 941, 1672),
  ],
  avyna: [
    photo('avyna-1', 'Selección de productos Avyna sobre un carrito dorado', 'center 58%'),
    photo('avyna-2', 'Detalle de productos y sérum Avyna', 'center 58%'),
    photo('avyna-5', 'Productos Avyna dispuestos en el estante', 'center 52%'),
  ],
  chocolatto: [photo('chocolatto-1', 'Selección de productos Chocolatto', 'center 48%')],
  schwarzkopf: [
    photo('schwarzkopf-1', 'Productos Schwarzkopf Professional BlondMe', 'center 48%'),
    photo('schwarzkopf-2', 'Selección de tratamientos Schwarzkopf Professional BlondMe', 'center 48%'),
    photo('schwarzkopf-5', 'Productos Schwarzkopf Bonacure junto a productos Lendan', 'center 50%', 960, 1280, 'Schwarzkopf Bonacure y Lendan'),
  ],
  training: [
    photo('formacion-1', 'Fotografía de un encuentro durante la trayectoria de formación de Miller', 'center 35%', 941, 1672),
    photo('formacion-2', 'Fotografía de la trayectoria de formación con una bandera mexicana', 'center 40%', 941, 1672),
    photo('formacion-3', 'Fotografía de un encuentro de la trayectoria profesional de Miller', 'center 35%'),
  ],
  extensionServices: {
    reposition: photo('bajada-recolocacion', 'Extensiones de cabello preparadas sobre un carrito dorado', 'center 53%'),
    removal: photo('bajada-extensiones', 'Retrato de cabello largo como referencia del servicio de extensiones', 'center top', 960, 1200),
    wash: photo('hair-wash-extensiones', 'Lavado de cabello en un lavacabezas · Imagen ilustrativa', 'center 55%', 960, 1200),
  },
};

export const ABOUT_PHOTOS: StudioPhoto[] = [
  photo('conoceme', 'Retrato de Miller Greiseland', 'center', 960, 1263),
  ...STUDIO_PHOTOS.training,
].map(image => ({ ...image, fit: 'contain' as const }));
