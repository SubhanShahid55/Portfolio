import { ReactNode } from 'react';
import ParticleBackground from './ParticleBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden animated-gradient">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-20">
        {children}
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
};

export default Layout;
