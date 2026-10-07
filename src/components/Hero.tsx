import { Calendar, ChevronDown, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F9F6F0]">
      {/* Background imagery with luminous warm alabaster overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85"
          alt="Miller Greiseland Hair Studio"
          className="w-full h-full object-cover object-center filter opacity-25 saturate-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-[#F9F6F0]/90 to-[#F9F6F0]/75" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Official Logo & Studio Subtitle */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full border border-[#C8933E]/30 bg-white p-2 shadow-xs mb-3 flex items-center justify-center overflow-hidden">
            <img
              src="/logo-miller.png"
              alt="Miller Greiseland"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-miller.jpeg';
              }}
            />
          </div>

          <div className="inline-flex max-w-[95vw] px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-[#68794E]/10 border border-[#68794E]/25 text-center">
            <span className="text-[9px] sm:text-xs font-bold tracking-tight sm:tracking-[0.18em] uppercase text-[#42502E] leading-normal break-words">
              {SALON_INFO.tagline}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#231E1B] font-serif-luxury leading-[1.18] mb-5">
          El arte de sublimar tu cabello con <br className="hidden sm:inline" />
          <span className="gold-accent-text italic font-normal">maestría y elegancia</span>
        </h1>

        {/* Dedicated Subtitle (without repeating the services mission) */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#5C534B] font-normal leading-relaxed mb-10">
          {SALON_INFO.heroSubtitle}
        </p>

        {/* Action Buttons (Solid colors, no gradient overlays) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenBooking}
            className="gold-button w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita en Línea</span>
          </button>

          <a
            href="#servicios"
            className="gold-button-outline w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Explorar Servicios</span>
            <ChevronDown className="w-4 h-4 text-[#C8933E]" />
          </a>
        </div>

        {/* Factual Value Highlights (No invented reviews or inflated statistics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8 border-t border-[#99745A]/15 text-left">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#009EE3]/10 border border-[#009EE3]/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#009EE3]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Mercado Pago</p>
              <p className="text-[11px] text-[#7A7067]">Reserva con anticipo del 50%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#C8933E]/10 border border-[#C8933E]/25 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-[#C8933E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Meses Sin Intereses</p>
              <p className="text-[11px] text-[#7A7067]">3 y 6 MSI disponibles</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#68794E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Ritual K18</p>
              <p className="text-[11px] text-[#7A7067]">Protección molecular</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#68794E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Asesoría Visagista</p>
              <p className="text-[11px] text-[#7A7067]">Diagnóstico personalizado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
