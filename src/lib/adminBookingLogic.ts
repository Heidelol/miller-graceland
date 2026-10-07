import type { AdminBooking, AdminKPIsData } from '../types/admin';
import { SERVICES } from '../data/salonData';

/**
 * Local date format helpers (avoids UTC timezone shift issues).
 */
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function getTodayLocalDate(): string {
  return formatLocalDate(new Date());
}

export function generateBookingId(): string {
  return `MG-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function getCurrentIsoTimestamp(): string {
  return new Date().toISOString();
}

export function addDaysToDate(dateStr: string, days: number): string {
  const date = parseLocalDate(dateStr);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

export function formatDateDisplay(dateStr: string, options: { short?: boolean } = {}): string {
  const date = parseLocalDate(dateStr);
  if (options.short) {
    return date.toLocaleDateString('es-MX', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }
  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Time conversion and math helpers.
 */
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function calculateEndTime(startTimeStr: string, durationMinutes: number): string {
  const startMins = timeToMinutes(startTimeStr);
  return minutesToTime(startMins + durationMinutes);
}

export function formatTimeDisplay(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

/**
 * Calculates balance for a booking.
 * If finalPriceMXN is null/undefined, balance is null ("Por confirmar").
 * Never uses the minimum catalog price to guess a final balance.
 */
export function calculateBalance(
  finalPriceMXN: number | null | undefined,
  receivedDepositMXN: number
): { balanceMXN: number | null; isPending: boolean } {
  if (finalPriceMXN === null || finalPriceMXN === undefined) {
    return { balanceMXN: null, isPending: true };
  }
  const balance = Math.max(0, finalPriceMXN - (receivedDepositMXN || 0));
  return { balanceMXN: balance, isPending: false };
}

/**
 * Checks schedule conflicts against existing non-cancelled bookings.
 * Simulated capacity: 1 simultaneous appointment at a time.
 */
export function hasScheduleConflict(
  bookings: AdminBooking[],
  candidateDate: string,
  candidateTime: string,
  candidateDurationMinutes: number,
  excludeBookingId?: string
): { hasConflict: boolean; conflictingBooking?: AdminBooking } {
  const candidateStart = timeToMinutes(candidateTime);
  const candidateEnd = candidateStart + candidateDurationMinutes;

  for (const b of bookings) {
    // Cancelled bookings do NOT block slots
    if (b.status === 'cancelled') continue;
    // Exclude the booking itself when rescheduling
    if (excludeBookingId && b.id === excludeBookingId) continue;
    // Only check bookings on the exact same date
    if (b.date !== candidateDate) continue;

    const existingStart = timeToMinutes(b.time);
    const existingEnd = existingStart + b.durationMinutes;

    // Overlap condition: startA < endB && startB < endA
    if (Math.max(candidateStart, existingStart) < Math.min(candidateEnd, existingEnd)) {
      return { hasConflict: true, conflictingBooking: b };
    }
  }

  return { hasConflict: false };
}

/**
 * Returns week days starting on Monday of the week containing baseDateStr.
 */
export function getWeekDays(baseDateStr: string): {
  dateStr: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  isToday: boolean;
  isSunday: boolean;
}[] {
  const base = parseLocalDate(baseDateStr);
  const dayOfWeek = base.getDay(); // 0 is Sunday, 1 is Monday
  // In Mexico/ISO, week starts on Monday
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);

  const todayStr = getTodayLocalDate();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    const dateStr = formatLocalDate(current);
    days.push({
      dateStr,
      dayName: current.toLocaleDateString('es-MX', { weekday: 'short' }),
      dayNumber: current.getDate(),
      monthName: current.toLocaleDateString('es-MX', { month: 'short' }),
      isToday: dateStr === todayStr,
      isSunday: current.getDay() === 0,
    });
  }

  return days;
}

/**
 * Calculate dynamic KPIs from bookings.
 */
export function calculateAdminKPIs(bookings: AdminBooking[]): AdminKPIsData {
  let confirmedCount = 0;
  let pendingPaymentCount = 0;
  let completedCount = 0;
  let cancelledCount = 0;
  let totalDepositsReceivedMXN = 0;
  let totalConfirmedRevenueMXN = 0;

  for (const b of bookings) {
    if (b.status === 'confirmed') confirmedCount++;
    if (b.status === 'pending_payment') pendingPaymentCount++;
    if (b.status === 'completed') completedCount++;
    if (b.status === 'cancelled') cancelledCount++;

    if (b.status !== 'cancelled') {
      totalDepositsReceivedMXN += b.receivedDepositMXN || 0;
      if (b.finalPriceMXN !== null && b.finalPriceMXN !== undefined) {
        totalConfirmedRevenueMXN += b.finalPriceMXN;
      }
    }
  }

  return {
    totalBookings: bookings.length,
    confirmedCount,
    pendingPaymentCount,
    completedCount,
    cancelledCount,
    totalDepositsReceivedMXN,
    totalConfirmedRevenueMXN,
  };
}

/**
 * Seed data for demo mode reusing the official 11 services.
 */
export function generateSeedBookings(): AdminBooking[] {
  const today = getTodayLocalDate();
  const yesterday = addDaysToDate(today, -1);
  const tomorrow = addDaysToDate(today, 1);
  const dayAfterTomorrow = addDaysToDate(today, 2);

  const getService = (id: string) => SERVICES.find((s) => s.id === id) || SERVICES[0];

  const balayageRubio = getService('balayage-rubio');
  const corteSignature = getService('corte-signature');
  const morenaIluminada = getService('morena-iluminada');
  const retoqueColorMatiz = getService('retoque-color-matiz');
  const bajadaRecolocacion = getService('bajada-recolocacion-extensiones');
  const colorCompleto = getService('color-completo');
  const gentlemensCut = getService('gentlemens-cut');

  return [
    {
      id: 'MG-1042',
      clientName: 'Carolina Montes',
      clientPhone: '55 1234 5678',
      clientEmail: 'carolina.montes@gmail.com',
      serviceId: balayageRubio.id,
      serviceName: balayageRubio.name,
      date: today,
      time: '11:00',
      durationMinutes: balayageRubio.durationMinutes, // 240
      status: 'confirmed',
      requiredDepositMXN: balayageRubio.depositMXN, // 1600
      receivedDepositMXN: 1600,
      finalPriceMXN: 3800, // Saldo: $2,200 MXN
      notes: 'Cabello castaño oscuro virgen en raíz, desea rubio beige luminoso. Cita de valoración previa completada.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1043',
      clientName: 'Mariana Elizalde',
      clientPhone: '55 9876 5432',
      clientEmail: 'mariana.e@outlook.com',
      serviceId: corteSignature.id,
      serviceName: corteSignature.name,
      date: today,
      time: '16:00',
      durationMinutes: corteSignature.durationMinutes, // 60
      status: 'confirmed',
      requiredDepositMXN: corteSignature.depositMXN, // 225
      receivedDepositMXN: 225,
      finalPriceMXN: null, // "Por confirmar"
      notes: 'Busca visagismo para enmarcar pómulos y recomendación para caída de cabello.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1044',
      clientName: 'Sofía Larrondo',
      clientPhone: '55 4567 8901',
      clientEmail: 'sofia.larrondo@gmail.com',
      serviceId: morenaIluminada.id,
      serviceName: morenaIluminada.name,
      date: tomorrow,
      time: '10:30',
      durationMinutes: morenaIluminada.durationMinutes, // 210
      status: 'pending_payment',
      requiredDepositMXN: morenaIluminada.depositMXN, // 1400
      receivedDepositMXN: 0,
      finalPriceMXN: null, // "Por confirmar"
      notes: 'Pendiente comprobante de anticipo vía transferencia/Mercado Pago.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1045',
      clientName: 'Valeria Sánchez',
      clientPhone: '55 2345 6789',
      clientEmail: 'valeria.s@empresa.com',
      serviceId: retoqueColorMatiz.id,
      serviceName: retoqueColorMatiz.name,
      date: tomorrow,
      time: '15:00',
      durationMinutes: retoqueColorMatiz.durationMinutes, // 105
      status: 'confirmed',
      requiredDepositMXN: retoqueColorMatiz.depositMXN, // 425
      receivedDepositMXN: 425,
      finalPriceMXN: null, // "Por confirmar"
      notes: 'Crecimiento de 1.5 cm, matiz perlado para eliminar reflejos cobrizos.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1041',
      clientName: 'Regina Morales',
      clientPhone: '55 8765 4321',
      clientEmail: 'regina.morales@gmail.com',
      serviceId: bajadaRecolocacion.id,
      serviceName: bajadaRecolocacion.name,
      date: yesterday,
      time: '11:00',
      durationMinutes: bajadaRecolocacion.durationMinutes, // 180
      status: 'completed',
      requiredDepositMXN: bajadaRecolocacion.depositMXN, // 1250
      receivedDepositMXN: 1250,
      finalPriceMXN: 2800, // Saldo liquidado: $1,550
      notes: 'Mantenimiento de 150g de cabello. Bajada gratuita aplicada.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1046',
      clientName: 'Lucía Navarro',
      clientPhone: '55 3456 7890',
      clientEmail: 'lucia.navarro@yahoo.com',
      serviceId: colorCompleto.id,
      serviceName: colorCompleto.name,
      date: dayAfterTomorrow,
      time: '12:00',
      durationMinutes: colorCompleto.durationMinutes, // 120
      status: 'cancelled',
      requiredDepositMXN: colorCompleto.depositMXN, // 450
      receivedDepositMXN: 0,
      finalPriceMXN: null,
      notes: 'Canceló con 48h de anticipación por viaje de trabajo. Horario liberado.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1047',
      clientName: 'Andrés Gómez',
      clientPhone: '55 6789 0123',
      clientEmail: 'andres.g@tech.mx',
      serviceId: gentlemensCut.id,
      serviceName: gentlemensCut.name,
      date: dayAfterTomorrow,
      time: '15:30',
      durationMinutes: gentlemensCut.durationMinutes, // 45
      status: 'confirmed',
      requiredDepositMXN: gentlemensCut.depositMXN, // 175
      receivedDepositMXN: 175,
      finalPriceMXN: 350,
      notes: 'Corte regular caballeros con lavado y peinado.',
      createdAt: new Date().toISOString(),
    },
  ];
}
