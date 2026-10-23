// minicode.js - Componente 3D con Three.js y VRM
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from 'https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.0.0/lib/three-vrm.module.js';

class DarkcodeChibi3D extends HTMLElement {
  static get observedAttributes() { return ["estado", "tamaño"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._vrm = null;
    this._clock = new THREE.Clock();
    this._mounted = false;
  }

  connectedCallback() {
    if (this._mounted) return;
    this._mounted = true;
    this.renderizar();
    this.actualizarTamaño();
    this.iniciarThreeJS();
  }

  attributeChangedCallback(nombre, anterior, nuevo) {
    if (anterior === nuevo) return;
    if (nombre === "tamaño") this.actualizarTamaño();
    if (nombre === "estado" && this._vrm) this.cambiarEmocion(nuevo);
  }

  actualizarTamaño() {
    const tamaño = this.getAttribute("tamaño") || "normal";
    if (tamaño === "pequeño") { this.style.width = "110px"; this.style.height = "145px"; }
    else if (tamaño === "grande") { this.style.width = "240px"; this.style.height = "310px"; }
    else { this.style.width = "170px"; this.style.height = "220px"; }
    
    // Ajustar la cámara si el renderizador ya existe
    if (this._renderer) {
      const w = this.clientWidth || 170;
      const h = this.clientHeight || 220;
      this._camera.aspect = w / h;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(w, h);
    }
  }

  renderizar() {
    // Estilos base para el contenedor 3D
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 170px;
          height: 220px;
          flex-shrink: 0;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: radial-gradient(circle at center, #1a0b2e 0%, #0d0614 100%);
        }
        .loader {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          color: #a855f7; font-family: monospace; font-size: 10px;
          text-align: center; padding: 10px;
        }
      </style>
      <div class="loader" id="mc-loader">CARGANDO MODELO...</div>
    `;
  }

  iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    // Escena
    this._scene = new THREE.Scene();
    
    // Camara
    this._camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    this._camera.position.set(0, 1.3, 2.5);

    // Renderizador
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(w, h);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.shadowRoot.appendChild(this._renderer.domElement);

    // Luces (Estilo Darkcode: Morado y Cian)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this._scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa855f7, 2.5); // Luz Morada principal
    dirLight.position.set(2, 4, 3);
    this._scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 2); // Luz Cian de contorno
    rimLight.position.set(-2, 2, -3);
    this._scene.add(rimLight);

    // Cargar el modelo VRM
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    // Usamos el nombre exacto del archivo
    loader.load('./906902699229463008.vrm', (gltf) => {
      const vrm = gltf.userData.vrm;
      
      // Corregir rotacion si es necesario y quitar huesos innecesarios
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;

      // Encuadrar la camara dependiendo de la altura
      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      this._camera.position.set(0, size.y * 0.65, size.y * 1.6);
      
      // Ocultar el texto de carga
      const loaderDiv = this.shadowRoot.getElementById("mc-loader");
      if (loaderDiv) loaderDiv.style.display = "none";

      // Aplicar estado inicial
      this.cambiarEmocion(this.getAttribute("estado") || "neutral");

    }, undefined, (error) => {
      console.error('Error cargando el VRM:', error);
      const loaderDiv = this.shadowRoot.getElementById("mc-loader");
      if (loaderDiv) loaderDiv.textContent = "ERROR AL CARGAR";
    });

    this._animate();
  }

  cambiarEmocion(estado) {
    if (!this._vrm || !this._vrm.expressionManager) return;
    const em = this._vrm.expressionManager;
    
    // Resetear expresiones
    em.setValue('happy', 0);
    em.setValue('sad', 0);
    em.setValue('relaxed', 0);

    // Aplicar la nueva (VRM 1.0 usa happy/sad, VRM 0.x usa joy/sorrow)
    if (estado === 'feliz') {
      if (em.getExpression('happy')) em.setValue('happy', 1);
      else if (em.getExpression('joy')) em.setValue('joy', 1);
    } else if (estado === 'triste') {
      if (em.getExpression('sad')) em.setValue('sad', 1);
      else if (em.getExpression('sorrow')) em.setValue('sorrow', 1);
    }
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    const delta = this._clock.getDelta();

    if (this._vrm) {
      this._vrm.update(delta); // Actualiza animaciones y fisicas
      
      // Pequeño efecto de respiración flotante
      const tiempo = performance.now() * 0.002;
      this._vrm.scene.position.y = Math.sin(tiempo) * 0.02;
    }

    if (this._renderer && this._scene && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  }
}

// Mantenemos el mismo nombre para no romper index.html ni cerebro.js
if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi3D);
}

window.actualizarMiniCode = function(estado) {
  const personaje = document.getElementById("darkcode-chibi-quiz");
  if (!personaje) return;
  personaje.setAttribute("estado", estado);
};
