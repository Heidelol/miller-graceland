import { useState } from 'react';
import { Clock, Check, ArrowRight, ArrowUpRight, Tag, ChevronDown } from 'lucide-react';
import { PUBLIC_SERVICES, SALON_INFO } from '../data/salonData';
import type { ServiceCategory, ServiceItem } from '../types/salon';
import { trackWhatsAppClick, trackServiceInterest } from '../lib/analytics';
import { PhotoCarousel } from './PhotoCarousel';
import { STUDIO_PHOTOS } from '../data/studioPhotos';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'color-family'>('todos');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const categories: { key: ServiceCategory | 'color-family'; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'color-family', label: 'Color y rubios' },
    { key: 'color', label: 'Color' },
    { key: 'blondes', label: 'Signature Blondes' },
    { key: 'extensions', label: 'Extensions' },
  ];

  const toggleDetails = (serviceId: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const filteredServices = activeCategory === 'todos'
    ? PUBLIC_SERVICES
    : PUBLIC_SERVICES.filter((s) => activeCategory === 'color-family'
      ? s.category === 'color' || s.category === 'blondes'
      : s.category === activeCategory);

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
          <h2 className="flex flex-col items-center text-[#231E1B] mb-5">
            <span className="flex flex-col sm:flex-row items-center justify-center gap-y-1 gap-x-4">
              <span className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[0.04em] leading-tight">
                MILLER
              </span>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl sm:text-[2.75rem] lg:text-[3.5rem] italic font-normal leading-tight text-[#A87428]">
                Greiseland
              </span>
            </span>
            <span className="mt-3 font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.4em] leading-6">
              STUDIO
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C534B] leading-relaxed">
            {SALON_INFO.servicesIntro}
          </p>
        </div>

        {/* Fotografías de las tres prioridades comerciales. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-10 max-w-5xl mx-auto mb-14">
          {[
            { title: 'Tratamientos Capilares', images: STUDIO_PHOTOS.treatments, description: 'Protocolos reconstructivos y nutrición profunda adaptados al estado de tu cabello.', action: 'Consultar Tratamientos', category: null },
            { title: 'Tintes y Coloración', images: STUDIO_PHOTOS.color, description: 'Diseño de color, retoques y rubios personalizados según tu cabello y el resultado que buscas.', action: 'Ver color y rubios', category: 'color-family' as const },
            { title: 'Extensiones de Cabello Humano', images: STUDIO_PHOTOS.extensions, description: '100% cabello humano seleccionado. Aplicación, recolocación y retiro profesional.', action: 'Ver Extensiones', category: 'extensions' as const },
          ].map((priority) => (
            <article key={priority.title} className="flex flex-col min-w-0">
              <PhotoCarousel images={priority.images} label={priority.title} frameClassName="aspect-[4/3] rounded-xl" />
              <div className="pt-5 flex flex-col flex-1 items-start">
                <h3 className="font-serif-luxury text-2xl font-semibold leading-tight text-[#231E1B] mb-3">{priority.title}</h3>
                <p className="text-[13px] text-[#5C534B] leading-6 mb-3">{priority.description}</p>
                {priority.category ? (
                  <button type="button" onClick={() => setActiveCategory(priority.category)} className="mt-auto min-h-11 py-2 text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#A87428] hover:decoration-[#A87428] inline-flex items-center gap-2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4">
                    {priority.action}<ArrowRight className="w-3.5 h-3.5 text-[#A87428]" aria-hidden="true" />
                  </button>
                ) : (
                  <a href={SALON_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick('services_card_tratamientos', { serviceName: 'Tratamientos Capilares' })} className="mt-auto min-h-11 py-2 text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#A87428] hover:decoration-[#A87428] inline-flex items-center gap-2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4">
                    {priority.action}<ArrowRight className="w-3.5 h-3.5 text-[#A87428]" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div role="group" aria-label="Filtrar servicios" className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-1 mb-9">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                aria-pressed={isActive}
                className={`min-h-11 px-1 py-3 border-b-2 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4 ${
                  isActive
                    ? 'border-[#68794E] text-[#42502E]'
                    : 'border-transparent text-[#5C534B] hover:border-[#68794E]/40 hover:text-[#42502E]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="service-catalog">
          {filteredServices.map((service) => {
            const isExpanded = !!expandedIds[service.id];

            return (
              <article
                key={service.id}
                data-service-id={service.id}
                className="service-catalog-card"
              >
                {/* 1. Fotografía con proporción uniforme */}
                <div className="relative aspect-[16/9] w-full shrink-0 rounded-xl overflow-hidden bg-[#E8E1D5]">
                  {service.photo ? (
                    <PhotoCarousel images={[service.photo]} label={service.name} frameClassName="h-full" />
                  ) : <img
                    src={service.image}
                    alt={service.imageAlt || `${service.name} · Referencia visual ilustrativa`}
                    className={`w-full h-full object-cover ${service.imageObjectPosition || 'object-center'}`}
                    loading="lazy"
                    decoding="async"
                  />}
                  {/* Referencia ilustrativa Badge (únicamente en fotos de stock) */}
                  {service.isIllustrative !== false && (
                    <div className="absolute pointer-events-none top-3 right-3 bg-[#231E1B]/80 text-white text-[10px] font-medium px-2 py-1 rounded-full">
                      Referencia ilustrativa
                    </div>
                  )}

                </div>

                <div className="pt-3 pb-4">
                  <div className="flex items-center justify-between gap-3 text-[10px] leading-5 text-[#42502E]">
                    <span className="font-medium uppercase tracking-[0.08em]">
                      {categories.find((category) => category.key === service.category)?.label}
                    </span>
                    <span className="inline-flex items-center gap-1 shrink-0 text-[#5C534B]">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {service.durationMinutes} min
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-semibold text-[#231E1B] leading-tight mt-2">
                    {service.name}
                  </h3>
                  <p className="text-[13px] text-[#5C534B] leading-6 mt-2">
                    {service.shortSummary}
                  </p>
                  {service.category === 'blondes' && (
                    <p className="text-[11px] leading-5 text-[#8A5F20] mt-2">
                      Tono base con costo adicional
                    </p>
                  )}
                </div>

                <div className="service-catalog-pricing pt-3 border-t border-[#99745A]/25">
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[#231E1B]">
                    <span className="text-[28px] font-semibold font-serif-luxury leading-tight tracking-tight">
                      {service.priceDisplay}
                    </span>
                    <span className="text-[10px] font-medium text-[#5C534B]">MXN</span>
                  </div>
                  <p className="text-[11px] leading-6 text-[#5C534B] mt-1">
                    Anticipo: ${service.depositMXN.toLocaleString('es-MX')} MXN · 50% del mínimo
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleDetails(service.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`service-details-${service.id}`}
                      id={`service-toggle-${service.id}`}
                      aria-label={`${isExpanded ? 'Ocultar' : 'Ver'} detalles y tarifas de ${service.name}`}
                      className="min-h-11 py-2 text-xs font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#95651F] hover:decoration-[#95651F] inline-flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
                    >
                      <span>{isExpanded ? 'Ocultar detalles' : 'Ver detalles'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        trackServiceInterest(service.id, service.name, service.priceMXN, service.category);
                        onSelectService(service);
                      }}
                      aria-label={`Reservar ${service.name}`}
                      className="gold-button min-h-11 px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
                    >
                      <span>Reservar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Contenido accesible desplegado dentro de «Ver detalles y tarifas» */}
                {isExpanded && (
                  <div
                    id={`service-details-${service.id}`}
                    role="region"
                    aria-labelledby={`service-toggle-${service.id}`}
                    className="mt-4 pt-4 border-t border-[#99745A]/25 space-y-4"
                  >
                    {/* Tarifas por centímetros o gramaje */}
                    {service.tiers && service.tiers.length > 0 && (
                      <div className="text-xs">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-[#42502E] flex items-center gap-1.5 mb-2">
                          <Tag className="w-3 h-3" aria-hidden="true" />
                          {service.category === 'extensions' ? 'Tarifas por gramaje:' : 'Tarifas por longitud:'}
                        </span>
                        <ul className="divide-y divide-[#99745A]/10">
                          {service.tiers.map((t, idx) => (
                            <li key={idx} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                              <span className="text-[#554C44]">{t.label}</span>
                              <span className="font-medium text-[#231E1B]">${t.priceMXN.toLocaleString('es-MX')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Explicaciones y condiciones particulares del servicio */}
                    {service.note && (
                      <div className="text-xs text-[#8A5F20] leading-relaxed">
                        {service.note}
                      </div>
                    )}

                    {/* Descripción completa */}
                    <div>
                      <p className="text-[11px] font-medium text-[#42502E] uppercase tracking-wider mb-2">
                        Sobre este servicio
                      </p>
                      <p className="text-xs sm:text-sm text-[#4A423B] leading-relaxed whitespace-pre-line">
                        {service.description}
                      </p>
                    </div>

                    {/* Inclusiones */}
                    {service.includes && service.includes.length > 0 && (
                      <div className="pt-2 border-t border-[#99745A]/10">
                        <p className="text-[11px] font-medium text-[#42502E] uppercase tracking-wider mb-2">
                          El servicio incluye:
                        </p>
                        <ul className="space-y-1">
                          {service.includes.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#4E443C] leading-snug">
                              <Check className="w-3.5 h-3.5 text-[#68794E] shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Catalog photography disclaimer */}
        <div className="mt-8 text-center max-w-2xl mx-auto px-4">
          <p className="text-xs text-[#7A7067] italic leading-relaxed">
            * Algunas imágenes del catálogo son referencias ilustrativas.
          </p>
        </div>

        {/* Cierre editorial del catálogo con el manifiesto oficial. */}
        <div className="mt-16 sm:mt-20 text-center max-w-3xl mx-auto">
          <div className="w-12 h-px mx-auto mb-6 bg-[#A87428]/50" aria-hidden="true" />
          <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-[#42502E] mb-4">
            MILLER GREISELAND SIGNATURE
          </p>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#231E1B] leading-[1.12] mb-5">
            El resultado comienza{' '}
            <span className="block">con un <em className="gold-accent-text font-normal">cabello sano.</em></span>
          </h3>
          <p className="max-w-2xl mx-auto text-sm text-[#5C534B] leading-7">
            Cada servicio es diseñado de manera personalizada de acuerdo con la condición, historial químico, densidad, textura y necesidades de cada cabello.
          </p>
          <p className="font-serif-luxury text-2xl italic text-[#8A5F20] leading-snug mt-5">El lujo está en cada detalle.</p>
        </div>

      </div>
    </section>
  );
};
