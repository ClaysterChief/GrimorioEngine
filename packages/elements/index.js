// @grimorio/elements — capa de Web Components (Custom Elements) de GrimorioEngine.
//
// Importar este módulo registra todos los elementos disponibles (efecto de
// importación). Requiere que el CSS de @grimorio/css esté cargado en la página
// (los elementos usan light DOM + clases globales, sin shadow DOM).
//
//   import '@grimorio/elements';        // registra <esc-acordeon>, ...
//   <link rel="stylesheet" href=".../grimorio.css" />
//
// Cada elemento se auto-registra y es idempotente (no re-define si ya existe).

import './src/esc-acordeon.js';

export * from './src/esc-acordeon.js';
