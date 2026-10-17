import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const firebaseConfig = { /* Tus credenciales de Firebase */ };
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
  { id: "hola_clase", titulo: "Hola Clase", fase: 0, icono: "👋" },
  { id: "esqueletico", titulo: "Esquelético", fase: 1, icono: "🦴" },
  { id: "decorista", titulo: "Decorista", fase: 2, icono: "🎨" },
  { id: "experto", titulo: "Experto", fase: 3, icono: "🧠" },
  { id: "sin_conexion", titulo: "Sin conexión", fase: 4, icono: "📴" },
  { id: "manifestante", titulo: "Manifestante", fase: 5, icono: "📄" },
  { id: "conciencia", titulo: "Conciencia", fase: 6, icono: "🔌" },
  { id: "caja_fuerte", titulo: "Caja Fuerte", fase: 7, icono: "🔒" },
  { id: "policia", titulo: "Policía", fase: 8, icono: "👮" },
  { id: "compañero", titulo: "Compañero Electrónico", fase: 9, icono: "🤖" },
  { id: "instalable", titulo: "Instalable", fase: 10, icono: "📲" }
];

function mostrarToast(titulo, mensaje, tipo = "error") {
  const container = document.getElementById("notificaciones-container");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  let icono = tipo === "error" ? "🚫" : tipo === "exito" ? "✅" : "🏆";
  toast.innerHTML = `<div style="font-size:1.5rem; margin-right:10px;">${icono}</div><div><div style="font-weight:bold;">${titulo}</div><div style="font-size:0.8rem;">${mensaje}</div></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 300); }, 4000);
}

function desbloquearLogro(idLogro) {
  if (state.logros.includes(idLogro)) return;
  state.logros.push(idLogro);
  localStorage.setItem("dc_logros", JSON.stringify(state.logros));
  const logro = TODOS_LOS_LOGROS.find(l => l.id === idLogro);
  if (logro) {
    mostrarToast("¡Misión Completada!", logro.titulo, "logro");
    lanzarConfeti(); // Solo aquí se celebra con confeti
    guardarDatosNube();
  }
  renderizarLogros();
  dibujarMapaMisiones(); // Actualizar el mapa visualmente
}

function renderizarLogros() { /* ... igual que antes ... */ }
function lanzarConfeti() { /* ... igual que antes ... */ }

async function cargarDatosNube(uid) {
  try {
    const docSnap = await getDoc(doc(db, "usuarios", uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      state.xp = data.xp || 0; state.nivel = data.nivel || 1;
      state.logros = data.logros || []; state.modo = data.modo || "dark";
      aplicarModo(state.modo); actualizarPerfil(); dibujarMapaMisiones();
    }
  } catch (e) { mostrarToast("Error", "No se pudo conectar", "error"); }
}

async function guardarDatosNube() { /* ... igual que antes ... */ }

// --- DIBUJAR MAPA DE MISIONES ---
function dibujarMapaMisiones() {
  const container = document.getElementById("mapa-misiones-container");
  if (!container) return;
  container.innerHTML = "";

  // Encontrar cuál es la siguiente misión
  let siguienteFase = 1;
  for (let i = 1; i <= 10; i++) {
    const logroFase = TODOS_LOS_LOGROS.find(l => l.fase === i);
    if (logroFase && state.logros.includes(logroFase.id)) {
      siguienteFase = i + 1; 
    } else {
      break;
    }
  }

  // Crear los nodos del 1 al 10
  for (let i = 1; i <= 10; i++) {
    const mision = mapaMisiones[i];
    const logroFase = TODOS_LOS_LOGROS.find(l => l.fase === i);
    const completada = state.logros.includes(logroFase.id);
    
    const div = document.createElement("div");
    div.className = `nodo-mision ${completada ? 'completada' : ''} ${i === siguienteFase ? 'actual' : ''}`;
    
    if (i === siguienteFase && !completada) {
      div.innerHTML = `<div class="etiqueta-mision">Tu siguiente misión</div>`;
    }

    div.innerHTML += `
      <div class="circulo-mision">${completada ? '✅' : mision.icono}</div>
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

// --- LÓGICA DE LECCIÓN ---
let leccionActual = [], indicePregunta = 0, opcionSeleccionada = null, aciertosLeccion = 0, faseActual = 1;

function iniciarLeccion(faseId) {
  faseActual = faseId;
  const llave = `fase${faseId}_` + ["html", "css", "lenguaje", "sw", "manifest", "api", "backend", "cyber", "ia", "deploy"][faseId - 1];
  
  if (!baseDePreguntas[llave]) {
    mostrarToast("Próximamente", "Esta fase estará disponible pronto.", "error");
    return;
  }

  leccionActual = [...baseDePreguntas[llave]];
  indicePregunta = 0; aciertosLeccion = 0;
  document.getElementById("salon").style.display = "none";
  document.getElementById("pantalla-leccion").classList.add("activa");
  document.getElementById("pantalla-leccion").style.display = "block";
  cargarPregunta();
}

function salirLeccion() {
  if (confirm("¿Seguro que quieres salir? Perderás el progreso de esta lección.")) {
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
    tituloFb.textContent = "¡Correcto! BYTE dice:";
    aciertosLeccion++; ganarXP(10);
  } else {
    botones[opcionSeleccionada].classList.add("incorrecta");
    botones[p.correcta].classList.add("correcta");
    reproducirSonido("error");
    feedbackDiv.className = "feedback-container incorrecto";
    tituloFb.textContent = "Todavía no. BYTE dice:";
  }
  document.getElementById("feedback-texto").textContent = p.explicacion;
  feedbackDiv.style.display = "block";
  document.getElementById("btn-leccion-siguiente").style.display = "block";
}

function siguientePregunta() { indicePregunta++; cargarPregunta(); }

function terminarLeccion() {
  document.getElementById("pantalla-leccion").style.display = "none";
  document.getElementById("salon").style.display = "block";
  
  // Si acertó al menos 2 de 3, desbloquea
  if (aciertosLeccion >= 2) {
    const logro = TODOS_LOS_LOGROS.find(l => l.fase === faseActual);
    if (logro) desbloquearLogro(logro.id);
    ganarXP(20);
  } else {
    mostrarToast("Sigue intentando", "Necesitas más aciertos para reparar esta estación.", "error");
  }
  dibujarMapaMisiones();
}

// --- INICIALIZACIÓN ---
window.addEventListener("load", () => {
  // (Ace Editor y demás código igual que antes)
  dibujarMapaMisiones();
});

// Exponer funciones...
window.salirSalon = () => { /* ... */ };
window.iniciarLeccion = iniciarLeccion;
window.salirLeccion = salirLeccion;
window.comprobarRespuesta = comprobarRespuesta;
window.siguientePregunta = siguientePregunta;
// (El resto de funciones como cerrarSesion, borrarMisDatos, etc. se mantienen igual)
