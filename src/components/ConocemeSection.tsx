import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const ConocemeSection: React.FC = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <section id="conoceme" className="scroll-mt-24 py-20 sm:py-28 bg-[#F8F5EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Presentación Editorial en Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Retrato fotográfico */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#99745A]/20 shadow-lg bg-[#E8E1D5]">
              <picture>
                <source srcSet="/miller-greiseland.webp" type="image/webp" />
                <img
                  src="/miller-greiseland.jpg"
                  alt="Retrato de Miller Greiseland"
                  width={1200}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_28%] scale-[1.12] transition-transform duration-700 hover:scale-[1.15]"
                />
              </picture>
            </div>
          </div>

          {/* Columna Derecha: Presentación inicial */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-xl">
              
              {/* Etiqueta discreta */}
              <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-3 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#42502E]">
                  Sobre mí
                </span>
              </div>

              {/* Título principal */}
              <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-3 tracking-tight">
                Miller Greiseland
              </h2>

              {/* Frase introductoria */}
              <p className="text-base sm:text-lg font-serif-luxury italic text-[#A87428] mb-6 leading-snug">
                “El arte de transformar el cabello, la ciencia del color y la pasión por crear experiencias extraordinarias.”
              </p>

              {/* Dos primeros párrafos: presentación y origen */}
              <div className="space-y-4 text-sm sm:text-base text-[#554C44] leading-relaxed">
                <p>
                  Soy Miller Greiseland, estilista profesional, colorimetrista y especialista en extensiones de cabello, con 12 años de trayectoria en el mundo de la belleza. Mi carrera nació de un sueño que, con disciplina, preparación y dedicación, se ha convertido en uno de los proyectos más importantes de mi vida.
                </p>
                <p>
                  El 16 de noviembre de 2016 es una fecha que jamás olvidaré: el día en que abrí mi primer salón, un espacio que construí junto a mi papá en el que había sido el cuarto de mi mamá. Aquel pequeño lugar fue el comienzo de una historia llena de esfuerzo, ilusión y amor por mi profesión.
                </p>
              </div>

              {/* Acciones en la cabecera: botón desplegable y enlace a servicios */}
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsStoryOpen(!isStoryOpen)}
                  aria-expanded={isStoryOpen}
                  aria-controls="historia-miller-completa"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#99745A]/30 text-xs font-bold uppercase tracking-wider text-[#231E1B] bg-white hover:bg-[#FAF7F2] hover:border-[#C8933E] transition-all cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
                >
                  <span>{isStoryOpen ? 'Cerrar mi historia' : 'Leer mi historia'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#A87428] transition-transform duration-300 ${
                      isStoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <a
                  href="#servicios"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#68794E] hover:text-[#42502E] hover:underline transition-colors cursor-pointer"
                >
                  <span>Explorar servicios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="mt-10 pt-10 border-t border-[#99745A]/15 max-w-3xl mx-auto space-y-10 text-[#4A423B] text-sm sm:text-base leading-relaxed">
            
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
                className="text-xs font-bold text-[#7A7067] hover:text-[#231E1B] transition-colors cursor-pointer"
              >
                ↑ Cerrar mi historia
              </button>

              <a
                href="#servicios"
                className="gold-button inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-2"
              >
                <span>Explorar servicios</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </details>

      </div>
    </section>
  );
};
