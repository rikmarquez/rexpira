import { BreathingTechnique, ColorScheme, PhaseInstructions } from '../types/breathing';

// Técnicas de respiración predefinidas
export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: '4-7-8',
    name: 'Respiración 4-7-8',
    description: 'Reducir ansiedad, dormir mejor',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 7 },
      { type: 'exhale', duration: 8 },
    ],
  },
  {
    id: 'box',
    name: 'Respiración Box',
    description: 'Concentración, calma mental',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 4 },
      { type: 'exhale', duration: 4 },
      { type: 'hold-empty', duration: 4 },
    ],
  },
  {
    id: '5-5',
    name: 'Respiración 5-5',
    description: 'Balance emocional, regulación del sistema nervioso',
    phases: [
      { type: 'inhale', duration: 5 },
      { type: 'exhale', duration: 5 },
    ],
  },
  {
    id: 'fire',
    name: 'Respiración Energizante',
    description: 'Aumentar energía, claridad mental',
    phases: [
      { type: 'inhale', duration: 2 },
      { type: 'exhale', duration: 2 },
    ],
  },
  {
    id: '4-4-6-2',
    name: 'Respiración 4-4-6-2',
    description: 'Relajación profunda',
    phases: [
      { type: 'inhale', duration: 4 },
      { type: 'hold', duration: 4 },
      { type: 'exhale', duration: 6 },
      { type: 'hold-empty', duration: 2 },
    ],
  },
];

// Esquema de colores por fase
export const COLOR_SCHEME: ColorScheme = {
  inhale: { from: '#10B981', to: '#34D399' }, // verde a verde claro
  hold: { from: '#F59E0B', to: '#FBBF24' }, // ámbar a amarillo
  exhale: { from: '#06B6D4', to: '#8B5CF6' }, // turquesa a morado
  holdEmpty: '#1E3A8A', // azul oscuro
  background: { from: '#0F172A', to: '#1E293B' }, // gradiente oscuro
};

// Instrucciones de texto por fase (Español)
export const PHASE_INSTRUCTIONS_ES: PhaseInstructions = {
  inhale: 'Inhala',
  hold: 'Retén',
  exhale: 'Exhala',
  'hold-empty': 'Mantén',
};

// Instrucciones de texto por fase (Inglés)
export const PHASE_INSTRUCTIONS_EN: PhaseInstructions = {
  inhale: 'Inhale',
  hold: 'Hold',
  exhale: 'Exhale',
  'hold-empty': 'Hold',
};

// Duraciones predefinidas de sesión (en minutos)
export const SESSION_DURATIONS = [1, 2, 5, 10, 20];

// Configuración de visualización
export const VISUALIZATION_CONFIG = {
  circle: {
    minScale: 0.3,
    maxScale: 1,
    pulseIntensity: 0.05,
  },
  geometric: {
    particleSize: 12,
    trailLength: 20,
    lineOpacity: 0.3,
  },
  wave: {
    minHeight: 0.3,
    maxHeight: 0.7,
    numberOfWaves: 4,
    particleCount: 15,
  },
  lotus: {
    petalCount: 8,
    maxRotation: 45,
    rotationSpeed: 60, // segundos para completar una rotación
  },
};

// Easing functions para animaciones suaves
export const EASING = {
  easeInOutCubic: (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  easeInOutQuad: (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  },
  easeInOutSine: (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  },
};

// Configuración de audio (paths a archivos de sonido)
export const AUDIO_FILES = {
  phaseTransition: '/sounds/phase-transition.mp3',
  sessionComplete: '/sounds/session-complete.mp3',
  pause: '/sounds/pause.mp3',
  resume: '/sounds/resume.mp3',
};

// Ajustes por defecto
export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  vibrationEnabled: true,
  language: 'es' as const,
  theme: 'dark' as const,
};
