import { useState, useEffect, useCallback, useRef } from 'react';
import { DragonState } from '@/types/mascot';

interface UseDragonMascotOptions {
  initialState?: DragonState;
  inactivityTimeoutMs?: number;
  isOpen?: boolean;
}

export function useDragonMascot({
  initialState = 'idle',
  inactivityTimeoutMs = 45000,
  isOpen = false,
}: UseDragonMascotOptions = {}) {
  const [state, setState] = useState<DragonState>(initialState);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const transientTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasGreetedSessionRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setState('reducedMotion');
      } else {
        setState('idle');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Clear timers helper
  const clearTransientTimer = useCallback(() => {
    if (transientTimerRef.current) {
      clearTimeout(transientTimerRef.current);
      transientTimerRef.current = null;
    }
  }, []);

  // Set transient state that automatically reverts to idle after duration
  const setTransientState = useCallback(
    (newState: DragonState, durationMs = 2800) => {
      if (prefersReducedMotion) return;
      clearTransientTimer();
      setState(newState);

      transientTimerRef.current = setTimeout(() => {
        setState((current) => (current === newState ? 'idle' : current));
      }, durationMs);
    },
    [prefersReducedMotion, clearTransientTimer]
  );

  // Inactivity tracking (sleep after period of inactivity)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    if (prefersReducedMotion) return;

    inactivityTimerRef.current = setTimeout(() => {
      setState((current) => {
        // Only go to sleep if currently idle or curious and chat is not open
        if (!isOpen && (current === 'idle' || current === 'curious')) {
          return 'sleeping';
        }
        return current;
      });
    }, inactivityTimeoutMs);
  }, [inactivityTimeoutMs, isOpen, prefersReducedMotion]);

  // Activity listeners to reset sleep timer and wake up if sleeping
  useEffect(() => {
    const handleUserActivity = () => {
      setState((current) => {
        if (current === 'sleeping') {
          return 'idle';
        }
        return current;
      });
      resetInactivityTimer();
    };

    const events = ['mousemove', 'keydown', 'touchstart', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));
    resetInactivityTimer();

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      clearTransientTimer();
    };
  }, [resetInactivityTimer, clearTransientTimer]);

  // Handle visibility change (tab pause)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTransientTimer();
      } else {
        resetInactivityTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [clearTransientTimer, resetInactivityTimer]);

  // Trigger greeting when assistant opens
  useEffect(() => {
    if (isOpen) {
      if (!hasGreetedSessionRef.current) {
        hasGreetedSessionRef.current = true;
        setTransientState('greeting', 3200);
      } else {
        setTransientState('greeting', 1800);
      }
    } else {
      setState((current) => (current === 'greeting' || current === 'answering' || current === 'listening' ? 'idle' : current));
    }
  }, [isOpen, setTransientState]);

  // Interaction triggers
  const triggerCurious = useCallback(() => {
    if (state === 'idle' || state === 'sleeping') {
      setTransientState('curious', 2400);
    }
  }, [state, setTransientState]);

  const triggerListening = useCallback(() => {
    if (prefersReducedMotion) return;
    clearTransientTimer();
    setState('listening');
  }, [prefersReducedMotion, clearTransientTimer]);

  const triggerThinking = useCallback(() => {
    if (prefersReducedMotion) return;
    clearTransientTimer();
    setState('thinking');
  }, [prefersReducedMotion, clearTransientTimer]);

  const triggerAnswering = useCallback(() => {
    setTransientState('answering', 3800);
  }, [setTransientState]);

  const triggerExcited = useCallback(() => {
    setTransientState('excited', 3200);
  }, [setTransientState]);

  const triggerError = useCallback(() => {
    setTransientState('error', 4500);
  }, [setTransientState]);

  const triggerIdle = useCallback(() => {
    clearTransientTimer();
    setState(prefersReducedMotion ? 'reducedMotion' : 'idle');
  }, [prefersReducedMotion, clearTransientTimer]);

  const wakeUp = useCallback(() => {
    clearTransientTimer();
    setState('idle');
    resetInactivityTimer();
  }, [clearTransientTimer, resetInactivityTimer]);

  const effectiveState = prefersReducedMotion ? 'reducedMotion' : state;

  return {
    state: effectiveState,
    setState,
    prefersReducedMotion,
    triggerCurious,
    triggerListening,
    triggerThinking,
    triggerAnswering,
    triggerExcited,
    triggerError,
    triggerIdle,
    wakeUp,
    resetInactivityTimer,
  };
}
