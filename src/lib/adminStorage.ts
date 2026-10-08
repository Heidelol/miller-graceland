import type { AdminBooking, BookingStatus } from '../types/admin';
import { generateSeedBookings } from './adminBookingLogic';

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
 * Validates and sanitizes a booking record.
 * Rejects corrupt types, out-of-range dates/hours, invalid statuses or negative amounts.
 * Preserves safe fallbacks for optional fields so the UI never crashes.
 */
export function validateAndSanitizeBooking(item: unknown): AdminBooking | null {
  if (!item || typeof item !== 'object') return null;
  const b = item as Record<string, unknown>;

  // Required non-empty string fields
  if (typeof b.id !== 'string' || !b.id.trim()) return null;
  if (typeof b.clientName !== 'string' || !b.clientName.trim()) return null;
  if (typeof b.serviceId !== 'string' || !b.serviceId.trim()) return null;
  if (typeof b.serviceName !== 'string' || !b.serviceName.trim()) return null;

  // Date and Time formats
  if (!isValidDateString(b.date)) return null;
  if (!isValidTimeString(b.time)) return null;

  // Duration: finite > 0
  if (
    typeof b.durationMinutes !== 'number' ||
    !Number.isFinite(b.durationMinutes) ||
    b.durationMinutes <= 0
  ) {
    return null;
  }

  // Status must belong to allowed enum
  if (
    typeof b.status !== 'string' ||
    !ALLOWED_STATUSES.includes(b.status as BookingStatus)
  ) {
    return null;
  }

  // Financial amounts: finite, non-negative
  if (!isFiniteNonNegative(b.requiredDepositMXN)) return null;

  let receivedDeposit = 0;
  if (b.receivedDepositMXN !== undefined && b.receivedDepositMXN !== null) {
    if (!isFiniteNonNegative(b.receivedDepositMXN)) return null;
    receivedDeposit = b.receivedDepositMXN;
  }

  let finalPrice: number | null = null;
  if (b.finalPriceMXN !== null && b.finalPriceMXN !== undefined) {
    if (!isFiniteNonNegative(b.finalPriceMXN)) return null;
    finalPrice = b.finalPriceMXN;
  }

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

  return {
    id: b.id.trim(),
    clientName: b.clientName.trim(),
    clientPhone,
    clientEmail,
    serviceId: b.serviceId.trim(),
    serviceName: b.serviceName.trim(),
    date: b.date,
    time: b.time,
    durationMinutes: Math.round(b.durationMinutes),
    status: b.status as BookingStatus,
    requiredDepositMXN: b.requiredDepositMXN,
    receivedDepositMXN: receivedDeposit,
    finalPriceMXN: finalPrice,
    notes,
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
    let invalidCount = 0;

    for (const item of parsed) {
      const valid = validateAndSanitizeBooking(item);
      if (valid) {
        validBookings.push(valid);
      } else {
        invalidCount++;
      }
    }

    // Partial corruption: keep all valid records and alert the user
    if (invalidCount > 0 && validBookings.length > 0) {
      const saveRes = saveBookingsToStorage(validBookings);
      return {
        bookings: validBookings,
        isInitialSeed: false,
        error: `Se detectaron y descartaron ${invalidCount} registro(s) inválidos o incompletos. Se conservaron ${validBookings.length} reservas válidas.${saveRes.success ? '' : ` Error al actualizar almacenamiento: ${saveRes.error}`}`,
      };
    }

    // Total corruption: all items invalid
    if (validBookings.length === 0) {
      const seed = generateSeedBookings();
      const saveRes = saveBookingsToStorage(seed);
      return {
        bookings: seed,
        isInitialSeed: true,
        error: `Ningún registro guardado cumplía las validaciones requeridas (${invalidCount} descartados). Se restablecieron los datos de ejemplo.${saveRes.success ? '' : ` Error de guardado: ${saveRes.error}`}`,
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
