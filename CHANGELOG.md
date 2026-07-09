# Changelog

Todas las versiones notables de GrimorioEngine. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/); el proyecto sigue
versionado semántico.

## [2.0.2]

### Fixed
- **No había forma de anclar un elemento anidado a Dual Signal.** `.cosmos` y `.crimson` son clases completas (variables + fondo) que se pueden aplicar a cualquier contenedor, pero Dual Signal solo existía como los valores por defecto de `:root` — sin clase propia. Resultado: un elemento "sin clase" anidado dentro de un contenedor `.cosmos`/`.crimson` heredaba esa paleta en vez de quedarse en púrpura (encontrado por una IA generando una página de comparación de temas — ver `USO-CON-IA.md`). Agregada **`.dual`**, misma estructura que `.cosmos`/`.crimson`, mismos valores que `:root`. Regla nueva: al mostrar una paleta específica dentro de un contenedor con otra paleta activa, usar siempre una clase explícita (`.dual`/`.cosmos`/`.crimson`) — nunca dejar Dual Signal "sin clase" en ese caso. Demostrado en el showcase; `COMPONENTES.md`, `CLAUDE.md` y `tokens.json`/`tokens.js` (campo `explicitClass`) sincronizados.

[2.0.2]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.2

## [2.0.1]

### Changed
- **Renombrado `style.css`→`grimorio.css` / `engine.js`→`grimorio.js`** para evitar choque con un `style.css`/`engine.js` propio en el proyecto de quien instala el framework. `packages/css/grimorio.css` sigue siendo la única fuente editable (cero-build-step). `npm run build` ahora también genera un **espejo en `css/` a nivel raíz** (paralelo a `js/`), commiteado igual que el minificado, para que `npm install github:...` y los CDN (jsDelivr) sirvan `css/grimorio.css` sin que el consumidor tenga que buildear. **Rompe rutas de `v2.0.0`** — quien haya probado contra ese tag debe actualizar a `packages/css/grimorio.css` (fuente) o `css/grimorio.css` (instalación).
- **Legibilidad, ronda 2**: el lift de v2.0.0 no fue suficiente — 31 `font-size` hardcodeados entre 0.8–0.95rem (8–9.5px) quedaron sin tocar la primera vez (nav, headers/badges de tabla, título de modal/alerta, footer de tarjeta, labels de barra HP/HUD, versión de ventana/consola, etc.). Nueva regla simple sin excepciones: **ningún `font-size` del framework por debajo de 1rem (10px)**. Tokens subidos un escalón más: `--font-size-xs` 0.9→1rem, `sm` 1→1.1, `base` 1.1→1.2, `md` 1.2→1.3, `lg` 1.5→1.6rem (`xl`/body sin cambio, 1.8rem).

### Fixed
- **`npm install github:ClaysterChief/GrimorioEngine` instalaba todo el repositorio** (showcase, imágenes, docs, package.json de cada paquete stub — 41 archivos / 1.1 MB) porque al `package.json` raíz le faltaba el campo `files`. Ahora solo instala lo necesario para consumir el framework: `css/grimorio.css`, `css/grimorio.min.css`, `js/grimorio.js`, `README.md`, `LICENSE`.

[2.0.1]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.1

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
