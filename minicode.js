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
          background: rgba(0,0,0,0.9); color: #00ff00;
          font-family: monospace; font-size: 9px; text-align: left;
          z-index: 20; padding: 4px; line-height: 1.2;
          pointer-events: none;
          white-space: pre-wrap;
        }
      </style>
      <div class="loader" id="mc-loader">CARGANDO...</div>
      <div class="debug" id="mc-debug">Iniciando...</div>
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

      if (debugDiv) debugDiv.textContent = "VRM listo. Probando neutral1...";

      try {
        if (loaderDiv) loaderDiv.textContent = "PROBANDO ANIMACION...";
        this._mixer = new THREE.AnimationMixer(vrm.scene);
        
        // Usamos CDN directo de jsdelivr en lugar de esm.sh
        const { FBXLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FBXLoader.js');
        const { retargetAnimation } = await import('https://cdn.jsdelivr.net/npm/vrm-mixamo-retarget@1.0.3/dist/vrm-mixamo-retarget.esm.js');
        
        const fbxLoader = new FBXLoader();

        const nombre = 'neutral1';
        let msg = "";
        
        try {
          msg += `1. Bajando ${nombre}.fbx...\n`;
          if (debugDiv) debugDiv.textContent = msg;
          
          const fbx = await fbxLoader.loadAsync(`./${nombre}.fbx`);
          
          msg += `2. FBX tiene ${fbx.animations.length} animaciones.\n`;
          if (debugDiv) debugDiv.textContent = msg;

          if (fbx.animations.length > 0) {
             msg += `3. Track names: ${fbx.animations[0].tracks[0].name}\n`;
             if (debugDiv) debugDiv.textContent = msg;
          }
          
          msg += `4. Haciendo retarget...\n`;
          if (debugDiv) debugDiv.textContent = msg;
          
          const clip = retargetAnimation(fbx, vrm);
          
          if (clip) {
             msg += `5. Retarget OK. Tracks: ${clip.tracks.length}\n`;
             if (debugDiv) debugDiv.textContent = msg;
             
             if (clip.tracks.length > 0) {
               const action = this._mixer.clipAction(clip);
               action.loop = THREE.LoopRepeat;
               action.play();
               msg += `6. REPRODUCIENDO!\n`;
               if (debugDiv) debugDiv.textContent = msg;
             }
          } else {
             msg += `5. Retarget devolvio NULL.\n`;
             if (debugDiv) debugDiv.textContent = msg;
          }
          
        } catch (e) { 
          msg += `ERROR: ${e.message}\n`;
          if (debugDiv) debugDiv.textContent = msg;
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
    
    if (this._renderer && this._scene && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  }
}

if (!customElements.get("darkcode-chibi")) {
  customElements.define("darkcode-chibi", DarkcodeChibi3D);
}

window.actualizarMiniCode = function(estado) {
  // Para esta prueba, no hacemos nada aqui
};
