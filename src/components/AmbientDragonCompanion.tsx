import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import DragonMascot from './DragonMascot';
import { DragonState } from '@/types/mascot';

interface AmbientDragonCompanionProps {
  className?: string;
}

export const AmbientDragonCompanion: React.FC<AmbientDragonCompanionProps> = ({
  className = '',
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [state, setState] = useState<DragonState>('idle');
  const [lookAtPos, setLookAtPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    if (mq.matches) setState('reducedMotion');

    const listener = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setState('reducedMotion');
      else setState('idle');
    };

    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const openAssistant = () => {
    const launcherBtn = document.querySelector('button[aria-label="Open Chip AI portfolio assistant"]') as HTMLButtonElement;
    if (launcherBtn) {
      launcherBtn.click();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setLookAtPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-surface-1/60 hover:bg-surface-2/80 border border-primary/25 hover:border-primary/50 backdrop-blur-md transition-all duration-300 group cursor-pointer ${className}`}
      onClick={openAssistant}
      onMouseEnter={() => !isReducedMotion && setState('curious')}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setLookAtPos(null);
        if (!isReducedMotion) setState('idle');
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAssistant();
        }
      }}
      aria-label="Ask Chip AI portfolio companion"
    >
      <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-surface-3/80 border border-primary/40 flex-shrink-0 group-hover:border-primary transition-colors">
        <DragonMascot
          state={state}
          size="xs"
          lookAt={lookAtPos}
          showHalo={false}
          showLabel={false}
          altText="Chip dragon companion"
        />
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1 text-[11px] font-bold text-foreground group-hover:text-primary transition-colors">
          <span>Ask Chip AI</span>
          <Sparkles size={10} className="text-primary animate-pulse" />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/80 leading-tight">
          Explore projects, experience & tech
        </span>
      </div>
    </motion.div>
  );
};

export default AmbientDragonCompanion;

