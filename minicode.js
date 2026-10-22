// Lógica del compañero MiniCode Chibi
window.actualizarMiniCode = function(estado) {
  const cara = document.getElementById("minicode-cara"); 
  if (!cara) return;
  cara.className = "minicode-chibi";
  if (estado === "feliz") {
    cara.classList.add("feliz");
  } else if (estado === "triste") {
    cara.classList.add("triste");
  }
};
