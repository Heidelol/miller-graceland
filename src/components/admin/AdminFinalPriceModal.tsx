import React, { useState } from 'react';
import { X, Calculator, HelpCircle } from 'lucide-react';
import type { AdminBooking } from '../../types/admin';

interface AdminFinalPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: AdminBooking | null;
  onSaveFinalPrice: (bookingId: string, finalPriceMXN: number | null) => void;
}

export const AdminFinalPriceModal: React.FC<AdminFinalPriceModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSaveFinalPrice,
}) => {
  const [priceInput, setPriceInput] = useState<string>(
    booking && booking.finalPriceMXN !== null ? String(booking.finalPriceMXN) : ''
  );

  if (!isOpen || !booking) return null;

  const numericValue = priceInput.trim() !== '' ? Number(priceInput) : null;
  const receivedDeposit = booking.receivedDepositMXN || 0;
  const calculatedBalance = numericValue !== null ? Math.max(0, numericValue - receivedDeposit) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveFinalPrice(booking.id, numericValue);
    onClose();
  };

  const handleClear = () => {
    setPriceInput('');
    onSaveFinalPrice(booking.id, null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="final-price-title"
        className="relative w-full max-w-md bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl overflow-hidden my-6 text-xs"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#99745A]/15 bg-[#FAF7F2] flex items-center justify-between">
          <div>
            <h3 id="final-price-title" className="font-serif-luxury text-xl font-bold text-[#231E1B]">
              Registrar Precio Final
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#99745A]/15 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B6158]">Anticipo cubierto por la clienta:</span>
              <span className="font-bold text-[#68794E]">
                ${receivedDeposit.toLocaleString('es-MX')} MXN
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B6158]">Anticipo requerido oficial (50% mín):</span>
              <span className="font-bold text-[#231E1B]">
                ${booking.requiredDepositMXN.toLocaleString('es-MX')} MXN
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#4A423B] mb-1">
              Precio final acordado tras valoración en salón ($ MXN)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-[#A87428] text-sm">$</span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Ej. 3800"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#99745A]/25 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-[#231E1B] focus:outline-none focus:border-[#C8933E]"
              />
            </div>
            <p className="text-[11px] text-[#7A7067] mt-1 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>Deja en blanco si el precio final aún no ha sido determinado.</span>
            </p>
          </div>

          {/* Dynamic Balance Preview */}
          <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#C8933E]/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8A5F20]">
              <Calculator className="w-3.5 h-3.5" />
              <span>Cálculo en Vivo del Saldo</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs text-[#5C534B]">Saldo resultante a liquidar:</span>
              <span className="text-lg font-bold font-serif-luxury text-[#A87428]">
                {calculatedBalance !== null
                  ? `$${calculatedBalance.toLocaleString('es-MX')} MXN`
                  : 'Por confirmar'}
              </span>
            </div>
            {calculatedBalance !== null && (
              <p className="text-[10px] text-[#7A7067]">
                ${numericValue?.toLocaleString('es-MX')} (precio final) − ${receivedDeposit.toLocaleString('es-MX')} (anticipo recibido) = ${calculatedBalance.toLocaleString('es-MX')} MXN.
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#99745A]/15">
            {booking.finalPriceMXN !== null && (
              <button
                type="button"
                onClick={handleClear}
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition-colors cursor-pointer"
                title="Quitar precio y volver a 'Por confirmar'"
              >
                Dejar por confirmar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="gold-button flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Guardar Precio
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
