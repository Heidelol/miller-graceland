import { Calendar, ChevronDown, Sparkles, Palette, Layers, CreditCard, MessageCircle, ArrowRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F9F6F0]">
      {/* Elegant, luminous architectural gradient backdrop without stock salon photography */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C8933E]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#68794E]/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F6F0]/60 via-[#F9F6F0] to-[#F9F6F0]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Hero Grid: Left Content / Right Photograph (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
          
          {/* Left Column: Presentation & Actions */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
            
            {/* Official Logo & Studio Subtitle */}
            <div className="flex flex-col items-center lg:items-start mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#C8933E]/30 bg-white p-2 shadow-xs mb-3 flex items-center justify-center overflow-hidden">
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
                <span className="text-[9px] sm:text-xs font-bold tracking-tight sm:tracking-[0.16em] uppercase text-[#42502E] leading-normal break-words">
                  {SALON_INFO.tagline}
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231E1B] font-serif-luxury leading-[1.15] mb-5">
              El arte de sublimar tu cabello con <br className="hidden sm:inline" />
              <span className="gold-accent-text italic font-normal">maestría y elegancia</span>
            </h1>

            {/* Dedicated Subtitle (Official business positioning) */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg text-[#5C534B] font-normal leading-relaxed mb-8">
              {SALON_INFO.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="gold-button w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Solicitar Cita</span>
              </button>

              <a
                href="#servicios"
                className="gold-button-outline w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
              >
                <span>Explorar Servicios</span>
                <ChevronDown className="w-4 h-4 text-[#C8933E]" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Photograph (Desktop: right; Mobile: below actions, contained size) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#99745A]/25 shadow-lg bg-[#E8E1D5]">
              <img
                src="/images/hero/resultado-color.webp"
                alt="Resultado de colorimetría y diseño capilar en Miller Greiseland Studio"
                width={720}
                height={1280}
                className="w-full h-full object-cover object-[center_32%] transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

        </div>

        {/* Commercial Priorities & Reservation Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto pt-8 border-t border-[#99745A]/15 text-left">
          
          {/* 1. Tratamientos Capilares (WhatsApp CTA) */}
          <a
            href={SALON_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#99745A]/20 hover:border-[#68794E] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#68794E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231E1B] group-hover:text-[#4B5935] transition-colors">Tratamientos Capilares</p>
                <p className="text-[11px] text-[#7A7067]">Valoración por WhatsApp</p>
              </div>
            </div>
            <MessageCircle className="w-4 h-4 text-[#68794E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
          </a>

          {/* 2. Tintes y Coloración */}
          <a
            href="#servicios"
            className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#99745A]/20 hover:border-[#C8933E] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C8933E]/10 border border-[#C8933E]/25 flex items-center justify-center shrink-0">
                <Palette className="w-4 h-4 text-[#C8933E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231E1B] group-hover:text-[#A87428] transition-colors">Tintes y Coloración</p>
                <p className="text-[11px] text-[#7A7067]">Técnicas y balayage</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8933E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
          </a>

          {/* 3. Extensiones de Cabello Humano */}
          <a
            href="#servicios"
            className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#99745A]/20 hover:border-[#C8933E] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-[#68794E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231E1B] group-hover:text-[#4B5935] transition-colors">Extensiones de Cabello</p>
                <p className="text-[11px] text-[#7A7067]">100% cabello humano</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#68794E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
          </a>

          {/* 4. Reservas y Formas de Pago */}
          <a
            href="#pagos"
            className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#99745A]/20 hover:border-[#68794E] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C8933E]/10 border border-[#C8933E]/25 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-[#C8933E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231E1B] group-hover:text-[#A87428] transition-colors">Reservas y Pagos</p>
                <p className="text-[11px] text-[#7A7067]">Efectivo, trans. y terminal</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8933E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
          </a>

        </div>
      </div>
    </section>
  );
};
