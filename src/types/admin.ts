export type BookingStatus = 'pending_payment' | 'confirmed' | 'completed' | 'cancelled';

export interface HairProfile {
  currentColor?: string;
  desiredResult?: string;
  hairLength?: 'corto' | 'medio' | 'largo' | string;
  previousColoring?: 'si' | 'no' | 'no_se' | string;
  lastProcessDetails?: string;
  additionalComments?: string;
}

export interface AdminBooking {
  id: string; // e.g. "MG-4102"
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD local format
  time: string; // HH:mm (24-hour format e.g. "11:00")
  durationMinutes: number;
  status: BookingStatus;
  requiredDepositMXN: number;
  receivedDepositMXN: number;
  finalPriceMXN: number | null; // null indicates "Por confirmar"
  notes?: string;
  hairProfile?: HairProfile;
  createdAt: string;
}

export type AdminTab = 'agenda' | 'bookings';
export type AgendaViewMode = 'day' | 'week';

export interface AdminKPIsData {
  totalBookings: number;
  confirmedCount: number;
  pendingPaymentCount: number;
  completedCount: number;
  cancelledCount: number;
  totalDepositsReceivedMXN: number;
  totalConfirmedRevenueMXN: number;
}
