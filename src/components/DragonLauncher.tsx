import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DragonMascot from './DragonMascot';
import { DragonState } from '@/types/mascot';

// ── Drag hint messages Chip cycles through ────────────────────────────────────
const DRAG_HINTS = [
  "You can drag me anywhere! 🐉",
  "Psst… drag me to the other side!",
  "Click me to ask about Subhan!",
  "I follow you everywhere 👀",
  "Drag me, click me — I'm yours!",
];

const HINT_SHOW_AFTER_MS  = 4000;   // first hint fires 4s after mount
const HINT_INTERVAL_MS    = 22000;  // then every 22s
const HINT_DURATION_MS    = 3800;   // how long each hint stays visible

interface DragonLauncherProps {
  isOpen: boolean;
  state: DragonState;
  onOpen: (pos?: { x: number; y: number }) => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

export const DragonLauncher: React.FC<DragonLauncherProps> = ({
  isOpen,
  state,
  onOpen,
  onHover,
  onHoverEnd,
}) => {
  const [lookAtPos, setLookAtPos]     = useState<{ x: number; y: number } | null>(null);
  const [position, setPosition]       = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [facingDir, setFacingDir]     = useState<1 | -1>(1);
  const [isFlying, setIsFlying]       = useState(false);
  const [isDragging, setIsDragging]   = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dragHint, setDragHint]       = useState<string | null>(null);

  const hoverTimeoutRef    = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef     = useRef<NodeJS.Timeout | null>(null);
  const hintIntervalRef    = useRef<NodeJS.Timeout | null>(null);
  const hintIndexRef       = useRef(0);
  const isPointerDownRef   = useRef(false);
  const hasMovedRef        = useRef(false);
  const dragOriginRef      = useRef<{
    startPointerX: number; startPointerY: number;
    startPosX: number;    startPosY: number;
  }>({ startPointerX: 0, startPointerY: 0, startPosX: 0, startPosY: 0 });

  // ── Show a hint bubble, then hide after HINT_DURATION_MS ──────────────────
  const showHint = useCallback(() => {
    if (isOpen || isDragging) return;
    const msg = DRAG_HINTS[hintIndexRef.current % DRAG_HINTS.length];
    hintIndexRef.current += 1;
    setDragHint(msg);
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => setDragHint(null), HINT_DURATION_MS);
  }, [isOpen, isDragging]);

  // ── Schedule periodic drag hints ──────────────────────────────────────────
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      showHint();
      hintIntervalRef.current = setInterval(showHint, HINT_INTERVAL_MS);
    }, HINT_SHOW_AFTER_MS);

    return () => {
      clearTimeout(firstTimer);
      if (hintIntervalRef.current) clearInterval(hintIntervalRef.current);
      if (hintTimeoutRef.current)  clearTimeout(hintTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Dismiss hint when dragging or assistant is opened
  useEffect(() => {
    if (isDragging || isOpen) {
      setDragHint(null);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    }
  }, [isDragging, isOpen]);

  // ── Set default position bottom-right ─────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const maxX = Math.max(16, window.innerWidth - 80);
        const maxY = Math.max(16, window.innerHeight - 80);
        if (prev.x === 0 && prev.y === 0) return { x: maxX, y: maxY };
        return {
          x: Math.max(16, Math.min(prev.x, maxX)),
          y: Math.max(16, Math.min(prev.y, maxY)),
        };
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Head-tracking gaze ─────────────────────────────────────────────────────
  useEffect(() => {
    const handlePointerOver = (e: PointerEvent) => {
      if (isOpen || isDragging) return;
      const target = e.target as HTMLElement;
      if (!target) return;
      const isBlueLightedText =
        target.classList?.contains('text-primary') ||
        target.classList?.contains('text-cyan-400') ||
        target.classList?.contains('text-cyan-300') ||
        target.closest('.text-primary, .text-cyan-400, [data-chip-attract]');
      if (isBlueLightedText) {
        setLookAtPos({ x: e.clientX, y: e.clientY });
        setFacingDir(e.clientX < position.x ? -1 : 1);
      }
    };
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    return () => window.removeEventListener('pointerover', handlePointerOver);
  }, [isOpen, isDragging, position.x]);

  if (isOpen) return null;

  // ── Pointer handlers ───────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    dragOriginRef.current = {
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) {
      setLookAtPos({ x: e.clientX, y: e.clientY });
      return;
    }
    const dx = e.clientX - dragOriginRef.current.startPointerX;
    const dy = e.clientY - dragOriginRef.current.startPointerY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
      setIsDragging(true);
      setIsFlying(true);
      setShowTooltip(false);
      if (Math.abs(dx) > 2) setFacingDir(dx > 0 ? 1 : -1);
      const maxX = Math.max(16, window.innerWidth - 80);
      const maxY = Math.max(16, window.innerHeight - 80);
      setPosition({
        x: Math.max(16, Math.min(dragOriginRef.current.startPosX + dx, maxX)),
        y: Math.max(16, Math.min(dragOriginRef.current.startPosY + dy, maxY)),
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    setIsDragging(false);
    setIsFlying(false);
    if (!hasMovedRef.current) onOpen(position);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isDragging) setShowTooltip(true);
    setLookAtPos({ x: e.clientX, y: e.clientY });
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => onHover?.(), 280);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null; }
    setLookAtPos(null);
    onHoverEnd?.();
  };

  // Whether we should show the drag-hint OR the hover tooltip (hint has priority)
  const showDragHintBubble = !!dragHint && !isDragging && !showTooltip;
  const showHoverBubble    = showTooltip && !isDragging && !dragHint;

  // ── Smart bubble position so it never overflows off-screen ───────────────
  // Bubble is ~whitespace-nowrap, estimate max ~210px wide, 36px tall
  const MASCOT_W   = 64;
  const BUBBLE_EST = 210;
  const EDGE_PAD   = 10;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 400;

  // Centre of mascot in viewport coords
  const masXCentre = position.x + MASCOT_W / 2;

  // How much to shift bubble left/right from mascot centre so it stays on screen
  const halfBubble   = BUBBLE_EST / 2;
  const rawLeft      = masXCentre - halfBubble;
  const rawRight     = masXCentre + halfBubble;
  const clampedLeft  = rawLeft  < EDGE_PAD           ? EDGE_PAD            : rawLeft;
  const clampedRight = rawRight > vw - EDGE_PAD       ? vw - EDGE_PAD       : rawRight;
  // Translate needed so bubble starts at clampedLeft
  const hintOffsetX  = clampedLeft + (clampedRight - clampedLeft) / 2 - masXCentre;

  // Flip below mascot when Chip is in top ~100px of screen
  const nearTop   = position.y < 100;
  const bubbleTop = nearTop ? 'top-[72px]' : '-top-[48px]';
  const tailClass = nearTop
    ? 'absolute left-1/2 -top-[7px] -translate-x-1/2 w-3 h-3 bg-surface-1/97 border-l border-t border-cyan-400/60 rotate-45'
    : 'absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 bg-surface-1/97 border-r border-b border-cyan-400/60 rotate-45';

  return (
    <motion.div
      data-chip-launcher="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={
        isDragging
          ? { duration: 0 }
          : { type: 'spring', damping: 24, stiffness: 140, mass: 0.9 }
      }
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, touchAction: 'none' }}
      className="select-none cursor-grab active:cursor-grabbing pointer-events-auto"
    >
      <div className="relative group flex items-center justify-center">
        {/* ── Drag hint speech bubble — viewport-aware ── */}
        <AnimatePresence>
          {showDragHintBubble && (
            <motion.div
              initial={{ opacity: 0, y: nearTop ? -8 : 8, scale: 0.84 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: nearTop ? -6 : 6, scale: 0.88 }}
              transition={{ duration: 0.22 }}
              className={`absolute ${bubbleTop} pointer-events-none z-50`}
              style={{
                left: '50%',
                transform: `translateX(calc(-50% + ${hintOffsetX}px))`,
              }}
            >
              {/* Bubble */}
              <div className="relative px-3 py-1.5 rounded-xl bg-surface-1/97 border border-cyan-400/60 text-[11px] font-mono font-semibold text-cyan-300 shadow-xl shadow-black/90 backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
                {dragHint}
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
                {/* Speech tail — flips with bubble direction */}
                <span
                  className={tailClass}
                  style={{ borderRadius: nearTop ? '3px 0 0 0' : '0 0 3px 0' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Hover tooltip ("Ask Chip AI") ── */}
        <AnimatePresence>
          {showHoverBubble && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.88 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-surface-1/95 border border-cyan-400/50 text-[10px] font-mono font-medium text-cyan-300 shadow-xl shadow-black/90 backdrop-blur-md whitespace-nowrap pointer-events-none z-50 flex items-center gap-1.5"
            >
              <span>Ask Chip AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Ambient bioluminescent flying glow ── */}
        <motion.div
          animate={{
            scale:   isFlying || isDragging ? [1, 1.3, 1]     : [0.95, 1.12, 0.95],
            opacity: isFlying || isDragging ? [0.65, 0.95, 0.65] : [0.35, 0.65, 0.35],
          }}
          transition={{ repeat: Infinity, duration: isFlying || isDragging ? 0.8 : 2.2, ease: 'easeInOut' }}
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-400/40 via-primary/30 to-blue-500/40 blur-lg pointer-events-none -z-10"
        />

        {/* ── Dragon mascot ── */}
        <motion.div
          whileHover={{ scale: isDragging ? 1 : 1.15, y: isDragging ? 0 : -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scaleX: facingDir }}
          transition={{ duration: 0.25 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(position); }
          }}
          aria-label="Open Chip AI portfolio assistant"
          title="Drag Chip anywhere or click to ask about Subhan"
          className="relative flex items-center justify-center p-0 m-0 bg-transparent border-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
        >
          <DragonMascot
            state={isFlying || isDragging ? 'excited' : state}
            size="md"
            lookAt={lookAtPos}
            showHalo={false}
            showLabel={false}
            altText="Chip AI guardian dragon mascot"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DragonLauncher;
