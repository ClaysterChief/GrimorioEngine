# @grimorio/elements

Capa de **Web Components** (Custom Elements) de GrimorioEngine. Elementos
declarativos que encapsulan el markup y el comportamiento de los componentes,
sin necesidad de cargar `grimorio.js` ni llamar a funciones de init.

Usan **light DOM** + las clases globales de `@grimorio/css` (sin shadow DOM), así
que heredan las tres paletas y toda la estética PS1/CRT sin duplicar estilos.

## Requisitos

El CSS de `@grimorio/css` debe estar cargado en la página:

```html
<link rel="stylesheet" href=".../grimorio.css" />
<script type="module" src=".../@grimorio/elements/index.js"></script>
```

O con bundler:

```js
import '@grimorio/css';
import '@grimorio/elements'; // registra todos los elementos
```

## Elementos

### `<esc-acordeon>`

```html
<esc-acordeon exclusivo>
  <esc-acordeon-item titulo="¿Qué es?" abierto>Un framework CSS PS1/CRT.</esc-acordeon-item>
  <esc-acordeon-item titulo="¿Dependencias?">Ninguna.</esc-acordeon-item>
</esc-acordeon>
```

| Atributo | En | Efecto |
|---|---|---|
| `exclusivo` | `<esc-acordeon>` | Solo un item abierto a la vez |
| `titulo` | `<esc-acordeon-item>` | Texto del encabezado (no incluir `◆`: lo pone el CSS) |
| `abierto` | `<esc-acordeon-item>` | El item empieza expandido |

El contenido de cada `<esc-acordeon-item>` puede ser HTML.

## Demo

Abrir `demo.html` con un servidor estático (los módulos ES requieren `http://`,
no `file://`). Desde la raíz del repo: `npm run serve` y navegar a
`/packages/elements/demo.html`.

## Estado

Primer elemento de la capa (`v0.1.0`, privado). Siguientes previstos:
`<esc-toast>`, `<esc-tooltip>`, `<esc-spinner>` (ver `PROYECTO.md`).
