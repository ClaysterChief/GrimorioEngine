/* ================================================
   Grimorio Engine — ESC Labs · v2.0
   js/grimorio.js · ES6 vanilla · sin bundler
   ================================================ */

/* ================================================
   ESCCarrusel — Carrusel de slides
   ================================================ */
class ESCCarrusel {
  constructor(el) {
    this.el = el;
    if (!this.el) return;
    this.pista = this.el.querySelector('.carrusel__pista');
    this.items = this.el.querySelectorAll('.carrusel__item');
    this.puntosEl = this.el.querySelector('.carrusel__puntos');
    this.total = this.items.length;
    this.actual = 0;
    this.puntos = [];
    this._generarPuntos();
    this.el.querySelectorAll('.carrusel__btn').forEach(btn => {
      btn.addEventListener('click', () => this.ir(this.actual + parseInt(btn.dataset.dir)));
    });
    this._actualizar();
  }
  _generarPuntos() {
    if (!this.puntosEl) return;
    for (let i = 0; i < this.total; i++) {
      const p = document.createElement('button');
      p.className = 'carrusel__punto';
      p.setAttribute('aria-label', 'Slide ' + (i + 1));
      p.addEventListener('click', () => this.ir(i));
      this.puntosEl.appendChild(p);
      this.puntos.push(p);
    }
  }
  ir(idx) {
    this.actual = Math.max(0, Math.min(this.total - 1, idx));
    this._actualizar();
  }
  _actualizar() {
    const w = this.items[0]?.offsetWidth || 0;
    this.pista.style.transform = `translateX(-${this.actual * w}px)`;
    this.items.forEach((item, i) => {
      const wasActive = item.classList.contains('carrusel__item--activo');
      const isActive = i === this.actual;
      item.classList.toggle('carrusel__item--activo', isActive);
      // Re-trigger entrance animation on newly-active item
      if (isActive && !wasActive) {
        item.querySelectorAll(':scope > *').forEach(child => {
          child.style.animation = 'none';
          void child.offsetWidth;
          child.style.animation = '';
        });
      }
    });
    this.puntos.forEach((p, i) => p.classList.toggle('carrusel__punto--activo', i === this.actual));
    this.el.querySelectorAll('.carrusel__btn').forEach(btn => {
      const dir = parseInt(btn.dataset.dir);
      btn.disabled = (dir < 0 && this.actual === 0) || (dir > 0 && this.actual === this.total - 1);
    });
  }
}

/* ================================================
   Formulario multi-paso — lógica dinámica (N pasos)
   ================================================ */
function iniciarFormPasos() {
  document.querySelectorAll('.formulario-pasos').forEach(form => {
    const pista = form.querySelector('.formulario-pasos__pista');
    const panels = form.querySelectorAll('.formulario-pasos__panel');
    const inds = form.querySelectorAll('.formulario-pasos__paso-ind');
    const conectors = form.querySelectorAll('.formulario-pasos__conector');
    const total = panels.length;
    if (!pista || total < 2) return;

    // Set widths dynamically
    pista.style.width = (total * 100) + '%';
    panels.forEach(p => { p.style.width = (100 / total) + '%'; });

    function irA(n) {
      const stepPct = 100 / total;
      pista.style.transform = `translateX(-${n * stepPct}%)`;
      inds.forEach((ind, i) => ind.classList.toggle('formulario-pasos__paso-ind--activo', i === n));
      conectors.forEach((c, i) => c.classList.toggle('formulario-pasos__conector--activo', i < n));
    }

    let paso = 0;
    form.querySelectorAll('[data-paso-sig]').forEach(btn =>
      btn.addEventListener('click', () => { if (paso < total - 1) irA(++paso); })
    );
    form.querySelectorAll('[data-paso-ant]').forEach(btn =>
      btn.addEventListener('click', () => { if (paso > 0) irA(--paso); })
    );
  });
}

/* ================================================
   Tarjeta de crédito — flip + preview en vivo
   Auto-descubre cualquier .tarjeta-credito-form
   ================================================ */
function iniciarTarjetaCredito() {
  document.querySelectorAll('.tarjeta-credito-form').forEach(form => {
    const preview = form.querySelector('.tarjeta-credito');
    if (!preview) return;

    const numInput = form.querySelector('[data-tc="numero"]');
    const nomInput = form.querySelector('[data-tc="nombre"]');
    const expInput = form.querySelector('[data-tc="exp"]');
    const cvvInput = form.querySelector('[data-tc="cvv"]');

    const numPrev = preview.querySelector('.tarjeta-credito__numero');
    const nomPrev = preview.querySelector('.tarjeta-credito__meta-valor--nombre');
    const expPrev = preview.querySelector('.tarjeta-credito__meta-valor--exp');
    const firmaPrev = preview.querySelector('.tarjeta-credito__firma-texto');
    const cvvPrev = preview.querySelector('.tarjeta-credito__cvv-valor');

    function fmtNumero(v) {
      return v.replace(/\D/g, '').substring(0, 16)
        .replace(/(.{4})/g, '$1 ').trim();
    }
    function numMask(v) {
      const d = v.replace(/\D/g, '');
      const shown = d.substring(0, 4);
      const masked = d.substring(4, 12).replace(/\d/g, '◆');
      const last = d.substring(12, 16);
      const raw = (shown + masked + last).padEnd(16, '◆');
      return raw.replace(/(.{4})/g, '$1 ').trim();
    }

    numInput?.addEventListener('input', e => {
      e.target.value = fmtNumero(e.target.value);
      if (numPrev) numPrev.innerHTML = numMask(e.target.value);
    });
    nomInput?.addEventListener('input', e => {
      const v = e.target.value.toUpperCase() || 'NOMBRE APELLIDO';
      if (nomPrev) nomPrev.textContent = v;
      if (firmaPrev) firmaPrev.textContent = v.toLowerCase();
    });
    expInput?.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
      e.target.value = v;
      if (expPrev) expPrev.textContent = v || 'MM/AA';
    });
    cvvInput?.addEventListener('input', e => {
      if (cvvPrev) cvvPrev.textContent = e.target.value || '◆◆◆';
    });

    // Flip on CVV focus/blur
    cvvInput?.addEventListener('focus', () => preview.classList.add('tarjeta-credito--volteada'));
    cvvInput?.addEventListener('blur', () => preview.classList.remove('tarjeta-credito--volteada'));
  });
}

/* ================================================
   Input de correo — dropdown de dominios
   ================================================ */
function iniciarCorreoInputs() {
  document.querySelectorAll('.formulario-correo').forEach(comp => {
    const btn = comp.querySelector('.formulario-correo__dominio-btn');
    const dropdown = comp.querySelector('.formulario-correo__dropdown');
    const domTxt = comp.querySelector('.formulario-correo__dominio-texto');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      dropdown.classList.toggle('formulario-correo__dropdown--visible', !open);
    });

    comp.querySelectorAll('.formulario-correo__opcion').forEach(op => {
      op.addEventListener('click', () => {
        if (domTxt) domTxt.textContent = op.dataset.dominio;
        btn.setAttribute('aria-expanded', 'false');
        dropdown.classList.remove('formulario-correo__dropdown--visible');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.formulario-correo__dropdown--visible').forEach(d => {
      d.classList.remove('formulario-correo__dropdown--visible');
      const btn = d.previousElementSibling;
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================================================
   Selector de tema — CRT flash + cambio de paleta
   ================================================ */
function iniciarSelectorTema() {
  const flash = document.getElementById('tema-flash');
  const body = document.body;
  const TEMAS = ['cosmos', 'crimson'];

  function setTema(tema) {
    // CRT flash
    if (flash) {
      flash.classList.remove('tema-flash--activo');
      void flash.offsetWidth;
      flash.classList.add('tema-flash--activo');
    }

    setTimeout(() => {
      TEMAS.forEach(t => body.classList.remove(t));
      if (tema !== 'default') body.classList.add(tema);
      localStorage.setItem('grimorio-tema', tema);

      // Sync active state on ALL [data-tema] buttons (nav + section cards)
      document.querySelectorAll('[data-tema]').forEach(b => {
        const isNav = b.classList.contains('nav-temas__btn');
        const isCard = b.classList.contains('selector-tema__opcion');
        if (isNav) b.classList.toggle('nav-temas__btn--activa', b.dataset.tema === tema);
        if (isCard) b.classList.toggle('selector-tema__opcion--activa', b.dataset.tema === tema);
      });
    }, 100);

    if (flash) {
      flash.addEventListener('animationend', () =>
        flash.classList.remove('tema-flash--activo'), { once: true }
      );
    }
  }

  document.querySelectorAll('[data-tema]').forEach(btn => {
    btn.addEventListener('click', () => setTema(btn.dataset.tema));
  });
}

/* ================================================
   Archivo tematizado — mostrar nombre de archivo
   ================================================ */
function iniciarArchivos() {
  document.querySelectorAll('.formulario-archivo-input').forEach(input => {
    input.addEventListener('change', e => {
      const id = input.dataset.nombreId;
      if (id) {
        const display = document.getElementById(id);
        if (display) display.textContent = e.target.files[0]?.name || 'Ningún archivo seleccionado';
      }
    });
  });
}

/* ================================================
   Paginación — auto-descubre cualquier .paginacion
   ================================================ */
function iniciarPaginacion() {
  document.querySelectorAll('.paginacion').forEach(nav => {
    const paginasEl = nav.querySelector('.paginacion__paginas');
    const antBtn = nav.querySelector('.paginacion__btn[data-dir="-1"]');
    const sigBtn = nav.querySelector('.paginacion__btn[data-dir="1"]');
    if (!paginasEl || !antBtn || !sigBtn) return;

    const total = parseInt(nav.dataset.total) || 7;
    let pagActual = 1;

    function render() {
      paginasEl.innerHTML = '';
      for (let i = 1; i <= total; i++) {
        const btn = document.createElement('button');
        btn.className = 'paginacion__pagina' + (i === pagActual ? ' paginacion__pagina--activa' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => { pagActual = i; render(); });
        paginasEl.appendChild(btn);
      }
      antBtn.disabled = pagActual === 1;
      sigBtn.disabled = pagActual === total;
    }

    antBtn.addEventListener('click', () => { if (pagActual > 1) { pagActual--; render(); } });
    sigBtn.addEventListener('click', () => { if (pagActual < total) { pagActual++; render(); } });
    render();
  });
}

/* ================================================
   ESCConsola — Terminal interactiva del framework
   ================================================ */
class ESCConsola {
  constructor(el) {
    this.el = el;
    if (!this.el) return;
    this.pantalla = this.el.querySelector('.consola__pantalla');
    this.input = this.el.querySelector('.consola__input');
    this.form = this.el.querySelector('.consola__form');
    this.history = [];
    this.histIdx = -1;
    this.cmds = {
      help: () => this._help(),
      whoami: () => this._whoami(),
      version: () => this._version(),
      clear: () => this._clear(),
      build: () => this._build(),
      status: () => this._status(),
      grimorio: () => this._grimorio(),
      ls: () => this._ls(),
    };
    this._init();
  }

  _init() {
    this._boot();
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const raw = this.input.value.trim();
      this.input.value = '';
      if (raw) this._exec(raw);
    });
    this.input.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') { e.preventDefault(); this._nav(-1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); this._nav(1); }
    });
  }

  _nav(dir) {
    if (!this.history.length) return;
    this.histIdx = Math.max(-1, Math.min(this.history.length - 1, this.histIdx - dir));
    this.input.value = this.histIdx >= 0 ? this.history[this.history.length - 1 - this.histIdx] : '';
  }

  _boot() {
    [
      ['>> ESC LABS · GRIMORIO ENGINE v2.0', 0, 'consola__linea--ok'],
      ['>> Cargando runtime Dual Signal...', 350, ''],
      ['>> Componentes:    [OK]', 700, 'consola__linea--ok'],
      ['>> Animaciones:    [OK]', 900, 'consola__linea--ok'],
      ['>> Paletas:        [OK]', 1100, 'consola__linea--ok'],
      ['>> Sistema listo. Escribe "help".', 1550, ''],
    ].forEach(([t, ms, cls]) => setTimeout(() => this._print(t, cls), ms));
  }

  _print(text, cls = '') {
    const el = document.createElement('span');
    el.className = 'consola__linea' + (cls ? ' ' + cls : '');
    el.textContent = text;
    this.pantalla.appendChild(el);
    this.pantalla.scrollTop = this.pantalla.scrollHeight;
  }

  _exec(raw) {
    this.history.push(raw);
    this.histIdx = -1;
    this._print('> ' + raw, 'consola__linea--input');
    const cmd = raw.toLowerCase().split(' ')[0];
    (this.cmds[cmd] || (() => this._print('Error: "' + cmd + '" desconocido. Prueba "help".', 'consola__linea--error')))();
  }

  _help() {
    ['Comandos disponibles:',
      '  help      → esta ayuda',
      '  whoami    → identidad del sistema',
      '  version   → versión del engine',
      '  status    → estado de módulos',
      '  build     → secuencia de build',
      '  grimorio  → info del framework',
      '  ls        → lista de componentes',
      '  clear     → limpia la consola',
    ].forEach(l => this._print(l));
  }

  _whoami() {
    this._print('ESC Labs · Evolution in Science & Computing');
    this._print('Entidad: esc-labs-tlaxcala-mx');
    this._print('Acceso: AUTORIZADO', 'consola__linea--ok');
  }

  _version() {
    this._print('Grimorio Engine v2.0.6', 'consola__linea--ok');
    this._print('Runtime: CSS3 + ES6 · Sin dependencias');
    this._print('Paletas: Dual Signal + Cosmos Blue');
  }

  _clear() { this.pantalla.innerHTML = ''; }

  _build() {
    ['[1/5] Variables globales...',
      '[2/5] Reset base...',
      '[3/5] Compilando componentes...',
      '[4/5] Inyectando animaciones PS1...',
      '[5/5] BUILD COMPLETE',
    ].forEach((s, i) => {
      setTimeout(() => this._print(s, i === 4 ? 'consola__linea--ok' : ''), i * 280);
    });
  }

  _status() {
    this._print('Estado de módulos:');
    [['Variables', 'OK'], ['Botones', 'OK'], ['Tarjetas', 'OK'], ['Formularios', 'OK'],
    ['Imágenes', 'OK'], ['Consola', 'ACTIVO'], ['VHS Engine', 'ACTIVO'], ['Responsive', 'PARCIAL'],
    ].forEach(([n, s]) => {
      this._print('  ' + n.padEnd(14) + ' [' + s + ']',
        (s === 'OK' || s === 'ACTIVO') ? 'consola__linea--ok' : '');
    });
  }

  _grimorio() {
    this._print('Grimorio Engine · Framework CSS de ESC Studios');
    this._print('Estética PS1/CRT · Paleta propia · Sin dependencias.');
    this._print('No vendemos tecnología. Resolvemos el problema real.');
    this._print('esclabs.io', 'consola__linea--ok');
  }

  _ls() {
    this._print('Componentes registrados:');
    ['.btn', '.btn-primario', '.btn-accion', '.btn-fantasma', '.btn-pulso',
      '.superficie', '.tarjeta', '.formulario-estandar', '.barra-hp',
      '.separador', '.tagline-item', '.cursor-ps1', '.stat-hud',
      '.ventana', '.consola', '.texto-maquina', '.imagen-efecto', '.vhs-overlay',
    ].forEach(c => this._print('  ' + c));
  }
}

/* ================================================
   Texto máquina — mide el ancho natural con clon oculto
   ================================================ */
function iniciarTextoMaquina() {
  document.querySelectorAll('.texto-maquina').forEach(el => {
    const clone = el.cloneNode(true);
    Object.assign(clone.style, {
      position: 'absolute', visibility: 'hidden', top: '-9999px',
      maxWidth: 'none', animation: 'none', border: 'none'
    });
    document.body.appendChild(clone);
    el.style.setProperty('--text-width', clone.scrollWidth + 'px');
    document.body.removeChild(clone);
  });
}

/* ================================================
   Acordeón — paneles expansibles
   ================================================ */
function iniciarAcordeon() {
  document.querySelectorAll('.acordeon__titulo').forEach(titulo => {
    titulo.addEventListener('click', () => {
      const item = titulo.closest('.acordeon__item');
      const acordeon = item.closest('.acordeon');
      if (acordeon.classList.contains('acordeon--exclusivo')) {
        acordeon.querySelectorAll('.acordeon__item--abierto').forEach(i => {
          if (i !== item) i.classList.remove('acordeon__item--abierto');
        });
      }
      item.classList.toggle('acordeon__item--abierto');
    });
  });
}

/* ================================================
   Toast / Snackbar — notificaciones flotantes
   ================================================ */
const ESCToast = {
  _zona: null,

  _obtenerZona() {
    if (!this._zona) {
      this._zona = document.querySelector('.toast-zona');
      if (!this._zona) {
        this._zona = document.createElement('div');
        this._zona.className = 'toast-zona';
        document.body.appendChild(this._zona);
      }
    }
    return this._zona;
  },

  mostrar(mensaje, tipo = 'info', duracion = 3000) {
    const ICONOS = { info: '◆', ok: '✔', warning: '▲', error: '✖' };
    const zona = this._obtenerZona();
    const toast = document.createElement('div');
    toast.className = `toast toast--${tipo}`;
    toast.innerHTML = `<span class="toast__icono">${ICONOS[tipo] || '◆'}</span><span class="toast__texto">${mensaje}</span>`;
    zona.appendChild(toast);

    const salir = () => {
      toast.classList.add('toast--saliendo');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    };

    setTimeout(salir, duracion);
  }
};

window.ESCToast = ESCToast;

/* ================================================
   Sliders de rango — valor en vivo
   ================================================ */
function iniciarRangos() {
  document.querySelectorAll('.campo-rango').forEach(campo => {
    const input = campo.querySelector('.formulario-rango');
    const valorEl = campo.querySelector('.campo-rango__valor');
    if (!input) return;

    const actualizar = () => {
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const val = parseFloat(input.value) || 0;
      const pct = ((val - min) / (max - min) * 100).toFixed(1) + '%';
      input.style.setProperty('--rango-pct', pct);
      if (valorEl) valorEl.textContent = input.value;
    };

    input.addEventListener('input', actualizar);
    actualizar();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Restaurar paleta guardada antes de renderizar componentes
  const temaGuardado = localStorage.getItem('grimorio-tema');
  if (temaGuardado && temaGuardado !== 'default') {
    document.body.classList.add(temaGuardado);
    // Sincronizar botones activos con el tema restaurado
    document.querySelectorAll('[data-tema]').forEach(b => {
      const isNav = b.classList.contains('nav-temas__btn');
      const isCard = b.classList.contains('selector-tema__opcion');
      if (isNav) b.classList.toggle('nav-temas__btn--activa', b.dataset.tema === temaGuardado);
      if (isCard) b.classList.toggle('selector-tema__opcion--activa', b.dataset.tema === temaGuardado);
    });
  }

  document.querySelectorAll('.consola').forEach(el => new ESCConsola(el));
  iniciarTextoMaquina();
  iniciarFormPasos();
  iniciarTarjetaCredito();
  iniciarArchivos();
  iniciarPaginacion();
  iniciarCorreoInputs();
  iniciarSelectorTema();
  iniciarAcordeon();
  iniciarRangos();
  const carruseles = Array.from(document.querySelectorAll('.carrusel')).map(el => new ESCCarrusel(el));
  window.addEventListener('resize', () => carruseles.forEach(c => c._actualizar()));
});
