# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

Grimorio Engine is a pure CSS UI framework by ESC Labs with a PS1/CRT retro aesthetic. Zero external JS dependencies. Fonts are loaded from Google Fonts. The entire framework lives in one file: `packages/css/style.css`.

`apps/showcase/index.html` is the **canonical component showcase** — it demonstrates every component and is the source of truth for all design patterns and usage. All JavaScript lives in `js/engine.js`.

**System requirements:** Node ≥18.0.0, npm ≥9.0.0

## Running / Developing

**Zero build step during development.** Edit `packages/css/style.css` directly and see changes instantly with any static server. Choose one:

### Quick start (no npm):
```bash
python -m http.server 8080
# then open http://localhost:8080/apps/showcase/
```

### With npm:
```bash
npm install        # installs clean-css-cli devDependency (optional)
npm run serve      # npx serve . (any port) — then navigate to /apps/showcase/
```

### Before publishing:
```bash
npm run build      # generates packages/css/style.min.css (minified CSS for distribution)
```

**Development workflow:** Open showcase in browser, edit CSS directly in `packages/css/style.css`, refresh to see changes. No compilation or transpilation needed.

**Validation:** `.hintrc` configures HTMLHint validation (development only). The `no-inline-styles` rule is disabled by design — this policy is maintained manually in code review (see below).

## Common development tasks

**Add a new component:**
1. Create a new CSS section in `packages/css/style.css` with the standard header pattern (see Architecture)
2. Use BEM naming in Spanish
3. Use CSS variables for all colors (never hardcode hex in components)
4. Add demo markup + example in `apps/showcase/index.html` under a `.separador` label
5. Test all three palettes (no class, `.cosmos`, `.crimson`)

**Update the showcase:**
- **Zero `style=""` anywhere** — `index.html` and all secondary pages are inline-style-free (verify with a grep for `style="` returning nothing). Solve every layout need with a utility or BEM class; if a value is missing, add the utility to `style.css` first.
- Changes to `packages/css/style.css` auto-reload in the browser; no build step needed
- Always add theme-switcher button to secondary pages (`data-tema` attribute + `#tema-flash` div required)

**Create a new secondary page (like login.html, contacto.html):**
- Copy boilerplate from existing secondary pages in `apps/showcase/html/`
- Update `menu-principal__item--active` on current nav item
- Secondary pages live at `apps/showcase/html/` (3 levels below repo root), so CSS and JS use a **`../../../` prefix** (`../../../packages/css/style.css`, `../../../js/engine.js`). Images live at `apps/showcase/images/`, so they use `../images/`. Sibling pages use plain relative links (`contacto.html`).
- Paths to images use `../images/`

**Publish a release:**
1. Run `npm run build` to generate minified CSS
2. Ensure `packages/css/style.min.css` exists and is committed
3. Tag the commit (e.g., `v2.0.1`)
4. Distribution via GitHub: `npm install github:ClaysterChief/GrimorioEngine#v2.0.1`

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

Additional token groups (the `:root` block in `style.css` is the single source — see `--space-*`, `--z-*`, `--font-size-*`):

```css
--transition-fast / --transition-base / --transition-moderate / --transition-slow / --transition-card
--color-ok (#00c853) / --color-warning (#ffd600)
--color-dot-yellow / --color-dot-green
--border-thin (1px) / --border-accent (2px) / --border-thick (3px)
--space-0 / xs / sm / md / lg / xl / 2xl / 3xl / 4xl   (spacing — drives m-* / p-* / gap-*)
--z-base / z-nav / z-dropdown / z-sticky / z-modal / z-toast / z-flash   (z-index layers)
--font-size-xs / sm / base / md / lg / xl / 2xl / 3xl / 4xl   (+ --font-size-label/body aliases)
```

**Token consistency is load-bearing** (the framework is meant to be AI-consumable — predictable scales prevent improvised values). All three spacing families (`m-*`, `p-*`, `gap-*`) share one **monotonic** `--space-*` scale; `fs-*` is monotonic by name. Never introduce a token whose value breaks the ordering.

Do **not** tokenize: credit card internal colors (`#7a5f00`, `#0e0e0e`, `#f0f0f0`, etc.) — they simulate real card materials and must stay hardcoded.

### Utility class scale

Spacing scale (`--space-*`, used by `.m-*`, `.p-*` (incl. `t/b/l/r/x/y`), `.gap-*`, `.gap-x/y-*`). **Monotonic:**

| Token | Value |
|---|---|
| `0` | 0 |
| `xs` | 0.75rem (7.5px) |
| `sm` | 1rem (10px) |
| `md` | 1.5rem (15px) |
| `lg` | 2rem (20px) |
| `xl` | 3rem (30px) |
| `2xl` | 4rem (40px) |
| `3xl` | 5rem (50px) |
| `4xl` | 6rem (60px) |

Font-size utilities (monotonic): `.fs-xs` (0.9) · `.fs-sm` (1) · `.fs-base` (1.1) · `.fs-md` (1.2) · `.fs-lg` (1.5) · `.fs-xl` (1.8) · `.fs-2xl` (2.2) · `.fs-3xl` (3) · `.fs-4xl` (4.5rem). Aliases: `.fs-label` (=md), `.fs-body` (=xl). Min legible 0.9rem/9px; hardcoded floors at 0.8rem/8px.

Letter-spacing: `.tracking-md` (0.1em) · `.tracking-wide` (0.08em) · `.tracking-wider` (0.18em)

Font family (family only): `.font-display` · `.font-body` · `.font-mono` (note: `.text-mono` also sets size + uppercase + tracking)

Position: `.pos-relative/absolute/fixed/sticky/static` · `.inset-0` · `.top-0/right-0/bottom-0/left-0`
Z-index: `.z-0/base/nav/dropdown/sticky/modal/toast` (map to `--z-*`)
Overflow: `.overflow-hidden/auto/scroll/visible` · `.overflow-x/y-auto` · `.overflow-x/y-hidden`
Opacity: `.opacity-0/25/50/60/75/100`
Width: `.w-full/half/fit/auto/screen` · fixed rem `.w-xs/sm/md/lg/xl` (12/20/24/28/32rem)
Height: `.h-full/auto/screen` · `.min-h-0/sm/md/lg/full/screen/vista` (vista = 100vh − 14rem)
Min-width: `.min-w-0/xs/sm/md/lg/xl/full` (12/20/24/28/32rem)
Max-width: `.max-w-2xs/xs/sm/md/lg/xl/full` (32/40/48/56/68/80rem) · legacy aliases `.mw-xs/sm/md`
Aspect-ratio: `.aspect-square/video/4-3`
Line-height: `.leading-tight/snug/normal/relaxed` · text: `.truncate` · `.break-words` · `.text-nowrap` · `.no-subrayado`
Flex (added): `.jc-start/around/evenly` · `.ai-stretch/baseline`

Semantic helper classes (reusable patterns — prefer these over re-deriving inline): `.etiqueta` (mono eyebrow label, `--acento` modifier available) · `.regla` (subtle `<hr>` divider) · `.enlace` (accent link, no underline)

Icon size modifiers: `.icono--sm` (1.2rem) · `.icono--md` (2rem) · `.icono--lg` (3rem) · `.icono--xl` (4.5rem)
Button modifier: `.btn--peligro` (recolors any button to `--red-strike`)

Animation utilities (expose existing `@keyframes` as classes; all honor `prefers-reduced-motion`): `.animate-glow/pulse/blink/glitch/scan/spin/ping/flicker/entrada` · control `.animate--once` · `.animate--pausa`
Transition utilities: `.transition` · `.transition-fast/base/moderate/slow` · `.transition-none`
Skeleton loader: `.skeleton` + `--titulo/--linea/--bloque/--avatar` (PS1 scanline shimmer)
Form validation: `.formulario-estandar--error/--ok` (also `.formulario-textarea--*`) + `.form-ayuda` / `.form-ayuda--error/--ok`
Accessibility: global `:focus-visible` ring in `--acento` (automatic, no class needed)

### HTML data attributes (JS hooks)

| Attribute | Used by | Effect |
|---|---|---|
| `data-tema="dual\|cosmos\|crimson"` | `iniciarSelectorTema()` | Switches palette + CRT flash |
| `data-paso-sig` | `iniciarFormPasos()` | Advance multi-step form |
| `data-paso-ant` | `iniciarFormPasos()` | Go back in multi-step form |
| `data-nombre-id="id"` | `iniciarArchivos()` | File input display target element ID |
| `id="tema-flash"` | `iniciarSelectorTema()` | Required CRT flash overlay (must exist on every page) |

## Adding new components

The showcase (`apps/showcase/index.html`) is the **source of truth** for all components, patterns, and best practices.

1. Add a new section in `packages/css/style.css` with the standard header comment (see Architecture).
2. Follow BEM naming in Spanish.
3. Use CSS variables for all colors — never hardcode hex values in component rules.
4. Demonstrate the component in `apps/showcase/index.html` under a `.separador` label.
5. Test it across all three palettes to ensure theme switching works.

**Critical rule:** `apps/showcase/index.html` must not use `style=""` attributes. The showcase is the framework's own demo — every layout need must be solved with a utility class or BEM modifier. If a utility class for a needed value doesn't exist, add it to the Utilities sections of `packages/css/style.css` first.

**New components must be visible and working in the showcase before being considered complete.** This is both the demo and the test suite.

## Secondary pages

`apps/showcase/html/login.html`, `apps/showcase/html/contacto.html`, and `apps/showcase/html/servicios.html` are complete. All three share the same shell:

- `<link rel="stylesheet" href="../../../packages/css/style.css" />`
- `<script defer src="../../../js/engine.js"></script>`
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

The repo uses npm workspaces (`"workspaces": ["packages/*"]`). 

**Production-ready:**

| Package | Path | Purpose |
|---|---|---|
| `@grimorio/css` | `packages/css/` | ✅ Active — the complete CSS framework (`style.css` + minified `style.min.css`) |

**AI-consumable artifacts** (keep in sync with `style.css` whenever tokens/components change — these are what an AI generator reads to produce on-brand UI):

| File | Purpose |
|---|---|
| `COMPONENTES.md` | The **AI manifest** — identity rules, palettes, token scales, full utility + component catalog with minimal examples, delivery checklist. Paste into a generator's system prompt. |
| `llms.txt` | Discoverable root index (llmstxt.org convention) linking the manifest + key files. |
| `packages/core/tokens.json` | Design tokens extracted from `:root` (single source: colors per palette, spacing, font-size, z-index, transitions, borders). `tokens.js` re-exports them as an ES module. |

**Future frameworks (stubs — private, not to be published yet):**

| Package | Path | Purpose |
|---|---|---|
| `@grimorio/core` | `packages/core/` | Design tokens — `tokens.json` (active) + `tokens.js` export; logic/extraction script (future) |
| `@grimorio/elements` | `packages/elements/` | Web Components layer (future) |
| `@grimorio/vue` | `packages/vue/` | Vue 3 component wrappers (future) |
| `@grimorio/angular` | `packages/angular/` | Angular component wrappers (future) |
| `@grimorio/react-native` | `packages/react-native/` | React Native components (future) |

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
