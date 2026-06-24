# Grimorio Engine

**CSS UI Framework — ESC Labs**
Estética PS1 / CRT · Tres paletas de color · Sin dependencias

```
Build. Evolve. Compute.
```

---

## ¿Qué es?

Grimorio Engine es el sistema de UI propio de ESC Labs. Un framework CSS puro que traduce la estética de las consolas PS1 y los monitores CRT a componentes web modernos: sin border-radius, con scanlines, glow, fuentes retro y animaciones a base de `steps()`.

No es Tailwind. No es Bootstrap. Es un lenguaje visual propio.

---

## Paletas de color

El framework incluye tres paletas que se aplican como clase en el `<body>`:

| Paleta | Clase | Acento |
|---|---|---|
| Dual Signal *(default)* | *(ninguna)* | `#b44fff` — señal púrpura |
| Cosmos Blue | `.cosmos` | `#1a6fd8` — azul profundo |
| Crimson Signal | `.crimson` | `#e53935` — rojo casi negro |

```html
<body class="cosmos">...</body>
```

El cambio de tema incluye un efecto de flash CRT generado por CSS puro.

---

## Componentes incluidos

| Categoría | Componentes |
|---|---|
| **Botones** | Base, Primario, Acción, Secundario, Fantasma, Scan, Glitch, Pulso, Alerta + tamaños |
| **Formularios** | Input estándar, Checkbox, Radio (diamante), Toggle, Textarea, File input |
| **Formularios especiales** | Multi-paso deslizante, Tarjeta de crédito (flip 3D), Input de correo con dominio |
| **Tarjetas** | Base, Destacada, Inversa, Stat HUD, VHS container |
| **Navegación** | Navbar, Menú desplegable, Selector de tema |
| **Contenido** | Carrusel imágenes, Carrusel tarjetas, Paginación |
| **Feedback** | Alertas (ok / advertencia / error), Modal con overlay |
| **Datos** | Tabla con badges de estado, Grid sistema (2/3/4/auto col) |
| **Elementos PS1** | Barra HP, Consola terminal, Texto máquina, Ventana PS1, Loaders |
| **Tipografía** | Utilidades de texto, Taglines, Separadores de sección |
| **Imágenes** | Hover effects (scan, glitch, zoom, flip, distorsión) |

---

## Tipografía

```
Display  : Orbitron 900         → Títulos, logo, headers
Body     : VT323                → Texto corrido, descripciones
Mono     : Share Tech Mono      → Labels, metadatos, código
```

Cargadas desde Google Fonts — incluir en el `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=VT323&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
```

---

## Uso práctico

### Nivel 1 — Sitio estático (vanilla HTML)

La forma más directa. Copia o enlaza el CSS y aplica clases.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <link rel="stylesheet" href="ruta/al/grimorio-engine/css/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=VT323&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
</head>
<body>
  <button class="btn btn-primario">Iniciar sistema</button>
  <div class="superficie">
    <h3>Panel ESC-001</h3>
    <p>Contenido del panel.</p>
  </div>
</body>
</html>
```

Sin build step. Sin configuración. Funciona en cualquier proyecto HTML.

---

### Nivel 2 — npm package (proyectos con bundler)

Con `package.json` configurado, el framework puede instalarse como dependencia local o publicarse en npm/GitHub Packages.

**Estructura del paquete:**
```
grimorio-engine/
  css/
    style.css
    style.min.css
  package.json
  README.md
```

**`package.json` mínimo:**
```json
{
  "name": "grimorio-engine",
  "version": "0.1.0",
  "description": "ESC Labs PS1 UI Framework",
  "style": "css/style.css",
  "exports": {
    ".": "./css/style.css"
  }
}
```

**Instalación desde repositorio local:**
```bash
npm install ../grimorio-engine
# o con ruta absoluta
npm install /ruta/al/grimorio-engine
```

**Instalación desde GitHub:**
```bash
npm install github:ClaysterChief/GrimorioEngine
```

**Uso en cualquier proyecto con Vite, webpack, etc.:**
```js
// main.js · main.jsx · main.ts
import 'grimorio-engine/css/style.css'
```

El CSS queda disponible globalmente en toda la aplicación.

---

### Nivel 3 — React (integración completa)

Importa el CSS globalmente y gestiona el tema con estado de React.

**Proveedor de tema:**
```jsx
// src/providers/ThemeProvider.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import 'grimorio-engine/css/style.css'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState('default')

  useEffect(() => {
    document.body.className = tema === 'default' ? '' : tema
  }, [tema])

  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTema = () => useContext(ThemeContext)
```

**Uso en `main.jsx`:**
```jsx
import { ThemeProvider } from './providers/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
```

**Componentes con clases de GrimorioEngine:**
```jsx
// Los componentes solo aplican clases CSS — sin estilos propios
function Boton({ variante = 'btn-primario', tamaño, children, ...props }) {
  return (
    <button
      className={`btn ${variante} ${tamaño ? `btn--${tamaño}` : ''}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}

// Uso
<Boton variante="btn-accion" tamaño="lg">Registrar</Boton>
<Boton variante="btn-fantasma">Cancelar</Boton>
```

**Selector de tema:**
```jsx
function SelectorTema() {
  const { tema, setTema } = useTema()
  const paletas = [
    { id: 'default', nombre: 'Dual Signal', acento: '#b44fff' },
    { id: 'cosmos',  nombre: 'Cosmos Blue', acento: '#1a6fd8' },
    { id: 'crimson', nombre: 'Crimson Signal', acento: '#e53935' },
  ]
  return (
    <div className="nav-temas">
      {paletas.map(p => (
        <button
          key={p.id}
          className={`nav-temas__btn ${tema === p.id ? 'nav-temas__btn--activa' : ''}`}
          onClick={() => setTema(p.id)}
          title={p.nombre}
        >
          <span
            className="nav-temas__diamante"
            style={{ background: p.acento, boxShadow: `0 0 8px ${p.acento}88` }}
          />
        </button>
      ))}
    </div>
  )
}
```

**Los componentes interactivos** (carrusel, formulario multi-paso, tarjeta de crédito, consola) se portarían como hooks de React que mantienen la misma lógica JS pero integrada con el ciclo de vida de React. El CSS no cambia — solo la lógica se mueve a `useEffect` / `useRef` / `useReducer`.

---

## Convención de clases

BEM simplificado, todo en **español, kebab-case**:

```
.bloque
.bloque-modificador
.bloque__elemento
.bloque__elemento--modificador
```

| Prefijo | Tipo | Ejemplo |
|---|---|---|
| `btn` | Botones | `.btn`, `.btn-primario` |
| `campo-` | Inputs de formulario | `.campo-formulario` |
| `formulario-` | Contenedores de form | `.formulario-estandar` |
| `tarjeta-` | Cards | `.tarjeta`, `.tarjeta-destacada` |
| `grupo-` | Contenedores múltiples | `.grupo-tarjeta` |
| `imagen-` | Efectos de imagen | `.imagen-scan` |
| `alerta-` | Mensajes de estado | `.alerta--ok` |
| `tabla-` | Tablas y badges | `.tabla-badge--error` |
| `modal-` | Modales | `.modal-overlay` |
| `carrusel-` | Carruseles | `.carrusel__item--activo` |

---

## Variables CSS disponibles

```css
/* Colores (varían según paleta activa) */
--void-deep       /* Fondo máximo oscuro */
--void-primary    /* Fondo de página */
--void-surface    /* Superficie de componente */
--deep            /* Fondo elevado */
--border          /* Bordes y separadores */
--acento          /* Color de acento principal */
--acento-light    /* Highlight / glow */
--red-strike      /* Acento de acción (rojo / varía por paleta) */
--text-primary    /* Texto principal */
--text-muted      /* Labels, metadatos */

/* Tipografía (constantes) */
--font-display    /* Orbitron 900 */
--font-body       /* VT323 */
--font-mono       /* Share Tech Mono */
```

---

## Roadmap

- [x] Variables globales · tres paletas
- [x] Reset y base tipográfica
- [x] Layout · grid · contenedor
- [x] Navegación · menú · selector de tema
- [x] Botones (9 variantes + tamaños)
- [x] Formularios completos (todos los inputs)
- [x] Formulario multi-paso deslizante
- [x] Tarjeta de crédito con flip 3D
- [x] Input de correo con dominio
- [x] Tarjetas (5 variantes)
- [x] Imágenes con efectos hover
- [x] Carruseles (2 variantes) + paginación
- [x] Alertas · Modal · Tablas · Grid
- [x] Loaders PS1 (bloques HP, diamante, scan)
- [x] Consola terminal · Texto máquina · Ventana PS1
- [x] Stat HUD · Barra HP · VHS containers
- [x] Íconos CSS puros (`.icono-*`)
- [x] Utilidades `bg-`
- [ ] `style.min.css` (npm run build)
- [x] `package.json` para distribución npm
- [ ] Wrapper de componentes React (`grimorio-engine-react`)
- [x] Páginas secundarias (`login.html`, `contacto.html`, `servicios.html`)

---

## Estructura del proyecto

```
grimorio-engine/
  packages/
    css/
      style.css           ← Framework completo (@grimorio/css v2.0.0)
    core/
      tokens.js           ← Design tokens — placeholder (@grimorio/core v0.1.0)
    elements/             ← Stub — Web Components futuros (@grimorio/elements)
    vue/                  ← Stub — Wrappers Vue 3 (@grimorio/vue)
    angular/              ← Stub — Wrappers Angular (@grimorio/angular)
    react-native/         ← Stub — Componentes RN (@grimorio/react-native)
  apps/
    showcase/
      index.html          ← Demo de todos los componentes
      html/               ← Páginas secundarias (login, contacto, servicios)
      images/             ← Assets del showcase
  js/
    engine.js             ← JS vanilla (futuro: mover a packages/core/)
  PROYECTO.md             ← Tracking interno de estado y roadmap
  ESC-LABS-PS1-FRAMEWORK.md ← Guía de identidad visual
  README.md
```

---

## Roadmap

- [x] Variables globales · tres paletas
- [x] Reset y base tipográfica
- [x] Layout · grid · contenedor
- [x] Navegación · menú · selector de tema
- [x] Botones (9 variantes + tamaños)
- [x] Formularios completos (todos los inputs)
- [x] Formulario multi-paso deslizante
- [x] Tarjeta de crédito con flip 3D
- [x] Input de correo con dominio
- [x] Tarjetas (5 variantes)
- [x] Imágenes con efectos hover (8 efectos)
- [x] Carruseles (2 variantes) + paginación
- [x] Alertas · Modal · Tablas · Grid
- [x] Loaders PS1 (bloques HP, diamante, scan)
- [x] Consola terminal · Texto máquina · Ventana PS1
- [x] Stat HUD · Barra HP · VHS containers
- [x] Íconos CSS puros (`.icono-*`)
- [x] Acordeón · Toast · Spinner · Tooltip · Rango
- [x] `package.json` para distribución npm
- [x] Páginas secundarias (`login.html`, `contacto.html`, `servicios.html`)
- [x] Estructura monorepo — `packages/` + npm workspaces
- [x] Showcase separado en `apps/showcase/`
- [ ] `packages/css/style.min.css` — ejecutar `npm run build`
- [ ] Extraer tokens CSS a `packages/core/tokens.js`
- [ ] `@grimorio/elements` — Web Components (Custom Elements)
- [ ] `@grimorio/vue` — Wrappers Vue 3
- [ ] `@grimorio/angular` — Wrappers Angular
- [ ] `@grimorio/react-native` — Componentes React Native
- [ ] Publicar en npm / GitHub Packages

---

*ESC Labs · Evolution in Science & Computing · GrimorioEngine v2.0*
