import { useState, useEffect } from 'react';
import { Sparkles, Calendar, Phone, Menu, X, ShieldCheck } from 'lucide-react';
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
          ? 'bg-[#0E0E10]/95 backdrop-blur-xl border-b border-[#99745A]/25 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0E0E10]/95 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#D19745]/60 flex items-center justify-center bg-gradient-to-br from-[#1C1813] to-[#121113] group-hover:border-[#EFD189] transition-all duration-300 shadow-md">
              <span className="font-serif-luxury text-lg font-bold tracking-widest text-[#EFD189]">MG</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#E7E0DA] uppercase leading-none group-hover:text-[#EFD189] transition-colors">
                Miller Greiseland
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#738259] uppercase font-semibold mt-1">
                Hair & Beauty Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-[#C7BEB5]">
            <a href="#servicios" className="hover:text-[#EFD189] transition-colors">
              Servicios
            </a>
            <a href="#experiencia" className="hover:text-[#EFD189] transition-colors">
              Experiencia
            </a>
            <a href="#estilistas" className="hover:text-[#EFD189] transition-colors">
              Estilistas
            </a>
            <a href="#mercadopago" className="hover:text-[#EFD189] transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#009EE3]" />
              Pagos MP
            </a>
            <a href="#faq" className="hover:text-[#EFD189] transition-colors">
              Preguntas
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-[#C7BEB5] hover:text-[#EFD189] px-3.5 py-2 rounded-full border border-[#99745A]/30 hover:border-[#D19745]/60 transition-all bg-[#161517]"
            >
              <Phone className="w-3.5 h-3.5 text-[#EFD189]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="gold-button flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Cita</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="gold-button px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cita</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E7E0DA] hover:text-[#EFD189] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121114]/98 border-b border-[#99745A]/25 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#E7E0DA]">
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#EFD189] transition-colors"
            >
              Servicios Especializados
            </a>
            <a
              href="#experiencia"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#EFD189] transition-colors"
            >
              Experiencia Miller Greiseland
            </a>
            <a
              href="#estilistas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#EFD189] transition-colors"
            >
              Nuestros Estilistas
            </a>
            <a
              href="#mercadopago"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#EFD189] transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#009EE3]" />
              Pagos con Mercado Pago
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#EFD189] transition-colors"
            >
              Preguntas Frecuentes
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
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
              className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-[#E7E0DA] border border-[#99745A]/30 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#EFD189]" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
