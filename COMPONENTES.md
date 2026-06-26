# GrimorioEngine — Manifiesto para IA

> **Propósito de este archivo.** Es el contrato que una IA debe seguir para generar páginas/apps que se vean y sientan como un producto de **ESC Labs**. Pégalo (o enlázalo) en el prompt de sistema de la IA generadora. Si una necesidad de layout no se resuelve con una clase de aquí, la regla es **agregar la utilidad al framework primero**, nunca improvisar con `style=""`.
>
> Framework: CSS puro, estética PS1/CRT, sin dependencias JS externas. Todo el CSS vive en `packages/css/style.css`. Interacciones en `js/engine.js`. Tokens en `packages/core/tokens.json`.
>
> **¿Eres el humano que dirige a la IA?** Lee [`USO-CON-IA.md`](USO-CON-IA.md): explica cómo montar el system prompt con este manifiesto, cómo redactar el encargo y cómo verificar la salida.

---

## 0. Reglas duras (no negociables)

1. **Cero `style=""`.** Todo se resuelve con utilidades o clases BEM. Si falta un valor, se agrega la utilidad al CSS.
2. **Nombres en español, BEM-kebab-case**: `.bloque`, `.bloque-modificador`, `.bloque__elemento`, `.bloque__elemento--modificador`.
3. **Colores siempre vía variables CSS** (`var(--acento)`, etc.) — nunca hex hardcodeado en markup ni en componentes nuevos. Excepción única: los colores internos de la tarjeta de crédito.
4. **`border-radius: 0`** en elementos estructurales — esquinas rectas (PS1). No redondear.
5. **`--red-strike` / rojo es acento de ACCIÓN únicamente**: CTAs, cursores, barras HP, indicadores activos. **Nunca** como color de texto corrido ni fondo.
6. **Orbitron (display) solo a ≥ 18px (1.8rem / `fs-xl`).** Por debajo pierde carácter → usar Share Tech Mono (`font-mono`).
7. **Sin emojis** en UI ni copy. El motivo decorativo es el diamante **◆**.
8. **Scanlines** en heroes y superficies principales (ya horneadas en `.superficie` y afines — no quitarlas al sobrescribir fondos).
9. La marca es **ESC Labs** — nunca expandida, sin puntos entre letras.
10. Toda página necesita `<div id="tema-flash" class="tema-flash"></div>` para el switcher de tema.

Taglines aprobados: *Systems that evolve.* · *Build. Evolve. Compute.* · *From science to system.* · *Tecnología con alma propia.*

---

## 1. Setup mínimo de una página

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="ruta/a/packages/css/style.css" />
  <!-- Las fuentes ya se importan dentro de style.css (@import Google Fonts) -->
  <title>Título · ESC Labs</title>
</head>
<body>
  <!-- contenido -->
  <div id="tema-flash" class="tema-flash"></div>
  <script defer src="ruta/a/js/engine.js"></script>
</body>
</html>
```

`html { font-size: 62.5% }` → **1rem = 10px**. Todo el dimensionado usa rem.

---

## 2. Paletas (theme system)

Se aplican como clase en `<body>` o cualquier contenedor. Todos los componentes se adaptan solos (usan `var(--*)`).

| Paleta | Clase | Acento |
|---|---|---|
| Dual Signal (default) | *(ninguna)* | `#b44fff` púrpura |
| Cosmos Blue | `.cosmos` | `#1a6fd8` azul |
| Crimson Signal | `.crimson` | `#e53935` rojo |

Variables theme-aware: `--void-deep` · `--void-primary` · `--void-surface` · `--deep` · `--border` · `--acento` · `--acento-light` · `--red-strike` · `--text-primary` · `--text-muted`.
Fuentes (constantes): `--font-display` (Orbitron) · `--font-body` (VT323) · `--font-mono` (Share Tech Mono).

Cambio de tema: botones con `data-tema="default|cosmos|crimson"`; `engine.js` persiste en `localStorage['grimorio-tema']` y dispara el flash CRT.

---

## 3. Escalas de tokens (memorizar — son monótonas)

**Spacing** (`--space-*`, usado por `m-* p-* gap-*` y variantes de eje/lado):

| token | 0 | xs | sm | md | lg | xl | 2xl | 3xl | 4xl |
|---|---|---|---|---|---|---|---|---|---|
| valor | 0 | .75rem | 1rem | 1.5rem | 2rem | 3rem | 4rem | 5rem | 6rem |

**Font-size** (`fs-*`): `xs` .9 · `sm` 1 · `base` 1.1 · `md` 1.2 · `lg` 1.5 · `xl` 1.8 · `2xl` 2.2 · `3xl` 3 · `4xl` 4.5rem. (`fs-label`=md, `fs-body`=xl son alias.) Mínimo legible: 9px (`fs-xs`); ningún texto baja de 8px.

**Z-index** (`z-*`): `base` 1 · `nav` 100 · `dropdown` 1000 · `sticky` 1100 · `modal` 8000 · `toast` 9000 · `flash` 9999.

**Transiciones**: `--transition-fast` .15 · `-base` .22 · `-moderate` .3 · `-slow` .45 · `-card` .72s.
**Bordes**: `--border-thin` 1px · `--border-accent` 2px · `--border-thick` 3px.

---

## 4. Catálogo de utilidades

**Espaciado** — `m-{t,b,l,r,x,y}-{token}`, `p-{t,b,l,r,x,y}-{token}`, `gap-{token}`, `gap-{x,y}-{token}`, `m-auto`/`mx-auto`/`ml-auto`/`mr-auto`/`mt-auto`.
**Display** — `d-flex` · `flex-col` · `flex-wrap` · `flex-1` · `d-block` · `d-inline` · `d-inline-block` · `d-inline-flex` · `d-grid` · `d-none`. Responsive: `d-sm-none/flex/block` (≤560px), `d-md-none/flex/block` (≤768px), `d-sm-only`.
**Flexbox** — `ai-center/start/end/stretch/baseline` · `jc-center/start/end/between/around/evenly`.
**Posición** — `pos-relative/absolute/fixed/sticky/static` · `inset-0` · `top-0`/`right-0`/`bottom-0`/`left-0`.
**Z-index** — `z-0/base/nav/dropdown/sticky/modal/toast`.
**Overflow** — `overflow-hidden/auto/scroll/visible` · `overflow-x-auto`/`overflow-y-auto` · `overflow-x-hidden`/`overflow-y-hidden`.
**Opacity** — `opacity-0/25/50/60/75/100`.
**Ancho** — `w-full/half/fit/auto/screen` · fijo en rem `w-xs/sm/md/lg/xl` (12/20/24/28/32rem) · `min-w-0/xs/sm/md/lg/xl/full` · `max-w-2xs/xs/sm/md/lg/xl/full` (32/40/48/56/68/80rem) · alias `mw-xs/sm/md`.
**Alto** — `h-full/auto/screen` · `min-h-0/sm/md/lg/full/screen/vista` (vista = 100vh − 14rem, para layouts centrados con header+footer).
**Aspect-ratio** — `aspect-square` · `aspect-video` (16:9) · `aspect-4-3`.
**Texto** — `text-centro/derecha/izquierda` · `text-uppercase/lowercase/capitalize` · `leading-tight/snug/normal/relaxed` · `truncate` · `break-words` · `text-nowrap` · `no-subrayado`.
**Tipografía** — color: `text-acento/acento-light/accion/primario/apagado/ok/advertencia`. Familia: `font-display/body/mono` (solo familia) · `text-mono` (mono + uppercase + tracking). Tamaño: `fs-*`. Tracking: `tracking-md/wide/wider`.
**Fondo** — `bg-void-deep/void/surface/deep/primary/acento/muted/transparent`.
**Misc** — `cursor-pointer/default` · `object-cover/contain`.

### Clases semánticas reutilizables (preferirlas a recomponer a mano)
- `.etiqueta` — eyebrow: mono pequeño, mayúsculas, tracking, `--text-muted`. Modificador `.etiqueta--acento`.
- `.regla` — `<hr>` divisor sutil.
- `.enlace` — link de acento sin subrayado (hover → acento-light).
- `.icono--sm/md/lg/xl` — tamaño de ícono CSS (1.2/2/3/4.5rem).
- `.btn--peligro` — recolorea cualquier botón a `--red-strike`.

### Animación y transición (exponen los keyframes/tokens del framework)
- **Animación** (aplica a cualquier elemento): `.animate-glow` · `.animate-pulse` · `.animate-blink` · `.animate-glitch` · `.animate-scan` · `.animate-spin` · `.animate-ping` · `.animate-flicker` · `.animate-entrada`. Control: `.animate--once` (una vez) · `.animate--pausa`. Todas respetan `prefers-reduced-motion`.
- **Transición**: `.transition` · `.transition-fast/base/moderate/slow` · `.transition-none` (aplican `transition: all <token>`).

---

## 5. Catálogo de componentes (clase → uso → ejemplo mínimo)

### Botones
`.btn` base + variante. Variantes: `btn-primario` (glow), `btn-accion` (rojo/CTA), `btn-secundario`, `btn-fantasma` (relleno hover), `btn-scan`, `btn-glitch`, `btn-pulso`, `btn-alerta`. Tamaños: `btn--sm/--lg/--xl/--bloque`. Estados: `btn--cargando`, `btn--peligro`.
```html
<button class="btn btn-primario">◆ Iniciar sistema</button>
<button class="btn btn-accion btn--lg">◆ Solicitar</button>
<button class="btn btn-fantasma btn--peligro">Eliminar</button>
```

### Superficie / panel
```html
<div class="superficie p-lg">
  <h3>Panel ESC-001</h3>
  <p>Contenido estructurado.</p>
</div>
```

### Tarjetas
```html
<div class="grupo-tarjeta">
  <div class="tarjeta">
    <img src="..." alt="..." class="tarjeta__imagen" />
    <div class="tarjeta__header">
      <span class="etiqueta">01 · desarrollo</span>
      <h3 class="tarjeta__titulo">Creación Web</h3>
    </div>
    <p>Descripción del servicio.</p>
    <div class="tarjeta__footer d-flex ai-center gap-sm">
      <span class="font-mono fs-xs text-apagado">Capacidad</span>
      <div class="barra-hp flex-1"><!-- bloques --></div>
    </div>
    <a href="#" class="btn btn-primario mt-md d-inline-block">◆ Más info</a>
  </div>
</div>
```
Variante: `.tarjeta--accion` (rojo).

### Formularios
```html
<div class="grupo-formulario">
  <label for="x">Usuario</label>
  <input id="x" type="text" class="formulario-estandar" placeholder="..." />
</div>
<textarea class="formulario-textarea" rows="5"></textarea>

<label class="formulario-checkbox">
  <input type="checkbox" class="formulario-checkbox__input" />
  <span class="formulario-checkbox__marca"></span> Módulo activo
</label>

<label class="formulario-radio">
  <input type="radio" name="g" class="formulario-radio__input" checked />
  <span class="formulario-radio__marca"></span> Opción
</label>

<label class="formulario-toggle">
  <input type="checkbox" class="formulario-toggle__input" />
  <span class="formulario-toggle__slider"></span>
  <span class="formulario-toggle__etiqueta">Recordar sesión</span>
</label>

<input type="range" class="formulario-rango" min="0" max="100" value="45" /> <!-- engine.js fija --rango-pct -->
```
Especiales (requieren markup específico — copiar del showcase): correo con dominio (`.formulario-correo`), multi-paso (`.formulario-pasos` + `data-paso-sig`/`data-paso-ant`), tarjeta de crédito flip, file input (`.formulario-archivo-contenedor` + `data-nombre-id`).

### Navegación (cabecera estándar)
```html
<header class="cabecera">
  <nav class="navegar">
    <a href="../index.html"><img src="..." alt="ESC Labs" class="logo-cabecera" /></a>
    <ul class="menu-principal">
      <li class="menu-principal__item"><a class="menu-principal__link" href="...">Inicio</a></li>
      <li class="menu-principal__item--active"><a class="menu-principal__link" href="">Actual</a></li>
    </ul>
    <div class="nav-temas">
      <button class="nav-temas__btn nav-temas__btn--activa" data-tema="default" aria-label="Dual Signal">
        <span class="nav-temas__diamante nav-temas__diamante--dual"></span>
      </button>
      <button class="nav-temas__btn" data-tema="cosmos" aria-label="Cosmos Blue">
        <span class="nav-temas__diamante nav-temas__diamante--cosmos"></span>
      </button>
      <button class="nav-temas__btn" data-tema="crimson" aria-label="Crimson Signal">
        <span class="nav-temas__diamante nav-temas__diamante--crimson"></span>
      </button>
    </div>
  </nav>
</header>
```

### Barra HP / progreso
```html
<div class="barra-hp">
  <span class="barra-hp__bloque barra-hp__bloque--activo"></span>
  <span class="barra-hp__bloque barra-hp__bloque--activo"></span>
  <span class="barra-hp__bloque"></span>
</div>
```
Estado crítico: `barra-hp__bloque--critico`.

### Grid
`.grid` + `grid--2/3/4/auto`. Span: `.col-2`. Gap: `grid--gap-*`, alineación `grid--ai-start`.
```html
<div class="grid grid--3"><div>…</div><div>…</div><div>…</div></div>
```

### Alertas
```html
<div class="alerta alerta--ok">◆ Operación completada</div>
<div class="alerta alerta--advertencia">…</div>
<div class="alerta alerta--error">…</div>
```

### Modal
```html
<div class="modal-overlay" id="m1">
  <div class="modal w-full max-w-xs">
    <div class="modal__barra">
      <h6 class="modal__titulo-barra">TÍTULO</h6>
      <button class="modal__cerrar">&#10005;</button>
    </div>
    <div class="modal__contenido"><p>…</p></div>
    <div class="modal__footer">
      <button class="btn btn-secundario">Cancelar</button>
      <button class="btn btn-fantasma btn--peligro">Confirmar</button>
    </div>
  </div>
</div>
```
Abrir/cerrar: alternar la clase `modal-overlay--visible`.

### Tabla
```html
<div class="tabla-contenedor">
  <table class="tabla tabla--rayada">
    <thead><tr><th>ID</th><th>Estado</th></tr></thead>
    <tbody><tr><td>001</td><td><span class="tabla-badge tabla-badge--ok">OK</span></td></tr></tbody>
  </table>
</div>
```
Badges: `tabla-badge--ok/--error/--pendiente/--inactivo`.

### Ventana PS1
```html
<div class="ventana ventana--entrada">
  <div class="ventana__barra">
    <div class="ventana__dots">
      <span class="ventana__dot ventana__dot--rojo"></span>
      <span class="ventana__dot ventana__dot--amarillo"></span>
      <span class="ventana__dot ventana__dot--verde"></span>
    </div>
    <span class="ventana__titulo">acceso · esc-labs</span>
  </div>
  <div class="ventana__cuerpo p-lg">…</div>
</div>
```

### Íconos CSS puros
`.icono` + tipo (`icono-diamante/flecha-der/flecha-izq/check/cerrar/alerta`) + tamaño (`icono--sm/md/lg/xl`) + color (`text-*`).
```html
<span class="icono icono-diamante text-acento icono--lg"></span>
```

### Tooltip
```html
<span class="tooltip text-acento text-mono" data-tooltip="Descripción">T_OP</span>
```
Direcciones: `tooltip--abajo/--derecha/--izquierda`.

### Acordeón
`.acordeon` (multi-abierto) o `.acordeon--exclusivo` (uno a la vez). Lo maneja `engine.js`.

### Spinners / loaders
`.spinner` · `.spinner-diamante` · `.spinner-pulso` · `.spinner-scan-mini` · `.spinner-barras` (con `--sm`/`--xs`). Loaders grandes: `.cargando-bloques` · `.cargando-diamante` · `.cargando-scan`.

### Skeleton (placeholder de carga)
```html
<span class="skeleton skeleton--avatar"></span>
<span class="skeleton skeleton--titulo"></span>
<span class="skeleton skeleton--linea"></span>   <!-- usar w-*/max-w-* para ancho -->
<span class="skeleton skeleton--bloque"></span>
```

### Validación de formulario
```html
<input class="formulario-estandar formulario-estandar--error" />
<span class="form-ayuda form-ayuda--error">◆ Mensaje de error</span>

<input class="formulario-estandar formulario-estandar--ok" />
<span class="form-ayuda form-ayuda--ok">◆ Correcto</span>
```
Modificadores `--error`/`--ok` también en `.formulario-textarea`. El rojo de `--error` cuenta como indicador de acción/alerta (permitido).

### Separador de sección
```html
<p class="separador">BOTONES · BASE</p>
```

### Tagline / lista de items
```html
<div class="tagline-item">
  <span class="tagline-item__arrow">>></span>
  <div class="tagline-item__contenido">
    <span class="tagline-item__texto">correo@esc.dev</span>
    <span class="tagline-item__contexto">respuesta en 48h</span>
  </div>
</div>
```

### Imágenes con efecto hover
`.imagen-efecto` envuelve `<img>`; efecto: `imagen-zoom/scan/glitch/vhs/duotono/crt/hud/estatica`. Base: `imagen-redonda/circular/total`.

### Texto máquina (typewriter)
```html
<p class="texto-maquina">Sistema listo.</p>  <!-- engine.js mide el ancho -->
```
Modificadores: `texto-maquina--lento`, `texto-maquina--sin-cursor`.

### VHS overlay
`.vhs-overlay` dentro de una superficie/tarjeta posicionada para scanlines + aberración cromática.

---

## 6. Componentes JS (`js/engine.js`, vanilla, init en `DOMContentLoaded`)

Cada init hace early-return si su nodo no existe → seguro de cargar en cualquier página.

- `ESCCarrusel` (carrusel imágenes/tarjetas) · `ESCConsola` (terminal interactiva)
- `iniciarSelectorTema()` (requiere `#tema-flash`) · `iniciarFormPasos()` · `iniciarTarjetaCredito()` · `iniciarCorreoInputs()` · `iniciarArchivos()` (`data-nombre-id`) · `iniciarPaginacion()` · `iniciarTextoMaquina()` · `iniciarAcordeon()` · `iniciarRangos()`
- `ESCToast.mostrar(mensaje, tipo, duracion)` — `tipo` = `info | ok | warning | error`.

---

## 7. Checklist antes de entregar una página generada

- [ ] **0 `style=""`** en el HTML (verificable con grep).
- [ ] Fondo de paleta void (nunca blanco/gris claro).
- [ ] Scanlines en hero y superficies principales.
- [ ] Rojo `--red-strike` solo en acciones, nunca texto/fondo.
- [ ] `border-radius: 0` en estructura.
- [ ] Display en Orbitron a ≥18px; labels en Share Tech Mono.
- [ ] `#tema-flash` presente + nav-temas funcional.
- [ ] Copy directo, sin relleno corporativo, sin emojis. Diamante ◆ como motivo.

---

*Fuente de verdad viva: `apps/showcase/index.html` (demo de todos los componentes) + `packages/css/style.css`. Tokens: `packages/core/tokens.json`. Identidad completa: `ESC-LABS-PS1-FRAMEWORK.md`.*
