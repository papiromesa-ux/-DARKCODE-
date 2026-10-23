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
        .debug {
          position: absolute; bottom: 0; left: 0; width: 100%;
          background: rgba(0,0,0,0.85); color: #00ff00;
          font-family: monospace; font-size: 9px; text-align: center;
          z-index: 20; padding: 4px; line-height: 1.2;
          pointer-events: none;
        }
      </style>
      <div class="loader" id="mc-loader">CARGANDO...</div>
      <div class="debug" id="mc-debug">Iniciando diagnóstico...</div>
    `;

    this.iniciarThreeJS();
  }

  async iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;
    const debugDiv = this.shadowRoot.getElementById("mc-debug");

    this._scene = new THREE.Scene();
    
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

      // Bajar brazos base
      if (vrm.humanoid) {
        const leftUpperArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
        const rightUpperArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');
        if (leftUpperArm) leftUpperArm.rotation.z = 1.2; 
        if (rightUpperArm) rightUpperArm.rotation.z = -1.2;
      }

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
      
      this._floor.position.y = 0; 
      vrm.scene.position.y = -box.min.y; 
      
      this._camera.position.set(0, size.y * 0.5, size.y * 2.2); 
      this._camera.lookAt(0, size.y * 0.5, 0);

      if (debugDiv) debugDiv.textContent = "VRM listo. Iniciando carga de FBX...";

      try {
        if (loaderDiv) loaderDiv.textContent = "CARGANDO ANIMACIONES...";
        this._mixer = new THREE.AnimationMixer(vrm.scene);
        
        const { FBXLoader } = await import('https://esm.sh/three@0.160.0/examples/jsm/loaders/FBXLoader.js');
        const { retargetAnimation } = await import('https://esm.sh/vrm-mixamo-retarget@1.0.3');
        
        const fbxLoader = new FBXLoader();

        const listaArchivos = [
          'negativo1', 'negativo2', 
          'neutral1', 'neutral2', 'neutral3', 'neutral4', 'neutral5'
        ];
        
        let reporteFinal = [];

        for (const nombre of listaArchivos) {
          try {
            if (debugDiv) debugDiv.textContent = `Bajando ${nombre}.fbx...`;
            const fbx = await fbxLoader.loadAsync(`./${nombre}.fbx`);
            
            if (debugDiv) debugDiv.textContent = `Traduciendo ${nombre}.fbx...`;
            const clip = retargetAnimation(fbx, vrm);
            
            if (clip && clip.tracks.length > 0) {
              const action = this._mixer.clipAction(clip);
              
              if (nombre === 'neutral5') {
                action.loop = THREE.LoopRepeat;
                action.play(); // Pose base
              } else {
                action.loop = THREE.LoopOnce;
                action.clampWhenFinished = true;
              }
              
              this._acciones[nombre] = action;
              reporteFinal.push(`${nombre}: OK (${clip.tracks.length} track)`);
            } else {
              reporteFinal.push(`${nombre}: VACIO`);
            }
          } catch (e) { 
            reporteFinal.push(`${nombre}: FALLO`);
          }
          // Pausa de 800ms para que te de tiempo de leer el letrero
          await new Promise(r => setTimeout(r, 800)); 
        }

        if (debugDiv) {
          debugDiv.innerHTML = reporteFinal.join(" | ");
        }

      } catch (e) {
        if (debugDiv) debugDiv.textContent = "Fallo importar libreria Mixamo.";
      }

      if (loaderDiv) loaderDiv.style.display = "none";

    } catch (error) {
      if (debugDiv) debugDiv.textContent = "Fallo VRM.";
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

    // 3 SEGUNDOS DE ESPERA
    const ahora = performance.now();
    if (ahora - this._lastInteraction > 3000 && !this._isIdle) {
      this._isIdle = true;
      
      const aburridos = Object.keys(this._acciones).filter(k => k.startsWith('neutral') && k !== 'neutral5');
      
      if (aburridos.length > 0) {
        const randomKey = aburridos[Math.floor(Math.random() * aburridos.length)];
        if(this._acciones['neutral5']) this._acciones['neutral5'].fadeOut(0.5);
        this._acciones[randomKey].reset().fadeIn(0.5).play();
        
        setTimeout(() => {
          if(this._acciones[randomKey]) this._acciones[randomKey].fadeOut(0.5);
          if(this._acciones['neutral5']) this._acciones['neutral5'].reset().fadeIn(0.5).play();
          this._isIdle = false;
        }, 3000); 
      } else {
        this._isIdle = false;
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
  const personaje = document.getElementById("darkcode-chibi-quiz") || document.getElementById("darkcode-chibi-bienvenida");
  if (!personaje || !personaje._vrm) return;

  personaje._lastInteraction = performance.now();
  personaje._isIdle = false;

  if (personaje._mixer) personaje._mixer.stopAllAction();
  if (personaje._resetTimeout) clearTimeout(personaje._resetTimeout);

  if (estado === 'feliz') {
    const vrm = personaje._vrm;
    const em = vrm.expressionManager;
    const head = vrm.humanoid ? vrm.humanoid.getNormalizedBoneNode('head') : null;
    if (em && em.getExpression('happy')) em.setValue('happy', 0.8);
    if (head) head.rotation.x = 0.1;
    
    setTimeout(() => {
      if (em && em.getExpression('happy')) em.setValue('happy', 0);
      if (head) head.rotation.x = 0;
      if (personaje._acciones['neutral5']) personaje._acciones['neutral5'].reset().play();
    }, 2000);

  } else if (estado === 'triste') {
    const opciones = [];
    if (personaje._acciones['negativo1']) opciones.push('negativo1');
    if (personaje._acciones['negativo2']) opciones.push('negativo2');

    if (opciones.length > 0) {
      const elegido = opciones[Math.floor(Math.random() * opciones.length)];
      personaje._acciones[elegido].reset().play();
    }
  }

  if (estado !== 'neutral') {
    personaje._resetTimeout = setTimeout(() => {
      if (personaje._mixer) personaje._mixer.stopAllAction();
      if (personaje._acciones['neutral5']) personaje._acciones['neutral5'].reset().play();
    }, 3000);
  } else {
    if (personaje._acciones['neutral5']) personaje._acciones['neutral5'].reset().play();
  }
};
