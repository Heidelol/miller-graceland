import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ConocemeSection } from './components/ConocemeSection';
import { PaymentMethodsSection } from './components/PaymentMethodsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ExtensionsPage } from './pages/ExtensionsPage';
import { EXTENSIONS_PATH } from './data/extensionsPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath === EXTENSIONS_PATH || currentPath === `${EXTENSIONS_PATH}/`) {
    return <ExtensionsPage />;
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#231E1B] flex flex-col selection:bg-[#C8933E]/20 selection:text-[#231E1B] overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <ExperienceSection />
        <ConocemeSection />
        <PaymentMethodsSection />
        {/* TestimonialsSection is hidden from public site until verified real customer reviews are available */}
        <FAQSection />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />
    </div>
  );
}

export default App;
