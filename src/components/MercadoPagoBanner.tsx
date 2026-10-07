import { ShieldCheck, CreditCard, Clock, RefreshCw, CheckCircle2, Lock } from 'lucide-react';

export const MercadoPagoBanner: React.FC = () => {
  return (
    <section id="mercadopago" className="py-20 bg-[#F9F6F0] relative overflow-hidden border-y border-[#99745A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-[#009EE3]/30 rounded-3xl p-8 sm:p-12 shadow-md">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Column: Branding and Value */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#009EE3]/10 border border-[#009EE3]/30 text-[#009EE3] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Pasarela Oficial • Mercado Pago México</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#231E1B] mb-4">
                Tus reservas están 100% protegidas y respaldadas
              </h2>

              <p className="text-sm text-[#5C534B] leading-relaxed mb-6">
                En <strong>Miller Greiseland</strong> garantizamos tu tranquilidad. Puedes apartar tu horario con un anticipo accesible o liquidar tu servicio completo en Pesos Mexicanos (MXN) con la máxima seguridad bancaria.
              </p>

              {/* Supported payment badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="bg-[#F0F6FA] border border-[#009EE3]/25 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#1F2937] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#009EE3]" />
                  <span>Tarjetas de Crédito y Débito</span>
                </div>
                <div className="bg-[#FFF9EE] border border-[#C8933E]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#966720] flex items-center gap-2">
                  <span>✨ 3 y 6 Meses Sin Intereses</span>
                </div>
                <div className="bg-[#F0F6FA] border border-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#009EE3] flex items-center gap-2">
                  <span>Efectivo en OXXO & 7-Eleven</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Benefits */}
            <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#009EE3]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#009EE3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-[#009EE3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231E1B]">Encriptación SSL</h4>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Tus datos bancarios nunca se comparten ni almacenan.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#009EE3]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#009EE3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#009EE3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231E1B]">Confirmación Inmediata</h4>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Tu turno se bloquea en tiempo real al procesar el pago.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#009EE3]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#009EE3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <RefreshCw className="w-4 h-4 text-[#009EE3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231E1B]">Reprogramación Fácil</h4>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Avisa con 24 hrs de antelación y conserva tu anticipo.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#009EE3]/20 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#009EE3]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#009EE3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231E1B]">Facturación Disponible</h4>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Solicita tu comprobante fiscal CFDI si lo requieres.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
