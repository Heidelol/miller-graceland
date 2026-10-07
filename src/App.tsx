import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { StylistsSection } from './components/StylistsSection';
import { MercadoPagoBanner } from './components/MercadoPagoBanner';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import type { ServiceItem, Stylist } from './types/salon';
import { SERVICES } from './data/salonData';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);

  const handleOpenBooking = (service?: ServiceItem, stylist?: Stylist | null) => {
    setSelectedService(service || SERVICES[0]);
    setSelectedStylist(stylist || null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#231E1B] flex flex-col selection:bg-[#C8933E]/20 selection:text-[#231E1B] overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />
        <ExperienceSection />
        <StylistsSection onBookWithStylist={(stylist) => handleOpenBooking(undefined, stylist)} />
        <MercadoPagoBanner />
        {/* TestimonialsSection is hidden from public site until verified real customer reviews are available */}
        <FAQSection />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />

      {/* Booking Wizard with Mercado Pago checkout */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialService={selectedService}
          initialStylist={selectedStylist}
        />
      )}
    </div>
  );
}

export default App;
