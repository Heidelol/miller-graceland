import React from 'react';
import { 
  ChevronLeft, ChevronRight, Clock, User, 
  Calendar, CheckCircle2, AlertCircle, XCircle,
  Plus
} from 'lucide-react';
import type { AdminBooking, AgendaViewMode } from '../../types/admin';
import { 
  formatDateDisplay, formatTimeDisplay, 
  calculateEndTime, getWeekDays, addDaysToDate,
  getTodayLocalDate 
} from '../../lib/adminBookingLogic';

interface AdminCalendarViewProps {
  bookings: AdminBooking[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  viewMode: AgendaViewMode;
  onViewModeChange: (mode: AgendaViewMode) => void;
  selectedBookingId: string | null;
  onSelectBooking: (booking: AdminBooking) => void;
  onOpenNewBookingWithSlot: (date: string, time: string) => void;
}

export const AdminCalendarView: React.FC<AdminCalendarViewProps> = ({
  bookings,
  selectedDate,
  onDateChange,
  viewMode,
  onViewModeChange,
  selectedBookingId,
  onSelectBooking,
  onOpenNewBookingWithSlot,
}) => {
  const todayStr = getTodayLocalDate();
  const isSelectedToday = selectedDate === todayStr;

  const handlePrev = () => {
    const daysToShift = viewMode === 'week' ? -7 : -1;
    onDateChange(addDaysToDate(selectedDate, daysToShift));
  };

  const handleNext = () => {
    const daysToShift = viewMode === 'week' ? 7 : 1;
    onDateChange(addDaysToDate(selectedDate, daysToShift));
  };

  const handleToday = () => {
    onDateChange(todayStr);
  };

  // Filter bookings for the selected date (for Day view)
  const dayBookings = bookings
    .filter((b) => b.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Active (non-cancelled) bookings for day view
  const activeDayBookings = dayBookings.filter((b) => b.status !== 'cancelled');
  const cancelledDayBookings = dayBookings.filter((b) => b.status === 'cancelled');

  // Week days for Week view
  const weekDays = getWeekDays(selectedDate);

  // Status helper colors
  const getStatusBadge = (status: AdminBooking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#68794E]/15 text-[#42502E] border border-[#68794E]/30">
            <CheckCircle2 className="w-3 h-3 text-[#68794E]" />
            Confirmada
          </span>
        );
      case 'pending_payment':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C8933E]/15 text-[#8A5F20] border border-[#C8933E]/30">
            <AlertCircle className="w-3 h-3 text-[#C8933E]" />
            Pendiente Pago
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#42502E]/20 text-[#2C381E] border border-[#42502E]/40">
            <CheckCircle2 className="w-3 h-3 text-[#42502E]" />
            Atendida
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
            <XCircle className="w-3 h-3 text-gray-400" />
            Cancelada
          </span>
        );
    }
  };

  // Operational hours for the day view grid
  const operationalHours = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', 
    '17:00', '18:00', '19:00'
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#99745A]/20 shadow-xs overflow-hidden flex flex-col">
      {/* Calendar Header: Navigation & View Mode */}
      <div className="p-4 sm:p-5 border-b border-[#99745A]/15 bg-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Date Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToday}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isSelectedToday
                ? 'bg-[#C8933E] text-[#231E1B] shadow-xs'
                : 'bg-white border border-[#99745A]/25 text-[#5C534B] hover:border-[#C8933E]'
            }`}
          >
            Hoy
          </button>

          <div className="flex items-center bg-white border border-[#99745A]/25 rounded-xl overflow-hidden shadow-xs">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 hover:bg-black/5 text-[#5C534B] hover:text-[#231E1B] transition-colors cursor-pointer"
              aria-label="Día o semana anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-[#99745A]/20" />
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 hover:bg-black/5 text-[#5C534B] hover:text-[#231E1B] transition-colors cursor-pointer"
              aria-label="Día o semana siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Current Date Display */}
          <div className="flex items-center gap-2 ml-1">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => e.target.value && onDateChange(e.target.value)}
              className="text-xs font-bold text-[#231E1B] bg-white border border-[#99745A]/20 rounded-xl px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-[#C8933E]"
              title="Cambiar fecha del calendario"
            />
            <span className="text-xs font-bold font-serif-luxury text-[#231E1B] hidden md:inline capitalize">
              {formatDateDisplay(selectedDate)}
            </span>
          </div>
        </div>

        {/* View Mode Toggle: Día / Semana & Capacity badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[10px] text-[#68794E] font-bold px-2.5 py-1 rounded-full bg-[#68794E]/10 border border-[#68794E]/20 hidden lg:inline">
            Capacidad demo: 1 servicio simultáneo
          </span>

          <div className="inline-flex p-1 bg-[#F5EFE6] rounded-xl border border-[#99745A]/20 text-xs">
            <button
              type="button"
              onClick={() => onViewModeChange('day')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'day'
                  ? 'bg-white text-[#231E1B] shadow-xs'
                  : 'text-[#6B6158] hover:text-[#231E1B]'
              }`}
            >
              Día
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('week')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'week'
                  ? 'bg-white text-[#231E1B] shadow-xs'
                  : 'text-[#6B6158] hover:text-[#231E1B]'
              }`}
            >
              Semana
            </button>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* VISTA DÍA */}
      {/* ======================================================== */}
      {viewMode === 'day' && (
        <div className="p-4 sm:p-6 space-y-4">
          
          {/* Day overview summary */}
          <div className="flex items-center justify-between pb-3 border-b border-[#99745A]/15 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#231E1B]">
                {activeDayBookings.length} {activeDayBookings.length === 1 ? 'cita programada' : 'citas programadas'}
              </span>
              {cancelledDayBookings.length > 0 && (
                <span className="text-[11px] text-gray-500">
                  ({cancelledDayBookings.length} cancelada)
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onOpenNewBookingWithSlot(selectedDate, '11:00')}
              className="text-xs text-[#A87428] hover:text-[#8A5F20] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agendar para esta fecha</span>
            </button>
          </div>

          {/* Scheduled Appointments Cards */}
          {activeDayBookings.length > 0 ? (
            <div className="space-y-3">
              {activeDayBookings.map((b) => {
                const isSelected = selectedBookingId === b.id;
                const endTime = calculateEndTime(b.time, b.durationMinutes);
                return (
                  <div
                    key={b.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectBooking(b)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectBooking(b);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden focus-visible:outline-2 focus-visible:outline-[#231E1B] ${
                      isSelected
                        ? 'bg-[#FFF9EE] border-[#C8933E] shadow-md ring-1 ring-[#C8933E]'
                        : 'bg-[#FAF7F2] border-[#99745A]/20 hover:border-[#C8933E]/60 hover:bg-[#FFFDF9]'
                    }`}
                  >
                    {/* Left Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        b.status === 'confirmed'
                          ? 'bg-[#68794E]'
                          : b.status === 'pending_payment'
                          ? 'bg-[#C8933E]'
                          : 'bg-[#42502E]'
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono text-xs font-black text-[#A87428]">
                            {b.id}
                          </span>
                          {getStatusBadge(b.status)}
                          <span className="text-xs font-bold text-[#231E1B] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#68794E]" />
                            {formatTimeDisplay(b.time)} – {formatTimeDisplay(endTime)}
                          </span>
                          <span className="text-[11px] text-[#6B6158]">
                            ({b.durationMinutes} min)
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-[#231E1B] flex items-center gap-2">
                          <User className="w-4 h-4 text-[#8C8278]" />
                          <span>{b.clientName}</span>
                        </h4>

                        <p className="text-xs text-[#554C44] mt-0.5">
                          {b.serviceName}
                        </p>
                      </div>

                      {/* Right summary pill */}
                      <div className="text-right sm:border-l sm:border-[#99745A]/15 sm:pl-4 shrink-0">
                        <span className="text-[11px] text-[#7A7067] block">Anticipo</span>
                        <span className="text-xs font-black text-[#231E1B]">
                          ${b.receivedDepositMXN.toLocaleString('es-MX')} MXN
                        </span>
                        <span className="text-[10px] text-[#68794E] font-medium block">
                          {b.finalPriceMXN !== null
                            ? `Saldo: $${Math.max(0, b.finalPriceMXN - b.receivedDepositMXN).toLocaleString('es-MX')}`
                            : 'Saldo: Por confirmar'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#F9F6F0] border border-dashed border-[#99745A]/25 text-center">
              <Calendar className="w-10 h-10 text-[#C8933E]/60 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#231E1B]">No hay citas activas para esta fecha</p>
              <p className="text-xs text-[#6B6158] mt-1 max-w-sm mx-auto">
                El salón tiene disponibilidad completa en este día. Puedes crear una reserva de prueba con el botón inferior.
              </p>
              <button
                type="button"
                onClick={() => onOpenNewBookingWithSlot(selectedDate, '11:00')}
                className="gold-button inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider mt-4 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Crear reserva en este día</span>
              </button>
            </div>
          )}

          {/* Cancelled Bookings Accordion/Note */}
          {cancelledDayBookings.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Citas canceladas (horarios liberados):
              </p>
              <div className="space-y-2 opacity-75">
                {cancelledDayBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBooking(b)}
                    className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-400 font-bold">{b.id}</span>
                      <span className="line-through text-gray-600 font-semibold">{b.clientName}</span>
                      <span className="text-gray-400">({b.serviceName})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{formatTimeDisplay(b.time)}</span>
                      {getStatusBadge(b.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Slot Availability Grid */}
          <div className="pt-4 border-t border-[#99745A]/15">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#68794E] mb-3">
              Franjas horarias operativas ({selectedDate}):
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {operationalHours.map((slot) => {
                // Check if an active booking covers this slot
                const isOccupied = activeDayBookings.some((b) => {
                  const [slotH, slotM] = slot.split(':').map(Number);
                  const slotMinutes = slotH * 60 + (slotM || 0);
                  const [bH, bM] = b.time.split(':').map(Number);
                  const bStart = bH * 60 + (bM || 0);
                  const bEnd = bStart + b.durationMinutes;
                  return slotMinutes >= bStart && slotMinutes < bEnd;
                });

                if (isOccupied) {
                  return (
                    <div
                      key={slot}
                      className="p-2.5 rounded-xl border border-[#99745A]/25 bg-[#FAF7F2] text-xs font-medium text-[#736A60] flex items-center justify-between opacity-80"
                    >
                      <span className="font-mono font-bold text-[#231E1B]">{formatTimeDisplay(slot)}</span>
                      <span className="text-[10px] text-[#A87428] font-bold">Ocupado</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => onOpenNewBookingWithSlot(selectedDate, slot)}
                    className="p-2.5 rounded-xl border border-dashed border-[#68794E]/40 hover:border-[#68794E] bg-white hover:bg-[#68794E]/5 text-xs font-medium text-[#3D472D] flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <span className="font-mono font-bold">{formatTimeDisplay(slot)}</span>
                    <span className="text-[10px] text-[#68794E] group-hover:underline flex items-center gap-0.5 font-bold">
                      <Plus className="w-3 h-3" />
                      Libre
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* VISTA SEMANA */}
      {/* ======================================================== */}
      {viewMode === 'week' && (
        <div className="p-4 sm:p-6 overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 min-w-[720px]">
            {weekDays.map((day) => {
              const dayItems = bookings
                .filter((b) => b.date === day.dateStr && b.status !== 'cancelled')
                .sort((a, b) => a.time.localeCompare(b.time));

              const isCurrentSelected = day.dateStr === selectedDate;

              return (
                <div
                  key={day.dateStr}
                  className={`rounded-2xl border flex flex-col min-h-[360px] overflow-hidden transition-all ${
                    isCurrentSelected
                      ? 'border-[#C8933E] bg-[#FFFDF9] shadow-xs'
                      : day.isSunday
                      ? 'border-gray-200 bg-gray-50/50'
                      : 'border-[#99745A]/15 bg-white'
                  }`}
                >
                  {/* Day Column Header */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onDateChange(day.dateStr)}
                    className={`p-2.5 text-center border-b transition-colors cursor-pointer ${
                      day.isToday
                        ? 'bg-[#C8933E] text-[#231E1B] border-[#C8933E]'
                        : isCurrentSelected
                        ? 'bg-[#FFF9EE] border-[#C8933E]/40 text-[#231E1B]'
                        : 'bg-[#FAF7F2] border-[#99745A]/10 text-[#5C534B] hover:bg-[#F2EDE3]'
                    }`}
                  >
                    <span className="text-[10px] block uppercase font-bold tracking-wider">
                      {day.dayName}
                    </span>
                    <span className="text-base font-black font-serif-luxury leading-tight block">
                      {day.dayNumber}
                    </span>
                    <span className="text-[9px] block opacity-80 uppercase">
                      {day.monthName}
                    </span>
                  </div>

                  {/* Bookings within this day */}
                  <div className="p-2 flex-1 space-y-2 overflow-y-auto max-h-[300px]">
                    {dayItems.length > 0 ? (
                      dayItems.map((b) => {
                        const isSelected = selectedBookingId === b.id;
                        return (
                          <div
                            key={b.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelectBooking(b)}
                            className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FFF9EE] border-[#C8933E] shadow-xs'
                                : 'bg-[#FAF7F2] border-[#99745A]/20 hover:border-[#C8933E]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                              <span className="text-[#A87428] font-mono">{formatTimeDisplay(b.time)}</span>
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  b.status === 'confirmed'
                                    ? 'bg-[#68794E]'
                                    : b.status === 'pending_payment'
                                    ? 'bg-[#C8933E]'
                                    : 'bg-[#42502E]'
                                }`}
                                title={b.status}
                              />
                            </div>
                            <p className="font-bold text-[#231E1B] truncate text-[11px]">
                              {b.clientName}
                            </p>
                            <p className="text-[10px] text-[#6B6158] truncate">
                              {b.serviceName}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-full flex items-center justify-center p-2 text-center">
                        <span className="text-[10px] text-gray-400 italic">
                          {day.isSunday ? 'Previa cita' : 'Sin citas'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Add button at bottom of day column */}
                  <div className="p-1.5 border-t border-[#99745A]/10 bg-gray-50/50">
                    <button
                      type="button"
                      onClick={() => onOpenNewBookingWithSlot(day.dateStr, '11:00')}
                      className="w-full py-1 rounded-lg text-[10px] font-bold text-[#68794E] hover:bg-[#68794E]/10 transition-colors flex items-center justify-center gap-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
