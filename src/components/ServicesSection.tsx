import { useState } from 'react';
import { Clock, Check, ArrowRight, ShieldCheck, Tag, ChevronDown, Sparkles, Palette, Layers, MessageCircle } from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import type { ServiceCategory, ServiceItem } from '../types/salon';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const categories: { key: ServiceCategory; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'color', label: 'Color' },
    { key: 'blondes', label: 'Signature Blondes' },
    { key: 'extensions', label: 'Extensions' },
    { key: 'cuts', label: 'Signature Cuts' },
  ];

  const toggleDetails = (serviceId: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const filteredServices = activeCategory === 'todos'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="servicios" className="py-24 bg-[#F2EDE3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block max-w-full px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-[#42502E]">
              {SALON_INFO.tagline}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-4">
            MILLER GREISELAND STUDIO
          </h2>
          <p className="text-sm sm:text-base text-[#5C534B] leading-relaxed">
            {SALON_INFO.servicesIntro}
          </p>
        </div>

        {/* Commercial Priorities Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {/* 1. Tratamientos Capilares (WhatsApp CTA) */}
          <div className="p-5 rounded-2xl bg-white border border-[#99745A]/20 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-[#68794E]" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#231E1B] mb-1">
                Tratamientos Capilares
              </h3>
              <p className="text-xs text-[#5C534B] leading-relaxed mb-4">
                Protocolos reconstructivos y nutrición profunda adaptados al estado de tu cabello.
              </p>
            </div>
            <a
              href={SALON_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#68794E] hover:bg-[#576641] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Consultar Tratamientos</span>
            </a>
          </div>

          {/* 2. Tintes y Coloración (Direct filter to Color) */}
          <div className="p-5 rounded-2xl bg-white border border-[#99745A]/20 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C8933E]/10 border border-[#C8933E]/25 flex items-center justify-center mb-3">
                <Palette className="w-5 h-5 text-[#C8933E]" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#231E1B] mb-1">
                Tintes y Coloración
              </h3>
              <p className="text-xs text-[#5C534B] leading-relaxed mb-4">
                Balayage, diseño de color, rubios personalizados y retoque de color con K18.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory('color')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8F5EE] hover:bg-[#EFE9DC] text-[#231E1B] border border-[#99745A]/20 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Ver Servicios de Color</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C8933E]" />
            </button>
          </div>

          {/* 3. Extensiones de Cabello Humano (Direct filter to Extensions) */}
          <div className="p-5 rounded-2xl bg-white border border-[#99745A]/20 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#68794E]/10 border border-[#68794E]/25 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5 text-[#68794E]" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#231E1B] mb-1">
                Extensiones de Cabello Humano
              </h3>
              <p className="text-xs text-[#5C534B] leading-relaxed mb-4">
                100% cabello humano seleccionado. Aplicación, recolocación y retiro profesional.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveCategory('extensions')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8F5EE] hover:bg-[#EFE9DC] text-[#231E1B] border border-[#99745A]/20 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Ver Extensiones</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#68794E]" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Solid palette colors, no emojis, accessible focus) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2 ${
                  isActive
                    ? 'bg-[#68794E] text-white shadow-xs'
                    : 'bg-white text-[#5C534B] border border-[#99745A]/20 hover:border-[#68794E] hover:text-[#231E1B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid (Natural row heights per row, no global auto-rows-fr) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((service) => {
            const isExpanded = !!expandedIds[service.id];

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-[#99745A]/20 hover:border-[#C8933E]/50 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* 1. Fotografía con proporción uniforme */}
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#E8E1D5]">
                  <img
                    src={service.image}
                    alt={service.imageAlt || `${service.name} · Referencia visual ilustrativa`}
                    className={`w-full h-full object-cover ${service.imageObjectPosition || 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Signature Badge */}
                  {service.popular && (
                    <div className="absolute top-3.5 left-3.5 bg-[#C8933E] text-[#231E1B] text-[11px] font-bold tracking-wider px-3 py-1 rounded-full shadow-xs">
                      Signature
                    </div>
                  )}

                  {/* Referencia ilustrativa Badge (únicamente en fotos de stock) */}
                  {service.isIllustrative !== false && (
                    <div className="absolute top-3.5 right-3.5 bg-black/65 backdrop-blur-xs text-white/95 text-[10px] font-medium tracking-wide px-2.5 py-0.5 rounded-full border border-white/20">
                      Referencia ilustrativa
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-xs border border-[#99745A]/20 text-[#231E1B] text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-[#68794E]" />
                    <span>{service.durationMinutes} min</span>
                  </div>
                </div>

                {/* Card Body with ~20px padding */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Contiguous Content Block */}
                  <div className="space-y-3">
                    {/* 2. Nombre del servicio */}
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] group-hover:text-[#A87428] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    
                    {/* 3. Resumen breve de una frase */}
                    <p className="text-xs sm:text-sm text-[#5C534B] leading-relaxed">
                      {service.shortSummary}
                    </p>

                    {/* 4. Precio inicial o rango en MXN e indicación discreta en Signature Blondes */}
                    <div className="pt-2.5 border-t border-[#99745A]/15 space-y-1">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                            {service.priceDisplay}
                          </span>
                          <span className="text-xs font-bold text-[#A87428]">MXN</span>
                        </div>
                        {service.category === 'blondes' && (
                          <span className="text-[11px] font-medium text-[#8A5F20]">
                            Tono base con costo adicional
                          </span>
                        )}
                      </div>

                      {/* 5. Anticipo del 50% sobre el precio mínimo */}
                      <div className="flex items-center gap-1.5 text-xs text-[#5C534B] pt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#68794E] shrink-0" />
                        <span>Anticipo del 50%: ${service.depositMXN.toLocaleString('es-MX')} MXN</span>
                      </div>
                      <p className="text-[10px] text-[#7A7067]">
                        Sobre el precio mínimo publicado.
                      </p>
                    </div>

                    {/* 6. Botón «Ver detalles y tarifas» */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => toggleDetails(service.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`service-details-${service.id}`}
                        id={`service-toggle-${service.id}`}
                        className="w-full py-2 px-3 rounded-xl bg-[#F8F5EE] hover:bg-[#EFE9DC] text-xs font-semibold text-[#68794E] hover:text-[#4B5935] border border-[#99745A]/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#68794E] focus-visible:outline-offset-2"
                      >
                        <span>{isExpanded ? 'Ocultar detalles y tarifas' : 'Ver detalles y tarifas'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Contenido accesible desplegado dentro de «Ver detalles y tarifas» */}
                      {isExpanded && (
                        <div
                          id={`service-details-${service.id}`}
                          role="region"
                          aria-labelledby={`service-toggle-${service.id}`}
                          className="mt-3 pt-3 border-t border-[#99745A]/15 space-y-3 animate-fadeIn"
                        >
                          {/* Tarifas por centímetros o gramaje */}
                          {service.tiers && service.tiers.length > 0 && (
                            <div className="p-2.5 rounded-xl bg-[#F8F5EE]/90 border border-[#99745A]/15 text-xs">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#68794E] flex items-center gap-1.5 mb-1.5">
                                <Tag className="w-3 h-3" />
                                {service.category === 'extensions' ? 'Tarifas por gramaje:' : 'Tarifas por longitud:'}
                              </span>
                              <ul className="divide-y divide-[#99745A]/10">
                                {service.tiers.map((t, idx) => (
                                  <li key={idx} className="flex justify-between items-center py-1 first:pt-0 last:pb-0">
                                    <span className="text-[#554C44]">{t.label}</span>
                                    <span className="font-bold text-[#A87428]">${t.priceMXN.toLocaleString('es-MX')}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Explicaciones y condiciones particulares del servicio */}
                          {service.note && (
                            <div className="px-3 py-2 rounded-lg bg-[#FFF9EE] border border-[#C8933E]/25 text-xs text-[#8A5F20] font-medium leading-relaxed">
                              {service.note}
                            </div>
                          )}

                          {/* Descripción completa */}
                          <div>
                            <p className="text-[11px] font-bold text-[#68794E] uppercase tracking-wider mb-1">
                              Descripción completa:
                            </p>
                            <p className="text-xs sm:text-sm text-[#4A423B] leading-relaxed whitespace-pre-line">
                              {service.description}
                            </p>
                          </div>

                          {/* Inclusiones */}
                          {service.includes && service.includes.length > 0 && (
                            <div className="pt-2 border-t border-[#99745A]/10">
                              <p className="text-[11px] font-bold text-[#68794E] uppercase tracking-wider mb-1.5">
                                El servicio incluye:
                              </p>
                              <ul className="space-y-1">
                                {service.includes.map((inc, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-[#4E443C] leading-snug">
                                    <Check className="w-3.5 h-3.5 text-[#68794E] shrink-0 mt-0.5" />
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 7. Botón «Reservar» alineado al pie */}
                  <div className="mt-auto pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="gold-button w-full px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
                    >
                      <span>Reservar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catalog photography disclaimer */}
        <div className="mt-8 text-center max-w-2xl mx-auto px-4">
          <p className="text-xs text-[#7A7067] italic leading-relaxed">
            * Algunas imágenes del catálogo son referencias ilustrativas.
          </p>
        </div>

        {/* Brand Manifesto Bottom Banner (Una sola vez al terminar el catálogo) */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#99745A]/20 text-center max-w-3xl mx-auto shadow-xs">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] mb-3">
            MILLER GREISELAND SIGNATURE
          </h3>
          <p className="text-sm sm:text-base text-[#5C534B] leading-relaxed">
            Cada servicio es diseñado de manera personalizada de acuerdo con la condición, historial químico, densidad, textura y necesidades de cada cabello.
          </p>
          <div className="mt-4 pt-4 border-t border-[#99745A]/15 text-sm sm:text-base font-medium text-[#231E1B] space-y-1">
            <p>El resultado comienza con un cabello sano.</p>
            <p className="italic text-[#8A5F20]">El lujo está en cada detalle.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
