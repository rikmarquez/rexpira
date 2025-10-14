import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { PhaseType } from '../../types/breathing';
import { COLOR_SCHEME, VISUALIZATION_CONFIG } from '../../constants/breathingTechniques';

interface LotusVisualizationProps {
  phase: PhaseType;
  progress: number; // 0 a 1
  currentCycle: number;
  totalCycles: number;
  phaseTimeRemaining: number;
}

export function LotusVisualization({
  phase,
  progress,
  currentCycle,
  totalCycles,
  phaseTimeRemaining,
}: LotusVisualizationProps) {
  const { petalCount, maxRotation, rotationSpeed } = VISUALIZATION_CONFIG.lotus;

  // Determinar apertura de pétalos según la fase
  const getPetalRotation = (): number => {
    switch (phase) {
      case 'inhale':
        // Abrir de 0° a maxRotation°
        return progress * maxRotation;
      case 'hold':
        // Mantenerse abiertos con oscilación sutil
        return maxRotation + Math.sin(progress * Math.PI * 4) * 2;
      case 'exhale':
        // Cerrar de maxRotation° a 0°
        return maxRotation - progress * maxRotation;
      case 'hold-empty':
        // Mantenerse cerrados
        return 0;
      default:
        return 0;
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

  const petalRotation = getPetalRotation();
  const colors = getColors();

  // Generar posiciones de pétalos
  const petals = useMemo(() => {
    return Array.from({ length: petalCount }, (_, i) => {
      const angle = (360 / petalCount) * i;
      return {
        id: i,
        angle,
      };
    });
  }, [petalCount]);

  // Generar partículas flotantes
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (360 / 12) * i,
      delay: i * 0.3,
      distance: 180 + Math.random() * 40,
    }));
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Fondo con gradiente */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, ${COLOR_SCHEME.background.from}, ${COLOR_SCHEME.background.to})`,
        }}
      />

      {/* Contenedor de la flor */}
      <motion.div
        className="relative"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: rotationSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Pétalos */}
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            style={{
              width: '120px',
              height: '60px',
              left: '50%',
              top: '50%',
              transformOrigin: 'center center',
              transform: `rotate(${petal.angle}deg) translateY(-50%)`,
            }}
          >
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(ellipse at center, ${colors.from}, ${colors.to})`,
                boxShadow: `0 0 20px ${colors.from}`,
                transformOrigin: 'center bottom',
              }}
              animate={{
                rotateX: petalRotation,
                opacity: petalRotation > 0 ? 0.8 : 0.4,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        ))}

        {/* Centro de la flor (pistilo) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, #FFD700, #FFA500)',
            boxShadow: '0 0 30px #FFD700',
          }}
          animate={{
            scale: phase === 'hold-empty' ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Partículas luminosas flotantes */}
      {petalRotation > maxRotation * 0.5 &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: '4px',
              height: '4px',
              background: colors.from,
              boxShadow: `0 0 10px ${colors.from}`,
              transform: `rotate(${particle.angle}deg) translateX(${particle.distance}px)`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}

      {/* Información central */}
      <div className="absolute flex flex-col items-center justify-center text-white z-20">
        {/* Tiempo restante de fase */}
        <div className="text-5xl font-bold drop-shadow-lg">
          {Math.ceil(phaseTimeRemaining)}
        </div>
        <div className="text-sm mt-2 opacity-80 drop-shadow-lg">segundos</div>

        {/* Contador de ciclos */}
        <div className="text-xs mt-4 opacity-60 drop-shadow-lg">
          Ciclo {currentCycle} / {totalCycles}
        </div>
      </div>
    </div>
  );
}
