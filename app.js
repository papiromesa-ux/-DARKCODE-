// 1 MODULO PARA NO OLVIDAR MIS ARTEFACTOS \\
// 1 FIREBASE linea de codigo 2\\
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCJLUtvrmiCuGqFu4_gj5P9vH4kUhDa2yA",
  authDomain: "darkcode-3691d.firebaseapp.com",
  projectId: "darkcode-3691d",
  storageBucket: "darkcode-3691d.firebasestorage.app",
  messagingSenderId: "968623196225",
  appId: "1:968623196225:web:e1d97a0d1bef93c34d9ec0",
  measurementId: "G-Y0L9D69KJ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

//  2 JSONS COMPLEJOS Y SISTEMA DE LOGROS A MI LÓGICA linea de codigo 21 \\
const state = {
  user: null, lenguaje: "JavaScript", modo: localStorage.getItem("dc_modo") || "dark",
  sonidoBotones: localStorage.getItem("dc_sb") !== "0", xp: 0, nivel: 1,
  logros: JSON.parse(localStorage.getItem("dc_logros")) || [],
  progreso:{}
};

const TODOS_LOS_LOGROS = [
  { id: "hola_clase", titulo: "Hola Clase", desc: "Entrar a una clase" },
  { id: "esqueletico", titulo: "Esquelético", desc: "Fase 1 HTML: Completada" },
  { id: "decorista", titulo: "Decorista", desc: "Fase 2 CSS: Completada" },
  { id: "persistencia", titulo: "Persistencia", desc: "Entrar muchos días seguidos" },
  { id: "regeneracion", titulo: "Regeneración", desc: "Equivocarse y volver a intentarlo" },
  { id: "flash", titulo: "Flash", desc: "Terminar un Quiz en menos de 1:30" },
  { id: "contrataque", titulo: "Contrataque", desc: "Fallar la mitad y aprobar la otra" },
  { id: "juego_limpio", titulo: "Juego Limpio", desc: "Sacar 100% en un Quiz" },
  { id: "sin_limitantes", titulo: "Sin Limitantes", desc: "Terminar 3 Quizzes en un día" },
  { id: "loco", titulo: "Loco", desc: "Estar en los 6 lenguajes" },
  { id: "desquiciado", titulo: "Desquiciado", desc: "Terminar todos los lenguajes" },
  { id: "chonte", titulo: "Chonte", desc: "Equivocarse en TODO un Quiz" },
  { id: "tarado", titulo: "Tarado pero Elegante", desc: "Fallar todo en Ruby" },
  { id: "mejor_java", titulo: "Mejor hubieras aprendido Java", desc: "Fallar todo en JavaScript" },
  { id: "lanza_tazas", titulo: "Lanza Tazas", desc: "Terminar la mitad de JS" },
  { id: "serpiente", titulo: "Serpiente", desc: "Terminar la mitad de Python" },
  { id: "escupe_agua", titulo: "Escupe Agua", desc: "Terminar casi todo PHP" }
];

// 3 LOGICA DE NOTIFICACIONES linea de codigo 49 \\
function mostrarToast(titulo, mensaje, tipo = "error") {
  const container = document.getElementById("notificaciones-container");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  let etiqueta = tipo === "error" ? "[!]" : tipo === "exito" ? "[OK]" : "[LOG]";
  toast.innerHTML = `<div style="font-weight:bold; margin-right:10px; font-family:monospace;">${etiqueta}</div><div><div style="font-weight:bold; font-size:0.9rem;">${titulo}</div><div style="font-size:0.8rem; opacity:0.9;">${mensaje}</div></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 4000);
}

function lanzarError(codigo, mensaje) { mostrarToast(`Error ${codigo}`, mensaje, "error"); reproducirSonido("error"); }

function reproducirSonido(tipo) {
  if (!state.sonidoBotones) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (tipo === "error") { osc.frequency.value = 150; osc.type = "sawtooth"; } else { osc.frequency.value = tipo === "ok" ? 880 : 440; osc.type = "sine"; }
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

// 4 CONFETI Y ARCHIVO LET linea de código 75 \\
function lanzarConfeti() {
  const container = document.getElementById("confetti-container");
  for (let i = 0; i < 50; i++) {
    const confeti = document.createElement("div"); confeti.classList.add("confeti-pieza");
    confeti.style.left = Math.random() * 100 + "vw"; confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confeti.style.animationDelay = Math.random() * 0.5 + "s"; container.appendChild(confeti);
    setTimeout(() => confeti.remove(), 3000);
  }
}

function desbloquearLogro(idLogro) {
  if (state.logros.includes(idLogro)) return;
  state.logros.push(idLogro);
  localStorage.setItem("dc_logros", JSON.stringify(state.logros));
  const logro = TODOS_LOS_LOGROS.find(l => l.id === idLogro);
  if (logro) { mostrarToast("¡Misión Completada!", logro.titulo, "logro"); lanzarConfeti(); guardarDatosNube(); }
  renderizarLogros();
}

function renderizarLogros() {
  const container = document.getElementById("lista-logros");
  if (!container) return; container.innerHTML = "";
  if (!state.user) { state.logros = []; }
  TODOS_LOS_LOGROS.forEach(logro => {
    const obtenido = state.logros.includes(logro.id);
    const div = document.createElement("div");
    div.className = `logro-card ${obtenido ? 'obtenido' : 'bloqueado'}`;
    const inicial = logro.titulo.charAt(0).toUpperCase();
    div.innerHTML = `<div class="logro-icono" style="opacity: ${obtenido ? 1 : 0.5};">${inicial}</div><div class="logro-info"><strong style="color: ${obtenido ? 'var(--text)' : 'var(--text-2)'};">${logro.titulo}</strong><small>${logro.desc}</small></div>`;
    container.appendChild(div);
  });
}

// 5 NUBE linea de código 109 \\
async function cargarDatosNube(uid) {
  try {
    const docSnap = await getDoc(doc(db, "usuarios", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      state.modo = data.modo || "dark";
      
      if (data.progreso) {
        state.progreso = data.progreso;
      } else {
        const langKey = state.lenguaje.toLowerCase() === "javascript" ? "js" : state.lenguaje.toLowerCase();
        state.progreso = { [langKey]: { xp: data.xp || 0, nivel: data.nivel || 1, logros: data.logros || [], fasesCompletadas: {} } };
      }

      const langKey = state.lenguaje.toLowerCase() === "javascript" ? "js" : state.lenguaje.toLowerCase();
      if (!state.progreso[langKey]) {
        state.progreso[langKey] = { xp: 0, nivel: 1, logros: [], fasesCompletadas: {} };
      }
      
      state.xp = state.progreso[langKey].xp;
      state.nivel = state.progreso[langKey].nivel;
      state.logros = state.progreso[langKey].logros || [];

      if(data.nombre) document.getElementById("input-nombre").value = data.nombre;
      if(data.institucion) document.getElementById("select-institucion").value = data.institucion;
      if(data.foto) document.getElementById("avatar-img").src = data.foto;
      
      aplicarModo(state.modo); actualizarPerfil();
    }
  } catch (e) { console.log("Firebase sin conexión", e); }
}

async function guardarDatosNube() {
  if (!state.user) return;
  try {
    const nombre = document.getElementById("input-nombre")?.value || "";
    const institucion = document.getElementById("select-institucion")?.value || "";
    
    const langKey = state.lenguaje.toLowerCase() === "javascript" ? "js" : state.lenguaje.toLowerCase();
    if (!state.progreso[langKey]) {
      state.progreso[langKey] = { xp: 0, nivel: 1, logros: [], fasesCompletadas: {} };
    }
    
    state.progreso[langKey].xp = state.xp;
    state.progreso[langKey].nivel = state.nivel;
    state.progreso[langKey].logros = state.logros;

    await setDoc(doc(db, "usuarios", state.user.uid), {
      progreso: state.progreso, 
      lenguajeActual: state.lenguaje,
      modo: state.modo, 
      nombre: nombre, 
      institucion: institucion, 
      fechaActualizacion: new Date()
    }, { merge: true });
  } catch (e) { console.log("Error al guardar", e); }
}
// 6 LOGIN SAYKO  linea de codigo 167 sixseven jajaja\\
document.getElementById("btn-google")?.addEventListener("click", async () => {
  try { await signInWithPopup(auth, provider); reproducirSonido("ok"); } catch (error) { lanzarError(403, "Acceso denegado."); }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    state.user = user;
    document.getElementById("login-screen").classList.add("oculto");
    document.getElementById("avatar-img").src = user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    if (!document.getElementById("input-nombre").value) document.getElementById("input-nombre").value = user.displayName || "";
    cargarDatosNube(user.uid);
  } else {
    state.user = null;
    document.getElementById("login-screen").classList.remove("oculto");
    renderizarLogros();
  }
});

// 7 NAVEGADOR linea de código 186\\
window.cambiarSeccion = function(seccion) {
  reproducirSonido("click");
  document.querySelectorAll(".menu-principal button").forEach((x) => x.classList.remove("activo"));
  document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
  document.getElementById("salon").style.display = "none";
  document.getElementById("pantalla-teoria").classList.remove("activa");
  document.getElementById("pantalla-leccion").classList.remove("activa");
  const btn = document.querySelector(`.menu-principal button[data-seccion="${seccion}"]`);
  if(btn) btn.classList.add("activo");
  document.getElementById(seccion).classList.add("activa");
}

window.guardarPerfil = function() { reproducirSonido("ok"); guardarDatosNube(); mostrarToast("Perfil", "Datos guardados correctamente", "exito"); }
window.enviarRecomendacion = function() {
  const txt = document.getElementById("txt-recomendacion").value;
  
  if(txt.trim() === "") { 
    mostrarToast("Aviso", "Escribe algo antes de enviar.", "error"); 
    return; 
  }

  // 8 IDENTIDAD linea de código 208
  const miNumero = "50368405099";
  const nombreAlumno = state.user ? (state.user.displayName || "Alumno de DARKCODE") : "Alumno Anónimo";
  const mensaje = ` ZALGERT ARESIVIR ${nombreAlumno}.\n\nMi recomendación/error en <DARKCODE> es:\n"${txt}"\n\n---\nA FIRMA ZALGERT-FOR-YOU\nDAZER SYSTEM`;
  const url = `https://wa.me/${miNumero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
  
  mostrarToast("¡Gracias!", "Abriendo WhatsApp para enviar tu recomendación.", "exito");
  document.getElementById("txt-recomendacion").value = ""; 
  reproducirSonido("ok");
}

// 9 SELECTOR Y PREGUNTADOR JS línea de código 220 \\
document.querySelectorAll(".lang-card").forEach((card) => {
  card.addEventListener("click", () => { reproducirSonido("ok"); entrarSalon(card.dataset.lang); });
});

function entrarSalon(lang) {
  state.lenguaje = lang;
  document.getElementById("salon-lenguaje").textContent = `<<< ${lang.toUpperCase()} >>>`;
  
  const langKey = lang.toLowerCase() === "javascript" ? "js" : lang.toLowerCase();
  if (!state.progreso[langKey]) state.progreso[langKey] = { xp: 0, nivel: 1, logros: [], fasesCompletadas: {} };
  
  state.xp = state.progreso[langKey].xp;
  state.nivel = state.progreso[langKey].nivel;
  state.logros = state.progreso[langKey].logros || [];
  actualizarPerfil();

  document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
  document.getElementById("main-header").style.display = "none";
  document.querySelector(".menu-principal").style.display = "none";
  
  const salon = document.getElementById("salon"); 
  salon.classList.add("activa"); 
  salon.style.display = "block"; 
  
  desbloquearLogro("hola_clase"); guardarDatosNube(); 
  cargarListaAula(); 
  cargarListaPractica();
}

window.salirSalon = function() {
  reproducirSonido("click");
  document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
  document.getElementById("salon").style.display = "none"; 
  
  document.getElementById("main-header").style.display = "block";
  document.querySelector(".menu-principal").style.display = "flex";
  
  document.getElementById("inicio").classList.add("activa");
  document.querySelectorAll(".menu-principal button").forEach((x) => x.classList.remove("activo"));
  document.querySelector('.menu-principal button[data-seccion="inicio"]').classList.add("activo");
}

document.querySelectorAll(".salon-tabs button").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    document.querySelectorAll(".salon-tabs button").forEach((x) => x.classList.remove("activo"));
    document.querySelectorAll(".salon-tab").forEach((x) => x.classList.remove("activo"));
    b.classList.add("activo"); document.getElementById("tab-" + b.dataset.tab).classList.add("activo");
  });
});

// 10 CEREBRO DE CARGA DE LISTA DE AULA línea de código 272 \\
function cargarListaAula() {
  const container = document.getElementById("aula-contenedor-lista"); if (!container) return; container.innerHTML = "";
  if (!window.teoria) { container.innerHTML = `<p style="color:red;">Error: No se encontró clases.js</p>`; return; }
  
  const modulosComunes = ["html", "css", "cyber", "api", "sw", "manifest", "debug", "repo", "files", "ia", "hacking", "json", "consola"];
  let moduloLenguaje = state.lenguaje.toLowerCase();
  if (moduloLenguaje === "javascript") moduloLenguaje = "js";
  if (moduloLenguaje === "c++") moduloLenguaje = "cpp";
  const modulosPermitidos = [...modulosComunes, moduloLenguaje];

  const nombresBonitos = {
    html: "Los Cimientos (HTML)", css: "El Diseño (CSS)", cyber: "El Escudo (Cyber)", 
    api: "Comunicaciones (API)", sw: "Modo Offline (SW)", manifest: "Identidad (Manifest)", 
    debug: "Laboratorio de Errores (DEPURACIÓN)", repo: "El Lanzamiento (Git)", files: "El Mapa (Archivos)", 
    ia: "Compañero IA", hacking: "Hacker Ético", json: "Datos (JSON)", consola: "La Consola",
    js: "El Núcleo (JavaScript)", php: "El Gigante (PHP)", ruby: "El Elegante (Ruby)", 
    python: "La Serpiente (Python)", c: "La Base (C)", cpp: "Alto Rendimiento (C++)"
  };

  Object.keys(window.teoria).forEach((modulo) => {
    if (modulosPermitidos.includes(modulo)) {
      const btn = document.createElement("button"); btn.className = "boton";
      btn.style.marginBottom = "10px"; btn.style.width = "100%"; btn.style.textAlign = "left";
      const nombre = nombresBonitos[modulo] || modulo.toUpperCase();
      btn.innerHTML = `<strong>${nombre}</strong>`; 
      btn.onclick = () => abrirTeoriaSola(modulo); 
      container.appendChild(btn);
    }
  });
}

function cargarListaPractica() {
  const container = document.getElementById("mapa-misiones-container"); 
  if (!container) return; 
  container.innerHTML = "";
  
  if (!window.baseDePreguntas) {
    container.innerHTML = `<div style="color: #dc2626; padding: 20px; background: var(--card); border-radius: 10px; border: 1px solid #dc2626; text-align: center; margin-top:20px;">
      <p><strong>Error crítico:</strong> No se pudo cargar el archivo <b>quiz.js</b>.</p>
      <p style="font-size: 0.8rem;">Es posible que se haya cortado al copiarlo o que falte una llave <b>};</b> al final.</p>
    </div>`;
    return;
  }
  
  const modulosComunes = ["html", "css", "cyber", "api", "sw", "manifest", "depuracion", "repo", "files", "ia", "hacking", "json", "consola"];
  let moduloLenguaje = state.lenguaje.toLowerCase();
  if (moduloLenguaje === "javascript") moduloLenguaje = "js";
  if (moduloLenguaje === "c++") moduloLenguaje = "cpp";
  const modulosPermitidos = [...modulosComunes, moduloLenguaje];

  const langKey = state.lenguaje.toLowerCase() === "javascript" ? "js" : state.lenguaje.toLowerCase();
  const progresoActual = state.progreso[langKey]?.fasesCompletadas || {};

  Object.keys(window.baseDePreguntas).forEach((modulo) => {
    // TRADUCCIÓN: Si el módulo es 'debug', el quiz se llama 'depuracion'
    const moduloReal = modulo === "debug" ? "depuracion" : modulo;

    if (modulosPermitidos.includes(modulo)) {
      const faseActualNum = progresoActual[moduloReal] || 0;
      const faseString = `fase${faseActualNum + 1}`;
      
      const tieneFase = window.baseDePreguntas[moduloReal] && window.baseDePreguntas[moduloReal][faseString];
      const faseSiguienteString = `fase${faseActualNum + 2}`;
      const hayFaseSiguiente = window.baseDePreguntas[moduloReal] && window.baseDePreguntas[moduloReal][faseSiguienteString];

      const div = document.createElement("div");
      
      let icono = ">";
let textoEstado = `Fase ${faseActualNum + 1}`;

if (!tieneFase && faseActualNum > 0) {
  div.className = "nodo-mision completado";
  icono = "OK";
  textoEstado = "Completado";
} else if (!tieneFase) {
  div.className = "nodo-mision bloqueado";
  icono = "X";
  textoEstado = "Proximamente...";
} else {
  div.className = "nodo-mision actual";
}

      div.innerHTML = `<div class="circulo-mision">${icono}</div><div class="info-mision"><strong>Práctica: ${modulo.toUpperCase()}</strong><small>${textoEstado}</small></div>`;
      
      div.onclick = () => { 
        if (!tieneFase && faseActualNum > 0) {
          mostrarToast("Completado", "Has terminado todas las fases disponibles de este módulo.", "exito");
          return;
        }
        if (!tieneFase) {
          mostrarToast("Bloqueado", "Aún no hay fases para este módulo.", "error");
          return;
        }
        moduloActual = moduloReal; 
        abrirMenuFases(moduloReal)
      };
      container.appendChild(div);
    }
  });
}

// 11 TEORIA línea de código 374 \\
  
function abrirTeoriaSola(moduloKey) {
  if (!window.teoria || !window.teoria[moduloKey]) return;
  moduloActual = moduloKey; 
  document.getElementById("teoria-texto").innerHTML = window.teoria[moduloKey];
  document.getElementById("teoria-titulo").textContent = `Módulo: ${moduloKey.toUpperCase()}`;
  const audioPlayer = document.getElementById("audio-clase"); audioPlayer.src = `./audio${moduloKey}.mp3`;
  document.getElementById("btn-ir-a-practica").style.display = "block";
  
  document.getElementById("salon").style.display = "none"; 
  document.getElementById("pantalla-teoria").classList.add("activa");
  reproducirSonido("click");
}
window.irAPractica = function() {
  reproducirSonido("click"); 
  document.getElementById("pantalla-teoria").classList.remove("activa");
  document.body.style.overflow = "auto"; 

  let moduloReal = moduloActual === "debug" ? "depuracion" : moduloActual;

  document.querySelectorAll(".salon-tabs button").forEach((x) => x.classList.remove("activo"));
  document.querySelectorAll(".salon-tab").forEach((x) => x.classList.remove("activo"));
  document.querySelector('.salon-tabs button[data-tab="practica"]').classList.add("activo");
  document.getElementById("tab-practica").classList.add("activo");

  abrirMenuFases(moduloReal);
}
window.abrirMenuFases = function(modulo) {
  const modal = document.getElementById("modal-fases");
  const contenedor = document.getElementById("fases-botones");
  document.getElementById("fases-titulo").textContent = `Práctica: ${modulo.toUpperCase()}`;
  contenedor.innerHTML = "";

  const fases = ["Fase 1", "Fase 2", "Fase 3"];
  
  fases.forEach((faseTexto, index) => {
    const faseString = `fase${index + 1}`;
    const tieneFase = window.baseDePreguntas[modulo] && window.baseDePreguntas[modulo][faseString];
    
    const btn = document.createElement("button");
    btn.className = "boton";
    btn.style.width = "100%";
    btn.style.padding = "15px 10px";
    btn.style.fontSize = "1rem";
    btn.textContent = faseTexto;
    
    if (!tieneFase) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.background = "#333";
      btn.textContent = `${faseTexto} (Pronto)`;
    } else {
      btn.onclick = () => {
        modal.style.display = "none";
        iniciarSecuenciaFase(modulo, faseString);
      };
    }
    contenedor.appendChild(btn);
  });

  modal.style.display = "flex";
}
// 12 DEEZER STAFF línea de código 437 \\
document.querySelectorAll(".modo-btn").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click"); state.modo = b.dataset.modo; localStorage.setItem("dc_modo", state.modo);
    aplicarModo(state.modo); document.querySelectorAll(".modo-btn").forEach((x) => x.classList.remove("activo"));
    b.classList.add("activo"); guardarDatosNube();
  });
});

function aplicarModo(modo) {
  document.body.classList.remove("light", "dazer");
  if (modo === "light") document.body.classList.add("light");
  if (modo === "dazer") document.body.classList.add("dazer");
  document.querySelectorAll(".modo-btn").forEach((b) => {
    if (b.dataset.modo === modo) b.classList.add("activo"); else b.classList.remove("activo");
  });
}
aplicarModo(state.modo);

const listaRelax = ["./audio1.mp3", "./audio2.mp3", "./audio3.mp3", "./audio4.mp3", "./audio5.mp3", "./audio6.mp3", "./audio7.mp3", "./audio8.mp3", "./audio9.mp3", "./audio10.mp3", "./audio11.mp3", "./audio12.mp3", "./audio13.mp3", "./audio14.mp3", "./audio15.mp3"];
let indiceRelax = 0;
const audioAula = new Audio(listaRelax[indiceRelax]);
audioAula.loop = false; audioAula.volume = 0.2;
audioAula.addEventListener('ended', () => {
  indiceRelax = (indiceRelax + 1) % listaRelax.length; audioAula.src = listaRelax[indiceRelax]; audioAula.play().catch(()=>{});
});

const cancionesSuspenso = ["./audioquiz1.mp3", "./audioquiz2.mp3"];
const audioQuiz = new Audio(); audioQuiz.loop = true; audioQuiz.volume = 0.3;
let musicaFondo = new Audio(); musicaFondo.loop = false; musicaFondo.volume = 0.3; let musicaActiva = false;

const selectMusica = document.getElementById("select-musica");
if (selectMusica) {
  selectMusica.addEventListener("change", (e) => {
    const nuevaCancion = e.target.value;
    if (nuevaCancion === "") { 
      musicaFondo.pause(); musicaActiva = false; 
    } else {
      musicaFondo.src = nuevaCancion; musicaFondo.play().catch(() => console.log("Esperando clic")); 
      musicaActiva = true; audioAula.pause(); 
    }
  });
}

window.toggleMusica = function() {
  if (audioAula.paused) {
    audioAula.play().catch(() => console.log("Esperando clic"));
    mostrarToast("Música", "Reproduciendo música de fondo", "exito");
  } else {
    indiceRelax = (indiceRelax + 1) % listaRelax.length;
    audioAula.src = listaRelax[indiceRelax];
    audioAula.play().catch(() => console.log("Esperando clic"));
    mostrarToast("Música", `Cambiando a la pista ${indiceRelax + 1}`, "exito");
  }
  reproducirSonido("click");
}
function ganarXP(cantidad) {
  state.xp += cantidad;
  if (state.xp >= 100) {
    state.xp -= 100; state.nivel++; reproducirSonido("ok"); lanzarConfeti();
    setTimeout(() => mostrarToast("¡Nivel Arriba!", `Ahora eres Nivel ${state.nivel}`, "exito"), 500);
  }
  actualizarPerfil(); guardarDatosNube();
}

function actualizarPerfil() {
  document.getElementById("perfil-nivel").textContent = state.nivel;
  document.getElementById("perfil-xp").textContent = state.xp;
  document.getElementById("xp-bar-fill").style.width = `${state.xp}%`;
  renderizarLogros();
}

window.cerrarSesion = function() { signOut(auth).then(() => location.reload()); }

// 13 EDITOR ACE línea de código 510 \\
let editorSalon;
window.addEventListener("load", () => {
  if (typeof ace === "undefined") return;
  editorSalon = ace.edit("editor-salon"); editorSalon.setTheme("ace/theme/monokai"); editorSalon.session.setMode("ace/mode/html");
  editorSalon.setValue(`<div style="text-align:center;">\n  <h1 style="color:purple;">¡Hola &lt;DARKCODE&gt;!</h1>\n  <button onclick="alert('Funciona!')">Probar</button>\n</div>`);
  renderizarLogros();
});

window.ejecutarSalon = function() {
  const iframe = document.getElementById("preview-salon"); if (!editorSalon || !iframe) return;
  const codigo = editorSalon.getValue();
  iframe.srcdoc = `<!DOCTYPE html><html><head><style>body { font-family: sans-serif; padding: 10px; color: #333; background: #fff; margin: 0; }</style></head><body>${codigo}</body></html>`;
  ganarXP(5);
}

// 14 SALTADOR INICIADOR ÍNDICE PREGUNTA LAPSO OX línea de código 526\\
let leccionActual = [], indicePregunta = 0, opcionSeleccionada = null, aciertosLeccion = 0, moduloActual = "";
let editorReto = null;

function cargarQuiz(modulo, fase, tipoQuiz) {
  window.tiempoInicioQuiz = Date.now();
  const dataModulo = window.baseDePreguntas[modulo]?.[fase]?.[tipoQuiz];
  
  if (!dataModulo || dataModulo.length === 0) { 
    if (tipoQuiz !== "quiz3") {
      tipoQuizActual = SECUENCIA_QUIZ[SECUENCIA_QUIZ.indexOf(tipoQuiz) + 1];
      cargarQuiz(modulo, fase, tipoQuizActual);
      return;
    } else {
      finalizarFaseCompleta();
      return; 
    }
  }

  let preguntasRaw = dataModulo;
  if (dataModulo.preguntas && Array.isArray(dataModulo.preguntas)) {
    preguntasRaw = dataModulo.preguntas;
  }

  leccionActual = [...preguntasRaw].sort(() => Math.random() - 0.5).slice(0, 3); 
  indicePregunta = 0; 
  aciertosLeccion = 0;
  
  const trackRandom = cancionesSuspenso[Math.floor(Math.random() * cancionesSuspenso.length)];
  audioQuiz.src = trackRandom; audioQuiz.play().catch(e => console.log("Esperando clic"));
  audioAula.pause(); if (musicaActiva && musicaFondo) musicaFondo.pause(); 
  
  document.getElementById("pantalla-leccion").classList.add("activa");
  document.getElementById("contenedor-editor-reto").style.display = "none";
  
  mostrarToast("Evaluación", `Iniciando ${tipoQuiz.toUpperCase()}...`, "info");
  cargarPregunta();
}
function cargarPregunta() {
  if (indicePregunta >= leccionActual.length) { terminarLeccion(); return; }
  const p = leccionActual[indicePregunta];
  document.getElementById("leccion-progreso").style.width = `${((indicePregunta + 1) / leccionActual.length) * 100}%`;
  
  const cara = document.getElementById("minicode-cara"); 
  cara.className = "minicode-face";
  document.getElementById("mc-eye-left").textContent = "<"; 
  document.getElementById("mc-eye-right").textContent = ">";
  
  document.getElementById("leccion-pregunta").innerHTML = p.pregunta || p.instrucciones;
  const contenedor = document.getElementById("leccion-opciones"); contenedor.innerHTML = ""; opcionSeleccionada = null;
  
  if (p.opciones) {
    document.getElementById("btn-leccion-comprobar").disabled = true;
    document.getElementById("contenedor-editor-reto").style.display = "none";

    p.opciones.forEach((opcion, index) => {
      const btn = document.createElement("button"); btn.className = "opcion-btn"; btn.textContent = opcion;
      btn.onclick = () => {
        document.querySelectorAll(".opcion-btn").forEach(b => b.classList.remove("seleccionada"));
        btn.classList.add("seleccionada"); opcionSeleccionada = index;
        document.getElementById("btn-leccion-comprobar").disabled = false; reproducirSonido("click");
      };
      contenedor.appendChild(btn);
    });
  } else if (p.codigoRoto || tipoQuizActual === "quiz3") {
    document.getElementById("contenedor-editor-reto").style.display = "block";
    if(!editorReto) { editorReto = ace.edit("editor-reto"); editorReto.setTheme("ace/theme/monokai"); }
    editorReto.session.setMode("ace/mode/html"); 
    editorReto.setValue(p.codigoRoto || ""); 
    document.getElementById("btn-leccion-comprobar").disabled = false;
  }
  
  document.getElementById("btn-leccion-comprobar").style.display = "block";
  document.getElementById("btn-leccion-siguiente").style.display = "none";
  document.getElementById("leccion-feedback").style.display = "none";
}

window.comprobarRespuesta = function() {
  const p = leccionActual[indicePregunta]; 
  let esCorrecta = false;
  const botones = document.querySelectorAll(".opcion-btn"); 
  botones.forEach(b => b.disabled = true);
  document.getElementById("btn-leccion-comprobar").style.display = "none";
  const feedbackDiv = document.getElementById("leccion-feedback");
  const tituloFb = document.getElementById("feedback-titulo"); 
  const cara = document.getElementById("minicode-cara");
  
  if (p.opciones) {
    esCorrecta = (opcionSeleccionada === p.correcta);
    if (esCorrecta) { botones[opcionSeleccionada].classList.add("correcta"); } 
    else { botones[opcionSeleccionada].classList.add("incorrecta"); botones[p.correcta].classList.add("correcta"); }
  } else if (p.codigoRoto) {
    const respuestaUsuario = editorReto.getValue().trim(); 
    if (p.solucion) {
      const respLimpia = respuestaUsuario.replace(/\s+/g, '').replace(/['"]/g, '').toLowerCase();
      const solLimpia = p.solucion.replace(/\s+/g, '').replace(/['"]/g, '').toLowerCase();
      esCorrecta = respLimpia.includes(solLimpia);
    } else {
      esCorrecta = respuestaUsuario.length > 10; 
    }
  } else if (tipoQuizActual === "quiz3") {
    const respuestaUsuario = editorReto.getValue().trim();
    const tieneEtiquetas = respuestaUsuario.includes("<") && respuestaUsuario.includes(">");
    esCorrecta = respuestaUsuario.length > 20 && tieneEtiquetas;
  }

  if (esCorrecta) {
    reproducirSonido("ok"); feedbackDiv.className = "feedback-container correcto";
    tituloFb.textContent = "¡Correcto! MiniCode dice:"; aciertosLeccion++; ganarXP(10);
    
    cara.className = "minicode-face feliz"; 
    document.getElementById("mc-eye-left").textContent = "^"; 
    document.getElementById("mc-eye-right").textContent = "^";
  } else {
    reproducirSonido("error"); feedbackDiv.className = "feedback-container incorrecto";
    tituloFb.textContent = "Todavía no. MiniCode dice:";
    
    cara.className = "minicode-face triste"; 
    document.getElementById("mc-eye-left").textContent = "<"; 
    document.getElementById("mc-eye-right").textContent = ">";
  }
  
  document.getElementById("feedback-texto").textContent = p.explicacion || p.atajo || "Revisa la teoría.";
  feedbackDiv.style.display = "block";
  
  // LÓGICA DEL BOTÓN CONTINUAR linea de código 651\\
  const btnSig = document.getElementById("btn-leccion-siguiente");
  btnSig.style.display = "block"; 
  btnSig.textContent = "Continuar";
  
  // SaK \\
  btnSig.onclick = function() {
    indicePregunta++;
    if (indicePregunta < leccionActual.length) {
      cargarPregunta();
    } else {
      terminarLeccion();
    }
  };
}
  

window.siguientePregunta = function() { indicePregunta++; cargarPregunta(); }

// LOGICA QUIZ \\
let faseActualString = "";
let tipoQuizActual = ""; 
const SECUENCIA_QUIZ = ["quiz1", "quiz2", "quiz3"];

window.iniciarSecuenciaFase = function(modulo, fase) {
  moduloActual = modulo;
  faseActualString = fase;
  tipoQuizActual = "quiz1";
  cargarQuiz(modulo, fase, tipoQuizActual);
}

function siguienteQuizDeFase() {
  const indexActual = SECUENCIA_QUIZ.indexOf(tipoQuizActual);
  
  if (indexActual < SECUENCIA_QUIZ.length - 1) {
    tipoQuizActual = SECUENCIA_QUIZ[indexActual + 1];
    document.getElementById("pantalla-leccion").classList.remove("activa");
    
    setTimeout(() => {
      const existeSiguiente = window.baseDePreguntas[moduloActual]?.[faseActualString]?.[tipoQuizActual];
      if (existeSiguiente) {
        cargarQuiz(moduloActual, faseActualString, tipoQuizActual);
      } else {
        siguienteQuizDeFase(); 
      }
    }, 1000);
  } else {
    finalizarFaseCompleta();
  }
}

function terminarLeccion() {
  audioQuiz.pause(); audioQuiz.currentTime = 0;
  if (musicaActiva && musicaFondo) { musicaFondo.play().catch(()=>{}); } else { audioAula.play().catch(()=>{}); }
  
  const porcentajeAcierto = (aciertosLeccion / leccionActual.length) * 100;
  
  if (porcentajeAcierto >= 60) {
    ganarXP(20); 
    mostrarToast("¡Superado!", `Has acertado ${aciertosLeccion} de ${leccionActual.length} en ${tipoQuizActual.toUpperCase()}.`, "exito");
    siguienteQuizDeFase();
  } else {
    mostrarToast("Casi lo logras", `Acertaste ${aciertosLeccion} de ${leccionActual.length}. Repasa e intenta de nuevo.`, "error");
    document.getElementById("pantalla-leccion").classList.remove("activa");
    document.getElementById("salon").style.display = "block";
    cargarListaPractica(); 
  }
}

function finalizarFaseCompleta() {
  document.getElementById("pantalla-leccion").classList.remove("activa");
  document.getElementById("salon").style.display = "block";
  
  const langKey = state.lenguaje.toLowerCase() === "javascript" ? "js" : state.lenguaje.toLowerCase();
  if (!state.progreso[langKey].fasesCompletadas) state.progreso[langKey].fasesCompletadas = {};
  
  const numFase = parseInt(faseActualString.replace("fase", ""));
  state.progreso[langKey].fasesCompletadas[moduloActual] = numFase;
  
  guardarDatosNube();
  cargarListaPractica(); 
  
  const faseSiguienteString = `fase${numFase + 1}`;
  const hayFaseSiguiente = window.baseDePreguntas[moduloActual] && window.baseDePreguntas[moduloActual][faseSiguienteString];

  if (!hayFaseSiguiente) {
    mostrarToast("¡Módulo Terminado!", `Has completado todo el contenido disponible de ${moduloActual.toUpperCase()}.`, "logro");
  }
  
  lanzarConfeti();
  mostrarToast("¡Fase Completada!", `Has terminado ${moduloActual.toUpperCase()} ${faseActualString.toUpperCase()}.`, "logro");
  reproducirSonido("ok");

}

// MODAL DE MIERDA Y SISTEMA ANTIPERROS \\
window.abrirModalSalir = function() { document.getElementById("modal-confirmacion").style.display = "flex"; }
window.cerrarModalConfirmacion = function() { document.getElementById("modal-confirmacion").style.display = "none"; }
window.confirmarSalida = function() {
  cerrarModalConfirmacion();
  if(typeof audioQuiz !== 'undefined') { audioQuiz.pause(); audioQuiz.currentTime = 0; }
  if (musicaActiva && musicaFondo) { musicaFondo.play().catch(()=>{}); } else if(typeof audioAula !== 'undefined') { audioAula.play().catch(()=>{}); }
  document.getElementById("pantalla-teoria").classList.remove("activa");
  document.getElementById("pantalla-leccion").classList.remove("activa");
  document.getElementById("salon").style.display = "block";
}

let enExamen = false;

const observerExamen = new MutationObserver(() => {
  const pantallaLeccion = document.getElementById("pantalla-leccion");
  if (pantallaLeccion.classList.contains("activa")) {
    enExamen = true;
  } else {
    enExamen = false;
  }
});
observerExamen.observe(document.getElementById("pantalla-leccion"), { attributes: true, attributeFilter: ["class"] });

document.addEventListener('contextmenu', (event) => {
  if (enExamen) { event.preventDefault(); window.location.href = "bloqueo.html"; }
});

document.addEventListener('dblclick', (event) => {
  if (enExamen) { event.preventDefault(); window.location.href = "bloqueo.html"; }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && enExamen) { window.location.href = "bloqueo.html"; }
});

history.pushState(null, null, location.href);
window.onpopstate = function () {
  if (enExamen) { window.location.href = "bloqueo.html"; }
};

// ==========================================
// 15. ZOOM CON PELLIZCO (PINCH-TO-ZOOM) PARA TEORÍA
// ==========================================
let distanciaInicial = 0;

document.addEventListener("touchstart", function(e) {
  // Si detecta 2 dedos en la pantalla (solo si estamos en la teoría)
  if (e.touches.length === 2 && document.getElementById("pantalla-teoria").classList.contains("activa")) {
    const teoria = document.getElementById("teoria-texto");
    // Calculamos la distancia entre los dos dedos
    distanciaInicial = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    teoria.classList.add("zoom-activo"); // Activa el brillo neón
  }
}, { passive: false });

document.addEventListener("touchmove", function(e) {
  if (e.touches.length === 2 && document.getElementById("pantalla-teoria").classList.contains("activa")) {
    e.preventDefault(); // Evita que la pantalla entera haga zoom (bloquea el zoom nativo)
    
    const teoria = document.getElementById("teoria-texto");
    const distanciaActual = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );

    if (distanciaInicial > 0) {
      // Calculamos la escala (limitada entre 1 y 2.5 para que no se rompa)
      let escala = distanciaActual / distanciaInicial;
      escala = Math.min(Math.max(escala, 1), 2.5); 
      
      // Aplicamos la transformación al texto
      teoria.style.transform = `scale(${escala})`;
    }
  }
}, { passive: false });

document.addEventListener("touchend", function(e) {
  if (e.touches.length < 2) {
    const teoria = document.getElementById("teoria-texto");
    if (teoria) {
      distanciaInicial = 0;
      // Al soltar, quitamos el brillo pero dejamos el texto en el tamaño que el alumno eligió
      setTimeout(() => teoria.classList.remove("zoom-activo"), 500);
    }
  }
});
