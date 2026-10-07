import { Sparkles, Coffee, Microscope, HeartHandshake, Award } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      icon: <Microscope className="w-6 h-6 text-[#E6C875]" />,
      title: 'Diagnóstico Capilar Digital',
      description: 'Analizamos tu hebra y cuero cabelludo con microcámara antes de cualquier proceso químico para proteger tu salud capilar.'
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#E6C875]" />,
      title: 'Barra Gourmet & Champán',
      description: 'Disfruta de café de especialidad, infusiones orgánicas o una copa de mimosa y champán de cortesía durante tu cita.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#E6C875]" />,
      title: 'Marcas de Gama Mundial',
      description: 'Fórmulas puras y tecnologías de enlace molecular: Kérastase Chronologiste, Olaplex Professional y Redken Shades EQ.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#E6C875]" />,
      title: 'Garantía de Satisfacción',
      description: 'Asesoría visagista personalizada y seguimiento post-servicio para mantener tu color y extensiones impecables en casa.'
    }
  ];

  return (
    <section id="experiencia" className="py-24 bg-[#0B0B0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* Left Column: Visual collage */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                alt="Ambiente Miller Graceland"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 z-20 bg-[#161622]/95 border border-[#D4AF37]/40 rounded-2xl p-5 backdrop-blur-xl shadow-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E6C875] to-[#D4AF37] flex items-center justify-center text-black font-extrabold text-lg">
                  ★
                </div>
                <div>
                  <p className="text-sm font-bold text-[#FAF7F2]">Santuario de Belleza</p>
                  <p className="text-xs text-[#A8A194]">Atención exclusiva con cita previa para garantizar tu privacidad y calma.</p>
                </div>
              </div>
            </div>

            {/* Glow backdrop */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
          </div>

          {/* Right Column: Narrative & Values */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181820] border border-[#D4AF37]/25 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C875]" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E6C875]">
                El Estándar Miller Graceland
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#FAF7F2] leading-tight mb-6">
              Más que un salón, una pausa de <span className="gold-gradient-text italic font-normal">lujo y bienestar</span>
            </h2>

            <p className="text-sm sm:text-base text-[#B3ACA0] leading-relaxed mb-8">
              Creemos que el cabello es la corona que nunca te quitas. Por eso, hemos diseñado cada detalle de nuestras instalaciones y protocolos para ofrecerte resultados deslumbrantes sin prisas y en un ambiente cálido y sofisticado.
            </p>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#14141A] border border-white/5 hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#22212C] border border-[#D4AF37]/20 flex items-center justify-center mb-3">
                    {exp.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#FAF7F2] mb-1">{exp.title}</h4>
                  <p className="text-xs text-[#A69E90] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
