# Grimorio Engine — Estado y Roadmap

Tablero de estado y pendientes de ESC Labs. Para arquitectura, estructura de
carpetas, convención de nombres BEM y tokens, ver **[`CLAUDE.md`](CLAUDE.md)**
(entrada de desarrollo) y **[`COMPONENTES.md`](COMPONENTES.md)** (catálogo).

---

## Estado actual — v2.0.6

| Área                              | Estado       |
|-----------------------------------|--------------|
| Variables / Tokens                | ✅ Listo      |
| Reset / Base                      | ✅ Listo      |
| Layout / Grid / Columnas          | ✅ Listo      |
| Navegación                        | ✅ Listo      |
| Botones (9 variantes)             | ✅ Listo      |
| Formularios completos             | ✅ Listo      |
| Tarjetas (5 variantes)            | ✅ Listo      |
| Imágenes (8 efectos)              | ✅ Listo      |
| Utilidades                        | ✅ Listo      |
| Alertas / Modal                   | ✅ Listo      |
| Tablas                            | ✅ Listo      |
| Íconos CSS puros                  | ✅ Listo      |
| Acordeón · Toast · Spinner        | ✅ Listo      |
| Tooltip · Slider de rango         | ✅ Listo      |
| Insignia · Migas · Código         | ✅ Listo      |
| Páginas secundarias · Showcase    | ✅ Listo      |
| Estructura monorepo · npm workspaces | ✅ Listo   |
| `grimorio.min.css` + espejo `css/` | ✅ Listo     |
| **Responsive**                    | ⏳ Parcial (Fase B) |

---

## Roadmap — Pendientes

### Fase A · Higiene ✅
- [x] Unificar versión en todo el repo (2.0.6)
- [x] `tokens.js` deriva de `tokens.json` (fuente única, sin duplicar valores)
- [x] Borrar asset huérfano (`Logo Extended VFISFT.svg`)
- [x] Adelgazar `PROYECTO.md` (roadmap-only; estructura/naming viven en `CLAUDE.md`)

### Fase B · Cerrar el CSS
- [x] Auditoría responsive: grids fijos colapsan en tablet/móvil; 5 páginas sin overflow horizontal a 375px
- [x] Check de validación (`npm run validate`: inline-styles + espejos `css/`·`js/`)
- [x] Mover `js/grimorio.js` a `packages/core/` (fuente); `js/` queda como espejo del build
- [x] `package.json` en `apps/showcase/` (`@grimorio/showcase`, workspace)
- [ ] Barrido responsive fino por componente (768 / 1024 px) — pendiente
- [ ] Publicar `@grimorio/css` en npm / GitHub Packages

### Fase C · Web Components (`@grimorio/elements`)
- [x] `<esc-acordeon>` — primer Custom Element (light DOM, `<esc-acordeon-item>`, `exclusivo`/`abierto`; demo verificada)
- [ ] `<esc-toast>` — singleton convertido a CE
- [ ] `<esc-tooltip>` — casi CSS-only, fácil de encapsular
- [ ] `<esc-spinner>` — CSS-only, sin lógica
- [ ] Carrusel, formulario multi-paso, tarjeta de crédito (mayor complejidad)

### Fase D · Adapters de framework
- [ ] `@grimorio/vue` — Wrappers Vue 3 (depende de `@grimorio/elements`)
- [ ] `@grimorio/angular` — Wrappers Angular (depende de `@grimorio/elements`)
- [ ] `@grimorio/react-native` — Reimplementación en RN primitives + tokens
- [ ] Publicar `@grimorio/core` cuando lo consuman los adapters

---

*Última revisión: 2026-07-11*
