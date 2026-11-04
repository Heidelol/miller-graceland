import { SALON_INFO } from './salonData';

export const VALUATION_MESSAGE = 'Hola, Miller. Vi tu página y me gustaría agendar una cita para una valoración en el salón. ¿Qué disponibilidad tienes?';
export const VALUATION_WHATSAPP_URL = `${SALON_INFO.whatsappUrl}?text=${encodeURIComponent(VALUATION_MESSAGE)}`;

export function buildValuationUrl(interest?: string): string {
  const subject = interest?.trim();
  if (!subject) return VALUATION_WHATSAPP_URL;
  const message = `Hola, Miller. Me interesa ${subject} y quisiera solicitar una valoración en el salón. ¿Qué disponibilidad tienes?`;
  return `${SALON_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
