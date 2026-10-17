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

const state = {
  user: null, lenguaje: "JavaScript", modo: localStorage.getItem("dc_modo") || "dark",
  sonidoBotones: localStorage.getItem("dc_sb") !== "0", xp: 0, nivel: 1,
  logros: JSON.parse(localStorage.getItem("dc_logros")) || []
};

const TODOS_LOS_LOGROS = [
  { id: "hola_clase", titulo: "Hola Clase", fase: 0, desc: "Entrar a una clase" },
  { id: "esqueletico", titulo: "Esquelético", fase: 1, desc: "Fase 1: Completada" },
  { id: "decorista", titulo: "Decorista", fase: 2, desc: "Fase 2: Completada" },
  { id: "experto_backend", titulo: "Maestro del Servidor", fase: 3, desc: "Fase 3: Completada" },
  { id: "guardian", titulo: "Guardián", fase: 4, desc: "Fase 4: Completada" },
  { id: "conector", titulo: "Conector", fase: 5, desc: "Fase 5: Completada" },
  { id: "sin_conexion", titulo: "Sin conexión", fase: 6, desc: "Fase 6: Completada" },
  { id: "manifestante", titulo: "Manifestante", fase: 7, desc: "Fase 7: Completada" },
  { id: "detective", titulo: "Detective", fase: 8, desc: "Fase 8: Completada" },
  { id: "organizador", titulo: "Organizador", fase: 9, desc: "Fase 9: Completada" },
  { id: "explorador", titulo: "Explorador", fase: 10, desc: "Fase 10: Completada" },
  { id: "ciborg", titulo: "Ciborg", fase: 11, desc: "Fase 11: Completada" },
  { id: "hacker", titulo: "Hacker Ético", fase: 12, desc: "Fase 12: Completada" }
];

// NOTIFICACIONES
function mostrarToast(titulo, mensaje, tipo = "error") {
  const container = document.getElementById("notificaciones-container");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  let etiqueta = tipo === "error" ? "[!]" : tipo === "exito" ? "[OK]" : "[LOG]";
  toast.innerHTML = `<div style="font-weight:bold; margin-right:10px; font-family:monospace;">${etiqueta}</div><div><div style="font-weight:bold; font-size:0.9rem;">${titulo}</div><div style="font-size:0.8rem; opacity:0.9;">${mensaje}</div></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 4000);
}

function lanzarError(codigo, mensaje) {
  mostrarToast(`Error ${codigo}`, mensaje, "error");
  reproducirSonido("error");
}

// LOGROS
function desbloquearLogro(idLogro) {
  if (state.logros.includes(idLogro)) return;
  state.logros.push(idLogro);
  localStorage.setItem("dc_logros", JSON.stringify(state.logros));
  const logro = TODOS_LOS_LOGROS.find(l => l.id === idLogro);
  if (logro) {
    mostrarToast("¡Misión Completada!", logro.titulo, "logro");
    lanzarConfeti();
    guardarDatosNube();
  }
  renderizarLogros();
  dibujarMapaMisiones();
}

function renderizarLogros() {
  const container = document.getElementById("lista-logros");
  if (!container) return;
  container.innerHTML = "";
  if (!state.user) { state.logros = []; }

  TODOS_LOS_LOGROS.forEach(logro => {
    const obtenido = state.logros.includes(logro.id);
    const div = document.createElement("div");
    div.className = `logro-card ${obtenido ? 'obtenido' : 'bloqueado'}`;
    const inicial = logro.titulo.charAt(0).toUpperCase();
    
    div.innerHTML = `
      <div class="logro-icono" style="opacity: ${obtenido ? 1 : 0.5};">${inicial}</div>
      <div class="logro-info">
        <strong style="color: ${obtenido ? 'var(--text)' : 'var(--text-2)'};">${logro.titulo}</strong>
        <small>${logro.desc}</small>
      </div>
    `;
    container.appendChild(div);
  });
}

function lanzarConfeti() {
  const container = document.getElementById("confetti-container");
  for (let i = 0; i < 50; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti-pieza");
    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confeti.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(confeti);
    setTimeout(() => confeti.remove(), 3000);
  }
}

// FIRESTORE
async function cargarDatosNube(uid) {
  try {
    const docSnap = await getDoc(doc(db, "usuarios", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      state.xp = data.xp || 0; state.nivel = data.nivel || 1;
      state.logros = data.logros || []; state.modo = data.modo || "dark";
      localStorage.setItem("dc_logros", JSON.stringify(state.logros));
      aplicarModo(state.modo); actualizarPerfil(); dibujarMapaMisiones();
    }
  } catch (e) { lanzarError(500, "Fallo al conectar con el servidor."); }
}

async function guardarDatosNube() {
  if (!state.user) return;
  try {
    await setDoc(doc(db, "usuarios", state.user.uid), {
      xp: state.xp, nivel: state.nivel, lenguaje: state.lenguaje,
      modo: state.modo, logros: state.logros, fechaActualizacion: new Date()
    }, { merge: true });
  } catch (e) { lanzarError(101, "No se pudo guardar el progreso. Estás sin conexión."); }
}

// LOGIN
document.getElementById("btn-google").addEventListener("click", async () => {
  try { await signInWithPopup(auth, provider); reproducirSonido("ok"); } 
  catch (error) { lanzarError(403, "Acceso denegado. No se pudo iniciar sesión."); }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    state.user = user;
    document.getElementById("login-screen").classList.add("oculto");
    cargarDatosNube(user.uid);
  } else {
    state.user = null;
    document.getElementById("login-screen").classList.remove("oculto");
    renderizarLogros();
  }
});

// NAVEGACIÓN
document.querySelectorAll("#menu button").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    const destino = b.dataset.seccion;
    document.querySelectorAll("#menu button").forEach((x) => x.classList.remove("activo"));
    document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
    b.classList.add("activo");
    document.getElementById(destino).classList.add("activa");
  });
});

// SALÓN
document.querySelectorAll(".lang-card").forEach((card) => {
  card.addEventListener("click", () => {
    reproducirSonido("ok");
    entrarSalon(card.dataset.lang);
  });
});

function entrarSalon(lang) {
  state.lenguaje = lang;
  document.getElementById("salon-lenguaje").textContent = `<<< ${lang.toUpperCase()} >>>`;
  document.getElementById("main-header").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
  document.getElementById("salon").classList.add("activa");
  desbloquearLogro("hola_clase");
  guardarDatosNube();
}

function salirSalon() {
  reproducirSonido("click");
  document.getElementById("main-header").style.display = "block";
  document.getElementById("menu").style.display = "flex";
  document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
  document.getElementById("inicio").classList.add("activa");
  document.querySelectorAll("#menu button").forEach((x) => x.classList.remove("activo"));
  document.querySelector('#menu [data-seccion="inicio"]').classList.add("activo");
}

document.querySelectorAll(".salon-tabs button").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    document.querySelectorAll(".salon-tabs button").forEach((x) => x.classList.remove("activo"));
    document.querySelectorAll(".salon-tab").forEach((x) => x.classList.remove("activo"));
    b.classList.add("activo");
    document.getElementById("tab-" + b.dataset.tab).classList.add("activo");
  });
});

// MAPA
function dibujarMapaMisiones() {
  const container = document.getElementById("mapa-misiones-container");
  if (!container) return;
  container.innerHTML = "";

  let siguienteFase = 1;
  for (let i = 1; i <= 12; i++) {
    const logroFase = TODOS_LOS_LOGROS.find(l => l.fase === i);
    if (logroFase && state.logros.includes(logroFase.id)) {
      siguienteFase = i + 1; 
    } else { break; }
  }

  for (let i = 1; i <= 12; i++) {
    const mision = window.mapaMisiones[i];
    const logroFase = TODOS_LOS_LOGROS.find(l => l.fase === i);
    const completada = state.logros.includes(logroFase.id);
    
    const div = document.createElement("div");
    div.className = `nodo-mision ${completada ? 'completada' : ''} ${i === siguienteFase ? 'actual' : ''}`;
    
    if (i === siguienteFase && !completada) div.innerHTML = `<div class="etiqueta-mision">Tu siguiente misión</div>`;

    div.innerHTML += `
      <div class="circulo-mision">${completada ? 'OK' : i}</div>
      <div class="info-mision">
        <strong>Fase ${i}: ${mision.nombre}</strong>
        <small>${completada ? 'Repasar' : 'Pendiente'}</small>
      </div>
    `;

    if (completada || i === siguienteFase) {
      div.style.cursor = "pointer";
      div.onclick = () => iniciarLeccion(i);
    } else {
      div.style.opacity = "0.5";
      div.onclick = () => mostrarToast("Bloqueada", "Completa la misión anterior primero.", "error");
    }
    container.appendChild(div);
  }
}

// MODOS
document.querySelectorAll(".modo-btn").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    state.modo = b.dataset.modo;
    localStorage.setItem("dc_modo", state.modo);
    aplicarModo(state.modo);
    document.querySelectorAll(".modo-btn").forEach((x) => x.classList.remove("activo"));
    b.classList.add("activo");
    guardarDatosNube();
  });
});

function aplicarModo(modo) {
  document.body.classList.remove("light", "dazer");
  if (modo === "light") document.body.classList.add("light");
  if (modo === "dazer") document.body.classList.add("dazer");
  document.querySelectorAll(".modo-btn").forEach((b) => {
    if (b.dataset.modo === modo) b.classList.add("activo");
    else b.classList.remove("activo");
  });
}
aplicarModo(state.modo);

// MÚSICA
let musicaFondo = new Audio();
musicaFondo.loop = true; musicaFondo.volume = 0.3; let musicaActiva = false;
const selectMusica = document.getElementById("select-musica");
if (selectMusica) {
  selectMusica.addEventListener("change", (e) => {
    const nuevaCancion = e.target.value;
    if (nuevaCancion === "") { musicaFondo.pause(); musicaActiva = false; } 
    else {
      musicaFondo.src = nuevaCancion;
      musicaFondo.play().catch(() => lanzarError(400, "Haz clic para permitir el audio."));
      musicaActiva = true;
    }
  });
}

function toggleMusica() {
  if (!selectMusica || selectMusica.value === "") { mostrarToast("Música", "Primero selecciona una canción.", "error"); return; }
  if (musicaActiva) { musicaFondo.pause(); } 
  else { musicaFondo.play().catch(() => lanzarError(400, "Toca de nuevo para dar permiso al audio.")); }
  musicaActiva = !musicaActiva;
}

// SONIDOS Y XP
let audioCtx = null;
function reproducirSonido(tipo) {
  if (!state.sonidoBotones) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (tipo === "error") { osc.frequency.value = 150; osc.type = "sawtooth"; } 
    else { osc.frequency.value = tipo === "ok" ? 880 : 440; osc.type = "sine"; }
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(); osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function ganarXP(cantidad) {
  state.xp += cantidad;
  if (state.xp >= 100) {
    state.xp -= 100; state.nivel++;
    reproducirSonido("ok"); lanzarConfeti();
    setTimeout(() => mostrarToast("¡Nivel Arriba!", `Ahora eres Nivel ${state.nivel}`, "exito"), 500);
  }
  actualizarPerfil(); guardarDatosNube();
}

// LÓGICA DE TEORÍA Y QUIZ
let leccionActual = [], indicePregunta = 0, opcionSeleccionada = null, aciertosLeccion = 0, faseActual = 1;

function iniciarLeccion(faseId) {
  faseActual = faseId;
  const llave = obtenerLlaveTeoria(faseId);
  
  if (!window.teoria || !window.teoria[llave]) {
    mostrarToast("Próximamente", "Esta clase estará disponible pronto.", "error"); return;
  }

  document.getElementById("salon").style.display = "none";
  document.getElementById("teoria-texto").innerHTML = window.teoria[llave];
  document.getElementById("teoria-titulo").textContent = `Fase ${faseId}: ${window.mapaMisiones[faseId].nombre}`;
  document.getElementById("pantalla-teoria").classList.add("activa");
  document.getElementById("pantalla-teoria").style.display = "block";
  document.getElementById("pantalla-leccion").style.display = "none";
  reproducirSonido("click");
}

function irAPractica() {
  reproducirSonido("click");
  document.getElementById("pantalla-teoria").style.display = "none";
  cargarQuiz(faseActual);
}

function obtenerLlaveTeoria(faseId) {
  if (faseId === 1) return "html";
  if (faseId === 2) return "css";
  if (faseId === 3) return "backend";
  if (faseId === 4) return "cyber";
  if (faseId === 5) return "api";
  if (faseId === 6) return "sw";
  if (faseId === 7) return "manifest";
  if (faseId === 8) return "debug";
  if (faseId === 9) return "repo";
  if (faseId === 10) return "files";
  if (faseId === 11) return "ia";
  if (faseId === 12) return "hacking";
  return "";
}

function cargarQuiz(faseId) {
  const llave = obtenerLlaveTeoria(faseId);
  
  if (!window.baseDePreguntas || !window.baseDePreguntas[llave] || window.baseDePreguntas[llave].length === 0) {
    mostrarToast("Sin preguntas", `Aún no hay preguntas para esta fase.`, "error");
    salirLeccion(); return;
  }

  leccionActual = [...window.baseDePreguntas[llave]].sort(() => Math.random() - 0.5).slice(0, 5);
  indicePregunta = 0; aciertosLeccion = 0;
  
  document.getElementById("pantalla-leccion").classList.add("activa");
  document.getElementById("pantalla-leccion").style.display = "block";
  cargarPregunta();
}

function salirLeccion() {
  if (confirm("¿Seguro que quieres salir? Perderás el progreso de esta lección.")) {
    document.getElementById("pantalla-teoria").style.display = "none";
    document.getElementById("pantalla-leccion").style.display = "none";
    document.getElementById("salon").style.display = "block";
  }
}

function cargarPregunta() {
  if (indicePregunta >= leccionActual.length) { terminarLeccion(); return; }
  const p = leccionActual[indicePregunta];
  document.getElementById("leccion-progreso").style.width = `${(indicePregunta / leccionActual.length) * 100}%`;
  document.getElementById("leccion-pregunta").innerHTML = p.pregunta;
  
  const contenedor = document.getElementById("leccion-opciones");
  contenedor.innerHTML = ""; opcionSeleccionada = null;
  
  p.opciones.forEach((opcion, index) => {
    const btn = document.createElement("button");
    btn.className = "opcion-btn";
    btn.textContent = opcion;
    btn.onclick = () => {
      document.querySelectorAll(".opcion-btn").forEach(b => b.classList.remove("seleccionada"));
      btn.classList.add("seleccionada");
      opcionSeleccionada = index;
      document.getElementById("btn-leccion-comprobar").disabled = false;
      reproducirSonido("click");
    };
    contenedor.appendChild(btn);
  });

  document.getElementById("btn-leccion-comprobar").disabled = true;
  document.getElementById("btn-leccion-comprobar").style.display = "block";
  document.getElementById("btn-leccion-siguiente").style.display = "none";
  document.getElementById("leccion-feedback").style.display = "none";
}

function comprobarRespuesta() {
  const p = leccionActual[indicePregunta];
  const esCorrecta = (opcionSeleccionada === p.correcta);
  const botones = document.querySelectorAll(".opcion-btn");
  botones.forEach(b => b.disabled = true);
  document.getElementById("btn-leccion-comprobar").style.display = "none";

  const feedbackDiv = document.getElementById("leccion-feedback");
  const tituloFb = document.getElementById("feedback-titulo");
  
  if (esCorrecta) {
    botones[opcionSeleccionada].classList.add("correcta");
    reproducirSonido("ok");
    feedbackDiv.className = "feedback-container correcto";
    tituloFb.textContent = "¡Correcto! MiniCode dice:";
    aciertosLeccion++; ganarXP(10);
  } else {
    botones[opcionSeleccionada].classList.add("incorrecta");
    botones[p.correcta].classList.add("correcta");
    reproducirSonido("error");
    feedbackDiv.className = "feedback-container incorrecto";
    tituloFb.textContent = "Todavía no. MiniCode dice:";
  }
  document.getElementById("feedback-texto").textContent = p.explicacion;
  feedbackDiv.style.display = "block";
  
  const btnSig = document.getElementById("btn-leccion-siguiente");
  btnSig.style.display = "block";
  btnSig.textContent = "Continuar";
}

function siguientePregunta() { indicePregunta++; cargarPregunta(); }

function terminarLeccion() {
  document.getElementById("pantalla-leccion").style.display = "none";
  document.getElementById("salon").style.display = "block";
  
  const porcentajeAcierto = (aciertosLeccion / leccionActual.length) * 100;

  if (porcentajeAcierto >= 60) {
    const logro = TODOS_LOS_LOGROS.find(l => l.fase === faseActual);
    if (logro) desbloquearLogro(logro.id);
    ganarXP(20);
    mostrarToast("¡Fase Superada!", `Has acertado ${aciertosLeccion} de ${leccionActual.length}.`, "exito");
  } else {
    mostrarToast("Casi lo logras", `Acertaste ${aciertosLeccion} de ${leccionActual.length}. Repasa e intenta de nuevo.`, "error");
  }
  dibujarMapaMisiones();
}

// EDITOR
let editorSalon;
window.addEventListener("load", () => {
  if (typeof ace === "undefined") return;
  editorSalon = ace.edit("editor-salon");
  editorSalon.setTheme("ace/theme/monokai");
  editorSalon.session.setMode("ace/mode/html");
  editorSalon.setValue(`<div style="text-align:center;">\n  <h1 style="color:purple;">¡Hola <DARKCODE>!</h1>\n  <button onclick="alert('Funciona!')">Probar</button>\n</div>`);
  dibujarMapaMisiones();
  renderizarLogros();
});

function ejecutarSalon() {
  const iframe = document.getElementById("preview-salon");
  if (!editorSalon || !iframe) return;
  const codigo = editorSalon.getValue();
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><style>body { font-family: sans-serif; padding: 10px; color: #333; background: #fff; margin: 0; }</style></head><body>${codigo}</body></html>`);
  doc.close();
  ganarXP(5);
}

// PERFIL
function actualizarPerfil() {
  document.getElementById("perfil-nombre").textContent = state.user ? (state.user.displayName || "Usuario") : "Invitado";
  document.getElementById("perfil-email").textContent = state.user ? (state.user.email || "—") : "—";
  document.getElementById("perfil-nivel").textContent = state.nivel;
  document.getElementById("perfil-xp").textContent = state.xp;
  document.getElementById("xp-bar-fill").style.width = `${state.xp}%`;
  renderizarLogros();
}

function cerrarSesion() { signOut(auth).then(() => location.reload()); }

async function borrarMisDatos() {
  if (!state.user) return;
  if (confirm("¿Seguro que quieres borrar TODO tu progreso?")) {
    await deleteDoc(doc(db, "usuarios", state.user.uid));
    localStorage.clear(); location.reload();
  }
}

window.salirSalon = salirSalon;
window.ejecutarSalon = ejecutarSalon;
window.cerrarSesion = cerrarSesion;
window.borrarMisDatos = borrarMisDatos;
window.toggleMusica = toggleMusica;
window.iniciarLeccion = iniciarLeccion;
window.irAPractica = irAPractica;
window.salirLeccion = salirLeccion;
window.comprobarRespuesta = comprobarRespuesta;
window.siguientePregunta = siguientePregunta;
