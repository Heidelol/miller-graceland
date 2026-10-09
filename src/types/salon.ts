export type ServiceCategory = 
  | 'todos'
  | 'color'
  | 'blondes'
  | 'extensions'
  | 'cuts';

export interface ServicePriceTier {
  label: string;
  priceMXN: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'color' | 'blondes' | 'extensions' | 'cuts';
  tagline: string;
  shortSummary: string;
  description: string;
  durationMinutes: number;
  priceMXN: number; // Base minimum price for booking
  priceDisplay: string; // Official display format (e.g. "$2,800 — $3,800" or "Desde $650")
  depositMXN: number; // 50% del precio mínimo publicado; el precio final se confirma en el salón
  popular?: boolean;
  image: string;
  imageAlt?: string;
  imageObjectPosition?: string;
  isIllustrative?: boolean;
  includes: string[];
  tiers?: ServicePriceTier[];
  note?: string;
}

export interface BookingDetails {
  service: ServiceItem;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  paymentType: 'deposit';
  totalAmount: number;
  paidAmount: number;
  bookingCode: string;
  createdAt: string;
}
