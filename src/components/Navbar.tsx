import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Download, Menu, X, Mail, Linkedin, Github } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const navItems = [
  { label: 'Home', id: 'home', number: '00' },
  { label: 'Work', id: 'work', number: '01' },
  { label: 'Experience', id: 'experience', number: '02' },
  { label: 'Testimonials', id: 'testimonials', number: '03' },
  { label: 'About', id: 'about', number: '04' },
  { label: 'Skills', id: 'skills', number: '05' },
  { label: 'Contact', id: 'contact', number: '06' },
];

const WhatsAppIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.12-.533-1.636-.68-2.678-2.348-2.759-2.458-.08-.109-.661-.88-.661-1.677 0-.796.417-1.189.565-1.353.148-.164.323-.205.431-.205.108 0 .216.002.31.007.099.006.233-.037.363.277.136.327.464 1.135.505 1.218.041.082.069.178.014.288-.055.109-.082.177-.163.272-.082.096-.172.215-.246.289-.082.083-.168.172-.072.337.096.164.428.707.918 1.144.631.563 1.162.738 1.326.82.164.082.26.069.356-.042.096-.109.41-.477.52-.641.109-.164.218-.137.364-.082.146.055.932.439 1.092.519.16.08.267.12.306.187.039.067.039.387-.105.792z"/>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll sync detection for navbar background and active section
  useEffect(() => {
    const handleScrollSync = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const sectionIds = navItems.map((item) => item.id);
      const scrollPosition = scrollY + 150;

      // If near page bottom, activate contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 70) {
        setActiveSection('contact');
        return;
      }

      // Check sections from bottom to top
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScrollSync, { passive: true });
    handleScrollSync();

    return () => window.removeEventListener('scroll', handleScrollSync);
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />

      {/* Header Container */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 pt-3 pb-2 pointer-events-none"
      >
        <div
          className={`pointer-events-auto max-w-[1180px] mx-auto rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-surface-1/90 backdrop-blur-2xl border border-border/50 shadow-2xl shadow-black/50 py-2 px-3.5 sm:px-5'
              : 'bg-surface-1/60 backdrop-blur-xl border border-border/30 shadow-lg shadow-black/20 py-2.5 px-3.5 sm:px-5'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2.5 group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              aria-label="Muhammad Subhan Shahid - Back to top"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-cyan-400/50 bg-surface-2 shadow-md shadow-cyan-950/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.4)] transition-all duration-300 flex-shrink-0">
                <img
                  src="/images/subhan-avatar.jpg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/subhan-anime-portrait.png';
                  }}
                  alt="Subhan Shahid Logo"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">
                  {portfolioData.personal.shortName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground tracking-wider leading-tight mt-0.5 sm:mt-1">
                  Full-Stack Engineer
                </span>
              </div>
            </button>


            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-surface-2/60 border border-border/40 rounded-full px-2 py-1 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={`relative text-[11px] font-mono uppercase tracking-wider transition-colors duration-200 py-1.5 px-3 rounded-full ${
                      isActive
                        ? 'text-primary font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-full shadow-[0_0_10px_hsla(187,80%,48%,0.2)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Quick Actions: WhatsApp + Resume */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* WhatsApp Button */}
              <a
                href={portfolioData.personal.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-full border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/70 transition-all inline-flex items-center gap-1.5 font-medium shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] active:scale-95"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Resume Button */}
              <a
                href={portfolioData.personal.resumeUrl}
                download
                className="px-3.5 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-full border border-primary/40 text-foreground bg-primary/10 hover:bg-primary/20 hover:text-primary hover:border-primary/80 transition-all inline-flex items-center gap-1.5 font-medium shadow-sm active:scale-95"
                aria-label="Download Resume"
              >
                <Download size={12} className="text-primary" />
                <span>Resume</span>
              </a>
            </div>

            {/* Mobile Actions: WhatsApp + CV + Menu Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <a
                href={portfolioData.personal.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/35 hover:bg-emerald-500/20 transition-all active:scale-95 flex items-center justify-center shadow-sm"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href={portfolioData.personal.resumeUrl}
                download
                className="px-2.5 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-xl border border-primary/35 text-primary bg-primary/10 inline-flex items-center gap-1 active:scale-95 font-medium"
                aria-label="Download Resume PDF"
              >
                <Download size={12} />
                <span>CV</span>
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground bg-surface-2/80 border border-border/50 hover:border-primary/40 transition-colors active:scale-95"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Dynamic Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/75 backdrop-blur-md lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 z-[56] h-full w-[290px] max-w-[85vw] bg-surface-1 border-l border-border/40 lg:hidden shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/30 bg-surface-2/60">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/50 bg-surface-3 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img
                        src="/images/subhan-avatar.jpg"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/subhan-anime-portrait.png';
                        }}
                        alt="Subhan Shahid"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground leading-none">
                        Subhan Shahid
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground mt-0.5">
                        Navigation
                      </span>
                    </div>
                  </div>


                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Section Navigation Links */}
                <nav className="p-3 space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between ${
                          isActive
                            ? 'text-primary bg-primary/15 font-bold border border-primary/30 shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-surface-2/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] ${isActive ? 'text-primary' : 'text-muted-foreground/60'}`}>
                            {item.number}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Quick Actions */}
              <div className="p-4 border-t border-border/30 bg-surface-2/40 space-y-3">
                {/* WhatsApp Direct Action */}
                <a
                  href={portfolioData.personal.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Download Resume Button */}
                <a
                  href={portfolioData.personal.resumeUrl}
                  download
                  className="btn-primary w-full text-center text-xs font-mono uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
                >
                  <Download size={13} />
                  <span>Download Resume (PDF)</span>
                </a>

                {/* Quick Social & Contact Row */}
                <div className="flex items-center justify-center gap-3 pt-2 text-muted-foreground">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="p-2 rounded-lg bg-surface-3 hover:text-primary transition-colors"
                    aria-label="Send Email"
                    title="Send Email"
                  >
                    <Mail size={15} />
                  </a>
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface-3 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <Linkedin size={15} />
                  </a>
                  <a
                    href={portfolioData.personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-surface-3 hover:text-primary transition-colors"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <Github size={15} />
                  </a>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
