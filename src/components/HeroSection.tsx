import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, ArrowDown } from 'lucide-react';
import portfolioData from '@/data/portfolioData';
import AmbientDragonCompanion from './AmbientDragonCompanion';

// Dedicated Animated Highlighter Ribbon for key buzzwords
const AnimatedMarker: React.FC<{
  children: React.ReactNode;
  delay?: number;
  variant?: 'cyan' | 'emerald' | 'purple';
}> = ({ children, delay = 0.2, variant = 'cyan' }) => {
  const gradientMap = {
    cyan: 'from-cyan-500/30 via-primary/35 to-cyan-400/30 border-cyan-400/70 shadow-cyan-500/25',
    emerald: 'from-emerald-500/30 via-teal-500/35 to-emerald-400/30 border-emerald-400/70 shadow-emerald-500/25',
    purple: 'from-indigo-500/30 via-purple-500/35 to-blue-400/30 border-indigo-400/70 shadow-indigo-500/25',
  };

  return (
    <span className="relative inline-block whitespace-nowrap px-1.5 mx-0.5 z-10">
      {/* Animated Highlighter Ribbon Sweep */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          duration: 0.65,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ originX: 0 }}
        className={`absolute inset-x-0 bottom-0.5 top-1.5 -z-10 rounded-md bg-gradient-to-r ${gradientMap[variant]} border-b-2 shadow-lg -skew-x-3 pointer-events-none`}
      />
      {/* Ambient Pulsing Glow on Highlight */}
      <motion.span
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: delay + 0.4 }}
        className="absolute inset-0 -z-10 rounded-md bg-cyan-400/15 blur-sm pointer-events-none"
      />
      <span className="relative text-foreground font-black">{children}</span>
    </span>
  );
};

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

            {/* Headline with 3 Animated Marker Highlights */}
            <motion.h1 variants={fadeUp} className="mb-4">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.35rem] font-extrabold leading-[1.14] text-foreground tracking-tight">
                I build <AnimatedMarker delay={0.35} variant="cyan">reliable</AnimatedMarker> digital products from{' '}
                <AnimatedMarker delay={0.65} variant="cyan">interface</AnimatedMarker> to{' '}
                <AnimatedMarker delay={0.95} variant="cyan">infrastructure</AnimatedMarker>.
              </span>
            </motion.h1>

            {/* Clean, Readable Supporting Copy */}
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

            {/* Ambient Guardian Companion */}
            <motion.div variants={fadeUp} className="pt-2">
              <AmbientDragonCompanion />
            </motion.div>
          </div>

          {/* ─── Right Column — 5 cols (Portrait with Parallax) ─── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              variants={fadeUp}
              style={{ x: portraitX, y: portraitY, rotate: orbitRotate }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_40s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-2 rounded-full border border-dashed border-primary/15 animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />

              {/* Glowing back-layer */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary/20 via-accent/15 to-transparent blur-xl pointer-events-none" />

              {/* Portrait container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_hsla(187,80%,48%,0.15)] bg-surface-2 flex items-center justify-center">
                <img
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover object-top filter brightness-95 contrast-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = portfolioData.personal.profileImageFallback;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
