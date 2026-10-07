import { Calendar, Sparkles, Star, ChevronDown, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F9F6F0]">
      {/* Background imagery with luminous warm alabaster gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=85"
          alt="Miller Greiseland Hair Studio"
          className="w-full h-full object-cover object-center filter opacity-30 saturate-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-[#F9F6F0]/85 to-[#F9F6F0]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F6F0] via-[#F9F6F0]/60 to-[#F9F6F0]" />
        
        {/* Subtle warm champagne & olive ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C8933E]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-[#68794E]/8 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Emblem or Logo Pill Banner */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full border border-[#C8933E]/40 bg-white p-2 shadow-md mb-4 flex items-center justify-center overflow-hidden">
            <img
              src="/logo-miller.png"
              alt="Miller Greiseland"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo-miller.jpeg';
              }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#68794E]/12 border border-[#68794E]/30 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C8933E]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#42502E]">
              COLOR · BLONDES · HAIR CARE · EXTENSIONS · SIGNATURE CUTS
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#231E1B] font-serif-luxury leading-[1.08] mb-6">
          El arte de sublimar tu cabello con <br className="hidden sm:inline" />
          <span className="gold-gradient-text italic font-normal">maestría y elegancia</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5C534B] font-normal leading-relaxed mb-10">
          Una experiencia de belleza diseñada para <strong className="text-[#231E1B] font-bold">preservar la salud del cabello</strong>, perfeccionar el color y crear resultados personalizados. El resultado comienza con un cabello sano. <span className="text-[#A87428] font-semibold">El lujo está en cada detalle.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenBooking}
            className="gold-button w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 group shadow-xl cursor-pointer"
          >
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Agendar Cita en Línea</span>
          </button>

          <a
            href="#servicios"
            className="gold-button-outline w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Explorar Servicios</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#C8933E]" />
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#99745A]/20 text-left">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#009EE3]/15 border border-[#009EE3]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#009EE3]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Mercado Pago</p>
              <p className="text-[11px] text-[#7A7067]">Reserva segura MXN</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#C8933E]/15 border border-[#C8933E]/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-[#C8933E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Meses Sin Intereses</p>
              <p className="text-[11px] text-[#7A7067]">3 y 6 MSI en México</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#68794E]/15 border border-[#68794E]/30 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#C8933E] fill-[#C8933E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">4.98 / 5 Estrellas</p>
              <p className="text-[11px] text-[#7A7067]">+850 clientas felices</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#99745A]/15 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#68794E]/15 border border-[#68794E]/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#68794E]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#231E1B]">Marcas Premium</p>
              <p className="text-[11px] text-[#7A7067]">Kérastase, Olaplex</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
