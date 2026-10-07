import { useState } from 'react';
import { Clock, Check, ArrowRight, ShieldCheck, Tag, ChevronDown } from 'lucide-react';
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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block max-w-full px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-[#42502E]">
              {SALON_INFO.tagline}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-4">
            Carta de Servicios Exclusivos
          </h2>
          <p className="text-sm sm:text-base text-[#5C534B] leading-relaxed">
            {SALON_INFO.servicesIntro}
          </p>

          {/* Category Filter Pills (Solid palette colors, no emojis) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
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
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredServices.map((service) => {
            const isExpanded = !!expandedIds[service.id];

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-[#99745A]/20 hover:border-[#C8933E]/50 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* Service Image Banner */}
                <div className="relative h-56 sm:h-60 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Signature Badge (Solid gold) */}
                  {service.popular && (
                    <div className="absolute top-3.5 left-3.5 bg-[#C8933E] text-white text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full shadow-xs">
                      Signature
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-xs border border-[#99745A]/20 text-[#231E1B] text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-[#68794E]" />
                    <span>{service.durationMinutes} min</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] group-hover:text-[#A87428] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    
                    {service.tagline && (
                      <p className="text-xs text-[#A87428] font-medium mt-1">
                        {service.tagline}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-[#5C534B] mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Pricing Tiers (ALWAYS VISIBLE outside collapsible) */}
                    {service.tiers && service.tiers.length > 0 && (
                      <div className="mt-4 p-3 rounded-2xl bg-[#F8F5EE] border border-[#99745A]/15">
                        <span className="text-xs font-semibold text-[#68794E] block mb-2 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          Tarifas por longitud o gramaje:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {service.tiers.map((t, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-[#99745A]/10 text-xs"
                            >
                              <span className="text-[#554C44] font-medium">{t.label}</span>
                              <span className="text-[#A87428] font-bold">${t.priceMXN.toLocaleString('es-MX')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing Condition Notes (ALWAYS VISIBLE outside collapsible) */}
                    {service.note && (
                      <div className="mt-3 text-xs text-[#8A5F20] bg-[#FFF9EE] p-3 rounded-xl border border-[#C8933E]/25 font-medium leading-relaxed">
                        {service.note}
                      </div>
                    )}

                    {/* Accessible Collapsible: Ver detalles e inclusiones */}
                    <div className="mt-4 pt-3 border-t border-[#99745A]/15">
                      <button
                        type="button"
                        onClick={() => toggleDetails(service.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`service-details-${service.id}`}
                        id={`service-toggle-${service.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#68794E] hover:text-[#4B5935] cursor-pointer py-1 transition-colors"
                      >
                        <span>{isExpanded ? 'Ocultar detalles' : 'Ver detalles e inclusiones'}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div
                          id={`service-details-${service.id}`}
                          role="region"
                          aria-labelledby={`service-toggle-${service.id}`}
                          className="mt-3 pt-3 border-t border-[#99745A]/10 space-y-2 animate-fadeIn"
                        >
                          <p className="text-xs font-semibold text-[#68794E] uppercase tracking-wider">
                            El servicio incluye:
                          </p>
                          <ul className="space-y-1.5">
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
                  </div>

                  {/* Pricing & CTA Footer (Prevents collision / wrapping) */}
                  <div className="mt-6 pt-4 border-t border-[#99745A]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-[#7A7067] block">
                        Inversión
                      </span>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                          {service.priceDisplay}
                        </span>
                        <span className="text-xs font-bold text-[#A87428]">MXN</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#5C534B] mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#009EE3] shrink-0" />
                        <span>Anticipo en línea: ${service.depositMXN} MXN</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="gold-button shrink-0 self-stretch sm:self-auto px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
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

        {/* Brand Manifesto Bottom Banner (No redundant repeats below) */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#99745A]/20 text-center max-w-3xl mx-auto shadow-xs">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] mb-3">
            Miller Greiseland Signature
          </h3>
          <p className="text-sm sm:text-base text-[#5C534B] leading-relaxed">
            {SALON_INFO.manifesto}
          </p>
        </div>

      </div>
    </section>
  );
};
