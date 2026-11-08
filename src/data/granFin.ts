// Announce the campaign before the offers begin on November 13. Chetumal is UTC−05:00.
export const GRAN_FIN_START = Date.parse('2026-11-08T00:00:00-05:00');
export const GRAN_FIN_END = Date.parse('2026-11-18T00:00:00-05:00');
export const GRAN_FIN_DATES = 'Del 13 al 17 de noviembre';
export const GRAN_FIN_COVER = '/images/gran-fin/01-portada.webp';

export const GRAN_FIN_OFFERS = [
  {
    title: 'Extensiones de 18 pulgadas',
    detail: '$6,000 MXN en el color que elijas. Precio regular: $8,000 MXN.',
    image: '/images/gran-fin/02-extensiones.webp',
  },
  {
    title: 'Brazilian Blowout + retoque de tinte',
    detail: '$1,500 MXN para clientas frecuentes. $1,600 MXN para público general.',
    image: '/images/gran-fin/03-brazilian-blowout.webp',
  },
  {
    title: 'Tinte + ampolleta',
    detail: '$500 MXN. Exclusivo para clientas del salón, de 9:00 a 11:00 a. m.',
    image: '/images/gran-fin/04-tinte-ampolleta.webp',
  },
  {
    title: 'Corte + hidratación',
    detail: '$400 MXN. Exclusivo para clientas frecuentes.',
    image: '/images/gran-fin/05-corte-hidratacion.webp',
  },
] as const;
