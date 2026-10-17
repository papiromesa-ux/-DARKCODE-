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

const TODOS_LOS_LOGROS = [ /* ... (Tus logros) ... */ ];

// ... (Funciones mostrarToast, lanzarError, desbloquearLogro, renderizarLogros, lanzarConfeti, Firestore) ...

// NAVEGACIÓN (ARREGLADO PARA OCULTAR PANTALLAS FANTASMA)
document.querySelectorAll("#menu button").forEach((b) => {
  b.addEventListener("click", () => {
    reproducirSonido("click");
    const destino = b.dataset.seccion;
    document.querySelectorAll("#menu button").forEach((x) => x.classList.remove("activo"));
    document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
    
    // Ocultar TODAS las pantallas de lecciones y el salón
    document.getElementById("salon").style.display = "none";
    document.getElementById("pantalla-teoria").classList.remove("activa");
    document.getElementById("pantalla-leccion").classList.remove("activa");

    b.classList.add("activo");
    document.getElementById(destino).classList.add("activa");
  });
});

// MODAL DE SALIDA (ADIÓS AL ALERT FEO)
function abrirModalSalir() {
  document.getElementById("modal-confirmacion").style.display = "flex";
}

function cerrarModalConfirmacion() {
  document.getElementById("modal-confirmacion").style.display = "none";
}

function confirmarSalida() {
  cerrarModalConfirmacion();
  document.getElementById("pantalla-teoria").classList.remove("activa");
  document.getElementById("pantalla-leccion").classList.remove("activa");
  document.getElementById("salon").style.display = "block";
}

// LÓGICA DE TEORÍA Y QUIZ (SEPARADA)
let leccionActual = [], indicePregunta = 0, opcionSeleccionada = null, aciertosLeccion = 0, faseActual = 1;

function iniciarLeccion(faseId) {
  faseActual = faseId;
  const llave = obtenerLlaveTeoria(faseId);
  
  if (!window.teoria || !window.teoria[llave]) {
    mostrarToast("Próximamente", "Esta clase estará disponible pronto.", "error"); return;
  }

  // Ocultar todo y mostrar SOLO TEORÍA
  document.getElementById("salon").style.display = "none";
  document.getElementById("pantalla-leccion").classList.remove("activa"); 
  
  document.getElementById("teoria-texto").innerHTML = window.teoria[llave];
  document.getElementById("teoria-titulo").textContent = `Fase ${faseId}: ${window.mapaMisiones[faseId].nombre}`;
  
  document.getElementById("pantalla-teoria").classList.add("activa");
  reproducirSonido("click");
}

function irAPractica() {
  reproducirSonido("click");
  // Ocultar TEORÍA y mostrar QUIZ
  document.getElementById("pantalla-teoria").classList.remove("activa");
  cargarQuiz(faseActual);
}

// ... (El resto de funciones como obtenerLlaveTeoria, cargarQuiz, comprobarRespuesta, terminarLeccion se mantienen igual) ...

// EXPONER FUNCIONES PARA EL HTML
window.abrirModalSalir = abrirModalSalir;
window.cerrarModalConfirmacion = cerrarModalConfirmacion;
window.confirmarSalida = confirmarSalida;
window.iniciarLeccion = iniciarLeccion;
window.irAPractica = irAPractica;
