import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragonState } from '@/types/mascot';

interface LiveDragonPuppetProps {
  state: DragonState;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  lookAt?: { x: number; y: number } | null;
  className?: string;
  isInteractive?: boolean;
}

const sizePixels = {
  xs: 28,
  sm: 42,
  md: 62,
  lg: 104,
  xl: 160,
};


export const LiveDragonPuppet: React.FC<LiveDragonPuppetProps> = ({
  state = 'idle',
  size = 'md',
  lookAt = null,
  className = '',
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [jawOpen, setJawOpen] = useState(0);
  const [gazeOffset, setGazeOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const jawIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isReduced = prefersReducedMotion || state === 'reducedMotion';
  const isSleeping = state === 'sleeping';
  const isThinking = state === 'thinking';
  const isCurious = state === 'curious';
  const isAnswering = state === 'answering';
  const isGreeting = state === 'greeting';
  const isExcited = state === 'excited';
  const isListening = state === 'listening';
  const isError = state === 'error';

  // Realistic randomized blink controller (every 6 to 11 seconds)
  useEffect(() => {
    if (isReduced || isSleeping) {
      setIsBlinking(false);
      return;
    }

    let isMounted = true;

    const scheduleNextBlink = () => {
      const delay = isGreeting ? 1000 : 6000 + Math.random() * 5000;
      blinkTimerRef.current = setTimeout(() => {
        if (!isMounted) return;
        setIsBlinking(true);

        setTimeout(() => {
          if (!isMounted) return;
          setIsBlinking(false);

          if (isGreeting || Math.random() < 0.3) {
            setTimeout(() => {
              if (!isMounted) return;
              setIsBlinking(true);
              setTimeout(() => {
                if (isMounted) {
                  setIsBlinking(false);
                  scheduleNextBlink();
                }
              }, 130);
            }, 160);
          } else {
            scheduleNextBlink();
          }
        }, 150);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isMounted = false;
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [isReduced, isSleeping, isGreeting]);

  // Subtle conversational jaw cadence
  useEffect(() => {
    if (isReduced) {
      setJawOpen(0);
      return;
    }

    if (isAnswering) {
      let step = 0;
      jawIntervalRef.current = setInterval(() => {
        step = (step + 1) % 6;
        setJawOpen(step === 1 || step === 3 ? 0.7 : step === 2 ? 0.35 : 0);
      }, 150);
    } else if (isListening) {
      setJawOpen(0.25);
    } else {
      setJawOpen(0);
    }

    return () => {
      if (jawIntervalRef.current) clearInterval(jawIntervalRef.current);
    };
  }, [isAnswering, isListening, isReduced]);

  // Gaze tracking
  useEffect(() => {
    if (isReduced || isSleeping) {
      setGazeOffset({ x: 0, y: 0 });
      return;
    }

    if (lookAt && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = lookAt.x - centerX;
      const dy = lookAt.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      const maxOffset = 3.5;
      const factor = Math.min(dist / 220, 1);
      setGazeOffset({
        x: (dx / dist) * maxOffset * factor,
        y: (dy / dist) * maxOffset * factor,
      });
    } else {
      if (isThinking) {
        setGazeOffset({ x: 1.8, y: -2.8 });
      } else if (isCurious) {
        setGazeOffset({ x: 2.4, y: 0.6 });
      } else if (isListening) {
        setGazeOffset({ x: 0.6, y: 1.4 });
      } else if (isError) {
        setGazeOffset({ x: 0, y: 2.2 });
      } else {
        setGazeOffset({ x: 0, y: 0 });
      }
    }
  }, [lookAt, isReduced, isSleeping, isThinking, isCurious, isListening, isError]);

  // Head Rotation & Tilt
  const headVariants = useMemo(
    () => ({
      idle: {
        rotate: isReduced ? 0 : [0, 2, -1, 1.5, 0],
        y: isReduced ? 0 : [0, -1.8, 0.5, -1.2, 0],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 3.2, ease: 'easeInOut' },
      },
      curious: {
        rotate: 6,
        y: -3,
        transition: { duration: 0.35, ease: 'easeOut' },
      },
      greeting: {
        rotate: [0, -5, 5, 0],
        y: [0, -6, -2],
        transition: { duration: 0.7, ease: 'easeInOut' },
      },
      listening: {
        rotate: 3,
        y: -2,
        transition: { duration: 0.25, ease: 'easeOut' },
      },
      thinking: {
        rotate: isReduced ? -4 : [-4, -2, -4],
        y: isReduced ? -3 : [-3, -5, -3],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 2.4, ease: 'easeInOut' },
      },
      answering: {
        rotate: [0, 2, 0],
        y: [0, -1.5, 0],
        transition: { duration: 0.4, ease: 'easeOut' },
      },
      excited: {
        rotate: [0, -6, 6, 0],
        y: [0, -8, -3],
        transition: { duration: 0.5, ease: 'backOut' },
      },
      sleeping: {
        rotate: -7,
        y: 3,
        transition: { duration: 1.2, ease: 'easeInOut' },
      },
      error: {
        rotate: -4,
        y: 2.5,
        transition: { duration: 0.4 },
      },
      reducedMotion: {
        rotate: 0,
        y: 0,
        transition: { duration: 0 },
      },
    }),
    [isReduced]
  );

  // Buoyant Body & Breathing
  const torsoVariants = useMemo(
    () => ({
      idle: {
        scaleY: isReduced ? 1 : [1, 1.05, 0.97, 1.04, 1],
        scaleX: isReduced ? 1 : [1, 1.025, 0.98, 1.02, 1],
        y: isReduced ? 0 : [0, -4.5, 1.5, -3.5, 0],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.6, ease: 'easeInOut' },
      },
      sleeping: {
        scaleY: isReduced ? 0.98 : [0.97, 1.02, 0.97],
        scaleX: isReduced ? 0.99 : [0.98, 1.015, 0.98],
        y: 2,
        opacity: 0.9,
        transition: { repeat: isReduced ? 0 : Infinity, duration: 5.6, ease: 'easeInOut' },
      },
      thinking: {
        scaleY: isReduced ? 1 : [1, 1.04, 0.98, 1.03, 1],
        y: isReduced ? -3 : [-3, -6, -2, -5, -3],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 2.0, ease: 'easeInOut' },
      },
      excited: {
        scaleY: [1, 1.1, 0.95, 1.08, 1],
        scaleX: [1, 1.06, 0.97, 1.04, 1],
        y: [0, -8, 2, -6, 0],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 0.9, ease: 'easeInOut' },
      },
      greeting: {
        scaleY: [1, 1.06, 1.01],
        y: [0, -5, 0],
        transition: { duration: 0.6, ease: 'easeOut' },
      },
      curious: {
        scaleY: 1.04,
        y: [-1.5, -4.5, -1.5],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.5, ease: 'easeInOut' },
      },
      listening: {
        scaleY: 1.03,
        y: [-1, -3.5, -1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.6, ease: 'easeInOut' },
      },
      answering: {
        scaleY: [1, 1.04, 1],
        y: [0, -3.5, 1, -2.5, 0],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.5, ease: 'easeInOut' },
      },
      error: {
        scaleY: 0.98,
        y: 2,
        transition: { duration: 0.3 },
      },
      reducedMotion: {
        scaleY: 1,
        scaleX: 1,
        y: 0,
        transition: { duration: 0 },
      },
    }),
    [isReduced]
  );

  // Left (Back) Wing Flapping
  const backWingVariants = useMemo(
    () => ({
      idle: {
        rotate: isReduced ? 0 : [0, -28, 8, -24, 0],
        scaleY: isReduced ? 1 : [1, 1.28, 0.85, 1.22, 1],
        scaleX: isReduced ? 1 : [1, 0.86, 1.12, 0.9, 1],
        transition: {
          repeat: isReduced ? 0 : Infinity,
          duration: 1.6,
          ease: 'easeInOut',
        },
      },
      greeting: {
        rotate: [-12, 32, -18, 28, 0],
        scale: [1, 1.34, 0.88, 1.28, 1],
        transition: { duration: 0.8, ease: 'easeInOut' },
      },
      excited: {
        rotate: [0, -36, 22, -30, 18, -26, 0],
        scale: [1, 1.38, 0.82, 1.32, 0.88, 1.25, 1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 0.9, ease: 'easeInOut' },
      },
      sleeping: {
        rotate: 12,
        scale: 0.84,
        transition: { duration: 1.0 },
      },
      thinking: {
        rotate: isReduced ? 0 : [0, -18, 4, -14, 0],
        scaleY: isReduced ? 1 : [1, 1.18, 0.92, 1.15, 1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 2.0, ease: 'easeInOut' },
      },
      curious: {
        rotate: [-18, -6, -18],
        scale: [1.14, 1.24, 1.14],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.5, ease: 'easeInOut' },
      },
      listening: {
        rotate: [-14, -4, -14],
        scale: 1.12,
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.6, ease: 'easeInOut' },
      },
      answering: {
        rotate: [0, -20, 6, -16, 0],
        scaleY: [1, 1.22, 0.9, 1.18, 1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.5, ease: 'easeInOut' },
      },
      error: {
        rotate: 8,
        scale: 0.9,
        transition: { duration: 0.3 },
      },
      reducedMotion: {
        rotate: 0,
        scale: 1,
        transition: { duration: 0 },
      },
    }),
    [isReduced]
  );

  // Right (Front) Wing Flapping
  const frontWingVariants = useMemo(
    () => ({
      idle: {
        rotate: isReduced ? 0 : [0, 32, -10, 26, 0],
        scaleY: isReduced ? 1 : [1, 1.32, 0.82, 1.26, 1],
        scaleX: isReduced ? 1 : [1, 0.84, 1.15, 0.88, 1],
        transition: {
          repeat: isReduced ? 0 : Infinity,
          duration: 1.6,
          ease: 'easeInOut',
        },
      },
      greeting: {
        rotate: [12, -34, 18, -26, 0],
        scale: [1, 1.36, 0.86, 1.3, 1],
        transition: { duration: 0.8, ease: 'easeInOut' },
      },
      excited: {
        rotate: [0, 40, -26, 34, -20, 28, 0],
        scale: [1, 1.42, 0.8, 1.35, 0.86, 1.28, 1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 0.9, ease: 'easeInOut' },
      },
      sleeping: {
        rotate: -12,
        scale: 0.84,
        transition: { duration: 1.0 },
      },
      thinking: {
        rotate: isReduced ? 0 : [0, 20, -6, 16, 0],
        scaleY: isReduced ? 1 : [1, 1.22, 0.88, 1.18, 1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 2.0, ease: 'easeInOut' },
      },
      curious: {
        rotate: [20, 8, 20],
        scale: [1.16, 1.26, 1.16],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.5, ease: 'easeInOut' },
      },
      listening: {
        rotate: [15, 5, 15],
        scale: 1.14,
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.6, ease: 'easeInOut' },
      },
      answering: {
        rotate: [0, 24, -8, 18, 0],
        scaleY: [1, 1.25, 0.86, 1.2, 1],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 1.5, ease: 'easeInOut' },
      },
      error: {
        rotate: -8,
        scale: 0.9,
        transition: { duration: 0.3 },
      },
      reducedMotion: {
        rotate: 0,
        scale: 1,
        transition: { duration: 0 },
      },
    }),
    [isReduced]
  );

  // Tail kinematics
  const tailVariants = useMemo(
    () => ({
      idle: {
        rotate: isReduced ? 0 : [0, 9, -7, 8, 0],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 2.8, ease: 'easeInOut' },
      },
      excited: {
        rotate: [0, 22, -20, 18, -14, 0],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 0.8, ease: 'easeInOut' },
      },
      sleeping: {
        rotate: -15,
        scale: 0.92,
        transition: { duration: 1.2 },
      },
      thinking: {
        rotate: isReduced ? -5 : [-5, 3, -5],
        transition: { repeat: isReduced ? 0 : Infinity, duration: 2.4, ease: 'easeInOut' },
      },
      curious: {
        rotate: 12,
        transition: { duration: 0.3 },
      },
      greeting: {
        rotate: 14,
        transition: { duration: 0.4 },
      },
      listening: {
        rotate: 6,
        transition: { duration: 0.25 },
      },
      answering: {
        rotate: [0, 7, 0],
        transition: { duration: 0.4 },
      },
      error: {
        rotate: -8,
        transition: { duration: 0.3 },
      },
      reducedMotion: {
        rotate: 0,
        transition: { duration: 0 },
      },
    }),
    [isReduced]
  );

  const glowOpacity = isSleeping ? 0.25 : isThinking ? 1 : isExcited ? 1 : isError ? 0.35 : 0.75;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none pointer-events-auto ${className}`}
      style={{
        width: sizePixels[size],
        height: sizePixels[size],
      }}
      aria-hidden="true"
    >
      {/* Floating Thinking Energy Embers */}
      <AnimatePresence>
        {isThinking && !isReduced && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none z-30">
            <motion.span
              animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
            />
            <motion.span
              animate={{ y: [0, -11, 0], opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8]"
            />
            <motion.span
              animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Sleeping Zzz Floating Indicator */}
      <AnimatePresence>
        {isSleeping && !isReduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 0, x: 0 }}
            animate={{ opacity: [0, 0.95, 0], y: [-2, -22], x: [0, 10] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeOut' }}
            className="absolute -top-4 right-0 text-[12px] font-mono font-bold text-cyan-300 pointer-events-none z-30 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
          >
            Zzz
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Articulated Dragon SVG Rig */}
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full overflow-visible filter drop-shadow-[0_6px_20px_rgba(0,229,255,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Obsidian Midnight Dragon Scale Gradient */}
          <linearGradient id="dragonScales" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#223354" />
            <stop offset="40%" stopColor="#101b30" />
            <stop offset="100%" stopColor="#080e1a" />
          </linearGradient>

          {/* Bioluminescent Cyan Plasma Gradient */}
          <linearGradient id="cyanPlasma" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#00f0ff" />
            <stop offset="70%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Translucent Cyan Wing Membrane Gradient */}
          <linearGradient id="wingVanes" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#0c172a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050a14" stopOpacity="0.95" />
          </linearGradient>

          {/* Warm Amber-Gold Eye Gradient */}
          <radialGradient id="amberGoldIris" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          {/* Cyan Glowing Pupil Core */}
          <radialGradient id="cyanPupilGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>

          {/* Soft Glow Filter */}
          <filter id="cyanGlowEffect" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Soft Cyan Backing Aura */}
        <motion.circle
          cx="70"
          cy="70"
          r="54"
          fill="url(#cyanPlasma)"
          initial={{ opacity: 0.18 }}
          animate={{
            opacity: isThinking ? [0.3, 0.55, 0.3] : glowOpacity * 0.32,
            scale: isThinking ? [0.95, 1.08, 0.95] : 1,
          }}
          transition={{
            repeat: isThinking ? Infinity : 0,
            duration: isThinking ? 1.8 : 0.4,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '70px 70px' }}
          className="pointer-events-none"
        />

        {/* Layer 1: Back Wing (Left Wing - Pivot at 46, 62) */}
        <motion.g
          variants={backWingVariants}
          animate={state}
          style={{ transformOrigin: '46px 62px' }}
        >
          {/* Main Upper Wing Bone Spar */}
          <path
            d="M46 62 C34 46 22 34 8 26 C12 38 24 54 36 68 Z"
            fill="url(#dragonScales)"
            stroke="#00f0ff"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />
          {/* Main Translucent Wing Membrane Fan */}
          <path
            d="M8 26 C16 38 24 50 28 64 C32 52 40 44 46 62 C36 50 26 38 8 26 Z"
            fill="url(#wingVanes)"
          />
          {/* Secondary Feather Struts & Cyan Runes */}
          <path
            d="M8 26 C18 40 28 58 32 72 M16 34 L26 62 M24 44 L34 68"
            stroke="#00f0ff"
            strokeWidth="0.8"
            strokeOpacity="0.85"
          />
          {/* Wing Tip Crystal Spike */}
          <circle cx="8" cy="26" r="1.6" fill="#00f0ff" filter="url(#cyanGlowEffect)" />
        </motion.g>

        {/* Layer 2: 4-Segment Kinematic Tail (Pivot at 54, 100) */}
        <motion.g
          variants={tailVariants}
          animate={state}
          style={{ transformOrigin: '54px 100px' }}
        >
          {/* Flowing Serpentine Tail Spine */}
          <path
            d="M54 100 C42 108 26 114 16 106 C8 100 12 86 20 80 C15 88 18 98 28 100 C38 102 46 100 54 100 Z"
            fill="url(#dragonScales)"
            stroke="#00f0ff"
            strokeWidth="1.0"
            strokeOpacity="0.6"
          />
          {/* Dragon Flame / Crystal Blade Tail Crest */}
          <path
            d="M16 106 C10 102 4 92 10 84 C14 90 18 94 20 80 C18 90 17 98 16 106 Z"
            fill="url(#cyanPlasma)"
            filter="url(#cyanGlowEffect)"
            opacity={glowOpacity}
          />
          {/* Spine Crest Rune Accents */}
          <circle cx="32" cy="101" r="1.4" fill="#00f0ff" />
          <circle cx="42" cy="101" r="1.4" fill="#00f0ff" />
        </motion.g>

        {/* Layer 3: Main Torso & Chest Scale Armor (Pivot at 70, 92) */}
        <motion.g
          variants={torsoVariants}
          animate={state}
          style={{ transformOrigin: '70px 92px' }}
        >
          {/* Main Body Sleek Silhouette */}
          <path
            d="M52 68 C52 68 44 80 44 96 C44 110 56 114 70 114 C84 114 96 110 96 96 C96 80 88 68 88 68 C80 72 60 72 52 68 Z"
            fill="url(#dragonScales)"
            stroke="#1e293b"
            strokeWidth="1.4"
          />

          {/* Segmented Chest Scales Plates */}
          <path
            d="M56 74 C60 82 70 86 70 86 C70 86 80 82 84 74 C82 86 70 98 70 98 C70 98 58 86 56 74 Z"
            fill="#122038"
            stroke="#00f0ff"
            strokeWidth="0.9"
            strokeOpacity="0.75"
          />
          {/* Lower Belly Plating */}
          <path
            d="M60 88 C64 96 70 98 70 98 C70 98 76 96 80 88 C78 98 70 108 70 108 C70 108 62 98 60 88 Z"
            fill="#0c1626"
            stroke="#00f0ff"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Bioluminescent Chest Core Inlay */}
          <motion.path
            d="M70 76 L70 98 M62 84 L78 84 M64 92 L76 92"
            stroke="url(#cyanPlasma)"
            strokeWidth="1.4"
            strokeLinecap="round"
            filter="url(#cyanGlowEffect)"
            animate={{
              opacity: isThinking ? [0.6, 1, 0.6] : isAnswering ? [0.8, 1, 0.8] : glowOpacity,
            }}
            transition={{
              repeat: isThinking || isAnswering ? Infinity : 0,
              duration: isThinking ? 1.4 : 0.8,
            }}
          />

          {/* Front Claws & Paws */}
          <g>
            {/* Left Paw */}
            <path
              d="M48 106 C46 112 50 116 54 116 C57 116 59 112 57 106 Z"
              fill="#0d1527"
              stroke="#00f0ff"
              strokeWidth="0.7"
            />
            <line x1="50" y1="115" x2="50" y2="118" stroke="#00f0ff" strokeWidth="1.0" />
            <line x1="54" y1="116" x2="54" y2="119" stroke="#00f0ff" strokeWidth="1.0" />

            {/* Right Paw */}
            <path
              d="M92 106 C94 112 90 116 86 116 C83 116 81 112 83 106 Z"
              fill="#0d1527"
              stroke="#00f0ff"
              strokeWidth="0.7"
            />
            <line x1="90" y1="115" x2="90" y2="118" stroke="#00f0ff" strokeWidth="1.0" />
            <line x1="86" y1="116" x2="86" y2="119" stroke="#00f0ff" strokeWidth="1.0" />
          </g>
        </motion.g>

        {/* Layer 6: Front Wing (Right Wing - Pivot at 90, 62) */}
        <motion.g
          variants={frontWingVariants}
          animate={state}
          style={{ transformOrigin: '90px 62px' }}
        >
          {/* Main Upper Wing Bone Spar */}
          <path
            d="M90 62 C102 44 118 30 132 22 C126 36 114 52 100 68 Z"
            fill="url(#dragonScales)"
            stroke="#00f0ff"
            strokeWidth="1.3"
            strokeOpacity="0.9"
          />
          {/* Translucent Wing Membrane */}
          <path
            d="M132 22 C122 36 112 48 108 64 C104 52 96 44 90 62 C100 50 114 34 132 22 Z"
            fill="url(#wingVanes)"
          />
          {/* Struts & Glow Accents */}
          <path
            d="M132 22 C120 38 110 56 104 70 M122 32 L112 60 M114 42 L106 66"
            stroke="#00f0ff"
            strokeWidth="0.8"
            strokeOpacity="0.9"
          />
          <circle cx="132" cy="22" r="1.8" fill="#00f0ff" filter="url(#cyanGlowEffect)" />
        </motion.g>

        {/* Layer 7: Neck & Head Assembly (Pivot at 70, 60) */}
        <motion.g
          variants={headVariants}
          animate={state}
          style={{ transformOrigin: '70px 60px' }}
        >
          {/* Serpentine Neck */}
          <path
            d="M58 58 C58 68 56 74 54 80 C64 82 76 82 86 80 C84 74 82 68 82 58 Z"
            fill="#101b30"
            stroke="#00f0ff"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />

          {/* Layer 8: Majestic Swept Horns */}
          {/* Left Horn */}
          <path
            d="M56 36 C46 20 34 12 22 8 C26 18 34 28 48 40 Z"
            fill="url(#dragonScales)"
            stroke="#00f0ff"
            strokeWidth="1.1"
            strokeOpacity="0.9"
          />
          <path
            d="M26 10 C32 18 40 26 50 34"
            stroke="#00f0ff"
            strokeWidth="1.0"
            filter="url(#cyanGlowEffect)"
            opacity={glowOpacity}
          />

          {/* Right Horn */}
          <path
            d="M84 36 C94 20 106 12 118 8 C114 18 106 28 92 40 Z"
            fill="url(#dragonScales)"
            stroke="#00f0ff"
            strokeWidth="1.1"
            strokeOpacity="0.9"
          />
          <path
            d="M114 10 C108 18 100 26 90 34"
            stroke="#00f0ff"
            strokeWidth="1.0"
            filter="url(#cyanGlowEffect)"
            opacity={glowOpacity}
          />

          {/* Central Crown Crest Fin */}
          <path
            d="M66 28 C68 16 70 10 70 10 C70 10 72 16 74 28 Z"
            fill="url(#cyanPlasma)"
            filter="url(#cyanGlowEffect)"
            opacity={glowOpacity}
          />

          {/* Main Sculpted Anime Dragon Head */}
          <path
            d="M48 38 C48 38 38 50 40 64 C43 76 56 82 70 84 C84 82 97 76 100 64 C102 50 92 38 92 38 C84 40 76 36 70 36 C64 36 56 40 48 38 Z"
            fill="url(#dragonScales)"
            stroke="#00f0ff"
            strokeWidth="1.3"
          />

          {/* Forehead Ridge Scales */}
          <path
            d="M60 38 L70 44 L80 38"
            stroke="#00f0ff"
            strokeWidth="0.9"
            strokeOpacity="0.75"
          />

          {/* Layer 9: Sleek Snout & Articulated Jaw */}
          <g>
            {/* Snout */}
            <path
              d="M58 58 C62 66 70 68 70 68 C70 68 78 66 82 58 C78 56 62 56 58 58 Z"
              fill="#14233e"
              stroke="#00f0ff"
              strokeWidth="0.8"
              strokeOpacity="0.7"
            />
            {/* Nostrils */}
            <circle cx="65" cy="62" r="0.9" fill="#00f0ff" />
            <circle cx="75" cy="62" r="0.9" fill="#00f0ff" />

            {/* Jaw Movement */}
            <motion.path
              d="M60 68 C64 76 70 78 70 78 C70 78 76 76 80 68 Z"
              fill="#090f1c"
              stroke="#00f0ff"
              strokeWidth="0.8"
              strokeOpacity="0.9"
              animate={{
                y: jawOpen * 3.0,
                scaleY: 1 + jawOpen * 0.35,
              }}
              transition={{ duration: 0.12 }}
              style={{ transformOrigin: '70px 68px' }}
            />
          </g>

          {/* Layer 10 & 11: Expressive Anime Dragon Eyes */}
          <g>
            {/* Left Eye */}
            <g transform="translate(54, 52)">
              <ellipse cx="0" cy="0" rx="6.0" ry="4.8" fill="#060a12" />
              <ellipse cx="0" cy="0" rx="5.5" ry="4.4" fill="url(#amberGoldIris)" />

              {/* Glowing Gaze-Tracking Pupil Core */}
              <motion.ellipse
                cx={gazeOffset.x}
                cy={gazeOffset.y}
                rx={isThinking || isCurious ? 2.4 : 2.9}
                ry={isThinking || isCurious ? 1.9 : 2.5}
                fill="url(#cyanPupilGlow)"
                filter="url(#cyanGlowEffect)"
              />
              {/* Specular Catchlights */}
              <circle cx={gazeOffset.x - 1.5} cy={gazeOffset.y - 1.2} r="1.1" fill="#ffffff" />
              <circle cx={gazeOffset.x + 1.2} cy={gazeOffset.y + 1.0} r="0.6" fill="#ffffff" opacity="0.8" />

              {/* Blinking Eyelid */}
              <motion.rect
                x="-8"
                y="-8"
                width="16"
                height="16"
                fill="#101b30"
                stroke="#00f0ff"
                strokeWidth="0.9"
                initial={false}
                animate={{
                  scaleY: isSleeping ? 1 : isBlinking ? 1 : isThinking || isCurious ? 0.38 : 0,
                }}
                transition={{ duration: isBlinking ? 0.08 : 0.2 }}
                style={{ transformOrigin: '0px -5px' }}
              />
            </g>

            {/* Right Eye */}
            <g transform="translate(86, 52)">
              <ellipse cx="0" cy="0" rx="6.0" ry="4.8" fill="#060a12" />
              <ellipse cx="0" cy="0" rx="5.5" ry="4.4" fill="url(#amberGoldIris)" />

              {/* Glowing Gaze-Tracking Pupil Core */}
              <motion.ellipse
                cx={gazeOffset.x}
                cy={gazeOffset.y}
                rx={isThinking || isCurious ? 2.4 : 2.9}
                ry={isThinking || isCurious ? 1.9 : 2.5}
                fill="url(#cyanPupilGlow)"
                filter="url(#cyanGlowEffect)"
              />
              {/* Specular Catchlights */}
              <circle cx={gazeOffset.x - 1.5} cy={gazeOffset.y - 1.2} r="1.1" fill="#ffffff" />
              <circle cx={gazeOffset.x + 1.2} cy={gazeOffset.y + 1.0} r="0.6" fill="#ffffff" opacity="0.8" />

              {/* Blinking Eyelid */}
              <motion.rect
                x="-8"
                y="-8"
                width="16"
                height="16"
                fill="#101b30"
                stroke="#00f0ff"
                strokeWidth="0.9"
                initial={false}
                animate={{
                  scaleY: isSleeping ? 1 : isBlinking ? 1 : isThinking || isCurious ? 0.38 : 0,
                }}
                transition={{ duration: isBlinking ? 0.08 : 0.2 }}
                style={{ transformOrigin: '0px -5px' }}
              />
            </g>
          </g>

          {/* Bioluminescent Cheek Circuit Etchings */}
          <path
            d="M44 56 L48 58 L46 62"
            stroke="#00f0ff"
            strokeWidth="0.8"
            opacity={glowOpacity * 0.9}
          />
          <path
            d="M96 56 L92 58 L94 62"
            stroke="#00f0ff"
            strokeWidth="0.8"
            opacity={glowOpacity * 0.9}
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default LiveDragonPuppet;
