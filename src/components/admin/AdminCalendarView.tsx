import React from 'react';
import { 
  ChevronLeft, ChevronRight, Clock,
  Calendar, CheckCircle2, AlertCircle, XCircle,
  Plus, ChevronDown
} from 'lucide-react';
import type { AdminBooking, AgendaViewMode } from '../../types/admin';
import { 
  formatDateDisplay, formatTimeDisplay, 
  calculateEndTime, getWeekDays, addDaysToDate,
  getTodayLocalDate, getBookingStatusLabel 
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

  // Status helper badges with visible text and icons
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
        return (
          <span className="text-xs text-gray-500 font-medium">
            {getBookingStatusLabel(status)}
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

  // Calculate free slots count
  const freeSlotsCount = operationalHours.filter((slot) => {
    const [slotH, slotM] = slot.split(':').map(Number);
    const slotMinutes = slotH * 60 + (slotM || 0);
    return !activeDayBookings.some((b) => {
      const [bH, bM] = b.time.split(':').map(Number);
      const bStart = bH * 60 + (bM || 0);
      const bEnd = bStart + b.durationMinutes;
      return slotMinutes >= bStart && slotMinutes < bEnd;
    });
  }).length;

  return (
    <div className="bg-white rounded-xl border border-[#99745A]/20 shadow-2xs overflow-hidden flex flex-col">
      {/* Calendar Header: Navigation & View Mode */}
      <div className="p-3.5 sm:p-4 border-b border-[#99745A]/15 bg-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Date Navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleToday}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isSelectedToday
                ? 'bg-[#C8933E] text-[#231E1B] shadow-2xs'
                : 'bg-white border border-[#99745A]/25 text-[#5C534B] hover:border-[#C8933E]'
            }`}
          >
            Hoy
          </button>

          <div className="flex items-center bg-white border border-[#99745A]/25 rounded-lg overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 hover:bg-black/5 text-[#5C534B] hover:text-[#231E1B] transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="h-3.5 w-px bg-[#99745A]/20" />
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 hover:bg-black/5 text-[#5C534B] hover:text-[#231E1B] transition-colors cursor-pointer"
              aria-label="Siguiente"
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
              className="text-xs font-bold text-[#231E1B] bg-white border border-[#99745A]/20 rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-[#C8933E]"
              title="Cambiar fecha del calendario"
            />
            <span className="text-xs font-bold text-[#231E1B] hidden md:inline capitalize">
              {formatDateDisplay(selectedDate)}
            </span>
          </div>
        </div>

        {/* View Mode Toggle: Día / Semana & Capacity label */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-[11px] text-[#68794E] font-medium hidden lg:inline">
            Capacidad: 1 servicio simultáneo
          </span>

          <div className="inline-flex p-0.5 bg-[#F2EDE4] rounded-lg border border-[#99745A]/15 text-xs">
            <button
              type="button"
              onClick={() => onViewModeChange('day')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'day'
                  ? 'bg-white text-[#231E1B] shadow-2xs'
                  : 'text-[#6B6158] hover:text-[#231E1B]'
              }`}
            >
              Día
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('week')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'week'
                  ? 'bg-white text-[#231E1B] shadow-2xs'
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
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Day overview header bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#99745A]/15 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#231E1B]">
                {activeDayBookings.length} {activeDayBookings.length === 1 ? 'cita programada' : 'citas programadas'}
              </span>
              {cancelledDayBookings.length > 0 && (
                <span className="text-[11px] text-[#7A7067]">
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
              <span>Agendar en esta fecha</span>
            </button>
          </div>

          {/* Listado limpio de filas de citas */}
          {activeDayBookings.length > 0 ? (
            <div className="border border-[#99745A]/15 rounded-xl bg-white overflow-hidden divide-y divide-[#99745A]/10">
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
                    className={`px-4 py-3.5 flex items-center justify-between gap-3 sm:gap-4 transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#FAF6F0] border-l-4 border-l-[#C8933E]'
                        : 'hover:bg-[#FAF7F2] border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* Horario y Duración */}
                    <div className="w-28 sm:w-36 shrink-0">
                      <div className="font-mono text-xs font-bold text-[#231E1B]">
                        {formatTimeDisplay(b.time)} – {formatTimeDisplay(endTime)}
                      </div>
                      <div className="text-[11px] text-[#7A7067]">
                        {b.durationMinutes} min
                      </div>
                    </div>

                    {/* Clienta y Servicio */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#231E1B] truncate">
                        {b.clientName}
                      </div>
                      <div className="text-xs text-[#5C534B] truncate">
                        {b.serviceName}
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="shrink-0 text-right">
                      {getStatusBadge(b.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-[#FAF7F2]/60 border border-dashed border-[#99745A]/25 text-center">
              <Calendar className="w-9 h-9 text-[#C8933E]/60 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#231E1B]">No hay citas activas para esta fecha</p>
              <p className="text-xs text-[#6B6158] mt-1 max-w-sm mx-auto">
                El salón tiene disponibilidad completa en este día.
              </p>
              <button
                type="button"
                onClick={() => onOpenNewBookingWithSlot(selectedDate, '11:00')}
                className="gold-button inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold mt-3 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Crear cita en este día</span>
              </button>
            </div>
          )}

          {/* Desplegable: Ver horarios disponibles */}
          <details className="group border border-[#99745A]/15 rounded-xl bg-[#FAF7F2]/40 overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#4A423B] cursor-pointer hover:bg-[#FAF7F2] transition-colors select-none">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#68794E]" />
                <span>Ver horarios disponibles ({freeSlotsCount} {freeSlotsCount === 1 ? 'libre' : 'libres'})</span>
              </span>
              <span className="text-[11px] text-[#A87428] font-medium flex items-center gap-1">
                <span className="group-open:hidden">Consultar</span>
                <span className="hidden group-open:inline">Ocultar</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 text-[#7A7067]" />
              </span>
            </summary>
            
            <div className="p-4 pt-3 border-t border-[#99745A]/10 bg-white">
              <p className="text-[11px] text-[#7A7067] mb-2.5">
                Horarios de referencia para {selectedDate}. Selecciona un espacio libre para agendar:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {operationalHours.map((slot) => {
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
                        className="p-2 rounded-lg border border-[#99745A]/20 bg-[#FAF7F2] text-xs font-medium text-[#736A60] flex items-center justify-between opacity-75"
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
                      className="p-2 rounded-lg border border-dashed border-[#68794E]/40 hover:border-[#68794E] bg-white hover:bg-[#68794E]/5 text-xs font-medium text-[#3D472D] flex items-center justify-between transition-colors cursor-pointer group"
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
          </details>

          {/* Citas canceladas */}
          {cancelledDayBookings.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Citas canceladas (horarios liberados):
              </p>
              <div className="space-y-1.5 opacity-80">
                {cancelledDayBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBooking(b)}
                    className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between text-xs cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-400 font-bold">{b.id}</span>
                      <span className="line-through text-gray-600 font-semibold">{b.clientName}</span>
                      <span className="text-gray-400">({b.serviceName})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{formatTimeDisplay(b.time)}</span>
                      {getStatusBadge(b.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* VISTA SEMANA */}
      {/* ======================================================== */}
      {viewMode === 'week' && (
        <div className="p-3 sm:p-5 overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 min-w-[700px]">
            {weekDays.map((day) => {
              const dayItems = bookings
                .filter((b) => b.date === day.dateStr && b.status !== 'cancelled')
                .sort((a, b) => a.time.localeCompare(b.time));

              const isCurrentSelected = day.dateStr === selectedDate;

              return (
                <div
                  key={day.dateStr}
                  className={`rounded-xl border flex flex-col min-h-[340px] overflow-hidden transition-all ${
                    isCurrentSelected
                      ? 'border-[#C8933E] bg-[#FFFDF9] shadow-2xs'
                      : day.isSunday
                      ? 'border-gray-200 bg-gray-50/50'
                      : 'border-[#99745A]/15 bg-white'
                  }`}
                >
                  {/* Cabecera del día */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onDateChange(day.dateStr)}
                    className={`p-2 text-center border-b transition-colors cursor-pointer ${
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
                    <span className="text-base font-bold font-mono leading-tight block">
                      {day.dayNumber}
                    </span>
                    <span className="text-[9px] block opacity-80 uppercase">
                      {day.monthName}
                    </span>
                  </div>

                  {/* Citas de este día */}
                  <div className="p-2 flex-1 space-y-1.5 overflow-y-auto max-h-[280px]">
                    {dayItems.length > 0 ? (
                      dayItems.map((b) => {
                        const isSelected = selectedBookingId === b.id;
                        return (
                          <div
                            key={b.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelectBooking(b)}
                            className={`p-2 rounded-lg text-left border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FAF6F0] border-[#C8933E] shadow-2xs'
                                : 'bg-[#FAF7F2] border-[#99745A]/15 hover:border-[#C8933E]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold mb-0.5">
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

                  {/* Botón rápido para agendar */}
                  <div className="p-1.5 border-t border-[#99745A]/10 bg-gray-50/50">
                    <button
                      type="button"
                      onClick={() => onOpenNewBookingWithSlot(day.dateStr, '11:00')}
                      className="w-full py-1 rounded text-[10px] font-bold text-[#68794E] hover:bg-[#68794E]/10 transition-colors flex items-center justify-center gap-0.5 cursor-pointer"
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
