import React from 'react';
import { Sparkles, CheckCircle2, Globe, Heart, ShieldCheck } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const confirmedBrands = [
    { name: 'Avyna', focus: 'Cosmética y cuidado capilar profesional' },
    { name: 'Chocolatto', focus: 'Nutrición y tratamientos capilares' },
    { name: 'Schwarzkopf', focus: 'Coloración y tecnología de aclaración' },
    { name: 'Wella', focus: 'Formulación y matices profesionales' },
  ];

  const methodologyPillars = [
    {
      icon: <Globe className="w-5 h-5 text-[#68794E]" />,
      title: 'Formación Internacional',
      description: 'Nuestra formación en más de 20 países nos permite incorporar técnicas de coloración, decoloración y extensiones con un estándar riguroso.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C8933E]" />,
      title: 'Colorimetría & Decoloración',
      description: 'Diseño de color, rubios y matices a la medida de tu objetivo, evaluando el historial químico y la resistencia de tu cabello.'
    },
    {
      icon: <Heart className="w-5 h-5 text-[#A87428]" />,
      title: 'Extensiones 100% Cabello Humano',
      description: 'Colocación, mantenimiento y bajada profesional priorizando la salud del cabello natural y el movimiento impecable de las extensiones.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#42502E]" />,
      title: 'Atención con Cita Previa',
      description: 'Cada servicio se agenda con tiempo dedicado para brindarte una atención personalizada, cuidando cada detalle de tu proceso.'
    }
  ];

  return (
    <section id="experiencia" className="py-20 sm:py-24 bg-[#F9F6F0] relative overflow-hidden border-t border-[#99745A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C8933E]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#42502E]">
              Filosofía & Marcas Profesionales
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] leading-tight mb-5">
            Técnicas internacionales y <br className="hidden sm:inline" />
            <span className="gold-accent-text italic font-normal">atención personalizada</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C534B] leading-relaxed">
            Especialistas en colorimetría y extensiones de cabello 100% humano. Nuestra formación en más de 20 países nos permite incorporar técnicas de coloración, decoloración y extensiones a una atención personalizada.
          </p>
        </div>

        {/* Confirmed Brands Strip (Typographic, sober presentation without invented logos) */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A7067]">
              Líneas y Productos Profesionales Seleccionados
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {confirmedBrands.map((brand) => (
              <div
                key={brand.name}
                className="bg-white border border-[#99745A]/20 rounded-2xl p-5 text-center shadow-xs hover:border-[#C8933E]/50 transition-colors flex flex-col items-center justify-center min-h-[110px]"
              >
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#231E1B] tracking-wider block">
                  {brand.name}
                </span>
                <span className="text-[11px] text-[#7A7067] mt-1.5 leading-snug">
                  {brand.focus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologyPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#99745A]/20 shadow-xs hover:border-[#C8933E]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#99745A]/20 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-[#231E1B] mb-2 font-serif-luxury">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#61574E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#99745A]/10 flex items-center gap-1.5 text-[11px] font-semibold text-[#68794E]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Atención especializada</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
