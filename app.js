// ================================
// <DARKCODE> — lógica principal
// ================================

// 1. Registro del Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.log("SW no registrado:", err);
    });
  });
}

// 2. Navegación entre secciones
const botones = document.querySelectorAll("#menu button");
const secciones = document.querySelectorAll(".seccion");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const destino = boton.dataset.seccion;

    botones.forEach((b) => b.classList.remove("activo"));
    secciones.forEach((s) => s.classList.remove("activa"));

    boton.classList.add("activo");
    document.getElementById(destino).classList.add("activa");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// 3. Selección de Sistema Operativo (Android, iOS, Windows)
function seleccionarSO(so) {
  localStorage.setItem('darkcode_so', so);
  document.getElementById('modal-so').style.display = 'none';
  mostrarInstrucciones(so);
}

function mostrarInstrucciones(so) {
  const aviso = document.getElementById('instrucciones-instalar');
  if (so === 'android') {
    aviso.innerHTML = "<strong>📱 Instalación en Android:</strong> Abre el menú ⋮ de Chrome y toca <b>Instalar aplicación</b>. También puedes usar el botón de abajo.";
  } else if (so === 'ios') {
    aviso.innerHTML = "<strong>🍏 Instalación en iOS:</strong> Abre Safari, toca el botón <b>Compartir 📤</b> y elige <b>Añadir a pantalla de inicio</b>.";
  } else if (so === 'windows') {
    aviso.innerHTML = "<strong>💻 Instalación en Windows:</strong> En Chrome o Edge, haz clic en el icono de <b>Instalar 💻</b> que aparece en la barra de direcciones.";
  }
}

// Detectar SO automáticamente al cargar
window.addEventListener('load', () => {
  const soGuardado = localStorage.getItem('darkcode_so');
  if (soGuardado) {
    document.getElementById('modal-so').style.display = 'none';
    mostrarInstrucciones(soGuardado);
  } else {
    // Auto-detectar
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      // No lo seleccionamos automáticamente, se lo preguntamos
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS detectado
    } else {
      // Windows / PC
    }
  }
});

// 4. Instalación de la PWA (sin el aviso automático de Chrome)
let promptInstalacion = null;
const btnInstalar = document.getElementById("btn-instalar");

const yaInstalada =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Mata el mini-aviso de Chrome
  promptInstalacion = e;
  if (btnInstalar && !yaInstalada) btnInstalar.hidden = false;
});

if (btnInstalar) {
  btnInstalar.addEventListener("click", async () => {
    if (!promptInstalacion) return;
    promptInstalacion.prompt();
    await promptInstalacion.userChoice;
    promptInstalacion = null;
    btnInstalar.hidden = true;
  });
}

window.addEventListener("appinstalled", () => {
  promptInstalacion = null;
  if (btnInstalar) btnInstalar.hidden = true;
});

// 5. EDITOR DE CÓDIGO (Ace Editor)
let editorPractica, editorDepura;

window.addEventListener('load', () => {
  // Editor de Práctica
  editorPractica = ace.edit("editor-practica");
  editorPractica.setTheme("ace/theme/monokai");
  editorPractica.session.setMode("ace/mode/javascript");
  editorPractica.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    useWorker: false
  });
  editorPractica.setValue(`function saludar(nombre) {
  return "Hola, " + nombre + "!";
}

console.log(saludar("Ana"));
console.log(saludar("Luis"));`);

  // Editor de Depuración
  editorDepura = ace.edit("editor-depura");
  editorDepura.setTheme("ace/theme/monokai");
  editorDepura.session.setMode("ace/mode/javascript");
  editorDepura.setOptions({
    fontSize: "14px",
    showPrintMargin: false,
    useWorker: false
  });
  editorDepura.setValue(`function sumar(a, b) {
  const resultado = a + b;
  console.log("Resultado:", resultado);
  return resultado;
}

sumar(5, "2");`);
});

// 6. Ejecutor de código con consola simulada
function ejecutar(idEditor) {
  const idConsola = idEditor.replace("editor", "consola");
  const consola = document.getElementById(idConsola);

  // Obtener el código del editor Ace correspondiente
  const codigo = idEditor === "editor-practica" ? editorPractica.getValue() : editorDepura.getValue();

  const logs = [];

  const consoleFalso = {
    log: (...args) => logs.push("▶ " + formatear(args)),
    error: (...args) => logs.push("❌ " + formatear(args)),
    warn: (...args) => logs.push("⚠️ " + formatear(args)),
    info: (...args) => logs.push("ℹ️ " + formatear(args))
  };

  try {
    const fn = new Function("console", codigo);
    fn(consoleFalso);
  } catch (e) {
    logs.push("💥 " + e.name + ": " + e.message);
  }

  consola.textContent = logs.length ? logs.join("\n") : "(sin salida)";
}

function formatear(args) {
  return args
    .map((a) => {
      if (a === null) return "null";
      if (a === undefined) return "undefined";
      if (typeof a === "object") {
        try { return JSON.stringify(a); } catch { return String(a); }
      }
      return String(a);
    })
    .join(" ");
}

// Exponer globalmente para los onclick del HTML
window.ejecutar = ejecutar;
window.seleccionarSO = seleccionarSO;
