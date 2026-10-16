// ================================
// <DARKCODE> - lógica principal
// ================================

// --- 1. Service Worker ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

// --- 2. Estado de la app ---
const state = {
  user: localStorage.getItem("dc_user") || null,
  lenguaje: localStorage.getItem("dc_lang") || null,
  modo: localStorage.getItem("dc_modo") || "dark",
  sonidoBotones: localStorage.getItem("dc_sb") !== "0",
  sonidoFondo: localStorage.getItem("dc_sf") === "1",
  animaciones: localStorage.getItem("dc_anim") !== "0"
};

// --- 3. Login ---
const loginScreen = document.getElementById("login-screen");
const btnGoogle = document.getElementById("btn-google");

if (state.user) {
  loginScreen.classList.add("oculto");
}

btnGoogle.addEventListener("click", () => {
  const nombre = prompt("Tu nombre (solo local):", "Estudiante");
  if (!nombre) return;
  state.user = nombre;
  localStorage.setItem("dc_user", nombre);
  loginScreen.classList.add("oculto");
  reproducirSonido("ok");
  actualizarPerfil();
});

function cerrarSesion() {
  localStorage.removeItem("dc_user");
  location.reload();
}

// --- 4. Navegación principal ---
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

// --- 5. Selección de lenguaje ---
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

  // Cambiar a sección salón
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

// --- 6. Tabs del salón ---
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

// --- 7. Modos de color ---
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

// --- 8. Configuración (switches) ---
const sonidoBotonesChk = document.getElementById("sonido-botones");
const sonidoFondoChk = document.getElementById("sonido-fondo");
const animacionesChk = document.getElementById("animaciones");

sonidoBotonesChk.checked = state.sonidoBotones;
sonidoFondoChk.checked = state.sonidoFondo;
animacionesChk.checked = state.animaciones;

sonidoBotonesChk.addEventListener("change", (e) => {
  state.sonidoBotones = e.target.checked;
  localStorage.setItem("dc_sb", state.sonidoBotones ? "1" : "0");
});
sonidoFondoChk.addEventListener("change", (e) => {
  state.sonidoFondo = e.target.checked;
  localStorage.setItem("dc_sf", state.sonidoFondo ? "1" : "0");
  if (state.sonidoFondo) iniciarSonidoFondo(); else detenerSonidoFondo();
});
animacionesChk.addEventListener("change", (e) => {
  state.animaciones = e.target.checked;
  localStorage.setItem("dc_anim", state.animaciones ? "1" : "0");
});

// --- 9. Sonidos con Web Audio API ---
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
    const frec = tipo === "ok" ? 880 : 440;
    osc.frequency.value = frec;
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

// --- 10. Editores Ace ---
let editorPractica, editorDepura, editorSalon;

window.addEventListener("load", () => {
  if (typeof ace === "undefined") return;

  const opts = { fontSize: "14px", showPrintMargin: false, useWorker: false };

  editorPractica = ace.edit("editor-practica");
  editorPractica.setTheme("ace/theme/monokai");
  editorPractica.session.setMode("ace/mode/javascript");
  editorPractica.setOptions(opts);
  editorPractica.setValue(`function saludar(nombre) {\n  return "Hola, " + nombre + "!";\n}\n\nconsole.log(saludar("Ana"));`);

  editorDepura = ace.edit("editor-depura");
  editorDepura.setTheme("ace/theme/monokai");
  editorDepura.session.setMode("ace/mode/javascript");
  editorDepura.setOptions(opts);
  editorDepura.setValue(`function sumar(a, b) {\n  const resultado = a + b;\n  console.log("Resultado:", resultado);\n  return resultado;\n}\n\nsumar(5, "2");`);

  editorSalon = ace.edit("editor-salon");
  editorSalon.setTheme("ace/theme/monokai");
  editorSalon.session.setMode("ace/mode/javascript");
  editorSalon.setOptions(opts);
  editorSalon.setValue(`// Tu código aquí\nconsole.log("Hola <DARKCODE>");`);
});

// --- 11. Ejecutar código ---
function ejecutar(idEditor) {
  const idConsola = idEditor.replace("editor", "consola");
  const consola = document.getElementById(idConsola);
  const codigo = idEditor === "editor-practica"
    ? editorPractica.getValue()
    : editorDepura.getValue();

  correrCodigo(codigo, consola);
}

function ejecutarSalon() {
  const consola = document.getElementById("consola-salon");
  if (!editorSalon) return;
  correrCodigo(editorSalon.getValue(), consola);
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

// --- 12. Perfil ---
function actualizarPerfil() {
  const el = document.getElementById("perfil-nombre");
  if (el) el.textContent = state.user || "Invitado";
}

actualizarPerfil();

// --- 13. Instalar PWA ---
let promptInstalacion = null;
const btnInstalar = document.getElementById("btn-instalar");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  promptInstalacion = e;
});

window.ejecutar = ejecutar;
window.ejecutarSalon = ejecutarSalon;
window.salirSalon = salirSalon;
window.cerrarSesion = cerrarSesion;
