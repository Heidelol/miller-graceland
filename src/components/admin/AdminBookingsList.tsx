import React, { useState, useMemo } from 'react';
import { 
  Search, Clock, ChevronRight, 
  Plus, CheckCircle2, AlertCircle, XCircle 
} from 'lucide-react';
import type { AdminBooking, BookingStatus } from '../../types/admin';
import { 
  formatDateDisplay, formatTimeDisplay, 
  calculateBalance 
} from '../../lib/adminBookingLogic';

interface AdminBookingsListProps {
  bookings: AdminBooking[];
  selectedBookingId: string | null;
  onSelectBooking: (booking: AdminBooking) => void;
  onOpenNewBooking: () => void;
}

export const AdminBookingsList: React.FC<AdminBookingsListProps> = ({
  bookings,
  selectedBookingId,
  onSelectBooking,
  onOpenNewBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Status filter
      if (statusFilter !== 'all' && b.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesClient = b.clientName.toLowerCase().includes(q);
        const matchesService = b.serviceName.toLowerCase().includes(q);
        const matchesId = b.id.toLowerCase().includes(q);
        const matchesPhone = b.clientPhone.toLowerCase().includes(q);
        return matchesClient || matchesService || matchesId || matchesPhone;
      }
      return true;
    }).sort((a, b) => {
      // Sort by date desc then time asc
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.time.localeCompare(b.time);
    });
  }, [bookings, searchQuery, statusFilter]);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#68794E]/15 text-[#42502E] border border-[#68794E]/30 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#68794E]" />
            Confirmada
          </span>
        );
      case 'pending_payment':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C8933E]/15 text-[#8A5F20] border border-[#C8933E]/30 whitespace-nowrap">
            <AlertCircle className="w-3.5 h-3.5 text-[#C8933E]" />
            Pendiente Pago
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#42502E]/20 text-[#2C381E] border border-[#42502E]/40 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#42502E]" />
            Atendida
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5 text-gray-400" />
            Cancelada
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#99745A]/20 shadow-xs overflow-hidden flex flex-col">
      {/* Search and Filters Header */}
      <div className="p-4 sm:p-6 border-b border-[#99745A]/15 bg-[#FAF7F2] space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por clienta, servicio, teléfono o código..."
              className="w-full bg-white border border-[#99745A]/25 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#231E1B] placeholder-gray-400 focus:outline-none focus:border-[#C8933E]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenNewBooking}
            className="gold-button px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nueva Reserva</span>
          </button>
        </div>

        {/* Status Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-[#231E1B] text-white'
                : 'bg-white border border-[#99745A]/20 text-[#5C534B] hover:border-[#C8933E]'
            }`}
          >
            Todas ({bookings.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === 'confirmed'
                ? 'bg-[#68794E] text-white'
                : 'bg-white border border-[#99745A]/20 text-[#42502E] hover:border-[#68794E]'
            }`}
          >
            Confirmadas ({bookings.filter((b) => b.status === 'confirmed').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('pending_payment')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === 'pending_payment'
                ? 'bg-[#C8933E] text-[#231E1B]'
                : 'bg-white border border-[#99745A]/20 text-[#8A5F20] hover:border-[#C8933E]'
            }`}
          >
            Pendientes ({bookings.filter((b) => b.status === 'pending_payment').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === 'completed'
                ? 'bg-[#42502E] text-white'
                : 'bg-white border border-[#99745A]/20 text-[#42502E] hover:border-[#42502E]'
            }`}
          >
            Atendidas ({bookings.filter((b) => b.status === 'completed').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === 'cancelled'
                ? 'bg-gray-600 text-white'
                : 'bg-white border border-[#99745A]/20 text-gray-500 hover:border-gray-400'
            }`}
          >
            Canceladas ({bookings.filter((b) => b.status === 'cancelled').length})
          </button>
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="overflow-x-auto">
        {filteredBookings.length > 0 ? (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#99745A]/15 bg-[#FAF7F2]/60 text-[#6B6158] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Clienta</th>
                <th className="py-3 px-4">Servicio</th>
                <th className="py-3 px-4">Fecha y Horario</th>
                <th className="py-3 px-4 text-right">Anticipo</th>
                <th className="py-3 px-4 text-right">Precio Final</th>
                <th className="py-3 px-4 text-right">Saldo</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#99745A]/10">
              {filteredBookings.map((b) => {
                const isSelected = selectedBookingId === b.id;
                const { balanceMXN, isPending } = calculateBalance(b.finalPriceMXN, b.receivedDepositMXN);

                return (
                  <tr
                    key={b.id}
                    onClick={() => onSelectBooking(b)}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF9EE]'
                        : 'hover:bg-[#FAF7F2]/80 bg-white'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#A87428]">
                      {b.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#231E1B]">{b.clientName}</div>
                      <div className="text-[11px] text-[#7A7067]">{b.clientPhone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#231E1B]">{b.serviceName}</div>
                      <div className="text-[11px] text-[#68794E] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {b.durationMinutes} min
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-[#231E1B] capitalize">
                        {formatDateDisplay(b.date, { short: true })}
                      </div>
                      <div className="text-[11px] text-[#5C534B]">
                        {formatTimeDisplay(b.time)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-medium text-[#68794E] whitespace-nowrap">
                      ${b.receivedDepositMXN.toLocaleString('es-MX')} MXN
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {b.finalPriceMXN !== null ? (
                        <span className="font-bold text-[#231E1B]">
                          ${b.finalPriceMXN.toLocaleString('es-MX')} MXN
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Por confirmar</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {!isPending && balanceMXN !== null ? (
                        <span className="font-bold text-[#A87428]">
                          ${balanceMXN.toLocaleString('es-MX')} MXN
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Por confirmar</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(b.status)}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBooking(b);
                        }}
                        className="p-1 rounded-lg hover:bg-black/5 text-[#A87428] cursor-pointer"
                        title="Ver detalle de la reserva"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-xs text-[#6B6158]">
            <p className="font-bold text-sm text-[#231E1B]">No se encontraron reservas</p>
            <p className="mt-1">
              Prueba cambiando los términos de búsqueda o el filtro de estado seleccionado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
