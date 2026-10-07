import { Calendar, Sparkles, Star, ChevronDown, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background imagery with luxury gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85"
          alt="Miller Graceland Hair Studio"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0E]/90 via-transparent to-[#0B0B0E]/80" />
        {/* Subtle ambient gold radial light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Pre-title Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181820]/80 border border-[#D4AF37]/30 backdrop-blur-md mb-8 animate-fade-in shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#E6C875] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#E6C875]">
            Alta Peluquería • Colorimetría • Extensiones • Spa Capilar
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF7F2] font-serif-luxury leading-[1.08] mb-6">
          El arte de sublimar tu cabello con <br className="hidden sm:inline" />
          <span className="gold-gradient-text italic font-normal">maestría y elegancia</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#C8C2B7] font-normal leading-relaxed mb-10">
          En <strong className="text-[#F3EFEA] font-semibold">Miller Graceland</strong> fusionamos la ciencia del cuidado capilar con técnicas de autor en balayage, colocación de extensiones de lujo y cortes personalizados para una experiencia inigualable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenBooking}
            className="gold-button w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 group shadow-2xl cursor-pointer"
          >
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Agendar Cita en Línea</span>
          </button>

          <a
            href="#servicios"
            className="gold-button-outline w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explorar Servicios</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-left">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#1A1A22] border border-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#009EE3]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F3EFEA]">Mercado Pago</p>
              <p className="text-[11px] text-[#A6A095]">Reserva 100% segura</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#1A1A22] border border-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-[#E6C875]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F3EFEA]">Meses Sin Intereses</p>
              <p className="text-[11px] text-[#A6A095]">Tarjetas participantes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#1A1A22] border border-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#E6C875] fill-[#E6C875]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F3EFEA]">4.98 / 5 Estrellas</p>
              <p className="text-[11px] text-[#A6A095]">+850 clientas felices</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-lg bg-[#1A1A22] border border-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#E6C875]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F3EFEA]">Marcas Premium</p>
              <p className="text-[11px] text-[#A6A095]">Kérastase, Olaplex, Redken</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
