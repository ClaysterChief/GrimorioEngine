// @grimorio/core — Design tokens (ESM)
//
// FUENTE ÚNICA DE VERDAD: ./tokens.json (extraído del bloque :root de @grimorio/css).
// Este módulo solo re-exporta ese JSON para consumirlo como módulo ES. NO dupliques
// valores aquí: edita SIEMPRE tokens.json y este re-export queda sincronizado solo.
//
// Requiere import attributes (Node >= 20.10, o cualquier bundler moderno: Vite,
// webpack 5, esbuild, rollup). Consumido por @grimorio/elements y futuros wrappers.
import tokens from './tokens.json' with { type: 'json' };

export { tokens };
export default tokens;
