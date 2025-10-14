import { motion } from 'framer-motion';
import { PhaseType } from '../../types/breathing';
import { COLOR_SCHEME, VISUALIZATION_CONFIG } from '../../constants/breathingTechniques';

interface CircleVisualizationProps {
  phase: PhaseType;
  progress: number; // 0 a 1
  currentCycle: number;
  totalCycles: number;
  phaseTimeRemaining: number;
}

export function CircleVisualization({
  phase,
  progress,
  currentCycle,
  totalCycles,
  phaseTimeRemaining,
}: CircleVisualizationProps) {
  const { minScale, maxScale, pulseIntensity } = VISUALIZATION_CONFIG.circle;

  // Determinar escala según la fase
  const getScale = (): number => {
    switch (phase) {
      case 'inhale':
        // Crecer de minScale a maxScale
        return minScale + progress * (maxScale - minScale);
      case 'hold':
        // Mantenerse en maxScale con pulso sutil
        return maxScale + Math.sin(progress * Math.PI * 4) * pulseIntensity;
      case 'exhale':
        // Decrecer de maxScale a minScale
        return maxScale - progress * (maxScale - minScale);
      case 'hold-empty':
        // Mantenerse en minScale
        return minScale;
      default:
        return minScale;
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

  // Determinar opacidad
  const getOpacity = (): number => {
    return 0.8 + progress * 0.2;
  };

  const scale = getScale();
  const colors = getColors();
  const opacity = getOpacity();

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Fondo con gradiente */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, ${COLOR_SCHEME.background.from}, ${COLOR_SCHEME.background.to})`,
        }}
      />

      {/* Contenedor del círculo */}
      <div className="relative flex items-center justify-center">
        {/* Círculo animado con Framer Motion */}
        <motion.div
          className="relative rounded-full will-change-transform"
          style={{
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${colors.from}, ${colors.to})`,
            boxShadow: `0 0 60px ${colors.from}, 0 0 120px ${colors.to}`,
            opacity,
          }}
          animate={{
            scale,
          }}
          transition={{
            duration: 0.1,
            ease: 'easeInOut',
          }}
        >
          {/* Información central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
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
        </motion.div>

        {/* Anillo exterior decorativo */}
        <motion.div
          className="absolute rounded-full border-2 will-change-transform"
          style={{
            width: '340px',
            height: '340px',
            borderColor: colors.from,
            opacity: 0.3,
          }}
          animate={{
            scale: scale * 1.05,
            rotate: progress * 360,
          }}
          transition={{
            duration: 0.1,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
