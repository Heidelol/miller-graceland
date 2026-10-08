import type { AdminBooking, BookingStatus } from '../types/admin';
import { generateSeedBookings } from './adminBookingLogic';
import { SERVICES } from '../data/salonData';

export const ADMIN_STORAGE_KEY = 'mg_admin_demo_v1';

export interface StorageLoadResult {
  bookings: AdminBooking[];
  isInitialSeed: boolean;
  error?: string;
}

export interface StorageSaveResult {
  success: boolean;
  error?: string;
}

const ALLOWED_STATUSES: readonly BookingStatus[] = [
  'confirmed',
  'pending_payment',
  'completed',
  'cancelled',
] as const;

function isFiniteNonNegative(val: unknown): val is number {
  return typeof val === 'number' && Number.isFinite(val) && val >= 0;
}

function isValidDateString(val: unknown): val is string {
  if (typeof val !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(val)) return false;
  const [y, m, d] = val.split('-').map(Number);
  if (y < 2000 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dateObj = new Date(y, m - 1, d);
  return (
    dateObj.getFullYear() === y &&
    dateObj.getMonth() === m - 1 &&
    dateObj.getDate() === d
  );
}

function isValidTimeString(val: unknown): val is string {
  if (typeof val !== 'string' || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(val)) return false;
  return true;
}

/**
 * Detailed inspection of a booking candidate.
 * Returns the specific problem description if invalid, or null if valid.
 */
export function getBookingValidationIssue(item: unknown): string | null {
  if (!item || typeof item !== 'object') {
    return 'formato no es un objeto válido';
  }
  const b = item as Record<string, unknown>;

  // Required non-empty string fields
  if (typeof b.id !== 'string' || !b.id.trim()) {
    return 'identificador ausente o vacío';
  }
  if (typeof b.clientName !== 'string' || !b.clientName.trim()) {
    return 'nombre de clienta ausente o vacío';
  }
  if (typeof b.serviceId !== 'string' || !b.serviceId.trim()) {
    return 'identificador de servicio ausente';
  }

  // 1. Validate serviceId against official catalog SERVICES
  const serviceIdTrimmed = (b.serviceId as string).trim();
  const matchedService = SERVICES.find((s) => s.id === serviceIdTrimmed);
  if (!matchedService) {
    return `servicio no pertenece al catálogo oficial ("${b.serviceId}")`;
  }

  if (typeof b.serviceName !== 'string' || !b.serviceName.trim()) {
    return 'nombre de servicio ausente o vacío';
  }

  // Date and Time formats
  if (!isValidDateString(b.date)) {
    return 'fecha inválida o fuera de rango (formato YYYY-MM-DD requerido)';
  }
  if (!isValidTimeString(b.time)) {
    return 'hora inválida (formato HH:MM 24h requerido)';
  }

  // Duration: finite > 0
  if (
    typeof b.durationMinutes !== 'number' ||
    !Number.isFinite(b.durationMinutes) ||
    b.durationMinutes <= 0
  ) {
    return 'duración de servicio inválida (debe ser número positivo)';
  }

  // Status must belong to allowed enum
  if (
    typeof b.status !== 'string' ||
    !ALLOWED_STATUSES.includes(b.status as BookingStatus)
  ) {
    return `estado desconocido ("${b.status}")`;
  }

  // Financial amounts: finite, non-negative
  if (!isFiniteNonNegative(b.requiredDepositMXN)) {
    return 'anticipo requerido no numérico o negativo';
  }

  // 2. receivedDepositMXN must NOT be missing or silently defaulted to 0
  if (b.receivedDepositMXN === undefined || b.receivedDepositMXN === null) {
    return 'anticipo registrado ausente (registro de pago incompleto)';
  }
  if (!isFiniteNonNegative(b.receivedDepositMXN)) {
    return 'anticipo registrado no numérico o negativo';
  }

  // A booking cannot be persisted as confirmed without covering the required deposit
  if (b.status === 'confirmed' && (b.receivedDepositMXN as number) < (b.requiredDepositMXN as number)) {
    return 'cita marcada como confirmada pero con anticipo recibido inferior al requerido';
  }

  if (b.finalPriceMXN !== null && b.finalPriceMXN !== undefined && !isFiniteNonNegative(b.finalPriceMXN)) {
    return 'precio final inválido o negativo';
  }

  return null;
}

/**
 * Validates and sanitizes a booking record.
 * Rejects corrupt types, uncatalogued services, missing deposits, out-of-range dates/hours,
 * invalid statuses or negative amounts.
 * Preserves safe fallbacks for optional fields so the UI never crashes.
 */
export function validateAndSanitizeBooking(item: unknown): AdminBooking | null {
  if (getBookingValidationIssue(item) !== null) {
    return null;
  }
  const b = item as Record<string, unknown>;
  const officialService = SERVICES.find((s) => s.id === (b.serviceId as string).trim())!;

  // Optional string fields with defensive defaults
  const clientPhone =
    typeof b.clientPhone === 'string' && b.clientPhone.trim()
      ? b.clientPhone.trim()
      : 'Sin teléfono';
  const clientEmail =
    typeof b.clientEmail === 'string' && b.clientEmail.trim()
      ? b.clientEmail.trim()
      : undefined;
  const notes =
    typeof b.notes === 'string' && b.notes.trim() ? b.notes.trim() : undefined;
  const createdAt =
    typeof b.createdAt === 'string' && b.createdAt.trim()
      ? b.createdAt
      : new Date().toISOString();

  const finalPrice: number | null =
    b.finalPriceMXN !== null && b.finalPriceMXN !== undefined
      ? (b.finalPriceMXN as number)
      : null;

  const hairProfile =
    typeof b.hairProfile === 'object' && b.hairProfile !== null
      ? (b.hairProfile as import('../types/admin').HairProfile)
      : undefined;

  return {
    id: (b.id as string).trim(),
    clientName: (b.clientName as string).trim(),
    clientPhone,
    clientEmail,
    serviceId: officialService.id,
    serviceName:
      typeof b.serviceName === 'string' && b.serviceName.trim()
        ? (b.serviceName as string).trim()
        : officialService.name,
    date: b.date as string,
    time: b.time as string,
    durationMinutes: Math.round(b.durationMinutes as number),
    status: b.status as BookingStatus,
    requiredDepositMXN: b.requiredDepositMXN as number,
    receivedDepositMXN: b.receivedDepositMXN as number,
    finalPriceMXN: finalPrice,
    notes,
    hairProfile,
    createdAt,
  };
}

/**
 * Loads bookings from localStorage.
 * - If empty: loads seed data and persists it, communicating if initial save fails.
 * - If partially corrupt: keeps valid records, discards invalid ones, and shows a clear warning.
 * - If entirely corrupt: falls back to seed data with a clear explanation.
 */
export function loadBookingsFromStorage(): StorageLoadResult {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {
        bookings: generateSeedBookings(),
        isInitialSeed: true,
        error: 'El almacenamiento local no está disponible en este entorno.',
      };
    }

    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) {
      const seed = generateSeedBookings();
      const saveRes = saveBookingsToStorage(seed);
      return {
        bookings: seed,
        isInitialSeed: true,
        error: saveRes.success
          ? undefined
          : `Aviso: No fue posible persistir las reservas iniciales en el almacenamiento local (${saveRes.error || 'falló el guardado inicial'}).`,
      };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn('JSON corrupto en localStorage. Restableciendo datos demo.');
      const seed = generateSeedBookings();
      const saveRes = saveBookingsToStorage(seed);
      return {
        bookings: seed,
        isInitialSeed: true,
        error: `Los datos en el navegador estaban corruptos (JSON inválido). Se restablecieron las reservas de ejemplo.${saveRes.success ? '' : ` Error de guardado: ${saveRes.error}`}`,
      };
    }

    if (!Array.isArray(parsed)) {
      console.warn('Estructura no válida en localStorage (se esperaba un arreglo).');
      const seed = generateSeedBookings();
      const saveRes = saveBookingsToStorage(seed);
      return {
        bookings: seed,
        isInitialSeed: true,
        error: `Estructura de almacenamiento inválida. Se restablecieron las reservas de ejemplo.${saveRes.success ? '' : ` Error de guardado: ${saveRes.error}`}`,
      };
    }

    const validBookings: AdminBooking[] = [];
    const invalidReasons: string[] = [];
    let invalidCount = 0;

    for (const item of parsed) {
      const issue = getBookingValidationIssue(item);
      const valid = validateAndSanitizeBooking(item);
      if (valid) {
        validBookings.push(valid);
      } else {
        invalidCount++;
        if (issue) {
          invalidReasons.push(issue);
        }
      }
    }

    // Partial corruption: keep all valid records and alert the user
    if (invalidCount > 0 && validBookings.length > 0) {
      const saveRes = saveBookingsToStorage(validBookings);
      const uniqueReasons = Array.from(new Set(invalidReasons));
      const reasonDetail = uniqueReasons.length > 0 ? ` (${uniqueReasons.slice(0, 2).join('; ')})` : '';
      return {
        bookings: validBookings,
        isInitialSeed: false,
        error: `Se detectaron y descartaron ${invalidCount} registro(s) inválidos o incompletos${reasonDetail}. Se conservaron ${validBookings.length} reservas válidas.${saveRes.success ? '' : ` Error al actualizar almacenamiento: ${saveRes.error}`}`,
      };
    }

    // Total corruption: all items invalid
    if (validBookings.length === 0) {
      const seed = generateSeedBookings();
      const saveRes = saveBookingsToStorage(seed);
      const uniqueReasons = Array.from(new Set(invalidReasons));
      const reasonDetail = uniqueReasons.length > 0 ? ` (${uniqueReasons.slice(0, 2).join('; ')})` : '';
      return {
        bookings: seed,
        isInitialSeed: true,
        error: `Ningún registro guardado cumplía las validaciones requeridas${reasonDetail} (${invalidCount} descartados). Se restablecieron los datos de ejemplo.${saveRes.success ? '' : ` Error de guardado: ${saveRes.error}`}`,
      };
    }

    return { bookings: validBookings, isInitialSeed: false };
  } catch (err) {
    console.error('Error al leer de localStorage:', err);
    return {
      bookings: generateSeedBookings(),
      isInitialSeed: true,
      error: 'Error inesperado al acceder al almacenamiento local. Se están mostrando datos temporales de ejemplo.',
    };
  }
}

/**
 * Persists bookings to localStorage with detailed error handling.
 */
export function saveBookingsToStorage(bookings: AdminBooking[]): StorageSaveResult {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {
        success: false,
        error: 'Almacenamiento local no disponible en este entorno.',
      };
    }
    const json = JSON.stringify(bookings);
    window.localStorage.setItem(ADMIN_STORAGE_KEY, json);
    return { success: true };
  } catch (err: unknown) {
    console.error('Error al guardar en localStorage:', err);
    const msg =
      err instanceof Error && err.name === 'QuotaExceededError'
        ? 'Se excedió la cuota de almacenamiento del navegador.'
        : 'No se pudieron guardar los cambios en el navegador (posible modo privado o permisos restringidos).';
    return {
      success: false,
      error: msg,
    };
  }
}

/**
 * Resets storage back to initial seed data.
 */
export function resetStorageToSeed(): { bookings: AdminBooking[]; result: StorageSaveResult } {
  const seed = generateSeedBookings();
  const result = saveBookingsToStorage(seed);
  return { bookings: seed, result };
}
