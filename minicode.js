import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

class DarkcodeChibi3D extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._vrm = null;
    this._mixer = null;
    this._acciones = {}; 
    this._resetTimeout = null;
    this._clock = new THREE.Clock();
    this._lastInteraction = performance.now(); 
    this._isIdle = false;
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

  async iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    this._scene = new THREE.Scene();
    
    // Piso invisible para la sombra
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    this._floor = new THREE.Mesh(planeGeometry, planeMaterial);
    this._floor.rotation.x = -Math.PI / 2;
    this._floor.receiveShadow = true;
    this._scene.add(this._floor);

    this._camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(w, h);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.2;
    
    this.shadowRoot.appendChild(this._renderer.domElement);

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

    const loaderDiv = this.shadowRoot.getElementById("mc-loader");

    const gltfLoader = new GLTFLoader();
    gltfLoader.register((parser) => new VRMLoaderPlugin(parser));
    
    try {
      const gltf = await gltfLoader.loadAsync('./minicode.vrm');
      const vrm = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 

      vrm.scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;

      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      
      // ARREGLO DE FLOTACIÓN: Lo anclamos exactamente al piso
      this._floor.position.y = 0; 
      vrm.scene.position.y = -box.min.y; // Sube o baja el modelo para que los pies toquen el 0
      
      this._camera.position.set(0, size.y * 0.5, size.y * 2.2); 
      this._camera.lookAt(0, size.y * 0.5, 0);

      try {
        if (loaderDiv) loaderDiv.textContent = "CARGANDO ANIMACIONES...";
        this._mixer = new THREE.AnimationMixer(vrm.scene);
        
        const { FBXLoader } = await import('https://esm.sh/three@0.160.0/examples/jsm/loaders/FBXLoader.js');
        const { retargetAnimation } = await import('https://esm.sh/vrm-mixamo-retarget@1.0.3');
        
        const fbxLoader = new FBXLoader();

        // 1. Cargar Negativos
        for (let i = 1; i <= 2; i++) {
          try {
            const fbx = await fbxLoader.loadAsync(`./negativo${i}.fbx`);
            const clip = retargetAnimation(fbx, vrm);
            if (clip) {
              const action = this._mixer.clipAction(clip);
              action.loop = THREE.LoopOnce;
              action.clampWhenFinished = true;
              this._acciones[`negativo${i}`] = action;
            }
          } catch (e) { console.log(`Error negativo${i}.fbx`); }
        }

        // 2. Cargar Neutrales
        for (let i = 1; i <= 5; i++) {
          try {
            const fbx = await fbxLoader.loadAsync(`./neutral${i}.fbx`);
            const clip = retargetAnimation(fbx, vrm);
            if (clip) {
              const action = this._mixer.clipAction(clip);
              if(i === 1) {
                // El neutral1 será la pose base de reposo (en bucle)
                action.loop = THREE.LoopRepeat;
                action.play(); // Se queda activo para siempre
              } else {
                // Los demás son de aburrimiento (se ejecutan una vez)
                action.loop = THREE.LoopOnce;
                action.clampWhenFinished = true;
              }
              this._acciones[`neutral${i}`] = action;
            }
          } catch (e) { console.log(`Error neutral${i}.fbx`); }
        }

      } catch (e) {
        console.warn("Mixamo no cargó, usando pose estática.");
      }

      if (loaderDiv) loaderDiv.style.display = "none";

    } catch (error) {
      console.error('Error VRM:', error);
      if (loaderDiv) {
        loaderDiv.style.backgroundColor = "orange";
        loaderDiv.style.color = "black";
        loaderDiv.textContent = "ERROR AL CARGAR VRM.";
      }
    }

    this._animate();
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    const delta = this._clock.getDelta();
    
    if (this._mixer) this._mixer.update(delta);
    if (this._vrm) this._vrm.update(delta);

    // Lógica del temporizador (10 segundos para aburrirse)
    const ahora = performance.now();
    if (ahora - this._lastInteraction > 10000 && !this._isIdle) {
      this._isIdle = true;
      
      // Buscamos neutrales del 2 al 5 para aburrirse
      const aburridos = Object.keys(this._acciones).filter(k => k.startsWith('neutral') && k !== 'neutral1');
      
      if (aburridos.length > 0) {
        const randomKey = aburridos[Math.floor(Math.random() * aburridos.length)];
        // Hacemos un fade suave del neutral1 al aburrido
        if(this._acciones['neutral1']) this._acciones['neutral1'].fadeOut(0.5);
        this._acciones[randomKey].reset().fadeIn(0.5).play();
        
        // Al terminar, volvemos al neutral1
        setTimeout(() => {
          if(this._acciones[randomKey]) this._acciones[randomKey].fadeOut(0.5);
          if(this._acciones['neutral1']) this._acciones['neutral1'].reset().fadeIn(0.5).play();
          this._isIdle = false;
        }, 3000); // Duración de la animación de aburrimiento
      }
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

  personaje._lastInteraction = performance.now();
  personaje._isIdle = false;

  const vrm = personaje._vrm;
  const em = vrm.expressionManager;
  const humanoid = vrm.humanoid;
  const head = humanoid ? humanoid.getNormalizedBoneNode('head') : null;

  // Función para volver a la pose de reposo
  const volverAlReposo = () => {
    if (em) {
      ['happy', 'sad', 'sorrow', 'joy', 'angry', 'relaxed', 'surprised', 'blink'].forEach(expr => {
        if (em.getExpression(expr)) em.setValue(expr, 0);
      });
    }
    if (head) head.rotation.set(0, 0, 0);
    
    if (personaje._mixer) {
      personaje._mixer.stopAllAction();
      // Volver al idle natural
      if (personaje._acciones['neutral1']) {
        personaje._acciones['neutral1'].reset().play();
      }
    }
  };

  // Detener acciones actuales antes de una nueva reacción
  if (personaje._mixer) personaje._mixer.stopAllAction();
  if (personaje._resetTimeout) clearTimeout(personaje._resetTimeout);

  if (estado === 'feliz') {
    const reaccionesFeliz = [
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 0.8);
        if (head) head.rotation.x = 0.1;
      },
      () => {
        if (em && em.getExpression('happy')) em.setValue('happy', 1);
        if (head) { head.rotation.z = 0.15; head.rotation.x = -0.05; }
      }
    ];
    const accionRandom = reaccionesFeliz[Math.floor(Math.random() * reaccionesFeliz.length)];
    accionRandom();

  } else if (estado === 'triste') {
    const opciones = [];
    if (personaje._acciones['negativo1']) opciones.push('negativo1');
    if (personaje._acciones['negativo2']) opciones.push('negativo2');

    if (opciones.length > 0) {
      const elegido = opciones[Math.floor(Math.random() * opciones.length)];
      personaje._acciones[elegido].reset().play();
    } else {
      let vueltas = 0;
      const negar = setInterval(() => {
        if (head) head.rotation.y = vueltas % 2 === 0 ? 0.15 : -0.15;
        vueltas++;
        if (vueltas > 3) { clearInterval(negar); if(head) head.rotation.y = 0; }
      }, 200);
    }
  }

  if (estado !== 'neutral') {
    personaje._resetTimeout = setTimeout(() => {
      volverAlReposo();
    }, 3000);
  } else {
    volverAlReposo();
  }
};
