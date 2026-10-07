import React from 'react';
import { RotateCcw, XCircle, X } from 'lucide-react';

interface AdminConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'cancel_booking' | 'reset_seed';
  itemTitle?: string;
}

export const AdminConfirmDialog: React.FC<AdminConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  itemTitle,
}) => {
  if (!isOpen) return null;

  const isReset = type === 'reset_seed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="relative w-full max-w-sm bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl p-6 text-center space-y-4 my-6 text-xs"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-black/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${isReset ? 'bg-[#C8933E]/15 text-[#C8933E]' : 'bg-red-100 text-red-600'}`}>
          {isReset ? <RotateCcw className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
        </div>

        <div>
          <h3 id="confirm-dialog-title" className="font-serif-luxury text-lg font-bold text-[#231E1B]">
            {isReset ? '¿Restablecer datos de ejemplo?' : '¿Cancelar esta reserva?'}
          </h3>
          <p className="text-xs text-[#6B6158] mt-1.5 leading-relaxed">
            {isReset
              ? 'Se descartarán todas las reservas modificadas o creadas localmente y se recargarán las 7 citas iniciales de demostración en este navegador.'
              : `La cita de "${itemTitle || 'la clienta'}" pasará al estado "Cancelada" y su horario quedará inmediatamente liberado para nuevas reservas.`}
          </p>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-colors cursor-pointer"
          >
            No, volver
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold uppercase tracking-wider text-white shadow-xs cursor-pointer transition-colors ${
              isReset
                ? 'bg-[#C8933E] hover:bg-[#B37F2C]'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isReset ? 'Restablecer' : 'Confirmar Cancelación'}
          </button>
        </div>
      </div>
    </div>
  );
};
