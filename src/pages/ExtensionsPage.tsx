import { ArrowDown, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SALON_INFO } from '../data/salonData';
import { EXTENSIONS_QUESTIONS, EXTENSIONS_WHATSAPP_URL } from '../data/extensionsPage';
import { trackWhatsAppClick, trackDirectionsClick } from '../lib/analytics';

const focus = 'focus-visible:outline-2 focus-visible:outline-[#231E1B] focus-visible:outline-offset-4';
const eyebrow = 'text-[11px] font-medium uppercase tracking-[0.18em] text-[#42502E]';
const textLink = `min-h-11 inline-flex items-center gap-2 py-2 text-sm font-medium text-[#42502E] underline underline-offset-4 decoration-[#68794E]/40 hover:text-[#95651F] transition-colors ${focus}`;

function AppointmentLink({ location, className = '', children = 'Haz tu cita' }: {
  location: 'extensions_hero' | 'extensions_valuation' | 'extensions_location';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={EXTENSIONS_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(location, { serviceName: 'Valoración de extensiones' })}
      className={`gold-button min-h-11 inline-flex items-center justify-center gap-3 rounded-lg px-5 py-3 text-sm font-semibold ${focus} ${className}`}>
      {children}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export const ExtensionsPage: React.FC = () => (
  <div className="min-h-screen bg-[#F9F6F0] text-[#231E1B]">
    <Navbar sectionLinkPrefix="/" bookingHref={EXTENSIONS_WHATSAPP_URL} bookingLabel="Haz tu cita"
      whatsappHref={EXTENSIONS_WHATSAPP_URL}
      onOpenBooking={() => trackWhatsAppClick('extensions_navbar', { serviceName: 'Valoración de extensiones' })} />
    <main id="contenido-extensiones" className="pt-28 sm:pt-32">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-3 text-xs text-[#5C534B] mb-8 sm:mb-10">
          <a href="/" className={`min-h-11 inline-flex items-center hover:underline underline-offset-4 ${focus}`}>Inicio</a>
          <span aria-hidden="true">/</span><span aria-current="page">Extensiones</span>
        </nav>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-20">
          <div className="hero-enter max-w-xl">
            <p className={eyebrow}>Miller Greiseland Studio · Chetumal</p>
            <h1 className="font-serif-luxury text-[42px] min-[375px]:text-5xl sm:text-6xl lg:text-[68px] font-medium leading-[1.06] my-6">
              Extensiones de cabello en Chetumal
            </h1>
            <p className="font-serif-luxury italic text-[#A87428] text-2xl sm:text-3xl mb-6">Más largo, más volumen. Más tú.</p>
            <p className="text-sm sm:text-base leading-7 text-[#5C534B] max-w-lg">
              Cabello 100 % humano y una propuesta personalizada para tu tono, textura y movimiento. Descubre las opciones de extensiones y comienza con una valoración en nuestro estudio.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8">
              <AppointmentLink location="extensions_hero" />
              <a href="#personalizacion" className={textLink}>Conoce la propuesta<ArrowDown className="w-3.5 h-3.5 text-[#A87428]" aria-hidden="true" /></a>
            </div>
            <p className="mt-4 text-xs leading-6 text-[#5C534B]">Precio sujeto a valoración personalizada.</p>
          </div>
          <figure data-ai-illustration className="hero-enter hero-enter-photo w-full max-w-lg mx-auto lg:mr-0">
            <img src="/images/extensions/cabello-ondulado-ia.webp" width={1122} height={1402}
              alt="Referencia ilustrativa de cabello largo ondulado en tonos castaños, generada con IA"
              fetchPriority="high" decoding="async" className="w-full h-auto aspect-[4/5] object-cover rounded-xl" />
            <figcaption className="text-[11px] leading-5 text-[#5C534B] mt-3">Imagen ilustrativa generada con IA.</figcaption>
          </figure>
        </div>
      </section>

      <section id="personalizacion" className="scroll-mt-28 bg-[#F2EDE3] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-10 lg:gap-20">
          <figure data-ai-illustration>
            <img src="/images/extensions/detalle-extensiones-ia.webp" width={1200} height={900} loading="lazy" decoding="async"
              alt="Composición ilustrativa de mechones de extensiones castañas y un peine, generada con IA"
              className="w-full h-auto aspect-[4/3] object-cover rounded-xl" />
            <figcaption className="text-[11px] leading-5 text-[#5C534B] mt-3">Imagen ilustrativa generada con IA. No representa un producto específico del estudio.</figcaption>
          </figure>
          <div>
            <p className={eyebrow}>Una elección personal</p>
            <h2 className="font-serif-luxury font-medium text-4xl sm:text-5xl leading-tight mt-4 mb-6">El detalle está en <span className="italic text-[#A87428]">la integración.</span></h2>
            <p className="text-sm leading-7 text-[#5C534B]">El punto de partida es tu cabello: su tono, densidad, textura y el resultado que deseas. La valoración nos permite diseñar contigo una propuesta de largo y volumen, además de orientarte sobre su mantenimiento.</p>
            <p className="text-sm leading-7 text-[#5C534B] mt-4">Miller combina su experiencia en colorimetría con la creación artesanal de extensiones personalizadas de cabello humano.</p>
            <a href="/#conoceme" className={`${textLink} mt-5`}>Conoce a Miller<ArrowUpRight className="w-3.5 h-3.5 text-[#A87428]" aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" aria-labelledby="opciones-extensiones">
        <div className="max-w-2xl mb-9">
          <p className={eyebrow}>Acompañamos tu cabello</p>
          <h2 id="opciones-extensiones" className="font-serif-luxury font-medium text-4xl sm:text-5xl leading-tight mt-4">De la primera valoración <span className="italic text-[#A87428]">al mantenimiento.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {[
            ['01', 'Extensiones personalizadas', 'Conoce las opciones para conseguir el largo y volumen que buscas, de acuerdo con las características de tu cabello.'],
            ['02', 'Bajada y recolocación', 'Mantenimiento de tus extensiones, con retiro y posterior recolocación según las necesidades de tu caso.'],
            ['03', 'Retiro y cuidado', 'Retiro profesional y rituales de lavado e hidratación para cabello con extensiones.'],
          ].map(([number, title, description]) => (
            <article key={number} className="border-t border-[#99745A]/25 pt-5">
              <p className="text-xs text-[#95651F] mb-5" aria-hidden="true">{number}</p>
              <h3 className="font-serif-luxury font-semibold text-2xl mb-3">{title}</h3>
              <p className="text-sm leading-7 text-[#5C534B]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="valoracion" className="scroll-mt-28 bg-[#F2EDE3] py-16 sm:py-20" aria-labelledby="precio-extensiones">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 items-start">
          <div>
            <p className={eyebrow}>Precio de tu servicio</p>
            <h2 id="precio-extensiones" className="font-serif-luxury text-4xl sm:text-5xl leading-tight font-medium mt-4">Requiere <span className="italic text-[#A87428]">valoración</span></h2>
            <p className="text-sm leading-7 text-[#5C534B] mt-6 max-w-lg">Cada cabello necesita una propuesta diferente. El importe se confirma según tu cabello, el resultado que buscas y el servicio a realizar. Te explicamos lo que incluye antes de acordar tu cita.</p>
            <AppointmentLink location="extensions_valuation" className="mt-7" />
            <p className="text-xs leading-6 text-[#5C534B] mt-4">Solicita tu valoración por WhatsApp. El salón confirma contigo la disponibilidad y las condiciones de tu cita.</p>
          </div>
          <ol className="border-t border-[#99745A]/25">
            {[
              ['Cuéntanos qué buscas', 'Comparte si deseas más largo, volumen o información sobre el mantenimiento de tus extensiones.'],
              ['Conoce tu propuesta', 'Valoramos contigo las opciones y te explicamos el servicio y su importe.'],
              ['Acordamos tu cita', 'Revisamos la disponibilidad y confirmamos directamente contigo la fecha y el horario.'],
            ].map(([title, description], index) => (
              <li key={title} className="flex gap-5 py-5 border-b border-[#99745A]/25">
                <span className="text-xs text-[#95651F] pt-1" aria-hidden="true">0{index + 1}</span>
                <div><h3 className="text-sm font-semibold mb-2">{title}</h3><p className="text-sm leading-7 text-[#5C534B]">{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="dudas-extensiones">
        <p className={eyebrow}>Antes de tu visita</p>
        <h2 id="dudas-extensiones" className="font-serif-luxury font-medium text-4xl sm:text-5xl mt-4 mb-9">Tus dudas, <span className="italic text-[#A87428]">con claridad.</span></h2>
        <div className="border-t border-[#99745A]/25">
          {EXTENSIONS_QUESTIONS.map(({ question, answer }) => (
            <details key={question} className="group border-b border-[#99745A]/25">
              <summary className={`min-h-14 flex items-center justify-between gap-5 py-5 text-sm font-medium cursor-pointer list-none [&::-webkit-details-marker]:hidden ${focus}`}>
                {question}<ChevronDown className="w-4 h-4 shrink-0 text-[#A87428] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-7 text-sm leading-7 text-[#5C534B]">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-[#99745A]/20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid md:grid-cols-2 gap-8 items-center" aria-labelledby="visita-extensiones">
        <div><p className={eyebrow}>Te esperamos en el estudio</p><h2 id="visita-extensiones" className="font-serif-luxury text-4xl sm:text-5xl font-medium leading-tight mt-4">Tu próxima visita, <span className="italic text-[#A87428]">en Chetumal.</span></h2></div>
        <div className="md:pl-8">
          <p className="text-sm leading-7 text-[#5C534B]">{SALON_INFO.address}</p>
          <p className="text-sm leading-7 text-[#5C534B] mt-2">{SALON_INFO.schedule} · Atención con cita previa.</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-5">
            <AppointmentLink location="extensions_location" />
            <a href={SALON_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackDirectionsClick('extensions_location')} className={textLink}><MapPin className="w-4 h-4" aria-hidden="true" />Cómo llegar</a>
          </div>
        </div>
      </section>
    </main>
    <Footer whatsappHref={EXTENSIONS_WHATSAPP_URL} whatsappServiceName="Valoración de extensiones" />
  </div>
);
