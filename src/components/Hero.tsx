import { Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { trackWhatsAppClick } from '../lib/analytics';

interface HeroProps {
  onOpenBooking: () => void;
}

const heroShortcuts = [
  {
    title: 'Tratamientos',
    description: 'Valoración por WhatsApp',
    href: SALON_INFO.whatsappUrl,
    isWhatsApp: true,
  },
  {
    title: 'Coloración',
    description: 'Tintes, rubios y balayage',
    href: '#servicios',
    isWhatsApp: false,
  },
  {
    title: 'Extensiones',
    description: '100% cabello humano',
    href: '#servicios',
    isWhatsApp: false,
  },
  {
    title: 'Reservas',
    description: 'Anticipos y formas de pago',
    href: '#pagos',
    isWhatsApp: false,
  },
];

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
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#99745A]/25 shadow-lg bg-[#FAF7F2]">
              <img
                src="/images/hero/portada.webp"
                alt="Miller Greiseland - Estilista profesional, colorimetrista y especialista en extensiones"
                width={1122}
                height={1402}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

        </div>

        <nav aria-label="Accesos rápidos a servicios y reservas" className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-10 text-left">
          {heroShortcuts.map((shortcut) => (
            <a
              key={shortcut.title}
              href={shortcut.href}
              target={shortcut.isWhatsApp ? '_blank' : undefined}
              rel={shortcut.isWhatsApp ? 'noopener noreferrer' : undefined}
              onClick={shortcut.isWhatsApp ? () => trackWhatsAppClick('hero_card_tratamientos', { serviceName: 'Tratamientos Capilares' }) : undefined}
              className="group block border-t border-[#99745A]/25 py-5 text-[#231E1B] hover:border-[#A87428] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
            >
              <span className="flex items-center justify-between gap-2 min-[375px]:gap-3">
                <span className="font-serif-luxury text-xl min-[375px]:text-2xl sm:text-[1.75rem] font-semibold leading-tight group-hover:text-[#42502E] transition-colors duration-200">
                  {shortcut.title}
                </span>
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="w-3 h-3 min-[375px]:w-4 min-[375px]:h-4 shrink-0 text-[#68794E] group-hover:text-[#A87428] transition-colors duration-200" />
              </span>
              <span className="block mt-2 text-xs leading-6 text-[#5C534B]">
                {shortcut.description}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
