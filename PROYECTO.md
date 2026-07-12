# Grimorio Engine — CSS UI Library

Framework de estilos CSS propio de ESC Labs.
Se usa importando `packages/css/grimorio.css` (o el espejo `css/grimorio.css` en la raíz) y aplicando las clases en cualquier HTML.

---

## Estado actual — v2.0.5

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
| `grimorio.min.css`    | ✅ Listo      |

---

## Estructura del proyecto

```
grimorio-engine/
  packages/
    css/
      grimorio.css        ← Framework completo (@grimorio/css) — fuente editable
    core/
      tokens.json         ← Design tokens (fuente de verdad) — @grimorio/core
      tokens.js           ← Re-export ESM de los tokens
    elements/             ← Stub — Web Components futuros
    vue/                  ← Stub — Wrappers Vue 3
    angular/              ← Stub — Wrappers Angular
    react-native/         ← Stub — Componentes React Native
  apps/
    showcase/
      index.html          ← Demo de todos los componentes
      html/               ← Páginas secundarias
      images/             ← Assets del showcase
  css/
    grimorio.css          ← Espejo generado (instalación GitHub/CDN) — no editar a mano
  js/
    grimorio.js           ← JS vanilla (futuro: mover a packages/core/)
  CLAUDE.md
  ESC-LABS-PS1-FRAMEWORK.md ← Guía de identidad visual
  README.md
  PROYECTO.md
```

---

## Roadmap — Pendientes

### Infraestructura
- [x] Extraer variables CSS a `packages/core/tokens.json` (design tokens)
- [x] Generar `packages/css/grimorio.min.css` via `npm run build`
- [x] Renombrar `style.css`/`engine.js` → `grimorio.css`/`grimorio.js` + espejo `css/` a nivel raíz
- [ ] Mover `js/grimorio.js` a `packages/core/`
- [ ] Agregar `package.json` a `apps/showcase/` para formalizar como workspace app
- [x] Decidir nombre del paquete CSS: `@grimorio/css`

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

*Última revisión: 2026-07-11*
