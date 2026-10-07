import { Calendar } from 'lucide-react';
import { STYLISTS } from '../data/salonData';
import type { Stylist } from '../types/salon';

interface StylistsSectionProps {
  onBookWithStylist: (stylist: Stylist) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ onBookWithStylist }) => {
  return (
    <section id="estilistas" className="py-24 bg-[#F2EDE3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#42502E]">
              Equipo de Especialistas
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-3">
            Manos expertas a tu servicio
          </h2>
          <p className="text-sm sm:text-base text-[#61574E]">
            Especialistas dedicados a la salud capilar, colorimetría de precisión y visagismo personalizado para cada clienta.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLISTS.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#99745A]/20 hover:border-[#C8933E]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={st.photo}
                  alt={st.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif-luxury text-2xl font-bold text-white">
                    {st.name}
                  </h3>
                  <p className="text-xs text-white/90 font-medium">{st.role}</p>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-[#8F8378] uppercase tracking-wider mb-2.5">
                    Especialidades destacadas:
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {st.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#F8F5EE] border border-[#99745A]/20 text-[#68794E] px-2.5 py-1 rounded-lg font-bold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onBookWithStylist(st)}
                  className="gold-button w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita con {st.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
