import React from 'react';
import { Calendar, CreditCard, Banknote, Landmark, Clock, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface PaymentMethodsSectionProps {
  onOpenBooking?: () => void;
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="pagos" className="py-20 sm:py-24 bg-[#F2EDE3] relative overflow-hidden border-y border-[#99745A]/15">
      {/* Anchor alias to support old links if needed */}
      <div id="mercadopago" className="absolute -top-24 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-[#99745A]/20 rounded-3xl p-8 sm:p-12 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading, description and policy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#68794E]/30 text-[#42502E] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <CreditCard className="w-3.5 h-3.5 text-[#C8933E]" />
                <span>Reservas y Formas de Pago</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#231E1B] leading-tight">
                Claridad y transparencia en <br className="hidden sm:inline" />
                <span className="gold-accent-text italic font-normal">cada reserva</span>
              </h2>

              <p className="text-sm text-[#5C534B] leading-relaxed">
                Para asegurar tu fecha y horario, solicitamos un anticipo del <strong>50% sobre el precio mínimo publicado</strong> del servicio. En procedimientos con rangos orientativos o tarifas según longitud o gramaje, el precio final se confirma tras la valoración en el salón y se descuenta el anticipo efectivamente recibido.
              </p>

              {/* Exact Cancellation Policy Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#C8933E]/35 text-xs text-[#3D352F] space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-[#A87428]">
                  <Clock className="w-4 h-4" />
                  <span>Política de cambios de cita y anticipos</span>
                </div>
                <p className="leading-relaxed font-medium">
                  {SALON_INFO.cancellationPolicy}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="gold-button px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Solicitar Cita</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20informaci%C3%B3n%20sobre%20anticipos%20y%20formas%20de%20pago`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs font-semibold text-[#3D352F] border border-[#99745A]/25 bg-white hover:border-[#C8933E] hover:text-[#231E1B] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#68794E]" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3 Real Payment Methods */}
            <div className="lg:col-span-5 space-y-3.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7067] block">
                Métodos de pago disponibles:
              </span>

              {/* 1. Efectivo */}
              <div className="p-4.5 rounded-2xl bg-[#FAF7F2] border border-[#99745A]/20 flex items-start gap-3.5 hover:border-[#C8933E]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#99745A]/20 flex items-center justify-center shrink-0 text-[#68794E] shadow-2xs">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#231E1B]">Efectivo</h4>
                  <p className="text-xs text-[#6B6158] mt-0.5 leading-relaxed">
                    Aceptado directamente en el salón para liquidar tu saldo al finalizar el servicio.
                  </p>
                </div>
              </div>

              {/* 2. Transferencia bancaria */}
              <div className="p-4.5 rounded-2xl bg-[#FAF7F2] border border-[#99745A]/20 flex items-start gap-3.5 hover:border-[#C8933E]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#99745A]/20 flex items-center justify-center shrink-0 text-[#C8933E] shadow-2xs">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#231E1B]">Transferencia bancaria</h4>
                  <p className="text-xs text-[#6B6158] mt-0.5 leading-relaxed">
                    Ideal para cubrir tu anticipo. Los datos bancarios se solicitan directamente por WhatsApp al enviar tu solicitud.
                  </p>
                </div>
              </div>

              {/* 3. Terminal bancaria en el salón */}
              <div className="p-4.5 rounded-2xl bg-[#FAF7F2] border border-[#99745A]/20 flex items-start gap-3.5 hover:border-[#C8933E]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#99745A]/20 flex items-center justify-center shrink-0 text-[#42502E] shadow-2xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#231E1B]">Terminal bancaria en el salón</h4>
                  <p className="text-xs text-[#6B6158] mt-0.5 leading-relaxed">
                    Aceptación de tarjetas bancarias físicas directamente en el salón durante tu cita.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
