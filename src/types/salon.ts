export type ServiceCategory = 
  | 'todos'
  | 'colorimetria'
  | 'extensiones'
  | 'tratamientos'
  | 'cortes';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'colorimetria' | 'extensiones' | 'tratamientos' | 'cortes';
  tagline: string;
  description: string;
  durationMinutes: number;
  priceMXN: number;
  depositMXN: number; // Anticipo requerido para asegurar la cita
  popular?: boolean;
  image: string;
  includes: string[];
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
