# GrimorioEngine — Manifiesto para IA

> **Propósito de este archivo.** Es el contrato que una IA debe seguir para generar páginas/apps que se vean y sientan como un producto de **ESC Labs**. Pégalo (o enlázalo) en el prompt de sistema de la IA generadora. Si una necesidad de layout no se resuelve con una clase de aquí, la regla es **agregar la utilidad al framework primero**, nunca improvisar con `style=""`.
>
> Framework: CSS puro, estética PS1/CRT, sin dependencias JS externas. Todo el CSS vive en `packages/css/grimorio.css` (fuente) / `css/grimorio.css` (espejo de instalación, ver §1). Interacciones en `js/grimorio.js`. Tokens en `packages/core/tokens.json`.
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
  <link rel="stylesheet" href="ruta/a/css/grimorio.css" />
  <!-- Las fuentes ya se importan dentro de grimorio.css (@import Google Fonts) -->
  <title>Título · ESC Labs</title>
</head>
<body>
  <!-- contenido -->
  <div id="tema-flash" class="tema-flash"></div>
  <script defer src="ruta/a/js/grimorio.js"></script>
</body>
</html>
```

`html { font-size: 62.5% }` → **1rem = 10px**. Todo el dimensionado usa rem.

---

## 2. Paletas (theme system)

Se aplican como clase en `<body>` o cualquier contenedor. Todos los componentes se adaptan solos (usan `var(--*)`).

| Paleta | Clase | Acento |
|---|---|---|
| Dual Signal (default) | *(ninguna)*, o explícita: `.dual` | `#b44fff` púrpura |
| Cosmos Blue | `.cosmos` | `#1a6fd8` azul |
| Crimson Signal | `.crimson` | `#e53935` rojo |

**Anidamiento de paletas:** si vas a mostrar un elemento de una paleta específica DENTRO de un contenedor que ya tiene otra paleta activa (ej. una tarjeta comparativa "así se ve cada tema"), usá SIEMPRE una clase de paleta explícita en ese elemento — `.cosmos`, `.crimson` o `.dual`. Nunca dejes Dual Signal "sin clase" en ese caso: sin `.dual`, el elemento hereda las variables del ancestro (`.cosmos`/`.crimson`) en vez de quedarse en púrpura. La ausencia de clase solo significa Dual Signal cuando NINGÚN ancestro tiene otra paleta aplicada.

Variables theme-aware: `--void-deep` · `--void-primary` · `--void-surface` · `--deep` · `--border` · `--acento` · `--acento-light` · `--red-strike` · `--text-primary` · `--text-muted`.
Fuentes (constantes): `--font-display` (Orbitron) · `--font-body` (VT323) · `--font-mono` (Share Tech Mono). Estas tres son la identidad de marca — nunca usar otras fuentes para UI. Excepción única: `--font-code` (Cascadia Code PL, sin @import, con fallback a monoespaciadas del sistema), exclusivo de `.codigo__cuerpo` para mostrar código real de forma legible.

Cambio de tema: botones con `data-tema="default|cosmos|crimson"`; `grimorio.js` persiste en `localStorage['grimorio-tema']` y dispara el flash CRT.

---

## 3. Escalas de tokens (memorizar — son monótonas)

**Spacing** (`--space-*`, usado por `m-* p-* gap-*` y variantes de eje/lado):

| token | 0 | xs | sm | md | lg | xl | 2xl | 3xl | 4xl |
|---|---|---|---|---|---|---|---|---|---|
| valor | 0 | .75rem | 1rem | 1.5rem | 2rem | 3rem | 4rem | 5rem | 6rem |

**Font-size** (`fs-*`): `xs` 1.2 · `sm` 1.3 · `base` 1.4 · `md` 1.5 · `lg` 1.6 · `xl` 1.8 · `2xl` 2.2 · `3xl` 3 · `4xl` 4.5rem. (`fs-label`=md, `fs-body`=xl son alias.) **Piso de legibilidad: 12px (`fs-xs` = 1.2rem)**; ningún texto del framework baja de 12px (VT323/Share Tech Mono son fuentes de píxel y cuestan por debajo de 12px). Excepción: número interno de la tarjeta de crédito (simulación de material).

**Z-index** (`z-*`): `base` 1 · `nav` 100 · `dropdown` 1000 · `sticky` 1100 · `modal` 8000 · `toast` 9000 · `flash` 9999.

**Transiciones**: `--transition-fast` .15 · `-base` .22 · `-moderate` .3 · `-slow` .45 · `-card` .72s.
**Bordes**: `--border-thin` 1px · `--border-accent` 2px · `--border-thick` 3px.
**Layout**: `--header-height` 5rem (alto de la cabecera sticky; alimenta `scroll-padding-top` global y `.top-header`).

---

## 4. Catálogo de utilidades

**Espaciado** — `m-{t,b,l,r,x,y}-{token}`, `p-{t,b,l,r,x,y}-{token}`, `gap-{token}`, `gap-{x,y}-{token}`, `m-auto`/`mx-auto`/`ml-auto`/`mr-auto`/`mt-auto`.
**Display** — `d-flex` · `flex-col` · `flex-wrap` · `flex-1` · `d-block` · `d-inline` · `d-inline-block` · `d-inline-flex` · `d-grid` · `d-none`. Responsive: `d-sm-none/flex/block` (≤560px), `d-md-none/flex/block` (≤768px), `d-sm-only`.
**Flexbox** — `ai-center/start/end/stretch/baseline` · `jc-center/start/end/between/around/evenly`.
**Posición** — `pos-relative/absolute/fixed/sticky/static` · `inset-0` · `top-0`/`right-0`/`bottom-0`/`left-0`. Offset superior por token para sticky bajo la cabecera: `top-header` (= `--header-height`) · `top-sm/md/lg/xl`. Anclas: `scroll-mt-header`/`scroll-mt-sm/md/lg/xl` (el default global ya es `--header-height`, así que las anclas `#seccion` no quedan tapadas por el header).
**Z-index** — `z-0/base/nav/dropdown/sticky/modal/toast`.
**Overflow** — `overflow-hidden/auto/scroll/visible` · `overflow-x-auto`/`overflow-y-auto` · `overflow-x-hidden`/`overflow-y-hidden`.
**Opacity** — `opacity-0/25/50/60/75/100`.
**Ancho** — `w-full/half/fit/auto/screen` · fijo en rem `w-xs/sm/md/lg/xl` (12/20/24/28/32rem) · `min-w-0/xs/sm/md/lg/xl/full` · `max-w-2xs/xs/sm/md/lg/xl/full` (32/40/48/56/68/80rem) · alias `mw-xs/sm/md`.
**Alto** — `h-full/auto/screen` · `min-h-0/sm/md/lg/full/screen/vista` (vista = 100vh − 14rem, para layouts centrados con header+footer).
**Tamaño (cuadrado)** — `size-xs/sm/md/lg/xl` (2/3/4/6/8rem, width = height + `flex-shrink:0`). Para swatches de color, avatares, chips cuadrados, dots — el hueco entre los íconos y `w-xs` (12rem).
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
- `.diamante` — rombo decorativo (motivo ◆), `<div class="diamante"></div>`.
- `.cursor-ps1` — cursor parpadeante triangular (`--red-strike`), `<span class="cursor-ps1"></span>`.
- `.logo-divisor` — línea con diamante centrado: `<div class="logo-divisor"><span class="logo-divisor__linea"></span><span class="logo-divisor__diamante"></span><span class="logo-divisor__linea"></span></div>`.

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
    <div class="tarjeta__cuerpo">
      <span class="etiqueta">01 · desarrollo</span>
      <h3 class="tarjeta__titulo mt-xs">Creación Web</h3>
      <p class="tarjeta__texto">Descripción del servicio.</p>
    </div>
    <div class="tarjeta__footer d-flex ai-center gap-sm">
      <span class="font-mono fs-xs text-apagado">Capacidad</span>
      <div class="barra-hp flex-1"><!-- bloques --></div>
    </div>
    <a href="#" class="btn btn-primario btn-tarjeta">◆ Más info</a>
  </div>
</div>
```
**Crítico:** `.tarjeta` en sí NO tiene padding — el texto/título deben ir **siempre** envueltos en `.tarjeta__cuerpo` (que sí trae `padding: 1rem`), nunca sueltos como hijos directos de `.tarjeta`. Sin `.tarjeta__cuerpo` el contenido queda pegado al borde. El botón inferior usa `.btn-tarjeta` (no `mt-md d-inline-block`) para heredar el margen lateral de 1rem correcto. Variante: `.tarjeta--accion` (rojo).

### Formularios
`.grupo-formulario` es el wrapper del `<form>` completo (panel con borde superior de acento) — va **una sola vez** por formulario, nunca por campo. Cada campo individual va envuelto en `.campo-formulario` (anima el label al enfocar); el primero de la lista lleva `.campo-formulario mt-0` para no arrastrar el margen superior por defecto.
```html
<form class="grupo-formulario">
  <div class="campo-formulario mt-0">
    <label for="x">Usuario</label>
    <input id="x" type="text" class="formulario-estandar" placeholder="..." />
  </div>
  <div class="campo-formulario">
    <label for="y">Correo</label>
    <input id="y" type="email" class="formulario-estandar" placeholder="correo@esclabs.io" />
  </div>
</form>
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

<input type="range" class="formulario-rango" min="0" max="100" value="45" /> <!-- grimorio.js fija --rango-pct -->
```

**Rango con valor en vivo** (muestra el número actual al lado del slider):
```html
<div class="campo-rango">
  <div class="campo-rango__cabecera">
    <span class="campo-rango__etiqueta">Temperatura del reactor</span>
    <div class="campo-rango__valor-grupo">
      <span class="campo-rango__valor">450</span>
      <span class="campo-rango__unidad">°C</span>
    </div>
  </div>
  <input type="range" class="formulario-rango" min="0" max="1000" value="450" aria-label="Temperatura del reactor" />
</div>
```
`grimorio.js` (`iniciarRangos()`) escanea `.campo-rango`, sincroniza `.campo-rango__valor` con el valor del input en cada `input` event, y fija `--rango-pct` en el input para el relleno visual del track. Sin el wrapper `.campo-rango`, el slider funciona igual mas no muestra el valor en vivo.

**Archivo tematizado:**
```html
<div class="formulario-archivo-contenedor">
  <label class="formulario-archivo-btn" for="mi-archivo">
    <span>◆</span> Elegir archivo
  </label>
  <input type="file" id="mi-archivo" class="formulario-archivo-input" data-nombre-id="mi-archivo-nombre" />
  <span class="formulario-archivo-nombre" id="mi-archivo-nombre">Ningún archivo seleccionado</span>
</div>
```
`data-nombre-id` en el input debe coincidir con el `id` del `<span>` que muestra el nombre — `iniciarArchivos()` los conecta por ese id.

**Correo con dominio (dropdown):**
```html
<div class="formulario-correo">
  <input type="text" class="formulario-correo__usuario" placeholder="usuario" autocomplete="off" />
  <span class="formulario-correo__arroba">@</span>
  <div class="formulario-correo__dominio-wrap">
    <button type="button" class="formulario-correo__dominio-btn" aria-expanded="false" aria-haspopup="listbox">
      <span class="formulario-correo__dominio-texto">gmail.com</span>
      <span class="formulario-correo__flecha">&#9660;</span>
    </button>
    <div class="formulario-correo__dropdown" role="listbox" aria-label="Dominios de correo">
      <div role="option" tabindex="0" class="formulario-correo__opcion" data-dominio="gmail.com">
        <span class="formulario-correo__opcion-icono">&#9654;</span> gmail.com
      </div>
      <div role="option" tabindex="0" class="formulario-correo__opcion" data-dominio="hotmail.com">
        <span class="formulario-correo__opcion-icono">&#9654;</span> hotmail.com
      </div>
    </div>
  </div>
</div>
```
`.formulario-correo` es auto-descubierto (cualquier cantidad en la página). `data-dominio` en cada `.formulario-correo__opcion` es lo que `iniciarCorreoInputs()` copia a `.formulario-correo__dominio-texto` al hacer click.

**Formulario multi-paso:**
```html
<div class="formulario-pasos mw-sm">
  <div class="formulario-pasos__barra">
    <span class="formulario-pasos__paso-ind formulario-pasos__paso-ind--activo">01 · Datos</span>
    <span class="formulario-pasos__conector"></span>
    <span class="formulario-pasos__paso-ind">02 · Confirmar</span>
  </div>
  <div class="formulario-pasos__pista">
    <div class="formulario-pasos__panel">
      <input class="formulario-estandar" type="text" placeholder="Usuario" />
      <div class="d-flex jc-end mt-md">
        <button class="btn btn-primario" data-paso-sig>Siguiente &#8594;</button>
      </div>
    </div>
    <div class="formulario-pasos__panel">
      <input class="formulario-estandar" type="email" placeholder="Correo" />
      <div class="d-flex jc-between mt-md">
        <button class="btn btn-secundario" data-paso-ant>&#8592; Volver</button>
        <button class="btn btn-accion">Confirmar ◆</button>
      </div>
    </div>
  </div>
</div>
```
`.formulario-pasos` es auto-descubierto. Un `.formulario-pasos__paso-ind` por panel (indicador de la barra superior) y un `.formulario-pasos__conector` entre cada par de indicadores. `data-paso-sig`/`data-paso-ant` (atributos booleanos, sin valor) en los botones de avanzar/retroceder dentro de cada `.formulario-pasos__panel`.

**Tarjeta de crédito (flip 3D + preview en vivo):**
```html
<form class="tarjeta-credito-form">
  <div class="tarjeta-credito-escena">
    <div class="tarjeta-credito">
      <div class="tarjeta-credito__cara">
        <div class="tarjeta-credito__frente-contenido">
          <div class="tarjeta-credito__header">
            <div class="tarjeta-credito__marca">ESC LABS<small>SIGNAL CARD</small></div>
            <div class="tarjeta-credito__chip"></div>
          </div>
          <div class="tarjeta-credito__numero">◆◆◆◆ &nbsp; ◆◆◆◆ &nbsp; ◆◆◆◆ &nbsp; ◆◆◆◆</div>
          <div class="tarjeta-credito__footer">
            <div class="tarjeta-credito__meta-grupo">
              <span class="tarjeta-credito__meta-label">Titular</span>
              <span class="tarjeta-credito__meta-valor tarjeta-credito__meta-valor--nombre">NOMBRE APELLIDO</span>
            </div>
            <div class="tarjeta-credito__meta-grupo text-derecha">
              <span class="tarjeta-credito__meta-label">Expira</span>
              <span class="tarjeta-credito__meta-valor tarjeta-credito__meta-valor--exp">MM/AA</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tarjeta-credito__cara tarjeta-credito__reverso-cara">
        <div class="tarjeta-credito__reverso-contenido">
          <div class="tarjeta-credito__banda"></div>
          <div class="tarjeta-credito__firma-row">
            <div class="tarjeta-credito__firma">
              <span class="tarjeta-credito__firma-texto">NOMBRE APELLIDO</span>
            </div>
            <div class="tarjeta-credito__cvv-bloque">
              <div class="tarjeta-credito__cvv-valor">◆◆◆</div>
              <div class="tarjeta-credito__cvv-etiqueta">CVV</div>
            </div>
          </div>
          <div class="tarjeta-credito__logo-reverso">ESC LABS</div>
        </div>
      </div>
    </div>
  </div>
  <div class="campo-formulario mt-0">
    <label>Número:</label>
    <input class="formulario-estandar" type="text" data-tc="numero" maxlength="19" />
  </div>
  <div class="campo-formulario">
    <label>Titular:</label>
    <input class="formulario-estandar" type="text" data-tc="nombre" />
  </div>
  <div class="d-flex gap-sm">
    <div class="campo-formulario flex-1">
      <label>Expiración:</label>
      <input class="formulario-estandar" type="text" data-tc="exp" maxlength="5" />
    </div>
    <div class="campo-formulario flex-1">
      <label>CVV:</label>
      <input class="formulario-estandar" type="text" data-tc="cvv" maxlength="4" />
    </div>
  </div>
</form>
```
El wrapper `<form class="tarjeta-credito-form">` es obligatorio y auto-descubierto. Los 4 inputs se conectan por `data-tc="numero|nombre|exp|cvv"` (no por `id`). En el preview: `.tarjeta-credito__numero`, `.tarjeta-credito__firma-texto` y `.tarjeta-credito__cvv-valor` son únicos dentro de la tarjeta; los dos `.tarjeta-credito__meta-valor` (titular/expira) se distinguen con el modificador `--nombre`/`--exp` — **ambos son obligatorios** para que el preview en vivo funcione. El flip a la cara trasera es automático al enfocar el campo CVV.

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

### Stat HUD (panel de métricas)
```html
<div class="stat-hud">
  <div class="stat-hud__item">
    <span class="stat-hud__label">Componentes</span>
    <span class="stat-hud__valor">18<span class="stat-hud__unidad"> mods</span></span>
    <div class="stat-hud__barra barra-hp">
      <span class="barra-hp__bloque barra-hp__bloque--activo"></span>
      <span class="barra-hp__bloque"></span>
    </div>
  </div>
</div>
```
`.stat-hud__unidad` es opcional (sufijo pequeño junto al valor). `.stat-hud__barra` reutiliza `.barra-hp` como mini-indicador visual — un `.stat-hud__item` por métrica, sin JS asociado.

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
<div class="alerta alerta--info">◆ Nota informativa (neutral, usa --acento)</div>
```
Variantes: `--ok` (verde) · `--advertencia` (amarillo) · `--error` (rojo) · `--info` (acento, para notas neutrales). Estructura interna opcional: `.alerta__prefijo` + `.alerta__cuerpo` (`.alerta__titulo` / `.alerta__texto`).

### Insignia (badge / pill genérico)
Chip en línea para versión, estado o etiquetas — **fuera de tablas** (dentro de tablas seguir usando `.tabla-badge`).
```html
<span class="insignia">CSS</span>
<span class="insignia insignia--acento">v2.0.6</span>
<span class="insignia insignia--ok">estable</span>
<span class="insignia insignia--advertencia">beta</span>
<span class="insignia insignia--error">deprecado</span>
```
Base neutral (borde `--border`, texto `--text-muted`, fondo `--deep`); los modificadores recolorean texto + borde.

### Migas de pan (breadcrumb)
El separador ◆ (motivo de marca) se inserta solo entre items — no agregar separadores a mano.
```html
<nav class="migas" aria-label="Ruta de navegación">
  <a href="/">Inicio</a>
  <a href="/docs">Docs</a>
  <span class="migas__actual" aria-current="page">Página actual</span>
</nav>
```
Los `<a>` son enlaces apagados con hover a `--acento`; `.migas__actual` marca la página actual (color acento).

### Modal
```html
<button class="btn btn-primario" onclick="document.getElementById('m1').classList.add('modal-overlay--visible')">◆ Abrir</button>

<div class="modal-overlay" id="m1"
  onclick="if(event.target===this) this.classList.remove('modal-overlay--visible')">
  <div class="modal w-full max-w-xs">
    <div class="modal__barra">
      <h6 class="modal__titulo-barra">TÍTULO</h6>
      <button class="modal__cerrar" onclick="document.getElementById('m1').classList.remove('modal-overlay--visible')">&#10005;</button>
    </div>
    <div class="modal__contenido"><p>…</p></div>
    <div class="modal__footer">
      <button class="btn btn-secundario" onclick="document.getElementById('m1').classList.remove('modal-overlay--visible')">Cancelar</button>
      <button class="btn btn-fantasma btn--peligro" onclick="document.getElementById('m1').classList.remove('modal-overlay--visible')">Confirmar</button>
    </div>
  </div>
</div>
```
Abrir/cerrar: alternar la clase `modal-overlay--visible` en el `.modal-overlay`. No hay helper JS dedicado — el patrón establecido (usado en todo el showcase) es `onclick` inline con `classList.add/remove`, incluyendo cerrar al clickear fuera del modal (`if(event.target===this)` en el propio `.modal-overlay`). Esto es intencional, no una improvisación a evitar.

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

### Bloque de código
Para snippets, comandos e instalación — **NO** improvisar con `.ventana` ni con utilidades sueltas (`bg-void-deep p-md font-mono`), usar siempre este componente:
```html
<div class="codigo">
  <div class="codigo__barra">bash</div>
  <pre class="codigo__cuerpo"><code>npm install @grimorio/css</code></pre>
</div>
```
`.codigo__barra` es opcional (label del lenguaje, ej. `bash`/`html`/`css`) — si se omite, `.codigo__cuerpo` pierde el borde superior interno automáticamente. `.codigo__cuerpo` ya trae `overflow-x: auto` para líneas largas y usa `--font-code` (no `--font-mono`) — es la única excepción de fuente del framework, pensada para legibilidad real de código.

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

### Carrusel (imágenes o tarjetas)
```html
<div class="carrusel mw-md">
  <div class="carrusel__pista">
    <div class="carrusel__item">
      <img src="..." alt="..." class="imagen-total carrusel__img" />
      <div class="carrusel__leyenda">
        <h6>Título del slide</h6>
        <p>Descripción breve.</p>
      </div>
    </div>
    <div class="carrusel__item">
      <img src="..." alt="..." class="imagen-total carrusel__img" />
      <div class="carrusel__leyenda">
        <h6>Otro slide</h6>
        <p>Descripción.</p>
      </div>
    </div>
  </div>
  <div class="carrusel__nav carrusel__nav--izq">
    <button class="carrusel__btn" data-dir="-1">&#9664;</button>
  </div>
  <div class="carrusel__nav carrusel__nav--der">
    <button class="carrusel__btn" data-dir="1">&#9654;</button>
  </div>
  <div class="carrusel__puntos"></div> <!-- vacío: ESCCarrusel genera los puntos solo -->
</div>
```
Lo maneja `grimorio.js` (`ESCCarrusel`), que auto-descubre **cualquier** `.carrusel` de la página (no requiere `id`). Los botones prev/next necesitan `data-dir="-1"`/`"1"` exactos — es lo que la clase lee para saber la dirección. `.carrusel__leyenda` es opcional (para tarjetas sin caption, omitila). Para carrusel de tarjetas en vez de imágenes, `.carrusel__item` puede contener cualquier contenido (ej. una `.tarjeta` completa) en vez de `<img>` + `.carrusel__leyenda`.

### Acordeón
```html
<div class="acordeon"> <!-- o .acordeon.acordeon--exclusivo: uno abierto a la vez -->
  <div class="acordeon__item acordeon__item--abierto"> <!-- --abierto opcional: empieza expandido -->
    <button class="acordeon__titulo">◆ ¿Qué es GrimorioEngine?</button>
    <div class="acordeon__contenido">
      <div class="acordeon__cuerpo">
        Un framework CSS puro con estética PS1/CRT.
      </div>
    </div>
  </div>
  <div class="acordeon__item">
    <button class="acordeon__titulo">◆ ¿Tiene dependencias?</button>
    <div class="acordeon__contenido">
      <div class="acordeon__cuerpo">
        Ninguna dependencia de JS externo.
      </div>
    </div>
  </div>
</div>
```
Lo maneja `grimorio.js` (`iniciarAcordeon()`), que escucha clicks en **`.acordeon__titulo`** y alterna `.acordeon__item--abierto` en el `.acordeon__item` padre. **Los tres niveles de anidamiento son obligatorios y los nombres exactos** — `.acordeon__contenido` (wrapper animado, no llevar padding acá) envolviendo `.acordeon__cuerpo` (el que sí lleva el padding real). Sin esta estructura exacta el acordeón no responde a los clicks.

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
<p class="texto-maquina">Sistema listo.</p>  <!-- grimorio.js mide el ancho -->
```
Modificadores: `texto-maquina--lento`, `texto-maquina--sin-cursor`.

### VHS overlay
`.vhs-overlay` dentro de una superficie/tarjeta posicionada para scanlines + aberración cromática.

### Paginación
```html
<nav class="paginacion" aria-label="Paginación" data-total="7">
  <button class="paginacion__btn" data-dir="-1" disabled>&#8592; Ant</button>
  <div class="paginacion__paginas"></div>
  <button class="paginacion__btn" data-dir="1">Sig &#8594;</button>
</nav>
```
`.paginacion` es auto-descubierto (cualquier cantidad en la página). `.paginacion__paginas` empieza vacío — `iniciarPaginacion()` genera los botones numerados solo. `data-total` en el `<nav>` fija el número de páginas (default 7 si se omite). `data-dir="-1"/"1"` en los botones anterior/siguiente — mismo patrón que `.carrusel__btn`.

### Consola / terminal interactiva
```html
<div class="consola">
  <div class="consola__barra">
    <div class="ventana__dots">
      <span class="ventana__dot ventana__dot--rojo"></span>
      <span class="ventana__dot ventana__dot--amarillo"></span>
      <span class="ventana__dot ventana__dot--verde"></span>
    </div>
    <span class="consola__titulo">ESC LABS · TERMINAL</span>
    <span class="consola__version">v2.0.6</span>
  </div>
  <div class="consola__pantalla" aria-label="Salida de consola" aria-live="polite"></div>
  <form class="consola__form" autocomplete="off">
    <span class="consola__prompt">esc@labs:~$</span>
    <input class="consola__input" type="text" placeholder="escribe un comando..." spellcheck="false" aria-label="Entrada de comando" />
  </form>
</div>
```
`.consola` es auto-descubierto (cualquier cantidad en la página). Los `.ventana__dots` y `.consola__version` son chrome decorativo (reutiliza los dots de `.ventana`), opcionales para la funcionalidad. Lo obligatorio para que `ESCConsola` funcione: `.consola__pantalla` (vacía, se puebla sola), `.consola__form` y `.consola__input` dentro de él. Comandos incorporados: `help`, `whoami`, `version`, `clear`, `build`, `status`, `grimorio`, `ls`. Flechas ↑/↓ navegan el historial de comandos escritos.

---

## 6. Componentes JS (`js/grimorio.js`, vanilla, init en `DOMContentLoaded`)

Cada init hace early-return si su nodo no existe → seguro de cargar en cualquier página. Todos auto-descubren sus componentes por clase (`querySelectorAll`) — podés tener cualquier cantidad de cada uno en la misma página, ninguno requiere un `id` específico.

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

*Fuente de verdad viva: `apps/showcase/index.html` (demo de todos los componentes) + `packages/css/grimorio.css`. Tokens: `packages/core/tokens.json`. Identidad completa: `ESC-LABS-PS1-FRAMEWORK.md`.*
