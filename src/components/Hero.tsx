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
          alt="Miller Greiseland Hair Studio"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.34] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E10]/95 via-transparent to-[#0E0E10]/85" />
        {/* Ambient gold and olive glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-[#D19745]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-[#738259]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Pre-title Pill with Olive Green and Gold */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181E15]/85 border border-[#738259]/50 backdrop-blur-md mb-8 animate-fade-in shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#EFD189] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#E7E0DA]">
            Alta Peluquería • Colorimetría • Extensiones • Spa Capilar
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F4F0] font-serif-luxury leading-[1.08] mb-6">
          El arte de sublimar tu cabello con <br className="hidden sm:inline" />
          <span className="gold-gradient-text italic font-normal">maestría y elegancia</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#C7BEB5] font-normal leading-relaxed mb-10">
          En <strong className="text-[#E7E0DA] font-semibold">Miller Greiseland</strong> fusionamos la ciencia del cuidado capilar con técnicas de autor en balayage, extensiones de lujo y cortes visagistas para una experiencia inigualable.
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

        {/* Trust Badges Bar with Palette Accents */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#99745A]/25 text-left">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#151417]/60 border border-[#99745A]/20">
            <div className="w-9 h-9 rounded-lg bg-[#18212D] border border-[#009EE3]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#009EE3]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#E7E0DA]">Mercado Pago</p>
              <p className="text-[11px] text-[#A69E93]">Reserva segura MXN</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#151417]/60 border border-[#99745A]/20">
            <div className="w-9 h-9 rounded-lg bg-[#221C14] border border-[#D19745]/40 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-[#EFD189]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#E7E0DA]">Meses Sin Intereses</p>
              <p className="text-[11px] text-[#A69E93]">Tarjetas en México</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#151417]/60 border border-[#99745A]/20">
            <div className="w-9 h-9 rounded-lg bg-[#1D2217] border border-[#738259]/40 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#EFD189] fill-[#EFD189]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#E7E0DA]">4.98 / 5 Estrellas</p>
              <p className="text-[11px] text-[#A69E93]">+850 clientas felices</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#151417]/60 border border-[#99745A]/20">
            <div className="w-9 h-9 rounded-lg bg-[#1D2217] border border-[#738259]/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#8FA06F]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#E7E0DA]">Marcas Premium</p>
              <p className="text-[11px] text-[#A69E93]">Kérastase, Olaplex</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
