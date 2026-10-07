import { useState } from 'react';
import { 
  X, Clock, User, CheckCircle2, 
  Sparkles, ShieldCheck, CreditCard, ChevronRight, 
  Phone, Mail, ArrowLeft, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, STYLISTS, SALON_INFO } from '../data/salonData';
import type { ServiceItem, Stylist } from '../types/salon';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
}

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 10; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    // Skip Sundays if closed
    const isSunday = nextDate.getDay() === 0;
    dates.push({
      fullDate: nextDate.toISOString().split('T')[0],
      dayName: nextDate.toLocaleDateString('es-MX', { weekday: 'short' }),
      dayNumber: nextDate.getDate(),
      monthName: nextDate.toLocaleDateString('es-MX', { month: 'short' }),
      available: !isSunday,
    });
  }
  return dates;
};

const DATES_LIST = generateDates();

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    initialService || SERVICES[0]
  );
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  
  const datesList = DATES_LIST;
  const [selectedDate, setSelectedDate] = useState<string>(datesList[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');

  // Customer contact info
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Payment configuration
  const [paymentOption, setPaymentOption] = useState<'deposit' | 'full'>('deposit');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Step tracker (1: Servicio/Estilista, 2: Fecha/Hora, 3: Datos, 4: Mercado Pago, 5: Exito)
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM', '11:00 AM', '12:30 PM', 
    '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'
  ];

  const amountToPay = paymentOption === 'deposit' 
    ? selectedService.depositMXN 
    : selectedService.priceMXN;

  const handleNextStep = () => {
    if (currentStep === 3) {
      if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
        alert('Por favor completa tu nombre, correo y teléfono.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleProcessMercadoPago = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const code = `MG-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingCode(code);
      setIsProcessingPayment(false);
      setBookingCompleted(true);
      setCurrentStep(5);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF1D0', '#E6C875', '#009EE3']
        });
      } catch (e) {
        console.error(e);
      }
    }, 1800);
  };

  const handleResetAndClose = () => {
    setBookingCompleted(false);
    setCurrentStep(1);
    onClose();
  };

  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `¡Hola Miller Graceland! Acabo de agendar una cita por la página web:\n\n` +
      `📋 Código: ${bookingCode}\n` +
      `✨ Servicio: ${selectedService.name}\n` +
      `👤 Estilista: ${selectedStylist ? selectedStylist.name : 'Primer disponible'}\n` +
      `📅 Fecha: ${selectedDate} a las ${selectedTime}\n` +
      `💳 Pago realizado con Mercado Pago: $${amountToPay} MXN (${paymentOption === 'deposit' ? 'Anticipo' : 'Total'})\n` +
      `🙋‍♀️ Cliente: ${clientName} (${clientPhone})`
    );
    return `https://wa.me/${SALON_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121217] border border-[#D4AF37]/30 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header with Luxury Accent */}
        <div className="bg-gradient-to-r from-[#1A1A22] via-[#15151B] to-[#1A1A22] border-b border-[#D4AF37]/20 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#0E0E12] flex items-center justify-center text-[#E6C875]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                {bookingCompleted ? '¡Cita Confirmada!' : 'Reserva de Cita en Línea'}
              </h3>
              <p className="text-xs text-[#C2B79B]">
                {bookingCompleted 
                  ? 'Tu espacio en Miller Graceland ha sido asegurado' 
                  : 'Pasarela oficial respaldada por Mercado Pago (MXN)'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#C8C2B7] hover:text-[#FFF] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (Only if not completed) */}
        {!bookingCompleted && (
          <div className="px-6 py-3 bg-[#0B0B0E] border-b border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 1 ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-white/50'}`}>1</span>
              <span className={currentStep === 1 ? 'text-[#E6C875] font-semibold' : 'text-[#8C8478]'}>Servicio</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 2 ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-white/50'}`}>2</span>
              <span className={currentStep === 2 ? 'text-[#E6C875] font-semibold' : 'text-[#8C8478]'}>Horario</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 3 ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-white/50'}`}>3</span>
              <span className={currentStep === 3 ? 'text-[#E6C875] font-semibold' : 'text-[#8C8478]'}>Contacto</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 4 ? 'bg-[#009EE3] text-white' : 'bg-white/10 text-white/50'}`}>4</span>
              <span className={currentStep === 4 ? 'text-[#009EE3] font-semibold' : 'text-[#8C8478]'}>Mercado Pago</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">

          {/* STEP 1: SERVICE & STYLIST SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] uppercase tracking-wider mb-2">
                  1. Confirma o cambia tu servicio:
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {SERVICES.map((s) => {
                    const isSelected = selectedService.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#22212B] border-[#D4AF37] text-[#FAF7F2] shadow-md shadow-[#D4AF37]/10'
                            : 'bg-[#16161C] border-white/5 text-[#B8B1A4] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={s.image}
                            alt={s.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-bold text-[#FAF7F2] leading-tight">
                              {s.name}
                            </p>
                            <span className="text-[11px] text-[#A69E90] flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3 h-3 text-[#E6C875]" />
                              {s.durationMinutes} min
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-extrabold text-[#E6C875]">
                            ${s.priceMXN.toLocaleString('es-MX')} MXN
                          </span>
                          <span className="text-[10px] text-[#8C8478] block">
                            Anticipo: ${s.depositMXN}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stylist Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] uppercase tracking-wider mb-2">
                  2. ¿Deseas elegir un estilista en específico?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setSelectedStylist(null)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      selectedStylist === null
                        ? 'bg-[#22212B] border-[#D4AF37] text-[#FAF7F2]'
                        : 'bg-[#16161C] border-white/5 text-[#A69E90] hover:border-white/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2A2A36] flex items-center justify-center text-xs font-bold text-[#E6C875]">
                      MG
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#FAF7F2]">Primer Especialista Disponible</p>
                      <p className="text-[10px] text-[#8C8478]">Mayor disponibilidad de horario</p>
                    </div>
                  </div>

                  {STYLISTS.map((st) => {
                    const isSelected = selectedStylist?.id === st.id;
                    return (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStylist(st)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#22212B] border-[#D4AF37] text-[#FAF7F2]'
                            : 'bg-[#16161C] border-white/5 text-[#A69E90] hover:border-white/20'
                        }`}
                      >
                        <img
                          src={st.photo}
                          alt={st.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#FAF7F2] truncate">{st.name}</p>
                          <p className="text-[10px] text-[#E6C875] truncate">{st.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="gold-button w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Continuar a Selección de Fecha</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] uppercase tracking-wider mb-2">
                  1. Selecciona la fecha de tu visita:
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {datesList.map((d) => {
                    const isSelected = selectedDate === d.fullDate;
                    if (!d.available) {
                      return (
                        <div
                          key={d.fullDate}
                          className="p-2 rounded-xl bg-white/5 border border-white/5 text-center opacity-40 cursor-not-allowed"
                        >
                          <span className="text-[10px] block uppercase text-[#736E65]">{d.dayName}</span>
                          <span className="text-base font-bold text-[#736E65]">{d.dayNumber}</span>
                          <span className="text-[9px] block text-red-400">Cerrado</span>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={d.fullDate}
                        onClick={() => setSelectedDate(d.fullDate)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E6C875] text-[#0B0B0C] font-bold border-[#E6C875] shadow-md'
                            : 'bg-[#16161C] border-white/5 text-[#D5D0C7] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <span className="text-[10px] block uppercase">{d.dayName}</span>
                        <span className="text-lg font-bold leading-tight">{d.dayNumber}</span>
                        <span className="text-[10px] block uppercase opacity-80">{d.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] uppercase tracking-wider mb-2">
                  2. Horarios disponibles para {selectedDate}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#E6C875] text-black border-[#E6C875] shadow-md'
                            : 'bg-[#16161C] border-white/5 text-[#C8C2B7] hover:border-[#D4AF37]/40'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-3 rounded-xl text-xs font-semibold text-[#C8C2B7] border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continuar a tus Datos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT INFORMATION */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] mb-1">
                  Nombre y Apellidos *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A69E90] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Carolina Montes"
                    className="w-full bg-[#16161C] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D5D0C7] mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A69E90] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full bg-[#16161C] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D5D0C7] mb-1">
                    Teléfono / WhatsApp (México) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A69E90] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="55 1234 5678"
                      className="w-full bg-[#16161C] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FAF7F2] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] mb-1">
                  Notas adicionales o especificaciones (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Ej. Cabello teñido previamente de negro, me gustaría asesoría en tono miel..."
                  className="w-full bg-[#16161C] border border-white/10 rounded-xl p-3 text-sm text-[#FAF7F2] placeholder-[#666] focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#161622] border border-[#D4AF37]/20 flex items-center gap-3 text-xs text-[#C8C2B7]">
                <ShieldCheck className="w-5 h-5 text-[#009EE3] shrink-0" />
                <span>
                  Tus datos están protegidos. Recibirás tu confirmación de cita en tu correo y WhatsApp.
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 py-3 rounded-xl text-xs font-semibold text-[#C8C2B7] border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Ir a Pasarela de Pago</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: MERCADO PAGO CHECKOUT */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Summary box */}
              <div className="bg-[#181822] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div>
                    <h4 className="text-sm font-bold text-[#FAF7F2]">{selectedService.name}</h4>
                    <p className="text-xs text-[#E6C875]">
                      {selectedDate} a las {selectedTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#8C8478] block">Precio Total</span>
                    <span className="text-base font-bold text-[#FAF7F2]">
                      ${selectedService.priceMXN.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>

                <div className="pt-3 text-xs text-[#C8C2B7] flex justify-between">
                  <span>Estilista asignado:</span>
                  <span className="font-semibold text-[#FAF7F2]">
                    {selectedStylist ? selectedStylist.name : 'Primer Especialista Disponible'}
                  </span>
                </div>
              </div>

              {/* Payment Amount Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#D5D0C7] uppercase tracking-wider mb-2">
                  Elige cómo deseas reservar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentOption('deposit')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentOption === 'deposit'
                        ? 'bg-[#1E2333] border-[#009EE3] text-[#FAF7F2] shadow-md'
                        : 'bg-[#16161C] border-white/5 text-[#A69E90] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#009EE3]">Anticipo para Apartar</span>
                      <span className="text-xs bg-[#009EE3]/20 text-[#009EE3] font-bold px-2 py-0.5 rounded">
                        Recomendado
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#FAF7F2]">
                        ${selectedService.depositMXN.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs text-[#009EE3]">MXN</span>
                    </div>
                    <p className="text-[11px] text-[#A69E90] mt-1">
                      Asegura tu horario en la agenda. El saldo restante ($
                      {(selectedService.priceMXN - selectedService.depositMXN).toLocaleString('es-MX')} MXN) se liquida el día de tu servicio.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentOption('full')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentOption === 'full'
                        ? 'bg-[#1E2333] border-[#009EE3] text-[#FAF7F2] shadow-md'
                        : 'bg-[#16161C] border-white/5 text-[#A69E90] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E6C875]">Pago Completo 100%</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#FAF7F2]">
                        ${selectedService.priceMXN.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs text-[#E6C875]">MXN</span>
                    </div>
                    <p className="text-[11px] text-[#A69E90] mt-1">
                      Liquida tu servicio completo ahora mismo con Mercado Pago y olvídate de pagos adicionales el día de tu cita.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mercado Pago Badge and Payment methods */}
              <div className="p-4 rounded-2xl bg-[#009EE3]/10 border border-[#009EE3]/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#009EE3] flex items-center justify-center font-bold text-white text-xs">
                      MP
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#FAF7F2]">Mercado Pago México</p>
                      <p className="text-[10px] text-[#009EE3]">Procesamiento Seguro 256-bit SSL</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#E6C875] font-semibold">
                    3 y 6 MSI disponibles
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#C8C2B7]">
                  <CreditCard className="w-4 h-4 text-[#009EE3]" />
                  <span>Acepta Visa, Mastercard, AMEX, Dinero en MP y Efectivo en OXXO</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  disabled={isProcessingPayment}
                  onClick={handleProcessMercadoPago}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-[#009EE3] hover:bg-[#0089C7] text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl shadow-[#009EE3]/20 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Conectando con Mercado Pago...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pagar ${amountToPay.toLocaleString('es-MX')} MXN con Mercado Pago</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={isProcessingPayment}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#8C8478] hover:text-[#C8C2B7] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modificar datos de contacto</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS CONFIRMATION */}
          {currentStep === 5 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#E6C875] shadow-lg shadow-[#D4AF37]/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E6C875]">
                  Pago Aprobado con Mercado Pago
                </span>
                <h3 className="font-serif-luxury text-3xl font-bold text-[#FAF7F2] mt-1">
                  ¡Te esperamos, {clientName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#A69E90] mt-1">
                  Hemos enviado los detalles completos a <strong>{clientEmail}</strong>
                </p>
              </div>

              {/* Booking Ticket Card */}
              <div className="bg-[#181822] border border-[#D4AF37]/30 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                  Confirmada
                </div>

                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8478]">Código de Cita</span>
                    <p className="font-mono text-lg font-bold text-[#E6C875]">{bookingCode}</p>
                  </div>
                  <div className="text-right pr-14">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8478]">Monto Pagado</span>
                    <p className="text-sm font-bold text-[#FAF7F2]">${amountToPay} MXN (MP)</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8C8478]">Servicio:</span>
                    <span className="font-semibold text-[#FAF7F2]">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8478]">Fecha y Hora:</span>
                    <span className="font-semibold text-[#FAF7F2]">{selectedDate} - {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8478]">Estilista:</span>
                    <span className="font-semibold text-[#FAF7F2]">
                      {selectedStylist ? selectedStylist.name : 'Primer Especialista Disponible'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8478]">Ubicación:</span>
                    <span className="font-semibold text-[#FAF7F2]">{SALON_INFO.address}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp confirmation CTA */}
              <div className="space-y-3 max-w-md mx-auto">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20BE5A] text-black flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Enviar Cita al WhatsApp del Salón</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 rounded-xl text-xs font-semibold text-[#C8C2B7] border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cerrar y Regresar al Sitio
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
