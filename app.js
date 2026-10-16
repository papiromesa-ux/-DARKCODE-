// ================================
// DARKCODE — lógica principal
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

// 3. Ejecutor de código con consola simulada
function ejecutar(idEditor) {
  const idConsola = idEditor.replace("editor", "consola");
  const editor = document.getElementById(idEditor);
  const consola = document.getElementById(idConsola);

  const logs = [];

  const consoleFalso = {
    log: (...args) => logs.push("▶ " + formatear(args)),
    error: (...args) => logs.push("❌ " + formatear(args)),
    warn: (...args) => logs.push("⚠️ " + formatear(args)),
    info: (...args) => logs.push("ℹ️ " + formatear(args))
  };

  try {
    const fn = new Function("console", editor.value);
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