import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ConocemeSection } from './components/ConocemeSection';
import { PaymentMethodsSection } from './components/PaymentMethodsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminDemoPage } from './pages/AdminDemoPage';
import type { ServiceItem } from './types/salon';
import { SERVICES } from './data/salonData';

export function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isAdminRoute = currentPath === '/admin-demo' || currentPath.startsWith('/admin-demo');

  // Accessible exclusively on /admin-demo during local development
  if (isAdminRoute) {
    const isLocalDev =
      import.meta.env.DEV ||
      (typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));

    if (!isLocalDev) {
      return (
        <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-[#99745A]/20 shadow-sm space-y-3">
            <h2 className="font-serif-luxury text-xl font-bold text-[#231E1B]">Página no disponible</h2>
            <p className="text-xs text-[#6B6158]">
              El panel administrativo de demostración solo está disponible en el entorno de desarrollo local.
            </p>
            <a
              href="/"
              className="inline-block mt-2 px-5 py-2.5 bg-[#C8933E] text-[#231E1B] rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Volver al sitio
            </a>
          </div>
        </div>
      );
    }

    return <AdminDemoPage />;
  }

  const handleOpenBooking = (service?: ServiceItem) => {
    setSelectedService(service || SERVICES[0]);
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
        <ConocemeSection />
        <PaymentMethodsSection onOpenBooking={() => handleOpenBooking()} />
        {/* TestimonialsSection is hidden from public site until verified real customer reviews are available */}
        <FAQSection />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />

      {/* Booking Wizard with reservation and diagnostic flow */}
      {isBookingOpen && (
        <BookingModal
          key={selectedService ? selectedService.id : 'default'}
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          initialService={selectedService}
        />
      )}
    </div>
  );
}

export default App;
