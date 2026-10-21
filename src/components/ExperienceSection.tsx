import React from 'react';
import { PhotoCarousel } from './PhotoCarousel';
import { STUDIO_PHOTOS } from '../data/studioPhotos';

export const ExperienceSection: React.FC = () => {
  const confirmedBrands = [
    { name: 'Avyna', focus: 'Cuidado capilar profesional', images: STUDIO_PHOTOS.avyna },
    { name: 'Chocolatto', focus: 'Nutrición y tratamientos', images: STUDIO_PHOTOS.chocolatto },
    { name: 'Schwarzkopf', focus: 'Coloración y aclaración', images: STUDIO_PHOTOS.schwarzkopf },
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
        
        <div className="max-w-5xl mx-auto mb-9 sm:mb-12 text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#42502E] mb-4">
            Selección profesional
          </p>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] text-[#231E1B]">
            Elegidos para{' '}
            <span className="block gold-accent-text italic font-normal">cuidar tu cabello.</span>
          </h2>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-9 max-w-5xl mx-auto">
            {confirmedBrands.map((brand) => (
              <article key={brand.name} className="min-w-0">
                <PhotoCarousel images={brand.images} label={brand.name} frameClassName="aspect-[4/3] rounded-xl" controlsPosition="below" />
                <div className="pt-3 text-left">
                  <h3 className="font-serif-luxury text-2xl font-semibold text-[#231E1B]">{brand.name}</h3>
                  <p className="text-[13px] text-[#5C534B] mt-1 leading-6">{brand.focus}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="max-w-5xl mx-auto mt-8 border-t border-[#99745A]/25 pt-5 text-left text-sm leading-7 text-[#5C534B]">
            Completamos nuestra selección con <span className="font-serif-luxury text-2xl font-semibold text-[#231E1B]">Wella</span>, para formulación y matices profesionales.
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
