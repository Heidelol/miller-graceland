import { Sparkles, Coffee, Microscope, HeartHandshake, Award } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      icon: <Microscope className="w-6 h-6 text-[#68794E]" />,
      title: 'Diagnóstico Capilar Digital',
      description: 'Analizamos tu hebra y cuero cabelludo con microcámara antes de cualquier proceso químico para proteger tu salud capilar.'
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#C8933E]" />,
      title: 'Barra Gourmet & Champán',
      description: 'Disfruta de café de especialidad, infusiones orgánicas o una copa de mimosa y champán de cortesía durante tu cita.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#A87428]" />,
      title: 'Marcas de Gama Mundial',
      description: 'Fórmulas puras y tecnologías de enlace molecular: Kérastase Chronologiste, Olaplex Professional y Redken Shades EQ.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#99745A]" />,
      title: 'Garantía de Satisfacción',
      description: 'Asesoría visagista personalizada y seguimiento post-servicio para mantener tu color y extensiones impecables en casa.'
    }
  ];

  return (
    <section id="experiencia" className="py-24 bg-[#F9F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Column: Visual collage */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-[#99745A]/25 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                alt="Ambiente Miller Greiseland"
                className="w-full h-[470px] object-cover"
              />
            </div>

            {/* Overlapping Floating Card in Crisp White */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 z-20 bg-white border border-[#C8933E]/40 rounded-2xl p-5 shadow-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DFAC58] to-[#C8933E] flex items-center justify-center text-white font-black text-xl shadow-sm">
                  ★
                </div>
                <div>
                  <p className="text-sm font-bold text-[#231E1B]">Santuario de Belleza</p>
                  <p className="text-xs text-[#6B6158]">Atención exclusiva con cita previa para garantizar tu privacidad y confort.</p>
                </div>
              </div>
            </div>

            {/* Subtle light glow */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#C8933E]/8 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Right Column: Narrative & Values */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C8933E]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#42502E]">
                El Estándar Miller Greiseland
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] leading-tight mb-6">
              Más que un salón, una pausa de <span className="gold-gradient-text italic font-normal">lujo y bienestar</span>
            </h2>

            <p className="text-sm sm:text-base text-[#61574E] leading-relaxed mb-8">
              Creemos que el cabello es la corona que nunca te quitas. Por eso, hemos diseñado cada detalle de nuestras instalaciones y protocolos para ofrecerte resultados deslumbrantes en un espacio luminoso, armónico y sofisticado.
            </p>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#99745A]/20 hover:border-[#C8933E]/50 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F8F5EE] border border-[#99745A]/20 flex items-center justify-center mb-3">
                    {exp.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#231E1B] mb-1">{exp.title}</h4>
                  <p className="text-xs text-[#665D55] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
