import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { AdminBooking, BookingStatus } from '../../types/admin';
import { SERVICES } from '../../data/salonData';
import { 
  hasScheduleConflict, calculateEndTime, 
  formatTimeDisplay, getTodayLocalDate,
  generateBookingId, getCurrentIsoTimestamp
} from '../../lib/adminBookingLogic';

interface AdminNewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: AdminBooking[];
  initialDate?: string;
  initialTime?: string;
  onSave: (booking: AdminBooking) => void;
}

export const AdminNewBookingModal: React.FC<AdminNewBookingModalProps> = ({
  isOpen,
  onClose,
  bookings,
  initialDate,
  initialTime,
  onSave,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [date, setDate] = useState(initialDate || getTodayLocalDate());
  const [time, setTime] = useState(initialTime || '11:00');
  const [status, setStatus] = useState<BookingStatus>('confirmed');
  const [receivedDeposit, setReceivedDeposit] = useState<number>(SERVICES[0].depositMXN);
  const [notes, setNotes] = useState('');
  const [conflictError, setConflictError] = useState<string | null>(null);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // When service changes, update suggested deposit
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const s = SERVICES.find((item) => item.id === serviceId);
    if (s) {
      setReceivedDeposit(s.depositMXN);
    }
    setConflictError(null);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    if (!clientName.trim()) {
      setConflictError('Por favor ingresa el nombre de la clienta.');
      return;
    }
    if (!clientPhone.trim()) {
      setConflictError('Por favor ingresa un teléfono de contacto.');
      return;
    }

    // Check for scheduling conflicts with active bookings
    const conflictCheck = hasScheduleConflict(
      bookings,
      date,
      time,
      selectedService.durationMinutes
    );

    if (conflictCheck.hasConflict && conflictCheck.conflictingBooking) {
      const cb = conflictCheck.conflictingBooking;
      const cbEnd = calculateEndTime(cb.time, cb.durationMinutes);
      setConflictError(
        `Cruce de horario detectado con la cita de ${cb.clientName} (${cb.serviceName}, de ${formatTimeDisplay(cb.time)} a ${formatTimeDisplay(cbEnd)}). Configuración demo: capacidad máxima de 1 servicio simultáneo.`
      );
      return;
    }

    const newBooking: AdminBooking = {
      id: generateBookingId(),
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date,
      time,
      durationMinutes: selectedService.durationMinutes,
      status,
      requiredDepositMXN: selectedService.depositMXN,
      receivedDepositMXN: Number(receivedDeposit) || 0,
      finalPriceMXN: null, // Initial state: "Por confirmar"
      notes: notes.trim() || undefined,
      createdAt: getCurrentIsoTimestamp(),
    };

    onSave(newBooking);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-booking-title"
        className="relative w-full max-w-lg bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl overflow-hidden my-6"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#99745A]/15 bg-[#FAF7F2] flex items-center justify-between">
          <div>
            <h3 id="new-booking-title" className="font-serif-luxury text-xl font-bold text-[#231E1B]">
              Nueva Reserva Manual
            </h3>
            <p className="text-xs text-[#6B6158]">
              Registro de cita de ejemplo para el panel administrativo
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#6B6158] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Conflict Alert */}
          {conflictError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-bold block mb-0.5">Conflicto de Horario</span>
                <span>{conflictError}</span>
              </div>
            </div>
          )}

          {/* Client Details */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Nombre de la clienta *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej. Fernanda Morales"
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3.5 py-2 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#4A423B] mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="55 1234 5678"
                  className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3.5 py-2 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#4A423B] mb-1">
                  Correo electrónico (opcional)
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="cliente@ejemplo.com"
                  className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3.5 py-2 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
                />
              </div>
            </div>
          </div>

          {/* Service Selection (reusing official catalog) */}
          <div className="pt-2 border-t border-[#99745A]/15 space-y-2">
            <label className="block font-bold text-[#4A423B]">
              Servicio Oficial del Catálogo *
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#231E1B] font-medium focus:outline-none focus:border-[#C8933E] cursor-pointer"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.durationMinutes} min ({s.priceDisplay})
                </option>
              ))}
            </select>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5EFE6] border border-[#99745A]/15">
              <span className="text-[11px] text-[#5C534B]">
                Duración del catálogo: <strong>{selectedService.durationMinutes} min</strong>
              </span>
              <span className="text-[11px] text-[#A87428] font-bold">
                Anticipo req. (50%): ${selectedService.depositMXN.toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#99745A]/15">
            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Fecha de la cita *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setConflictError(null);
                }}
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3.5 py-2 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Hora de inicio *
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setConflictError(null);
                }}
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3.5 py-2 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
              />
              <span className="text-[10px] text-[#6B6158] mt-1 block">
                Finalizará aprox. a las {formatTimeDisplay(calculateEndTime(time, selectedService.durationMinutes))}
              </span>
            </div>
          </div>

          {/* Status & Received Deposit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#99745A]/15">
            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Estado inicial de la cita
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookingStatus)}
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3 py-2 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E] cursor-pointer"
              >
                <option value="confirmed">Confirmada (Anticipo cubierto)</option>
                <option value="pending_payment">Pendiente de pago</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Anticipo recibido ($ MXN)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={receivedDeposit}
                onChange={(e) => setReceivedDeposit(Number(e.target.value))}
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3 py-2 text-xs text-[#231E1B] font-bold focus:outline-none focus:border-[#C8933E]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold text-[#4A423B] mb-1">
              Notas adicionales (opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Especificaciones de color, historial químico o solicitudes especiales..."
              className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl p-3 text-xs text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
            />
          </div>

          {/* Demo disclaimer */}
          <div className="p-3 rounded-xl bg-[#68794E]/10 border border-[#68794E]/20 text-[11px] text-[#3D472D] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#68794E] shrink-0" />
            <span>Capacidad simulada: 1 servicio simultáneo. El precio final quedará inicialmente como "Por confirmar".</span>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-3 border-t border-[#99745A]/15">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-button w-2/3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Guardar Reserva
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
