import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { ValuationLink } from './ValuationLink';

export const PaymentMethodsSection: React.FC = () => {
  return (
    <section id="pagos" aria-labelledby="booking-information-title" className="py-16 sm:py-20 bg-[#F2EDE3] relative border-y border-[#99745A]/15">
      <div id="mercadopago" className="absolute -top-24 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68794E] mb-4">
              Reservas y formas de pago
            </p>
            <h2 id="booking-information-title" className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.06] text-[#231E1B] max-w-sm">
              Prepara tu<br />próxima visita.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5C534B] max-w-sm">
              Solicita una valoración por WhatsApp. En el salón, Miller te orienta sobre el servicio y confirma contigo el precio final.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-5">
              <ValuationLink
                location="payment_valuation"
                className="gold-button px-7 py-3.5 rounded-full text-sm cursor-pointer"
              >
                Solicitar valoración
              </ValuationLink>
              <ValuationLink
                location="payment_methods"
                className="text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/50 hover:decoration-[#42502E] transition-colors focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
              >
                Consultar por WhatsApp
              </ValuationLink>
            </div>
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#99745A]/25 pt-8 lg:pt-0 lg:pl-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="font-serif-luxury text-7xl sm:text-8xl font-medium leading-none tracking-tight text-[#A87428]">
                50%
              </p>
              <div className="max-w-60">
                <h3 className="font-serif-luxury text-2xl font-semibold text-[#231E1B]">
                  Anticipo para reservar
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5C534B]">
                  Sobre el precio mínimo publicado del servicio.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#5C534B]">
              En servicios con rango de precios o tarifas por longitud o gramaje, el precio final se confirma tras la valoración en el salón. Se descuenta el anticipo efectivamente recibido.
            </p>

            <div className="mt-6 pt-5 border-t border-[#99745A]/25">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#68794E]">
                Formas de pago
              </h3>
              <ul className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm font-medium text-[#231E1B]">
                {['Transferencia', 'Efectivo', 'Tarjeta en el salón'].map((method, index) => (
                  <li key={method} className="flex items-baseline gap-4">
                    {index > 0 && <span aria-hidden="true" className="text-[#99745A]">·</span>}
                    {method}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-6 text-[#5C534B]">
                Los datos para transferencia se comparten por WhatsApp. Efectivo y tarjeta disponibles en el salón.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#99745A]/25 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
          <h3 className="md:col-span-4 lg:col-span-5 font-serif-luxury text-xl font-semibold text-[#231E1B]">
            Cambios de cita y anticipos
          </h3>
          <p className="md:col-span-8 lg:col-span-7 text-sm leading-7 text-[#5C534B]">
            {SALON_INFO.cancellationPolicy}
          </p>
        </div>
      </div>
    </section>
  );
};
