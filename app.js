// ================================
// <DARKCODE> - lógica principal
// ================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

// --- 1. Configuración de Firebase ---
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
const provider = new GoogleAuthProvider();

// --- 2. Service Worker ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

// --- 3. Estado de la app ---
const state = {
  user: null,
  lenguaje: localStorage.getItem("dc_lang") || null,
  modo: localStorage.getItem("dc_modo") || "dark",
  sonidoBotones: localStorage.getItem("dc_sb") !== "0",
  sonidoFondo: localStorage.getItem("dc_sf") === "1",
  animaciones: localStorage.getItem("dc_anim") !== "0",
  xp: parseInt(localStorage.getItem("dc_xp")) || 0,
  nivel: parseInt(localStorage.getItem("dc_nivel")) || 1
};

// --- 4. Login con Google ---
const loginScreen = document.getElementById("login-screen");
const btnGoogle = document.getElementById("btn-google");

btnGoogle.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    reproducirSonido("ok");
  } catch (error) {
    console.error("Error en el login:", error);
    alert("No se pudo iniciar sesión.");
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    state.user = user;
    loginScreen.classList.add("oculto");
    actualizarPerfil();
  } else {
    state.user = null;
    loginScreen.classList.remove("oculto");
  }
});

function cerrarSesion() {
  signOut(auth).then(() => location.reload());
}

// --- 5. Navegación principal ---
const botones = document.querySelectorAll("#menu button");
const secciones = document.querySelectorAll(".seccion");

botones.forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    const destino = b.dataset.seccion;
    botones.forEach((x) => x.classList.remove("activo"));
    secciones.forEach((s) => s.classList.remove("activa"));
    b.classList.add("activo");
    document.getElementById(destino).classList.add("activa");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// --- 6. Selección de lenguaje ---
document.querySelectorAll(".lang-card").forEach((card) => {
  card.addEventListener("click", () => {
    reproducirSonido("ok");
    const lang = card.dataset.lang;
    entrarSalon(lang);
  });
});

function entrarSalon(lang) {
  state.lenguaje = lang;
  localStorage.setItem("dc_lang", lang);
  document.getElementById("salon-lenguaje").textContent = `<<< ${lang.toUpperCase()} >>>`;
  document.getElementById("salon-bienvenida").textContent = `Bienvenido a autoclase de ${lang}`;
  document.getElementById("salon-lang-text").textContent = lang;
  document.getElementById("perfil-lang").textContent = lang;
  actualizarPerfil();

  botones.forEach((x) => x.classList.remove("activo"));
  secciones.forEach((s) => s.classList.remove("activa"));
  document.getElementById("salon").classList.add("activa");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function salirSalon() {
  reproducirSonido("click");
  secciones.forEach((s) => s.classList.remove("activa"));
  document.getElementById("inicio").classList.add("activa");
  botones.forEach((x) => x.classList.remove("activo"));
  document.querySelector('#menu [data-seccion="inicio"]').classList.add("activo");
}

// --- 7. Tabs del salón ---
document.querySelectorAll(".salon-tabs button").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    const tab = b.dataset.tab;
    document.querySelectorAll(".salon-tabs button").forEach((x) => x.classList.remove("activo"));
    document.querySelectorAll(".salon-tab").forEach((x) => x.classList.remove("activo"));
    b.classList.add("activo");
    document.getElementById("tab-" + tab).classList.add("activo");
  });
});

// --- 8. Modos de color ---
document.querySelectorAll(".modo-btn").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    const modo = b.dataset.modo;
    state.modo = modo;
    localStorage.setItem("dc_modo", modo);
    aplicarModo(modo);
    document.querySelectorAll(".modo-btn").forEach((x) => x.classList.remove("activo"));
    b.classList.add("activo");
  });
});

function aplicarModo(modo) {
  document.body.classList.remove("light", "dazer");
  if (modo === "light") document.body.classList.add("light");
  if (modo === "dazer") document.body.classList.add("dazer");
}
aplicarModo(state.modo);
document.querySelectorAll(".modo-btn").forEach((b) => {
  if (b.dataset.modo === state.modo) b.classList.add("activo");
  else b.classList.remove("activo");
});

// --- 9. Configuración (switches) ---
const sonidoBotonesChk = document.getElementById("sonido-botones");
const sonidoFondoChk = document.getElementById("sonido-fondo");

sonidoBotonesChk.checked = state.sonidoBotones;
sonidoFondoChk.checked = state.sonidoFondo;

sonidoBotonesChk.addEventListener("change", (e) => {
  state.sonidoBotones = e.target.checked;
  localStorage.setItem("dc_sb", state.sonidoBotones ? "1" : "0");
});
sonidoFondoChk.addEventListener("change", (e) => {
  state.sonidoFondo = e.target.checked;
  localStorage.setItem("dc_sf", state.sonidoFondo ? "1" : "0");
  if (state.sonidoFondo) iniciarSonidoFondo(); else detenerSonidoFondo();
});

// --- 10. Sonidos ---
let audioCtx = null;
let fondoOsc = null;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function reproducirSonido(tipo) {
  if (!state.sonidoBotones) return;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = tipo === "ok" ? 880 : 440;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

function iniciarSonidoFondo() {
  try {
    const ctx = getAudio();
    if (fondoOsc) return;
    fondoOsc = ctx.createOscillator();
    const gain = ctx.createGain();
    fondoOsc.type = "sine";
    fondoOsc.frequency.value = 110;
    gain.gain.value = 0.02;
    fondoOsc.connect(gain);
    gain.connect(ctx.destination);
    fondoOsc.start();
  } catch (e) {}
}

function detenerSonidoFondo() {
  if (fondoOsc) { try { fondoOsc.stop(); } catch(e){} fondoOsc = null; }
}

// --- 11. Editores Ace ---
let editorPractica, editorDepura, editorSalon;

window.addEventListener("load", () => {
  if (typeof ace === "undefined") return;
  const opts = { fontSize: "14px", showPrintMargin: false, useWorker: false };

  editorPractica = ace.edit("editor-practica");
  editorPractica.setTheme("ace/theme/monokai");
  editorPractica.session.setMode("ace/mode/javascript");
  editorPractica.setOptions(opts);
  editorPractica.setValue(`console.log("Hola desde Practica");`);

  editorDepura = ace.edit("editor-depura");
  editorDepura.setTheme("ace/theme/monokai");
  editorDepura.session.setMode("ace/mode/javascript");
  editorDepura.setOptions(opts);
  editorDepura.setValue(`function sumar(a, b) {\n  const resultado = a + b;\n  console.log("Resultado:", resultado);\n  return resultado;\n}\n\nsumar(5, "2");`);

  editorSalon = ace.edit("editor-salon");
  editorSalon.setTheme("ace/theme/monokai");
  editorSalon.session.setMode("ace/mode/html"); // HTML para probar la vista previa
  editorSalon.setOptions(opts);
  editorSalon.setValue(`<h1 style="color: purple;">¡Hola <DARKCODE>!</h1>\n<p>Este es un texto de prueba.</p>\n<script>\n  console.log("Ejecutando script en el navegador");\n</script>`);
});

// --- 12. XP y Niveles ---
function ganarXP(cantidad) {
  state.xp += cantidad;
  if (state.xp >= 100) {
    state.xp -= 100;
    state.nivel++;
    reproducirSonido("ok");
    setTimeout(() => alert("¡Felicidades! Has subido al Nivel " + state.nivel), 300);
  }
  localStorage.setItem("dc_xp", state.xp);
  localStorage.setItem("dc_nivel", state.nivel);
  actualizarPerfil();
}

// --- 13. Ejecutar código ---
function ejecutar(idEditor) {
  const idConsola = idEditor.replace("editor", "consola");
  const consola = document.getElementById(idConsola);
  const codigo = idEditor === "editor-practica" ? editorPractica.getValue() : editorDepura.getValue();
  correrCodigo(codigo, consola);
  ganarXP(5); // Gana 5 XP
}

function ejecutarSalon() {
  const consola = document.getElementById("consola-salon");
  const iframe = document.getElementById("preview-salon");
  if (!editorSalon || !iframe) return;
  
  const codigo = editorSalon.getValue();
  
  // Ejecutar en consola (por si usan console.log)
  correrCodigo(codigo, consola);
  
  // Actualizar Vista Previa (HTML/CSS/JS)
  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <style>body { font-family: sans-serif; padding: 10px; color: #333; background: #fff; }</style>
    ${codigo}
  `);
  doc.close();

  ganarXP(5); // Gana 5 XP
}

function correrCodigo(codigo, consola) {
  const logs = [];
  const consoleFalso = {
    log: (...a) => logs.push("> " + formatear(a)),
    error: (...a) => logs.push("[x] " + formatear(a)),
    warn: (...a) => logs.push("[!] " + formatear(a)),
    info: (...a) => logs.push("[i] " + formatear(a))
  };
  try {
    new Function("console", codigo)(consoleFalso);
  } catch (e) {
    logs.push("[ERROR] " + e.name + ": " + e.message);
  }
  consola.textContent = logs.length ? logs.join("\n") : "(sin salida)";
}

function formatear(args) {
  return args.map((a) => {
    if (a === null) return "null";
    if (a === undefined) return "undefined";
    if (typeof a === "object") {
      try { return JSON.stringify(a); } catch { return String(a); }
    }
    return String(a);
  }).join(" ");
}

// --- 14. Perfil ---
function actualizarPerfil() {
  const elNombre = document.getElementById("perfil-nombre");
  const elEmail = document.getElementById("perfil-email");
  const elNivel = document.getElementById("perfil-nivel");
  const elXp = document.getElementById("perfil-xp");
  const elBarra = document.getElementById("xp-bar-fill");

  if (state.user) {
    if (elNombre) elNombre.textContent = state.user.displayName || "Usuario";
    if (elEmail) elEmail.textContent = state.user.email || "—";
  } else {
    if (elNombre) elNombre.textContent = "Invitado";
    if (elEmail) elEmail.textContent = "—";
  }

  if (elNivel) elNivel.textContent = state.nivel;
  if (elXp) elXp.textContent = state.xp;
  if (elBarra) elBarra.style.width = `${state.xp}%`;
}

actualizarPerfil();

// Exponer funciones globales
window.ejecutar = ejecutar;
window.ejecutarSalon = ejecutarSalon;
window.salirSalon = salirSalon;
window.cerrarSesion = cerrarSesion;
