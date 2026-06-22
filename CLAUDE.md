# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

Grimorio Engine is a pure CSS UI framework by ESC Labs with a PS1/CRT retro aesthetic. Zero external JS dependencies. Fonts are loaded from Google Fonts. The entire framework lives in one file: `css/style.css`.

`index.html` is the component showcase — it demonstrates every component. All JavaScript lives in `js/engine.js`.

## Running / Developing

No build step required. Open `index.html` directly in a browser. Or use the npm script:

```bash
npm install        # installs clean-css-cli devDependency
npm run build      # generates css/style.min.css
npm run serve      # npx serve . (any port)
```

For quick development without npm:

```bash
python -m http.server 8080
```

There are no tests or linter configs.

## Architecture

### Single-file CSS framework

`css/style.css` is organized into sections marked with this header pattern:

```css
/* ================================================
   SECTION NAME — Brief description
   ================================================ */
```

Sections in order: Variables Globales → Reset y Base → Layout → Utilidades Fondos → Utilidades Textos → Navegación → Botones → Formularios → Tarjetas → Imágenes → Carrusel → Paginación → Alertas → Modal → Tablas → Loaders → Consola → Ventana → Stat HUD → VHS → Animaciones Nuevas → Íconos CSS → Optimización → Responsive.

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

All functions return early if their target element is not found, so engine.js is safe to load on any page even if most components are absent.

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

## Adding new components

1. Add a new section in `css/style.css` with the standard header comment.
2. Follow BEM naming in Spanish.
3. Use CSS variables for all colors — never hardcode hex values in component rules.
4. Demonstrate the component in `index.html` under a `.separador` label.

## Secondary pages

`html/login.html`, `html/contacto.html`, and `html/servicios.html` are complete. All three share the same shell:

- `<link rel="stylesheet" href="../css/style.css" />`
- `<script defer src="../js/engine.js"></script>`
- Same nav with `menu-principal__item--active` on the current page's item
- `<div id="tema-flash" class="tema-flash"></div>` — required for theme switcher
- Same footer with `../images/` paths

Nav link paths within `html/`: siblings use relative paths (`contacto.html`, `servicios.html`, `login.html`); Inicio links to `../index.html`.

## Identity constraints (from ESC-LABS-PS1-FRAMEWORK.md)

- The brand name is **ESC Labs** — never expanded in copy, no periods between letters.
- Approved taglines: *Systems that evolve.* / *Build. Evolve. Compute.* / *From science to system.* / *Tecnología con alma propia.*
- The `◆` diamond symbol is a recurring visual motif — used in separators, buttons, and decorative elements.
- No border-radius on structural elements — sharp corners are intentional to the PS1 aesthetic.
