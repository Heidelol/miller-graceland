import { Star, Sparkles, Calendar, Award } from 'lucide-react';
import { STYLISTS } from '../data/salonData';
import type { Stylist } from '../types/salon';

interface StylistsSectionProps {
  onBookWithStylist: (stylist: Stylist) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ onBookWithStylist }) => {
  return (
    <section id="estilistas" className="py-24 bg-[#0E0E12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181820] border border-[#D4AF37]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C875]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E6C875]">
              Master Artists & Colorists
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#FAF7F2] mb-3">
            Manos expertas a tu servicio
          </h2>
          <p className="text-sm sm:text-base text-[#B3ACA0]">
            Nuestros estilistas cuentan con certificaciones internacionales y una visión artística dedicada a resaltar tu belleza única.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STYLISTS.map((st) => (
            <div
              key={st.id}
              className="glass-card rounded-3xl overflow-hidden border border-[#D4AF37]/20 flex flex-col group"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={st.photo}
                  alt={st.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161C] via-[#16161C]/20 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-[#0B0B0E]/80 backdrop-blur-md border border-[#D4AF37]/30 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#E6C875] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#E6C875]" />
                  <span>{st.rating} ({st.reviewsCount})</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-[11px] text-[#E6C875] font-semibold tracking-wider uppercase mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{st.experienceYears} años de experiencia</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#FAF7F2]">
                    {st.name}
                  </h3>
                  <p className="text-xs text-[#C8C2B7]">{st.role}</p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#A69E90] uppercase tracking-wider mb-2">
                    Especialidades destacadas:
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {st.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#1E1E28] border border-white/5 text-[#E6C875] px-2.5 py-1 rounded-lg font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onBookWithStylist(st)}
                  className="gold-button w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
