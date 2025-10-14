import { useState, useEffect, useRef, useCallback } from 'react';
import { BreathingTechnique, PhaseType } from '../types/breathing';
import { EASING } from '../constants/breathingTechniques';

export interface BreathingCycleState {
  currentPhaseIndex: number;
  currentPhase: PhaseType;
  currentCycle: number;
  totalCycles: number;
  phaseProgress: number; // 0 a 1
  phaseTimeRemaining: number; // en segundos
  isActive: boolean;
  isPaused: boolean;
}

export interface UseBreathingCycleReturn extends BreathingCycleState {
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
}

export function useBreathingCycle(
  technique: BreathingTechnique,
  totalDurationMinutes: number
): UseBreathingCycleReturn {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const phaseStartTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);

  // Calcular duración total de un ciclo
  const cycleDuration = technique.phases.reduce((sum, phase) => sum + phase.duration, 0);

  // Calcular número total de ciclos
  const totalCycles = Math.ceil((totalDurationMinutes * 60) / cycleDuration);

  // Fase actual
  const currentPhase = technique.phases[currentPhaseIndex]?.type || 'inhale';

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    setCurrentCycle(1);
    setCurrentPhaseIndex(0);
    phaseStartTimeRef.current = Date.now();
    pausedProgressRef.current = 0;
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    pausedProgressRef.current = phaseProgress;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [phaseProgress]);

  const resume = useCallback(() => {
    setIsPaused(false);
    phaseStartTimeRef.current = Date.now();
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentCycle(0);
    setCurrentPhaseIndex(0);
    setPhaseProgress(0);
    setPhaseTimeRemaining(0);
    pausedProgressRef.current = 0;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
  }, [stop]);

  // Avanzar a la siguiente fase
  const nextPhase = useCallback(() => {
    const nextIndex = (currentPhaseIndex + 1) % technique.phases.length;
    setCurrentPhaseIndex(nextIndex);

    // Si volvemos a la primera fase, incrementar ciclo
    if (nextIndex === 0) {
      setCurrentCycle((prev) => {
        const newCycle = prev + 1;
        // Si llegamos al último ciclo, detener
        if (newCycle > totalCycles) {
          stop();
          return prev;
        }
        return newCycle;
      });
    }

    phaseStartTimeRef.current = Date.now();
    pausedProgressRef.current = 0;
  }, [currentPhaseIndex, technique.phases.length, totalCycles, stop]);

  // Loop principal de animación
  useEffect(() => {
    if (!isActive || isPaused) {
      return;
    }

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - phaseStartTimeRef.current) / 1000; // en segundos
      const duration = technique.phases[currentPhaseIndex]?.duration || 4;

      // Calcular progreso con el tiempo pausado
      let rawProgress = (elapsed / duration) + pausedProgressRef.current;
      rawProgress = Math.min(rawProgress, 1);

      // Aplicar easing para suavidad
      const easedProgress = EASING.easeInOutSine(rawProgress);

      setPhaseProgress(easedProgress);
      setPhaseTimeRemaining(Math.max(0, duration - elapsed));

      // Si completamos la fase, avanzar a la siguiente
      if (rawProgress >= 1) {
        nextPhase();
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isActive, isPaused, currentPhaseIndex, technique.phases, nextPhase]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    currentPhaseIndex,
    currentPhase,
    currentCycle,
    totalCycles,
    phaseProgress,
    phaseTimeRemaining,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
  };
}
