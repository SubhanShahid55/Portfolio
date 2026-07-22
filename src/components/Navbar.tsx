import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Code, MessageSquare, Mail } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Experience', href: '/experience', icon: Briefcase },
  { label: 'Projects', href: '/projects', icon: Code },
  { label: 'Testimonials', href: '/testimonials', icon: MessageSquare },
  { label: 'Contact', href: '/contact', icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-card py-3 rounded-none md:rounded-xl md:mt-2 md:mx-4' : 'py-4 bg-background/50 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/">
            <motion.img
              src="/logo.png"
              alt="Muhammad Subhan Shahid"
              className="h-12 md:h-16 lg:h-20 w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`relative text-sm font-medium transition-colors flex items-center gap-2 group ${
                    location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className={`${location.pathname === item.href ? 'block' : 'hidden'} w-2 h-2 rounded-full bg-primary`} />
                  <span>{item.label}</span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation Bar (Dock Style) */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card flex items-center gap-1 p-2 rounded-full pointer-events-auto shadow-2xl"
          style={{ background: 'hsla(230, 50%, 15%, 0.9)' }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`relative p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'text-background bg-primary shadow-[0_0_15px_hsla(190,100%,50%,0.5)]' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
                aria-label={item.label}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
