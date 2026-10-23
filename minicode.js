import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

class DarkcodeChibi3D extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._vrm = null;
    this._clock = null;
    this._resetTimeout = null;
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
  if (!personaje || !personaje._vrm) return;

  const vrm = personaje._vrm;
  const em = vrm.expressionManager;
  const humanoid = vrm.humanoid;
  const head = humanoid ? humanoid.getNormalizedBoneNode('head') : null;
  const neck = humanoid ? humanoid.getNormalizedBoneNode('neck') : null;
  const chest = humanoid ? humanoid.getNormalizedBoneNode('chest') : null;

  // Limpiamos todo a su estado neutral
  const resetearPersonaje = () => {
    if (em) {
      ['happy', 'sad', 'sorrow', 'joy', 'angry', 'relaxed', 'surprised', 'blink', 'blinkLeft', 'blinkRight'].forEach(expr => {
        if (em.getExpression(expr)) em.setValue(expr, 0);
      });
    }
    if (head) head.rotation.set(0, 0, 0);
    if (neck) neck.rotation.set(0, 0, 0);
    if (chest) chest.rotation.set(0, 0, 0);
  };

  resetearPersonaje();
  if (personaje._resetTimeout) clearTimeout(personaje._resetTimeout);

  if (estado === 'feliz') {
    const reaccionesFeliz = [
      // POSITIVO 1: Sonrisa y asentir con la cabeza (La que te gustó)
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 0.8);
        if (head) head.rotation.x = 0.1;
      },
      // POSITIVO 2: Sonrisa y ladear la cabeza (La otra que te gustó)
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 1);
        if (head) { head.rotation.z = 0.15; head.rotation.x = -0.05; }
      },
      // POSITIVO 3: Sonrisa doble asentimiento rápido (Variación segura)
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 0.9);
        if (head) {
          head.rotation.x = 0.1;
          setTimeout(() => { if(head) head.rotation.x = 0; }, 150);
          setTimeout(() => { if(head) head.rotation.x = 0.1; }, 300);
        }
      }
    ];
    
    const accionRandom = reaccionesFeliz[Math.floor(Math.random() * reaccionesFeliz.length)];
    accionRandom();

  } else if (estado === 'triste') {
    const reaccionesTriste = [
      // NEGATIVO 1: Negar con la cabeza (La que te gustó)
      () => {
        let vueltas = 0;
        const negar = setInterval(() => {
          if (head) head.rotation.y = vueltas % 2 === 0 ? 0.15 : -0.15;
          vueltas++;
          if (vueltas > 3) { clearInterval(negar); if(head) head.rotation.y = 0; }
        }, 200);
      },
      // NEGATIVO 2: Bajar la cabeza de verdad (Corregido, ahora usa rotación negativa para no ver a Jesús)
      () => {
        if (head) head.rotation.x = -0.15; // El signo negativo hace que mire al piso
        if (neck) neck.rotation.x = -0.1;
        if (chest) chest.rotation.x = 0.1; // Hombros caídos
      },
      // NEGATIVO 3: Suspirar (Solo movimiento de pecho y cabeza, cero cara)
      () => {
        if (chest) chest.rotation.x = 0.15; 
        if (head) head.rotation.x = -0.1;
        // Efecto de "respirar profundo"
        setTimeout(() => { if(chest) chest.rotation.x = 0; }, 1000);
      }
    ];
    
    const accionRandom = reaccionesTriste[Math.floor(Math.random() * reaccionesTriste.length)];
    accionRandom();
  }

  // Volver a la normalidad después de 2 segundos
  if (estado !== 'neutral') {
    personaje._resetTimeout = setTimeout(() => {
      resetearPersonaje();
    }, 2000);
  }
};
