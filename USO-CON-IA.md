# Cómo generar páginas con IA usando GrimorioEngine

Guía operativa (para ti, el humano que dirige a la IA). El **contrato técnico** que la IA debe seguir vive en [`COMPONENTES.md`](COMPONENTES.md); este archivo explica **cómo ponérselo a la IA y cómo verificar lo que produce**.

---

## Idea en una frase

Le das a la IA el manifiesto (`COMPONENTES.md`) + los tokens (`packages/core/tokens.json`) como **contexto fijo**, le pides la página, y validas la salida contra un checklist. Así, aunque la página la escriba la IA, sale con la identidad de ESC Labs.

---

## Paso 1 — Montar el contexto de la IA

Pega esto como **system prompt** (o "instrucciones del proyecto" / "custom instructions", según la herramienta):

```
Eres un generador de UI para ESC Labs. Construyes páginas y apps web usando EXCLUSIVAMENTE
el framework CSS GrimorioEngine. Sigues al pie de la letra el manifiesto que viene a
continuación: sus reglas de identidad son inviolables y NUNCA usas atributos style="".
Resuelves todo el layout con utilidades y clases BEM en español del catálogo. Si una
necesidad no está cubierta por una clase del catálogo, lo dices explícitamente en vez de
improvisar CSS o estilos inline.

--- INICIO DEL MANIFIESTO ---
<pega aquí el contenido completo de COMPONENTES.md>
--- FIN DEL MANIFIESTO ---

Tokens de diseño (colores por paleta, escalas):
<pega aquí packages/core/tokens.json>
```

> Si la herramienta permite adjuntar archivos al proyecto (Claude Projects, Custom GPTs, etc.), adjunta `COMPONENTES.md` y `tokens.json` directamente en vez de pegarlos — es más limpio y persiste entre chats.

---

## Paso 2 — Pedir la página (plantilla de prompt)

Cuanto más concreto el encargo, menos improvisa la IA. Plantilla:

```
Genera <tipo de página: landing / dashboard / formulario / etc.> para <cliente / propósito>.

Secciones, de arriba a abajo:
1. <hero con …>
2. <…>
3. <…>

Detalles:
- Paleta: <dual (default) | cosmos | crimson>.
- Incluye la cabecera estándar con nav-temas y el #tema-flash.
- Tono del copy: directo, técnico, sin relleno. Sin emojis. Usa el diamante ◆ donde aporte.
- Entrega un único archivo HTML completo enlazando packages/css/style.css y js/engine.js.

Antes de entregar, recórrete el checklist del manifiesto y confírmame que lo cumple.
```

**Consejos:**
- Nombra los componentes que quieres ("usa `tarjeta`, `barra-hp`, `ventana`…") cuando tengas claro el resultado — la IA acierta más.
- Pídele **un archivo a la vez**. Para sitios multipágina, genera primero la home, fija el shell (cabecera/footer), y reusa ese shell en las demás.
- Si la IA dice "no hay una clase para X": esa es la señal de que falta una utilidad. Decídelo tú — o agregar la utilidad al framework (lo correcto), o reformular el layout con lo existente. **Nunca** aceptes un `style=""` como solución.

---

## Paso 3 — Verificar la salida (no te saltes esto)

1. **Grep de inline styles** — debe dar 0:
   ```bash
   grep -c 'style="' archivo-generado.html   # esperado: 0
   ```
   (Los `style` que inyecta `engine.js` en runtime —rango, texto-máquina, carrusel— no cuentan: son dinámicos, no están en el HTML fuente.)

2. **Prueba las 3 paletas** — cambia la clase del `<body>` entre *(nada)* / `cosmos` / `crimson` (o usa el nav-temas) y confirma que todo se adapta sin colores rotos.

3. **Checklist de identidad** (está al final del manifiesto): fondo void, scanlines en hero, rojo solo en acciones, esquinas rectas, Orbitron ≥18px, sin emojis, `#tema-flash` presente.

4. **Míralo en el navegador.** Sirve la raíz del repo y abre la página. Recuerda la **barra final** en directorios (`/ruta/` no `/ruta`).

Si algo falla, no lo arregles a mano con inline styles: dile a la IA qué regla incumplió y que lo corrija con clases del catálogo. Ese loop es el que mantiene la consistencia.

---

## Paso 4 — Iterar el manifiesto

El manifiesto es vivo. Cuando notes que la IA tropieza siempre con lo mismo (pide una utilidad que no existe, malinterpreta una clase), **arréglalo en la fuente**:
- ¿Falta una utilidad? Agrégala a `packages/css/style.css` y demuéstrala en el showcase.
- ¿La IA malentiende una clase? Aclara su fila en `COMPONENTES.md` con un mejor ejemplo.

Así cada cliente que generes deja el sistema un poco más afilado.

---

## Referencia rápida de archivos

| Archivo | Rol |
|---|---|
| [`COMPONENTES.md`](COMPONENTES.md) | Contrato para la IA — reglas, paletas, tokens, catálogo, checklist. |
| [`packages/core/tokens.json`](packages/core/tokens.json) | Tokens de diseño en JSON. |
| [`apps/showcase/index.html`](apps/showcase/index.html) | Demo viva de todos los componentes — la referencia visual definitiva. |
| [`ESC-LABS-PS1-FRAMEWORK.md`](ESC-LABS-PS1-FRAMEWORK.md) | Identidad de marca completa (voz, tipografía, prohibiciones). |
| [`llms.txt`](llms.txt) | Índice raíz para herramientas que lo descubren automáticamente. |
