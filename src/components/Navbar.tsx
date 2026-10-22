import { useState, useEffect } from 'react';
import { Calendar, Phone, Menu, X } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { trackWhatsAppClick } from '../lib/analytics';

interface NavbarProps {
  onOpenBooking: () => void;
  sectionLinkPrefix?: '' | '/';
  bookingHref?: string;
  bookingLabel?: string;
  whatsappHref?: string;
}

const desktopLinkClassName = "relative inline-flex min-h-11 items-center py-3 transition-colors hover:text-[#95651F] focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4 after:absolute after:bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#A87428] after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100";

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, sectionLinkPrefix = '', bookingHref, bookingLabel = 'Reservar cita', whatsappHref }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const BookingAction = bookingHref ? 'a' : 'button';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,padding] duration-200 ${
        scrolled
          ? 'bg-[#F9F6F0] border-[#99745A]/20 py-3'
          : 'bg-[#F9F6F0]/90 border-[#99745A]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo with Image */}
          <a href={sectionLinkPrefix || '#'} aria-label="Miller Greiseland Studio · Inicio" className="flex items-center gap-1.5 min-[375px]:gap-2 sm:gap-2.5 group shrink-0 focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4">
            <div className="w-7 h-7 min-[375px]:w-9 min-[375px]:h-9 sm:w-11 sm:h-11 rounded-full border border-[#C8933E]/30 flex items-center justify-center bg-white p-1 group-hover:border-[#A87428] transition-colors duration-200 overflow-hidden shrink-0">
              <img
                src="/logo-miller.png"
                alt="Logo Miller Greiseland"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to jpeg if needed
                  (e.target as HTMLImageElement).src = '/logo-miller.jpeg';
                }}
              />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="flex items-baseline gap-1 sm:gap-2 leading-none whitespace-nowrap">
                <span className="font-serif-luxury text-[14px] min-[375px]:text-base sm:text-xl font-medium tracking-[0.06em] text-[#231E1B]">MILLER</span>{' '}
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-[17px] min-[375px]:text-xl sm:text-[27px] italic font-normal text-[#95651F] sm:text-[#A87428]">Greiseland</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#42502E] uppercase font-medium mt-1.5">
                Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Navegación principal" className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#5C534B]">
            <a href={`${sectionLinkPrefix}#servicios`} className={desktopLinkClassName}>
              Servicios
            </a>
            <a href={`${sectionLinkPrefix}#experiencia`} className={desktopLinkClassName}>
              Experiencia
            </a>
            <a href={`${sectionLinkPrefix}#conoceme`} className={desktopLinkClassName}>
              Conóceme
            </a>
            <a href={`${sectionLinkPrefix}#pagos`} className={desktopLinkClassName}>
              Formas de pago
            </a>
            <a href={`${sectionLinkPrefix}#faq`} className={desktopLinkClassName}>
              Preguntas
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden xl:flex items-center gap-5 shrink-0">
            <a
              href={whatsappHref || `https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('navbar_desktop')}
              className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-[#42502E] hover:text-[#95651F] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
            >
              <Phone className="w-3.5 h-3.5 text-[#68794E]" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <BookingAction
              type={bookingHref ? undefined : 'button'}
              href={bookingHref}
              target={bookingHref ? '_blank' : undefined}
              rel={bookingHref ? 'noopener noreferrer' : undefined}
              onClick={onOpenBooking}
              className="gold-button min-h-11 flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{bookingLabel}</span>
            </BookingAction>
          </div>

          {/* Mobile & Tablet Compact Menu Trigger */}
          <div className="flex xl:hidden items-center gap-1 sm:gap-2 shrink-0">
            <BookingAction
              type={bookingHref ? undefined : 'button'}
              href={bookingHref}
              target={bookingHref ? '_blank' : undefined}
              rel={bookingHref ? 'noopener noreferrer' : undefined}
              onClick={onOpenBooking}
              className="gold-button min-h-11 min-w-11 px-2 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="hidden sm:block w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{bookingLabel}</span>
              <span className="sm:hidden">Cita</span>
            </BookingAction>
            <button
              type="button"
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-11 min-w-11 flex items-center justify-center text-[#231E1B] hover:text-[#95651F] transition-colors rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="xl:hidden bg-[#F9F6F0] border-t border-[#99745A]/15 px-6 py-5 space-y-4"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1 text-base font-medium text-[#3D352F] [&>a]:min-h-11 [&>a]:flex [&>a]:items-center [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-[#231E1B] [&>a]:focus-visible:outline-offset-2">
            <a
              href={`${sectionLinkPrefix}#servicios`}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#95651F] transition-colors"
            >
              Servicios Especializados
            </a>
            <a
              href={`${sectionLinkPrefix}#experiencia`}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#95651F] transition-colors"
            >
              Experiencia Miller Greiseland
            </a>
            <a
              href={`${sectionLinkPrefix}#conoceme`}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#95651F] transition-colors"
            >
              Conóceme
            </a>
            <a
              href={`${sectionLinkPrefix}#pagos`}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#95651F] transition-colors"
            >
              Reservas y formas de pago
            </a>
            <a
              href={`${sectionLinkPrefix}#faq`}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#95651F] transition-colors"
            >
              Preguntas Frecuentes
            </a>
          </nav>

          <div className="pt-4 border-t border-[#99745A]/15 flex flex-col gap-3">
            <BookingAction
              type={bookingHref ? undefined : 'button'}
              href={bookingHref}
              target={bookingHref ? '_blank' : undefined}
              rel={bookingHref ? 'noopener noreferrer' : undefined}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="gold-button min-h-11 w-full py-3 rounded-lg text-center text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{bookingLabel}</span>
            </BookingAction>
            <a
              href={whatsappHref || `https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20agendar%20cita`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('navbar_mobile')}
              className="min-h-11 w-full py-2.5 text-sm font-medium text-[#42502E] hover:text-[#95651F] flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
            >
              <Phone className="w-4 h-4 text-[#68794E]" aria-hidden="true" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
