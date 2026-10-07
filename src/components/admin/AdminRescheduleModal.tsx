import React, { useState } from 'react';
import { X, Clock, AlertTriangle } from 'lucide-react';
import type { AdminBooking } from '../../types/admin';
import { 
  hasScheduleConflict, calculateEndTime, 
  formatTimeDisplay, formatDateDisplay 
} from '../../lib/adminBookingLogic';

interface AdminRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: AdminBooking | null;
  bookings: AdminBooking[];
  onConfirmReschedule: (bookingId: string, newDate: string, newTime: string) => void;
}

export const AdminRescheduleModal: React.FC<AdminRescheduleModalProps> = ({
  isOpen,
  onClose,
  booking,
  bookings,
  onConfirmReschedule,
}) => {
  const [newDate, setNewDate] = useState(booking ? booking.date : '');
  const [newTime, setNewTime] = useState(booking ? booking.time : '');
  const [conflictError, setConflictError] = useState<string | null>(null);

  if (!isOpen || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    if (!newDate || !newTime) {
      setConflictError('Por favor selecciona una fecha y hora válidas.');
      return;
    }

    // Check conflict excluding current booking ID
    const conflictCheck = hasScheduleConflict(
      bookings,
      newDate,
      newTime,
      booking.durationMinutes,
      booking.id
    );

    if (conflictCheck.hasConflict && conflictCheck.conflictingBooking) {
      const cb = conflictCheck.conflictingBooking;
      const cbEnd = calculateEndTime(cb.time, cb.durationMinutes);
      setConflictError(
        `Conflicto detectado con la cita de ${cb.clientName} (${cb.serviceName}, ${formatTimeDisplay(cb.time)} a ${formatTimeDisplay(cbEnd)}). Elige otro horario.`
      );
      return;
    }

    onConfirmReschedule(booking.id, newDate, newTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="reschedule-title"
        className="relative w-full max-w-md bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl overflow-hidden my-6 text-xs"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#99745A]/15 bg-[#FAF7F2] flex items-center justify-between">
          <div>
            <h3 id="reschedule-title" className="font-serif-luxury text-xl font-bold text-[#231E1B]">
              Reprogramar Cita
            </h3>
            <p className="text-xs text-[#6B6158]">
              {booking.clientName} — {booking.serviceName}
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

        {/* Current Info */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#99745A]/15 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#68794E] tracking-wider block">
              Horario Actual Programado
            </span>
            <p className="text-xs font-bold text-[#231E1B] capitalize">
              {formatDateDisplay(booking.date)}
            </p>
            <p className="text-xs text-[#554C44] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#68794E]" />
              {formatTimeDisplay(booking.time)} ({booking.durationMinutes} minutos de servicio)
            </p>
          </div>

          {/* Conflict Alert */}
          {conflictError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-bold block">Horario Ocupado</span>
                <span>{conflictError}</span>
              </div>
            </div>
          )}

          {/* New Date and Time inputs */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Nueva Fecha *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => {
                    setNewDate(e.target.value);
                    setConflictError(null);
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3 py-2 text-xs text-[#231E1B] font-bold focus:outline-none focus:border-[#C8933E]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#4A423B] mb-1">
                Nueva Hora de Inicio *
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={newTime}
                  onChange={(e) => {
                    setNewTime(e.target.value);
                    setConflictError(null);
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl px-3 py-2 text-xs text-[#231E1B] font-bold focus:outline-none focus:border-[#C8933E]"
                />
              </div>
              <span className="text-[10px] text-[#6B6158] mt-1 block">
                Finalizará aprox. a las {formatTimeDisplay(calculateEndTime(newTime || '11:00', booking.durationMinutes))}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-3 border-t border-[#99745A]/15">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-button w-2/3 py-2.5 rounded-xl font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Confirmar Reprogramación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
