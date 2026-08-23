import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragonMascotProps, MASCOT_ASSETS } from '@/types/mascot';
import { Sparkles } from 'lucide-react';
import LiveDragonPuppet from './mascot/LiveDragonPuppet';

const sizeContainerMap = {
  xs: 'w-7 h-7',
  sm: 'w-11 h-11',
  md: 'w-16 h-16',
  lg: 'w-26 h-26',
  xl: 'w-40 h-40',
};

const dimensionMap = {
  xs: 28,
  sm: 42,
  md: 62,
  lg: 104,
  xl: 160,
};



const stateLabels: Record<string, string> = {
  idle: 'Chip · Ready',
  curious: 'Chip · Curious',
  greeting: 'Chip · Welcome!',
  listening: 'Chip · Listening...',
  thinking: 'Chip · Checking knowledge...',
  answering: 'Chip · Answering',
  excited: 'Chip · Exploring!',
  sleeping: 'Chip · Resting (Zzz)',
  error: 'Chip · Unavailable',
  reducedMotion: 'Chip · AI Companion',
};

export const DragonMascot: React.FC<DragonMascotProps> = ({
  state = 'idle',
  size = 'md',
  interactive = false,
  showLabel = false,
  showHalo = true,
  onOpenAssistant,
  className = '',
  altText,
  lookAt = null,
}) => {
  const [hasImgError, setHasImgError] = useState(false);

  const isReducedMotion = state === 'reducedMotion';
  const isSleeping = state === 'sleeping';
  const isThinking = state === 'thinking';
  const isExcited = state === 'excited';

  const defaultAlt = altText || `Chip AI guardian dragon mascot in ${state} state`;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      onClick={interactive ? onOpenAssistant : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? 'Open Chip AI portfolio assistant' : defaultAlt}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenAssistant?.();
              }
            }
          : undefined
      }
    >
      {/* Bioluminescent Ambient Halo */}
      {showHalo && (
        <motion.div
          animate={{
            opacity: isSleeping ? 0.2 : isThinking ? [0.4, 0.85, 0.4] : isExcited ? 0.9 : 0.5,
            scale: isThinking ? [0.95, 1.1, 0.95] : isExcited ? 1.12 : 1,
          }}
          transition={{
            repeat: isThinking ? Infinity : 0,
            duration: isThinking ? 2.0 : 0.4,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-primary/20 to-blue-500/25 blur-lg pointer-events-none -z-10"
        />
      )}

      {/* Mascot Container */}
      <div
        className={`relative ${sizeContainerMap[size]} flex items-center justify-center overflow-visible rounded-2xl ${
          interactive ? 'cursor-pointer' : ''
        }`}
      >
        {!hasImgError ? (
          <LiveDragonPuppet
            state={state}
            size={size}
            lookAt={lookAt}
            className="w-full h-full"
            isInteractive={interactive}
          />
        ) : (
          <img
            src={MASCOT_ASSETS.fallback}
            alt={defaultAlt}
            width={dimensionMap[size]}
            height={dimensionMap[size]}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,229,255,0.2)]"
          />
        )}
      </div>

      {/* Optional State Label */}
      {showLabel && (
        <span className="mt-1.5 text-[10px] font-mono font-medium text-cyan-300/90 tracking-wide flex items-center gap-1">
          {isExcited && <Sparkles size={10} className="text-cyan-400 animate-pulse" />}
          {stateLabels[state] || stateLabels.idle}
        </span>
      )}
    </div>
  );
};

export default DragonMascot;

