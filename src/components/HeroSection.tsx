import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ArrowDown, ArrowRight, Terminal } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import WhatsAppIcon from './WhatsAppIcon';

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth spring for subtle parallax
  const springConfig = { stiffness: 45, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Low-amplitude pointer parallax
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  const orbitRotate = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [isMobile, mouseX, mouseY]
  );

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/6 w-[320px] h-[320px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-[1200px] z-10"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ─── Left Column — 7 cols ─── */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            {/* Status Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-green-500/25 bg-green-500/5 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] font-mono font-medium text-green-400 tracking-wider uppercase">
                {portfolioData.personal.availability}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="mb-4">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.35rem] font-extrabold leading-[1.12] text-foreground tracking-tight">
                {portfolioData.personal.headline}
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              {portfolioData.personal.subtitle}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-5"
            >
              <motion.button
                onClick={scrollToWork}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-6 py-3 w-full sm:w-auto justify-center"
              >
                View Selected Work
                <ArrowDown size={14} />
              </motion.button>

              <a
                href={portfolioData.personal.resumeUrl}
                download
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-6 py-3 w-full justify-center"
                >
                  <Download size={14} />
                  Download Resume
                </motion.button>
              </a>
            </motion.div>

            {/* Tertiary Link & Socials */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-1"
            >
              <button
                onClick={scrollToContact}
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>Let's talk</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-primary" />
              </button>

              <div className="h-4 w-px bg-border/50 hidden sm:block" />

              <div className="flex items-center gap-2">
                {[
                  { href: portfolioData.personal.socials.github, icon: Github, label: 'GitHub Profile' },
                  { href: portfolioData.personal.socials.linkedin, icon: Linkedin, label: 'LinkedIn Profile' },
                  { href: `mailto:${portfolioData.personal.email}`, icon: Mail, label: 'Email', external: false },
                  { href: portfolioData.personal.socials.whatsapp, icon: null, label: 'WhatsApp' },
                ].map(({ href, icon: Icon, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external !== false ? '_blank' : undefined}
                    rel={external !== false ? 'noopener noreferrer' : undefined}
                    className="p-2 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                    aria-label={label}
                  >
                    {Icon ? <Icon size={16} /> : <WhatsAppIcon className="w-4 h-4" />}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column — Portrait Card (5 cols) ─── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Ambient Glow behind Portrait */}
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-transparent to-accent/15 rounded-3xl blur-xl opacity-60 pointer-events-none" />

              {/* Orbital contour line */}
              <motion.div
                style={isMobile ? {} : { rotate: orbitRotate }}
                className="absolute -inset-4 sm:-inset-6 rounded-3xl border border-primary/20 pointer-events-none"
              />

              {/* Technical dot grid backdrop */}
              <div
                className="absolute -inset-3 rounded-2xl pointer-events-none opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle, hsl(187 80% 48% / 0.25) 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                }}
              />

              {/* Main Portrait Card Frame (Clean high-contrast framing) */}
              <motion.div
                style={isMobile ? {} : { x: portraitX, y: portraitY }}
                className="relative w-[260px] h-[330px] sm:w-[290px] sm:h-[370px] md:w-[320px] md:h-[410px] lg:w-[340px] lg:h-[430px] rounded-2xl overflow-hidden glass-card p-1.5 shadow-2xl shadow-black/60 border-primary/35 group"
              >
                {/* Tech Corner Coordinates */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded bg-background/85 backdrop-blur-md border border-border/40 text-[9px] font-mono text-primary font-medium">
                  <Terminal size={10} />
                  <span>ENG-MSS</span>
                </div>

                {/* Portrait Container: Clean and high contrast, avoiding heavy dark overlays over the face */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-2">
                  <img
                    src={portfolioData.personal.profileImage}
                    alt="3D anime portrait of Muhammad Subhan Shahid, software engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    width={340}
                    height={430}
                  />
                  {/* Subtle edge blend at bottom base only */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating Metadata Label */}
              <motion.div
                variants={fadeUp}
                className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-xl z-20"
              >
                <span className="text-[10px] font-mono font-medium text-muted-foreground tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  FULL-STACK · PRODUCT-MINDED · PAKISTAN
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
