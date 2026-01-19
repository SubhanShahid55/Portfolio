import React from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import portfolioData from '@/data/portfolioData';

const FloatingWhatsAppButton: React.FC = () => {
  const href = portfolioData.contact.socials.whatsapp;
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform ring-4 ring-white/10"
    >
      <WhatsAppIcon size={26} className="text-white" />
    </a>
  );
};

export default FloatingWhatsAppButton;
