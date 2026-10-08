import React, { useState } from 'react';
import { X, CreditCard, CheckCircle2, AlertTriangle, Calculator, ShieldCheck } from 'lucide-react';
import type { AdminBooking } from '../../types/admin';
import {
  calculateBalance,
  determineStatusAfterDepositChange,
  getBookingStatusLabel,
} from '../../lib/adminBookingLogic';

interface AdminDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: AdminBooking | null;
  onSaveDeposit: (bookingId: string, receivedDeposit: number) => void;
}

export const AdminDepositModal: React.FC<AdminDepositModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSaveDeposit,
}) => {
  const [depositInput, setDepositInput] = useState<string>(() =>
    booking ? String(booking.receivedDepositMXN ?? 0) : '0'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !booking) return null;

  const numericValue = Math.max(0, Number(depositInput) || 0);
  const nextStatus = determineStatusAfterDepositChange(
    booking.status,
    numericValue,
    booking.requiredDepositMXN
  );

  const balanceCalc = calculateBalance(booking.finalPriceMXN, numericValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (isNaN(Number(depositInput)) || Number(depositInput) < 0) {
      setErrorMsg('Por favor ingresa un importe numérico válido mayor o igual a $0.');
      return;
    }

    onSaveDeposit(booking.id, numericValue);
    onClose();
  };

  const isCoversRequired = numericValue >= booking.requiredDepositMXN;
  const missingAmount = Math.max(0, booking.requiredDepositMXN - numericValue);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="deposit-modal-title"
        className="relative w-full max-w-md bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl overflow-hidden my-6 text-xs"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#99745A]/15 bg-[#FAF7F2] flex items-center justify-between">
          <div>
            <h3 id="deposit-modal-title" className="font-serif-luxury text-xl font-bold text-[#231E1B]">
              Registrar Anticipo
            </h3>
            <p className="text-xs text-[#6B6158]">
              {booking.clientName} — {booking.serviceName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-[#6B6158] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Reference Info */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#99745A]/15 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B6158]">Anticipo necesario para confirmar (50% mín):</span>
              <span className="font-bold text-[#231E1B] font-mono">
                ${booking.requiredDepositMXN.toLocaleString('es-MX')} MXN
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B6158]">Estado actual de la cita:</span>
              <span className="font-bold text-[#68794E]">
                {getBookingStatusLabel(booking.status)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-[#99745A]/10 pt-1.5">
              <span className="text-[#6B6158]">Anticipo actualmente registrado:</span>
              <span className="font-bold text-[#231E1B] font-mono">
                ${(booking.receivedDepositMXN ?? 0).toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>

          {/* Deposit Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="deposit-amount-input" className="block font-bold text-[#4A423B]">
                Total de anticipo recibido ($ MXN) *
              </label>
              <button
                type="button"
                onClick={() => setDepositInput(String(booking.requiredDepositMXN))}
                className="text-[11px] font-bold text-[#A87428] hover:underline cursor-pointer"
              >
                Copiar requerido (${booking.requiredDepositMXN.toLocaleString('es-MX')})
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-[#A87428] text-sm">$</span>
              <input
                id="deposit-amount-input"
                type="number"
                min="0"
                step="any"
                required
                value={depositInput}
                onChange={(e) => {
                  setDepositInput(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
              />
            </div>
            <p className="text-[11px] text-[#7A7067] mt-1 leading-normal">
              Indica el monto total acumulado recibido por este concepto. Reemplaza el importe anterior si hubo pagos previos.
            </p>
            {errorMsg && (
              <p className="text-[11px] text-red-600 font-semibold mt-1">{errorMsg}</p>
            )}
          </div>

          {/* Status Transition Preview */}
          <div
            className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-colors ${
              booking.status === 'cancelled' || booking.status === 'completed'
                ? 'bg-gray-50 border-gray-200 text-gray-700'
                : isCoversRequired
                ? 'bg-[#EBF0E6] border-[#68794E]/40 text-[#2C381E]'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-[11px]">
              {booking.status === 'cancelled' || booking.status === 'completed' ? (
                <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              ) : isCoversRequired ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#68794E]" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              )}
              <span>Estado resultante de la cita: «{getBookingStatusLabel(nextStatus)}»</span>
            </div>

            {booking.status === 'cancelled' && (
              <p className="text-[11px]">
                Esta cita está cancelada. El importe se registrará para fines contables pero el estado permanecerá como <strong>Cancelada</strong> (no se reactiva automáticamente).
              </p>
            )}

            {booking.status === 'completed' && (
              <p className="text-[11px]">
                Esta cita ya fue atendida. El estado permanecerá intacto como <strong>Atendida</strong>.
              </p>
            )}

            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
              <>
                {isCoversRequired ? (
                  <p className="text-[11px]">
                    ✓ El importe recibido (${numericValue.toLocaleString('es-MX')} MXN) alcanza o supera el 50% requerido (${booking.requiredDepositMXN.toLocaleString('es-MX')} MXN). La cita pasará a <strong>Confirmada</strong>.
                  </p>
                ) : (
                  <p className="text-[11px]">
                    ⚠️ El importe recibido (${numericValue.toLocaleString('es-MX')} MXN) es inferior al requerido (${booking.requiredDepositMXN.toLocaleString('es-MX')} MXN). Faltan ${missingAmount.toLocaleString('es-MX')} MXN para alcanzar el 50%. La cita permanecerá como <strong>Pendiente de pago</strong>.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Live Balance / Saldo a Favor Preview */}
          <div className="p-3.5 rounded-2xl bg-[#FFF9EE] border border-[#C8933E]/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8A5F20]">
              <Calculator className="w-3.5 h-3.5" />
              <span>Cálculo en Vivo de Saldos</span>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs text-[#5C534B]">Saldo por liquidar:</span>
              <span className="text-base font-bold font-serif-luxury text-[#A87428]">
                {balanceCalc.isPending
                  ? 'Por confirmar'
                  : `$${balanceCalc.pendingBalanceMXN?.toLocaleString('es-MX')} MXN`}
              </span>
            </div>

            {balanceCalc.hasCredit && (
              <div className="flex justify-between items-baseline pt-1 border-t border-[#C8933E]/20 text-[#4A5736]">
                <span className="text-xs font-bold">Saldo a favor de la clienta:</span>
                <span className="text-base font-bold font-serif-luxury">
                  ${balanceCalc.creditBalanceMXN.toLocaleString('es-MX')} MXN
                </span>
              </div>
            )}

            {balanceCalc.explanation && (
              <p className="text-[10px] text-[#7A7067] pt-1">
                {balanceCalc.explanation}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-3 border-t border-[#99745A]/15">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-button flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Guardar anticipo</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
