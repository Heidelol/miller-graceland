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
  depositMXN: number; // Anticipo requerido para asegurar la cita con Mercado Pago
  popular?: boolean;
  image: string;
  includes: string[];
  tiers?: ServicePriceTier[];
  note?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  photo: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
}

export interface BookingDetails {
  service: ServiceItem;
  stylist: Stylist | null;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  paymentType: 'deposit' | 'full';
  totalAmount: number;
  paidAmount: number;
  bookingCode: string;
  createdAt: string;
}
