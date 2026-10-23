class DarkcodeChibi3D extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._vrm = null;
    this._clock = null;
  }

  async connectedCallback() {
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
          border: 2px dashed red;
        }
        .loader {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          color: #a855f7; font-family: monospace; font-size: 10px;
          text-align: center; padding: 10px; z-index: 10;
        }
      </style>
      <div class="loader" id="mc-loader">CONECTANDO A THREE.JS...</div>
    `;

    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
      const { GLTFLoader } = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js');
      const { VRMLoaderPlugin, VRMUtils } = await import('https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.0.0/lib/three-vrm.module.js');
      
      this.iniciarThreeJS(THREE, GLTFLoader, VRMLoaderPlugin, VRMUtils);
    } catch (e) {
      const l = this.shadowRoot.getElementById("mc-loader");
      if (l) {
        l.style.color = "red";
        l.textContent = "ERROR DE RED: No se pudo cargar Three.js";
      }
    }
  }

  iniciarThreeJS(THREE, GLTFLoader, VRMLoaderPlugin, VRMUtils) {
    const w = this.clientWidth || 170;
    const h = this.clientHeight || 220;

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    this._camera.position.set(0, 1.3, 2.5);

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setSize(w, h);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.shadowRoot.appendChild(this._renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this._scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    dirLight.position.set(2, 4, 3);
    this._scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 2);
    rimLight.position.set(-2, 2, -3);
    this._scene.add(rimLight);

    const loaderDiv = this.shadowRoot.getElementById("mc-loader");
    if (loaderDiv) loaderDiv.textContent = "BUSCANDO MINICODE.VRM...";

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load('./minicode.vrm', (gltf) => {
      const vrm = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryVertices(vrm.scene);
      vrm.scene.rotation.y = Math.PI; 
      
      this._scene.add(vrm.scene);
      this._vrm = vrm;
      this._clock = new THREE.Clock();

      const box = new THREE.Box3().setFromObject(vrm.scene);
      const size = box.getSize(new THREE.Vector3());
      this._camera.position.set(0, size.y * 0.65, size.y * 1.6);
      
      if (loaderDiv) loaderDiv.style.display = "none";
      if (window.actualizarMiniCode) window.actualizarMiniCode(this.getAttribute("estado") || "neutral");

    }, (xhr) => {
      if (loaderDiv && xhr.total > 0) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loaderDiv.textContent = "CARGANDO: " + pct + "%";
      }
    }, (error) => {
      console.error('Error VRM:', error);
      if (loaderDiv) {
        loaderDiv.style.color = "red";
        loaderDiv.textContent = "ERROR: Revisa que minicode.vrm esté en GitHub.";
      }
    });

    this._animate(THREE);
  }

  _animate(THREE) {
    requestAnimationFrame(() => this._animate(THREE));
    if (this._vrm && this._clock) {
      const delta = this._clock.getDelta();
      this._vrm.update(delta);
      const tiempo = performance.now() * 0.002;
      this._vrm.scene.position.y = Math.sin(tiempo) * 0.02;
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
      em.setValue('happy', 0); em.setValue('sad', 0);
      if (estado === 'feliz') {
        if (em.getExpression('happy')) em.setValue('happy', 1); else if (em.getExpression('joy')) em.setValue('joy', 1);
      } else if (estado === 'triste') {
        if (em.getExpression('sad')) em.setValue('sad', 1); else if (em.getExpression('sorrow')) em.setValue('sorrow', 1);
      }
    }
  }
};
