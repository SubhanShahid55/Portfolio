import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Code, Mail, Download, Wrench } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const navItems = [
  { label: 'Home', href: '/', id: 'home', icon: Home },
  { label: 'About', href: '/about', id: 'about', icon: User },
  { label: 'Experience', href: '/experience', id: 'experience', icon: Briefcase },
  { label: 'Projects', href: '/projects', id: 'projects', icon: Code },
  { label: 'Skills', href: '/', id: 'skills', icon: Wrench }, // Skills only exists on home page
  { label: 'Contact', href: '/contact', id: 'contact', icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    // If we are on the home page and clicking a link that exists as a section on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        // Optionally update URL hash without jump
        window.history.pushState(null, '', `/#${id}`);
      }
    } else {
      // If we are not on home page, and the user clicks Skills (which only exists on home), navigate to home#skills
      if (id === 'skills') {
        e.preventDefault();
        navigate('/#skills');
      }
    }
  };

  // Handle hash navigation when arriving from another page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

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
              alt={portfolioData.personal.name}
              className="h-10 md:h-12 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href || (location.pathname === '/' && location.hash === `#${item.id}`);
              
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={`relative text-sm font-medium transition-colors flex items-center gap-2 group ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className={`${isActive ? 'block' : 'hidden'} w-1.5 h-1.5 rounded-full bg-primary`} />
                    <span>{item.label}</span>
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Resume Button (Desktop) */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href={portfolioData.personal.resumeUrl}
              download
              className="btn-outline px-4 py-2 text-sm flex items-center gap-2 border-primary/50 hover:bg-primary/10"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>

          {/* Resume Button (Mobile Header) */}
          <motion.div 
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href={portfolioData.personal.resumeUrl}
              download
              className="bg-primary/10 text-primary border border-primary/20 font-medium px-4 py-1.5 rounded-lg text-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation Bar (Dock Style) */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card flex items-center gap-1 p-2 rounded-full pointer-events-auto shadow-2xl bg-background/80 backdrop-blur-xl border-t border-white/10"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname === '/' && location.hash === `#${item.id}`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`relative p-2.5 sm:p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'text-background bg-primary shadow-[0_0_15px_hsla(190,100%,50%,0.5)]' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-label={item.label}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
