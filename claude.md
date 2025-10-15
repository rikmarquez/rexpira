# Protocolo de Sesión - Rexpira

## 📖 Al Iniciar Cada Sesión

**IMPORTANTE:** Antes de comenzar cualquier tarea, SIEMPRE lee estos tres documentos para entender el contexto completo del proyecto:

1. **`/docs/project-status.md`** - Estado actual del proyecto, funcionalidades completadas, bugs conocidos, configuración
2. **`/docs/technical-specs.md`** - Especificaciones técnicas, arquitectura, dependencias, convenciones de código
3. **`/docs/session-learnings.md`** - Problemas resueltos en sesiones anteriores, soluciones aplicadas, aprendizajes

### Proceso de Inicio
```
1. Lee /docs/project-status.md
2. Lee /docs/technical-specs.md
3. Lee /docs/session-learnings.md
4. Analiza el contexto completo
5. Pregunta al usuario en qué desea trabajar
```

## 📝 Durante la Sesión

- **TodoWrite:** Usa la herramienta TodoWrite para tareas complejas con múltiples pasos
- **Commits:** Solo crear commits cuando el usuario lo solicite explícitamente
- **Testing:** Siempre probar cambios antes de marcar tareas como completadas
- **Documentación:** Mantén comentarios en el código cuando sea necesario para claridad

## ✅ Al Finalizar Cada Sesión

**IMPORTANTE:** Antes de terminar la sesión, SIEMPRE actualiza la documentación:

### 1. Actualizar `/docs/project-status.md`
- Marcar funcionalidades nuevas completadas con [x]
- Actualizar "En Progreso" si aplica
- Agregar nuevos bugs conocidos si se descubrieron
- Actualizar "Última actualización" con la fecha actual
- Actualizar dependencias si cambiaron

### 2. Actualizar `/docs/session-learnings.md`
- Agregar nueva sección con formato: `## Sesión: [FECHA]`
- Documentar cada problema encontrado y su solución
- Incluir código relevante de las soluciones
- Agregar aprendizajes clave para futuras sesiones
- Listar mejores prácticas descubiertas
- Documentar decisiones técnicas importantes

### Plantilla para session-learnings.md
```markdown
## Sesión: [FECHA]

### ✅ Problemas Resueltos

#### Problema 1: [Título descriptivo]

**Contexto:** [Qué estábamos intentando hacer]

**Error encontrado:**
```
[Mensaje de error o descripción]
```

**Solución aplicada:**
[Paso a paso de la solución]

**Código relevante:**
```typescript
// Código de la solución
```

**Aprendizaje:** [Qué aprendimos]

---

### 💡 Mejores Prácticas Descubiertas
- [Práctica]: [Descripción]

### 🚀 Estado Actual
**Proyecto:** [Estado al finalizar la sesión]
**Siguiente sesión:** [Qué hacer después]
```

## 🎯 Información del Proyecto

- **Nombre:** Rexpira
- **Tipo:** Aplicación web de meditación con respiración guiada
- **Stack:** React 19 + TypeScript 5 + Vite 7 + Tailwind CSS 4.1 + Framer Motion 12
- **Despliegue:** Railway
- **Características:** Sin backend, sin base de datos, 100% cliente, gratuita

## ⚠️ Reglas Importantes

1. **NO crear commits** sin que el usuario lo solicite explícitamente
2. **NO instalar dependencias** sin consultar primero (excepto `npm install` para instalar dependencias existentes)
3. **NO crear archivos markdown** (.md) de documentación adicionales sin solicitud explícita
4. **SÍ actualizar** `/docs/project-status.md` y `/docs/session-learnings.md` al final de cada sesión
5. **SÍ usar TodoWrite** para tareas complejas con 3+ pasos
6. **SÍ leer** los 3 documentos de `/docs` al inicio de cada sesión

## 📚 Recursos del Proyecto

- **Documentación:** `/docs/`
- **Componentes:** `/src/components/`
- **Visualizaciones:** `/src/components/visualizations/`
- **Hooks:** `/src/hooks/`
- **Tipos:** `/src/types/`
- **Constantes:** `/src/constants/`

## 🔄 Flujo de Trabajo Típico

1. Usuario describe tarea o problema
2. Claude lee documentos de `/docs` (si no lo hizo al inicio)
3. Claude usa TodoWrite si la tarea es compleja
4. Claude implementa la solución
5. Claude prueba los cambios
6. Claude actualiza documentación en `/docs`
7. Claude pregunta si se debe crear commit (si aplica)

---

**Última actualización de este protocolo:** 2025-10-15
