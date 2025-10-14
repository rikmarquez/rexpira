# Especificaciones Técnicas

## 🗄️ Estructura de Base de Datos

**NO APLICA** - Esta aplicación NO tiene base de datos. Todo funciona 100% en el navegador del usuario.

## 🎯 Técnicas de Respiración (Constantes)

### 1. Respiración 4-7-8 (Relajación)
```typescript
{
  id: '4-7-8',
  name: 'Respiración 4-7-8',
  description: 'Reducir ansiedad, dormir mejor',
  phases: [
    { type: 'inhale', duration: 4 },
    { type: 'hold', duration: 7 },
    { type: 'exhale', duration: 8 }
  ]
}
```

### 2. Respiración Box (Box Breathing)
```typescript
{
  id: 'box',
  name: 'Respiración Box',
  description: 'Concentración, calma mental',
  phases: [
    { type: 'inhale', duration: 4 },
    { type: 'hold', duration: 4 },
    { type: 'exhale', duration: 4 },
    { type: 'hold-empty', duration: 4 }
  ]
}
```

### 3. Respiración 5-5 (Coherencia Cardíaca)
```typescript
{
  id: '5-5',
  name: 'Respiración 5-5',
  description: 'Balance emocional, regulación del sistema nervioso',
  phases: [
    { type: 'inhale', duration: 5 },
    { type: 'exhale', duration: 5 }
  ]
}
```

### 4. Respiración Energizante (Breath of Fire)
```typescript
{
  id: 'fire',
  name: 'Respiración Energizante',
  description: 'Aumentar energía, claridad mental',
  phases: [
    { type: 'inhale', duration: 2 },
    { type: 'exhale', duration: 2 }
  ]
}
```

### 5. Respiración 4-4-6-2 (Calma Profunda)
```typescript
{
  id: '4-4-6-2',
  name: 'Respiración 4-4-6-2',
  description: 'Relajación profunda',
  phases: [
    { type: 'inhale', duration: 4 },
    { type: 'hold', duration: 4 },
    { type: 'exhale', duration: 6 },
    { type: 'hold-empty', duration: 2 }
  ]
}
```

### 6. Respiración Personalizada
```typescript
{
  id: 'custom',
  name: 'Personalizada',
  description: 'Configura tus propios tiempos',
  phases: [] // Definido por el usuario
}
```

## 🎨 Visualizaciones

### 1. Círculo Respiratorio
- **Tipo:** Círculo escalable
- **Comportamiento:** Crece/decrece según fase
- **Efectos:** Glow, transición de colores, opacidad variable
- **Escala:** 0.3x (mínimo) a 1x (máximo)

### 2. Partícula Geométrica
- **Tipo:** Partícula luminosa en figura geométrica
- **Formas:** Línea (2 fases), Triángulo (3 fases), Cuadrado (4 fases)
- **Efectos:** Trail desvaneciente, vértices brillantes, partícula colorida
- **Cálculo de vértices:**
```typescript
// Cuadrado (4 fases)
const vertices = [
  { x: centerX - size/2, y: centerY - size/2 }, // A
  { x: centerX + size/2, y: centerY - size/2 }, // B
  { x: centerX + size/2, y: centerY + size/2 }, // C
  { x: centerX - size/2, y: centerY + size/2 }  // D
];

// Triángulo (3 fases)
const vertices = [
  { x: centerX, y: centerY - size/2 },           // Top
  { x: centerX + size/2, y: centerY + size/2 },  // Bottom-right
  { x: centerX - size/2, y: centerY + size/2 }   // Bottom-left
];
```

### 3. Onda Fluida
- **Tipo:** Onda sinusoidal animada
- **Comportamiento:** Sube/baja según respiración
- **Efectos:** 3-5 ondas superpuestas, gradiente vertical, partículas flotantes
- **Altura:** 30% (mínimo) a 70% (máximo) de pantalla

### 4. Flor de Loto
- **Tipo:** Flor con pétalos animados
- **Estructura:** 8 pétalos + centro dorado
- **Comportamiento:** Pétalos se abren/cierran radialmente
- **Efectos:** Gradiente en pétalos, rotación sutil, partículas luminosas

## 🎨 Paleta de Colores

```typescript
const colors = {
  inhale: { from: '#3B82F6', to: '#06B6D4' },    // azul a turquesa
  hold: { from: '#F59E0B', to: '#FBBF24' },      // ámbar a amarillo
  exhale: { from: '#06B6D4', to: '#8B5CF6' },    // turquesa a morado
  holdEmpty: '#1E3A8A',                           // azul oscuro
  background: { from: '#0F172A', to: '#1E293B' }  // gradiente oscuro
};
```

## 🏗️ Arquitectura del Proyecto

```
meditation-app/
├── src/
│   ├── components/
│   │   ├── visualizations/
│   │   │   ├── CircleVisualization.tsx
│   │   │   ├── GeometricVisualization.tsx
│   │   │   ├── WaveVisualization.tsx
│   │   │   ├── LotusVisualization.tsx
│   │   │   └── VisualizationSelector.tsx
│   │   ├── Timer.tsx
│   │   ├── TechniqueSelector.tsx
│   │   ├── ControlPanel.tsx
│   │   └── PhaseIndicator.tsx
│   ├── hooks/
│   │   ├── useBreathingCycle.ts
│   │   ├── useTimer.ts
│   │   └── useAnimation.ts
│   ├── types/
│   │   └── breathing.ts
│   ├── constants/
│   │   └── breathingTechniques.ts
│   ├── utils/
│   │   └── audio.ts
│   └── App.tsx
├── public/
│   ├── sounds/
│   └── manifest.json
└── package.json
```

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^10.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "typescript": "^5.x",
    "vite": "^5.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

## 🔧 Configuración de Build

### Vite Config
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
});
```

### Tailwind Config
```typescript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'breath-blue': '#3B82F6',
        'breath-turquoise': '#06B6D4',
        'breath-amber': '#F59E0B',
        'breath-purple': '#8B5CF6'
      }
    }
  },
  plugins: []
};
```

## 🚀 Deploy en Vercel/Netlify

### Variables de Entorno
**NO HAY** - No se necesitan variables de entorno

### Comandos de Build
- **Install:** `npm install`
- **Build:** `npm run build`
- **Dev:** `npm run dev`
- **Preview:** `npm run preview`

### Configuración Vercel
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### Configuración Netlify
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## ⚡ Optimizaciones de Performance

### CSS
- Usar `transform` y `opacity` para animaciones (GPU-accelerated)
- Aplicar `will-change` a elementos animados
- Evitar reflows innecesarios

### JavaScript
- Usar `requestAnimationFrame` para animaciones
- Debounce de eventos de resize
- Lazy loading de componentes pesados
- Memoización de cálculos costosos

### Fórmulas de Easing
```typescript
const easeInOutCubic = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const easeInOutQuad = (t: number): number => {
  return t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
};
```

## 📱 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};
```

## 🔊 Sistema de Audio (Opcional)

### Sonidos requeridos
- `phase-transition.mp3` - Cambio de fase (suave)
- `session-complete.mp3` - Campana final
- `pause.mp3` - Sonido de pausa
- `resume.mp3` - Sonido de reanudar

### Formato
- Formato: MP3 o OGG
- Duración: 0.5-2 segundos
- Volumen: Bajo, no intrusivo

## 🌐 Internacionalización (i18n)

### Idiomas soportados
- Español (por defecto)
- Inglés

### Textos clave
```typescript
const texts = {
  es: {
    inhale: 'Inhala',
    hold: 'Retén',
    exhale: 'Exhala',
    holdEmpty: 'Mantén',
    pause: 'Pausa',
    resume: 'Reanudar',
    exit: 'Salir'
  },
  en: {
    inhale: 'Inhale',
    hold: 'Hold',
    exhale: 'Exhale',
    holdEmpty: 'Hold',
    pause: 'Pause',
    resume: 'Resume',
    exit: 'Exit'
  }
};
```

## 📊 Métricas de Éxito

- **Performance:** 60fps en animaciones
- **Lighthouse Score:** >90 en todas las categorías
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Bundle Size:** <200KB (gzipped)
- **Accesibilidad:** WCAG 2.1 AA compliance
