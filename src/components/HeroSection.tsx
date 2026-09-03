import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, ArrowDown, Terminal } from 'lucide-react';
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
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
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

          {/* ─── Right Column — 5 cols (High-End Portrait Card Frame) ─── */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 flex justify-center items-center lg:justify-end order-1 lg:order-2 w-full mb-2 lg:mb-0"
          >
            <div className="relative max-w-full">
              {/* Ambient Glow behind Portrait Card */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-primary/25 via-transparent to-accent/20 rounded-3xl blur-xl sm:blur-2xl opacity-70 pointer-events-none" />

              {/* Orbital contour line */}
              <motion.div
                style={isMobile ? {} : { rotate: orbitRotate }}
                className="absolute -inset-2.5 sm:-inset-4 md:-inset-6 rounded-2xl sm:rounded-3xl border border-primary/20 pointer-events-none"
              />

              {/* Technical dot grid backdrop */}
              <div
                className="absolute -inset-2 sm:-inset-3 rounded-2xl pointer-events-none opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle, hsl(187 80% 48% / 0.25) 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />

              {/* Main Portrait Card Frame */}
              <motion.div
                style={isMobile ? {} : { x: portraitX, y: portraitY }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-[235px] h-[300px] xs:w-[255px] xs:h-[325px] sm:w-[290px] sm:h-[370px] md:w-[320px] md:h-[410px] lg:w-[340px] lg:h-[430px] rounded-2xl overflow-hidden glass-card p-1.5 shadow-2xl shadow-black/70 border-primary/40 group mx-auto"
              >
                {/* Tech Corner Coordinates */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/90 backdrop-blur-md border border-border/40 text-[8.5px] sm:text-[9px] font-mono text-cyan-400 font-medium shadow-sm">
                  <Terminal size={10} />
                  <span>ENG-MSS</span>
                </div>

                {/* Portrait Container */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-surface-2">
                  <img
                    src={portfolioData.personal.profileImage}
                    alt="Muhammad Subhan Shahid, full-stack software engineer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    width={340}
                    height={430}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = portfolioData.personal.profileImageFallback;
                    }}
                  />
                  {/* Subtle edge blend at bottom base */}
                  <div className="absolute inset-x-0 bottom-0 h-10 sm:h-12 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating Metadata Label Pill */}
              <motion.div
                variants={fadeUp}
                className="absolute -bottom-3 sm:-bottom-3.5 left-1/2 -translate-x-1/2 px-2.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-card/95 backdrop-blur-md border border-border/60 shadow-xl z-20 w-max max-w-[92vw]"
              >
                <span className="text-[8.5px] xs:text-[9px] sm:text-[10px] font-mono font-medium text-muted-foreground tracking-wider uppercase flex items-center gap-1.5 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
                  <span className="truncate">FULL-STACK · PRODUCT-MINDED</span>
                  <span className="hidden xs:inline">· PAKISTAN</span>
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
