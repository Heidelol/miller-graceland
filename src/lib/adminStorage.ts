import type { AdminBooking } from '../types/admin';
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

/**
 * Validates that an item has the minimal required shape of an AdminBooking.
 */
function isValidBooking(item: unknown): item is AdminBooking {
  if (!item || typeof item !== 'object') return false;
  const b = item as Record<string, unknown>;
  return (
    typeof b.id === 'string' &&
    typeof b.clientName === 'string' &&
    typeof b.serviceId === 'string' &&
    typeof b.serviceName === 'string' &&
    typeof b.date === 'string' &&
    typeof b.time === 'string' &&
    typeof b.durationMinutes === 'number' &&
    typeof b.status === 'string' &&
    typeof b.requiredDepositMXN === 'number'
  );
}

/**
 * Loads bookings from localStorage.
 * If empty or corrupt, safely falls back to seed data.
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
      saveBookingsToStorage(seed);
      return { bookings: seed, isInitialSeed: true };
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('Formato de datos no válido en localStorage. Restableciendo datos demo.');
      const seed = generateSeedBookings();
      saveBookingsToStorage(seed);
      return {
        bookings: seed,
        isInitialSeed: true,
        error: 'Datos corruptos detectados en el navegador. Se restablecieron las reservas de ejemplo.',
      };
    }

    const validBookings = parsed.filter(isValidBooking);
    if (validBookings.length === 0 && parsed.length > 0) {
      const seed = generateSeedBookings();
      saveBookingsToStorage(seed);
      return {
        bookings: seed,
        isInitialSeed: true,
        error: 'Los registros guardados no cumplían el esquema. Se restablecieron los datos de ejemplo.',
      };
    }

    return { bookings: validBookings, isInitialSeed: false };
  } catch (err) {
    console.error('Error al leer de localStorage:', err);
    return {
      bookings: generateSeedBookings(),
      isInitialSeed: true,
      error: 'No se pudo leer el almacenamiento local. Se están mostrando datos temporales de ejemplo.',
    };
  }
}

/**
 * Persists bookings to localStorage.
 */
export function saveBookingsToStorage(bookings: AdminBooking[]): StorageSaveResult {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {
        success: false,
        error: 'Almacenamiento local no disponible.',
      };
    }
    const json = JSON.stringify(bookings);
    window.localStorage.setItem(ADMIN_STORAGE_KEY, json);
    return { success: true };
  } catch (err) {
    console.error('Error al guardar en localStorage:', err);
    return {
      success: false,
      error: 'No se pudieron guardar los cambios en el navegador. Revisa la cuota de almacenamiento.',
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
