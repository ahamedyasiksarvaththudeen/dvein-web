import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import WelcomeSection from '../components/WelcomeSection';
import HowWeDo from '../components/HowWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceHighlights from '../components/ServiceHighlights';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import MeetTeam from '../components/MeetTeam';
import Footer from '../components/Footer';

const Home = () => {
  return (
    // FIX 1: Removed 'overflow-x-hidden' from here (It breaks sticky)
    <div className="font-sans text-gray-900 ai-gradient-bg">
      
      {/* Navbar (Sticky) */}
      <div className="sticky top-0 z-[60]">
         <Navbar />
      </div>

      {/* 3. Main Content (Added overflow-x-hidden HERE instead) */}
      <main className="overflow-x-hidden"> 
        <Hero />
        <Clients />
        <WelcomeSection />
        <HowWeDo />          
        <WhyChooseUs />
        <ServiceHighlights />
        <Stats />
        <Testimonials />
        <MeetTeam />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
