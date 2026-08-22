import { ReactNode } from 'react';
import ParticleBackground from './ParticleBackground';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-20 md:pt-24 min-h-screen">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
