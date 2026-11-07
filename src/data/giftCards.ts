import { SALON_INFO } from './salonData';

export type GiftCard = {
  slug: string;
  name: string;
  description: string;
};

export const GIFT_CARDS: readonly GiftCard[] = [
  {
    slug: 'corte-hidratacion',
    name: 'Corte e hidratación',
    description: 'Corte de cabello personalizado y tratamiento de hidratación.',
  },
  {
    slug: 'hidratacion',
    name: 'Hidratación capilar',
    description: 'Una experiencia de hidratación para tu cabello.',
  },
  {
    slug: 'tinte-hidratacion',
    name: 'Tinte e hidratación profunda',
    description: 'Servicio de tinte acompañado de hidratación profunda.',
  },
  {
    slug: 'brazilian-blowout',
    name: 'Brazilian Blowout',
    description: 'Tratamiento antifrizz Brazilian Blowout.',
  },
];

export function getGiftCardPath(card: GiftCard): string {
  return `/regalos/${card.slug}`;
}

export function getGiftCardByPath(pathname: string): GiftCard | undefined {
  return GIFT_CARDS.find(card => getGiftCardPath(card) === pathname);
}

export function buildGiftCardWhatsAppUrl(card: GiftCard): string {
  const message = `Hola, recibí la gift card de ${card.name}. Me gustaría coordinar mi visita a Miller Greiseland Studio.`;
  return `${SALON_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
