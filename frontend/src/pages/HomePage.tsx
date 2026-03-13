import { useEffect, useState } from 'react';
import { eventTypesApi } from '../services/api/eventTypesApi';
import { SESSION } from '../store/session';
import type { EventType } from '../types/domain';

import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import TrustedLogos from '../components/landing/TrustedLogos';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import CTA from '../components/landing/CTA';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  useEffect(() => {
    eventTypesApi
      .listByUser(SESSION.userId)
      .then((ets) => setEventTypes(ets))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-dvh bg-white font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <TrustedLogos />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
