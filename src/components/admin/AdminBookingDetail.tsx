import React from 'react';
import { 
  Phone, Mail, Calendar, Clock, 
  CheckCircle2, AlertCircle, XCircle,
  Edit3, RefreshCw, CreditCard
} from 'lucide-react';
import type { AdminBooking } from '../../types/admin';
import { 
  formatDateDisplay, formatTimeDisplay, 
  calculateEndTime, calculateBalance, getBookingStatusLabel 
} from '../../lib/adminBookingLogic';

interface AdminBookingDetailProps {
  booking: AdminBooking | null;
  onClose?: () => void;
  onOpenReschedule: (booking: AdminBooking) => void;
  onOpenCancel: (booking: AdminBooking) => void;
  onMarkAsCompleted: (booking: AdminBooking) => void;
  onOpenFinalPrice: (booking: AdminBooking) => void;
  onOpenDeposit: (booking: AdminBooking) => void;
}

export const AdminBookingDetail: React.FC<AdminBookingDetailProps> = ({
  booking,
  onClose,
  onOpenReschedule,
  onOpenCancel,
  onMarkAsCompleted,
  onOpenFinalPrice,
  onOpenDeposit,
}) => {
  if (!booking) {
    return (
      <div className="bg-white rounded-xl border border-[#99745A]/20 shadow-2xs p-8 text-center h-full flex flex-col items-center justify-center min-h-[360px]">
        <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#99745A]/20 flex items-center justify-center text-[#C8933E] mb-3">
          <Calendar className="w-5 h-5" />
        </div>
        <h4 className="font-serif-luxury text-base font-bold text-[#231E1B]">
          Detalle de la cita
        </h4>
        <p className="text-xs text-[#6B6158] max-w-xs mt-1">
          Selecciona una cita en la agenda para ver su información, registrar anticipos o precio final.
        </p>
      </div>
    );
  }

  const clientName = booking.clientName || 'Clienta';
  const clientPhone = booking.clientPhone || 'Sin teléfono';
  const serviceName = booking.serviceName || 'Servicio';
  const requiredDeposit = booking.requiredDepositMXN ?? 0;
  const receivedDeposit = booking.receivedDepositMXN ?? 0;

  const endTime = calculateEndTime(booking.time || '11:00', booking.durationMinutes || 60);
  const balanceCalc = calculateBalance(booking.finalPriceMXN, receivedDeposit);

  // Status badge with icon and label
  const getStatusBadge = (status: AdminBooking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#68794E]/15 text-[#42502E] border border-[#68794E]/30 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#68794E]" />
            <span>Confirmada</span>
          </span>
        );
      case 'pending_payment':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C8933E]/15 text-[#8A5F20] border border-[#C8933E]/30 whitespace-nowrap">
            <AlertCircle className="w-3.5 h-3.5 text-[#C8933E]" />
            <span>Pendiente de pago</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#42502E]/20 text-[#2C381E] border border-[#42502E]/40 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#42502E]" />
            <span>Atendida</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5 text-gray-400" />
            <span>Cancelada</span>
          </span>
        );
      default:
        return <span>{getBookingStatusLabel(status)}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#99745A]/20 shadow-2xs overflow-hidden flex flex-col h-full text-xs">
      {/* Header con código de cita y estado */}
      <div className="p-3.5 sm:p-4 border-b border-[#99745A]/15 bg-[#FAF7F2] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold text-[#A87428] bg-white px-2 py-0.5 rounded border border-[#99745A]/20">
            {booking.id}
          </span>
          {getStatusBadge(booking.status)}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#6B6158] hover:text-[#231E1B] px-2 py-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Volver a la agenda"
          >
            <span>← Volver a la agenda</span>
          </button>
        )}
      </div>

      {/* Contenido dividido limpiamente sin recuadros anidados */}
      <div className="divide-y divide-[#99745A]/10 overflow-y-auto flex-1">
        
        {/* 1. Clienta y contacto */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7067] block">
            Clienta y contacto
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#231E1B]">
            {clientName}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-[#5C534B] pt-0.5">
            {clientPhone && (
              <a
                href={`tel:${clientPhone}`}
                className="inline-flex items-center gap-1.5 text-[#68794E] hover:underline font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{clientPhone}</span>
              </a>
            )}
            {booking.clientEmail && (
              <a
                href={`mailto:${booking.clientEmail}`}
                className="inline-flex items-center gap-1.5 text-[#6B6158] hover:underline truncate"
              >
                <Mail className="w-3.5 h-3.5 text-[#99745A]" />
                <span className="truncate">{booking.clientEmail}</span>
              </a>
            )}
          </div>
        </div>

        {/* 2. Servicio y horario */}
        <div className="p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7067] block">
            Servicio y horario
          </span>
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-sm font-bold text-[#231E1B]">
              {serviceName}
            </h4>
            <span className="text-[11px] text-[#68794E] font-semibold shrink-0">
              {booking.durationMinutes || 60} min
            </span>
          </div>
          <div className="text-xs text-[#5C534B] space-y-1">
            <div className="flex items-center gap-2 capitalize">
              <Calendar className="w-3.5 h-3.5 text-[#C8933E] shrink-0" />
              <span>{formatDateDisplay(booking.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#68794E] shrink-0" />
              <span className="font-mono font-bold text-[#231E1B]">
                {formatTimeDisplay(booking.time)} – {formatTimeDisplay(endTime)}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Pagos con las etiquetas oficiales requeridas */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7067]">
              Pagos y saldos
            </span>
            <button
              type="button"
              onClick={() => onOpenFinalPrice(booking)}
              className="text-xs text-[#A87428] hover:text-[#8A5F20] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{booking.finalPriceMXN !== null ? 'Modificar precio' : 'Asignar precio final'}</span>
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* Anticipo necesario para confirmar */}
            <div className="flex items-center justify-between py-1 border-b border-[#99745A]/10">
              <span className="text-[#6B6158]">Anticipo necesario para confirmar:</span>
              <span className="font-bold text-[#231E1B] font-mono">
                ${requiredDeposit.toLocaleString('es-MX')} MXN
              </span>
            </div>

            {/* Anticipo recibido */}
            <div className="flex items-center justify-between py-1 border-b border-[#99745A]/10">
              <div className="flex items-center gap-2">
                <span className="text-[#6B6158]">Anticipo recibido:</span>
                <button
                  type="button"
                  onClick={() => onOpenDeposit(booking)}
                  className="text-[11px] text-[#A87428] hover:underline font-semibold cursor-pointer"
                >
                  Modificar
                </button>
              </div>
              <span className={`font-bold font-mono ${receivedDeposit >= requiredDeposit ? 'text-[#42502E]' : 'text-[#A87428]'}`}>
                ${receivedDeposit.toLocaleString('es-MX')} MXN
              </span>
            </div>

            {/* Precio final del servicio */}
            <div className="flex items-center justify-between py-1 border-b border-[#99745A]/10">
              <span className="text-[#6B6158]">Precio final del servicio:</span>
              {booking.finalPriceMXN !== null ? (
                <span className="font-bold text-[#231E1B] font-mono">
                  ${booking.finalPriceMXN.toLocaleString('es-MX')} MXN
                </span>
              ) : (
                <span className="text-[#7A7067] italic">
                  Precio final por confirmar en el salón
                </span>
              )}
            </div>

            {/* Falta por pagar o Saldo a favor */}
            {booking.finalPriceMXN !== null ? (
              <>
                <div className="flex items-center justify-between py-1 pt-1 font-bold">
                  <span className="text-[#231E1B]">Falta por pagar:</span>
                  <span className="text-sm font-mono text-[#A87428]">
                    ${balanceCalc.pendingBalanceMXN?.toLocaleString('es-MX')} MXN
                  </span>
                </div>

                {balanceCalc.hasCredit && (
                  <div className="flex items-center justify-between py-1.5 px-3 bg-[#EBF0E6] rounded-lg border border-[#68794E]/30 text-[#2C381E] font-bold">
                    <span>Saldo a favor:</span>
                    <span className="text-sm font-mono text-[#3D472D]">
                      ${balanceCalc.creditBalanceMXN.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                )}

                {balanceCalc.explanation && (
                  <p className="text-[11px] text-[#7A7067] italic pt-0.5">
                    {balanceCalc.explanation}
                  </p>
                )}
              </>
            ) : (
              <div className="py-1 text-[11px] text-[#7A7067] italic">
                El saldo por liquidar se calculará tras confirmar el precio final en el salón.
              </div>
            )}
          </div>
        </div>

        {/* 4. Información previa del cabello (para servicios de color/rubios) */}
        {booking.hairProfile && typeof booking.hairProfile === 'object' && (
          <div className="p-4 sm:p-5 space-y-2.5 bg-[#FAF7F2]/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A87428] block">
              Cuéntanos sobre tu cabello · Diagnóstico previo
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {typeof booking.hairProfile.currentColor === 'string' && booking.hairProfile.currentColor.trim() && (
                <div>
                  <span className="text-[#7A7067] block text-[10px]">Color actual:</span>
                  <span className="font-semibold text-[#231E1B]">{booking.hairProfile.currentColor}</span>
                </div>
              )}
              {typeof booking.hairProfile.desiredResult === 'string' && booking.hairProfile.desiredResult.trim() && (
                <div>
                  <span className="text-[#7A7067] block text-[10px]">Resultado que busca:</span>
                  <span className="font-semibold text-[#231E1B]">{booking.hairProfile.desiredResult}</span>
                </div>
              )}
              {typeof booking.hairProfile.hairLength === 'string' && booking.hairProfile.hairLength.trim() && (
                <div>
                  <span className="text-[#7A7067] block text-[10px]">Largo aproximado:</span>
                  <span className="font-semibold text-[#231E1B] capitalize">{booking.hairProfile.hairLength}</span>
                </div>
              )}
              {typeof booking.hairProfile.previousColoring === 'string' && booking.hairProfile.previousColoring.trim() && (
                <div>
                  <span className="text-[#7A7067] block text-[10px]">Coloración / decoloración previa:</span>
                  <span className="font-semibold text-[#231E1B]">
                    {booking.hairProfile.previousColoring === 'si'
                      ? 'Sí'
                      : booking.hairProfile.previousColoring === 'no'
                      ? 'No'
                      : 'No lo sé'}
                  </span>
                </div>
              )}
              {typeof booking.hairProfile.lastProcessDetails === 'string' && booking.hairProfile.lastProcessDetails.trim() && (
                <div className="sm:col-span-2">
                  <span className="text-[#7A7067] block text-[10px]">Último proceso y fecha aproximada:</span>
                  <span className="font-semibold text-[#231E1B]">{booking.hairProfile.lastProcessDetails}</span>
                </div>
              )}
              {typeof booking.hairProfile.additionalComments === 'string' && booking.hairProfile.additionalComments.trim() && (
                <div className="sm:col-span-2">
                  <span className="text-[#7A7067] block text-[10px]">Comentarios adicionales:</span>
                  <span className="font-semibold text-[#231E1B]">{booking.hairProfile.additionalComments}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Notas */}
        {booking.notes && (
          <div className="p-4 sm:p-5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7067] block">
              Notas de la cita
            </span>
            <p className="text-xs text-[#554C44] leading-relaxed">
              {booking.notes}
            </p>
          </div>
        )}

        {/* 5. Acciones con jerarquía clara */}
        <div className="p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7067] block">
            Acciones
          </span>

          {/* Acción Principal según estado */}
          {booking.status === 'pending_payment' && (
            <button
              type="button"
              onClick={() => onOpenDeposit(booking)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#C8933E] hover:bg-[#B58232] text-[#231E1B] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Registrar anticipo</span>
            </button>
          )}

          {booking.status === 'confirmed' && (
            <button
              type="button"
              onClick={() => onMarkAsCompleted(booking)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#68794E] hover:bg-[#586742] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Marcar como atendida</span>
            </button>
          )}

          {booking.status === 'completed' && (
            <div className="p-2.5 rounded-lg bg-[#EBF0E6] border border-[#68794E]/25 text-[#2C381E] text-center font-medium text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#68794E]" />
              <span>Cita atendida y completada</span>
            </div>
          )}

          {booking.status === 'cancelled' && (
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-center text-xs flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4 text-gray-400" />
              <span>Cita cancelada (horario liberado)</span>
            </div>
          )}

          {/* Acciones Secundarias */}
          {booking.status !== 'cancelled' && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenReschedule(booking)}
                className="py-2 px-3 rounded-lg border border-[#99745A]/25 text-[#4A423B] hover:text-[#231E1B] hover:bg-black/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#A87428]" />
                <span>Reprogramar</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenFinalPrice(booking)}
                className="py-2 px-3 rounded-lg border border-[#99745A]/25 text-[#4A423B] hover:text-[#231E1B] hover:bg-black/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#68794E]" />
                <span>Modificar precio final</span>
              </button>
            </div>
          )}

          {booking.status !== 'cancelled' && (
            <button
              type="button"
              onClick={() => onOpenCancel(booking)}
              className="w-full py-2 px-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancelar cita</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
