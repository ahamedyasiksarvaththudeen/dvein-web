import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppBtn = () => {
  return (
    <a 
      href="https://wa.me/919500181230"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-110 transition-transform duration-300 animate-bounce-slow"
    >
      <FaWhatsapp size={35} />
    </a>
  );
};

export default WhatsAppBtn;