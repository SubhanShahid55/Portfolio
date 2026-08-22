import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Scroll to section
  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 76;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    },
    []
  );

  // Mobile menu focus trap
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab' || !mobileMenuRef.current) return;

      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'button, a, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/20'
            : 'py-4 bg-background/40 backdrop-blur-md'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1200px] flex items-center justify-between">
          {/* Brand Wordmark / Monogram */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
            aria-label="Subhan Shahid - Back to top"
          >
            <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center font-mono font-bold text-xs text-primary tracking-wider transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/20">
              {portfolioData.personal.monogram}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">
                {portfolioData.personal.shortName}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground tracking-wider leading-tight mt-0.5">
                Software Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`relative text-xs font-mono uppercase tracking-wider transition-colors py-1 ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop Resume CTA */}
          <div className="hidden lg:block">
            <a
              href={portfolioData.personal.resumeUrl}
              download
              className="btn-outline px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase inline-flex items-center gap-1.5"
            >
              <Download size={13} />
              Resume
            </a>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={portfolioData.personal.resumeUrl}
              download
              className="px-2.5 py-1.5 text-xs font-mono tracking-wider uppercase rounded-md border border-primary/30 text-primary bg-primary/5 inline-flex items-center gap-1"
              aria-label="Download Resume PDF"
            >
              <Download size={12} />
              <span>CV</span>
            </a>
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[56] h-full w-64 bg-background border-l border-border/40 lg:hidden shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between p-4 border-b border-border/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-primary/10 border border-primary/30 flex items-center justify-center font-mono font-bold text-xs text-primary">
                      MSS
                    </div>
                    <span className="text-xs font-bold text-foreground">Menu</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                    className="p-1.5 rounded text-muted-foreground hover:text-foreground"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
                <nav className="p-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                          isActive
                            ? 'text-primary bg-primary/10 font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 border-t border-border/20">
                <a
                  href={portfolioData.personal.resumeUrl}
                  download
                  className="btn-primary w-full text-center text-xs font-mono uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
                >
                  <Download size={13} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
