export interface StudioPhoto {
  src: string;
  smallSrc?: string;
  mediumSrc?: string;
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

function hairPhoto(slug: string, alt: string, height = 2133, objectPosition = 'center'): StudioPhoto {
  return { src: `/images/studio/${slug}.webp`, smallSrc: `/images/studio/${slug}-480.webp`, mediumSrc: `/images/studio/${slug}-768.webp`, alt, width: 1200, height, objectPosition };
}

const brownExtensionPhotos = [
  hairPhoto('extensiones-castanas-presentacion', 'Piezas de cabello castaño ondulado junto a una caja negra sobre un carrito dorado', 1600),
  hairPhoto('extensiones-castanas-ondas', 'Piezas castañas con ondas dispuestas sobre el carrito dorado', 2133, 'center 75%'),
  hairPhoto('extensiones-castanas-tonos', 'Tonos claros y castaños en piezas de cabello ondulado', 2133, 'center 75%'),
  hairPhoto('extensiones-castanas-angulo', 'Piezas de cabello castaño ondulado vistas desde un lateral', 2133, 'center 75%'),
  hairPhoto('extensiones-castanas-textura', 'Textura ondulada de piezas castañas junto a una caja negra', 2133, 'center 75%'),
  hairPhoto('extensiones-castanas-longitud', 'Vista de la longitud de las piezas de cabello castaño', 2133, 'center 75%'),
  hairPhoto('extensiones-castanas-acabado', 'Ondas y puntas de piezas castañas sobre el carrito dorado', 2133, 'center 75%'),
  hairPhoto('extensiones-castanas-detalle', 'Detalle de ondas y tonos claros en piezas de cabello castaño', 2133, 'center 75%'),
];
const darkExtensionPhotos = [
  hairPhoto('extensiones-oscuras-presentacion', 'Piezas de cabello oscuro ondulado junto a cajas negras', 2133, 'center 85%'),
  hairPhoto('extensiones-oscuras-ondas', 'Ondas de piezas de cabello oscuro presentadas en el estudio', 2133, 'center 85%'),
  hairPhoto('extensiones-oscuras-detalle', 'Detalle de piezas oscuras onduladas sobre un carrito dorado', 2133, 'center 85%'),
];
const straightExtensionPhoto = hairPhoto('extensiones-castanas-lisas', 'Pieza larga de cabello castaño liso sobre una superficie clara', 2133, 'center 75%');
const colorPhotos = [
  hairPhoto('cabello-castano-ondas', 'Cabello castaño con ondas visto de espalda en el salón', 2133, 'center 65%'),
  hairPhoto('cabello-rubio-liso', 'Cabello rubio liso visto de espalda en el salón', 2133, 'center 65%'),
  hairPhoto('cabello-castano-retrato', 'Retrato con cabello castaño largo peinado con ondas', 2133, 'center 70%'),
  hairPhoto('cabello-castano-ondas-otra-vista', 'Otra vista del cabello castaño peinado con ondas en el salón', 2133, 'center 65%'),
  ...[1,2,3,4,5,6,7].map((number) => hairPhoto(`cabello-oscuro-liso-${number}`, `Cabello oscuro liso en el estudio · Vista ${number}`, 2133, 'center 70%')),
];

export const EXTENSION_PAGE_PHOTOS = {
  hero: brownExtensionPhotos[0],
  details: [darkExtensionPhotos[0], ...brownExtensionPhotos.slice(1), ...darkExtensionPhotos.slice(1), straightExtensionPhoto],
};

// Selecciones visibles en el contenido, además de los ángulos navegables de cada familia.
export const HOME_RESULTS_PHOTOS = [colorPhotos[1], colorPhotos[2], colorPhotos[3], colorPhotos[4], colorPhotos[7], colorPhotos[10]];
export const EXTENSION_GALLERY_PHOTOS = [brownExtensionPhotos[1], brownExtensionPhotos[3], brownExtensionPhotos[7], darkExtensionPhotos[1], darkExtensionPhotos[2], straightExtensionPhoto];

// Material previo conservado para una futura selección editorial.
export const COLOR_PRODUCT_PHOTOS = [
  photo('tintes-1', 'Herramientas y productos para preparar la coloración', 'center 58%'),
  photo('tintes-2', 'Detalle de brochas y recipiente de preparación del color', 'center 55%'),
];

export const STUDIO_PHOTOS = {
  treatments: [
    photo('tratamientos-1', 'Productos Lendan PlexForte para el cuidado capilar', 'center 48%'),
    photo('tratamientos-2', 'Productos de la línea Brazilian Blowout', 'center 48%'),
  ],
  color: colorPhotos,
  extensions: [...brownExtensionPhotos, ...darkExtensionPhotos, straightExtensionPhoto],
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
].map(image => ({ ...image, fit: 'cover' as const }));
