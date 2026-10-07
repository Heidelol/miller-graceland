import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { StylistsSection } from './components/StylistsSection';
import { MercadoPagoBanner } from './components/MercadoPagoBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import type { ServiceItem } from './types/salon';
import { SERVICES } from './data/salonData';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenBooking = (service?: ServiceItem) => {
    setSelectedService(service || SERVICES[0]);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#231E1B] flex flex-col selection:bg-[#C8933E]/20 selection:text-[#231E1B]">
      {/* Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />
        <ExperienceSection />
        <StylistsSection onBookWithStylist={() => handleOpenBooking()} />
        <MercadoPagoBanner />
        <TestimonialsSection />
        <FAQSection />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />

      {/* Booking Wizard with Mercado Pago checkout */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
      />
    </div>
  );
}

export default App;
