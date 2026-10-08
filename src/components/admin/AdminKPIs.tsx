import React from 'react';
import { CalendarCheck, Clock, CreditCard } from 'lucide-react';
import type { AdminBooking, AgendaViewMode, AdminTab } from '../../types/admin';
import { calculateAgendaSummary } from '../../lib/adminBookingLogic';

interface AdminKPIsProps {
  bookings: AdminBooking[];
  selectedDate: string;
  viewMode: AgendaViewMode;
  currentTab: AdminTab;
}

export const AdminKPIs: React.FC<AdminKPIsProps> = ({
  bookings,
  selectedDate,
  viewMode,
  currentTab,
}) => {
  // If on bookings tab, calculate summary for all active bookings
  const summary = currentTab === 'bookings'
    ? {
        periodLabel: 'Total de reservas',
        scopeSubtitle: `${bookings.filter(b => b.status !== 'cancelled').length} activas`,
        appointmentsCount: bookings.filter(b => b.status !== 'cancelled').length,
        pendingDepositCount: bookings.filter(b => b.status === 'pending_payment').length,
        receivedDepositsMXN: bookings
          .filter(b => b.status !== 'cancelled')
          .reduce((sum, b) => sum + (b.receivedDepositMXN || 0), 0),
      }
    : calculateAgendaSummary(bookings, selectedDate, viewMode);

  return (
    <section
      aria-label="Franja de resumen operativo"
      className="bg-white border border-[#99745A]/15 rounded-xl px-4 sm:px-6 py-3 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
    >
      <div className="flex flex-wrap items-center gap-5 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#99745A]/15">
        {/* 1. Citas del día o semana */}
        <div className="flex items-center gap-3 pt-2 md:pt-0">
          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#99745A]/20 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-4 h-4 text-[#68794E]" />
          </div>
          <div>
            <span className="text-[11px] text-[#6B6158] block font-medium">
              {summary.periodLabel}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-[#231E1B]">
                {summary.appointmentsCount}
              </span>
              <span className="text-[11px] text-[#7A7067]">
                ({summary.scopeSubtitle})
              </span>
            </div>
          </div>
        </div>

        {/* 2. Pendientes de anticipo */}
        <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-8">
          <div className="w-8 h-8 rounded-lg bg-[#FFF9EE] border border-[#C8933E]/25 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#C8933E]" />
          </div>
          <div>
            <span className="text-[11px] text-[#8A5F20] block font-medium">
              Pendientes de anticipo
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-[#A87428]">
                {summary.pendingDepositCount}
              </span>
              <span className="text-[11px] text-[#7A7067]">
                por cobrar
              </span>
            </div>
          </div>
        </div>

        {/* 3. Anticipos recibidos (dinero registrado) */}
        <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-8">
          <div className="w-8 h-8 rounded-lg bg-[#EBF0E6] border border-[#68794E]/25 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4 text-[#68794E]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#42502E] block font-medium">
                Anticipos recibidos
              </span>
              <span className="text-[10px] text-[#7A7067] hidden lg:inline">
                (dinero registrado)
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold font-mono text-[#231E1B]">
                ${summary.receivedDepositsMXN.toLocaleString('es-MX')}
              </span>
              <span className="text-[11px] font-bold text-[#68794E]">MXN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador contextual sutil */}
      <div className="text-[11px] text-[#7A7067] hidden xl:flex items-center gap-2 border-l border-[#99745A]/15 pl-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#68794E]" />
        <span>Control de agenda · Miller Greiseland</span>
      </div>
    </section>
  );
};
