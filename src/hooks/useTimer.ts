import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseTimerReturn {
  timeRemaining: number; // en segundos
  isActive: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  stop: () => void;
}

export function useTimer(initialDuration: number): UseTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = initialDuration;
  }, [initialDuration]);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
    startTimeRef.current = Date.now();
    pausedTimeRef.current = timeRemaining;
  }, [timeRemaining]);

  const reset = useCallback(() => {
    setTimeRemaining(initialDuration);
    setIsActive(false);
    setIsPaused(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialDuration]);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(initialDuration);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialDuration]);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = Math.max(0, pausedTimeRef.current - elapsed);

        setTimeRemaining(remaining);

        if (remaining === 0) {
          setIsActive(false);
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 100); // Actualizar cada 100ms para mayor precisión

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isActive, isPaused]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    stop,
  };
}
