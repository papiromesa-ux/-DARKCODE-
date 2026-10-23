import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { loadMixamoAnimation } from './mixamo.js';

class Alexander3D extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._vrm = null;
    this._mixer = null;
    this._clock = new THREE.Clock();
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block; width: 170px; height: 220px; flex-shrink: 0;
          position: relative; border-radius: 12px; overflow: hidden;
          background: radial-gradient(circle at center, #1a0b2e 0%, #0d0614 100%);
        }
        .loader {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          color: #a855f7; font-family: monospace; font-size: 11px; font-weight: bold; z-index: 10;
        }
      </style>
      <div class="loader" id="mc-loader">CARGANDO ALEXANDER...</div>
    `;
    this.iniciarThreeJS();
  }

  async iniciarThreeJS() {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    this._scene = new THREE.Scene();
    const planeGeo = new THREE.PlaneGeometry(10, 10);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    this._floor = new THREE.Mesh(planeGeo, planeMat);
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
    this.shadowRoot.appendChild(this._renderer.domElement);

    this._scene.add(new THREE.HemisphereLight(0xffffff, 0x443355, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(2, 5, 3);
    dirLight.castShadow = true;
    this._scene.add(dirLight);

    const loaderDiv = this.shadowRoot.getElementById("mc-loader");
    const gltfLoader = new GLTFLoader();
    gltfLoader.register((parser) => new VRMLoaderPlugin(parser));
    
    try {
      const gltf = await gltfLoader.loadAsync('./Alexander.vrm');
      const vrm = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 

      if (vrm.humanoid) {
        const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm');
        const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm');
        if (leftArm) leftArm.rotation.z = 1.2; 
        if (rightArm) rightArm.rotation.z = -1.2;
      }

      vrm.scene.traverse((obj) => {
        if (obj.isMesh) { obj.castShadow = true; obj.receiveShadow = true; }
      });
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;
      this._mixer = new THREE.AnimationMixer(vrm.scene);

      if (loaderDiv) loaderDiv.textContent = "CARGANDO ANIMACION...";
      const fbxLoader = new FBXLoader();
      
      try {
        const fbx = await fbxLoader.loadAsync('./neutral5.fbx');
        const clip = loadMixamoAnimation(fbx, vrm);
        if (clip) {
          clip.tracks = clip.tracks.filter(track => track.name.includes('quaternion'));
          this._mixer.clipAction(clip).play(); 
        }
      } catch (e) {
        console.warn("Mixamo falló, usando pose base.");
      }

      vrm.scene.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      this._floor.position.y = 0; 
      vrm.scene.position.y = -box.min.y; 
      
      this._camera.position.set(center.x, size.y * 0.5, size.y * 2.2); 
      this._camera.lookAt(center.x, size.y * 0.5, center.z);

      if (loaderDiv) loaderDiv.style.display = "none";

    } catch (error) {
      if (loaderDiv) { loaderDiv.textContent = "ERROR AL CARGAR ALEXANDER"; }
    }

    this._animate();
  }

  _animate() {
    requestAnimationFrame(() => this._animate());
    const delta = this._clock.getDelta();
    if (this._mixer) this._mixer.update(delta);
    if (this._vrm) this._vrm.update(delta);
    if (this._renderer) this._renderer.render(this._scene, this._camera);
  }
}

customElements.define("darkcode-alexander", Alexander3D);

window.actualizarAlexander = function(estado) {
  const p = document.getElementById("personaje-alexander") || document.getElementById("personaje-quiz");
  if (!p || !p._vrm) return;
  const em = p._vrm.expressionManager;
  const head = p._vrm.humanoid ? p._vrm.humanoid.getNormalizedBoneNode('head') : null;

  if (em) ['happy', 'sad', 'sorrow'].forEach(e => { if(em.getExpression(e)) em.setValue(e, 0); });
  if (head) head.rotation.set(0, 0, 0);

  if (estado === 'feliz' && em && em.getExpression('happy')) em.setValue('happy', 0.8);
  if (estado === 'triste' && head) {
    let v = 0;
    const timer = setInterval(() => { head.rotation.y = v % 2 === 0 ? 0.15 : -0.15; v++; if(v>3){clearInterval(timer); head.rotation.y=0;} }, 200);
  }
  if (estado !== 'neutral') {
    setTimeout(() => {
      if (em) ['happy', 'sad', 'sorrow'].forEach(e => { if(em.getExpression(e)) em.setValue(e, 0); });
      if (head) head.rotation.set(0,0,0);
    }, 2500);
  }
};
