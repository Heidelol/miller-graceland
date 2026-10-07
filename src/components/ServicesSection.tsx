import { useState } from 'react';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import type { ServiceCategory, ServiceItem } from '../types/salon';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');

  const categories: { key: ServiceCategory; label: string; icon: string }[] = [
    { key: 'todos', label: 'Todos', icon: '✨' },
    { key: 'color', label: 'Color', icon: '🎨' },
    { key: 'blondes', label: 'Signature Blondes', icon: '💎' },
    { key: 'extensions', label: 'Extensions', icon: '💇‍♀️' },
    { key: 'cuts', label: 'Signature Cuts', icon: '✂️' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="servicios" className="py-24 bg-[#F2EDE3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C8933E]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#42502E]">
              {SALON_INFO.tagline}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-4">
            Carta de Servicios Exclusivos
          </h2>
          <p className="text-sm sm:text-base text-[#61574E] leading-relaxed">
            {SALON_INFO.mission}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-xs ${
                    isActive
                      ? 'bg-gradient-to-r from-[#68794E] to-[#C8933E] text-white shadow-md scale-105'
                      : 'bg-white text-[#5C534B] border border-[#99745A]/20 hover:border-[#68794E] hover:text-[#231E1B]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden flex flex-col group border border-[#99745A]/20 hover:border-[#C8933E]/60 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Service Image Banner */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-[#DFAC58] to-[#C8933E] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Signature</span>
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md border border-[#99745A]/25 text-[#231E1B] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#68794E]" />
                  <span>{service.durationMinutes} min</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] group-hover:text-[#A87428] transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#A87428] font-bold tracking-wide mt-1 italic">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#61574E] mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price Tiers if available */}
                  {service.tiers && service.tiers.length > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-[#F8F5EE] border border-[#99745A]/15">
                      <span className="text-[10px] uppercase tracking-wider text-[#68794E] font-bold block mb-1.5 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Opciones de Longitud / Gramaje:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {service.tiers.map((t, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white px-2 py-1 rounded border border-[#99745A]/10 text-[11px]">
                            <span className="text-[#554C44] font-medium">{t.label}</span>
                            <span className="text-[#A87428] font-bold">${t.priceMXN}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note if available */}
                  {service.note && (
                    <div className="mt-3 text-[11px] text-[#A87428] bg-[#FFF9EE] p-2 rounded-lg border border-[#C8933E]/20 font-medium">
                      {service.note}
                    </div>
                  )}

                  {/* Included bullets */}
                  <div className="mt-5 pt-4 border-t border-[#99745A]/15 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#68794E]">
                      Incluye:
                    </p>
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#4E443C]">
                        <Check className="w-3.5 h-3.5 text-[#68794E] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA Footer */}
                <div className="mt-7 pt-5 border-t border-[#99745A]/15 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8F8378] block font-bold">
                      Inversión
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[#231E1B] font-serif-luxury">
                        {service.priceDisplay}
                      </span>
                      <span className="text-xs font-bold text-[#A87428]">MXN</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#6E6359] mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-[#009EE3]" />
                      <span>Anticipo MP: ${service.depositMXN} MXN</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Manifesto Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#99745A]/20 text-center max-w-4xl mx-auto shadow-sm">
          <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] block mb-2">
            Miller Greiseland Signature
          </span>
          <p className="text-sm text-[#61574E] italic max-w-2xl mx-auto">
            "{SALON_INFO.signatureManifesto}"
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[#68794E]">
            <span>El resultado comienza con un cabello sano.</span>
            <span>•</span>
            <span className="text-[#C8933E]">El lujo está en cada detalle.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
