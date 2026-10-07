import { useState } from 'react';
import { 
  X, Clock, User, CheckCircle2, 
  ShieldCheck, CreditCard, ChevronRight, 
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
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#DFAC58', '#C8933E', '#68794E', '#99745A', '#F8F5EE']
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
      `¡Hola Miller Greiseland! Acabo de agendar una cita por la página web:\n\n` +
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header with Luxury Accent & Official Logo */}
        <div className="bg-[#F8F5EE] border-b border-[#99745A]/15 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#C8933E]/50 bg-white p-1 flex items-center justify-center shadow-xs overflow-hidden">
              <img
                src="/logo-miller.png"
                alt="Miller Greiseland"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-miller.jpeg';
                }}
              />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B]">
                {bookingCompleted ? '¡Cita Confirmada!' : 'Reserva de Cita en Línea'}
              </h3>
              <p className="text-xs text-[#6B6158]">
                {bookingCompleted 
                  ? 'Tu espacio en Miller Greiseland ha sido asegurado' 
                  : 'Pasarela oficial respaldada por Mercado Pago (MXN)'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-[#6B6158] hover:text-[#231E1B] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (Only if not completed) */}
        {!bookingCompleted && (
          <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#99745A]/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 1 ? 'bg-[#C8933E] text-white' : 'bg-black/10 text-black/50'}`}>1</span>
              <span className={currentStep === 1 ? 'text-[#A87428] font-bold' : 'text-[#8F8378]'}>Servicio</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-black/20" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 2 ? 'bg-[#C8933E] text-white' : 'bg-black/10 text-black/50'}`}>2</span>
              <span className={currentStep === 2 ? 'text-[#A87428] font-bold' : 'text-[#8F8378]'}>Horario</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-black/20" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 3 ? 'bg-[#C8933E] text-white' : 'bg-black/10 text-black/50'}`}>3</span>
              <span className={currentStep === 3 ? 'text-[#A87428] font-bold' : 'text-[#8F8378]'}>Contacto</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-black/20" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentStep >= 4 ? 'bg-[#009EE3] text-white' : 'bg-black/10 text-black/50'}`}>4</span>
              <span className={currentStep === 4 ? 'text-[#009EE3] font-bold' : 'text-[#8F8378]'}>Mercado Pago</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto bg-white">

          {/* STEP 1: SERVICE & STYLIST SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider mb-2">
                  1. Confirma o cambia tu servicio:
                </label>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {SERVICES.map((s) => {
                    const isSelected = selectedService.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FFF9EE] border-[#C8933E] text-[#231E1B] shadow-sm'
                            : 'bg-[#F9F6F0] border-[#99745A]/15 text-[#5C534B] hover:border-[#C8933E]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={s.image}
                            alt={s.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="text-sm font-bold text-[#231E1B] leading-tight">
                              {s.name}
                            </p>
                            <span className="text-[11px] text-[#68794E] font-bold flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3 h-3 text-[#68794E]" />
                              {s.durationMinutes} min
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black text-[#A87428]">
                            {s.priceDisplay} MXN
                          </span>
                          <span className="text-[10px] text-[#736A60] block font-medium">
                            Anticipo MP: ${s.depositMXN}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stylist Selection */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider mb-2">
                  2. ¿Deseas elegir un estilista en específico?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div
                    onClick={() => setSelectedStylist(null)}
                    className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                      selectedStylist === null
                        ? 'bg-[#FFF9EE] border-[#C8933E] text-[#231E1B] shadow-xs'
                        : 'bg-[#F9F6F0] border-[#99745A]/15 text-[#6B6158] hover:border-[#C8933E]/40'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EAE3D6] border border-[#68794E]/40 flex items-center justify-center text-xs font-bold text-[#42502E]">
                      MG
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#231E1B]">Primer Especialista Disponible</p>
                      <p className="text-[10px] text-[#7A7067]">Mayor disponibilidad de horario</p>
                    </div>
                  </div>

                  {STYLISTS.map((st) => {
                    const isSelected = selectedStylist?.id === st.id;
                    return (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStylist(st)}
                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FFF9EE] border-[#C8933E] text-[#231E1B] shadow-xs'
                            : 'bg-[#F9F6F0] border-[#99745A]/15 text-[#6B6158] hover:border-[#C8933E]/40'
                        }`}
                      >
                        <img
                          src={st.photo}
                          alt={st.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#99745A]/25"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#231E1B] truncate">{st.name}</p>
                          <p className="text-[10px] text-[#68794E] font-bold truncate">{st.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="gold-button w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
                <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider mb-2">
                  1. Selecciona la fecha de tu visita:
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {datesList.map((d) => {
                    const isSelected = selectedDate === d.fullDate;
                    if (!d.available) {
                      return (
                        <div
                          key={d.fullDate}
                          className="p-2 rounded-xl bg-gray-100 border border-gray-200 text-center opacity-40 cursor-not-allowed"
                        >
                          <span className="text-[10px] block uppercase text-gray-500">{d.dayName}</span>
                          <span className="text-base font-bold text-gray-500">{d.dayNumber}</span>
                          <span className="text-[9px] block text-red-500">Cerrado</span>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={d.fullDate}
                        onClick={() => setSelectedDate(d.fullDate)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-b from-[#DFAC58] to-[#C8933E] text-white font-bold border-[#C8933E] shadow-sm'
                            : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#231E1B] hover:border-[#C8933E]'
                        }`}
                      >
                        <span className="text-[10px] block uppercase font-bold">{d.dayName}</span>
                        <span className="text-lg font-black leading-tight">{d.dayNumber}</span>
                        <span className="text-[10px] block uppercase opacity-90">{d.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider mb-2">
                  2. Horarios disponibles para {selectedDate}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#68794E] to-[#C8933E] text-white border-[#C8933E] shadow-sm'
                            : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#3D352F] hover:border-[#C8933E]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-[#68794E]" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-3 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  Nombre y Apellidos *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Carolina Montes"
                    className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#4A423B] mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A423B] mb-1">
                    Teléfono / WhatsApp (México) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="55 1234 5678"
                      className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  Notas adicionales o especificaciones (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Ej. Cabello teñido previamente de negro, me gustaría asesoría en tono miel..."
                  className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl p-3 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center gap-3 text-xs text-[#3D472D]">
                <ShieldCheck className="w-5 h-5 text-[#68794E] shrink-0" />
                <span>
                  Tus datos están protegidos. Recibirás tu confirmación de cita en tu correo y WhatsApp.
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 py-3 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
              <div className="bg-[#FAF7F2] border border-[#99745A]/20 rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#99745A]/15">
                  <div>
                    <h4 className="text-sm font-bold text-[#231E1B]">{selectedService.name}</h4>
                    <p className="text-xs text-[#A87428] font-bold">
                      {selectedDate} a las {selectedTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7A7067] block">Precio / Rango</span>
                    <span className="text-base font-black text-[#231E1B]">
                      {selectedService.priceDisplay} MXN
                    </span>
                  </div>
                </div>

                <div className="pt-3 text-xs text-[#5C534B] flex justify-between">
                  <span>Estilista asignado:</span>
                  <span className="font-bold text-[#231E1B]">
                    {selectedStylist ? selectedStylist.name : 'Primer Especialista Disponible'}
                  </span>
                </div>
              </div>

              {/* Payment Amount Choice */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider mb-2">
                  Elige cómo deseas reservar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentOption('deposit')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentOption === 'deposit'
                        ? 'bg-[#F0F6FA] border-[#009EE3] text-[#231E1B] shadow-sm'
                        : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#6B6158] hover:border-[#009EE3]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#009EE3]">Anticipo para Apartar</span>
                      <span className="text-xs bg-[#009EE3]/15 text-[#009EE3] font-bold px-2 py-0.5 rounded">
                        Recomendado
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#231E1B]">
                        ${selectedService.depositMXN.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-bold text-[#009EE3]">MXN</span>
                    </div>
                    <p className="text-[11px] text-[#6B6158] mt-1">
                      Asegura tu horario en la agenda. El saldo restante ($
                      {(selectedService.priceMXN - selectedService.depositMXN).toLocaleString('es-MX')} MXN) se liquida el día de tu servicio.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentOption('full')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentOption === 'full'
                        ? 'bg-[#FFF9EE] border-[#C8933E] text-[#231E1B] shadow-sm'
                        : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#6B6158] hover:border-[#C8933E]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#A87428]">Pago Completo 100%</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#231E1B]">
                        ${selectedService.priceMXN.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-bold text-[#A87428]">MXN</span>
                    </div>
                    <p className="text-[11px] text-[#6B6158] mt-1">
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
                      <p className="text-xs font-bold text-[#231E1B]">Mercado Pago México</p>
                      <p className="text-[10px] text-[#009EE3] font-semibold">Procesamiento Seguro 256-bit SSL</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#A87428] font-bold">
                    3 y 6 MSI disponibles
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#554C44]">
                  <CreditCard className="w-4 h-4 text-[#009EE3]" />
                  <span>Acepta Visa, Mastercard, AMEX, Dinero en MP y Efectivo en OXXO</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  disabled={isProcessingPayment}
                  onClick={handleProcessMercadoPago}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-[#009EE3] hover:bg-[#0089C7] text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-[#009EE3]/25 disabled:opacity-50"
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
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-[#8C8278] hover:text-[#231E1B] transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
              <div className="w-16 h-16 rounded-full bg-[#68794E]/15 border border-[#68794E] flex items-center justify-center mx-auto text-[#68794E] shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#68794E]">
                  Pago Aprobado con Mercado Pago
                </span>
                <h3 className="font-serif-luxury text-3xl font-bold text-[#231E1B] mt-1">
                  ¡Te esperamos, {clientName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#6B6158] mt-1">
                  Hemos enviado los detalles completos a <strong>{clientEmail}</strong>
                </p>
              </div>

              {/* Booking Ticket Card */}
              <div className="bg-[#FAF7F2] border border-[#C8933E]/40 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#DFAC58] to-[#C8933E] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-xs">
                  Confirmada
                </div>

                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8278] font-bold">Código de Cita</span>
                    <p className="font-mono text-lg font-black text-[#A87428]">{bookingCode}</p>
                  </div>
                  <div className="text-right pr-14">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8278] font-bold">Monto Pagado</span>
                    <p className="text-sm font-black text-[#231E1B]">${amountToPay} MXN (MP)</p>
                  </div>
                </div>

                <div className="border-t border-[#99745A]/15 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Servicio:</span>
                    <span className="font-bold text-[#231E1B]">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Fecha y Hora:</span>
                    <span className="font-bold text-[#231E1B]">{selectedDate} - {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Estilista:</span>
                    <span className="font-bold text-[#231E1B]">
                      {selectedStylist ? selectedStylist.name : 'Primer Especialista Disponible'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Ubicación:</span>
                    <span className="font-bold text-[#231E1B]">{SALON_INFO.address}</span>
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
                  className="w-full py-3 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/20 hover:bg-black/5 transition-all cursor-pointer"
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
