import { Phone, MapPin, Clock, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-[#EAE3D6] border-t border-[#99745A]/25 pt-16 pb-12 text-[#554C44] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Column 1: Brand & Logo */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#C8933E]/50 flex items-center justify-center bg-white p-1.5 shadow-sm overflow-hidden">
                  <img
                    src="/logo-miller.png"
                    alt="Logo Miller Greiseland"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo-miller.jpeg';
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#231E1B] uppercase leading-none">
                    Miller Greiseland
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#68794E] uppercase font-bold mt-1">
                    Studio
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#63584F] leading-relaxed">
                {SALON_INFO.footerAbout}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <div className="px-3 py-1 rounded-lg bg-white border border-[#009EE3]/40 text-[#009EE3] text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Mercado Pago Oficial</span>
                </div>
              </div>
            </div>

            {/* Column 2: Ubicación & Contacto */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#231E1B]">
                Ubicación & Contacto
              </h4>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8933E] shrink-0 mt-0.5" />
                <span className="text-[#3D352E]">{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#68794E] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="text-[#3D352E] hover:text-[#C8933E] font-medium transition-colors">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#C8933E] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3D352E] hover:text-[#C8933E] font-medium transition-colors"
                >
                  {SALON_INFO.instagram}
                </a>
              </div>
            </div>

            {/* Column 3: Horarios de Atención */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#231E1B]">
                Horarios de Estudio
              </h4>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#68794E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[#231E1B] font-bold">Lunes a Sábado:</p>
                  <p className="text-[#3D352E]">9:00 AM – 8:00 PM</p>
                  <p className="text-[#231E1B] font-bold pt-1">Domingos:</p>
                  <p className="text-[#3D352E]">Atención exclusiva previa cita</p>
                </div>
              </div>
            </div>

            {/* Column 4: Políticas & Seguridad */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#231E1B]">
                Garantías & Políticas
              </h4>
              <ul className="space-y-1.5 text-[11px] text-[#554C44]">
                <li>• Diagnóstico capilar sin costo en tu servicio.</li>
                <li>• Reprogramación flexible con 24 hrs de antelación.</li>
                <li>• Cobros procesados en MXN vía Mercado Pago.</li>
                <li>• Protocolos de higiene y sanitización continua.</li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="border-t border-[#99745A]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6B6158]">
            <p>© {CURRENT_YEAR} Miller Greiseland. Todos los derechos reservados.</p>
            <div className="flex items-center gap-1">
              <span>Diseñado con</span>
              <Heart className="w-3.5 h-3.5 text-[#C8933E] fill-[#C8933E]" />
              <span>para amantes del cabello impecable</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${SALON_INFO.whatsapp}?text=Hola%20Miller%20Greiseland,%20quisiera%20asesor%C3%ADa%20personalizada`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 bg-[#25D366] text-black px-4 py-3 rounded-full shadow-2xl hover:bg-[#20BE5A] transition-all hover:scale-105"
        title="Chatear por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold hidden sm:inline">¿Dudas? Escríbenos</span>
      </a>
    </>
  );
};
