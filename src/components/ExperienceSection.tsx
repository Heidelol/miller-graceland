import React from 'react';
import { Sparkles } from 'lucide-react';
import { PhotoCarousel } from './PhotoCarousel';
import { STUDIO_PHOTOS } from '../data/studioPhotos';

export const ExperienceSection: React.FC = () => {
  const confirmedBrands = [
    { name: 'Avyna', focus: 'Cosmética y cuidado capilar profesional' },
    { name: 'Chocolatto', focus: 'Nutrición y tratamientos capilares' },
    { name: 'Schwarzkopf', focus: 'Coloración y tecnología de aclaración' },
    { name: 'Wella', focus: 'Formulación y matices profesionales' },
  ];

  const methodologyPillars = [
    {
      title: 'Formación internacional',
      description: 'Técnicas de color, decoloración y extensiones aprendidas en más de 20 países.'
    },
    {
      title: 'Diseño de color',
      description: 'Tu historial químico y la condición de tu cabello guían el diseño de cada color, rubio y matiz.'
    },
    {
      title: 'Extensiones a tu medida',
      description: 'Cabello 100% humano. Colocación, mantenimiento y retiro cuidando tu cabello natural.'
    },
    {
      title: 'Tiempo para ti',
      description: 'Trabajamos con cita previa para dedicar a tu servicio el tiempo y la atención que necesita.'
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { ...confirmedBrands[0], images: STUDIO_PHOTOS.avyna },
              { ...confirmedBrands[1], images: STUDIO_PHOTOS.chocolatto },
              { ...confirmedBrands[2], images: STUDIO_PHOTOS.schwarzkopf },
            ].map((brand) => (
              <article key={brand.name} className="bg-white border border-[#99745A]/20 rounded-2xl overflow-hidden shadow-xs">
                <PhotoCarousel images={brand.images} label={brand.name} frameClassName="aspect-[4/3]" />
                <div className="p-5 text-center">
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#231E1B]">{brand.name}</h3>
                  <p className="text-xs text-[#7A7067] mt-1.5 leading-relaxed">{brand.focus}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="max-w-5xl mx-auto mt-6 text-center text-sm text-[#5C534B]">
            También trabajamos con <span className="font-serif-luxury text-xl font-semibold text-[#231E1B]">Wella</span>
            <span className="block mt-1 text-xs text-[#7A7067]">Formulación y matices profesionales</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16" aria-labelledby="studio-approach-title">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68794E] mb-4">
              Nuestra forma de trabajar
            </p>
            <h3 id="studio-approach-title" className="font-serif-luxury text-4xl sm:text-5xl font-medium leading-[1.08] text-[#231E1B] max-w-xs">
              Tu cabello,<br />el punto de partida.
            </h3>
            <p className="mt-5 text-sm leading-7 text-[#5C534B] max-w-xs">
              Escuchamos lo que buscas y elegimos cada técnica de acuerdo con tu cabello.
            </p>
          </div>

          <dl className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {methodologyPillars.map((pillar) => (
              <div key={pillar.title} className="border-t border-[#99745A]/25 py-6">
                <dt className="font-serif-luxury text-2xl font-semibold leading-tight text-[#231E1B]">
                  {pillar.title}
                </dt>
                <dd className="mt-3 text-sm leading-7 text-[#5C534B] max-w-sm">
                  {pillar.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
};
