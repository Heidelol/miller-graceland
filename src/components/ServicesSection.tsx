import { useState } from 'react';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/salonData';
import type { ServiceCategory, ServiceItem } from '../types/salon';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('todos');

  const categories: { key: ServiceCategory; label: string; icon: string }[] = [
    { key: 'todos', label: 'Todos', icon: '✨' },
    { key: 'colorimetria', label: 'Colorimetría', icon: '🎨' },
    { key: 'extensiones', label: 'Estilistas & Extensiones', icon: '💇‍♀️' },
    { key: 'tratamientos', label: 'Tratamientos Capilares', icon: '🌿' },
    { key: 'cortes', label: 'Cortes & Diseño', icon: '✂️' },
  ];

  const filteredServices = activeCategory === 'todos'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="servicios" className="py-24 bg-[#0E0E12] relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181820] border border-[#D4AF37]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C875]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E6C875]">
              Carta de Servicios Exclusivos
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#F5F2EB] mb-4">
            Especialidades diseñadas para tu estilo
          </h2>
          <p className="text-sm sm:text-base text-[#B3ACA0] leading-relaxed">
            Cada servicio en <strong className="text-[#E6C875]">Miller Graceland</strong> es ejecutado con productos de alta gama y técnicas avanzadas que protegen la salud de tu hebra capilar.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E6C875] to-[#D4AF37] text-[#0B0B0C] shadow-lg shadow-[#D4AF37]/20 scale-105'
                      : 'bg-[#181822] text-[#C7C0B3] border border-white/5 hover:border-[#D4AF37]/40 hover:text-[#F5F2EB]'
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
              className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-[#D4AF37]/15 hover:border-[#D4AF37]/50"
            >
              {/* Service Image Banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161C] via-[#16161C]/30 to-transparent" />

                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C875] text-[#0B0B0C] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Más Solicitado</span>
                  </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-[#0B0B0E]/80 backdrop-blur-md border border-white/10 text-[#E5E0D8] text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E6C875]" />
                  <span>{service.durationMinutes} min</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#FAF7F2] group-hover:text-[#E6C875] transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#E6C875]/80 font-medium tracking-wide mt-1 italic">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A8A194] mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included bullets */}
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C2B79B]">
                      Incluye:
                    </p>
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#CCC5B9]">
                        <Check className="w-3.5 h-3.5 text-[#E6C875] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA Footer */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#9E9689] block">
                      Inversión
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-[#F5F2EB] font-serif-luxury">
                        ${service.priceMXN.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-semibold text-[#E6C875]">MXN</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#A69E90] mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-[#009EE3]" />
                      <span>Anticipo: ${service.depositMXN} MXN</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="gold-button px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
