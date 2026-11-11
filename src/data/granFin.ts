// Announce the campaign before the offers begin on November 13. Chetumal is UTC−05:00.
export const GRAN_FIN_START = Date.parse('2026-11-08T00:00:00-05:00');
export const GRAN_FIN_END = Date.parse('2026-11-18T00:00:00-05:00');
export const GRAN_FIN_DATES = 'Del 13 al 17 de noviembre';
export const GRAN_FIN_COVER = '/images/gran-fin/01-portada-v2.webp';

export const GRAN_FIN_OFFERS = [
  {
    title: 'Extensiones de 18 pulgadas',
    detail: `$6,000 MXN en el color que elijas. Precio regular: $8,000 MXN. ${GRAN_FIN_DATES}.`,
    image: '/images/gran-fin/02-extensiones-v2.webp',
  },
  {
    title: 'Brazilian Blowout',
    detail: 'Con retoque de tinte por $1,500 MXN únicamente para clientas del salón. Brazilian Blowout por $1,600 MXN para clientas nuevas, antes $2,200 MXN.',
    image: '/images/gran-fin/03-brazilian-blowout-v2.webp',
  },
  {
    title: 'Tinte + ampolleta',
    detail: '$500 MXN. Exclusivo para clientas del salón, de 9:00 a 11:00 a. m.',
    image: '/images/gran-fin/04-tinte-ampolleta-v2.webp',
  },
  {
    title: 'Corte + hidratación',
    detail: `$400 MXN. Exclusivo para clientas frecuentes. ${GRAN_FIN_DATES}.`,
    image: '/images/gran-fin/05-corte-hidratacion-v2.webp',
  },
] as const;
