import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Clients = () => {
  const { content } = useContent();
  const cms = content?.clients || {};
  const clientNames = Array.isArray(cms.names) && cms.names.length > 0 ? cms.names : [
    "Information Technology & Software",
    "Healthcare",
    "EdTech",
    "Banking & Financial Services",
    "E-Commerce",
    "Manufacturing",
    "Logistics & Supply Chain",
    "Smart Farming",
    "HR Tech",
    "Real Estate & Construction",
  ];
  const loopedClients = [...clientNames, ...clientNames, ...clientNames];

  return (
    <section className="py-16 bg-white border-b border-gray-100 overflow-hidden relative">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 text-center mb-10"
      >
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] font-heading">
          {cms.heading || 'Trusted by Industry Sectors'}
        </h2>
      </motion.div>

      <div className="relative w-full max-w-[98vw] mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee gap-8 items-center">
          {loopedClients.map((client, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.06, y: -3 }}
              className="flex-shrink-0 cursor-pointer"
            >
              <div className="px-8 py-4 bg-white border-2 border-gray-100 rounded-xl shadow-sm hover:border-dveinBlue/30 hover:shadow-lg transition-all duration-300">
                <span className="text-lg font-bold text-gray-400 hover:text-dveinBlue uppercase tracking-wider transition-colors">
                  {client}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Clients;
