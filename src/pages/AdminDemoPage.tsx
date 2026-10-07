import React, { useState } from 'react';
import type { AdminBooking, AdminTab, AgendaViewMode } from '../types/admin';
import { 
  loadBookingsFromStorage, saveBookingsToStorage, 
  resetStorageToSeed 
} from '../lib/adminStorage';
import { 
  calculateAdminKPIs, getTodayLocalDate 
} from '../lib/adminBookingLogic';

import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminKPIs } from '../components/admin/AdminKPIs';
import { AdminCalendarView } from '../components/admin/AdminCalendarView';
import { AdminBookingDetail } from '../components/admin/AdminBookingDetail';
import { AdminBookingsList } from '../components/admin/AdminBookingsList';
import { AdminNewBookingModal } from '../components/admin/AdminNewBookingModal';
import { AdminRescheduleModal } from '../components/admin/AdminRescheduleModal';
import { AdminFinalPriceModal } from '../components/admin/AdminFinalPriceModal';
import { AdminConfirmDialog } from '../components/admin/AdminConfirmDialog';

export const AdminDemoPage: React.FC = () => {
  // Lazy initial load from localStorage
  const [initialData] = useState(() => loadBookingsFromStorage());
  const [bookings, setBookings] = useState<AdminBooking[]>(initialData.bookings);
  const [storageError, setStorageError] = useState<string | null>(initialData.error || null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<AdminTab>('agenda');
  const [agendaViewMode, setAgendaViewMode] = useState<AgendaViewMode>('day');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayLocalDate());
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    initialData.bookings.length > 0 ? initialData.bookings[0].id : null
  );

  // Mobile detail drawer/modal state
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // Modal dialog states
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [newBookingSlot, setNewBookingSlot] = useState<{ date: string; time: string } | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<AdminBooking | null>(null);
  const [finalPriceTarget, setFinalPriceTarget] = useState<AdminBooking | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'cancel_booking' | 'reset_seed';
    booking?: AdminBooking;
  }>({ isOpen: false, type: 'cancel_booking' });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Synchronize state and persist
  const updateAndPersistBookings = (updated: AdminBooking[], successMsg?: string) => {
    setBookings(updated);
    const saveResult = saveBookingsToStorage(updated);
    if (!saveResult.success && saveResult.error) {
      setStorageError(saveResult.error);
    } else {
      setStorageError(null);
      if (successMsg) showToast(successMsg);
    }
  };

  // Selected booking object
  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || null;

  // KPIs
  const kpis = calculateAdminKPIs(bookings);

  // Actions
  const handleSelectBooking = (booking: AdminBooking) => {
    setSelectedBookingId(booking.id);
    // If mobile screen, open detail modal
    if (window.innerWidth < 1024) {
      setIsMobileDetailOpen(true);
    }
  };

  const handleCreateBooking = (newBooking: AdminBooking) => {
    const updated = [newBooking, ...bookings];
    updateAndPersistBookings(updated, `Reserva ${newBooking.id} creada para ${newBooking.clientName}.`);
    setSelectedBookingId(newBooking.id);
    setSelectedDate(newBooking.date);
  };

  const handleOpenNewWithSlot = (date: string, time: string) => {
    setNewBookingSlot({ date, time });
    setIsNewBookingOpen(true);
  };

  const handleConfirmReschedule = (bookingId: string, newDate: string, newTime: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, date: newDate, time: newTime } : b
    );
    updateAndPersistBookings(updated, `Cita ${bookingId} reprogramada al ${newDate} a las ${newTime}.`);
    setSelectedDate(newDate);
  };

  const handleSaveFinalPrice = (bookingId: string, finalPriceMXN: number | null) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, finalPriceMXN } : b
    );
    const msg = finalPriceMXN !== null
      ? `Precio final registrado: $${finalPriceMXN.toLocaleString('es-MX')} MXN.`
      : `Precio final marcado como "Por confirmar".`;
    updateAndPersistBookings(updated, msg);
  };

  const handleMarkAsCompleted = (booking: AdminBooking) => {
    const updated = bookings.map((b) =>
      b.id === booking.id ? { ...b, status: 'completed' as const } : b
    );
    updateAndPersistBookings(updated, `Cita de ${booking.clientName} marcada como Atendida.`);
  };

  const handleConfirmCancel = () => {
    if (!confirmDialog.booking) return;
    const targetId = confirmDialog.booking.id;
    const updated = bookings.map((b) =>
      b.id === targetId ? { ...b, status: 'cancelled' as const } : b
    );
    updateAndPersistBookings(updated, `Cita ${targetId} cancelada. Horario liberado.`);
  };

  const handleConfirmReset = () => {
    const { bookings: resetBookings, result } = resetStorageToSeed();
    setBookings(resetBookings);
    if (resetBookings.length > 0) {
      setSelectedBookingId(resetBookings[0].id);
      setSelectedDate(resetBookings[0].date);
    }
    if (result.success) {
      showToast('Se restablecieron las 7 reservas de ejemplo iniciales.');
      setStorageError(null);
    } else if (result.error) {
      setStorageError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#231E1B] flex flex-col selection:bg-[#C8933E]/20">
      
      {/* Admin Header */}
      <AdminHeader
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsMobileDetailOpen(false);
        }}
        onOpenNewBooking={() => {
          setNewBookingSlot(null);
          setIsNewBookingOpen(true);
        }}
        onOpenResetConfirm={() => {
          setConfirmDialog({ isOpen: true, type: 'reset_seed' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Storage Error Warning */}
        {storageError && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-xs">
            <div>
              <strong className="font-bold">Aviso de almacenamiento: </strong>
              <span>{storageError}</span>
            </div>
            <button
              type="button"
              onClick={() => setStorageError(null)}
              className="text-xs font-bold underline hover:no-underline cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Dynamic KPIs */}
        <AdminKPIs kpis={kpis} />

        {/* TAB 1: AGENDA VIEW */}
        {currentTab === 'agenda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Calendar Grid */}
            <div className="lg:col-span-7 xl:col-span-8">
              <AdminCalendarView
                bookings={bookings}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                viewMode={agendaViewMode}
                onViewModeChange={setAgendaViewMode}
                selectedBookingId={selectedBookingId}
                onSelectBooking={handleSelectBooking}
                onOpenNewBookingWithSlot={handleOpenNewWithSlot}
              />
            </div>

            {/* Right Column: Desktop Booking Detail */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-24">
              <AdminBookingDetail
                booking={selectedBooking}
                onOpenReschedule={(b) => setRescheduleTarget(b)}
                onOpenCancel={(b) => setConfirmDialog({ isOpen: true, type: 'cancel_booking', booking: b })}
                onMarkAsCompleted={handleMarkAsCompleted}
                onOpenFinalPrice={(b) => setFinalPriceTarget(b)}
              />
            </div>
          </div>
        )}

        {/* TAB 2: RESERVAS TABLE/LIST VIEW */}
        {currentTab === 'bookings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <AdminBookingsList
                bookings={bookings}
                selectedBookingId={selectedBookingId}
                onSelectBooking={handleSelectBooking}
                onOpenNewBooking={() => {
                  setNewBookingSlot(null);
                  setIsNewBookingOpen(true);
                }}
              />
            </div>

            <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-24">
              <AdminBookingDetail
                booking={selectedBooking}
                onOpenReschedule={(b) => setRescheduleTarget(b)}
                onOpenCancel={(b) => setConfirmDialog({ isOpen: true, type: 'cancel_booking', booking: b })}
                onMarkAsCompleted={handleMarkAsCompleted}
                onOpenFinalPrice={(b) => setFinalPriceTarget(b)}
              />
            </div>
          </div>
        )}

      </main>

      {/* Mobile Detail Modal / Dialog */}
      {isMobileDetailOpen && selectedBooking && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-4">
            <AdminBookingDetail
              booking={selectedBooking}
              onClose={() => setIsMobileDetailOpen(false)}
              onOpenReschedule={(b) => {
                setIsMobileDetailOpen(false);
                setRescheduleTarget(b);
              }}
              onOpenCancel={(b) => {
                setIsMobileDetailOpen(false);
                setConfirmDialog({ isOpen: true, type: 'cancel_booking', booking: b });
              }}
              onMarkAsCompleted={(b) => {
                handleMarkAsCompleted(b);
                setIsMobileDetailOpen(false);
              }}
              onOpenFinalPrice={(b) => {
                setIsMobileDetailOpen(false);
                setFinalPriceTarget(b);
              }}
            />
          </div>
        </div>
      )}

      {/* New Booking Modal */}
      <AdminNewBookingModal
        key={`new-${newBookingSlot?.date || selectedDate}-${newBookingSlot?.time || '11:00'}`}
        isOpen={isNewBookingOpen}
        onClose={() => {
          setIsNewBookingOpen(false);
          setNewBookingSlot(null);
        }}
        bookings={bookings}
        initialDate={newBookingSlot?.date || selectedDate}
        initialTime={newBookingSlot?.time || '11:00'}
        onSave={handleCreateBooking}
      />

      {/* Reschedule Modal */}
      <AdminRescheduleModal
        key={rescheduleTarget ? `${rescheduleTarget.id}-${rescheduleTarget.date}-${rescheduleTarget.time}` : 'no-reschedule'}
        isOpen={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        booking={rescheduleTarget}
        bookings={bookings}
        onConfirmReschedule={handleConfirmReschedule}
      />

      {/* Final Price Modal */}
      <AdminFinalPriceModal
        key={finalPriceTarget ? `${finalPriceTarget.id}-${finalPriceTarget.finalPriceMXN}` : 'no-final-price'}
        isOpen={!!finalPriceTarget}
        onClose={() => setFinalPriceTarget(null)}
        booking={finalPriceTarget}
        onSaveFinalPrice={handleSaveFinalPrice}
      />

      {/* Confirmation Dialog (Cancel / Reset) */}
      <AdminConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.type === 'cancel_booking' ? handleConfirmCancel : handleConfirmReset}
        type={confirmDialog.type}
        itemTitle={confirmDialog.booking?.clientName}
      />

      {/* Action Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#231E1B] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold border border-[#C8933E]/50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#68794E]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
