import React from 'react';
import { useContent } from '../context/ContentContext';

const Clients = () => {
  const { content } = useContent();
  const cms = content?.clients || {};
  const clientNames = Array.isArray(cms.names) && cms.names.length > 0 ? cms.names : [
    "TechCorp Systems", "Innovate AI", "BuildIt Infra", "CloudNine Networks",
    "FutureGen Edu", "Alpha Data", "CyberSafe Solutions", "NextLevel Code",
    "SkyHigh Developers", "Quantum Soft",
  ];
  const loopedClients = [...clientNames, ...clientNames, ...clientNames];

  return (
    <section className="py-16 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] font-heading">
          {cms.heading || 'Trusted by Industry Leaders'}
        </h2>
      </div>

      {/* Container with Gradient Edges for Smooth Fade Effect */}
      <div className="relative w-full max-w-[98vw] mx-auto overflow-hidden">
        
        {/* Left Fade */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* Right Fade */}
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Wrapper */}
        <div className="flex animate-marquee gap-8 items-center">
          {loopedClients.map((client, index) => (
            <div 
              key={index}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="px-8 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm group-hover:border-dveinBlue/30 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <span className="text-lg font-bold text-gray-400 group-hover:text-dveinBlue uppercase tracking-wider transition-colors">
                  {client}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Clients;
