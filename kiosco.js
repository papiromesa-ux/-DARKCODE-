// Lógica del Kiosco
window.abrirKiosco = function() {
  const dcElement = document.getElementById("kiosco-dc");
  const dbElement = document.getElementById("kiosco-db");
  const container = document.getElementById("kiosco-contenedor");
  if (dcElement && state && state.billetera) dcElement.textContent = state.billetera.dc;
  if (dbElement && state && state.billetera) dbElement.textContent = state.billetera.db;

  // Muestra el mensaje de que está abierto (por ahora vacío)
  if (container) {
    container.innerHTML = "<p style='color: var(--text-2); text-align: center; margin-top: 30px;'>El kiosco está abierto. Pronto habrá productos disponibles.</p>";
  }
}
