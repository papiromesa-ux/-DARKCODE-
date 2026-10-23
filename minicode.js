// =====================================================================
// IMPORTACIÓN DE LIBRERÍAS 3D
// =====================================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

// =====================================================================
// COMPONENTE WEB: MINICODE 3D (Etiqueta <darkcode-chibi>)
// =====================================================================
class DarkcodeChibi3D extends HTMLElement {
  
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); 
    this._vrm = null;                    
    this._clock = null;                  
    this._resetTimeout = null;           
  }

  // Al cargar el componente, preparamos la pantalla
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

  // =====================================================================
  // MOTOR 3D: ESCENA, LUCES Y CARGA DEL MODELO
  // =====================================================================
  iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    // 1. Escena y piso para la sombra
    this._scene = new THREE.Scene();
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    this._floor = new THREE.Mesh(planeGeometry, planeMaterial);
    this._floor.rotation.x = -Math.PI / 2;
    this._floor.receiveShadow = true;
    this._scene.add(this._floor);

    // 2. Cámara
    this._camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    
    // 3. Renderizador con calidad gráfica
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(w, h);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.2;
    this.shadowRoot.appendChild(this._renderer.domElement);

    // 4. Luces
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x443355, 1.5); 
    this._scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(2, 5, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512; 
    dirLight.shadow.mapSize.height = 512;
    this._scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 1.5);
    rimLight.position.set(-2, 2, -3);
    this._scene.add(rimLight);

    // 5. Cargar el archivo VRM
    const loaderDiv = this.shadowRoot.getElementById("mc-loader");
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load('./minicode.vrm', (gltf) => {
      const vrm = gltf.userData.vrm;
      
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 
      
      // Arreglar pose de T (Bajar brazos)
      if (vrm.humanoid) {
        const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
        const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');
        if (leftArm) leftArm.rotation.z = 1.2;
        if (rightArm) rightArm.rotation.z = -1.2;
      }

      // Activar sombras en el personaje
      vrm.scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;
      this._clock = new THREE.Clock();

      // Ajustar cámara al tamaño del personaje
      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      
      this._floor.position.y = 0;
      vrm.scene.position.y = -box.min.y;
      
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

  // =====================================================================
  // BUCLE DE ANIMACIÓN (Respiración sutil)
  // =====================================================================
  _animate() {
    requestAnimationFrame(() => this._animate());
    
    if (this._vrm && this._clock) {
      const delta = this._clock.getDelta();
      this._vrm.update(delta);
      
      const time = performance.now();
      const chest = this._vrm.humanoid ? this._vrm.humanoid.getNormalizedBoneNode('chest') : null;
      if (chest) {
        chest.rotation.x = Math.sin(time * 0.002) * 0.02;
      }
    }
    
    if (this._renderer && this._scene && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  }
}

// Registrar la etiqueta <darkcode-chibi>
if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi3D);
}

// =====================================================================
// LÓGICA DE REACCIONES (Caras y movimiento de cabeza)
// =====================================================================
window.actualizarMiniCode = function(estado) {
  const personaje = document.getElementById("darkcode-chibi-quiz") || document.getElementById("darkcode-chibi-bienvenida");
  if (!personaje || !personaje._vrm) return;

  const vrm = personaje._vrm;
  const em = vrm.expressionManager;
  const humanoid = vrm.humanoid;
  const head = humanoid ? humanoid.getNormalizedBoneNode('head') : null;
  const chest = humanoid ? humanoid.getNormalizedBoneNode('chest') : null;

  // Limpiar caras y movimientos
  const resetearPersonaje = () => {
    if (em) {
      ['happy', 'sad', 'sorrow', 'joy', 'angry', 'relaxed', 'surprised', 'blink'].forEach(expr => {
        if (em.getExpression(expr)) em.setValue(expr, 0);
      });
    }
    if (head) head.rotation.set(0, 0, 0);
    if (chest) chest.rotation.set(0, 0, 0);
  };

  resetearPersonaje();
  if (personaje._resetTimeout) clearTimeout(personaje._resetTimeout);

  // REACCIÓN POSITIVA (FELIZ)
  if (estado === 'feliz') {
    const reaccionesFeliz = [
      // Sonríe y asiente levemente
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 0.8);
        if (head) head.rotation.x = 0.1;
      },
      // Sonríe y ladea la cabeza
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 1);
        if (head) { head.rotation.z = 0.15; head.rotation.x = -0.05; }
      }
    ];
    const accionRandom = reaccionesFeliz[Math.floor(Math.random() * reaccionesFeliz.length)];
    accionRandom();

  // REACCIÓN NEGATIVA (TRISTE)
  } else if (estado === 'triste') {
    // Niega con la cabeza de lado a lado
    let vueltas = 0;
    const negar = setInterval(() => {
      if (head) head.rotation.y = vueltas % 2 === 0 ? 0.15 : -0.15;
      vueltas++;
      if (vueltas > 3) { clearInterval(negar); if(head) head.rotation.y = 0; }
    }, 200);
  }

  // Volver a la normalidad después de 2.5 segundos
  if (estado !== 'neutral') {
    personaje._resetTimeout = setTimeout(() => {
      resetearPersonaje();
    }, 2500);
  }
};
