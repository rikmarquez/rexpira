import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { PhaseType, BreathingTechnique } from '../../types/breathing';
import { COLOR_SCHEME, VISUALIZATION_CONFIG } from '../../constants/breathingTechniques';

interface GeometricVisualizationProps {
  phase: PhaseType;
  progress: number; // 0 a 1
  currentCycle: number;
  totalCycles: number;
  phaseTimeRemaining: number;
  technique: BreathingTechnique;
  currentPhaseIndex: number;
}

interface Position {
  x: number;
  y: number;
}

export function GeometricVisualization({
  phase,
  progress,
  currentCycle,
  totalCycles,
  phaseTimeRemaining,
  technique,
  currentPhaseIndex,
}: GeometricVisualizationProps) {
  const { particleSize, trailLength, lineOpacity } = VISUALIZATION_CONFIG.geometric;
  const centerX = 0;
  const centerY = 0;
  const size = 200;

  // Calcular vértices según el número de fases
  const vertices = useMemo((): Position[] => {
    const numPhases = technique.phases.length;

    if (numPhases === 2) {
      // Línea horizontal (ida y vuelta)
      return [
        { x: centerX - size / 2, y: centerY },
        { x: centerX + size / 2, y: centerY },
      ];
    } else if (numPhases === 3) {
      // Triángulo equilátero
      return [
        { x: centerX, y: centerY - size / 2 },
        { x: centerX + size / 2, y: centerY + size / 2 },
        { x: centerX - size / 2, y: centerY + size / 2 },
      ];
    } else if (numPhases === 4) {
      // Cuadrado
      return [
        { x: centerX - size / 2, y: centerY - size / 2 },
        { x: centerX + size / 2, y: centerY - size / 2 },
        { x: centerX + size / 2, y: centerY + size / 2 },
        { x: centerX - size / 2, y: centerY + size / 2 },
      ];
    } else {
      // Para 5+ fases, crear un polígono regular
      const angleStep = (2 * Math.PI) / numPhases;
      return Array.from({ length: numPhases }, (_, i) => {
        const angle = i * angleStep - Math.PI / 2; // Empezar desde arriba
        return {
          x: centerX + (size / 2) * Math.cos(angle),
          y: centerY + (size / 2) * Math.sin(angle),
        };
      });
    }
  }, [technique.phases.length, size]);

  // Calcular posición de la partícula
  const particlePosition = useMemo((): Position => {
    const fromVertex = vertices[currentPhaseIndex];
    const toVertex = vertices[(currentPhaseIndex + 1) % vertices.length];

    return {
      x: fromVertex.x + (toVertex.x - fromVertex.x) * progress,
      y: fromVertex.y + (toVertex.y - fromVertex.y) * progress,
    };
  }, [vertices, currentPhaseIndex, progress]);

  // Determinar color según la fase
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

  const colors = getColors();

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Fondo con gradiente */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, ${COLOR_SCHEME.background.from}, ${COLOR_SCHEME.background.to})`,
        }}
      />

      {/* SVG con la figura geométrica */}
      <svg
        width="500"
        height="500"
        viewBox="-250 -250 500 500"
        className="absolute"
      >
        {/* Líneas de la figura */}
        {vertices.map((vertex, i) => {
          const nextVertex = vertices[(i + 1) % vertices.length];
          return (
            <line
              key={i}
              x1={vertex.x}
              y1={vertex.y}
              x2={nextVertex.x}
              y2={nextVertex.y}
              stroke={colors.from}
              strokeWidth="2"
              opacity={lineOpacity}
            />
          );
        })}

        {/* Vértices */}
        {vertices.map((vertex, i) => {
          const isActive = i === currentPhaseIndex;
          return (
            <circle
              key={`vertex-${i}`}
              cx={vertex.x}
              cy={vertex.y}
              r={isActive ? 8 : 5}
              fill={isActive ? colors.from : colors.to}
              opacity={isActive ? 1 : 0.5}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Partícula animada */}
        <motion.circle
          cx={particlePosition.x}
          cy={particlePosition.y}
          r={particleSize}
          fill={colors.from}
          filter="url(#glow)"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Definición del efecto glow */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Información central */}
      <div className="absolute flex flex-col items-center justify-center text-white z-10">
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
