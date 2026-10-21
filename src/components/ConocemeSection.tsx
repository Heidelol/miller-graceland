import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PhotoCarousel } from './PhotoCarousel';
import { ABOUT_PHOTOS } from '../data/studioPhotos';

export const ConocemeSection: React.FC = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <section id="conoceme" className="scroll-mt-24 py-20 sm:py-28 bg-[#F8F5EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Presentación Editorial en Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Retrato y formación visibles sin abrir la historia. */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md">
              <PhotoCarousel
                images={ABOUT_PHOTOS}
                label="Miller Greiseland y formación internacional"
                fade
                frameClassName="aspect-[4/5] rounded-xl"
                controlsPosition="below"
              />
              <p className="mt-2 text-left text-xs leading-6 text-[#5C534B]">Mi formación internacional, en imágenes.</p>
            </div>
          </div>

          {/* Columna Derecha: Presentación inicial */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-xl">
              
              {/* Etiqueta discreta */}
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#42502E] mb-4">Sobre mí</p>

              {/* Título principal */}
              <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-4xl sm:text-5xl font-medium font-serif-luxury text-[#231E1B] mb-5 leading-tight">
                <span>Miller</span>{' '}
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="italic font-normal text-[#A87428]">Greiseland</span>
              </h2>

              {/* Frase introductoria */}
              <p className="pl-4 border-l border-[#A87428]/50 text-xl sm:text-2xl font-serif-luxury italic text-[#5C534B] mb-6 leading-snug">
                “El arte de transformar el cabello, la ciencia del color y la pasión por crear experiencias extraordinarias.”
              </p>

              {/* Dos primeros párrafos: presentación y origen */}
              <div className="space-y-4 text-sm text-[#5C534B] leading-7">
                <p>
                  Soy Miller Greiseland, estilista profesional, colorimetrista y especialista en extensiones de cabello, con 12 años de trayectoria en el mundo de la belleza. Mi carrera nació de un sueño que, con disciplina, preparación y dedicación, se ha convertido en uno de los proyectos más importantes de mi vida.
                </p>
                <p>
                  El 16 de noviembre de 2016 es una fecha que jamás olvidaré: el día en que abrí mi primer salón, un espacio que construí junto a mi papá en el que había sido el cuarto de mi mamá. Aquel pequeño lugar fue el comienzo de una historia llena de esfuerzo, ilusión y amor por mi profesión.
                </p>
              </div>

              {/* Acciones en la cabecera: botón desplegable y enlace a servicios */}
              <div className="pt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
                <button
                  type="button"
                  onClick={() => setIsStoryOpen(!isStoryOpen)}
                  aria-expanded={isStoryOpen}
                  aria-controls="historia-miller-completa"
                  className="min-h-11 py-2 inline-flex items-center gap-2 text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#95651F] hover:decoration-[#95651F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
                >
                  <span>{isStoryOpen ? 'Cerrar mi historia' : 'Leer mi historia'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#A87428] transition-transform duration-300 ${
                      isStoryOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <a
                  href="#servicios"
                  className="min-h-11 py-2 inline-flex items-center gap-2 text-sm font-medium text-[#5C534B] hover:text-[#42502E] hover:underline underline-offset-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
                >
                  <span>Explorar servicios</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A87428]" aria-hidden="true" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Desplegable accesible para la historia completa */}
        <details
          id="historia-miller-completa"
          open={isStoryOpen}
          onToggle={(e) => setIsStoryOpen(e.currentTarget.open)}
          className="mt-12 group transition-all"
        >
          {/* Summary nativo accesible para tecnologías de asistencia */}
          <summary className="sr-only cursor-pointer">
            <span>{isStoryOpen ? 'Cerrar mi historia' : 'Leer mi historia'}</span>
          </summary>

          {/* Historia ampliada en columna de lectura cómoda (65–75 caracteres por línea) */}
          <div className="mt-10 pt-10 border-t border-[#99745A]/20 max-w-2xl mx-auto space-y-10 text-[#4A423B] text-sm sm:text-base leading-7">
            
            {/* 1. Una nueva etapa */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                Una nueva etapa
              </h3>
              <p>
                Hoy, ese sueño evoluciona hacia una nueva etapa con Miller Greiseland Studio, un espacio creado desde cero, con una visión mucho más amplia de la belleza y el lujo.
              </p>
              <p>
                Mi propósito es ofrecer algo más que un servicio capilar: una experiencia integral donde el diseño, la atención personalizada, la gastronomía y las bebidas se unen para crear un ambiente en el que cada cliente se sienta especial, cómodo y en casa.
              </p>
            </div>

            {/* 2. Mi formación y trayectoria internacional */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                Mi formación y trayectoria internacional
              </h3>
              <p>
                Mi preparación ha sido una aventura constante de aprendizaje y perfeccionamiento. Inicié mis estudios en Chetumal en 2015 y posteriormente viajé a Delicias, Chihuahua, para formarme en Mechas y Mechas, donde actualmente me desempeño como Master Artista de Plataforma.
              </p>
              <p>
                Mi pasión por perfeccionar cada técnica me llevó a Europa, donde estudié diseño y corte de cabello en Bélgica. En 2019 tuve la oportunidad de capacitarme en París con Mounir, reconocido internacionalmente por sus extraordinarias transformaciones y su visión artística del color.
              </p>
              <p>
                En 2024 viajé a São Paulo, Brasil, para aprender técnicas brasileñas de balayage y apertura de fondo en el salón de Romeu Felipe, artista internacional y embajador global de Wella, reconocido por su trabajo en la industria de la belleza.
              </p>
              <p>
                En 2025 continué esta aventura de formación e innovación, profundizando en las técnicas brasileñas y desarrollando la visión que hoy da vida a mi nuevo estudio.
              </p>
              <p>
                Cuento también con formación en corte bajo el sistema Pivot Point, una metodología de educación capilar reconocida internacionalmente.
              </p>
            </div>

            {/* 3. Mis especialidades */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                Mis especialidades
              </h3>
              <p>
                Mi trabajo se centra en la colorimetría avanzada, el diseño de rubios, las técnicas brasileñas de balayage, la apertura de fondo, las correcciones de color y la creación de extensiones personalizadas.
              </p>
              <p>
                Trabajo con líneas profesionales de alta gama como Schwarzkopf Professional, Wella y Brazilian Blowout, seleccionando técnicas y productos de acuerdo con las necesidades, el historial y las características de cada cabello.
              </p>
            </div>

            {/* 4. Lo que nos hace diferentes */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                Lo que nos hace diferentes
              </h3>
              <p>
                Una de las áreas que más orgullo me genera es la fabricación artesanal de extensiones. Con ocho años de experiencia en este campo, somos especialistas en crear coletas de cabello 100% humano y personalizadas, desde cabello virgen hasta diseños con efectos balayage, adaptados a cada cliente.
              </p>
              <p>
                También desarrollamos nuestros propios sistemas de extensiones, incluidos Tape, Tape Invisible y Mega Hair, combinando conocimiento técnico, precisión artesanal y una visión estética personalizada.
              </p>
              <p>
                Mi compromiso con la formación internacional me ha permitido explorar diferentes escuelas y técnicas de color, llevando a Chetumal conocimientos adquiridos en Europa y Brasil para ofrecer propuestas innovadoras, resultados sofisticados y un servicio de alto nivel.
              </p>
            </div>

            {/* 5. Mi filosofía */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#231E1B] tracking-tight">
                Mi filosofía
              </h3>
              <p>
                Creo que la belleza va mucho más allá de lo visual. Un cambio de imagen puede transformar la manera en que una persona se percibe, se expresa y se siente consigo misma.
              </p>
              <p>
                Por eso, cada transformación comienza escuchando, comprendiendo y diseñando una propuesta que respete la identidad y la esencia de cada cliente.
              </p>

              {/* Frase de filosofía como cita sencilla sin recuadros llamativos */}
              <blockquote className="my-6 pl-5 border-l-2 border-[#C8933E] italic text-[#231E1B] text-base sm:text-lg font-serif-luxury leading-snug">
                “No solo busco transformar cabellos; busco crear belleza, fortalecer la confianza interior y ofrecer experiencias que trasciendan más allá de lo visual.”
              </blockquote>

              <p>
                De ahí nace también mi pasión por grabar videos: reflejar el amor y la dedicación que transmito en cada transformación y cambio de look.
              </p>
              <p>
                Miller Greiseland Studio es el reflejo de ese propósito: un sueño construido con esfuerzo, pasión y dedicación, donde cada detalle tiene una razón de ser y cada transformación lleva mi firma.
              </p>
            </div>

            {/* Cierre del desplegable y llamada a explorar servicios */}
            <div className="pt-8 border-t border-[#99745A]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsStoryOpen(false);
                  const el = document.getElementById('conoceme');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="min-h-11 py-2 text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#95651F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
              >
                ↑ Cerrar mi historia
              </button>

              <a
                href="#servicios"
                className="gold-button min-h-11 inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4"
              >
                <span>Explorar servicios</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

          </div>
        </details>

      </div>
    </section>
  );
};
