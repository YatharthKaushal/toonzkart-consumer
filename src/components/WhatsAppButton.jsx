import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '+919826066581';
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;