# Changelog

Todas las versiones notables de GrimorioEngine. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/); el proyecto sigue
versionado semántico.

## [2.0.0]

Reestructuración a monorepo y consolidación como **sistema de diseño consumible por IA**.

### Added
- **Monorepo** con npm workspaces: `@grimorio/css` (activo) + stubs `@grimorio/core/elements/vue/angular/react-native`.
- **Escala de tokens canónica** en `:root` (`--space-*`, `--z-*`, `--font-size-*`) — fuente única, monótona, que alimenta `m-* / p-* / gap-*`.
- **Familias de utilidades** nuevas: `position`, `z-index`, `overflow`, `opacity`, `width/height` (incl. rem fijo), `min-w/max-w/min-h`, `aspect-ratio`, `gap-x/y`, alineación flex extra, `leading-*`, `truncate`, `font-display/body/mono`, márgenes/paddings por lado, `2xl/3xl/4xl`.
- **Clases semánticas**: `.etiqueta`, `.regla`, `.enlace`, `.icono--sm/md/lg/xl`, `.btn--peligro`.
- **Utilidades de animación/transición**: `.animate-*` (sobre los keyframes existentes) + `.transition-*`.
- **Componentes**: skeleton loader PS1 (`.skeleton`), estados de validación de formulario (`--error/--ok`, `.form-ayuda`).
- **Accesibilidad**: `:focus-visible` global con anillo de acento; respeto de `prefers-reduced-motion` extendido.
- **Artefactos para IA**: `packages/core/tokens.json` (+ `tokens.js` ESM), `COMPONENTES.md` (manifiesto), `llms.txt`, `USO-CON-IA.md` (guía operativa).
- `style.min.css` versionado; `LICENSE` (MIT); `serve.json` para servir el showcase con barra final.

### Changed
- **Showcase con cero `style=""`**: `index.html` y las páginas secundarias se refactorizaron a utilidades + BEM.
- **Lift de legibilidad de fuentes**: `--font-size-xs` 0.72→0.9rem, `sm` 0.85→1, `base` 1→1.1, `md` 1.1→1.2, `lg` 1.35→1.5rem; todos los tamaños hardcodeados ilegibles (<8px) pisados a 0.8rem.
- Headings Orbitron de páginas secundarias subidos a ≥18px (cumplen el mínimo de identidad).

### Fixed
- Páginas secundarias (`apps/showcase/html/*.html`): rutas a CSS/JS corregidas de `../../` a `../../../`.
- Escala de spacing antes no monótona (`2xl < xl`) y `gap-*` divergente de `m-*/p-*`: unificadas.

[2.0.0]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.0
