import { ArrowUpRight, ArrowRight } from 'lucide-react';
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
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Hero Grid: Left Content / Right Photograph (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 lg:mb-20">
          
          {/* Left Column: Presentation & Actions */}
          <div className="hero-enter lg:col-span-7 flex flex-col items-start text-left">
            
            <p className="mb-6 lg:mb-8 text-[9px] sm:text-[11px] font-medium tracking-[0.1em] sm:tracking-[0.16em] uppercase text-[#42502E] leading-6">
              {SALON_INFO.tagline}
            </p>

            {/* Main Title */}
            <h1 className="text-[2.1rem] min-[375px]:text-[2.5rem] sm:text-5xl lg:text-[clamp(2.75rem,4.5vw,4rem)] font-medium tracking-tight text-[#231E1B] font-serif-luxury leading-[1.08] mb-6 lg:mb-8">
              <span className="block">El arte de sublimar</span>{' '}
              <span className="block">tu cabello con</span>{' '}
              <span className="block gold-accent-text italic font-normal">maestría y elegancia</span>
            </h1>

            {/* Dedicated Subtitle (Official business positioning) */}
            <p className="max-w-lg text-sm sm:text-base text-[#5C534B] font-normal leading-7 mb-7 lg:mb-9">
              {SALON_INFO.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <button
                onClick={onOpenBooking}
                className="gold-button min-h-12 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
              >
                <span>Solicitar Cita</span>
              </button>

              <a
                href="#servicios"
                className="min-h-12 py-3 text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#A87428] hover:decoration-[#A87428] inline-flex items-center gap-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
              >
                <span>Explorar servicios</span>
                <ArrowUpRight className="w-4 h-4 text-[#A87428]" aria-hidden="true" />
              </a>
            </div>

          </div>

          {/* Right Column: Hero Photograph (Desktop: right; Mobile: below actions, contained size) */}
          <figure className="hero-enter hero-enter-photo lg:col-span-5 w-full max-w-sm sm:max-w-md mx-auto lg:ml-auto lg:mr-0">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#FAF7F2]">
              <img
                src="/images/hero/portada.webp"
                alt="Miller Greiseland - Estilista profesional, colorimetrista y especialista en extensiones"
                width={1122}
                height={1402}
                fetchPriority="high"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <figcaption className="mt-4 flex flex-col gap-1 text-left">
              <span className="font-serif-luxury text-xl font-semibold text-[#231E1B]">Miller Greiseland</span>
              <span className="text-[10px] sm:text-xs leading-5 text-[#5C534B]">Colorimetrista y especialista en extensiones</span>
            </figcaption>
          </figure>

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
