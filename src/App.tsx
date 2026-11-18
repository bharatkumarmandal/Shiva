import {useState} from 'react';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PortfolioAndPartners from './components/PortfolioAndPartners';
import ProprietorAndContact from './components/ProprietorAndContact';
import ServicesSection from './components/ServicesSection';
import WhatsAppWidget from './components/WhatsAppWidget';
import type {ServiceId} from './data/portfolioData';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>('air-ticket');

  const scrollToContact = (serviceId?: ServiceId) => {
    if (serviceId) {
      setSelectedService(serviceId);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-[#EFE6D8] overflow-x-clip">
      <Navbar onRequestService={() => scrollToContact()} />

      <main>
        <Hero onRequestService={(id) => scrollToContact(id)} />

        <ServicesSection
          selectedService={selectedService}
          onSelectService={(id) => scrollToContact(id)}
        />

        <PortfolioAndPartners onSelectService={(id) => scrollToContact(id)} />

        <ProprietorAndContact
          selectedService={selectedService}
          onSelectService={setSelectedService}
        />
      </main>

      <Footer />

      <WhatsAppWidget
        selectedService={selectedService}
        onSelectService={setSelectedService}
      />
    </div>
  );
}
