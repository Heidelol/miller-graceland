import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F9F6F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#68794E]/30 mb-4 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#42502E]">
              Experiencias de Clientas
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#231E1B] mb-3">
            La experiencia en Miller Greiseland
          </h2>
          <p className="text-sm sm:text-base text-[#61574E]">
            Testimonios compartidos por clientas que confían el cuidado y diseño de su cabello en nuestro estudio.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 flex flex-col justify-between border border-[#99745A]/20 shadow-xs hover:shadow-md hover:border-[#C8933E]/50 transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-[#C8933E]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#C8933E]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#4A423B] leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#99745A]/15 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C8933E]/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#231E1B]">{t.name}</h4>
                  <p className="text-[11px] text-[#A87428] font-bold">{t.service}</p>
                  <span className="text-[10px] text-[#8C8278]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
