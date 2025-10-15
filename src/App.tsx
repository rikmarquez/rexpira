import { useState } from 'react';
import { Play, Pause, Square, Circle, Triangle, Waves, Flower } from 'lucide-react';
import { CircleVisualization } from './components/visualizations/CircleVisualization';
import { GeometricVisualization } from './components/visualizations/GeometricVisualization';
import { WaveVisualization } from './components/visualizations/WaveVisualization';
import { LotusVisualization } from './components/visualizations/LotusVisualization';
import { useBreathingCycle } from './hooks/useBreathingCycle';
import { BREATHING_TECHNIQUES, PHASE_INSTRUCTIONS_ES } from './constants/breathingTechniques';
import { VisualizationType } from './types/breathing';

function App() {
  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(2); // minutos
  const [selectedVisualization, setSelectedVisualization] = useState<VisualizationType>('circle');

  const selectedTechnique = BREATHING_TECHNIQUES[selectedTechniqueIndex];

  const breathing = useBreathingCycle(selectedTechnique, sessionDuration);

  const currentPhaseInstruction = PHASE_INSTRUCTIONS_ES[breathing.currentPhase];

  return (
    <div className="min-h-screen bg-gradient-to-b from-breath-bg-from to-breath-bg-to text-white">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Rexpira</h1>
        <p className="text-breath-turquoise text-sm">Respira y Medita</p>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4">
        {!breathing.isActive ? (
          // Pantalla de configuración
          <div className="max-w-md mx-auto mt-10 space-y-6">
            {/* Selector de técnica */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Selecciona una técnica
              </label>
              <select
                className="w-full bg-breath-bg-to border border-breath-turquoise/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-breath-turquoise"
                value={selectedTechniqueIndex}
                onChange={(e) => setSelectedTechniqueIndex(Number(e.target.value))}
              >
                {BREATHING_TECHNIQUES.map((tech, index) => (
                  <option key={tech.id} value={index}>
                    {tech.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-breath-turquoise/60 mt-2">
                {selectedTechnique.description}
              </p>
            </div>

            {/* Selector de visualización */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Visualización
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  className={`flex flex-col items-center justify-center py-4 rounded-lg border transition-colors ${
                    selectedVisualization === 'circle'
                      ? 'bg-breath-turquoise border-breath-turquoise text-white'
                      : 'bg-transparent border-breath-turquoise/30 text-white hover:border-breath-turquoise'
                  }`}
                  onClick={() => setSelectedVisualization('circle')}
                >
                  <Circle size={24} />
                  <span className="text-xs mt-1">Círculo</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center py-4 rounded-lg border transition-colors ${
                    selectedVisualization === 'geometric'
                      ? 'bg-breath-turquoise border-breath-turquoise text-white'
                      : 'bg-transparent border-breath-turquoise/30 text-white hover:border-breath-turquoise'
                  }`}
                  onClick={() => setSelectedVisualization('geometric')}
                >
                  <Triangle size={24} />
                  <span className="text-xs mt-1">Geométrica</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center py-4 rounded-lg border transition-colors ${
                    selectedVisualization === 'wave'
                      ? 'bg-breath-turquoise border-breath-turquoise text-white'
                      : 'bg-transparent border-breath-turquoise/30 text-white hover:border-breath-turquoise'
                  }`}
                  onClick={() => setSelectedVisualization('wave')}
                >
                  <Waves size={24} />
                  <span className="text-xs mt-1">Onda</span>
                </button>
                <button
                  className={`flex flex-col items-center justify-center py-4 rounded-lg border transition-colors ${
                    selectedVisualization === 'lotus'
                      ? 'bg-breath-turquoise border-breath-turquoise text-white'
                      : 'bg-transparent border-breath-turquoise/30 text-white hover:border-breath-turquoise'
                  }`}
                  onClick={() => setSelectedVisualization('lotus')}
                >
                  <Flower size={24} />
                  <span className="text-xs mt-1">Flor</span>
                </button>
              </div>
            </div>

            {/* Selector de duración */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Duración de la sesión
              </label>
              <div className="flex gap-2">
                {[1, 2, 5, 10, 20].map((duration) => (
                  <button
                    key={duration}
                    className={`flex-1 py-3 rounded-lg border transition-colors ${
                      sessionDuration === duration
                        ? 'bg-breath-turquoise border-breath-turquoise text-white'
                        : 'bg-transparent border-breath-turquoise/30 text-white hover:border-breath-turquoise'
                    }`}
                    onClick={() => setSessionDuration(duration)}
                  >
                    {duration}m
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de inicio */}
            <button
              className="w-full bg-breath-turquoise hover:bg-breath-blue text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              onClick={breathing.start}
            >
              <Play size={20} />
              Comenzar Meditación
            </button>
          </div>
        ) : (
          // Pantalla de meditación activa
          <div className="relative">
            {/* Controles superiores */}
            <div className="flex justify-center gap-4 mb-6">
              {!breathing.isPaused ? (
                <button
                  className="bg-breath-amber hover:bg-breath-yellow text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                  onClick={breathing.pause}
                >
                  <Pause size={20} />
                  Pausar
                </button>
              ) : (
                <button
                  className="bg-breath-turquoise hover:bg-breath-blue text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                  onClick={breathing.resume}
                >
                  <Play size={20} />
                  Reanudar
                </button>
              )}

              <button
                className="bg-breath-dark-blue hover:bg-breath-purple text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                onClick={breathing.stop}
              >
                <Square size={20} />
                Detener
              </button>
            </div>

            {/* Instrucción de fase */}
            <div className="text-center mb-8">
              <p className="text-3xl font-semibold text-white">
                {currentPhaseInstruction}
              </p>
            </div>

            {/* Visualización */}
            <div className="h-[60vh] flex items-center justify-center">
              {selectedVisualization === 'circle' && (
                <CircleVisualization
                  phase={breathing.currentPhase}
                  progress={breathing.phaseProgress}
                  currentCycle={breathing.currentCycle}
                  totalCycles={breathing.totalCycles}
                  phaseTimeRemaining={breathing.phaseTimeRemaining}
                />
              )}
              {selectedVisualization === 'geometric' && (
                <GeometricVisualization
                  phase={breathing.currentPhase}
                  progress={breathing.phaseProgress}
                  currentCycle={breathing.currentCycle}
                  totalCycles={breathing.totalCycles}
                  phaseTimeRemaining={breathing.phaseTimeRemaining}
                  technique={selectedTechnique}
                  currentPhaseIndex={breathing.currentPhaseIndex}
                />
              )}
              {selectedVisualization === 'wave' && (
                <WaveVisualization
                  phase={breathing.currentPhase}
                  progress={breathing.phaseProgress}
                  currentCycle={breathing.currentCycle}
                  totalCycles={breathing.totalCycles}
                  phaseTimeRemaining={breathing.phaseTimeRemaining}
                />
              )}
              {selectedVisualization === 'lotus' && (
                <LotusVisualization
                  phase={breathing.currentPhase}
                  progress={breathing.phaseProgress}
                  currentCycle={breathing.currentCycle}
                  totalCycles={breathing.totalCycles}
                  phaseTimeRemaining={breathing.phaseTimeRemaining}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-breath-turquoise/40 text-xs">
        Una aplicación de meditación 100% gratuita y sin registro
      </div>
    </div>
  );
}

export default App;
