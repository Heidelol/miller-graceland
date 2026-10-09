import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X, Clock, User, CheckCircle2,
  ChevronRight,
  Phone, Mail, ArrowLeft, MessageCircle,
  Sparkles, HelpCircle, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, SALON_INFO } from '../data/salonData';
import type { ServiceItem } from '../types/salon';
import type { AdminBooking } from '../types/admin';
import { loadBookingsFromStorage, saveBookingsToStorage } from '../lib/adminStorage';
import type { StorageSaveResult } from '../lib/adminStorage';
import {
  isWithinOperatingHours,
  getAvailableStartSlots,
  formatTimeDisplay,
  formatDateDisplay,
  getTodayLocalDate,
  generateBookingDates,
  convertTo24Hour,
} from '../lib/adminBookingLogic';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
}

type StepId = 'service' | 'hair' | 'schedule' | 'contact' | 'summary' | 'success';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    initialService || SERVICES[0]
  );
  
  const selectedServiceRef = useRef<HTMLDivElement | null>(null);

  // Hair Profile questionnaire (for Color & Blondes only)
  const [currentColor, setCurrentColor] = useState('');
  const [desiredResult, setDesiredResult] = useState('');
  const [hairLength, setHairLength] = useState<'corto' | 'medio' | 'largo'>('medio');
  const [previousColoring, setPreviousColoring] = useState<'si' | 'no' | 'no_se'>('no');
  const [lastProcessDetails, setLastProcessDetails] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  // Date & Time (recalculados dinámicamente al abrir el modal)
  const [datesList, setDatesList] = useState(generateBookingDates);
  const [selectedDate, setSelectedDate] = useState<string>(() => generateBookingDates()[0]?.fullDate || '');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [timeNotice, setTimeNotice] = useState<string | null>(null);

  // Customer contact info
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Booking result
  const [bookingCode, setBookingCode] = useState('');
  const [currentStep, setCurrentStep] = useState<StepId>('service');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [storageSaveResult, setStorageSaveResult] = useState<StorageSaveResult | null>(null);

  // Invalida el horario si el servicio seleccionado ya no permite terminar antes de las 19:00
  const handleSelectService = useCallback((service: ServiceItem) => {
    setSelectedService(service);
    setValidationError(null);
    if (selectedTime) {
      const time24 = convertTo24Hour(selectedTime);
      if (!isWithinOperatingHours(time24, service.durationMinutes)) {
        setSelectedTime('');
        setTimeNotice(
          `El horario previamente seleccionado ya no permite terminar ${service.name} (${service.durationMinutes} min) antes del cierre de las 19:00. Por favor elige un nuevo horario.`
        );
      } else {
        setTimeNotice(null);
      }
    }
  }, [selectedTime]);

  useEffect(() => {
    if (selectedServiceRef.current) {
      selectedServiceRef.current.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, [selectedService.id]);

  // Recalcular fechas al abrir el modal (evita lista fijada al cargar el módulo)
  useEffect(() => {
    if (isOpen) {
      const freshDates = generateBookingDates();
      setDatesList(freshDates);
      setSelectedDate((prev) => {
        if (prev && freshDates.some((d) => d.fullDate === prev)) {
          return prev;
        }
        return freshDates[0]?.fullDate || getTodayLocalDate();
      });
      setValidationError(null);
    }
  }, [isOpen]);

  // Actualizar servicio si cambia initialService
  useEffect(() => {
    if (initialService) {
      handleSelectService(initialService);
    }
  }, [initialService, handleSelectService]);

  const isColorService = selectedService.category === 'color' || selectedService.category === 'blondes';

  if (!isOpen) return null;

  // Fuente de horarios: getAvailableStartSlots (11:00 a 19:00 según duración)
  const availableSlots24 = getAvailableStartSlots(selectedService.durationMinutes, 30);
  const timeSlots = availableSlots24.map(formatTimeDisplay);

  const amountToPay = selectedService.depositMXN;

  // Step definitions
  const stepList: { id: StepId; label: string; number: number }[] = isColorService
    ? [
        { id: 'service', label: 'Servicio', number: 1 },
        { id: 'hair', label: 'Tu Cabello', number: 2 },
        { id: 'schedule', label: 'Horario', number: 3 },
        { id: 'contact', label: 'Contacto', number: 4 },
        { id: 'summary', label: 'Resumen', number: 5 },
      ]
    : [
        { id: 'service', label: 'Servicio', number: 1 },
        { id: 'schedule', label: 'Horario', number: 2 },
        { id: 'contact', label: 'Contacto', number: 3 },
        { id: 'summary', label: 'Resumen', number: 4 },
      ];

  const currentStepNumber = stepList.find((s) => s.id === currentStep)?.number || 1;

  const handleNextFromService = () => {
    setValidationError(null);
    if (isColorService) {
      setCurrentStep('hair');
    } else {
      setCurrentStep('schedule');
    }
  };

  const handleNextFromHair = () => {
    if (!currentColor.trim()) {
      setValidationError('Por favor indica tu color actual de cabello.');
      return;
    }
    if (!desiredResult.trim()) {
      setValidationError('Por favor indica el resultado que estás buscando.');
      return;
    }
    setValidationError(null);
    setCurrentStep('schedule');
  };

  const handleNextFromSchedule = () => {
    setValidationError(null);
    if (!selectedDate) {
      setValidationError('Por favor selecciona una fecha para tu cita.');
      return;
    }
    if (!selectedTime) {
      setValidationError('Por favor selecciona un horario disponible para este servicio.');
      return;
    }
    const time24 = convertTo24Hour(selectedTime);
    if (!isWithinOperatingHours(time24, selectedService.durationMinutes)) {
      setValidationError(
        `El horario ${selectedTime} no permite terminar ${selectedService.name} (${selectedService.durationMinutes} min) antes del cierre de las 19:00. Por favor selecciona otro horario.`
      );
      return;
    }
    setCurrentStep('contact');
  };

  const handleNextFromContact = () => {
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setValidationError('Por favor completa tu nombre, correo electrónico y teléfono / WhatsApp.');
      return;
    }
    setValidationError(null);
    setCurrentStep('summary');
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep === 'hair') {
      setCurrentStep('service');
    } else if (currentStep === 'schedule') {
      setCurrentStep(isColorService ? 'hair' : 'service');
    } else if (currentStep === 'contact') {
      setCurrentStep('schedule');
    } else if (currentStep === 'summary') {
      setCurrentStep('contact');
    }
  };

  const handleFinalizeBooking = () => {
    setValidationError(null);
    if (!selectedDate) {
      setValidationError('Por favor selecciona una fecha para tu cita.');
      setCurrentStep('schedule');
      return;
    }
    if (!selectedTime) {
      setValidationError('Por favor selecciona un horario disponible para este servicio.');
      setCurrentStep('schedule');
      return;
    }
    const time24 = convertTo24Hour(selectedTime);
    if (!isWithinOperatingHours(time24, selectedService.durationMinutes)) {
      setValidationError(
        `El horario ${selectedTime} no permite concluir ${selectedService.name} (${selectedService.durationMinutes} min) antes del cierre de las 19:00. Por favor selecciona un horario disponible.`
      );
      setCurrentStep('schedule');
      return;
    }

    const code = `MG-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);

    let saveRes: StorageSaveResult = { success: false, error: 'No inicializado' };

    // Persist new booking as pending_payment in demo storage so it appears in /admin-demo
    try {
      const { bookings: existing } = loadBookingsFromStorage();
      const newBooking: AdminBooking = {
        id: code,
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        clientEmail: clientEmail.trim() || undefined,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: selectedDate,
        time: convertTo24Hour(selectedTime),
        durationMinutes: selectedService.durationMinutes,
        status: 'pending_payment',
        requiredDepositMXN: selectedService.depositMXN,
        receivedDepositMXN: 0,
        finalPriceMXN: null, // Guardar null: precio final por confirmar en el salón
        createdAt: new Date().toISOString(),
        notes: notes.trim() || undefined,
        hairProfile: isColorService ? {
          currentColor: currentColor.trim(),
          desiredResult: desiredResult.trim(),
          hairLength,
          previousColoring,
          lastProcessDetails: lastProcessDetails.trim() || undefined,
          additionalComments: additionalComments.trim() || undefined,
        } : undefined,
      };

      saveRes = saveBookingsToStorage([newBooking, ...existing]);
    } catch (e: unknown) {
      console.warn('No se pudo guardar la reserva en almacenamiento local:', e);
      const msg = e instanceof Error ? e.message : 'Error desconocido al guardar';
      saveRes = { success: false, error: msg };
    }

    setStorageSaveResult(saveRes);
    setCurrentStep('success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DFAC58', '#C8933E', '#68794E', '#99745A', '#F8F5EE']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetAndClose = () => {
    setCurrentStep('service');
    onClose();
  };

  const getWhatsAppMessageUrl = () => {
    let msg = `¡Hola Miller Greiseland! Deseo solicitar una cita previa:\n\n` +
      `📋 Código de solicitud: ${bookingCode || 'Pendiente'}\n` +
      `✨ Servicio: ${selectedService.name}\n` +
      `📅 Fecha solicitada: ${formatDateDisplay(selectedDate, { short: true })} (${selectedDate}) a las ${selectedTime} (sujeta a confirmación)\n` +
      `💳 Anticipo requerido (50%): $${amountToPay.toLocaleString('es-MX')} MXN\n` +
      `Nota: El saldo final se confirma en el salón tras la valoración.\n\n` +
      `🙋‍♀️ Clienta: ${clientName} (${clientPhone})\n` +
      `✉️ Correo: ${clientEmail}\n`;

    if (isColorService) {
      const prevColorText = previousColoring === 'si' ? 'Sí' : previousColoring === 'no' ? 'No' : 'No lo sé';
      msg += `\n💇‍♀️ Diagnóstico sobre mi cabello:\n` +
        `• Color actual: ${currentColor}\n` +
        `• Resultado que busco: ${desiredResult}\n` +
        `• Largo aproximado: ${hairLength}\n` +
        `• Coloración/decoloración previa: ${prevColorText}\n` +
        (lastProcessDetails ? `• Último proceso y fecha: ${lastProcessDetails}\n` : '') +
        (additionalComments ? `• Comentarios adicionales: ${additionalComments}\n` : '');
    }

    if (notes) {
      msg += `\n📝 Notas adicionales: ${notes}\n`;
    }

    msg += `\nQuedo atenta para confirmar el horario y recibir los datos de pago del anticipo. ¡Gracias!`;

    return `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#99745A]/25 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header with Luxury Accent & Official Logo */}
        <div className="bg-[#F8F5EE] border-b border-[#99745A]/15 p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#C8933E]/50 bg-white p-1 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
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
                {currentStep === 'success' ? 'Solicitud preparada' : 'Solicitar Cita en Miller Greiseland'}
              </h3>
              <p className="text-xs text-[#6B6158]">
                {currentStep === 'success'
                  ? 'Envía el mensaje por WhatsApp para que el salón reciba tu solicitud'
                  : 'Fecha y horario solicitados · Confirmación y anticipo previo'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-[#6B6158] hover:text-[#231E1B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar modal de reserva"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (Only if not completed) */}
        {currentStep !== 'success' && (
          <div className="px-4 sm:px-6 py-3 bg-[#FAF7F2] border-b border-[#99745A]/10 flex items-center justify-between text-xs overflow-x-auto">
            {stepList.map((step, idx) => {
              const isCurrent = currentStep === step.id;
              const isPast = currentStepNumber > step.number;
              return (
                <div key={step.id} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-[#68794E] text-white'
                        : isPast
                        ? 'bg-[#C8933E] text-[#231E1B]'
                        : 'bg-black/10 text-black/50'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-xs ${
                      isCurrent
                        ? 'text-[#42502E] font-bold'
                        : isPast
                        ? 'text-[#231E1B] font-medium'
                        : 'text-[#8F8378]'
                    }`}
                  >
                    {step.label}
                  </span>
                  {idx < stepList.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-black/20 mx-1 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[72vh] overflow-y-auto bg-white">

          {/* STEP 1: SERVICE SELECTION */}
          {currentStep === 'service' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider mb-2">
                  1. Confirma o cambia tu servicio:
                </label>
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {SERVICES.map((s) => {
                    const isSelected = selectedService.id === s.id;
                    return (
                      <div
                        key={s.id}
                        ref={isSelected ? selectedServiceRef : undefined}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectService(s)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectService(s);
                          }
                        }}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-1 ${
                          isSelected
                            ? 'bg-[#FFF9EE] border-[#C8933E] text-[#231E1B] shadow-xs'
                            : 'bg-[#F9F6F0] border-[#99745A]/15 text-[#5C534B] hover:border-[#C8933E]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={s.image}
                            alt={s.imageAlt || `${s.name} · Referencia visual ilustrativa`}
                            className={`w-12 h-12 rounded-xl object-cover shrink-0 ${s.imageObjectPosition || 'object-center'}`}
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
                            Anticipo del 50%: ${s.depositMXN.toLocaleString('es-MX')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isColorService && (
                <div className="p-3.5 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center gap-2.5 text-xs text-[#3D472D]">
                  <Sparkles className="w-4 h-4 text-[#68794E] shrink-0" />
                  <span>
                    Servicio de color seleccionado. A continuación te haremos unas breves preguntas sobre tu cabello para preparar tu diagnóstico.
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleNextFromService}
                className="gold-button w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{isColorService ? 'Continuar a Diagnóstico de Cabello' : 'Continuar a Selección de Horario'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: HAIR PROFILE QUESTIONNAIRE (Color & Blondes Only) */}
          {currentStep === 'hair' && isColorService && (
            <div className="space-y-5">
              <div className="border-b border-[#99745A]/15 pb-3">
                <span className="text-xs font-bold text-[#68794E] uppercase tracking-wider block mb-1">
                  Paso 2 · Diagnóstico Previo
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-[#231E1B]">
                  Cuéntanos sobre tu cabello
                </h4>
                <p className="text-xs text-[#5C534B] mt-1 leading-relaxed">
                  Esta información nos ayuda a prever el tiempo y los materiales adecuados para el día de tu cita.
                </p>
              </div>

              {/* 1. Color actual */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  1. Color actual de tu cabello *
                </label>
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  placeholder="Ej. Castaño oscuro natural, rubio dorado teñido, base negra..."
                  className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl px-3.5 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                />
              </div>

              {/* 2. Resultado que busca */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  2. Resultado que estás buscando *
                </label>
                <input
                  type="text"
                  value={desiredResult}
                  onChange={(e) => setDesiredResult(e.target.value)}
                  placeholder="Ej. Balayage beige cenizo, aclarado sutil miel, cubrir canas..."
                  className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl px-3.5 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                />
              </div>

              {/* 3. Largo aproximado */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1.5">
                  3. Largo aproximado de tu cabello *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['corto', 'medio', 'largo'] as const).map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => setHairLength(len)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                        hairLength === len
                          ? 'bg-[#68794E] text-white border-[#68794E] shadow-xs'
                          : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#3D352F] hover:border-[#68794E]'
                      }`}
                    >
                      {len === 'corto' && 'Corto (hasta hombros)'}
                      {len === 'medio' && 'Medio (a media espalda)'}
                      {len === 'largo' && 'Largo (cintura o más)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Coloración o decoloración previa */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1.5">
                  4. ¿Tienes coloración o decoloración previa? *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['si', 'no', 'no_se'] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPreviousColoring(val)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        previousColoring === val
                          ? 'bg-[#C8933E] text-[#231E1B] border-[#C8933E] shadow-xs'
                          : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#3D352F] hover:border-[#C8933E]'
                      }`}
                    >
                      {val === 'si' && 'Sí'}
                      {val === 'no' && 'No (cabello virgen)'}
                      {val === 'no_se' && 'No lo sé'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Último proceso realizado */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  5. Último proceso realizado y fecha aproximada (si lo conoces)
                </label>
                <input
                  type="text"
                  value={lastProcessDetails}
                  onChange={(e) => setLastProcessDetails(e.target.value)}
                  placeholder="Ej. Tinte en casa hace 3 meses / Decoloración en salón hace 6 meses"
                  className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl px-3.5 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                />
              </div>

              {/* 6. Comentarios adicionales */}
              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  6. Comentarios adicionales sobre tu cabello (Opcional)
                </label>
                <textarea
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                  rows={2}
                  placeholder="Ej. Siento las puntas secas, tengo restos de keratina, etc."
                  className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl p-3 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                />
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-3 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextFromHair}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continuar a Horario</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 (or 2 for cuts/extensions): SCHEDULE SELECTION */}
          {currentStep === 'schedule' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#4A423B] uppercase tracking-wider">
                    Fecha solicitada de tu visita:
                  </label>
                  <span className="text-[11px] text-[#A87428] font-semibold">
                    Sujeto a confirmación
                  </span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {datesList.map((d) => {
                    const isSelected = selectedDate === d.fullDate;
                    return (
                      <button
                        key={d.fullDate}
                        type="button"
                        onClick={() => setSelectedDate(d.fullDate)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2 ${
                          isSelected
                            ? 'bg-[#C8933E] text-[#231E1B] font-bold border-[#C8933E] shadow-xs'
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
                  Horario solicitado para {selectedDate}:
                </label>

                {timeNotice && !selectedTime && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{timeNotice}</span>
                  </div>
                )}

                {timeSlots.length === 0 ? (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs text-center">
                    No hay horarios disponibles para este servicio ({selectedService.durationMinutes} min) que concluyan antes de las 19:00.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedTime(slot);
                            setTimeNotice(null);
                            setValidationError(null);
                          }}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2 ${
                            isSelected
                              ? 'bg-[#68794E] text-white border-[#68794E] shadow-xs'
                              : 'bg-[#F9F6F0] border-[#99745A]/20 text-[#3D352F] hover:border-[#68794E]'
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#68794E]'}`} />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <p className="text-[11px] text-[#7A7067] mt-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#A87428] shrink-0" />
                  <span>
                    El horario seleccionado es una solicitud. El salón confirmará la disponibilidad exacta antes de formalizar la cita.
                  </span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-3 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextFromSchedule}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Continuar a tus Datos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 (or 3): CONTACT INFORMATION */}
          {currentStep === 'contact' && (
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
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="983 137 3038"
                      className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A423B] mb-1">
                  Notas adicionales (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Detalles sobre tu disponibilidad o requerimientos especiales..."
                  className="w-full bg-[#F9F6F0] border border-[#99745A]/25 rounded-xl p-3 text-sm text-[#231E1B] placeholder-gray-400 focus:border-[#C8933E] focus:outline-none transition-colors"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center gap-3 text-xs text-[#3D472D]">
                <Clock className="w-4 h-4 text-[#68794E] shrink-0" />
                <span>
                  Horario de atención del salón: 11:00 a. m. a 7:00 p. m.
                </span>
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-3 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/25 hover:bg-black/5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextFromContact}
                  className="gold-button w-2/3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Revisar Resumen y Pagos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 (or 4): SUMMARY & PAYMENT INFORMATION */}
          {currentStep === 'summary' && (
            <div className="space-y-5">
              
              {/* Service & Schedule Summary */}
              <div className="bg-[#FAF7F2] border border-[#99745A]/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#231E1B]">{selectedService.name}</h4>
                    <p className="text-xs text-[#A87428] font-bold mt-0.5">
                      Fecha solicitada: {selectedDate} a las {selectedTime}
                    </p>
                    <span className="text-[11px] text-[#68794E] font-semibold flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-[#68794E]" />
                      Duración estimada: {selectedService.durationMinutes} min
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#7A7067] uppercase font-bold block">Precio publicado</span>
                    <span className="text-base font-black text-[#231E1B]">
                      {selectedService.priceDisplay} MXN
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#99745A]/15 pt-2 flex justify-between items-center text-xs text-[#5C534B]">
                  <span>Clienta: <strong className="text-[#231E1B]">{clientName}</strong> ({clientPhone})</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FAF0D9] text-[#8A5F20] text-[10px] font-bold">
                    Pendiente de confirmación
                  </span>
                </div>
              </div>

              {/* Hair Profile Summary (if Color) */}
              {isColorService && currentColor && (
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#99745A]/15 text-xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#68794E] block">
                    Diagnóstico de cabello incluido:
                  </span>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                    <div><span className="text-[#7A7067]">Color actual:</span> <strong className="text-[#231E1B]">{currentColor}</strong></div>
                    <div><span className="text-[#7A7067]">Resultado:</span> <strong className="text-[#231E1B]">{desiredResult}</strong></div>
                    <div><span className="text-[#7A7067]">Largo:</span> <strong className="text-[#231E1B] capitalize">{hairLength}</strong></div>
                    <div><span className="text-[#7A7067]">Coloración previa:</span> <strong className="text-[#231E1B]">{previousColoring === 'si' ? 'Sí' : previousColoring === 'no' ? 'No' : 'No lo sé'}</strong></div>
                  </div>
                </div>
              )}

              {/* Anticipo requerido del 50% */}
              <div className="p-4 rounded-2xl border bg-[#F8F5EE] border-[#C8933E]/40 text-[#231E1B]">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#68794E] uppercase tracking-wider">Anticipo requerido (50%)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-[#231E1B]">
                      ${amountToPay.toLocaleString('es-MX')}
                    </span>
                    <span className="text-xs font-bold text-[#A87428]">MXN</span>
                  </div>
                </div>
                <p className="text-xs text-[#5C534B] leading-relaxed">
                  Calculado sobre el precio mínimo publicado (${selectedService.priceMXN.toLocaleString('es-MX')} MXN). Para servicios con rango, el precio final y el saldo por liquidar se confirman en el salón tras la valoración técnica.
                </p>
              </div>

              {/* Formas de Pago Reales */}
              <div className="p-4 rounded-2xl bg-white border border-[#99745A]/20 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7067] block">
                  Formas de pago confirmadas:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F9F6F0] border border-[#99745A]/15">
                    <p className="font-bold text-[#231E1B]">1. Efectivo</p>
                    <p className="text-[11px] text-[#7A7067]">En el salón</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F9F6F0] border border-[#99745A]/15">
                    <p className="font-bold text-[#231E1B]">2. Transferencia</p>
                    <p className="text-[11px] text-[#7A7067]">Datos por WhatsApp</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F9F6F0] border border-[#99745A]/15">
                    <p className="font-bold text-[#231E1B]">3. Terminal</p>
                    <p className="text-[11px] text-[#7A7067]">Bancaria en salón</p>
                  </div>
                </div>
              </div>

              {/* Política de cancelación y anticipos */}
              <div className="p-3.5 rounded-xl bg-[#FFF9EE] border border-[#C8933E]/30 text-xs text-[#8A5F20] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#C8933E] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-[#231E1B]">
                    Política de cambios y anticipos:
                  </p>
                  <p className="text-[#6D4C1B]">
                    Puedes solicitar un cambio de cita con al menos 24 horas de anticipación. Los anticipos no son reembolsables.
                  </p>
                </div>
              </div>

              {/* Primary action */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleFinalizeBooking}
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#68794E] hover:bg-[#576641] text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Registrar Solicitud de Cita</span>
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-2 rounded-xl text-xs font-bold text-[#8C8278] hover:text-[#231E1B] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modificar datos de contacto</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: SUCCESS CONFIRMATION */}
          {currentStep === 'success' && (
            <div className="text-center py-2 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#68794E]/15 border border-[#68794E] flex items-center justify-center mx-auto text-[#68794E] shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#68794E]">
                  Solicitud preparada
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#231E1B] mt-1">
                  ¡Gracias, {clientName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#6B6158] mt-1 max-w-md mx-auto leading-relaxed">
                  Tu solicitud ha sido preparada. El salón la recibe en el momento en que envías el mensaje a través de WhatsApp. Envía el mensaje con el botón a continuación para acordar la confirmación y los detalles del anticipo.
                </p>
              </div>

              {/* Booking Ticket Card */}
              <div className="bg-[#FAF7F2] border border-[#C8933E]/40 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 bg-[#FAF0D9] text-[#8A5F20] border-b border-l border-[#C8933E]/30 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                  Pendiente de confirmación
                </div>

                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8278] font-bold">Código de Solicitud</span>
                    <p className="font-mono text-lg font-black text-[#A87428]">{bookingCode}</p>
                  </div>
                  <div className="text-right pr-28">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8278] font-bold">Anticipo Requerido</span>
                    <p className="text-sm font-black text-[#231E1B]">${amountToPay.toLocaleString('es-MX')} MXN</p>
                  </div>
                </div>

                <div className="border-t border-[#99745A]/15 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Servicio:</span>
                    <span className="font-bold text-[#231E1B]">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Fecha solicitada:</span>
                    <span className="font-bold text-[#231E1B]">{selectedDate} · {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7067]">Dirección del salón:</span>
                    <span className="font-bold text-[#231E1B] text-right max-w-[65%]">{SALON_INFO.address}</span>
                  </div>
                </div>
              </div>

              {/* Local demo note & notice if storage save failed */}
              {storageSaveResult && !storageSaveResult.success && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-md mx-auto flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">Aviso de demostración en navegador</p>
                    <p className="text-[11px] text-amber-800">
                      No se pudo guardar la copia demostrativa en este navegador ({storageSaveResult.error || 'almacenamiento no disponible'}). Puedes enviar tu solicitud directamente al salón por WhatsApp con el botón de abajo.
                    </p>
                  </div>
                </div>
              )}

              {/* Demo mode & Cancellation policy reminder */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#99745A]/15 text-[11px] text-[#6B6158] max-w-md mx-auto text-left space-y-1.5">
                <p>
                  <strong>Demostración local:</strong> Esta solicitud queda guardada únicamente en este navegador para propósitos del panel demostrativo.
                </p>
                <p>
                  <strong>Recordatorio:</strong> El salón confirmará la disponibilidad final al recibir tu mensaje por WhatsApp. Puedes solicitar un cambio de cita con al menos 24 horas de anticipación. Los anticipos no son reembolsables.
                </p>
              </div>

              {/* WhatsApp direct CTA */}
              <div className="space-y-2.5 max-w-md mx-auto">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20BE5A] text-black flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Solicitud por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-[#5C534B] border border-[#99745A]/20 hover:bg-black/5 transition-all cursor-pointer"
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
