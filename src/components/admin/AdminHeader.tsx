import React from 'react';
import { Calendar, ListFilter, Plus, RotateCcw, ExternalLink, ShieldAlert } from 'lucide-react';
import type { AdminTab } from '../../types/admin';

interface AdminHeaderProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onOpenNewBooking: () => void;
  onOpenResetConfirm: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenNewBooking,
  onOpenResetConfirm,
}) => {
  return (
    <header className="bg-white border-b border-[#99745A]/20 sticky top-0 z-40 shadow-xs">
      {/* Permanent Demo Mode Banner */}
      <div className="bg-[#FFF9EE] border-b border-[#C8933E]/30 px-4 py-2 text-center text-xs text-[#8A5F20] font-medium flex items-center justify-center gap-2 flex-wrap">
        <ShieldAlert className="w-4 h-4 text-[#C8933E] shrink-0" />
        <span className="font-bold">Modo demostración · Datos guardados en este navegador</span>
        <span className="hidden md:inline text-[#A87428]">
          — Panel administrativo local para evaluación de flujos (sin conexión a bases de datos ni pasarelas de pago).
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#C8933E]/50 bg-white p-1 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              <img
                src="/logo-miller.png"
                alt="Logo Miller Greiseland"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-miller.jpeg';
                }}
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wider text-[#231E1B] uppercase leading-none">
                  Miller Greiseland
                </span>
                <span className="text-[10px] tracking-widest font-bold uppercase text-[#68794E] px-1.5 py-0.5 bg-[#68794E]/10 rounded">
                  Admin Demo
                </span>
              </div>
              <p className="text-[11px] text-[#6B6158] mt-0.5">
                Agenda de citas y control de reservas
              </p>
            </div>
          </div>

          {/* Controls & Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
            
            {/* View Switcher: Agenda vs Reservas */}
            <nav className="inline-flex p-1 bg-[#F5EFE6] rounded-xl border border-[#99745A]/20" aria-label="Vistas del panel">
              <button
                type="button"
                onClick={() => onTabChange('agenda')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentTab === 'agenda'
                    ? 'bg-white text-[#231E1B] shadow-xs'
                    : 'text-[#6B6158] hover:text-[#231E1B]'
                }`}
                aria-current={currentTab === 'agenda' ? 'page' : undefined}
              >
                <Calendar className="w-3.5 h-3.5 text-[#68794E]" />
                <span>Agenda</span>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('bookings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentTab === 'bookings'
                    ? 'bg-white text-[#231E1B] shadow-xs'
                    : 'text-[#6B6158] hover:text-[#231E1B]'
                }`}
                aria-current={currentTab === 'bookings' ? 'page' : undefined}
              >
                <ListFilter className="w-3.5 h-3.5 text-[#C8933E]" />
                <span>Reservas</span>
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenNewBooking}
                className="gold-button px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B]"
                title="Crear una nueva reserva manual"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nueva Reserva</span>
              </button>

              <button
                type="button"
                onClick={onOpenResetConfirm}
                className="p-2 rounded-xl border border-[#99745A]/25 text-[#6B6158] hover:text-[#231E1B] hover:bg-black/5 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Restablecer datos de ejemplo iniciales"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Restablecer datos</span>
              </button>

              <a
                href="/"
                className="p-2 rounded-xl border border-[#99745A]/20 text-[#6B6158] hover:text-[#231E1B] text-xs font-medium flex items-center gap-1 transition-colors"
                title="Volver a la página principal del salón"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Sitio público</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
