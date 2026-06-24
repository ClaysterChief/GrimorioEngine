# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

Grimorio Engine is a pure CSS UI framework by ESC Labs with a PS1/CRT retro aesthetic. Zero external JS dependencies. Fonts are loaded from Google Fonts. The entire framework lives in one file: `packages/css/style.css`.

`apps/showcase/index.html` is the component showcase — it demonstrates every component. All JavaScript lives in `js/engine.js`.

## Running / Developing

No build step required. Open `apps/showcase/index.html` directly in a browser. Or use the npm script:

```bash
npm install        # installs clean-css-cli devDependency
npm run build      # generates packages/css/style.min.css
npm run serve      # npx serve . (any port) — then navigate to /apps/showcase/
```

For quick development without npm:

```bash
python -m http.server 8080
# then open http://localhost:8080/apps/showcase/
```

There are no tests or linter configs. `.hintrc` configures HTMLHint validation (dev only). `no-inline-styles` is turned off there — do not rely on it for enforcement; the policy is maintained manually (see below).

## Architecture

### Single-file CSS framework

`packages/css/style.css` is organized into sections marked with this header pattern:

```css
/* ================================================
   SECTION NAME — Brief description
   ================================================ */
```

Sections follow a consistent ordering:

1. **Variables Globales** — all custom properties (palettes, transitions, semantic colors, border widths, font-size scale)
2. **Reset y Base** — html font-size, box-sizing, typography defaults
3. **Layout** — contenedor, grid, max-width helpers
4. **Utilities** (8 sections) — fondos, textos, flexbox, márgenes/paddings, display, alineación, tamaños de fuente, letter-spacing, posición/dimensiones
5. **Components** (~45 sections) — navegación, superficie, botones, formularios, tarjetas, imágenes, barras HP, carrusel, paginación, alertas, modal, tablas, ventana, consola, texto-máquina, stat-hud, VHS, animaciones, íconos CSS, acordeón, toast, spinners, tooltip, slider de rango
6. **Optimización** — accessibility + performance hints
7. **Responsive** — breakpoints (tablet + mobile)

**Critical CSS detail**: `html { font-size: 62.5%; }` makes `1rem = 10px` everywhere. All sizing uses rem.

### Theme system

Three palettes, applied as a class on `<body>` or any container:

| Palette | Class | Accent |
|---|---|---|
| Dual Signal (default) | *(none)* | `#b44fff` purple |
| Cosmos Blue | `.cosmos` | `#1a6fd8` blue |
| Crimson Signal | `.crimson` | `#e53935` red |

All component colors reference CSS custom properties (`--acento`, `--void-surface`, `--border`, etc.) so they automatically adapt when a palette class is applied. Theme switching triggers a CRT flash animation via `#tema-flash` + `.tema-flash--activo`.

### JavaScript (`js/engine.js`)

All JS is vanilla ES6 in `js/engine.js`, no modules, no bundler — everything is global scope. Loaded via `<script defer src="js/engine.js">` at the bottom of each page. Initialized on `DOMContentLoaded`:

- `ESCCarrusel` — class, handles image/card carousels
- `ESCConsola` — class, interactive terminal with command history
- `iniciarFormPasos()` — multi-step form with sliding panels
- `iniciarTarjetaCredito()` — credit card 3D flip + live preview
- `iniciarCorreoInputs()` — email input with domain dropdown
- `iniciarSelectorTema()` — palette switcher with CRT flash (requires `<div id="tema-flash" class="tema-flash">` on the page)
- `iniciarTextoMaquina()` — measures natural width for typewriter CSS animation
- `iniciarArchivos()` — custom file input display
- `iniciarPaginacion()` — demo pagination
- `iniciarAcordeon()` — expandable accordion panels; supports `.acordeon--exclusivo` for single-open mode
- `iniciarRangos()` — range sliders with live value display; sets `--rango-pct` CSS variable
- `ESCToast` — singleton toast system; call `ESCToast.mostrar(msg, tipo, duracion)` where `tipo` is `info | ok | warning | error`

All functions return early if their target element is not found, so engine.js is safe to load on any page even if most components are absent. Theme choice is persisted in `localStorage['grimorio-tema']`.

### Naming conventions

BEM-simplified, **all class names in Spanish, kebab-case**:

```
.bloque
.bloque-modificador
.bloque__elemento
.bloque__elemento--modificador
```

Key prefixes: `btn`, `campo-`, `formulario-`, `tarjeta-`, `grupo-`, `imagen-`, `alerta-`, `tabla-`, `modal-`, `carrusel-`, `ventana-`, `consola-`.

### CSS variables (theme-aware)

```css
--void-deep       /* darkest background */
--void-primary    /* page background */
--void-surface    /* component surface */
--deep            /* elevated background */
--border          /* borders */
--acento          /* primary accent color */
--acento-light    /* highlight / glow */
--red-strike      /* action/alert accent */
--text-primary    /* body text */
--text-muted      /* labels, metadata */
```

Font variables (constant across palettes): `--font-display` (Orbitron 900), `--font-body` (VT323), `--font-mono` (Share Tech Mono).

Additional token groups added in v2.0:

```css
--transition-fast / --transition-base / --transition-moderate / --transition-slow / --transition-card
--color-ok (#00c853) / --color-warning (#ffd600)
--color-dot-yellow / --color-dot-green
--border-thin (1px) / --border-accent (2px) / --border-thick (3px)
--font-size-xs / --font-size-sm / --font-size-base / --font-size-body / --font-size-label / --font-size-lg
```

Do **not** tokenize: credit card internal colors (`#7a5f00`, `#0e0e0e`, `#f0f0f0`, etc.) — they simulate real card materials and must stay hardcoded.

### Utility class scale

Spacing scale (used in `.m-*`, `.p-*`, `.gap-*`, `.mt-*`, `.mb-*`, etc.):

| Token | Value |
|---|---|
| `0` | 0 |
| `xs` | 0.75rem (7.5px) |
| `sm` | 1rem (10px) |
| `md` | 1.5rem (15px) |
| `lg` | 2rem (20px) |
| `xl` | 2.5rem (25px) |
| `2xl` | 2.5rem (25px) — same as xl for margins; use `gap-xl` for gap |

Font-size utilities: `.fs-xs` · `.fs-sm` · `.fs-base` · `.fs-body` · `.fs-label` · `.fs-lg` (map to `--font-size-*` variables)

Letter-spacing utilities: `.tracking-md` (0.1em) · `.tracking-wide` (0.08em) · `.tracking-wider` (0.18em)

Max-width utilities: `.mw-xs` (40rem) · `.mw-sm` (56rem) · `.mw-md` (68rem)

Key one-off utilities: `.w-full` · `.w-fit` · `.ml-auto` · `.mx-auto` · `.flex-1` · `.pos-relative` · `.d-inline-block` · `.d-inline-flex` · `.cursor-pointer` · `.object-cover`

### HTML data attributes (JS hooks)

| Attribute | Used by | Effect |
|---|---|---|
| `data-tema="dual\|cosmos\|crimson"` | `iniciarSelectorTema()` | Switches palette + CRT flash |
| `data-paso-sig` | `iniciarFormPasos()` | Advance multi-step form |
| `data-paso-ant` | `iniciarFormPasos()` | Go back in multi-step form |
| `data-nombre-id="id"` | `iniciarArchivos()` | File input display target element ID |
| `id="tema-flash"` | `iniciarSelectorTema()` | Required CRT flash overlay (must exist on every page) |

## Adding new components

1. Add a new section in `packages/css/style.css` with the standard header comment.
2. Follow BEM naming in Spanish.
3. Use CSS variables for all colors — never hardcode hex values in component rules.
4. Demonstrate the component in `index.html` under a `.separador` label.

**`index.html` must not use `style=""` attributes.** The showcase is the framework's own demo — every layout need must be solved with a utility class or BEM modifier. If a utility class for a needed value doesn't exist, add it to the Utilities sections of `packages/css/style.css` first.

## Secondary pages

`apps/showcase/html/login.html`, `apps/showcase/html/contacto.html`, and `apps/showcase/html/servicios.html` are complete. All three share the same shell:

- `<link rel="stylesheet" href="../../packages/css/style.css" />`
- `<script defer src="../../js/engine.js"></script>`
- Same nav with `menu-principal__item--active` on the current page's item
- `<div id="tema-flash" class="tema-flash"></div>` — required for theme switcher
- Same footer with `../images/` paths (images live at `apps/showcase/images/`)

Nav link paths within `apps/showcase/html/`: siblings use relative paths (`contacto.html`, `servicios.html`, `login.html`); Inicio links to `../index.html`.

## Identity constraints (from ESC-LABS-PS1-FRAMEWORK.md)

- The brand name is **ESC Labs** — never expanded in copy, no periods between letters.
- Approved taglines: *Systems that evolve.* / *Build. Evolve. Compute.* / *From science to system.* / *Tecnología con alma propia.*
- The `◆` diamond symbol is a recurring visual motif — used in separators, buttons, and decorative elements.
- No border-radius on structural elements — sharp corners are intentional to the PS1 aesthetic.
- No emojis in any brand material or UI copy.
- **`--red-strike` / `#ff3d6e`** is an action-only accent: CTAs, blinking cursors, HP bars, active indicators. Never use it as body text color or background fill.
- **Orbitron minimum size**: 18px. Below that it loses character — use Share Tech Mono for labels instead.
- **Scanlines** are required on heroes and main surface backgrounds (repeating-linear-gradient creating 4px stripes at ~20% opacity). They're already baked into `.superficie` and related component rules — preserve them when overriding backgrounds.

## Monorepo structure

The repo uses npm workspaces (`"workspaces": ["packages/*"]`). Current packages:

| Package | Path | Status |
|---|---|---|
| `@grimorio/css` | `packages/css/` | Active — contains `style.css` |
| `@grimorio/core` | `packages/core/` | Stub — future design tokens JSON |
| `@grimorio/elements` | `packages/elements/` | Stub — future Web Components layer |
| `@grimorio/vue` | `packages/vue/` | Stub — future Vue 3 wrappers |
| `@grimorio/angular` | `packages/angular/` | Stub — future Angular wrappers |
| `@grimorio/react-native` | `packages/react-native/` | Stub — future RN components |

`js/engine.js` lives at root for now — it will move to `packages/core/` when design token extraction is implemented.

The showcase lives at `apps/showcase/`: `index.html` is the component demo, `html/` has the secondary pages, `images/` has all demo assets. To open locally: `apps/showcase/index.html` in browser, or `npm run serve` and navigate to `/apps/showcase/`.

Stub packages carry `"private": true` to prevent accidental publishing before they have real code.

Planned dependency graph when complete:
```
@grimorio/core (tokens)
      ↓
@grimorio/css (styles)
      ↓
@grimorio/elements (Web Components)
      ↓              ↓              ↓
@grimorio/vue  @grimorio/angular  @grimorio/react-native
```

## Using as a package

Install directly from GitHub (no npm publish required):

```bash
npm install github:ClaysterChief/GrimorioEngine
```

Then import CSS globally in any bundler project:

```js
import 'grimorio-engine/css/style.css'
```

For **React**, manage theme with state rather than `data-tema` + `iniciarSelectorTema()` (that function targets DOM directly and doesn't fit React's lifecycle). Apply the palette class on `document.body` via `useEffect` and persist in `localStorage['grimorio-tema']`. Interactive components (carousel, multi-step form, credit card) should be ported to React hooks (`useEffect` / `useRef`) — the CSS doesn't change, only the JS logic moves into the component lifecycle.
