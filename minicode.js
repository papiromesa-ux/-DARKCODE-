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

  .contenedor {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
    user-select: none;
    -webkit-user-select: none;
  }

  .personaje {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center bottom;
    animation: entrada 0.45s ease-out both;
  }

  .personaje.feliz { animation: entrada 0.45s ease-out both, saltoFeliz 0.8s ease-in-out 0.45s 1; }
  .personaje.triste { animation: entrada 0.45s ease-out both, temblorTriste 0.55s ease-in-out 0.45s 1; }
  
  svg { width: 100%; height: 100%; overflow: visible; display: block; }
  
  .aura { fill: var(--mc-purple); opacity: 0.15; filter: url(#desenfoque); animation: pulsar 2.2s ease-in-out infinite; }
  .aura.feliz { fill: var(--mc-green); opacity: 0.25; }
  .aura.triste { fill: var(--mc-red); opacity: 0.2; }
  
  /* Estilos base del personaje */
  .cuerpo, .cabeza { stroke: #000; stroke-width: 3; stroke-linejoin: round; }
  .cabeza { fill: #160a26; }
  .cuerpo { fill: #1a0b2e; }
  
  /* Neón del contorno */
  .contorno { fill: none; stroke: var(--mc-purple); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.25s ease; filter: url(#brillo); }
  
  /* Ojos y boca */
  .ojo { fill: none; stroke: var(--mc-purple); stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.25s ease; filter: url(#brillo); }
  .boca { fill: none; stroke: var(--mc-purple); stroke-width: 4; stroke-linecap: round; transition: stroke 0.25s ease; filter: url(#brillo); }
  
  /* Detalles */
  .cremallera { stroke: var(--mc-purple); stroke-width: 2; stroke-dasharray: 3 3; transition: stroke 0.25s ease; }
  .diamante { fill: #fff; stroke: var(--mc-purple); stroke-width: 2; filter: url(#brillo); transition: stroke 0.25s ease; }
  .detalle-cuerpo { fill: none; stroke: var(--mc-purple); stroke-width: 2; opacity: 0.6; transition: stroke 0.25s ease; }
  
  .estado-feliz, .estado-triste { opacity: 0; transition: opacity 0.2s ease; }
  .estado-neutral { opacity: 1; transition: opacity 0.2s ease; }

  .particula { fill: var(--mc-purple); opacity: 0; filter: url(#brillo); }
  .personaje.feliz .particula-feliz { animation: particulaFeliz 0.9s ease-out 0.2s both; }
  .personaje.triste .particula-triste { animation: particulaTriste 0.8s ease-out 0.2s both; }

  @keyframes entrada { from { opacity: 0; transform: translateY(12px) scale(0.88); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes pulsar { 0%, 100% { transform: scale(0.94); opacity: 0.12; } 50% { transform: scale(1.05); opacity: 0.22; } }
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
          
          <!-- SVG REDISEÑADO: CYBER NINJA -->
          <svg viewBox="0 0 200 250" role="img" aria-label="MiniCode Cyber" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradienteAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="currentColor" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
              </radialGradient>
              <filter id="desenfoque" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8"/></filter>
              <filter id="brillo" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <!-- Aura de fondo -->
            <ellipse class="aura" cx="100" cy="130" rx="70" ry="90" fill="url(#gradienteAura)"/>

            <!-- Partículas -->
            <g class="particulas">
              <circle class="particula particula-feliz" cx="30" cy="60" r="4"/>
              <circle class="particula particula-feliz" cx="170" cy="50" r="3"/>
              <path class="particula particula-triste" d="M40 70 l4 8 l-8 4 z"/>
              <path class="particula particula-triste" d="M160 70 l4 8 l-8 4 z"/>
            </g>

            <!-- Cuerpo (Chaqueta) -->
            <path class="cuerpo" d="M60 170 Q100 160 140 170 L155 230 Q100 250 45 230 Z"/>
            <path class="contorno" d="M60 170 Q100 160 140 170 L155 230 Q100 250 45 230 Z"/>
            
            <!-- Brazos -->
            <path class="cuerpo" d="M65 180 Q40 190 35 215 Q33 225 40 225 Q45 225 50 215 L70 195 Z"/>
            <path class="contorno" d="M65 180 Q40 190 35 215"/>
            <path class="cuerpo" d="M135 180 Q160 190 165 215 Q167 225 160 225 Q155 225 150 215 L130 195 Z"/>
            <path class="contorno" d="M135 180 Q160 190 165 215"/>

            <!-- Detalles del cuerpo -->
            <path class="cremallera" d="M100 175 L100 230"/>
            <polygon class="diamante" points="100,185 106,195 100,205 94,195" />
            <path class="detalle-cuerpo" d="M70 210 Q100 220 130 210"/>

            <!-- Cabeza (Capucha puntiaguda) -->
            <path class="cabeza" d="M50 100 Q50 40 100 20 Q150 40 150 100 Q150 160 100 170 Q50 160 50 100 Z"/>
            <path class="contorno" d="M50 100 Q50 40 100 20 Q150 40 150 100 Q150 160 100 170 Q50 160 50 100 Z"/>

            <!-- Orejas de gato (estilo cyber) -->
            <path class="cabeza" d="M50 70 L25 40 L60 50 Z"/>
            <path class="contorno" d="M50 70 L25 40 L60 50 Z"/>
            <path class="cabeza" d="M150 70 L175 40 L140 50 Z"/>
            <path class="contorno" d="M150 70 L175 40 L140 50 Z"/>

            <!-- Diamante en la frente -->
            <polygon class="diamante" points="100,30 105,40 100,50 95,40"/>

            <!-- Visor / Cara -->
            <path class="cabeza" d="M65 90 Q100 80 135 90 Q140 120 100 135 Q60 120 65 90 Z" fill="#050108"/>
            <path class="contorno" d="M65 90 Q100 80 135 90 Q140 120 100 135 Q60 120 65 90 Z" stroke-width="2" opacity="0.5"/>

            <!-- Ojos y Boca NEUTRAL -->
            <g class="estado-neutral">
              <polyline class="ojo" points="75,105 85,112 75,119"/>
              <polyline class="ojo" points="125,105 115,112 125,119"/>
              <path class="boca" d="M90 122 Q100 128 110 122"/>
            </g>

            <!-- Ojos y Boca FELIZ (^ ^) -->
            <g class="estado-feliz">
              <polyline class="ojo" points="75,115 85,100 95,115" stroke="var(--mc-green)"/>
              <polyline class="ojo" points="105,115 115,100 125,115" stroke="var(--mc-green)"/>
              <path class="boca" d="M85 120 Q100 135 115 120" stroke="var(--mc-green)" fill="var(--mc-green)" fill-opacity="0.2"/>
            </g>

            <!-- Ojos y Boca TRISTE (> <) -->
            <g class="estado-triste">
              <polyline class="ojo" points="75,100 85,108 75,116" stroke="var(--mc-red)"/>
              <polyline class="ojo" points="125,100 115,108 125,116" stroke="var(--mc-red)"/>
              <path class="boca" d="M90 128 Q100 118 110 128" stroke="var(--mc-red)"/>
            </g>
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
    const contornos = this.shadowRoot.querySelectorAll(".contorno");
    const cremalleras = this.shadowRoot.querySelectorAll(".cremallera");
    const diamantes = this.shadowRoot.querySelectorAll(".diamante");
    const detalles = this.shadowRoot.querySelectorAll(".detalle-cuerpo");
    
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
    
    // Cambiar el color de los detalles de neón
    contornos.forEach(c => c.style.stroke = color);
    cremalleras.forEach(c => c.style.stroke = color);
    diamantes.forEach(d => d.style.stroke = color);
    detalles.forEach(d => d.style.stroke = color);

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
