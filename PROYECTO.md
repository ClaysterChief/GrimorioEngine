# Grimorio Engine — CSS UI Library

Framework de estilos CSS propio de ESC Studios.
Se usa importando `css/style.css` y aplicando las clases en cualquier HTML.

---

## Estado actual

| Componente       | Estado      |
|------------------|-------------|
| Variables        | ✅ Listo     |
| Reset / Base     | ✅ Listo     |
| Layout           | ✅ Listo     |
| Navegación       | ✅ Listo     |
| Botones          | ✅ Listo     |
| Formularios      | ✅ Listo     |
| Tarjetas         | ✅ Listo     |
| Imágenes         | ✅ Listo     |
| Textos (colores) | ✅ Listo     |
| Responsive       | ✅ Parcial   |
| Grid / Columnas  | ✅ Listo     |
| Alertas          | ✅ Listo     |
| Modales          | ✅ Listo     |
| Tablas           | ✅ Listo     |
| Íconos           | ⬜ Pendiente |

---

## Cómo usar

```html
<link rel="stylesheet" href="css/style.css" />

<!-- Botón -->
<button class="btn btn-azul">Aceptar</button>

<!-- Tarjeta -->
<div class="tarjeta tarjeta-blanca">
  <h4>Título</h4>
  <p>Contenido</p>
</div>

<!-- Texto con color -->
<p class="text-rojo">Error</p>
```

---

## Convención de nombres de clases

Se usa una versión simplificada de BEM. Todas las clases van en **español, kebab-case**.

```
[bloque]                 → .tarjeta
[bloque]-[modificador]   → .tarjeta-blanca
[bloque]__[elemento]     → .menu-principal__item
[bloque]__[el]--[mod]    → .menu-principal__item--active
```

### Prefijos por tipo

| Prefijo      | Uso                          | Ejemplo            |
|--------------|------------------------------|--------------------|
| `bg-`        | Color de fondo               | `.bg-negro`        |
| `text-`      | Color de texto               | `.text-azul`       |
| `btn`        | Botones                      | `.btn`, `.btn-rojo`|
| `formulario-`| Campos de formulario         | `.formulario-estandar` |
| `grupo-`     | Contenedor de varios iguales | `.grupo-tarjeta`   |
| `imagen-`    | Estilos de imagen            | `.imagen-circular` |

### Reglas

- Nombrar en español. Sin camelCase.
- Un modificador cambia solo **una** propiedad del bloque base (color, tamaño).
- Si un estilo no encaja en un bloque existente, crear sección nueva en el CSS con el encabezado estándar.

---

## Variables disponibles (`--nombre`)

### Colores base
| Variable      | Valor     |
|---------------|-----------|
| `--negro`     | `#212121` |
| `--blanco`    | `#fff`    |
| `--brillante` | `#f8f9fa` |
| `--gris`      | `#6c757d` |
| `--azul`      | `#1976d2` |
| `--indigo`    | `#4B0082` |
| `--morado`    | `#673ab7` |
| `--rosa`      | `#e83e8c` |
| `--rojo`      | `#d2191a` |
| `--naranja`   | `#ff9c0c` |
| `--amarillo`  | `#ffc60c` |
| `--verde`     | `#28a745` |
| `--teal`      | `#0ad58d` |
| `--cian`      | `#17a2b8` |

### Colores semánticos (alias)
| Variable       | Apunta a       |
|----------------|----------------|
| `--primario`   | `--azul`       |
| `--secundario` | `--gris`       |
| `--exitoso`    | `--verde`      |
| `--info`       | `#308deb`      |
| `--advertencia`| `--amarillo`   |
| `--error`      | `#dc3545`      |

---

## Estructura del CSS

El archivo `css/style.css` se divide en secciones marcadas con:

```css
/* ================================================
   NOMBRE DE SECCIÓN — Descripción breve
   ================================================ */
```

Orden de secciones:
1. Variables globales
2. Reset y Base
3. Layout
4. Utilidades — Fondos
5. Componente — Navegación
6. Componente — Formularios
7. Componente — Botones
8. Componente — Tarjetas
9. Componente — Imágenes
10. Utilidades — Textos
11. Responsive — Breakpoints

---

## Pendientes / TODO

- [ ] Íconos CSS puro (`.icono-*` shapes sin fuentes externas)
- [ ] Agregar utilidades `bg-` adicionales
- [ ] Completar páginas secundarias (`html/contacto.html`, `html/login.html`)
- [ ] Completar `html/contacto.html`, `html/servicios.html` y `html/login.html`
- [ ] Documentar uso de `index.html` como página de demostración
- [ ] Evaluar si publicar como CDN o npm package

---

*Última revisión: 2026-06-17*
