// <esc-acordeon> — Custom Element del acordeón de GrimorioEngine.
//
// Encapsula el markup y el comportamiento del acordeón (`.acordeon`) en un
// elemento declarativo, sin necesidad de cargar `grimorio.js` ni llamar a
// `iniciarAcordeon()`. Usa el CSS global de @grimorio/css (light DOM, no shadow),
// así que hereda las tres paletas y toda la estética sin duplicar estilos.
//
// Uso:
//   <esc-acordeon exclusivo>
//     <esc-acordeon-item titulo="¿Qué es?" abierto>Un framework CSS PS1/CRT.</esc-acordeon-item>
//     <esc-acordeon-item titulo="¿Dependencias?">Ninguna.</esc-acordeon-item>
//   </esc-acordeon>
//
// - `exclusivo` (en <esc-acordeon>): solo un item abierto a la vez.
// - `titulo` (en <esc-acordeon-item>): texto del encabezado. NO incluir ◆:
//   el marcador lo pone el CSS (`.acordeon__titulo::before`).
// - `abierto` (en <esc-acordeon-item>): empieza expandido.
// El contenido de cada item puede ser HTML (control del consumidor).

// Marcador de datos: no renderiza nada por sí mismo; <esc-acordeon> lo lee.
class ESCAcordeonItem extends HTMLElement {}
if (!customElements.get('esc-acordeon-item')) {
  customElements.define('esc-acordeon-item', ESCAcordeonItem);
}

class ESCAcordeon extends HTMLElement {
  connectedCallback() {
    if (this._inicializado) return; // evita re-render si se re-conecta
    this._inicializado = true;

    const exclusivo = this.hasAttribute('exclusivo');
    const items = [...this.querySelectorAll(':scope > esc-acordeon-item')].map((it) => ({
      titulo: it.getAttribute('titulo') ?? '',
      abierto: it.hasAttribute('abierto'),
      cuerpo: it.innerHTML,
    }));

    const clase = 'acordeon' + (exclusivo ? ' acordeon--exclusivo' : '');
    this.innerHTML =
      `<div class="${clase}">` +
      items
        .map(
          (i) =>
            `<div class="acordeon__item${i.abierto ? ' acordeon__item--abierto' : ''}">` +
            `<button class="acordeon__titulo" type="button">${i.titulo}</button>` +
            `<div class="acordeon__contenido"><div class="acordeon__cuerpo">${i.cuerpo}</div></div>` +
            `</div>`
        )
        .join('') +
      `</div>`;

    this.addEventListener('click', (e) => {
      const titulo = e.target.closest('.acordeon__titulo');
      if (!titulo || !this.contains(titulo)) return;
      const item = titulo.closest('.acordeon__item');
      if (exclusivo) {
        this.querySelectorAll('.acordeon__item--abierto').forEach((i) => {
          if (i !== item) i.classList.remove('acordeon__item--abierto');
        });
      }
      item.classList.toggle('acordeon__item--abierto');
    });
  }
}

if (!customElements.get('esc-acordeon')) {
  customElements.define('esc-acordeon', ESCAcordeon);
}

export { ESCAcordeon, ESCAcordeonItem };
