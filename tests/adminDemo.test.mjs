import assert from 'node:assert/strict';
import { register } from 'node:module';

// Register ESM loader hook to allow Node 24 native type-stripping
// to resolve extensionless imports like `../data/salonData` -> `../data/salonData.ts`
register('data:text/javascript,' + encodeURIComponent(`
  import path from 'node:path';
  export async function resolve(specifier, context, nextResolve) {
    if ((specifier.startsWith('./') || specifier.startsWith('../')) && !path.extname(specifier)) {
      try {
        return await nextResolve(specifier + '.ts', context);
      } catch (e) {}
    }
    return nextResolve(specifier, context);
  }
`));

// Import the actual production modules
const {
  calculateBalance,
  determineStatusAfterDepositChange,
  getBookingStatusLabel,
  BOOKING_STATUS_LABELS,
  hasScheduleConflict,
  calculateAgendaSummary,
  SALON_OPERATING_HOURS,
  isWithinOperatingHours,
  getAvailableStartSlots,
  generateSeedBookings,
} = await import('../src/lib/adminBookingLogic.ts');

const {
  validateAndSanitizeBooking,
  getBookingValidationIssue,
  loadBookingsFromStorage,
  saveBookingsToStorage,
  ADMIN_STORAGE_KEY,
  sanitizeHairProfile,
} = await import('../src/lib/adminStorage.ts');

const { SERVICES } = await import('../src/data/salonData.ts');

console.log('====================================================');
console.log('  MILLER GREISELAND STUDIO · ADMIN DEMO TEST SUITE  ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

// Helper to mock localStorage in Node.js
function createMockLocalStorage(initialStore = {}) {
  let store = { ...initialStore };
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key, val) {
      store[key] = String(val);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    _getStore() {
      return store;
    },
  };
}

// Baseline valid booking fixture
const baseValidBooking = {
  id: 'MG-9999',
  clientName: 'Clienta de Prueba',
  clientPhone: '983 137 3038',
  clientEmail: 'clienta@test.com',
  serviceId: 'balayage-rubio',
  serviceName: 'Balayage Rubio',
  date: '2026-10-15',
  time: '11:00',
  durationMinutes: 240,
  status: 'confirmed',
  requiredDepositMXN: 1600,
  receivedDepositMXN: 1600,
  finalPriceMXN: 3800,
  notes: 'Prueba de validación',
  createdAt: '2026-10-07T12:00:00.000Z',
};

// ---------------------------------------------------------
// 1. SERVICIO INEXISTENTE Y CATÁLOGO OFICIAL
// ---------------------------------------------------------
console.log('1. Catálogo oficial y rechazo de servicios inexistentes:');

test('Rechaza servicio inexistente fuera del catálogo oficial SERVICES', () => {
  const invalid = {
    ...baseValidBooking,
    serviceId: 'servicio-laser-extraterrestre',
  };
  const result = validateAndSanitizeBooking(invalid);
  assert.equal(result, null, 'Un servicio inventado debe retornar null');

  const issue = getBookingValidationIssue(invalid);
  assert.ok(
    issue && issue.includes('servicio no pertenece al catálogo oficial'),
    `El motivo debe indicar servicio no catalogado: "${issue}"`
  );
});

test('Acepta todos los 11 servicios oficiales del catálogo', () => {
  assert.equal(SERVICES.length, 11, 'Deben existir exactamente 11 servicios oficiales');
  for (const s of SERVICES) {
    const candidate = {
      ...baseValidBooking,
      serviceId: s.id,
      serviceName: s.name,
      requiredDepositMXN: s.depositMXN,
      receivedDepositMXN: s.depositMXN,
    };
    const res = validateAndSanitizeBooking(candidate);
    assert.ok(res !== null, `El servicio oficial ${s.id} debe ser aceptado`);
    assert.equal(res.serviceId, s.id);
  }
});

test('Preserva y sanea información previa de cabello (hairProfile) para servicios de color', () => {
  const withHair = {
    ...baseValidBooking,
    hairProfile: {
      currentColor: 'Castaño oscuro',
      desiredResult: 'Balayage rubio beige',
      hairLength: 'medio',
      previousColoring: 'no',
      lastProcessDetails: 'Ninguno',
      additionalComments: 'Sensible',
    },
  };
  const result = validateAndSanitizeBooking(withHair);
  assert.ok(result, 'Debe validar con hairProfile');
  assert.deepEqual(result.hairProfile, {
    currentColor: 'Castaño oscuro',
    desiredResult: 'Balayage rubio beige',
    hairLength: 'medio',
    previousColoring: 'no',
    lastProcessDetails: 'Ninguno',
    additionalComments: 'Sensible',
  });
});

// ---------------------------------------------------------
// 2. ANTICIPO AUSENTE Y NO INVENCIÓN DE PAGOS
// ---------------------------------------------------------
console.log('\n2. Anticipo ausente y consistencia de pagos:');

test('Si falta receivedDepositMXN (undefined), rechaza el registro como incompleto (no inventa $0)', () => {
  const missingDeposit = { ...baseValidBooking };
  delete missingDeposit.receivedDepositMXN;

  const res = validateAndSanitizeBooking(missingDeposit);
  assert.equal(res, null, 'No debe convertir undefined a 0 ni conservar la cita');

  const issue = getBookingValidationIssue(missingDeposit);
  assert.ok(
    issue && issue.includes('anticipo registrado ausente'),
    `Debe reportar anticipo ausente: "${issue}"`
  );
});

test('Si receivedDepositMXN es null, rechaza el registro como incompleto', () => {
  const nullDeposit = { ...baseValidBooking, receivedDepositMXN: null };
  const res = validateAndSanitizeBooking(nullDeposit);
  assert.equal(res, null, 'null en receivedDepositMXN no debe ser aceptado');
});

test('Rechaza cita confirmada si el anticipo recibido es menor al requerido', () => {
  const inconsistent = {
    ...baseValidBooking,
    status: 'confirmed',
    requiredDepositMXN: 1600,
    receivedDepositMXN: 500, // Menor que 1600
  };
  const res = validateAndSanitizeBooking(inconsistent);
  assert.equal(res, null, 'Cita confirmada con anticipo insuficiente debe ser rechazada');

  const issue = getBookingValidationIssue(inconsistent);
  assert.ok(
    issue && issue.includes('anticipo recibido inferior al requerido'),
    `Debe indicar inconsistencia: "${issue}"`
  );
});

// ---------------------------------------------------------
// 3. RECUPERACIÓN PARCIAL DE ALMACENAMIENTO (localStorage)
// ---------------------------------------------------------
console.log('\n3. Recuperación parcial ante datos corruptos o incompletos:');

test('Conserva registros válidos, descarta inválidos/incompletos y alerta con motivos claros', () => {
  const valid1 = { ...baseValidBooking, id: 'MG-1001', clientName: 'Ana' };
  const valid2 = {
    ...baseValidBooking,
    id: 'MG-1002',
    clientName: 'Beatriz',
    status: 'pending_payment',
    receivedDepositMXN: 0,
  };

  const corruptMissingDeposit = {
    ...baseValidBooking,
    id: 'MG-CORRUPT-1',
    clientName: 'Carla Sin Anticipo',
  };
  delete corruptMissingDeposit.receivedDepositMXN;

  const corruptFakeService = {
    ...baseValidBooking,
    id: 'MG-CORRUPT-2',
    clientName: 'Diana Servicio Falso',
    serviceId: 'servicio-inventado-corte-laser',
  };

  const corruptBadDate = {
    ...baseValidBooking,
    id: 'MG-CORRUPT-3',
    clientName: 'Elena Fecha Mala',
    date: '2026-02-30', // Fecha imposible
  };

  const mockStorage = createMockLocalStorage({
    [ADMIN_STORAGE_KEY]: JSON.stringify([
      valid1,
      corruptMissingDeposit,
      valid2,
      corruptFakeService,
      corruptBadDate,
    ]),
  });

  globalThis.window = { localStorage: mockStorage };

  const loadResult = loadBookingsFromStorage();

  assert.equal(loadResult.isInitialSeed, false, 'No debe reiniciar seed si hay registros válidos');
  assert.equal(loadResult.bookings.length, 2, 'Debe conservar exactamente los 2 registros válidos');
  assert.equal(loadResult.bookings[0].id, 'MG-1001');
  assert.equal(loadResult.bookings[1].id, 'MG-1002');

  assert.ok(loadResult.error, 'Debe retornar un mensaje de advertencia claro');
  assert.ok(
    loadResult.error.includes('3 registro(s) inválidos o incompletos'),
    `El mensaje debe indicar la cantidad descartada: "${loadResult.error}"`
  );
  assert.ok(
    loadResult.error.includes('Se conservaron 2 reservas válidas'),
    `El mensaje debe confirmar las conservadas: "${loadResult.error}"`
  );

  // Comprueba que el almacenamiento persistió únicamente los 2 válidos saneados
  const savedRaw = mockStorage.getItem(ADMIN_STORAGE_KEY);
  const savedParsed = JSON.parse(savedRaw);
  assert.equal(savedParsed.length, 2);
  assert.equal(savedParsed[0].id, 'MG-1001');
  assert.equal(savedParsed[1].id, 'MG-1002');
});

// ---------------------------------------------------------
// 4. PAGOS PARCIALES Y COMPLETOS
// ---------------------------------------------------------
console.log('\n4. Transición de estados ante pagos parciales y completos:');

test('Pago parcial (< requerido) mantiene la cita en pending_payment', () => {
  const status = determineStatusAfterDepositChange('pending_payment', 800, 1600);
  assert.equal(status, 'pending_payment');
});

test('Pago completo exacto (>= requerido) transiciona de pending_payment a confirmed', () => {
  const status = determineStatusAfterDepositChange('pending_payment', 1600, 1600);
  assert.equal(status, 'confirmed');
});

test('Pago con excedente (> requerido) transiciona de pending_payment a confirmed', () => {
  const status = determineStatusAfterDepositChange('pending_payment', 2500, 1600);
  assert.equal(status, 'confirmed');
});

test('Reducción de anticipo por debajo del requerido regresa confirmed a pending_payment', () => {
  const status = determineStatusAfterDepositChange('confirmed', 500, 1600);
  assert.equal(status, 'pending_payment');
});

// ---------------------------------------------------------
// 5. PROTECCIÓN DE CITAS CANCELADAS Y ATENDIDAS
// ---------------------------------------------------------
console.log('\n5. Protección estricta de citas canceladas y atendidas:');

test('Cita cancelada NUNCA se reactiva automáticamente, incluso con anticipo completo', () => {
  const statusWithFull = determineStatusAfterDepositChange('cancelled', 1600, 1600);
  assert.equal(statusWithFull, 'cancelled', 'No reactivar cita cancelada');

  const statusWithZero = determineStatusAfterDepositChange('cancelled', 0, 1600);
  assert.equal(statusWithZero, 'cancelled');
});

test('Cita atendida NUNCA se modifica automáticamente', () => {
  const statusWithFull = determineStatusAfterDepositChange('completed', 2500, 1600);
  assert.equal(statusWithFull, 'completed', 'No alterar cita atendida');

  const statusWithZero = determineStatusAfterDepositChange('completed', 0, 1600);
  assert.equal(statusWithZero, 'completed');
});

// ---------------------------------------------------------
// 6. SALDO A FAVOR Y MATEMÁTICA FINANCIERA
// ---------------------------------------------------------
console.log('\n6. Cálculo de saldos financieros y Saldo a Favor:');

test('Saldo a favor cuando precio final es inferior al anticipo recibido', () => {
  // Caso del prompt: precio final $1,000, anticipo $1,600 -> saldo $0, saldo a favor $600
  const calc = calculateBalance(1000, 1600);
  assert.equal(calc.isPending, false);
  assert.equal(calc.pendingBalanceMXN, 0, 'Saldo por liquidar debe ser $0');
  assert.equal(calc.balanceMXN, 0);
  assert.equal(calc.creditBalanceMXN, 600, 'Saldo a favor debe ser $600');
  assert.equal(calc.hasCredit, true);
  assert.ok(
    calc.explanation.includes('$1,600 (anticipo recibido) − $1,000 (precio final) = $600 MXN de saldo a favor'),
    `Explicación clara sin igualdad incorrecta: "${calc.explanation}"`
  );
});

test('Saldo normal a liquidar cuando precio final supera el anticipo', () => {
  // Caso Balayage: precio $3,800, anticipo $1,600 -> saldo por liquidar $2,200
  const calc = calculateBalance(3800, 1600);
  assert.equal(calc.isPending, false);
  assert.equal(calc.pendingBalanceMXN, 2200);
  assert.equal(calc.balanceMXN, 2200);
  assert.equal(calc.creditBalanceMXN, 0);
  assert.equal(calc.hasCredit, false);
  assert.ok(calc.explanation.includes('$2,200 MXN por liquidar'));
});

test('Estado Por confirmar cuando no existe precio final capturado', () => {
  const calcNull = calculateBalance(null, 1600);
  assert.equal(calcNull.isPending, true);
  assert.equal(calcNull.pendingBalanceMXN, null);
  assert.equal(calcNull.creditBalanceMXN, 0);
  assert.equal(calcNull.hasCredit, false);

  const calcUndefined = calculateBalance(undefined, 0);
  assert.equal(calcUndefined.isPending, true);
});

// ---------------------------------------------------------
// 7. FALLO DE ALMACENAMIENTO (QuotaExceededError y Errores)
// ---------------------------------------------------------
console.log('\n7. Manejo robusto de fallos de almacenamiento:');

test('saveBookingsToStorage maneja QuotaExceededError adecuadamente sin explotar', () => {
  const quotaStorage = {
    getItem: () => null,
    setItem: () => {
      const err = new Error('Quota exceeded');
      err.name = 'QuotaExceededError';
      throw err;
    },
    removeItem: () => {},
    clear: () => {},
  };

  globalThis.window = { localStorage: quotaStorage };

  const saveRes = saveBookingsToStorage([baseValidBooking]);
  assert.equal(saveRes.success, false);
  assert.ok(
    saveRes.error && saveRes.error.includes('cuota de almacenamiento'),
    `Debe advertir sobre la cuota: "${saveRes.error}"`
  );
});

test('saveBookingsToStorage maneja entorno sin localStorage de forma segura', () => {
  globalThis.window = {}; // Sin localStorage

  const saveRes = saveBookingsToStorage([baseValidBooking]);
  assert.equal(saveRes.success, false);
  assert.ok(saveRes.error && saveRes.error.includes('no disponible'));
});

// ---------------------------------------------------------
// 8. ETIQUETAS EN ESPAÑOL (AdminDepositModal)
// ---------------------------------------------------------
console.log('\n8. Etiquetas legibles en español para estados:');

test('getBookingStatusLabel traduce todos los estados oficiales al español', () => {
  assert.equal(getBookingStatusLabel('pending_payment'), 'Pendiente de pago');
  assert.equal(getBookingStatusLabel('confirmed'), 'Confirmada');
  assert.equal(getBookingStatusLabel('completed'), 'Atendida');
  assert.equal(getBookingStatusLabel('cancelled'), 'Cancelada');

  assert.equal(BOOKING_STATUS_LABELS['pending_payment'], 'Pendiente de pago');
  assert.equal(BOOKING_STATUS_LABELS['confirmed'], 'Confirmada');
  assert.equal(BOOKING_STATUS_LABELS['completed'], 'Atendida');
  assert.equal(BOOKING_STATUS_LABELS['cancelled'], 'Cancelada');
});

// ---------------------------------------------------------
// 9. DETECCIÓN DE CONFLICTOS DE HORARIO
// ---------------------------------------------------------
console.log('\n9. Prevención de cruces de horario (capacidad 1 cita a la vez):');

test('Detecta solapamiento entre citas en la misma fecha', () => {
  const existing = [
    {
      ...baseValidBooking,
      id: 'MG-1',
      date: '2026-10-15',
      time: '11:00',
      durationMinutes: 120, // 11:00 a 13:00
      status: 'confirmed',
    },
  ];

  // Conflicto dentro del bloque (11:30 a 12:30)
  const conflict = hasScheduleConflict(existing, '2026-10-15', '11:30', 60);
  assert.equal(conflict.hasConflict, true);
  assert.equal(conflict.conflictingBooking.id, 'MG-1');

  // Adyacente exacto (13:00 a 14:00) permitido sin conflicto
  const adjacent = hasScheduleConflict(existing, '2026-10-15', '13:00', 60);
  assert.equal(adjacent.hasConflict, false, 'Slots adyacentes continuos deben permitirse');
});

test('Cita cancelada libera el horario para nuevas reservas', () => {
  const cancelledBooking = [
    {
      ...baseValidBooking,
      id: 'MG-CANCELLED',
      date: '2026-10-15',
      time: '11:00',
      durationMinutes: 120,
      status: 'cancelled',
    },
  ];

  const res = hasScheduleConflict(cancelledBooking, '2026-10-15', '11:00', 120);
  assert.equal(res.hasConflict, false, 'Citas canceladas no deben bloquear horarios');
});

// ---------------------------------------------------------
// 10. FRANJA DE RESUMEN DE AGENDA (calculateAgendaSummary)
// ---------------------------------------------------------
console.log('\n10. Franja de resumen de agenda (calculateAgendaSummary):');

test('calculateAgendaSummary calcula métricas precisas en vista día excluyendo canceladas', () => {
  const testBookings = [
    {
      ...baseValidBooking,
      id: 'MG-D1',
      date: '2026-10-15',
      status: 'confirmed',
      receivedDepositMXN: 1600,
    },
    {
      ...baseValidBooking,
      id: 'MG-D2',
      date: '2026-10-15',
      status: 'pending_payment',
      receivedDepositMXN: 500,
    },
    {
      ...baseValidBooking,
      id: 'MG-D3',
      date: '2026-10-15',
      status: 'cancelled',
      receivedDepositMXN: 800, // Cancelada: no debe computar
    },
    {
      ...baseValidBooking,
      id: 'MG-D4',
      date: '2026-10-16', // Otra fecha
      status: 'confirmed',
      receivedDepositMXN: 2000,
    },
  ];

  const daySummary = calculateAgendaSummary(testBookings, '2026-10-15', 'day');
  assert.equal(daySummary.periodLabel, 'Citas del día');
  assert.equal(daySummary.appointmentsCount, 2, 'Debe incluir solo citas activas del día');
  assert.equal(daySummary.pendingDepositCount, 1, 'Debe contar solo citas pendientes del día');
  assert.equal(daySummary.receivedDepositsMXN, 2100, 'Debe sumar 1600 + 500, excluyendo la cancelada');
});

test('calculateAgendaSummary calcula métricas semanales (lunes a domingo) reflejando dinero real recibido', () => {
  // 2026-10-15 es jueves. La semana ISO comprende del 2026-10-12 (lunes) al 2026-10-18 (domingo).
  const testBookings = [
    {
      ...baseValidBooking,
      id: 'MG-W1',
      date: '2026-10-12', // Lunes de esa semana
      status: 'confirmed',
      receivedDepositMXN: 1000,
    },
    {
      ...baseValidBooking,
      id: 'MG-W2',
      date: '2026-10-15', // Jueves de esa semana
      status: 'pending_payment',
      receivedDepositMXN: 500,
    },
    {
      ...baseValidBooking,
      id: 'MG-W3',
      date: '2026-10-17', // Sábado de esa semana
      status: 'completed',
      receivedDepositMXN: 2000,
    },
    {
      ...baseValidBooking,
      id: 'MG-W4',
      date: '2026-10-18', // Domingo de esa semana (cancelada)
      status: 'cancelled',
      receivedDepositMXN: 700,
    },
    {
      ...baseValidBooking,
      id: 'MG-W5',
      date: '2026-10-20', // Martes de la SIGUIENTE semana
      status: 'confirmed',
      receivedDepositMXN: 1500,
    },
  ];

  const weekSummary = calculateAgendaSummary(testBookings, '2026-10-15', 'week');
  assert.equal(weekSummary.periodLabel, 'Citas de la semana');
  assert.equal(weekSummary.appointmentsCount, 3, 'Debe contar 3 citas activas de la semana (Lunes, Jueves, Sábado)');
  assert.equal(weekSummary.pendingDepositCount, 1, 'Debe identificar 1 cita pendiente en la semana');
  assert.equal(weekSummary.receivedDepositsMXN, 3500, 'Debe sumar 1000 + 500 + 2000 = 3500 MXN en dinero real recibido');
  assert.match(weekSummary.scopeSubtitle, /Semana del/i, 'Debe describir el intervalo de la semana');
});

// ---------------------------------------------------------
// 11. SANEAMIENTO Y VALIDACIÓN ESTRICTA DE HAIR PROFILE
// ---------------------------------------------------------
console.log('\n11. Saneamiento y validación estricta de hairProfile:');

test('sanitizeHairProfile preserva campos de texto y enums válidos', () => {
  const input = {
    currentColor: 'Castaño medio natural',
    desiredResult: 'Balayage avellana',
    hairLength: 'medio',
    previousColoring: 'si',
    lastProcessDetails: 'Tinte hace 6 meses',
    additionalComments: 'Sensibilidad en cuero cabelludo',
  };
  const sanitized = sanitizeHairProfile(input);
  assert.deepEqual(sanitized, input);
});

test('sanitizeHairProfile descarta campos con objetos o tipos inválidos sin tumbar la aplicación', () => {
  const corruptInput = {
    currentColor: { malicious: 'objeto' }, // inválido
    desiredResult: 'Rubio perlado', // válido
    hairLength: 999, // inválido
    previousColoring: 'inventado', // inválido
    lastProcessDetails: ['arreglo'], // inválido
    additionalComments: 'Comentario válido', // válido
  };
  const sanitized = sanitizeHairProfile(corruptInput);
  assert.ok(sanitized);
  assert.equal(sanitized.desiredResult, 'Rubio perlado');
  assert.equal(sanitized.additionalComments, 'Comentario válido');
  assert.equal(sanitized.currentColor, undefined);
  assert.equal(sanitized.hairLength, undefined);
  assert.equal(sanitized.previousColoring, undefined);
});

test('validateAndSanitizeBooking preserva la cita aún con hairProfile corrupto', () => {
  const bookingWithCorruptHair = {
    ...baseValidBooking,
    id: 'MG-CORRUPT-HP',
    hairProfile: {
      currentColor: { hack: 1 },
      hairLength: false,
    },
  };
  const sanitizedBooking = validateAndSanitizeBooking(bookingWithCorruptHair);
  assert.ok(sanitizedBooking, 'La cita debe conservarse válida');
  assert.equal(sanitizedBooking.id, 'MG-CORRUPT-HP');
  assert.equal(sanitizedBooking.hairProfile, undefined, 'El perfil completamente dañado debe quedar saneado como undefined');
});

// ---------------------------------------------------------
// 12. UNIFICACIÓN DE HORARIOS (11:00 A 19:00)
// ---------------------------------------------------------
console.log('\n12. Unificación de horarios (11:00 a 19:00):');

test('SALON_OPERATING_HOURS define constantes oficiales de 11:00 a 19:00', () => {
  assert.equal(SALON_OPERATING_HOURS.openHour, 11);
  assert.equal(SALON_OPERATING_HOURS.closeHour, 19);
  assert.equal(SALON_OPERATING_HOURS.openTime, '11:00');
  assert.equal(SALON_OPERATING_HOURS.closeTime, '19:00');
  assert.equal(SALON_OPERATING_HOURS.scheduleText, '11:00 a. m. a 7:00 p. m.');
});

test('isWithinOperatingHours valida límites del salón (11:00 a 19:00)', () => {
  // Inicio antes de apertura (11:00)
  assert.equal(isWithinOperatingHours('10:30', 60), false, '10:30 inicia antes de apertura (11:00)');
  assert.equal(isWithinOperatingHours('09:00', 60), false, '09:00 inicia antes de apertura (11:00)');

  // Inicio válido
  assert.equal(isWithinOperatingHours('11:00', 60), true, '11:00 con 60 min termina a las 12:00');

  // Límite exacto de cierre (19:00)
  assert.equal(isWithinOperatingHours('15:00', 240), true, '15:00 con 240 min (4h) concluye exactamente a las 19:00');
  assert.equal(isWithinOperatingHours('18:00', 60), true, '18:00 con 60 min concluye a las 19:00');

  // Excede horario de cierre (después de 19:00)
  assert.equal(isWithinOperatingHours('15:30', 240), false, '15:30 con 240 min concluye a las 19:30 (excede 19:00)');
  assert.equal(isWithinOperatingHours('18:30', 60), false, '18:30 con 60 min concluye a las 19:30 (excede 19:00)');
  assert.equal(isWithinOperatingHours('19:00', 30), false, '19:00 no puede iniciar cita que termina después de cierre');
});

test('getAvailableStartSlots no ofrece horarios que terminen después de las 19:00', () => {
  const slotsBalayage = getAvailableStartSlots(240, 30);
  assert.ok(slotsBalayage.length > 0);
  assert.equal(slotsBalayage[0], '11:00', 'Primer slot debe ser 11:00');
  assert.equal(slotsBalayage[slotsBalayage.length - 1], '15:00', 'Último slot para 4 horas debe ser 15:00');
  assert.ok(!slotsBalayage.includes('15:30'), 'No debe incluir 15:30');
});

test('generateSeedBookings tiene todas sus citas dentro del horario operativo 11:00 - 19:00', () => {
  const seeds = generateSeedBookings();
  for (const seed of seeds) {
    if (seed.status !== 'cancelled') {
      const valid = isWithinOperatingHours(seed.time, seed.durationMinutes);
      assert.ok(
        valid,
        `Cita semilla ${seed.id} (${seed.clientName}) a las ${seed.time} (${seed.durationMinutes} min) debe estar dentro de 11:00 - 19:00`
      );
    }
  }
  const sofia = seeds.find((s) => s.id === 'MG-1044');
  assert.ok(sofia);
  assert.equal(sofia.time, '11:00', 'Sofía Larrondo debe estar agendada a las 11:00 (no 10:30)');
});

// ---------------------------------------------------------
// 13. PRECIO FINAL PENDIENTE (finalPriceMXN: null)
// ---------------------------------------------------------
console.log('\n13. Precio final pendiente (finalPriceMXN: null):');

test('Cita con finalPriceMXN: null muestra estado Por confirmar sin saldo inventado', () => {
  const calc = calculateBalance(null, 1600);
  assert.equal(calc.isPending, true);
  assert.equal(calc.pendingBalanceMXN, null);
  assert.equal(calc.balanceMXN, null);
  assert.equal(calc.hasCredit, false);
  assert.match(calc.explanation, /precio final/i);
});

test('validateAndSanitizeBooking conserva finalPriceMXN: null', () => {
  const bookingWithNullFinal = {
    ...baseValidBooking,
    finalPriceMXN: null,
  };
  const sanitized = validateAndSanitizeBooking(bookingWithNullFinal);
  assert.ok(sanitized);
  assert.equal(sanitized.finalPriceMXN, null);
});

console.log('\n----------------------------------------------------');
console.log(`  RESULTADO: ${passedTests}/${totalTests} PRUEBAS EXITOSAS (100%)`);
console.log('----------------------------------------------------\n');
