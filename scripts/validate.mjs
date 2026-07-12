// scripts/validate.mjs — chequeo de invariantes del repo (cross-platform, sin deps).
//
// 1. Cero inline styles (`style="` como atributo) en el showcase — política de marca.
// 2. El espejo de distribución `css/` coincide con la fuente `packages/css/`
//    (para que GitHub-install / CDN no sirvan CSS viejo: correr `npm run build`).
//
// Uso: `npm run validate`. Sale con código 1 si algo falla (apto para CI/pre-push).

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let errors = 0;
const fail = (msg) => { console.error('  ✗ ' + msg); errors++; };
const ok = (msg) => console.log('  ✓ ' + msg);

// ── 1. Inline styles en el showcase ───────────────────────────────
// Un atributo real es `<tag ... style="...">`: 'style=' precedido de espacio
// DENTRO de una etiqueta. Excluye texto como <code>style=""</code>.
const inlineStyle = /<[^>]*\sstyle\s*=/i;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) {
      const lines = readFileSync(p, 'utf8').split(/\r?\n/);
      lines.forEach((line, i) => {
        if (inlineStyle.test(line)) fail(`inline style en ${relative(root, p)}:${i + 1}`);
      });
    }
  }
}
console.log('· Inline styles (showcase):');
walk(join(root, 'apps', 'showcase'));
if (errors === 0) ok('cero atributos style="" en el HTML del showcase');

// ── 2. Espejos de distribución == fuente ──────────────────────────
// css/ ← packages/css/ y js/ ← packages/core/ (los genera `npm run build`).
console.log('· Espejos de distribución (css/ y js/):');
const before = errors;
const mirrors = [
  ['packages/css/grimorio.css', 'css/grimorio.css'],
  ['packages/css/grimorio.min.css', 'css/grimorio.min.css'],
  ['packages/core/grimorio.js', 'js/grimorio.js'],
];
for (const [srcRel, mirrorRel] of mirrors) {
  try {
    if (readFileSync(join(root, srcRel), 'utf8') !== readFileSync(join(root, mirrorRel), 'utf8'))
      fail(`${mirrorRel} no coincide con ${srcRel} — corré \`npm run build\``);
  } catch (e) {
    fail(`no se pudo comparar ${mirrorRel}: ${e.message}`);
  }
}
if (errors === before) ok('css/ y js/ sincronizados con sus fuentes');

// ── Resultado ─────────────────────────────────────────────────────
if (errors > 0) {
  console.error(`\n✗ Validación falló con ${errors} error(es).`);
  process.exit(1);
}
console.log('\n✓ Validación OK.');
