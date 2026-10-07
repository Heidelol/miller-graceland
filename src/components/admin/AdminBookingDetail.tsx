import React from 'react';
import { 
  Phone, Mail, Calendar, Clock, 
  CheckCircle2, AlertCircle, XCircle, FileText,
  DollarSign, Edit3, X, RefreshCw
} from 'lucide-react';
import type { AdminBooking } from '../../types/admin';
import { 
  formatDateDisplay, formatTimeDisplay, 
  calculateEndTime, calculateBalance 
} from '../../lib/adminBookingLogic';

interface AdminBookingDetailProps {
  booking: AdminBooking | null;
  onClose?: () => void;
  onOpenReschedule: (booking: AdminBooking) => void;
  onOpenCancel: (booking: AdminBooking) => void;
  onMarkAsCompleted: (booking: AdminBooking) => void;
  onOpenFinalPrice: (booking: AdminBooking) => void;
}

export const AdminBookingDetail: React.FC<AdminBookingDetailProps> = ({
  booking,
  onClose,
  onOpenReschedule,
  onOpenCancel,
  onMarkAsCompleted,
  onOpenFinalPrice,
}) => {
  if (!booking) {
    return (
      <div className="bg-white rounded-3xl border border-[#99745A]/20 shadow-xs p-8 text-center h-full flex flex-col items-center justify-center min-h-[380px]">
        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#99745A]/20 flex items-center justify-center text-[#C8933E] mb-3">
          <Calendar className="w-6 h-6" />
        </div>
        <h4 className="font-serif-luxury text-lg font-bold text-[#231E1B]">
          Detalle de la Cita
        </h4>
        <p className="text-xs text-[#6B6158] max-w-xs mt-1">
          Selecciona una cita en el calendario o en la lista de reservas para consultar sus datos, registrar el precio final o reprogramarla.
        </p>
      </div>
    );
  }

  const endTime = calculateEndTime(booking.time, booking.durationMinutes);
  const { balanceMXN, isPending } = calculateBalance(booking.finalPriceMXN, booking.receivedDepositMXN);

  return (
    <div className="bg-white rounded-3xl border border-[#99745A]/20 shadow-xs overflow-hidden flex flex-col h-full">
      {/* Detail Header */}
      <div className="p-4 sm:p-5 border-b border-[#99745A]/15 bg-[#FAF7F2] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-black text-[#A87428]">
            {booking.id}
          </span>
          {/* Status Badge */}
          {booking.status === 'confirmed' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#68794E]/15 text-[#42502E] border border-[#68794E]/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#68794E]" />
              Confirmada
            </span>
          )}
          {booking.status === 'pending_payment' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C8933E]/15 text-[#8A5F20] border border-[#C8933E]/30">
              <AlertCircle className="w-3.5 h-3.5 text-[#C8933E]" />
              Pendiente de Pago
            </span>
          )}
          {booking.status === 'completed' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#42502E]/20 text-[#2C381E] border border-[#42502E]/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#42502E]" />
              Atendida
            </span>
          )}
          {booking.status === 'cancelled' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
              <XCircle className="w-3.5 h-3.5 text-gray-400" />
              Cancelada
            </span>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#6B6158] hover:text-[#231E1B] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Cerrar detalle"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Detail Body */}
      <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
        
        {/* Client Profile */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EAE3D6] border border-[#C8933E]/40 flex items-center justify-center text-xs font-bold text-[#4A423B] shrink-0">
            {booking.clientName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif-luxury text-lg font-bold text-[#231E1B] truncate">
              {booking.clientName}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-[#5C534B] mt-0.5">
              <a
                href={`tel:${booking.clientPhone}`}
                className="flex items-center gap-1 text-[#68794E] hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{booking.clientPhone}</span>
              </a>
              {booking.clientEmail && (
                <a
                  href={`mailto:${booking.clientEmail}`}
                  className="flex items-center gap-1 hover:underline truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{booking.clientEmail}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Service Card */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#99745A]/15 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#68794E] tracking-wider block">
                Servicio Oficial
              </span>
              <h4 className="text-sm font-bold text-[#231E1B]">
                {booking.serviceName}
              </h4>
            </div>
            <span className="text-xs font-bold text-[#68794E] flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#68794E]/20 shadow-2xs shrink-0">
              <Clock className="w-3.5 h-3.5" />
              {booking.durationMinutes} min
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#99745A]/10 text-xs text-[#554C44]">
            <Calendar className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
            <span className="font-medium capitalize">{formatDateDisplay(booking.date)}</span>
            <span className="text-[#8C8278]">|</span>
            <span className="font-bold text-[#231E1B]">
              {formatTimeDisplay(booking.time)} – {formatTimeDisplay(endTime)}
            </span>
          </div>
        </div>

        {/* Financial & Balance Box */}
        <div className="p-4 rounded-2xl bg-white border border-[#C8933E]/30 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#99745A]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#231E1B] flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#C8933E]" />
              Estado Financiero
            </span>
            <button
              type="button"
              onClick={() => onOpenFinalPrice(booking)}
              className="text-xs font-bold text-[#A87428] hover:text-[#8A5F20] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{booking.finalPriceMXN !== null ? 'Modificar precio' : 'Registrar precio final'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-[#7A7067] block">Anticipo requerido (50%)</span>
              <span className="text-sm font-bold text-[#231E1B]">
                ${booking.requiredDepositMXN.toLocaleString('es-MX')} MXN
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#7A7067] block">Anticipo recibido</span>
              <span className="text-sm font-bold text-[#68794E]">
                ${booking.receivedDepositMXN.toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#99745A]/10 grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-[#7A7067] block">Precio final acordado</span>
              <span className={`text-base font-bold font-serif-luxury ${booking.finalPriceMXN !== null ? 'text-[#231E1B]' : 'text-gray-400 italic'}`}>
                {booking.finalPriceMXN !== null
                  ? `$${booking.finalPriceMXN.toLocaleString('es-MX')} MXN`
                  : 'Por confirmar'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FFF9EE] border border-[#C8933E]/30">
              <span className="text-[10px] uppercase font-bold text-[#8A5F20] block">
                Saldo por liquidar
              </span>
              <span className={`text-base font-bold font-serif-luxury ${!isPending ? 'text-[#A87428]' : 'text-gray-400 italic'}`}>
                {!isPending && balanceMXN !== null
                  ? `$${balanceMXN.toLocaleString('es-MX')} MXN`
                  : 'Por confirmar'}
              </span>
            </div>
          </div>

          {isPending && (
            <p className="text-[11px] text-[#7A7067] italic leading-tight">
              * El saldo definitivo se calculará una vez que se registre el precio final tras la valoración en el salón.
            </p>
          )}
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#99745A]/15 text-xs text-[#554C44] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6158] flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#99745A]" />
              Notas de la cita
            </span>
            <p className="leading-relaxed">{booking.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#99745A]/15 space-y-2.5">
          {booking.status !== 'completed' && booking.status !== 'cancelled' && (
            <button
              type="button"
              onClick={() => onMarkAsCompleted(booking)}
              className="w-full py-2.5 rounded-xl bg-[#68794E] hover:bg-[#586742] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Marcar como Atendida</span>
            </button>
          )}

          {booking.status !== 'cancelled' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onOpenReschedule(booking)}
                className="flex-1 py-2.5 rounded-xl border border-[#C8933E] text-[#A87428] hover:bg-[#FFF9EE] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reprogramar</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenCancel(booking)}
                className="px-3.5 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Cancelar cita y liberar horario"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancelar</span>
              </button>
            </div>
          )}

          {booking.status === 'cancelled' && (
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center text-xs text-gray-500">
              Esta reserva fue cancelada y el horario está disponible para otras citas.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
