# ESC Labs · PS1 Aesthetic Framework
> Design system guide para agentes y colaboradores · Dual Signal Edition

---

## 01 · Identidad de marca

### Nombre
**ESC Labs**
Acrónimo interno: *Evolution in Science & Computing*
Nunca se expande en materiales de marca — las siglas funcionan solas.

### Subtítulo
`LABS` — escrito en mayúsculas, separado visualmente del logotipo con una línea divisora y diamante central.

### Taglines aprobados
```
Systems that evolve.           → inglés, uso global
Build. Evolve. Compute.        → tres verbos = tres letras E·S·C
From science to system.        → neutral, laboratorios y negocios
Tecnología con alma propia.    → español, propuestas freelance y LATAM
```

---

## 02 · Sistema de logo

### Construcción tipográfica
```
fuente display : Orbitron 900
tracking       : 0.12em
color primario : #e8f0ff (cosmos blue) | #f0e8ff (dual signal)
text-shadow    : 0 0 20px [acento], 3px 3px 0 rgba(fondo oscuro, 0.8)
```

### Separador logo / subtítulo
```
[ línea izquierda ] ◆ [ línea derecha ]

línea  : gradiente transparente → acento → transparente
grosor : 2px
diamante : 8×8px rotado 45°, color acento, box-shadow glow
```

### LABS
```
fuente  : Share Tech Mono
tamaño  : 13px
kerning : 0.6em (espaciado muy abierto)
color   : acento 50% opacity
case    : UPPERCASE
```

### Variaciones de logo aprobadas

| ID | Figura | Uso recomendado |
|----|--------|-----------------|
| L-01 | Chip / Procesador | Sistemas, laboratorios, hardware |
| L-02 | Red de Nodos | Arquitectura, propuestas enterprise |
| L-03 | Órbita / Sistema | Identidad científica, largo plazo |

**Construcción geométrica de cada letra:**
- **E** → tres barras horizontales paralelas = pines, trazos de red, líneas de energía
- **S** → curva doble = flujo de datos, núcleo procesador, órbita elíptica
- **C** → arco abierto = pines con gap, nodo con apertura, órbita exterior

---

## 03 · Paletas de color

### Paleta A — Cosmos Blue *(sistemas, laboratorios, instituciones)*
```
--void-deep    : #020609   → fondo máximo oscuro
--void-primary : #040c18   → fondo de página
--void-surface : #060e1e   → superficie de componente
--navy-deep    : #0a1a40   → fondo elevado
--navy-border  : #1e3060   → bordes y separadores
--signal-blue  : #1a6fd8   → acento principal, botones CTA
--crt-glow     : #4fa3ff   → highlight, glow, cursor
--text-primary : #c8d8f0   → texto principal
--text-muted   : #6888a8   → labels, metadatos
```

### Paleta B — Dual Signal *(recomendada · branding, web, propuestas)*
```
--void-deep    : #030108   → fondo máximo oscuro
--void-primary : #060412   → fondo de página
--void-surface : #0e061e   → superficie de componente
--purple-deep  : #1a0840   → fondo elevado
--purple-border: #2e1e60   → bordes y separadores
--signal-purple: #b44fff   → acento principal
--purple-light : #d98fff   → highlight, glow, texto secundario
--red-strike   : #ff3d6e   → acento de acción SOLO (CTAs, cursores, alertas, HP)
--text-primary : #dcc8f0   → texto principal
--text-muted   : #8868a8   → labels, metadatos
```

### Regla de uso del rojo `#ff3d6e`
El rojo es acento de acción exclusivamente:
- Botones CTA primarios
- Cursor parpadeante (blink animation)
- Indicadores de estado activo
- Barras de HP / progreso crítico
- **Nunca** como color de texto corrido o fondo

---

## 04 · Tipografía

### Jerarquía
```
DISPLAY    : Orbitron 900
             → Logo, títulos H1, headers de sección
             → Tamaño mínimo 18px, preferido 26–52px

BODY       : VT323 (400)
             → Párrafos, descripciones, contenido corrido
             → Tamaño mínimo 15px, preferido 18–22px
             → Evoca terminal retro sin sacrificar legibilidad

MONO/LABEL : Share Tech Mono (400)
             → Labels, metadatos, versiones, rutas, taglines
             → Tamaño: 8–13px con letter-spacing 0.06–0.2em
             → UPPERCASE para labels, lowercase para código
```

### Escala tipográfica
```
H1 hero        : Orbitron 900, 48–52px
H2 sección     : Orbitron 700, 26–32px
H3 subsección  : Orbitron 700, 18–22px
Body principal : VT323, 20–22px
Body secundario: VT323, 16–18px
Label          : Share Tech Mono, 9–11px, uppercase, tracking 0.12–0.2em
Código/ruta    : Share Tech Mono, 11–13px, lowercase
Micro/versión  : Share Tech Mono, 8–9px, tracking 0.08em
```

---

## 05 · Elementos de textura PS1

### Scanlines
Superposición obligatoria en fondos de hero y superficies principales:
```css
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0, 0, 0, 0.20) 2px,
  rgba(0, 0, 0, 0.20) 4px
);
```

### Radial gradient de fondo (hero)
```css
background: radial-gradient(
  ellipse at 50% 60%,
  [purple-deep / navy-deep] 0%,
  [void-primary] 70%
);
```

### Bordes de componente
```
border        : 2px solid [border-color]
border-top    : 2px solid [acento, más brillante]
border-radius : 0px (PS1 no usa esquinas redondeadas)
```

### Brillo superior de componente (highlight line)
```css
/* ::before en cada card/surface */
content: '';
top: 0; left: 10px; right: 10px; height: 2px;
background: linear-gradient(90deg, transparent, [acento 40% opacity], transparent);
```

### Cursor parpadeante
```css
/* Triángulo CSS apuntando derecha */
width: 0; height: 0;
border-top: 6px solid transparent;
border-bottom: 6px solid transparent;
border-left: 10px solid [red-strike | crt-glow];
animation: blink 1s step-end infinite;

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
```

### Diamante decorativo
```css
width: 8px; height: 8px;
background: [acento];
transform: rotate(45deg);
box-shadow: 0 0 8–12px [acento con opacity 0.6–0.7];
```

---

## 06 · Componentes del sistema

### Surface / Panel base
```
background : --void-surface
border     : 2px solid --[paleta]-border
padding    : 1.5rem
position   : relative (para ::before scanlines)
overflow   : hidden
```

### Card interna
```
background   : --void-primary
border       : 1px solid --[paleta]-border
border-top   : 2px solid [acento intermedio]
padding      : 0.85rem 1rem
border-radius: 0
```

### Menu bar PS1
```
background   : linear-gradient(180deg, [purple/navy]-deep 0%, void-surface 100%)
border-bottom: 2px solid --[paleta]-border
padding      : 6px 12px
font         : Orbitron 700, 9px, tracking 0.1em
color        : --acento-principal
```

### Menu item
```
background   : --void-primary (más oscuro que surface)
border       : 1px solid --[paleta]-border
border-left  : 3px solid [acento oscuro]
padding      : 0.65rem 0.85rem
hover        : border-left-color → acento principal
```

### Memory card footer
```
background   : --void-primary
border-top   : 1px solid --[paleta]-border
padding      : 0.5rem 1rem
font         : Share Tech Mono, 9px, tracking 0.08em
color        : --[paleta]-border (muy sutil)
contiene     : ícono de tarjeta + texto + barra HP
```

### Barra HP / Progreso
```
bloques individuales : 12×7px, sin border-radius
color inactivo       : [purple/navy]-deep
color activo paleta A: --crt-glow
color activo paleta B: primeros bloques --signal-purple, últimos --red-strike
```

### Tagline item
```
display    : flex, gap 0.75rem
background : --void-surface
border     : 1px solid --[paleta]-border
border-left: 3px solid [acento según paleta]
padding    : 0.65rem 0.85rem
flecha     : ">>" en Share Tech Mono, color borde
texto      : VT323, 18–20px
contexto   : Share Tech Mono, 9px, --[paleta]-border
```

### Separador de sección
```
font    : Share Tech Mono, 10px, uppercase, tracking 0.15em
color   : --text-muted
padding-bottom : 0.5rem
border-bottom  : 1px solid --[paleta]-border  (muy sutil: 1px no 2px)
margin-bottom  : 1rem
```

---

## 07 · Voz de marca

### Personalidad
ESC Labs habla como un ingeniero senior que sabe de lo que habla, no como una empresa de marketing. Directa, técnica, accesible.

### Atributos

**Técnica sin distancia**
- Somos: precisos, claros, sin jerga innecesaria
- No somos: fríos, corporativos, distantes
- Suena a: "Lo construimos para que dure, no para que impresione en demo."
- No suena a: "Soluciones tecnológicas de vanguardia para el siglo XXI."

**Directa sin relleno**
- Somos: concisos, respetamos el tiempo del cliente
- No somos: telegráficos ni groseros
- Suena a: "Hacemos el sistema. Tú haces el negocio."
- No suena a: "Estamos comprometidos con brindar valor agregado."

**Confianza ganada**
- Somos: seguros sin ser arrogantes
- No somos: vendedores, exagerados
- Suena a: "No vendemos tecnología. Resolvemos el problema real."
- No suena a: "Somos líderes del sector con más de X años de experiencia."

**Cercana pero seria**
- Somos: accesibles para PyMEs e instituciones por igual
- No somos: informales ni demasiado formales
- Suena a: "¿Sistema de comidas sin digitalizar? Eso lo resolvemos."
- No suena a: "¡Hola! Estamos aquí para ayudarte en lo que necesites 😊"

---

## 08 · Uso del lenguaje PS1 en UI

### Convenciones de texto en interfaz
```
Comentarios de código   : // TEXTO EN UPPERCASE
Separadores de ruta     : MEMORIA CARD // ESC-LABS-001 // TLAXCALA MX
Prefijos de sección     : >> Item de menú
Versiones               : v1.0.0
Referencias             : esc-labs-[nombre]-[version]
```

### Lo que NO hacemos
```
× No usar emojis en materiales de marca
× No usar border-radius en componentes PS1 (excepción: elementos pequeños tipo píldora)
× No usar gradientes en texto corrido (solo en display/hero)
× No usar el rojo como color de texto
× No mezclar fuentes fuera de la triada Orbitron / VT323 / Share Tech Mono
× No usar Orbitron en tamaños menores a 18px (pierde carácter)
```

---

## 09 · Dominios recomendados

```
esclabs.io     → primera opción
esc.dev        → si está disponible
esclabs.dev    → alternativa técnica
escsystems.io  → si se usa "Systems" como sufijo
```

---

## 10 · Nombres reservados de productos

Los siguientes nombres están reservados para sistemas y productos internos de ESC Labs.
No usar como nombre de empresa ni marca principal.

| Nombre | Tipo de sistema |
|--------|----------------|
| RÚNIX | Sistemas de información |
| SKALD | Herramientas de narrativa y branding |
| AVALON | Nombre de oficinas o subsidiaria |
| VEÐR | Sistema climático / fuerza |
| NOATÚN | Sistema de convergencia |
| BRAGR | Sistema de comunicación / conocimiento |
| VERÐANDI | Sistema de gestión tiempo real |
| LUGH | Sistema multidisciplinario |
| DAGDA | Sistema creador omnidisciplinario |
| NEXOR | Sistema de conexión y convergencia |

---

## 11 · Checklist para nuevo material

Antes de publicar cualquier pieza de la marca, verificar:

- [ ] ¿Usa Orbitron para el display principal?
- [ ] ¿El fondo es de la paleta void (no blanco, no gris claro)?
- [ ] ¿Los scanlines están presentes en heroes y superficies principales?
- [ ] ¿El rojo `#ff3d6e` se usa solo en acciones, nunca en texto?
- [ ] ¿Los bordes son rectos (border-radius: 0)?
- [ ] ¿La voz de copy es directa y sin relleno corporativo?
- [ ] ¿El logo incluye la línea divisora con diamante central?
- [ ] ¿LABS está en Share Tech Mono con kerning abierto?
- [ ] ¿Hay un cursor parpadeante o elemento animado en el hero?

---

*ESC Labs · Evolution in Science & Computing · v1.0*
