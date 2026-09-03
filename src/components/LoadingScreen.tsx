import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────────────────────
const MIN_DISPLAY_MS = 2000; // always show for at least this long
const PHASES = [
  { label: 'Initializing universe…', pct: 12 },
  { label: 'Calibrating orbit engines…', pct: 28 },
  { label: 'Loading tech solar system…', pct: 46 },
  { label: 'Activating Chip AI companion…', pct: 64 },
  { label: 'Rendering portfolio assets…', pct: 80 },
  { label: 'Polishing final pixels…', pct: 92 },
  { label: 'Welcome to Subhan\'s universe ✦', pct: 100 },
];

// ─── Mini star-field ─────────────────────────────────────────────────────────
interface Star {
  id: number;
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
  opacity: number;
}

const generateStars = (n: number): Star[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.8 + 0.4,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.6 + 0.2,
  }));

const STARS = generateStars(130);

// ─── Chip Mini SVG (inline) ──────────────────────────────────────────────────
const ChipSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 80 80"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Body */}
    <ellipse cx="40" cy="44" rx="22" ry="18" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="1.5" />
    {/* Head */}
    <ellipse cx="40" cy="28" rx="18" ry="16" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="1.5" />
    {/* Eyes */}
    <ellipse cx="33" cy="26" rx="4.5" ry="5" fill="#38bdf8" />
    <ellipse cx="47" cy="26" rx="4.5" ry="5" fill="#38bdf8" />
    <circle cx="33" cy="26" r="2" fill="#0f172a" />
    <circle cx="47" cy="26" r="2" fill="#0f172a" />
    <circle cx="34" cy="25" r="0.8" fill="white" />
    <circle cx="48" cy="25" r="0.8" fill="white" />
    {/* Horns */}
    <path d="M26 16 L22 6 L30 12Z" fill="#38bdf8" opacity="0.8" />
    <path d="M54 16 L58 6 L50 12Z" fill="#38bdf8" opacity="0.8" />
    {/* Wings */}
    <path d="M18 46 Q6 38 8 56 Q16 52 22 50Z" fill="#0ea5e9" opacity="0.7" />
    <path d="M62 46 Q74 38 72 56 Q64 52 58 50Z" fill="#0ea5e9" opacity="0.7" />
    {/* Tail */}
    <path d="M40 62 Q30 72 36 78 Q44 74 40 68 Q50 74 46 78 Q52 72 40 62Z" fill="#38bdf8" opacity="0.75" />
    {/* Smile */}
    <path d="M34 33 Q40 38 46 33" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Glow dots */}
    <circle cx="40" cy="50" r="3" fill="#06b6d4" opacity="0.6" />
    <circle cx="33" cy="54" r="2" fill="#38bdf8" opacity="0.4" />
    <circle cx="47" cy="54" r="2" fill="#38bdf8" opacity="0.4" />
  </svg>
);

// ─── Orbit ring decoration ───────────────────────────────────────────────────
const OrbitRing: React.FC<{ radius: number; duration: number; dotColor: string; reverse?: boolean }> = ({
  radius,
  duration,
  dotColor,
  reverse = false,
}) => {
  const size = radius * 2 + 4;
  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Dashed ring */}
      <svg width={size} height={size} className="absolute inset-0 opacity-30">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={dotColor}
          strokeWidth="1"
          strokeDasharray="4 7"
        />
      </svg>
      {/* Orbiting dot */}
      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ repeat: Infinity, duration, ease: 'linear' }}
        style={{ width: size, height: size }}
        className="absolute inset-0"
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: dotColor,
            borderRadius: '50%',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -4px)',
            boxShadow: `0 0 8px ${dotColor}`,
          }}
        />
      </motion.div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
interface LoadingScreenProps {
  onDone: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onDone }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [displayPct, setDisplayPct] = useState(0);
  const [chipVisible, setChipVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startTimeRef = useRef(Date.now());
  const doneCalledRef = useRef(false);

  // ── Advance loading phases automatically
  useEffect(() => {
    let idx = 0;
    const advance = () => {
      idx++;
      if (idx < PHASES.length) {
        setPhaseIndex(idx);
        const delay = idx === PHASES.length - 1 ? 600 : Math.random() * 320 + 220;
        setTimeout(advance, delay);
      } else {
        // Show Chip reveal after last phase
        setTimeout(() => setChipVisible(true), 200);
      }
    };
    const firstDelay = 300;
    const timer = setTimeout(advance, firstDelay);
    return () => clearTimeout(timer);
  }, []);

  // ── Smoothly animate the displayed percentage towards the target
  useEffect(() => {
    const target = PHASES[phaseIndex].pct;
    const step = () => {
      setDisplayPct((prev) => {
        const next = Math.min(prev + Math.ceil((target - prev) * 0.14 + 0.5), target);
        return next;
      });
    };
    const raf = setInterval(step, 30);
    return () => clearInterval(raf);
  }, [phaseIndex]);

  // ── Exit after Chip appears + window load
  useEffect(() => {
    if (!chipVisible) return;

    const tryExit = () => {
      if (doneCalledRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => {
        if (doneCalledRef.current) return;
        doneCalledRef.current = true;
        setExiting(true);
        setTimeout(onDone, 700);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      tryExit();
    } else {
      window.addEventListener('load', tryExit, { once: true });
      // Fallback: force exit after 5s regardless
      const fallback = setTimeout(() => {
        if (!doneCalledRef.current) tryExit();
      }, 5000);
      return () => clearTimeout(fallback);
    }
  }, [chipVisible, onDone]);

  const currentPhase = PHASES[phaseIndex];

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: 'hsl(225, 30%, 7%)' }}
          role="status"
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* ── Starfield ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {STARS.map((s) => (
              <motion.div
                key={s.id}
                animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4] }}
                transition={{ repeat: Infinity, duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.r * 2,
                  height: s.r * 2,
                  borderRadius: '50%',
                  background: 'white',
                }}
              />
            ))}
          </div>

          {/* ── Nebula ambient blobs ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)' }}
            />
            <motion.div
              animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 9, delay: 2, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
            />
          </div>

          {/* ── Central Solar System / Reactor Motif ── */}
          <div className="relative flex items-center justify-center mb-8" style={{ width: 280, height: 280 }}>
            {/* Orbit decorations */}
            <OrbitRing radius={126} duration={18} dotColor="#38bdf8" />
            <OrbitRing radius={90} duration={12} dotColor="#818cf8" reverse />
            <OrbitRing radius={56} duration={7} dotColor="#06b6d4" />

            {/* Core plasma glow */}
            <motion.div
              animate={{ scale: [1, 1.22, 1], opacity: [0.55, 0.9, 0.55] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute rounded-full"
              style={{
                width: 120,
                height: 120,
                background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(14,165,233,0.25) 50%, transparent 80%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Core reactor ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute rounded-full border border-dashed border-cyan-400/40"
              style={{ width: 88, height: 88 }}
            />

            {/* Center reactor orb — morphs into Chip */}
            <AnimatePresence mode="wait">
              {!chipVisible ? (
                <motion.div
                  key="reactor"
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center text-center z-10"
                  style={{
                    background: 'linear-gradient(135deg, hsl(225,25%,11%), hsl(225,20%,14%))',
                    border: '2px solid #38bdf8',
                    boxShadow: '0 0 20px rgba(56,189,248,0.3)',
                  }}
                >
                  <Zap size={20} className="text-cyan-300 animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-foreground tracking-tight leading-none mt-0.5">
                    LOADING
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="chip"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                  transition={{
                    scale: { duration: 0.45, ease: 'backOut' },
                    opacity: { duration: 0.3 },
                    y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 0.5 },
                  }}
                  className="relative z-10"
                >
                  {/* Chip glow halo */}
                  <motion.div
                    animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full blur-xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)' }}
                  />
                  <ChipSVG className="w-20 h-20 drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Chip greeting text ── */}
          <AnimatePresence>
            {chipVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6 text-center"
              >
                <p className="text-sm font-mono font-semibold text-cyan-300 tracking-wide">
                  Hey there! I'm Chip 🐉
                </p>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Your AI portfolio companion — tap me anytime!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Progress Bar & Phase Label ── */}
          <div className="w-72 sm:w-96 px-4">
            {/* Label */}
            <div className="flex items-center justify-between mb-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhase.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]"
                >
                  {currentPhase.label}
                </motion.p>
              </AnimatePresence>
              <span className="text-[11px] font-mono font-bold text-cyan-400 ml-2 flex-shrink-0">
                {displayPct}%
              </span>
            </div>

            {/* Bar track */}
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: 'hsl(225, 20%, 14%)' }}
            >
              <motion.div
                animate={{ width: `${displayPct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4, #38bdf8, #818cf8)',
                  boxShadow: '0 0 8px rgba(56,189,248,0.5)',
                }}
              />
            </div>

            {/* Decorative dots row */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {PHASES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === phaseIndex ? 1.4 : 1,
                    opacity: i <= phaseIndex ? 1 : 0.25,
                  }}
                  transition={{ duration: 0.25 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i <= phaseIndex ? '#38bdf8' : '#334155',
                    boxShadow: i === phaseIndex ? '0 0 6px #38bdf8' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Tagline ── */}
          <p className="mt-8 text-xs font-mono text-slate-600 tracking-widest uppercase">
            Subhan Shahid · Full Stack Engineer
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
