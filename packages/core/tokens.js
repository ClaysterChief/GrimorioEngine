// @grimorio/core — Design tokens
// Fuente de verdad: tokens.json (extraído del bloque :root de @grimorio/css).
// Consumido por @grimorio/elements y futuros wrappers (Vue / Angular / React Native).
// Nota: tokens.json es el artefacto portable (lo lee la IA y las herramientas);
// este módulo lo expone como objeto JS sin requerir import assertions.

export const tokens = {
  meta: { version: '2.0.0', rootFontSize: '62.5%', remBasis: '1rem = 10px' },

  fonts: {
    display: '"Orbitron", sans-serif',
    body: '"VT323", monospace',
    mono: '"Share Tech Mono", monospace',
    code: '"Cascadia Code PL", "Cascadia Code", ui-monospace, Consolas, Menlo, "Liberation Mono", monospace',
  },

  palettes: {
    dual: {
      label: 'Dual Signal', default: true, bodyClass: '', explicitClass: 'dual',
      tokens: {
        'void-deep': '#030108', 'void-primary': '#060412', 'void-surface': '#0e061e',
        deep: '#1a0840', border: '#2e1e60', acento: '#b44fff', 'acento-light': '#d98fff',
        'red-strike': '#ff3d6e', 'text-primary': '#dcc8f0', 'text-muted': '#8868a8',
      },
    },
    cosmos: {
      label: 'Cosmos Blue', default: false, bodyClass: 'cosmos', explicitClass: 'cosmos',
      tokens: {
        'void-deep': '#020609', 'void-primary': '#040c18', 'void-surface': '#060e1e',
        deep: '#0a1a40', border: '#1e3060', acento: '#1a6fd8', 'acento-light': '#4fa3ff',
        'red-strike': '#4fa3ff', 'text-primary': '#c8d8f0', 'text-muted': '#6888a8',
      },
    },
    crimson: {
      label: 'Crimson Signal', default: false, bodyClass: 'crimson', explicitClass: 'crimson',
      tokens: {
        'void-deep': '#090101', 'void-primary': '#110202', 'void-surface': '#1c0505',
        deep: '#2a0808', border: '#461212', acento: '#e53935', 'acento-light': '#ff6b67',
        'red-strike': '#ff1744', 'text-primary': '#ffffff', 'text-muted': '#886666',
      },
    },
  },

  semanticColors: { ok: '#00c853', warning: '#ffd600', 'dot-yellow': '#ffc60c', 'dot-green': '#28a745' },

  // Escala monótona única — alimenta m-* / p-* / gap-* vía var(--space-*)
  spacing: { 0: '0', xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem', '2xl': '4rem', '3xl': '5rem', '4xl': '6rem' },

  // Monótona por nombre; label = md, body = xl
  fontSize: { xs: '1rem', sm: '1.1rem', base: '1.2rem', md: '1.3rem', lg: '1.6rem', xl: '1.8rem', '2xl': '2.2rem', '3xl': '3rem', '4xl': '4.5rem' },

  transitions: { fast: '0.15s', base: '0.22s', moderate: '0.3s', slow: '0.45s', card: '0.72s' },

  zIndex: { base: 1, nav: 100, dropdown: 1000, sticky: 1100, modal: 8000, toast: 9000, flash: 9999 },

  borderWidths: { thin: '1px', accent: '2px', thick: '3px' },

  letterSpacing: { md: '0.1em', wide: '0.08em', wider: '0.18em' },

  // Altura de la cabecera sticky — scroll-padding-top global + utilidad .top-header
  layout: { headerHeight: '5rem' },
}

export default tokens
