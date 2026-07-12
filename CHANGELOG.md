# Changelog

Todas las versiones notables de GrimorioEngine. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/); el proyecto sigue
versionado semántico.

## [Unreleased]

### Added
- **`@grimorio/elements` · primer Web Component `<esc-acordeon>`** (Fase C): Custom Element del acordeón en light DOM que usa el CSS global (sin shadow DOM, sin `grimorio.js` ni init manual). API declarativa con `<esc-acordeon-item titulo="…" abierto>` y `exclusivo` en el contenedor. Auto-registro idempotente. Incluye `demo.html` (verificada en navegador: render fiel, toggles y modo exclusivo correctos, sin errores) y `README.md`. El paquete pasa de stub a `v0.1.0`.

### Fixed
- **Doble `◆` en títulos de acordeón**: el CSS ya añade el diamante con `.acordeon__titulo::before`, pero el ejemplo del manifiesto (`COMPONENTES.md`) y `documentacion.html` lo repetían en el texto. Removido el `◆` manual (convención: el título no lo lleva).

## [2.0.6] — 2026-07-11

### Added
- **Script de validación** `npm run validate` (`scripts/validate.mjs`, sin deps, cross-platform): falla si hay atributos `style=""` en el HTML del showcase o si el espejo `css/` no coincide con `packages/css/` (olvido de `npm run build`). Apto para CI / pre-push.
- **`apps/showcase` formalizado como workspace** (`@grimorio/showcase`, privado) — `apps/*` añadido a `workspaces`.

### Changed
- **`js/grimorio.js` movido a `packages/core/grimorio.js`** (Fase B): la fuente del runtime ahora vive en el paquete `@grimorio/core`, en paralelo exacto al CSS. El showcase enlaza la fuente directo (cero-build en dev) y `js/` a nivel raíz pasa a ser un espejo generado por `npm run build` (como `css/`). Los consumidores instalados lo siguen alcanzando vía `exports["./js"]`. `npm run validate` verifica que el espejo no quede desincronizado.
- **Responsive · grids fijos colapsan** (Fase B): `.grid--3`/`.grid--4` → 2 columnas en ≤740px y `.grid--2/3/4` → 1 columna en ≤560px; `.col-2`/`.col-3` resetean su span en móvil para no crear pistas implícitas vacías. Antes un grid de 4 columnas se mantenía en cualquier ancho (~90px/columna en teléfono).
- **`tokens.js` deriva de `tokens.json`** (Fase A): re-export vía import attributes en vez de duplicar los valores a mano — fuente única de verdad, sin riesgo de drift.
- **`PROYECTO.md` adelgazado** a tablero de estado + roadmap por fases; la estructura de carpetas y la convención de nombres se remiten a `CLAUDE.md` (se eliminó la duplicación).

### Removed
- Asset huérfano `apps/showcase/images/Logo Extended VFISFT.svg` (0 referencias).

[2.0.6]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.6

## [2.0.5]

### Fixed
- **Legibilidad, ronda 3**: el piso de tipografía subió de **10px a 12px**. VT323 y Share Tech Mono son fuentes de píxel y cuestan por debajo de 12px. Tokens del extremo bajo re-espaciados (`xs` 1→1.2, `sm` 1.1→1.3, `base` 1.2→1.4, `md` 1.3→1.5rem); `lg`+ y el cuerpo real (`body` = xl = 1.8rem) sin cambio, así la jerarquía no se altera. 32 `font-size:1rem` hardcodeados y `.separador` migrados al token del piso. Única excepción: número de la tarjeta de crédito (simulación de material).
- **Deriva de versión** unificada a 2.0.5 en `package.json`, tokens, consola JS, showcase, README y PROYECTO (estaban mezclados 2.0.0/2.0.3, y v2.0.4 ya estaba publicado en el commit anterior).

[2.0.5]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.5

## [2.0.4]

### Added
- **Componente `.insignia`** (badge/pill genérico) — antes solo existía `.tabla-badge`, acoplado visualmente a celdas de tabla. Una ronda de test (IA generando una página de documentación en modo vanilla estricto) tuvo que abusar de `.tabla-badge` fuera de tablas para chips de versión/estado. `.insignia` + variantes `--acento/ok/advertencia/error` cubre el caso con semántica propia.
- **Componente `.migas`** (breadcrumb) — inexistente; la IA lo reconstruía a mano con `.enlace` + separadores. Ahora es un `<nav>` con separador ◆ automático entre items (`.migas > * + *::before`) y `.migas__actual` para la página actual.
- **Variante `.alerta--info`** — nota neutral en color de acento; antes solo había `--ok/--advertencia/--error`.
- **Utilidades `.size-xs/sm/md/lg/xl`** (2/3/4/6/8rem, cuadrado + `flex-shrink:0`) — no había forma de dimensionar cajas pequeñas (swatches, avatares, chips); el `w-*` más chico era 12rem.
- **Offset sticky bajo cabecera**: token `--header-height` (5rem), `scroll-padding-top` global en `html` (las anclas `#seccion` ya no quedan tapadas por el header), utilidades `.top-header` / `.top-sm/md/lg/xl` y `.scroll-mt-*`.
- **Página de documentación** (`apps/showcase/html/documentacion.html`) generada como test vanilla del framework y ahora parte del showcase.

### Fixed
- **Padding por eje truncado en `xl`** — `pt/pb/pl/pr/px/py-*` no llegaban a `2xl/3xl/4xl` aunque `p-*`, `m-*` y `gap-*` sí, contradiciendo la escala documentada. `servicios.html` ya usaba `py-2xl` (no-op silencioso). Extendidas las seis familias de eje hasta `4xl`.

[2.0.4]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.4

## [2.0.3]

### Added
- **Componente `.codigo`** (bloque de código para snippets/instalación/comandos) — dos pruebas seguidas con un Agente IA resolvieron esta necesidad de forma distinta cada vez (una improvisando con `.ventana`, otra con utilidades sueltas), generando look inconsistente entre páginas. `.codigo` + `.codigo__barra` (opcional, label de lenguaje) + `.codigo__cuerpo` (mono, `overflow-x-auto`, scrollbar temática) unifica el patrón. Documentado en `COMPONENTES.md` §5 y demostrado en el showcase.
- **Token `--font-code`** (Cascadia Code PL, con fallback a monoespaciadas del sistema — sin `@import`, sin assets nuevos) — única excepción a la tríada de fuentes de marca (`--font-display`/`--font-body`/`--font-mono`), usado exclusivamente en `.codigo__cuerpo` para legibilidad real de código (Share Tech Mono es una fuente retro de UI, no pensada para leer código: ambigüedad `0`/`O`, `1`/`l`/`I`). `.codigo__barra` (chrome de UI) se mantiene en `--font-mono`.

### Fixed
- **El acordeón no tenía ejemplo de markup en el manifiesto** (`COMPONENTES.md` solo decía "lo maneja grimorio.js" en una línea) — una IA generando documentación tuvo que adivinar los nombres de clase internos y le salió mal (`.acordeon__cabecera` en vez del real `.acordeon__titulo`, y se saltó el wrapper `.acordeon__cuerpo`), resultando en un acordeón que no respondía a los clicks. Agregado el markup completo y exacto (`.acordeon__item` → `.acordeon__titulo` (trigger) + `.acordeon__contenido` > `.acordeon__cuerpo`) con nota explícita de que los tres niveles son obligatorios.
- **El modal no mostraba el patrón real de apertura/cierre** — el manifiesto decía "alternar la clase `modal-overlay--visible`" sin ejemplo de `onclick`. Agregado el ejemplo completo (abrir, cerrar por botón, cerrar al clickear fuera) tomado literalmente del showcase, y aclarado que `onclick` inline es el patrón intencional del framework, no algo a evitar.
- **`ESCCarrusel` estaba hardcodeado a 2 IDs específicos** (`carrusel-imagenes`, `carrusel-tarjetas` en `js/grimorio.js`) en vez de auto-descubrir cualquier `.carrusel` de la página — a diferencia de acordeón/formulario-pasos, que sí escanean genéricamente. Un carrusel con cualquier otro `id` (o sin `id`) simplemente no respondía a los botones. Refactorizado el constructor para recibir el elemento directamente (no un ID) y la inicialización a `document.querySelectorAll('.carrusel')`, igual patrón que el resto de componentes multi-instancia. Verificado con click programático: el índice activo y los puntos avanzan correctamente en un carrusel sin `id` especial.
- **El carrusel tampoco tenía ejemplo de markup en el manifiesto** — solo se mencionaba `ESCCarrusel` como nombre de clase JS en §6, sin entrada en el catálogo de componentes (§5), así que ninguna IA lo usaba nunca. Agregado el ejemplo completo (`.carrusel__pista` > `.carrusel__item` con `.carrusel__leyenda` opcional, nav con `data-dir="-1"/"1"`, `.carrusel__puntos` auto-poblado) con nota de que ahora es genérico (sin requerir `id`).
- **Auditoría completa de `COMPONENTES.md` contra `js/grimorio.js` y `grimorio.css`** (39 secciones de componentes revisadas una por una) tras el hallazgo del carrusel. Encontrados y arreglados dos bugs más del mismo tipo (hardcodeados a IDs fijos en vez de auto-descubrir, cada uno limitado a **una sola instancia por página**):
  - `iniciarPaginacion()`: hardcodeada a `pag-paginas`/`pag-ant`/`pag-sig`. Refactorizada a `document.querySelectorAll('.paginacion')` + `data-dir="-1"/"1"` (mismo patrón que el carrusel) + `data-total` opcional para el número de páginas.
  - `ESCConsola`: hardcodeada a un único id `esc-consola`. Refactorizado el constructor para recibir el elemento directamente; init ahora usa `document.querySelectorAll('.consola')`.
  - `iniciarTarjetaCredito()`: la más grave — **10 IDs fijos** (`tc-preview`, `tc-numero`, `tc-num-preview`, etc.), un único formulario posible por página. Refactorizada a `document.querySelectorAll('.tarjeta-credito-form')`; los 4 inputs ahora se conectan por `data-tc="numero|nombre|exp|cvv"` en vez de `id`, y los dos `.tarjeta-credito__meta-valor` ambiguos (titular/expira, compartían la misma clase) se distinguen con nuevos modificadores `--nombre`/`--exp`. Verificado con input simulado: el preview enmascarado, el flip por foco en CVV y el resto del comportamiento se mantienen idénticos.
  - Todos verificados funcionalmente en el navegador (clicks/inputs programáticos) tras el refactor, sin regresiones ni errores de consola.
  - Además, **9 componentes no tenían ningún ejemplo de markup** en el catálogo (§5) — 4 de ellos con la instrucción inútil "copiar del showcase" (que una IA sin acceso al showcase no puede seguir): tarjeta de crédito, correo con dominio, formulario multi-paso, archivo tematizado. Los otros 5 no tenían ninguna mención: paginación, consola, stat-hud, rango con valor en vivo (`.campo-rango`), más tres elementos decorativos menores (`.diamante`, `.cursor-ps1`, `.logo-divisor`). Agregado el markup real y verificado de cada uno (extraído del showcase, no inventado).
  - Gap conocido, dejado pendiente a propósito: el selector de tema en versión "tarjeta completa" (`.selector-tema__opcion` sin `--compacta`) no tiene ningún uso real en el showcase para verificar contra él — documentarlo sin una referencia probada arriesgaría repetir el mismo tipo de bug que esta auditoría corrige. Solo la variante compacta de la barra de nav (`nav-temas__btn`) está documentada, que sí está verificada.

[2.0.3]: https://github.com/ClaysterChief/GrimorioEngine/releases/tag/v2.0.3

## [2.0.2]

### Fixed
- **No había forma de anclar un elemento anidado a Dual Signal.** `.cosmos` y `.crimson` son clases completas (variables + fondo) que se pueden aplicar a cualquier contenedor, pero Dual Signal solo existía como los valores por defecto de `:root` — sin clase propia. Resultado: un elemento "sin clase" anidado dentro de un contenedor `.cosmos`/`.crimson` heredaba esa paleta en vez de quedarse en púrpura (encontrado por una IA generando una página de comparación de temas — ver `USO-CON-IA.md`). Agregada **`.dual`**, misma estructura que `.cosmos`/`.crimson`, mismos valores que `:root`. Regla nueva: al mostrar una paleta específica dentro de un contenedor con otra paleta activa, usar siempre una clase explícita (`.dual`/`.cosmos`/`.crimson`) — nunca dejar Dual Signal "sin clase" en ese caso. Demostrado en el showcase; `COMPONENTES.md`, `CLAUDE.md` y `tokens.json`/`tokens.js` (campo `explicitClass`) sincronizados.
- **Tarjetas de `servicios.html` (y el ejemplo de tarjetas en `COMPONENTES.md`) usaban `.tarjeta__header`, una clase que nunca existió en el CSS** (0 estilos) — el contenido quedaba pegado al borde de la tarjeta. Reestructurado al patrón canónico con `.tarjeta__cuerpo` (`padding: 1rem`), el mismo que ya usaba `index.html` correctamente. Botón "Solicitar" cambiado a `.btn-tarjeta` para el margen lateral correcto.
- **Texto invisible en botones `.btn-fantasma.btn--peligro` en hover** — el relleno sólido en hover (`::before`) y el color de texto usaban ambos `var(--red-strike)`, texto idéntico al fondo. Agregada regla específica `.btn-fantasma.btn--peligro:hover { color: var(--void-deep) }`, sin tocar el caso genérico `.btn--peligro` (que ya contrastaba bien contra el fondo oscuro `--deep` del hover base).

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
