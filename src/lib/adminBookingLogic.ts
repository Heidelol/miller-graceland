import type { AdminBooking, AdminKPIsData, BookingStatus, AgendaViewMode } from '../types/admin';
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
  if (!dateStr || typeof dateStr !== 'string' || !dateStr.includes('-')) {
    return new Date();
  }
  const [year, month, day] = dateStr.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return new Date();
  }
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
  if (!dateStr || typeof dateStr !== 'string') return 'Fecha no disponible';
  try {
    const date = parseLocalDate(dateStr);
    if (isNaN(date.getTime())) return dateStr;
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
  } catch {
    return dateStr;
  }
}

/**
 * Time conversion and math helpers.
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (isNaN(hours) ? 0 : hours) * 60 + (isNaN(minutes) ? 0 : minutes);
}

export function minutesToTime(totalMinutes: number): string {
  const safeMins = Math.max(0, isNaN(totalMinutes) ? 0 : totalMinutes);
  const hours = Math.floor(safeMins / 60) % 24;
  const minutes = safeMins % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function calculateEndTime(startTimeStr: string, durationMinutes: number): string {
  const startMins = timeToMinutes(startTimeStr);
  return minutesToTime(startMins + (Number.isFinite(durationMinutes) ? durationMinutes : 60));
}

export const SALON_OPERATING_HOURS = {
  openHour: 11,
  closeHour: 19,
  openTime: '11:00',
  closeTime: '19:00',
  openMinutes: 11 * 60, // 660
  closeMinutes: 19 * 60, // 1140
  scheduleText: '11:00 a. m. a 7:00 p. m.',
};

/**
 * Checks whether a given start time and duration fits completely within the salon operating hours (11:00 - 19:00).
 */
export function isWithinOperatingHours(timeStr: string, durationMinutes: number = 60): boolean {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return false;
  const startMins = timeToMinutes(timeStr);
  const duration = Math.max(1, Number.isFinite(durationMinutes) ? durationMinutes : 60);
  const endMins = startMins + duration;
  return startMins >= SALON_OPERATING_HOURS.openMinutes && endMins <= SALON_OPERATING_HOURS.closeMinutes;
}

/**
 * Generates available start time slots that can accommodate the service duration without exceeding 19:00.
 */
export function getAvailableStartSlots(durationMinutes: number, intervalMinutes: number = 30): string[] {
  const slots: string[] = [];
  const duration = Math.max(1, Number.isFinite(durationMinutes) ? durationMinutes : 60);
  for (
    let mins = SALON_OPERATING_HOURS.openMinutes;
    mins + duration <= SALON_OPERATING_HOURS.closeMinutes;
    mins += intervalMinutes
  ) {
    slots.push(minutesToTime(mins));
  }
  return slots;
}

export function formatTimeDisplay(timeStr: string): string {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
    return timeStr || 'Por confirmar';
  }
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours)) return timeStr;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(isNaN(minutes) ? 0 : minutes).padStart(2, '0')} ${period}`;
}

export interface BalanceCalculation {
  isPending: boolean;
  /** Saldo pendiente por liquidar (0 si está cubierto o si hay saldo a favor; null si está 'Por confirmar') */
  pendingBalanceMXN: number | null;
  /** Propiedad compatible con balanceMXN */
  balanceMXN: number | null;
  /** Saldo a favor de la clienta cuando anticipo recibido > precio final */
  creditBalanceMXN: number;
  /** Indica si existe saldo a favor */
  hasCredit: boolean;
  /** Texto explicativo detallado y matemáticamente riguroso */
  explanation?: string;
}

/**
 * Calculates balance for a booking.
 * - When finalPriceMXN is null/undefined: balance is null ("Por confirmar").
 * - When finalPriceMXN >= receivedDepositMXN: pending balance = finalPrice - receivedDeposit, credit = 0.
 * - When finalPriceMXN < receivedDepositMXN: pending balance = 0, credit balance = receivedDeposit - finalPrice ("Saldo a favor").
 */
export function calculateBalance(
  finalPriceMXN: number | null | undefined,
  receivedDepositMXN: number
): BalanceCalculation {
  const deposit = typeof receivedDepositMXN === 'number' && Number.isFinite(receivedDepositMXN)
    ? Math.max(0, receivedDepositMXN)
    : 0;

  if (finalPriceMXN === null || finalPriceMXN === undefined) {
    return {
      isPending: true,
      pendingBalanceMXN: null,
      balanceMXN: null,
      creditBalanceMXN: 0,
      hasCredit: false,
      explanation: 'El saldo definitivo se calculará una vez que se registre el precio final tras la valoración en el salón.',
    };
  }

  const finalPrice = typeof finalPriceMXN === 'number' && Number.isFinite(finalPriceMXN)
    ? Math.max(0, finalPriceMXN)
    : 0;

  if (finalPrice >= deposit) {
    const pending = finalPrice - deposit;
    return {
      isPending: false,
      pendingBalanceMXN: pending,
      balanceMXN: pending,
      creditBalanceMXN: 0,
      hasCredit: false,
      explanation: `$${finalPrice.toLocaleString('es-MX')} (precio final) − $${deposit.toLocaleString('es-MX')} (anticipo recibido) = $${pending.toLocaleString('es-MX')} MXN por liquidar.`,
    };
  } else {
    const credit = deposit - finalPrice;
    return {
      isPending: false,
      pendingBalanceMXN: 0,
      balanceMXN: 0,
      creditBalanceMXN: credit,
      hasCredit: true,
      explanation: `$${deposit.toLocaleString('es-MX')} (anticipo recibido) − $${finalPrice.toLocaleString('es-MX')} (precio final) = $${credit.toLocaleString('es-MX')} MXN de saldo a favor de la clienta.`,
    };
  }
}

/**
 * Determines the next BookingStatus when a deposit payment is recorded.
 * Rules:
 * 1. Cancelled bookings are NEVER reactivated automatically.
 * 2. Completed bookings are NEVER changed automatically.
 * 3. If receivedDeposit >= requiredDeposit: passes to 'confirmed'.
 * 4. If receivedDeposit < requiredDeposit: remains 'pending_payment'.
 */
export function determineStatusAfterDepositChange(
  currentStatus: BookingStatus,
  receivedDepositMXN: number,
  requiredDepositMXN: number
): BookingStatus {
  if (currentStatus === 'cancelled') {
    return 'cancelled';
  }
  if (currentStatus === 'completed') {
    return 'completed';
  }
  return receivedDepositMXN >= requiredDepositMXN ? 'confirmed' : 'pending_payment';
}

/**
 * Spanish human-readable status labels.
 */
export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending_payment: 'Pendiente de pago',
  confirmed: 'Confirmada',
  completed: 'Atendida',
  cancelled: 'Cancelada',
};

export function getBookingStatusLabel(status: BookingStatus): string {
  return BOOKING_STATUS_LABELS[status] || status;
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

export interface AgendaSummaryData {
  periodLabel: string;
  scopeSubtitle: string;
  appointmentsCount: number;
  pendingDepositCount: number;
  receivedDepositsMXN: number;
}

/**
 * Calculates compact summary data for the selected day or week.
 * - In Day view: reflects appointments and registered deposits on selectedDate.
 * - In Week view: reflects appointments and registered deposits for the 7 days of that week.
 * - Deposits represent actual registered money (receivedDepositMXN), not estimates or totals.
 */
export function calculateAgendaSummary(
  bookings: AdminBooking[],
  selectedDate: string,
  viewMode: AgendaViewMode
): AgendaSummaryData {
  if (viewMode === 'week') {
    const weekDays = getWeekDays(selectedDate);
    const weekDates = new Set(weekDays.map((d) => d.dateStr));
    const weekBookings = bookings.filter((b) => weekDates.has(b.date));
    const activeWeekBookings = weekBookings.filter((b) => b.status !== 'cancelled');

    const pendingDepositCount = activeWeekBookings.filter((b) => b.status === 'pending_payment').length;
    const receivedDepositsMXN = activeWeekBookings.reduce((sum, b) => sum + (b.receivedDepositMXN || 0), 0);

    const firstDay = weekDays[0];
    const lastDay = weekDays[6];
    const scopeSubtitle = `Semana del ${firstDay.dayNumber} ${firstDay.monthName} al ${lastDay.dayNumber} ${lastDay.monthName}`;

    return {
      periodLabel: 'Citas de la semana',
      scopeSubtitle,
      appointmentsCount: activeWeekBookings.length,
      pendingDepositCount,
      receivedDepositsMXN,
    };
  }

  // Day view (default)
  const dayBookings = bookings.filter((b) => b.date === selectedDate);
  const activeDayBookings = dayBookings.filter((b) => b.status !== 'cancelled');

  const pendingDepositCount = activeDayBookings.filter((b) => b.status === 'pending_payment').length;
  const receivedDepositsMXN = activeDayBookings.reduce((sum, b) => sum + (b.receivedDepositMXN || 0), 0);

  return {
    periodLabel: 'Citas del día',
    scopeSubtitle: formatDateDisplay(selectedDate, { short: true }),
    appointmentsCount: activeDayBookings.length,
    pendingDepositCount,
    receivedDepositsMXN,
  };
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
      clientPhone: '983 123 4567',
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
      hairProfile: {
        currentColor: 'Castaño oscuro natural (nivel 3)',
        desiredResult: 'Rubio beige luminoso con dimensión suave',
        hairLength: 'largo',
        previousColoring: 'no',
        lastProcessDetails: 'Sin procesos químicos previos en los últimos 2 años',
        additionalComments: 'Desea proteger las puntas con Ritual K18.',
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1043',
      clientName: 'Mariana Elizalde',
      clientPhone: '983 987 6543',
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
      notes: 'Busca visagismo para enmarcar pómulos y recomendación para cuidado en casa.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1044',
      clientName: 'Sofía Larrondo',
      clientPhone: '983 456 7890',
      clientEmail: 'sofia.larrondo@gmail.com',
      serviceId: morenaIluminada.id,
      serviceName: morenaIluminada.name,
      date: tomorrow,
      time: '11:00',
      durationMinutes: morenaIluminada.durationMinutes, // 210
      status: 'pending_payment',
      requiredDepositMXN: morenaIluminada.depositMXN, // 1400
      receivedDepositMXN: 0,
      finalPriceMXN: null, // "Por confirmar"
      notes: 'Pendiente comprobante de anticipo vía transferencia bancaria.',
      hairProfile: {
        currentColor: 'Castaño medio con reflejos cálidos',
        desiredResult: 'Morena iluminada avellana y caramelo',
        hairLength: 'medio',
        previousColoring: 'si',
        lastProcessDetails: 'Tinte tono sobre tono hace 6 meses',
        additionalComments: 'Busca mantener la base natural sin decoloración agresiva.',
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: 'MG-1045',
      clientName: 'Valeria Sánchez',
      clientPhone: '983 234 5678',
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
      clientPhone: '983 876 5432',
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
      clientPhone: '983 345 6789',
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
      clientPhone: '983 678 9012',
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
