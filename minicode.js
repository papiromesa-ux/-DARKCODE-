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
    --mc-purple: #a855f7;
    --mc-green: #4ade80;
    --mc-red: #dc2626;
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
    color: var(--mc-purple); /* El color base para el neón */
  }

  .personaje.feliz { animation: entrada 0.45s ease-out both, saltoFeliz 0.8s ease-in-out 0.45s 1; color: var(--mc-green); }
  .personaje.triste { animation: entrada 0.45s ease-out both, temblorTriste 0.55s ease-in-out 0.45s 1; color: var(--mc-red); }
  
  svg { width: 100%; height: 100%; overflow: visible; display: block; }
  
  /* Aura de fondo */
  .aura { fill: currentColor; opacity: 0.15; filter: url(#desenfoque); animation: pulsar 2.2s ease-in-out infinite; }
  
  /* Rellenos sólidos para que no parezca hueco */
  .cuerpo-fill { fill: #1e1235; stroke: #000; stroke-width: 2; }
  .cabeza-fill { fill: #150c25; stroke: #000; stroke-width: 2; }
  .visor-fill { fill: #05020a; stroke: currentColor; stroke-width: 2; }
  
  /* Líneas de neón que cambian de color */
  .neon { fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; filter: url(#brillo); transition: stroke 0.25s ease; }
  .neon-fino { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.25s ease; }
  .detalle-brillo { fill: currentColor; filter: url(#brillo); transition: fill 0.25s ease; }
  
  /* Opacidad de los estados */
  .estado-feliz, .estado-triste { opacity: 0; transition: opacity 0.2s ease; }
  .estado-neutral { opacity: 1; transition: opacity 0.2s ease; }

  .particula { fill: currentColor; opacity: 0; filter: url(#brillo); }
  .personaje.feliz .particula-feliz { animation: particulaFeliz 0.9s ease-out 0.2s both; }
  .personaje.triste .particula-triste { animation: particulaTriste 0.8s ease-out 0.2s both; }

  @keyframes entrada { from { opacity: 0; transform: translateY(12px) scale(0.88); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes pulsar { 0%, 100% { transform: scale(0.95); opacity: 0.12; } 50% { transform: scale(1.05); opacity: 0.2; } }
  @keyframes saltoFeliz { 0%, 100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-10px) rotate(-2deg); } 60% { transform: translateY(2px) rotate(2deg); } }
  @keyframes temblorTriste { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px) rotate(-1deg); } 50% { transform: translateX(4px) rotate(1deg); } 75% { transform: translateX(-2px) rotate(0deg); } }
  @keyframes particulaFeliz { 0% { opacity: 0; transform: translateY(8px) scale(0.5); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-30px) scale(1); } }
  @keyframes particulaTriste { 0% { opacity: 0; transform: translateY(-4px) scale(0.5); } 40% { opacity: 0.8; } 100% { opacity: 0; transform: translateY(18px) scale(0.8); } }
`;

class DarkcodeChibi extends HTMLElement {
  static get observedAttributes() { return ["estado", "tamaño"]; }
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.renderizar(); }
  
  attributeChangedCallback(nombre, anterior, nuevo) {
    if (anterior === nuevo) return;
    if (nombre === "tamaño") this.actualizarTamaño();
    if (nombre === "estado") this.actualizarVista();
  }
  
  obtenerEstado() {
    const validos = ["neutral", "feliz", "triste"];
    const actual = this.getAttribute("estado") || "neutral";
    return validos.includes(actual) ? actual : "neutral";
  }

  renderizar() {
    this.shadowRoot.innerHTML = `
      <style>${estilosMiniCode}</style>
      <div class="contenedor">
        <div class="personaje estado-neutral">
          <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="desenfoque" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
              <filter id="brillo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <!-- Aura -->
            <ellipse class="aura" cx="100" cy="130" rx="75" ry="95" />

            <!-- Partículas -->
            <g class="particulas">
              <circle class="particula particula-feliz" cx="30" cy="60" r="3"/>
              <circle class="particula particula-feliz" cx="170" cy="70" r="4"/>
              <path class="particula particula-triste" d="M30 80 l4 8 l-8 4 z"/>
            </g>

            <!-- Cuerpo Sólido (Chaqueta) -->
            <path class="cuerpo-fill" d="M 60 180 Q 100 165 140 180 L 155 235 Q 100 250 45 235 Z" />
            <path class="neon" d="M 60 180 Q 100 165 140 180 L 155 235 Q 100 250 45 235 Z" />

            <!-- Brazos -->
            <path class="cuerpo-fill" d="M 65 185 Q 35 195 30 220 Q 30 230 40 230 Q 50 225 55 215 L 75 195 Z" />
            <path class="neon" d="M 65 185 Q 35 195 30 220" />
            <path class="cuerpo-fill" d="M 135 185 Q 165 195 170 220 Q 170 230 160 230 Q 150 225 145 215 L 125 195 Z" />
            <path class="neon" d="M 135 185 Q 165 195 170 220" />

            <!-- Cremallera y Detalles -->
            <path class="neon-fino" d="M 100 180 L 100 235" stroke-dasharray="3 4"/>
            <polygon class="detalle-brillo" points="100,195 106,205 100,215 94,205" />

            <!-- Cabeza (Capucha Sólida) -->
            <path class="cabeza-fill" d="M 50 90 Q 50 30 100 25 Q 150 30 150 90 Q 150 150 100 165 Q 50 150 50 90 Z" />
            <path class="neon" d="M 50 90 Q 50 30 100 25 Q 150 30 150 90 Q 150 150 100 165 Q 50 150 50 90 Z" />

            <!-- Orejas Puntiagudas -->
            <path class="cabeza-fill" d="M 55 70 L 20 40 L 65 50 Z" />
            <path class="neon" d="M 55 70 L 20 40 L 65 50 Z" />
            <path class="cabeza-fill" d="M 145 70 L 180 40 L 135 50 Z" />
            <path class="neon" d="M 145 70 L 180 40 L 135 50 Z" />

            <!-- Diamante Frente -->
            <polygon class="detalle-brillo" points="100,35 105,45 100,55 95,45" />

            <!-- Visor Oscuro (La cara) -->
            <ellipse class="visor-fill" cx="100" cy="105" rx="38" ry="28" />
            <ellipse class="neon-fino" cx="100" cy="105" rx="38" ry="28" opacity="0.6"/>

            <!-- Cara NEUTRAL (< >) -->
            <g class="estado-neutral">
              <polyline class="neon" points="75,95 85,105 75,115" />
              <polyline class="neon" points="125,95 115,105 125,115" />
              <path class="neon" d="M 92 120 Q 100 125 108 120" />
            </g>

            <!-- Cara FELIZ (^ ^) -->
            <g class="estado-feliz">
              <polyline class="neon" points="75,115 85,100 95,115" stroke-width="4"/>
              <polyline class="neon" points="105,115 115,100 125,115" stroke-width="4"/>
              <path class="neon" d="M 85 120 Q 100 135 115 120" />
            </g>

            <!-- Cara TRISTE (> <) -->
            <g class="estado-triste">
              <polyline class="neon" points="75,100 85,110 75,120" stroke-width="4"/>
              <polyline class="neon" points="125,100 115,110 125,120" stroke-width="4"/>
              <path class="neon" d="M 90 125 Q 100 115 110 125" />
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
    if (tamaño === "pequeño") { this.style.width = "110px"; this.style.height = "145px"; }
    else if (tamaño === "grande") { this.style.width = "240px"; this.style.height = "310px"; }
    else { this.style.width = "170px"; this.style.height = "220px"; }
  }

  actualizarVista() {
    if (!this.shadowRoot) return;
    const personaje = this.shadowRoot.querySelector(".personaje");
    const neutros = this.shadowRoot.querySelectorAll(".estado-neutral");
    const felices = this.shadowRoot.querySelectorAll(".estado-feliz");
    const tristes = this.shadowRoot.querySelectorAll(".estado-triste");

    if (!personaje) return;
    const estado = this.obtenerEstado();

    personaje.classList.remove("neutral", "feliz", "triste");
    personaje.classList.add(estado);

    neutros.forEach(el => el.style.opacity = estado === "neutral" ? "1" : "0");
    felices.forEach(el => el.style.opacity = estado === "feliz" ? "1" : "0");
    tristes.forEach(el => el.style.opacity = estado === "triste" ? "1" : "0");
  }
}

if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi);
}

window.actualizarMiniCode = function(estado) {
  const personaje = document.getElementById("darkcode-chibi-quiz");
  if (!personaje) return;
  personaje.setAttribute("estado", estado);
};
