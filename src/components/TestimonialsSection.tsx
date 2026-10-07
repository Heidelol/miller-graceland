import { Star, Sparkles, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B0B0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181820] border border-[#D4AF37]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C875]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E6C875]">
              Testimonios Reales
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#FAF7F2] mb-3">
            La experiencia contada por nuestras clientas
          </h2>
          <p className="text-sm sm:text-base text-[#B3ACA0]">
            La confianza de cientos de mujeres que confían su imagen y salud capilar a Miller Graceland.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between border border-[#D4AF37]/15 relative"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/15 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#E6C875]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#DDD8CE] leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#FAF7F2]">{t.name}</h4>
                  <p className="text-[11px] text-[#E6C875]">{t.service}</p>
                  <span className="text-[10px] text-[#787268]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
