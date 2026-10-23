import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

class DarkcodeChibi3D extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._vrm = null;
    this._clock = null;
  }

  connectedCallback() {
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
          color: #a855f7; font-family: monospace; font-size: 11px; font-weight: bold;
          text-align: center; padding: 10px; z-index: 10;
        }
      </style>
      <div class="loader" id="mc-loader">CARGANDO...</div>
    `;

    this.iniciarThreeJS();
  }

  iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(w, h);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.shadowRoot.appendChild(this._renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); 
    this._scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(2, 4, 3);
    this._scene.add(dirLight);

    const loaderDiv = this.shadowRoot.getElementById("mc-loader");

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load('./minicode.vrm', (gltf) => {
      const vrm = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 
      
      if (vrm.humanoid) {
        const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
        const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');
        if (leftArm) leftArm.rotation.z = 1.2;
        if (rightArm) rightArm.rotation.z = -1.2;
      }
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;
      this._clock = new THREE.Clock();

      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      
      this._camera.position.set(0, size.y * 0.5, size.y * 2.2); 
      this._camera.lookAt(0, size.y * 0.5, 0);
      
      if (loaderDiv) loaderDiv.style.display = "none";
      if (window.actualizarMiniCode) window.actualizarMiniCode(this.getAttribute("estado") || "neutral");

    }, undefined, (error) => {
      console.error('Error VRM:', error);
      if (loaderDiv) {
        loaderDiv.style.backgroundColor = "orange";
        loaderDiv.style.color = "black";
        loaderDiv.textContent = "ERROR AL CARGAR VRM.";
      }
    });

    this._animate();
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    
    if (this._vrm && this._clock) {
      const delta = this._clock.getDelta();
      this._vrm.update(delta);
      
      // Solo respiración sutil, cero giros de pastel
      const time = performance.now();
      this._vrm.scene.position.y = Math.sin(time * 0.002) * 0.01;
    }

    if (this._renderer && this._scene && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  }
}

if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi3D);
}

window.actualizarMiniCode = function(estado) {
  const personaje = document.getElementById("darkcode-chibi-quiz");
  if (personaje) {
    personaje.setAttribute("estado", estado);
    
    if (personaje._vrm && personaje._vrm.expressionManager) {
      const em = personaje._vrm.expressionManager;
      
      // Limpiamos caras
      ['happy', 'sad', 'sorrow', 'joy', 'angry'].forEach(expr => {
         if (em.getExpression(expr)) em.setValue(expr, 0);
      });

      if (estado === 'feliz') {
        if (em.getExpression('happy')) em.setValue('happy', 1); 
        else if (em.getExpression('joy')) em.setValue('joy', 1);
      } else if (estado === 'triste') {
        // CARA DE ENOJADO (Si el modelo no tiene enojo, bajamos el sad para que no dé miedo)
        if (em.getExpression('angry')) {
            em.setValue('angry', 1);
        } else if (em.getExpression('sad')) {
            em.setValue('sad', 0.4); 
        }
      }
    }
  }
};
