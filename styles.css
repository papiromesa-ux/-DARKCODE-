* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0d0614; --bg-2: #11081c; --card: #160a26; --border: #2b1248;
  --text: #d4d4d8; --text-2: #a1a1aa; --accent: #a855f7; --accent-2: #4c1d95; --accent-3: #6d28d9;
  --header: linear-gradient(135deg, #2e1065, #4c1d95); --header-shadow: rgba(76, 29, 149, 0.5); --code-bg: #050108;
}
body.light { --bg: #fffef5; --bg-2: #fdfbe8; --card: #ffffff; --border: #e5e0c0; --text: #1a1a1a; --text-2: #555; --accent: #ca8a04; --accent-2: #facc15; --accent-3: #eab308; --header: linear-gradient(135deg, #facc15, #eab308); --header-shadow: rgba(234, 179, 8, 0.4); --code-bg: #fef9c3; }
body.dazer { --bg: #000000; --bg-2: #000000; --card: #111111; --border: #444444; --text: #ffffff; --text-2: #cccccc; --accent: #ffffff; --accent-2: #333333; --accent-3: #555555; --header: linear-gradient(135deg, #000, #111); --header-shadow: none; --code-bg: #000000; }

body { font-family: -apple-system, system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding-bottom: 60px; transition: background 0.3s, color 0.3s; }

/* LOGIN */
.login-screen { position: fixed; inset: 0; z-index: 2000; background: radial-gradient(circle at center, #2e1065, #0d0614 70%); display: flex; justify-content: center; align-items: center; }
body.light .login-screen { background: radial-gradient(circle at center, #fef08a, #fffef5 70%); }
body.dazer .login-screen { background: #000; }
.login-screen.oculto { display: none; }
.login-box { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 32px 24px; text-align: center; max-width: 340px; width: 90%; box-shadow: 0 20px 60px rgba(109, 40, 217, 0.5); }
.login-sub { color: var(--text-2); margin: 10px 0 24px; font-size: 0.9rem; }
.btn-google { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 12px; border-radius: 10px; background: #fff; color: #1a1a1a; border: 1px solid #ddd; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: transform 0.15s; }
.btn-google:active { transform: scale(0.97); }

/* TÍTULOS 3D */
.logo-3d { font-size: 1.8rem; letter-spacing: 3px; font-weight: 900; color: #fff; text-align: center; text-shadow: 0 1px 0 var(--accent-3), 0 2px 0 var(--accent-2), 0 3px 0 #3b0f75, 0 4px 0 #2e1065, 0 5px 8px rgba(0,0,0,0.7), 0 0 20px var(--accent); transform: perspective(500px) rotateX(6deg); display: block; }
body.dazer .logo-3d { text-shadow: 0 0 10px #fff; }
.titulo-3d-sec { font-size: 1.5rem; letter-spacing: 2px; font-weight: 800; color: var(--accent); text-shadow: 0 1px 0 var(--accent-3), 0 2px 0 var(--accent-2), 0 3px 6px rgba(0,0,0,0.6); transform: perspective(500px) rotateX(4deg); margin-bottom: 12px; }
body.dazer .titulo-3d-sec { text-shadow: 0 0 8px #fff; }

/* ESTRUCTURA */
header { background: var(--header); color: #fff; padding: 22px 16px; text-align: center; box-shadow: 0 4px 20px var(--header-shadow); }
.sub { font-size: 0.85rem; opacity: 0.9; margin-top: 6px; }
#menu { display: flex; overflow-x: auto; gap: 6px; padding: 10px; background: var(--bg-2); position: sticky; top: 0; z-index: 10; border-bottom: 1px solid var(--border); }
#menu button { background: var(--card); color: var(--text); border: 1px solid var(--border); padding: 8px 14px; border-radius: 999px; font-size: 0.85rem; white-space: nowrap; cursor: pointer; }
#menu button.activo { background: var(--accent-2); color: #fff; border-color: var(--accent-3); box-shadow: 0 0 12px var(--accent-3); }
body.dazer #menu button.activo { background: #fff; color: #000; }

main { padding: 16px; max-width: 720px; margin: 0 auto; }
.seccion { display: none; animation: aparecer 0.2s ease; }
.seccion.activa { display: block; }
@keyframes aparecer { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
h2 { margin-bottom: 12px; color: var(--accent); font-size: 1.3rem; letter-spacing: 1px; }
h3 { margin: 16px 0 8px; color: var(--accent); font-size: 1rem; }
h4 { margin: 14px 0 6px; color: var(--accent); font-size: 0.9rem; }
p { margin-bottom: 10px; }

/* LENGUAJES */
.lenguajes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 14px 0; }
.lang-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px 10px; cursor: pointer; color: var(--text); display: flex; flex-direction: column; align-items: center; gap: 6px; transition: transform 0.15s, border 0.15s; position: relative; }
.lang-card:active { transform: scale(0.96); border-color: var(--accent); }
.lang-icon { font-size: 1.4rem; font-weight: 800; color: var(--accent); text-shadow: 0 2px 0 var(--accent-2); }
.lang-card small { color: var(--text-2); font-size: 0.75rem; }
.badge-recomendado { position: absolute; top: -10px; right: -5px; background: #fbbf24; color: #000; font-size: 0.6rem; font-weight: bold; padding: 3px 8px; border-radius: 999px; box-shadow: 0 2px 5px rgba(0,0,0,0.5); z-index: 10; }

/* SALÓN Y MAPA */
.salon-top { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 12px; }
.boton-salir { background: transparent; color: var(--text-2); border: none; font-size: 0.9rem; cursor: pointer; margin-bottom: 10px; display: block; text-align: left; }
.boton-salir:hover { color: var(--accent); }
.salon-tabs { display: flex; overflow-x: auto; gap: 6px; padding: 8px 0; margin-bottom: 12px; border-bottom: 1px solid var(--border); }
.salon-tabs button { background: transparent; color: var(--text-2); border: 1px solid var(--border); padding: 6px 12px; border-radius: 999px; font-size: 0.75rem; white-space: nowrap; cursor: pointer; }
.salon-tabs button.activo { background: var(--accent-2); color: #fff; border-color: var(--accent-3); }
body.dazer .salon-tabs button.activo { background: #fff; color: #000; }
.salon-tab { display: none; }
.salon-tab.activo { display: block; }

.mapa-ruta { display: flex; flex-direction: column; gap: 15px; position: relative; padding: 10px; }
.mapa-ruta::before { content: ''; position: absolute; top: 0; bottom: 0; left: 30px; width: 4px; background: var(--border); z-index: 1; border-radius: 4px; }
.nodo-mision { display: flex; align-items: center; gap: 15px; background: var(--card); border: 2px solid var(--border); border-radius: 12px; padding: 12px; position: relative; z-index: 2; margin-left: 10px; transition: all 0.2s ease; }
.nodo-mision:nth-child(even) { margin-left: 40px; }
.nodo-mision:nth-child(odd) { margin-left: 0px; }
.circulo-mision { width: 44px; height: 44px; border-radius: 50%; background: var(--bg-2); border: 3px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: bold; flex-shrink: 0; }
.nodo-mision.actual { border-color: var(--accent); box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); transform: scale(1.02); }
.nodo-mision.actual .circulo-mision { border-color: var(--accent); background: rgba(168, 85, 247, 0.2); }
.nodo-mision.completada { opacity: 0.8; border-color: #4ade80; }
.nodo-mision.completada .circulo-mision { border-color: #4ade80; background: rgba(74, 222, 128, 0.2); font-size: 0.7rem;}
.etiqueta-mision { position: absolute; top: -10px; left: 20px; background: var(--accent); color: #fff; font-size: 0.65rem; padding: 2px 8px; border-radius: 999px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
.info-mision { display: flex; flex-direction: column; }
.info-mision strong { color: var(--text); font-size: 0.95rem; }
.info-mision small { color: var(--text-2); font-size: 0.75rem; }

/* MINICODE */
.minicode-chat { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
.minicode-face {
    width: 55px; height: 55px;
    background: var(--accent-2);
    border: 2px solid var(--accent);
    border-radius: 50%;
    position: relative;
    display: flex; justify-content: center; align-items: center;
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
    animation: flotar 3s ease-in-out infinite;
    flex-shrink: 0;
}
@keyframes flotar { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.mc-eye-left, .mc-eye-right {
    position: absolute; top: 12px;
    color: var(--accent); font-family: monospace; font-size: 1.3rem; font-weight: bold;
}
.mc-eye-left { left: 10px; }
.mc-eye-right { right: 10px; }
.mc-smile {
    width: 16px; height: 8px;
    border-bottom: 2px solid var(--accent);
    border-radius: 0 0 10px 10px;
    position: absolute; bottom: 10px;
}

.minicode-speech {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 15px;
    border-radius: 12px;
    position: relative;
    flex-grow: 1;
}
.minicode-speech::before {
    content: ''; position: absolute;
    left: -8px; top: 20px;
    width: 0; height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--border);
}

/* AJUSTES Y PERFIL */
.modos { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.modo-btn { background: var(--card); color: var(--text); border: 1px solid var(--border); padding: 10px; border-radius: 10px; text-align: left; cursor: pointer; font-size: 0.9rem; }
.modo-btn.activo { border-color: var(--accent); box-shadow: 0 0 10px var(--accent-3); }
.switch { display: flex; align-items: center; gap: 10px; background: var(--card); border: 1px solid var(--border); padding: 10px 12px; border-radius: 10px; margin-bottom: 8px; cursor: pointer; font-size: 0.9rem; }
.switch input { width: 18px; height: 18px; accent-color: var(--accent); }
.xp-container { background: var(--card); padding: 12px; border-radius: 10px; border: 1px solid var(--border); margin: 14px 0; }
.xp-bar-bg { width: 100%; height: 14px; background: rgba(0,0,0,0.5); border-radius: 999px; overflow: hidden; margin: 8px 0; border: 1px solid var(--border); }
body.light .xp-bar-bg { background: #e5e0c0; }
body.dazer .xp-bar-bg { background: #222; }
.xp-bar-fill { height: 100%; background: linear-gradient(90deg, #a855f7, #4ade80); transition: width 0.5s ease; border-radius: 999px; }
body.dazer .xp-bar-fill { background: #fff; }

/* EDITOR */
.editor-ace { width: 100%; min-height: 200px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 10px; font-size: 0.85rem; }
.ace_editor { background: #050108 !important; }
body.light .ace_editor { background: #fffef5 !important; }
body.dazer .ace_editor { background: #000000 !important; }
.ace_gutter { background: #11081c !important; }
body.light .ace_gutter { background: #fdfbe8 !important; }
body.dazer .ace_gutter { background: #111111 !important; }
.editor-layout { display: flex; flex-direction: column; gap: 10px; margin-bottom: 10px; }
@media (min-width: 600px) { .editor-layout { flex-direction: row; } .editor-layout > * { flex: 1; } }
.preview-container { border: 1px solid var(--border); border-radius: 8px; background: #fff; min-height: 200px; overflow: hidden; }
.preview-iframe { width: 100%; height: 100%; min-height: 200px; border: none; }

/* GENÉRICOS */
details { background: var(--card); padding: 10px 14px; border-radius: 8px; margin-bottom: 10px; border: 1px solid var(--border); }
summary { cursor: pointer; font-weight: 600; color: var(--text); }
summary::marker { color: var(--accent); }
pre, code { font-family: "Courier New", monospace; font-size: 0.85rem; }
pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 10px; overflow-x: auto; margin: 8px 0; white-space: pre-wrap; word-wrap: break-word; color: var(--accent); }
body.dazer pre, body.dazer code { color: #fff; }
code { background: var(--code-bg); padding: 2px 5px; border-radius: 4px; color: var(--accent); }
label { display: block; margin: 10px 0 6px; font-size: 0.9rem; color: var(--text-2); }
.boton { background: var(--accent-2); color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; margin-top: 8px; cursor: pointer; box-shadow: 0 0 12px var(--accent-3); }
.boton:active { background: var(--accent-3); }
body.dazer .boton { background: #fff; color: #000; box-shadow: none; }
.consola { background: #000; color: #4ade80; border: 1px solid var(--border); min-height: 60px; font-family: "Courier New", monospace; padding: 10px; border-radius: 8px; }
body.light .consola { background: #1a1a1a; }
body.dazer .consola { background: #000; border-color: #444; }
.aviso { background: var(--card); border-left: 4px solid var(--accent-3); padding: 10px 12px; border-radius: 6px; font-size: 0.9rem; margin: 12px 0; }
ul { margin: 8px 0 8px 20px; }
li { margin-bottom: 6px; }
dl { display: grid; gap: 8px; }
dt { font-weight: 700; color: var(--accent); margin-top: 8px; }
dd { margin-left: 12px; font-size: 0.9rem; color: var(--text-2); }
footer { text-align: center; padding: 20px; font-size: 0.8rem; color: var(--text-2); opacity: 0.7; }

/* NOTIFICACIONES Y CONFETI */
#notificaciones-container { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10000; display: flex; flex-direction: column; gap: 10px; width: 90%; max-width: 400px; pointer-events: none; }
.toast { background: var(--card); border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5); border-left: 5px solid var(--accent); animation: slideDown 0.3s ease forwards; transition: opacity 0.3s ease; color: var(--text); }
.toast.error { border-left-color: #dc2626; background: #2a0a0a; }
.toast.exito { border-left-color: #4ade80; background: #0a2a15; }
.toast.logro { border-left-color: #fbbf24; background: #2a1a0a; border: 1px solid #fbbf24; }
@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

#confetti-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; overflow: hidden; }
.confeti-pieza { position: absolute; width: 10px; height: 10px; top: -10px; opacity: 0.9; animation: caer 2.5s linear forwards; }
@keyframes caer { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }

/* LOGROS */
.logros-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 15px; }
.logro-card { display: flex; align-items: center; padding: 12px; border-radius: 10px; border: 1px solid var(--border); background: var(--card); transition: all 0.3s ease; }
.logro-card.obtenido { border-color: #fbbf24; box-shadow: 0 0 10px rgba(251, 191, 36, 0.2); }
.logro-card.bloqueado { opacity: 0.4; filter: grayscale(100%); }
.logro-icono { font-size: 1.5rem; font-weight: bold; margin-right: 15px; width: 30px; text-align: center; color: var(--accent); }
.logro-info { display: flex; flex-direction: column; }
.logro-info strong { color: var(--text); font-size: 0.95rem; }
.logro-info small { color: var(--text-2); font-size: 0.75rem; }

/* LECCIÓN Y TEORÍA */
#pantalla-teoria, #pantalla-leccion { background: var(--bg); min-height: 100vh; padding: 20px; display: flex; flex-direction: column; }
.leccion-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.barra-progreso-bg { flex-grow: 1; height: 16px; background: var(--border); border-radius: 999px; overflow: hidden; }
.barra-progreso-fill { height: 100%; background: #4ade80; transition: width 0.3s ease; }
.leccion-contenido { flex-grow: 1; }
.opciones-container { display: flex; flex-direction: column; gap: 12px; }
.opcion-btn { background: var(--card); color: var(--text); border: 2px solid var(--border); padding: 16px; border-radius: 12px; font-size: 1rem; text-align: left; cursor: pointer; transition: all 0.15s; font-weight: 500; }
.opcion-btn.seleccionada { border-color: var(--accent); background: var(--bg-2); }
.opcion-btn.correcta { border-color: #4ade80; background: rgba(74, 222, 128, 0.2); color: #4ade80; }
.opcion-btn.incorrecta { border-color: #dc2626; background: rgba(220, 38, 38, 0.2); color: #dc2626; }
.opcion-btn:disabled { cursor: default; }
.leccion-footer { margin-top: 20px; padding-bottom: 20px; }
.leccion-footer .boton { width: 100%; padding: 16px; font-size: 1.1rem; }
#btn-leccion-comprobar:disabled { opacity: 0.5; cursor: not-allowed; }
.feedback-container { margin-top: 20px; }
.feedback-container.correcto #feedback-bubble { border-color: #4ade80; }
.feedback-container.incorrecto #feedback-bubble { border-color: #dc2626; }

#teoria-texto {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text);
  max-height: 65vh;
  overflow-y: auto;
  margin-bottom: 20px;
}
#teoria-texto h3 { color: var(--accent); margin-top: 20px; margin-bottom: 8px; font-size: 1.1rem; border-bottom: 1px solid var(--border); padding-bottom: 4px; }
#teoria-texto h3:first-child { margin-top: 0; }
#teoria-texto p { margin-bottom: 12px; color: var(--text-2); }
#teoria-texto b { color: var(--text); }
