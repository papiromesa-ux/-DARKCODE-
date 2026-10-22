// minicode.js
// Componente visual MiniCode para <DARKCODE>

const estilosMiniCode = `
  :host {
    display: block;
    width: 170px;
    min-width: 170px;
    height: 220px;
    flex: 0 0 170px;
    --mc-accent: var(--accent, #a855f7);
    --mc-card: var(--card, #160a26);
    --mc-text: var(--text, #d4d4d8);
    --mc-purple: #a855f7;
    --mc-green: #4ade80;
    --mc-red: #dc2626;
    --mc-dark: #090311;
  }
  .contenedor { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; overflow: visible; user-select: none; -webkit-user-select: none; }
  .personaje { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; transform-origin: center bottom; animation: entrada 0.45s ease-out both; }
  .personaje.feliz { animation: entrada 0.45s ease-out both, saltoFeliz 0.8s ease-in-out 0.45s 1; }
  .personaje.triste { animation: entrada 0.45s ease-out both, temblorTriste 0.55s ease-in-out 0.45s 1; }
  svg { width: 100%; height: 100%; overflow: visible; display: block; }
  .aura { fill: var(--mc-purple); opacity: 0.16; filter: url(#desenfoque); animation: pulsar 2.2s ease-in-out infinite; }
  .aura.feliz { fill: var(--mc-green); opacity: 0.22; }
  .aura.triste { fill: var(--mc-red); opacity: 0.18; }
  .oreja, .cabeza, .cuello, .cuerpo, .brazo, .pierna { stroke: #050108; stroke-width: 3; stroke-linejoin: round; }
  .oreja, .cabeza { fill: url(#gradienteCabeza); }
  .cuerpo { fill: url(#gradienteCuerpo); }
  .cuello, .brazo, .pierna { fill: #241044; }
  .contorno { fill: none; stroke: var(--mc-purple); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.25s ease; }
  .brillo { fill: none; stroke: rgba(255, 255, 255, 0.52); stroke-width: 2; stroke-linecap: round; opacity: 0.75; }
  .ojo { fill: #ffffff; stroke: #050108; stroke-width: 2; }
  .pupila { fill: var(--mc-purple); transition: fill 0.25s ease; }
  .reflejo { fill: #ffffff; }
  .mejilla { fill: #ff69b4; opacity: 0.72; }
  .boca { fill: none; stroke: var(--mc-purple); stroke-width: 3; stroke-linecap: round; transition: stroke 0.25s ease; }
  .ceja { fill: none; stroke: var(--mc-purple); stroke-width: 3; stroke-linecap: round; transition: stroke 0.25s ease; }
  .antena { fill: none; stroke: var(--mc-purple); stroke-width: 3; stroke-linecap: round; }
  .punta-antena { fill: var(--mc-purple); filter: url(#brillo); }
  .insignia { fill: var(--mc-purple); stroke: #050108; stroke-width: 2; }
  .insignia-texto { fill: #ffffff; font-family: monospace; font-size: 9px; font-weight: 900; text-anchor: middle; }
  .estado-feliz, .estado-triste { opacity: 0; transition: opacity 0.2s ease; }
  .estado-neutral { opacity: 1; transition: opacity 0.2s ease; }
  .particula { fill: var(--mc-purple); opacity: 0; }
  .personaje.feliz .particula-feliz { animation: particulaFeliz 0.9s ease-out 0.2s both; }
  .personaje.triste .particula-triste { animation: particulaTriste 0.8s ease-out 0.2s both; }
  @keyframes entrada { from { opacity: 0; transform: translateY(12px) scale(0.88); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes pulsar { 0%, 100% { transform: scale(0.94); opacity: 0.13; } 50% { transform: scale(1.05); opacity: 0.23; } }
  @keyframes saltoFeliz { 0%, 100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-10px) rotate(-3deg); } 60% { transform: translateY(2px) rotate(3deg); } }
  @keyframes temblorTriste { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px) rotate(-2deg); } 50% { transform: translateX(4px) rotate(2deg); } 75% { transform: translateX(-2px) rotate(-1deg); } }
  @keyframes particulaFeliz { 0% { opacity: 0; transform: translateY(8px) scale(0.5); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-30px) scale(1.1); } }
  @keyframes particulaTriste { 0% { opacity: 0; transform: translateY(-4px) scale(0.5); } 40% { opacity: 0.8; } 100% { opacity: 0; transform: translateY(18px) scale(0.9); } }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
`;

class DarkcodeChibi extends HTMLElement {
  static get observedAttributes() { return ["estado", "tamaño"]; }
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.renderizar(); }
  attributeChangedCallback(nombre, valorAnterior, valorNuevo) {
    if (valorAnterior === valorNuevo) return;
    if (nombre === "tamaño") this.actualizarTamaño();
    if (nombre === "estado") this.actualizarVista();
  }
  obtenerEstado() {
    const estadosValidos = ["neutral", "feliz", "triste"];
    const estado = this.getAttribute("estado") || "neutral";
    return estadosValidos.includes(estado) ? estado : "neutral";
  }
  renderizar() {
    this.shadowRoot.innerHTML = `
      <style>${estilosMiniCode}</style>
      <div class="contenedor" part="contenedor">
        <div class="personaje estado-neutral" part="personaje">
          <svg viewBox="0 0 220 270" role="img" aria-label="MiniCode" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradienteAura" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="currentColor" stop-opacity="0.95"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient>
              <linearGradient id="gradienteCabeza" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#30145c"/><stop offset="45%" stop-color="#160a26"/><stop offset="100%" stop-color="#07020d"/></linearGradient>
              <linearGradient id="gradienteCuerpo" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4c1d95"/><stop offset="55%" stop-color="#241044"/><stop offset="100%" stop-color="#0d0614"/></linearGradient>
              <filter id="desenfoque" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8"/></filter>
              <filter id="brillo" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse class="aura" cx="110" cy="137" rx="82" ry="103" fill="url(#gradienteAura)"/>
            <g class="particulas">
              <circle class="particula particula-feliz" cx="42" cy="68" r="4"/><circle class="particula particula-feliz" cx="180" cy="62" r="3"/><circle class="particula particula-feliz" cx="190" cy="135" r="4"/><circle class="particula particula-feliz" cx="32" cy="145" r="3"/>
              <path class="particula particula-triste" d="M42 76 l5 10 l-10 5 z"/><path class="particula particula-triste" d="M181 76 l5 10 l-10 5 z"/>
            </g>
            <path class="antena" d="M110 35 C110 25 110 18 116 12"/><circle class="punta-antena" cx="118" cy="10" r="5"/>
            <path class="oreja" d="M48 72 L28 49 Q23 43 30 39 L58 50 Z"/><path class="oreja" d="M172 72 L192 49 Q197 43 190 39 L162 50 Z"/>
            <path class="contorno" d="M40 54 L31 47 L51 53" opacity="0.7"/><path class="contorno" d="M180 54 L189 47 L169 53" opacity="0.7"/>
            <path class="cuerpo" d="M71 188 Q110 170 149 188 L166 236 Q110 256 54 236 Z"/>
            <path class="cuello" d="M94 174 L126 174 L130 195 L90 195 Z"/>
            <path class="brazo" d="M69 193 Q49 199 42 220 Q39 229 48 232 Q56 234 61 224 L78 211 Z"/><path class="brazo" d="M151 193 Q171 199 178 220 Q181 229 172 232 Q164 234 159 224 L142 211 Z"/>
            <path class="pierna" d="M79 229 L104 229 L103 253 Q101 261 90 261 L77 261 Q72 258 75 250 Z"/><path class="pierna" d="M116 229 L141 229 L145 250 Q148 258 143 261 L130 261 Q119 261 117 253 Z"/>
            <path class="cabeza" d="M51 94 Q51 57 110 49 Q169 57 169 94 L164 143 Q160 181 110 190 Q60 181 56 143 Z"/>
            <path class="brillo" d="M72 78 Q91 61 114 62" opacity="0.55"/>
            <path class="ceja estado-neutral" d="M76 103 Q87 97 98 103"/><path class="ceja estado-neutral" d="M122 103 Q133 97 144 103"/>
            <ellipse class="ojo" cx="87" cy="120" rx="15" ry="19"/><ellipse class="ojo" cx="133" cy="120" rx="15" ry="19"/>
            <ellipse class="pupila" cx="88" cy="123" rx="7" ry="10"/><ellipse class="pupila" cx="134" cy="123" rx="7" ry="10"/>
            <circle class="reflejo" cx="91" cy="119" r="3"/><circle class="reflejo" cx="137" cy="119" r="3"/>
            <ellipse class="mejilla" cx="68" cy="143" rx="10" ry="5"/><ellipse class="mejilla" cx="152" cy="143" rx="10" ry="5"/>
            <path class="boca estado-neutral" d="M102 151 Q110 156 118 151"/>
            <g class="estado-feliz">
              <path class="ceja" d="M76 106 Q87 96 98 104"/><path class="ceja" d="M122 104 Q133 96 144 106"/>
              <path class="contorno" d="M77 119 Q87 108 97 119" stroke-width="4"/><path class="contorno" d="M123 119 Q133 108 143 119" stroke-width="4"/>
              <path class="boca" d="M96 148 Q110 168 124 148 Q110 158 96 148 Z" fill="var(--mc-green)" stroke="var(--mc-green)"/>
              <circle cx="78" cy="156" r="3" fill="var(--mc-green)"/><circle cx="142" cy="156" r="3" fill="var(--mc-green)"/>
            </g>
            <g class="estado-triste">
              <path class="ceja" d="M76 105 Q87 112 98 106"/><path class="ceja" d="M122 106 Q133 112 144 105"/>
              <path class="boca" d="M98 160 Q110 145 122 160" stroke="var(--mc-red)"/>
              <path d="M87 137 Q87 149 87 156" stroke="#7dd3fc" stroke-width="3" stroke-linecap="round"/>
              <path d="M133 137 Q133 149 133 156" stroke="#7dd3fc" stroke-width="3" stroke-linecap="round"/>
            </g>
            <circle class="insignia" cx="110" cy="205" r="16"/><text class="insignia-texto" x="110" y="209">&lt;/&gt;</text>
            <path class="contorno" d="M86 214 Q110 225 134 214" opacity="0.65"/>
          </svg>
        </div>
      </div>
    `;
    this.actualizarTamaño();
    this.actualizarVista();
  }
  actualizarTamaño() {
    const tamaño = this.getAttribute("tamaño") || "normal";
    if (tamaño === "pequeño") { this.style.width = "110px"; this.style.minWidth = "110px"; this.style.height = "145px"; this.style.flexBasis = "110px"; }
    else if (tamaño === "grande") { this.style.width = "240px"; this.style.minWidth = "240px"; this.style.height = "310px"; this.style.flexBasis = "240px"; }
    else { this.style.width = "170px"; this.style.minWidth = "170px"; this.style.height = "220px"; this.style.flexBasis = "170px"; }
  }
  actualizarVista() {
    if (!this.shadowRoot) return;
    const personaje = this.shadowRoot.querySelector(".personaje");
    const aura = this.shadowRoot.querySelector(".aura");
    const neutral = this.shadowRoot.querySelectorAll(".estado-neutral");
    const feliz = this.shadowRoot.querySelectorAll(".estado-feliz");
    const triste = this.shadowRoot.querySelectorAll(".estado-triste");
    const pupilas = this.shadowRoot.querySelectorAll(".pupila");
    const contornos = this.shadowRoot.querySelectorAll(".contorno");
    const bocas = this.shadowRoot.querySelectorAll(".boca");
    const cejas = this.shadowRoot.querySelectorAll(".ceja");
    const puntaAntena = this.shadowRoot.querySelector(".punta-antena");
    const insignia = this.shadowRoot.querySelector(".insignia");
    if (!personaje) return;
    const estado = this.obtenerEstado();
    personaje.classList.remove("neutral", "feliz", "triste");
    personaje.classList.add(estado);
    neutral.forEach(el => el.style.opacity = estado === "neutral" ? "1" : "0");
    feliz.forEach(el => el.style.opacity = estado === "feliz" ? "1" : "0");
    triste.forEach(el => el.style.opacity = estado === "triste" ? "1" : "0");
    let color = "var(--mc-purple)";
    if (estado === "feliz") color = "var(--mc-green)";
    else if (estado === "triste") color = "var(--mc-red)";
    aura.style.fill = color;
    pupilas.forEach(p => p.style.fill = color);
    contornos.forEach(c => c.style.stroke = color);
    bocas.forEach(b => b.style.stroke = color);
    cejas.forEach(c => c.style.stroke = color);
    puntaAntena.style.fill = color;
    insignia.style.fill = color;
    if (estado === "feliz") { aura.classList.add("feliz"); aura.classList.remove("triste"); }
    else if (estado === "triste") { aura.classList.add("triste"); aura.classList.remove("feliz"); }
    else { aura.classList.remove("feliz", "triste"); }
  }
}

if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi);
}

window.actualizarMiniCode = function(estado) {
  const personaje = document.getElementById("darkcode-chibi-quiz");
  if (!personaje) return;
  const estadosPermitidos = ["neutral", "feliz", "triste"];
  const estadoSeguro = estadosPermitidos.includes(estado) ? estado : "neutral";
  personaje.setAttribute("estado", estadoSeguro);
};
