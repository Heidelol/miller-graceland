import { ArrowRight } from 'lucide-react';

export const ConocemeSection: React.FC = () => {
  return (
    <section id="conoceme" className="scroll-mt-24 py-20 sm:py-28 bg-[#F2EDE3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#99745A]/20 shadow-lg bg-[#E8E1D5]">
              <img
                src="/miller-greiseland.webp"
                alt="Retrato de Miller Greiseland"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_28%] scale-[1.12] transition-transform duration-700 hover:scale-[1.15]"
              />
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-xl">
              {/* Etiqueta pequeña */}
              <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#42502E]">
                  CONÓCEME
                </span>
              </div>

              {/* Título */}
              <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-6 tracking-tight">
                Miller Greiseland
              </h2>

              {/* Presentación en primera persona */}
              <div className="space-y-4 text-sm sm:text-base text-[#554C44] leading-relaxed">
                <p>
                  Soy Miller Greiseland. Mi forma de entender la peluquería comienza con escuchar lo que buscas y conocer las necesidades de tu cabello.
                </p>
                <p>
                  En Miller Greiseland Studio, cada propuesta de color, rubios, extensiones o corte parte de una valoración personalizada. La salud capilar, la atención al detalle y un resultado que armonice contigo guían esta experiencia.
                </p>
                <p>
                  Quiero que encuentres un espacio donde puedas expresar tu estilo y sentirte a gusto durante todo el proceso.
                </p>
              </div>

              {/* Único botón: Explorar servicios */}
              <div className="pt-8">
                <a
                  href="#servicios"
                  className="gold-button inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
                >
                  <span>Explorar servicios</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
