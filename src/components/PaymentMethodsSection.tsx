import { ValuationLink } from './ValuationLink';

export function PaymentMethodsSection() {
  return (
    <section id="pagos" aria-labelledby="booking-information-title" className="py-14 sm:py-20 bg-[#F2EDE3] border-y border-[#99745A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-12">
        <div className="max-w-2xl">
          <h2 id="booking-information-title" className="font-serif-luxury text-3xl sm:text-5xl font-medium leading-tight text-[#231E1B]">Coordinemos tu <em className="font-normal text-[#A87428]">próxima visita.</em></h2>
          <p className="mt-4 text-sm leading-7 text-[#5C534B]">Escríbenos por WhatsApp. La persona que coordina la agenda te ayudará con la disponibilidad y todos los detalles de tu cita.</p>
        </div>
        <ValuationLink location="payment_valuation" className="gold-button self-start md:shrink-0 min-h-11 px-6 py-3 rounded-lg text-sm font-semibold">Solicitar valoración</ValuationLink>
      </div>
    </section>
  );
}
