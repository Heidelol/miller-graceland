import React from 'react';
import { CalendarCheck, Clock, CheckCircle2, XCircle, CreditCard } from 'lucide-react';
import type { AdminKPIsData } from '../../types/admin';

interface AdminKPIsProps {
  kpis: AdminKPIsData;
}

export const AdminKPIs: React.FC<AdminKPIsProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {/* 1. Total & Confirmadas */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#99745A]/15 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#68794E]/15 text-[#42502E] flex items-center justify-center shrink-0">
          <CalendarCheck className="w-5 h-5 text-[#68794E]" />
        </div>
        <div>
          <span className="text-[11px] text-[#6B6158] block font-medium">Confirmadas</span>
          <span className="text-xl font-bold font-serif-luxury text-[#231E1B]">
            {kpis.confirmedCount}
          </span>
          <span className="text-[10px] text-[#7A7067] ml-1">de {kpis.totalBookings} citas</span>
        </div>
      </div>

      {/* 2. Pendientes de pago */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#99745A]/15 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#C8933E]/15 text-[#8A5F20] flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-[#C8933E]" />
        </div>
        <div>
          <span className="text-[11px] text-[#8A5F20] block font-medium">Pendientes de Pago</span>
          <span className="text-xl font-bold font-serif-luxury text-[#C8933E]">
            {kpis.pendingPaymentCount}
          </span>
          <span className="text-[10px] text-[#7A7067] ml-1">por cobrar</span>
        </div>
      </div>

      {/* 3. Atendidas */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#99745A]/15 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#42502E]/10 text-[#42502E] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-[#42502E]" />
        </div>
        <div>
          <span className="text-[11px] text-[#6B6158] block font-medium">Atendidas</span>
          <span className="text-xl font-bold font-serif-luxury text-[#42502E]">
            {kpis.completedCount}
          </span>
          <span className="text-[10px] text-[#7A7067] ml-1">completadas</span>
        </div>
      </div>

      {/* 4. Canceladas */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#99745A]/15 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
          <XCircle className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <span className="text-[11px] text-[#6B6158] block font-medium">Canceladas</span>
          <span className="text-xl font-bold font-serif-luxury text-gray-600">
            {kpis.cancelledCount}
          </span>
          <span className="text-[10px] text-[#7A7067] ml-1">horarios libres</span>
        </div>
      </div>

      {/* 5. Anticipos Recibidos */}
      <div className="col-span-2 sm:col-span-1 bg-white p-3.5 rounded-2xl border border-[#99745A]/15 shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#009EE3]/15 text-[#009EE3] flex items-center justify-center shrink-0">
          <CreditCard className="w-5 h-5 text-[#009EE3]" />
        </div>
        <div>
          <span className="text-[11px] text-[#6B6158] block font-medium">Anticipos Recibidos</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold font-serif-luxury text-[#231E1B]">
              ${kpis.totalDepositsReceivedMXN.toLocaleString('es-MX')}
            </span>
            <span className="text-[10px] font-bold text-[#A87428]">MXN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
