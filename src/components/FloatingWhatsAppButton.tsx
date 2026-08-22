import React from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import portfolioData from '@/data/portfolioData';

const FloatingWhatsAppButton: React.FC = () => {
  const href = portfolioData.personal.socials.whatsapp;
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[calc(6rem+4.5rem)] right-4 md:bottom-[calc(1.5rem+4.5rem)] md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform hover:scale-110 ring-2 ring-white/10 touch-manipulation"
      style={{ touchAction: 'manipulation' }}
    >
      <WhatsAppIcon size={20} className="text-white" />
    </a>
  );
};

export default FloatingWhatsAppButton;
