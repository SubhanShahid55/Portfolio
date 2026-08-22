import React from 'react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { profileKnowledge } from '@/data/profile';

const FloatingWhatsAppButton: React.FC = () => {
  const href = profileKnowledge.contact.whatsapp;
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Subhan on WhatsApp"
      className="fixed bottom-[5.25rem] right-4 md:bottom-[5.25rem] md:right-6 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/30 active:scale-95 transition-all duration-200 hover:scale-105 ring-2 ring-white/15 touch-manipulation hover:brightness-110"
      style={{ touchAction: 'manipulation' }}
    >
      <WhatsAppIcon size={19} className="text-white" />
    </a>
  );
};

export default FloatingWhatsAppButton;
