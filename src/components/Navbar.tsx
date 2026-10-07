import { useState, useEffect } from 'react';
import { Calendar, Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F9F6F0]/95 backdrop-blur-xl border-b border-[#99745A]/15 py-3 shadow-md'
          : 'bg-[#F9F6F0]/85 backdrop-blur-md border-b border-[#99745A]/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Image */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#C8933E]/40 flex items-center justify-center bg-white p-1 shadow-xs group-hover:border-[#C8933E] group-hover:scale-105 transition-all duration-300 overflow-hidden shrink-0">
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
              <span className="font-serif-luxury text-base sm:text-2xl font-bold tracking-wide sm:tracking-[0.16em] text-[#231E1B] uppercase leading-none whitespace-nowrap group-hover:text-[#C8933E] transition-colors">
                Miller Greiseland
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#68794E] uppercase font-bold mt-1">
                Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold tracking-wider text-[#5C534B]">
            <a href="#servicios" className="hover:text-[#C8933E] transition-colors">
              Servicios
            </a>
            <a href="#experiencia" className="hover:text-[#C8933E] transition-colors">
              Experiencia
            </a>
            <a href="#conoceme" className="hover:text-[#C8933E] transition-colors">
              Conóceme
            </a>
            <a href="#mercadopago" className="hover:text-[#009EE3] transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#009EE3]" />
              Pagos MP
            </a>
            <a href="#faq" className="hover:text-[#C8933E] transition-colors">
              Preguntas
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <a
              href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-[#4A423B] hover:text-[#231E1B] px-3.5 py-2 rounded-full border border-[#99745A]/25 hover:border-[#C8933E] transition-all bg-white shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#68794E]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="gold-button flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Cita</span>
            </button>
          </div>

          {/* Mobile & Tablet Compact Menu Trigger */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className="gold-button px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reservar Cita</span>
              <span className="sm:hidden">Cita</span>
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-[#231E1B] hover:text-[#C8933E] transition-colors rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="xl:hidden bg-[#FAF7F2] border-b border-[#99745A]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-xl"
        >
          <nav className="flex flex-col space-y-3 text-base font-semibold text-[#3D352F]">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8933E] transition-colors"
            >
              Servicios Especializados
            </a>
            <a
              href="#experiencia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8933E] transition-colors"
            >
              Experiencia Miller Greiseland
            </a>
            <a
              href="#conoceme"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8933E] transition-colors"
            >
              Conóceme
            </a>
            <a
              href="#mercadopago"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#009EE3] transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#009EE3]" />
              Pagos con Mercado Pago
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C8933E] transition-colors"
            >
              Preguntas Frecuentes
            </a>
          </nav>

          <div className="pt-4 border-t border-[#99745A]/15 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="gold-button w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar con Mercado Pago</span>
            </button>
            <a
              href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20agendar%20cita`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-[#3D352F] border border-[#99745A]/25 bg-white flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#68794E]" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
