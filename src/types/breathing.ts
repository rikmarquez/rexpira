// Tipos de fases de respiración
export type PhaseType = 'inhale' | 'hold' | 'exhale' | 'hold-empty';

// Fase individual de una técnica de respiración
export interface BreathingPhase {
  type: PhaseType;
  duration: number; // en segundos
}

// Técnica de respiración completa
export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  phases: BreathingPhase[];
}

// Tipos de visualización disponibles
export type VisualizationType = 'circle' | 'geometric' | 'wave' | 'lotus';

// Estado de la sesión de meditación
export type SessionStatus = 'idle' | 'active' | 'paused' | 'completed';

// Configuración de sesión
export interface SessionConfig {
  technique: BreathingTechnique;
  duration: number; // duración total en minutos
  visualization: VisualizationType;
  soundEnabled: boolean;
  language: 'es' | 'en';
}

// Estado actual de la sesión
export interface SessionState {
  status: SessionStatus;
  currentPhase: number; // índice de la fase actual
  currentCycle: number; // número de ciclo actual
  totalCycles: number; // total de ciclos estimados
  timeRemaining: number; // tiempo restante en segundos
  phaseTimeRemaining: number; // tiempo restante de la fase actual en segundos
  phaseProgress: number; // progreso de la fase actual (0-1)
}

// Configuración de ajustes del usuario
export interface Settings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
}

// Textos de instrucciones por fase
export interface PhaseInstructions {
  inhale: string;
  hold: string;
  exhale: string;
  'hold-empty': string;
}

// Colores por fase
export interface PhaseColors {
  from: string;
  to: string;
}

export interface ColorScheme {
  inhale: PhaseColors;
  hold: PhaseColors;
  exhale: PhaseColors;
  holdEmpty: string;
  background: PhaseColors;
}

// Posición para la visualización geométrica
export interface Position {
  x: number;
  y: number;
}
