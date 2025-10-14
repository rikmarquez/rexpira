import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { PhaseType } from '../../types/breathing';
import { COLOR_SCHEME, VISUALIZATION_CONFIG } from '../../constants/breathingTechniques';

interface WaveVisualizationProps {
  phase: PhaseType;
  progress: number; // 0 a 1
  currentCycle: number;
  totalCycles: number;
  phaseTimeRemaining: number;
}

export function WaveVisualization({
  phase,
  progress,
  currentCycle,
  totalCycles,
  phaseTimeRemaining,
}: WaveVisualizationProps) {
  const { minHeight, maxHeight, numberOfWaves, particleCount } = VISUALIZATION_CONFIG.wave;

  // Determinar altura de la onda según la fase
  const getWaveHeight = (): number => {
    switch (phase) {
      case 'inhale':
        // Subir de minHeight a maxHeight
        return minHeight + progress * (maxHeight - minHeight);
      case 'hold':
        // Mantenerse en maxHeight con ondulación sutil
        return maxHeight + Math.sin(progress * Math.PI * 4) * 0.02;
      case 'exhale':
        // Bajar de maxHeight a minHeight
        return maxHeight - progress * (maxHeight - minHeight);
      case 'hold-empty':
        // Mantenerse en minHeight
        return minHeight;
      default:
        return minHeight;
    }
  };

  // Determinar colores según la fase
  const getColors = () => {
    switch (phase) {
      case 'inhale':
        return COLOR_SCHEME.inhale;
      case 'hold':
        return COLOR_SCHEME.hold;
      case 'exhale':
        return COLOR_SCHEME.exhale;
      case 'hold-empty':
        return { from: COLOR_SCHEME.holdEmpty, to: COLOR_SCHEME.holdEmpty };
      default:
        return COLOR_SCHEME.inhale;
    }
  };

  const waveHeight = getWaveHeight();
  const colors = getColors();

  // Generar partículas flotantes
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: (i / particleCount) * 100,
      delay: i * 0.2,
      size: 2 + Math.random() * 3,
    }));
  }, [particleCount]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Fondo con gradiente */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, ${COLOR_SCHEME.background.from}, ${COLOR_SCHEME.background.to})`,
        }}
      />

      {/* Contenedor de ondas */}
      <div className="absolute inset-0 flex items-end justify-center">
        {/* Múltiples ondas superpuestas */}
        {Array.from({ length: numberOfWaves }).map((_, i) => {
          const opacity = 0.15 + (i / numberOfWaves) * 0.25;
          const heightMultiplier = 0.85 + (i / numberOfWaves) * 0.15;
          const animationDelay = -i * 2;

          return (
            <motion.div
              key={i}
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: `${waveHeight * heightMultiplier * 100}%`,
                background: `linear-gradient(180deg, ${colors.from} 0%, ${colors.to} 100%)`,
                opacity,
                borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: animationDelay,
              }}
            />
          );
        })}

        {/* Partículas flotantes */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              bottom: `${waveHeight * 80}%`,
              width: particle.size,
              height: particle.size,
              background: colors.from,
              boxShadow: `0 0 ${particle.size * 2}px ${colors.from}`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Información central */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white bg-breath-bg-from/50 backdrop-blur-sm rounded-2xl px-8 py-6">
        {/* Tiempo restante de fase */}
        <div className="text-5xl font-bold">
          {Math.ceil(phaseTimeRemaining)}
        </div>
        <div className="text-sm mt-2 opacity-80">segundos</div>

        {/* Contador de ciclos */}
        <div className="text-xs mt-4 opacity-60">
          Ciclo {currentCycle} / {totalCycles}
        </div>
      </div>
    </div>
  );
}
