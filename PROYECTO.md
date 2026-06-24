# Grimorio Engine — CSS UI Library

Framework de estilos CSS propio de ESC Labs.
Se usa importando `packages/css/style.css` y aplicando las clases en cualquier HTML.

---

## Estado actual — v2.0.0

| Componente            | Estado       |
|-----------------------|--------------|
| Variables / Tokens    | ✅ Listo      |
| Reset / Base          | ✅ Listo      |
| Layout                | ✅ Listo      |
| Navegación            | ✅ Listo      |
| Botones (9 variantes) | ✅ Listo      |
| Formularios completos | ✅ Listo      |
| Tarjetas (5 variantes)| ✅ Listo      |
| Imágenes (8 efectos)  | ✅ Listo      |
| Utilidades            | ✅ Listo      |
| Responsive            | ✅ Parcial    |
| Grid / Columnas       | ✅ Listo      |
| Alertas / Modal       | ✅ Listo      |
| Tablas                | ✅ Listo      |
| Íconos CSS puros      | ✅ Listo      |
| Acordeón              | ✅ Listo      |
| Toast                 | ✅ Listo      |
| Spinner / Loaders     | ✅ Listo      |
| Tooltip               | ✅ Listo      |
| Slider de rango       | ✅ Listo      |
| Páginas secundarias   | ✅ Listo      |
| Showcase (`apps/showcase/`) | ✅ Listo |
| Estructura monorepo (`packages/`) | ✅ Listo |
| npm workspaces        | ✅ Listo      |
| `style.min.css`       | ⬜ Pendiente  |

---

## Estructura del proyecto

```
grimorio-engine/
  packages/
    css/
      style.css           ← Framework completo (@grimorio/css)
    core/
      tokens.js           ← Placeholder tokens JSON (@grimorio/core)
    elements/             ← Stub — Web Components futuros
    vue/                  ← Stub — Wrappers Vue 3
    angular/              ← Stub — Wrappers Angular
    react-native/         ← Stub — Componentes React Native
  apps/
    showcase/
      index.html          ← Demo de todos los componentes
      html/               ← Páginas secundarias
      images/             ← Assets del showcase
  js/
    engine.js             ← JS vanilla (futuro: mover a packages/core/)
  CLAUDE.md
  ESC-LABS-PS1-FRAMEWORK.md ← Guía de identidad visual
  README.md
  PROYECTO.md
```

---

## Roadmap — Pendientes

### Infraestructura
- [ ] Extraer variables CSS a `packages/core/tokens.js` (design tokens JSON)
- [ ] Script de build que regenera el bloque `:root` desde `tokens.js`
- [ ] Mover `js/engine.js` a `packages/core/` (requiere tokens implementados)
- [ ] Generar `packages/css/style.min.css` via `npm run build`
- [ ] Agregar `package.json` a `apps/showcase/` para formalizar como workspace app
- [ ] Decidir nombre del paquete CSS: `@grimorio/css` vs `@grimorio/styles`

### Web Components (`@grimorio/elements`)
- [ ] `<esc-acordeon>` — primer Custom Element (14 líneas JS, bajo acoplamiento)
- [ ] `<esc-toast>` — singleton convertido a CE
- [ ] `<esc-tooltip>` — casi CSS-only, fácil de encapsular
- [ ] `<esc-spinner>` — CSS-only, sin lógica
- [ ] Carrusel, formulario multi-paso, tarjeta de crédito (mayor complejidad, después)

### Adapters de framework
- [ ] `@grimorio/vue` — Wrappers Vue 3 (depende de `@grimorio/elements`)
- [ ] `@grimorio/angular` — Wrappers Angular (depende de `@grimorio/elements`)
- [ ] `@grimorio/react-native` — Reimplementación completa en RN primitives + tokens

### Distribución
- [ ] Publicar `@grimorio/css` en npm / GitHub Packages
- [ ] Publicar `@grimorio/core` cuando tenga tokens reales

---

## Convención de nombres de clases

BEM simplificado, todo en **español, kebab-case**:

```
.bloque
.bloque-modificador
.bloque__elemento
.bloque__elemento--modificador
```

Prefijos clave: `btn`, `campo-`, `formulario-`, `tarjeta-`, `grupo-`, `imagen-`, `alerta-`, `tabla-`, `modal-`, `carrusel-`, `ventana-`, `consola-`.

---

*Última revisión: 2026-06-24*
