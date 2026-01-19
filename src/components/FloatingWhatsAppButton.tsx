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
      className="fixed bottom-4 right-4 z-50 w-14 h-14 sm:bottom-6 sm:right-6 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform ring-4 ring-white/10 touch-manipulation"
      style={{ touchAction: 'manipulation' }}
    >
      <WhatsAppIcon size={20} className="text-white" />
    </a>
  );
};

export default FloatingWhatsAppButton;
