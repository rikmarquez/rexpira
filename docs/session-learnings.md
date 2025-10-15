# Aprendizajes y Soluciones

## Sesión: 2025-10-13 (Sesión de Inicio)

### ✅ Tareas Realizadas

#### Tarea 1: Configuración del Protocolo de Documentación

**Contexto:** Primera sesión del proyecto Rexpira. Se estableció el protocolo de documentación para mantener continuidad entre sesiones de Claude Code.

**Acciones tomadas:**
1. Creación de la carpeta `/docs`
2. Creación de `docs/project-status.md` con el estado inicial del proyecto
3. Creación de `docs/technical-specs.md` con especificaciones técnicas detalladas
4. Creación de `docs/session-learnings.md` (este archivo)

**Archivos creados:**
```
/docs/
├── project-status.md
├── technical-specs.md
└── session-learnings.md
```

**Aprendizaje:** Establecer documentación clara desde el inicio facilita enormemente la continuidad entre sesiones y permite a Claude Code entender rápidamente el contexto del proyecto.

---

#### Tarea 2: Análisis de Especificaciones del Proyecto

**Contexto:** Análisis del archivo `meditation-app-spec.md` para entender los requisitos completos de la aplicación.

**Características clave identificadas:**
- Aplicación 100% frontend (sin backend, sin base de datos)
- 6 técnicas de respiración diferentes
- 4 visualizaciones únicas (Círculo, Geométrica, Onda, Flor)
- Sistema de temporizador configurable
- Diseño mobile-first
- Performance crítico (60fps en animaciones)

**Aprendizaje:** El proyecto es una SPA (Single Page Application) completamente estática, ideal para despliegue en Vercel/Netlify. No requiere configuración de servidor ni variables de entorno.

---

### 💡 Mejores Prácticas Descubiertas

- **Documentación proactiva:** Crear la estructura de documentación ANTES de comenzar a codear ahorra tiempo y confusión
- **Mobile-first approach:** Diseñar primero para móvil asegura mejor UX en todos los dispositivos
- **Sin estado persistente:** Al no tener base de datos ni almacenamiento, la app es más simple, rápida y respeta la privacidad del usuario
- **TypeScript desde el inicio:** Usar TypeScript desde el día 1 previene errores y mejora la mantenibilidad

### 🔍 Para Investigar

- [ ] **Framer Motion vs CSS Animations:** Evaluar cuál ofrece mejor performance para las 4 visualizaciones
- [ ] **PWA capabilities:** Investigar cómo implementar Service Workers para funcionamiento offline
- [ ] **Audio API:** Explorar Web Audio API para sonidos más suaves y transiciones
- [ ] **Accesibilidad en animaciones:** Respetar `prefers-reduced-motion` para usuarios sensibles
- [ ] **Bundle size optimization:** Técnicas para mantener el bundle <200KB
- [ ] **Testing:** Estrategia de testing (Jest, React Testing Library, Cypress)

### 📌 Decisiones Técnicas

#### Stack Final Confirmado:
```
- Frontend: React 18 + TypeScript 5
- Build Tool: Vite 5
- Styling: Tailwind CSS 3
- Animations: Framer Motion 10 (o CSS puro, TBD)
- Icons: Lucide React
- Deploy: Vercel o Netlify
```

#### Arquitectura:
- **No backend:** Todo en el navegador
- **No base de datos:** Sin persistencia de datos
- **No autenticación:** App pública y gratuita
- **Hosting estático:** Solo archivos HTML, CSS, JS

### 🎯 Próximos Pasos Definidos

1. Inicializar proyecto con Vite + React + TypeScript
2. Configurar Tailwind CSS
3. Crear estructura de carpetas según `technical-specs.md`
4. Implementar constantes de técnicas de respiración
5. Crear tipos TypeScript para el sistema de respiración
6. Implementar hook `useBreathingCycle`
7. Crear primera visualización (Círculo Respiratorio)
8. Implementar componentes de UI básicos

### 🚀 Estado Actual

**Proyecto:** Inicializado, documentación completa, listo para comenzar desarrollo

**Siguiente sesión:** Inicializar proyecto con Vite y crear estructura base

---

## Sesión: 2025-10-14 (Sesión de Implementación Completa)

### ✅ Problemas Resueltos

#### Problema 1: Error de Tailwind CSS 4.x con PostCSS

**Contexto:** Al iniciar el proyecto con Vite, Tailwind CSS 4.x lanzaba error porque el plugin de PostCSS había cambiado de ubicación.

**Error encontrado:**
```
[plugin:vite:css] [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package...
```

**Solución aplicada:**
1. Instalé `@tailwindcss/postcss` con `npm install @tailwindcss/postcss`
2. Actualicé `postcss.config.js` para usar `'@tailwindcss/postcss': {}` en lugar de `tailwindcss: {}`
3. Actualicé `src/index.css` para usar la nueva sintaxis:
   - Reemplacé `@tailwind base/components/utilities` por `@import "tailwindcss";`
   - Agregué `@theme { ... }` para definir colores personalizados
4. Desactivé `verbatimModuleSyntax` en `tsconfig.app.json`

**Código relevante:**
```typescript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}

// src/index.css
@import "tailwindcss";

@theme {
  --color-breath-blue: #3B82F6;
  --color-breath-turquoise: #06B6D4;
  // ... más colores
}
```

**Aprendizaje:** Tailwind CSS 4.x tiene una arquitectura completamente nueva que requiere `@tailwindcss/postcss` y usa `@import` + `@theme` en lugar de directivas `@tailwind`.

---

#### Problema 2: Importaciones con TypeScript Strict Mode

**Contexto:** Las importaciones inicialmente causaban conflictos con `verbatimModuleSyntax: true` en tsconfig.

**Error encontrado:**
```
The requested module '/src/types/breathing.ts' does not provide an export named 'PhaseType'
```

**Solución aplicada:**
Desactivé `verbatimModuleSyntax` en `tsconfig.app.json` cambiando el valor a `false`, lo que permitió que las importaciones funcionaran correctamente sin necesidad de agregar extensiones `.ts`.

**Aprendizaje:** `verbatimModuleSyntax: true` en TypeScript puede causar problemas con bundlers modernos como Vite. Es mejor desactivarlo para proyectos con Vite.

---

#### Problema 3: Cuenta Regresiva No Funcionaba

**Contexto:** El temporizador mostraba siempre el mismo número en lugar de hacer cuenta regresiva.

**Error encontrado:**
En `useBreathingCycle.ts` línea 166, se estaba retornando `currentPhaseDuration` (constante) en lugar de `phaseTimeRemaining` (estado que se actualiza).

**Solución aplicada:**
```typescript
// Antes (incorrecto)
return {
  // ...
  phaseTimeRemaining: currentPhaseDuration, // ❌
}

// Después (correcto)
return {
  // ...
  phaseTimeRemaining, // ✅
}
```

**Aprendizaje:** Siempre verificar que se retorne el estado actualizable y no la constante inicial.

---

#### Problema 4: Variables No Usadas en Build de Producción

**Contexto:** Al hacer deploy en Railway, el build fallaba porque TypeScript en modo estricto detectaba variables declaradas pero no usadas.

**Error encontrado:**
```
src/components/visualizations/GeometricVisualization.tsx(30,25): error TS6133: 'trailLength' is declared but its value is never read.
src/hooks/useBreathingCycle.ts(47,9): error TS6133: 'currentPhaseDuration' is declared but its value is never read.
```

**Solución aplicada:**
1. Eliminé `trailLength` de la desestructuración en `GeometricVisualization.tsx`
2. Eliminé la variable `currentPhaseDuration` que ya no se usaba en `useBreathingCycle.ts`

**Aprendizaje:** En proyectos con TypeScript estricto, siempre eliminar variables no usadas antes de hacer el build de producción.

---

### 💡 Mejores Prácticas Descubiertas

- **Framer Motion para animaciones complejas:** Framer Motion es excelente para animaciones de React, pero para SVG animados es mejor combinar con animación CSS nativa
- **Hook personalizado para lógica compleja:** `useBreathingCycle` encapsula toda la lógica del ciclo de respiración, haciendo el código más mantenible
- **Visualizaciones adaptativas:** La visualización geométrica calcula automáticamente la forma según el número de fases de la técnica seleccionada
- **Estado mínimo:** Solo guardar en estado lo estrictamente necesario y calcular el resto dinámicamente
- **Controles superiores:** Los botones de control arriba mejoran la UX en móvil y evitan toques accidentales

### 🎨 Decisiones de Diseño

- **Paleta por fase:** Cada fase de respiración tiene su propio esquema de colores para guiar visualmente al usuario
- **Animaciones suaves:** Uso de `easeInOutSine` para transiciones naturales que imitan la respiración real
- **Información central:** Contador y ciclos siempre visibles en todas las visualizaciones
- **Mobile-first:** Diseño optimizado primero para móvil, luego adaptado a desktop

### 🚀 Estado Actual (Fin de Sesión)

**Proyecto:** MVP Completado al 100%
- ✅ 4 visualizaciones funcionando
- ✅ 6 técnicas de respiración
- ✅ Sistema de temporizador con cuenta regresiva
- ✅ Controles funcionales (pausa, reanudar, detener)
- ✅ Build optimizado para producción
- ✅ Listo para deploy en Railway

**Siguiente sesión:** Implementar mejoras opcionales (sonidos, PWA, i18n, modo claro)

---

## Sesión: 2025-10-15 (Configuración del Protocolo de Documentación)

### ✅ Tareas Realizadas

#### Tarea 1: Creación del Archivo `claude.md`

**Contexto:** Para garantizar continuidad entre sesiones de Claude Code, se necesitaba establecer un protocolo claro de documentación que se leyera automáticamente al inicio de cada sesión.

**Solución aplicada:**
1. Creación de `claude.md` en la raíz del proyecto
2. Documentación del protocolo de lectura al inicio de sesión (leer 3 archivos de `/docs`)
3. Documentación del protocolo de actualización al final de sesión
4. Inclusión de reglas importantes del proyecto
5. Plantillas para actualizar `session-learnings.md`

**Archivo creado:**
```
/claude.md (raíz del proyecto)
```

**Aprendizaje:** `claude.md` es un archivo especial que Claude Code lee automáticamente al iniciar cada sesión si está presente en la raíz del proyecto. Es el lugar ideal para establecer protocolos y convenciones del proyecto.

**Archivos actualizados:**
- `/docs/project-status.md` - Agregada funcionalidad completada: "Protocolo de documentación con `claude.md`"
- `/docs/session-learnings.md` - Agregada sesión 2025-10-15

---

### 💡 Mejores Prácticas Descubiertas

- **claude.md como fuente de verdad:** Usar `claude.md` en la raíz garantiza que cada sesión nueva siga el mismo protocolo sin necesidad de recordatorios manuales
- **Documentación tripartita:** Separar la documentación en tres archivos (`project-status.md`, `technical-specs.md`, `session-learnings.md`) mantiene la información organizada y fácil de actualizar
- **Protocolo de inicio/fin de sesión:** Establecer rutinas claras de lectura al inicio y actualización al final asegura continuidad perfecta

### 🔍 Ventajas del Sistema Implementado

1. **Continuidad automática:** Cada nueva sesión de Claude Code lee automáticamente el contexto completo
2. **Historial de problemas:** `session-learnings.md` funciona como base de conocimiento de soluciones
3. **Estado actualizado:** `project-status.md` siempre refleja el estado real del proyecto
4. **Especificaciones centralizadas:** `technical-specs.md` mantiene convenciones y arquitectura en un solo lugar

### 🚀 Estado Actual (Fin de Sesión)

**Proyecto:** Sistema de documentación completado y funcional

**Archivos del sistema de documentación:**
- ✅ `/claude.md` - Protocolo de sesión (lectura automática)
- ✅ `/docs/project-status.md` - Estado del proyecto
- ✅ `/docs/technical-specs.md` - Especificaciones técnicas
- ✅ `/docs/session-learnings.md` - Problemas resueltos y aprendizajes

**Siguiente sesión:** El sistema de documentación estará completamente operativo. Claude Code leerá automáticamente `claude.md` y los archivos de `/docs` al inicio.

---

## Plantilla para Futuras Sesiones

### Sesión: [FECHA]

### ✅ Problemas Resueltos

#### Problema 1: [Título descriptivo]

**Contexto:** [Qué estábamos intentando hacer]

**Error encontrado:**
```
[Mensaje de error o descripción del problema]
```

**Solución aplicada:**
[Descripción de la solución paso a paso]

**Código relevante:**
```typescript
// Solución implementada
```

**Aprendizaje:** [Qué aprendimos para el futuro]

---

### 💡 Mejores Prácticas Descubiertas

- [Práctica 1]: [Descripción]
- [Práctica 2]: [Descripción]

### 🔍 Para Investigar

- [ ] [Tema pendiente de investigar]
- [ ] [Optimización a considerar]
