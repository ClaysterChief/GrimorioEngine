# @grimorio/css

Framework CSS puro de **ESC Labs** con estética **PS1 / CRT**. Tres paletas theme-aware, cero dependencias JS. Pensado para ser consumido por humanos y por IA generadora de UI.

```
Build. Evolve. Compute.
```

## Instalación

```bash
# Desde npm (paquete scoped)
npm install @grimorio/css

# O directo desde GitHub
npm install github:ClaysterChief/GrimorioEngine
```

## Uso

Con bundler (Vite, webpack, etc.):

```js
import '@grimorio/css'            // hoja completa
// o la versión minificada:
import '@grimorio/css/min'
```

Sin bundler (HTML directo):

```html
<link rel="stylesheet" href="node_modules/@grimorio/css/grimorio.css" />
<!-- Fuentes: ya se importan dentro del CSS (Google Fonts) -->
```

## Paletas

Se aplican como clase en `<body>` o cualquier contenedor:

| Paleta | Clase | Acento |
|---|---|---|
| Dual Signal (default) | *(ninguna)* | `#b44fff` |
| Cosmos Blue | `.cosmos` | `#1a6fd8` |
| Crimson Signal | `.crimson` | `#e53935` |

```html
<body class="cosmos">…</body>
```

## Requisitos de navegador

El framework usa `color-mix()` de forma extensiva (glow, sombras, overlays). Baseline:
**Chrome/Edge 119+ · Safari 17.2+ · Firefox 113+**.

## Documentación

- Manifiesto de componentes y reglas de identidad: [`COMPONENTES.md`](https://github.com/ClaysterChief/GrimorioEngine/blob/main/COMPONENTES.md)
- Design tokens: [`@grimorio/core` · tokens.json](https://github.com/ClaysterChief/GrimorioEngine/blob/main/packages/core/tokens.json)
- Showcase de todos los componentes: `apps/showcase/index.html` en el repo.

## Licencia

MIT © ESC Labs
