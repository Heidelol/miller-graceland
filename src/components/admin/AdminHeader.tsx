import React from 'react';
import { Calendar, ListFilter, Plus, RotateCcw, ExternalLink } from 'lucide-react';
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
    <header className="bg-white border-b border-[#99745A]/20 sticky top-0 z-40">
      {/* 1. Aviso discreto y siempre visible */}
      <div className="bg-[#FAF7F2] border-b border-[#99745A]/15 px-4 py-1.5 text-center text-[11px] text-[#7A7067] font-medium tracking-wide">
        Demostración · Datos de ejemplo guardados en este navegador
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Logo, Marca y Título */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C8933E]/40 bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
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
              <span className="font-serif-luxury text-[11px] tracking-widest uppercase text-[#7A7067] block leading-none font-bold">
                Miller Greiseland
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#231E1B] leading-tight">
                Agenda del estudio
              </h1>
            </div>
          </div>

          {/* Vistas y Acciones */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
            
            {/* Vistas únicas: Agenda vs Reservas */}
            <nav className="inline-flex p-0.5 bg-[#F2EDE4] rounded-xl border border-[#99745A]/15 text-xs" aria-label="Vistas del panel">
              <button
                type="button"
                onClick={() => onTabChange('agenda')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentTab === 'agenda'
                    ? 'bg-white text-[#231E1B] shadow-2xs'
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
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentTab === 'bookings'
                    ? 'bg-white text-[#231E1B] shadow-2xs'
                    : 'text-[#6B6158] hover:text-[#231E1B]'
                }`}
                aria-current={currentTab === 'bookings' ? 'page' : undefined}
              >
                <ListFilter className="w-3.5 h-3.5 text-[#A87428]" />
                <span>Reservas</span>
              </button>
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Botón Principal: Nueva cita */}
              <button
                type="button"
                onClick={onOpenNewBooking}
                className="gold-button px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B]"
                title="Crear una nueva cita"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva cita</span>
              </button>

              {/* Botón secundario discreto: Restablecer datos */}
              <button
                type="button"
                onClick={onOpenResetConfirm}
                className="text-xs text-[#7A7067] hover:text-[#231E1B] hover:bg-black/5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                title="Restablecer datos de ejemplo iniciales"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#99745A]" />
                <span className="hidden md:inline">Restablecer datos de ejemplo</span>
              </button>

              {/* Enlace secundario discreto: Volver al sitio */}
              <a
                href="/"
                className="text-xs text-[#7A7067] hover:text-[#231E1B] hover:bg-black/5 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                title="Volver a la página principal del salón"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#99745A]" />
                <span className="hidden lg:inline">Volver al sitio</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
