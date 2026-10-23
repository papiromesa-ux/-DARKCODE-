// =====================================================================
// IMPORTACIÓN DE LIBRERÍAS 3D (THREE.JS Y VRM)
// =====================================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';


// =====================================================================
// COMPONENTE WEB: MINICODE 3D (Etiqueta <darkcode-chibi>)
// =====================================================================
class DarkcodeChibi3D extends HTMLElement {
  
  // -------------------------------------------------------------------
  // 1. CONSTRUCTOR: Prepara los contenedores básicos
  // -------------------------------------------------------------------
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Aisla los estilos para que no choquen con la app
    this._vrm = null;                    // Aquí se guardará el modelo 3D
    this._clock = null;                  // Reloj para calcular la animación
    this._resetTimeout = null;           // Temporizador para quitar las caras
  }

  // -------------------------------------------------------------------
  // 2. AL CARGAR EL COMPONENTE: Dibuja el HTML interno y arranca el 3D
  // -------------------------------------------------------------------
  connectedCallback() {
    // Estilos visuales del recuadro donde va el personaje
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

    // Inicia la magia del 3D
    this.iniciarThreeJS();
  }

  // -------------------------------------------------------------------
  // 3. MOTOR 3D: Escena, Cámara, Luces y Carga del VRM
  // -------------------------------------------------------------------
  iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    // --- A. ESCENA Y SUELO ---
    this._scene = new THREE.Scene();
    
    // Un piso invisible para que el personaje proyecte su sombra
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    this._floor = new THREE.Mesh(planeGeometry, planeMaterial);
    this._floor.rotation.x = -Math.PI / 2;
    this._floor.receiveShadow = true;
    this._scene.add(this._floor);

    // --- B. CÁMARA Y RENDERIZADOR ---
    this._camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(w, h);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Configuración de calidad gráfica (Sombras y colores vivos)
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.2;
    
    this.shadowRoot.appendChild(this._renderer.domElement);

    // --- C. LUCES ---
    // Luz general del ambiente (cielo morado y piso oscuro)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x443355, 1.5); 
    this._scene.add(hemiLight);

    // Luz principal blanca (la que genera la sombra)
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(2, 5, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512; 
    dirLight.shadow.mapSize.height = 512;
    this._scene.add(dirLight);

    // Luz de contorno cian (para dar el toque cyberpunk)
    const rimLight = new THREE.DirectionalLight(0x00ffff, 1.5);
    rimLight.position.set(-2, 2, -3);
    this._scene.add(rimLight);

    // --- D. CARGA DEL MODELO VRM ---
    const loaderDiv = this.shadowRoot.getElementById("mc-loader");
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load('./minicode.vrm', (gltf) => {
      const vrm = gltf.userData.vrm;
      
      // Limpieza y ajustes del modelo
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 
      
      // Arreglamos la pose de T (brazos abajo)
      if (vrm.humanoid) {
        const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
        const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');
        if (leftArm) leftArm.rotation.z = 1.2;
        if (rightArm) rightArm.rotation.z = -1.2;
      }

      // Permitir que el personaje proyecte y reciba sombras
      vrm.scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;
      this._clock = new THREE.Clock();

      // Centrar la cámara dependiendo de qué tan alto sea el personaje
      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      
      // Pegar los pies al suelo (posición 0)
      this._floor.position.y = 0;
      vrm.scene.position.y = -box.min.y;
      
      this._camera.position.set(0, size.y * 0.5, size.y * 2.2); 
      this._camera.lookAt(0, size.y * 0.5, 0);
      
      // Ocultar texto de carga y poner la cara neutral
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

  // -------------------------------------------------------------------
  // 4. BUCLE DE ANIMACIÓN: Se ejecuta 60 veces por segundo
  // -------------------------------------------------------------------
  _animate() {
    requestAnimationFrame(() => this._animate());
    
    if (this._vrm && this._clock) {
      const delta = this._clock.getDelta();
      this._vrm.update(delta); // Actualiza físicas internas del VRM
      
      // Animación de respiración: mueve el pecho sutilmente hacia adelante y atrás
      const time = performance.now();
      const chest = this._vrm.humanoid ? this._vrm.humanoid.getNormalizedBoneNode('chest') : null;
      if (chest) {
        chest.rotation.x = Math.sin(time * 0.002) * 0.02;
      }
    }
    
    // Dibuja el fotograma en la pantalla
    if (this._renderer && this._scene && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  }
}


// =====================================================================
// REGISTRO DEL COMPONENTE WEB
// =====================================================================
if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi3D);
}


// =====================================================================
// FUNCIONES GLOBALES (Llamadas desde cerebro.js)
// =====================================================================

// Esta función la llama cerebro.js cuando aciertas o fallas
window.actualizarMiniCode = function(estado) {
  // Busca el personaje en la pantalla del quiz o en la de bienvenida
  const personaje = document.getElementById("darkcode-chibi-quiz") || document.getElementById("darkcode-chibi-bienvenida");
  if (!personaje || !personaje._vrm) return;

  const vrm = personaje._vrm;
  const em = vrm.expressionManager;
  const humanoid = vrm.humanoid;
  const head = humanoid ? humanoid.getNormalizedBoneNode('head') : null;
  const chest = humanoid ? humanoid.getNormalizedBoneNode('chest') : null;

  // Función de ayuda para dejar la cara y los huesos en neutro
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

  // --- REACCIONES POSITIVAS (FELIZ) ---
  if (estado === 'feliz') {
    const reaccionesFeliz = [
      // Opción 1: Sonríe y asiente levemente
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 0.8);
        if (head) head.rotation.x = 0.1;
      },
      // Opción 2: Sonríe y ladea la cabeza
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 1);
        if (head) { head.rotation.z = 0.15; head.rotation.x = -0.05; }
      }
    ];
    const accionRandom = reaccionesFeliz[Math.floor(Math.random() * reaccionesFeliz.length)];
    accionRandom();

  // --- REACCIONES NEGATIVAS (TRISTE) ---
  } else if (estado === 'triste') {
    // Niega con la cabeza de lado a lado
    let vueltas = 0;
    const negar = setInterval(() => {
      if (head) head.rotation.y = vueltas % 2 === 0 ? 0.15 : -0.15;
      vueltas++;
      if (vueltas > 3) { clearInterval(negar); if(head) head.rotation.y = 0; }
    }, 200);
  }

  // Después de 2.5 segundos, vuelve a la normalidad
  if (estado !== 'neutral') {
    personaje._resetTimeout = setTimeout(() => {
      resetearPersonaje();
    }, 2500);
  }
};
