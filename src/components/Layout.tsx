import { ReactNode } from 'react';
import ParticleBackground from './ParticleBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden animated-gradient">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-28 md:pt-32 pb-24 md:pb-0 min-h-screen flex flex-col">
        {children}
      </main>
      <Footer />
      {/* Ensure floating elements don't overlap too much */}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-4 gap-4 pointer-events-none [&>*]:pointer-events-auto mb-20 md:mb-0">
        <FloatingWhatsAppButton />
        <ChatBot />
      </div>
    </div>
  );
};

export default Layout;
