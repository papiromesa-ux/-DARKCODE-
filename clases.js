// clases.js - Teoría y Preguntas completas
window.teoria = {
  html: `<h3>1. Cómo funciona HTML</h3><p>HTML estructura el contenido web. Usa etiquetas para indicar títulos, párrafos e imágenes.</p><h3>2. Etiquetas y atributos</h3><p>Un elemento tiene etiqueta de apertura, contenido y cierre. Los atributos añaden información extra.</p>`,
  css: `<h3>1. ¿Qué es CSS?</h3><p>CSS define la apariencia visual: colores, tamaños y diseño.</p><h3>2. Selectores y modelo de caja</h3><p>Los selectores aplican estilos. Todo elemento es una caja con padding, borde y margen.</p>`,
  backend: `<h3>1. Backend</h3><p>Es la parte del servidor. Procesa solicitudes, valida datos y se conecta a la base de datos.</p><h3>2. Cliente y Servidor</h3><p>El cliente pide (frontend) y el servidor responde (backend). Usa autenticación y autorización.</p>`,
  cyber: `<h3>1. Ciberseguridad</h3><p>Protege el código y los datos. Las contraseñas se guardan con hash.</p><h3>2. Validación y Permisos</h3><p>Nunca confíes en el usuario. Valida siempre en el backend y aplica el principio de menor privilegio.</p>`,
  api: `<h3>1. API</h3><p>Interfaz que conecta frontend y backend. Usa métodos HTTP como GET y POST.</p><h3>2. Respuestas</h3><p>Usa códigos de estado (200 OK, 404 Not Found) y formato JSON.</p>`,
  sw: `<h3>1. Service Worker</h3><p>Script en segundo plano que permite el modo offline usando caché.</p><h3>2. Ciclo de vida</h3><p>Se instala, se activa e intercepta solicitudes (fetch). Requiere HTTPS.</p>`,
  manifest: `<h3>1. Manifest.json</h3><p>Documento de identidad de la PWA. Define nombre, iconos, colores y cómo abrir la app.</p>`,
  debug: `<h3>1. Depuración</h3><p>Encontrar y corregir errores. Usa la consola y puntos de interrupción.</p><h3>2. Identificar archivos</h3><p>sw.js tiene self.addEventListener; manifest.json tiene llaves y comillas.</p>`,
  repo: `<h3>1. Repositorio</h3><p>Espacio para guardar el proyecto con control de versiones (Git).</p><h3>2. Commits y Ramas</h3><p>Un commit guarda cambios. Las ramas permiten trabajar en paralelo.</p>`,
  files: `<h3>1. Archivos de programación</h3><p>index.html (estructura), styles.css (diseño), app.js (lógica) y api.js (conexión).</p><h3>2. Backend y DB</h3><p>Archivos como server.js manejan el backend, y .sql manejan la base de datos.</p>`,
  ia: `<h3>1. Programar con IA</h3><p>La IA ayuda a escribir y explicar código, pero debe revisarse.</p><h3>2. Buenos prompts</h3><p>Da contexto, indica el entorno, pide un plan y solicita código por partes. Nunca compartas secretos.</p>`,
  hacking: `<h3>1. Hacking Ético</h3><p>Buscar vulnerabilidades con autorización para corregirlas.</p><h3>2. Alcance y práctica</h3><p>Nunca pruebes sistemas ajenos. Usa laboratorios como WebGoat o Juice Shop.</p>`
};

window.baseDePreguntas = {
  html: [
    { pregunta: "¿Qué significa HTML?", opciones: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"], correcta: 0, explicacion: "HTML significa HyperText Markup Language." },
    { pregunta: "¿Cuál es la etiqueta correcta para crear un párrafo?", opciones: ["<h1>", "<p>", "<parrafo>"], correcta: 1, explicacion: "La etiqueta <p> viene de 'paragraph'." },
    { pregunta: "¿Qué etiqueta se usa para insertar una imagen?", opciones: ["<picture>", "<img>", "<image>"], correcta: 1, explicacion: "La etiqueta correcta es <img>." },
    { pregunta: "¿Qué significa que HTML sea de marcado?", opciones: ["Que estructura el contenido", "Que hace cálculos", "Que diseña la página"], correcta: 0, explicacion: "HTML estructura y da significado al contenido." },
    { pregunta: "¿Dónde va el contenido visible?", opciones: ["En <head>", "En <body>", "En <script>"], correcta: 1, explicacion: "La etiqueta <body> contiene todo lo visible." }
  ],
  css: [
    { pregunta: "¿Para qué sirve CSS?", opciones: ["Para estructurar el contenido", "Para definir la apariencia visual", "Para manejar bases de datos"], correcta: 1, explicacion: "CSS controla colores, tamaños y diseño." },
    { pregunta: "¿Qué es el modelo de caja?", opciones: ["Contenido, padding, borde y margen", "Solo el borde", "Una etiqueta HTML"], correcta: 0, explicacion: "Todo elemento es una caja con esas 4 partes." },
    { pregunta: "¿Qué propiedad cambia el color del texto?", opciones: ["background-color", "color", "text-size"], correcta: 1, explicacion: "La propiedad color cambia el texto." },
    { pregunta: "¿Cómo se llama la regla que prioriza un estilo?", opciones: ["Cascada y especificidad", "Herencia", "Flexbox"], correcta: 0, explicacion: "La cascada y especificidad definen qué regla gana." },
    { pregunta: "¿Qué unidad es relativa?", opciones: ["px", "cm", "%"], correcta: 2, explicacion: "El porcentaje depende del contenedor." }
  ],
  backend: [
    { pregunta: "¿Dónde se ejecuta el backend?", opciones: ["En el servidor", "En el navegador", "En CSS"], correcta: 0, explicacion: "El backend corre en el servidor, invisible al usuario." },
    { pregunta: "¿Qué significa autenticación?", opciones: ["Verificar quién eres", "Verificar qué puedes hacer", "Verificar tu velocidad"], correcta: 0, explicacion: "Autenticación verifica la identidad del usuario." },
    { pregunta: "¿Qué significa autorización?", opciones: ["Verificar quién eres", "Verificar qué permisos tienes", "Verificar la base de datos"], correcta: 1, explicacion: "Autorización determina qué acciones puedes realizar." },
    { pregunta: "¿Dónde debe validarse la información importante?", opciones: ["En el backend", "En el frontend", "En el CSS"], correcta: 0, explicacion: "El backend nunca debe confiar en el frontend, debe validar todo." },
    { pregunta: "¿Qué es el CRUD?", opciones: ["Crear, Leer, Actualizar, Borrar", "Conectar, Redirigir, Usar, Datos", "Código, Red, Usuario, Diseño"], correcta: 0, explicacion: "CRUD son las operaciones básicas sobre datos." }
  ],
  cyber: [
    { pregunta: "¿Cómo se deben guardar las contraseñas?", opciones: ["En texto plano", "Usando un hash", "En la URL"], correcta: 1, explicacion: "Siempre se deben guardar con un hash seguro." },
    { pregunta: "¿Dónde deben ir las claves secretas de una API?", opciones: ["En el frontend", "En el backend (servidor)", "En la base de datos pública"], correcta: 1, explicacion: "Las claves secretas nunca deben estar en el código del navegador." },
    { pregunta: "¿Qué es el principio de menor privilegio?", opciones: ["Dar todos los permisos", "Dar solo los permisos necesarios", "No dar permisos"], correcta: 1, explicacion: "Cada usuario debe tener solo los permisos que necesita." },
    { pregunta: "¿Se debe confiar en la validación del frontend?", opciones: ["Sí, es suficiente", "No, siempre validar en el backend", "Solo si el usuario es administrador"], correcta: 1, explicacion: "El frontend puede manipularse, el backend es la autoridad final." },
    { pregunta: "¿Para qué sirven las copias de seguridad?", opciones: ["Para recuperar datos ante fallos", "Para hacer la app más rápida", "Para guardar contraseñas"], correcta: 0, explicacion: "Las copias de seguridad protegen contra pérdida de información." }
  ],
  api: [
    { pregunta: "¿Qué es una API?", opciones: ["Un lenguaje de programación", "Una interfaz que conecta aplicaciones", "Un tipo de base de datos"], correcta: 1, explicacion: "Una API permite la comunicación entre el frontend y el backend." },
    { pregunta: "¿Qué método HTTP se usa para pedir datos?", opciones: ["GET", "POST", "DELETE"], correcta: 0, explicacion: "GET se utiliza para obtener información." },
    { pregunta: "¿Qué método HTTP se usa para enviar datos?", opciones: ["GET", "POST", "PUT"], correcta: 1, explicacion: "POST se utiliza para crear o enviar información." },
    { pregunta: "¿Qué significa el código de estado 404?", opciones: ["Éxito", "Error del servidor", "No encontrado"], correcta: 2, explicacion: "404 significa que el recurso solicitado no existe." },
    { pregunta: "¿En qué formato suelen devolver las APIs los datos?", opciones: ["JSON", "HTML", "CSS"], correcta: 0, explicacion: "JSON es el formato estándar para intercambiar datos." }
  ],
  sw: [
    { pregunta: "¿Dónde trabaja un Service Worker?", opciones: ["En el frontend visual", "En segundo plano", "En la base de datos"], correcta: 1, explicacion: "Es un script que corre en segundo plano en el navegador." },
    { pregunta: "¿Para qué sirve el modo offline?", opciones: ["Para usar la app sin internet", "Para limpiar la caché", "Para instalar actualizaciones"], correcta: 0, explicacion: "Gracias a la caché, la app puede funcionar parcialmente sin conexión." },
    { pregunta: "¿Qué evento intercepta las solicitudes de red?", opciones: ["install", "activate", "fetch"], correcta: 2, explicacion: "El evento 'fetch' intercepta las solicitudes." },
    { pregunta: "¿Qué requisito de seguridad necesita?", opciones: ["HTTP", "HTTPS", "FTP"], correcta: 1, explicacion: "Requiere HTTPS (o localhost en desarrollo) por seguridad." },
    { pregunta: "¿Qué es una estrategia de caché?", opciones: ["Decidir si usar caché o red", "Borrar archivos", "Programar en C++"], correcta: 0, explicacion: "Es la regla que define si se obtiene el recurso de la caché o de la red." }
  ],
  manifest: [
    { pregunta: "¿Qué es el manifest.json?", opciones: ["Un documento de identidad de la app", "Un script de JavaScript", "Un archivo de estilos"], correcta: 0, explicacion: "Define cómo se instala y muestra la aplicación." },
    { pregunta: "¿Qué formato tiene el manifest.json?", opciones: ["HTML", "JSON", "XML"], correcta: 1, explicacion: "Es un archivo con formato JSON." },
    { pregunta: "¿Qué hace el 'display: standalone'?", opciones: ["Abre la app sin barra del navegador", "Borra la caché", "Guarda datos"], correcta: 0, explicacion: "Hace que la app se sienta como una aplicación nativa." },
    { pregunta: "¿Qué se define en el campo 'icons'?", opciones: ["Los íconos de la app", "Los textos", "Los colores del fondo"], correcta: 0, explicacion: "Define los íconos que se usarán al instalar la app." },
    { pregunta: "¿El manifest reemplaza al HTML?", opciones: ["Sí", "No", "Solo en móviles"], correcta: 1, explicacion: "El manifest es solo configuración, no reemplaza al HTML." }
  ],
  debug: [
    { pregunta: "¿Qué es depurar?", opciones: ["Encontrar y corregir errores", "Escribir código desde cero", "Diseñar interfaces"], correcta: 0, explicacion: "Depurar es el proceso de encontrar y solucionar fallos." },
    { pregunta: "¿Qué herramienta del navegador muestra los errores?", opciones: ["La consola", "El editor de código", "El CSS"], correcta: 0, explicacion: "La consola muestra mensajes y errores." },
    { pregunta: "¿Qué es un punto de interrupción?", opciones: ["Pausa el código para revisar valores", "Borra el código", "Reinicia la app"], correcta: 0, explicacion: "Permite pausar la ejecución para inspeccionar el estado." },
    { pregunta: "¿Cómo reconoces un archivo sw.js?", opciones: ["Tiene etiquetas HTML", "Tiene self.addEventListener", "Tiene colores CSS"], correcta: 1, explicacion: "El Service Worker usa self.addEventListener para escuchar eventos." },
    { pregunta: "¿Qué pestaña te muestra si una petición a la API falló?", opciones: ["Network (Red)", "Elements", "Console"], correcta: 0, explicacion: "La pestaña Network muestra las solicitudes y sus respuestas." }
  ],
  repo: [
    { pregunta: "¿Qué es un repositorio?", opciones: ["Un lugar para guardar el proyecto", "Un servidor web", "Una base de datos"], correcta: 0, explicacion: "Es el espacio donde se almacena el código y su historial." },
    { pregunta: "¿Qué es un commit?", opciones: ["Un registro de cambios guardado", "Una rama", "Un error"], correcta: 0, explicacion: "Un commit guarda un cambio en el historial." },
    { pregunta: "¿Qué es una rama (branch)?", opciones: ["Una línea de trabajo independiente", "Un archivo", "Un commit"], correcta: 0, explicacion: "Permite trabajar en paralelo sin afectar la rama principal." },
    { pregunta: "¿Para qué sirve el README.md?", opciones: ["Para explicar el proyecto", "Para ejecutar código", "Para diseño"], correcta: 0, explicacion: "Es el archivo de documentación principal." },
    { pregunta: "¿Qué hace el archivo .gitignore?", opciones: ["Excluye archivos del repositorio", "Borra archivos", "Ejecuta pruebas"], correcta: 0, explicacion: "Indica qué archivos no deben guardarse (como contraseñas o dependencias)." }
  ],
  files: [
    { pregunta: "¿Qué archivo contiene la estructura principal de la página?", opciones: ["index.html", "styles.css", "app.js"], correcta: 0, explicacion: "index.html contiene la estructura base." },
    { pregunta: "¿Qué archivo contiene los estilos visuales?", opciones: ["index.html", "styles.css", "app.js"], correcta: 1, explicacion: "styles.css contiene el diseño y los estilos." },
    { pregunta: "¿Cómo identificas un Service Worker por su contenido?", opciones: ["Tiene self.addEventListener", "Tiene etiquetas <div>", "Tiene colores"], correcta: 0, explicacion: "El código del SW usa self.addEventListener." },
    { pregunta: "¿Qué archivo describe la configuración de la PWA?", opciones: ["manifest.json", "app.js", "index.html"], correcta: 0, explicacion: "manifest.json contiene la configuración de la app instalable." },
    { pregunta: "¿Qué archivo maneja la lógica principal del frontend?", opciones: ["app.js", "styles.css", "manifest.json"], correcta: 0, explicacion: "app.js contiene la lógica de la interfaz." }
  ],
  ia: [
    { pregunta: "¿Qué necesita la IA para dar una buena respuesta?", opciones: ["Contexto y instrucciones claras", "Que le hables en inglés", "Nada, ella adivina"], correcta: 0, explicacion: "El contexto permite que la IA entienda el proyecto." },
    { pregunta: "¿Debes copiar el código de la IA a ciegas?", opciones: ["Sí, siempre", "No, debes revisarlo y entenderlo", "Solo si es corto"], correcta: 1, explicacion: "Siempre debes revisar el código y entenderlo." },
    { pregunta: "¿Qué es un buen prompt?", opciones: ["Decir 'haz una app'", "Pedir paso a paso y dar restricciones", "Escribir solo una palabra"], correcta: 1, explicacion: "Los prompts específicos generan mejores resultados." },
    { pregunta: "¿Puedes compartir contraseñas con la IA?", opciones: ["Sí", "No, nunca", "Solo si es de prueba"], correcta: 1, explicacion: "Nunca compartas secretos o contraseñas con herramientas de IA." },
    { pregunta: "¿Qué hacer si la IA se equivoca?", opciones: ["Rendirte", "Explicarle el error exacto y dar contexto", "Culpar al teclado"], correcta: 1, explicacion: "Proporcionar el mensaje de error ayuda a la IA a corregirse." }
  ],
  hacking: [
    { pregunta: "¿Qué es el hacking ético?", opciones: ["Buscar vulnerabilidades con autorización", "Atacar sistemas ajenos", "Borrar bases de datos"], correcta: 0, explicacion: "Se realiza siempre con permiso para corregir fallos." },
    { pregunta: "¿Cuál es la regla principal del hacking ético?", opciones: ["Nunca probar sin autorización", "Aprender rápido", "Atacar cualquier web"], correcta: 0, explicacion: "La autorización es el límite entre lo ético y lo ilegal." },
    { pregunta: "¿Qué es una vulnerabilidad?", opciones: ["Una debilidad explotable", "Un servidor rápido", "Un tipo de contraseña"], correcta: 0, explicacion: "Es un fallo que puede comprometer la seguridad." },
    { pregunta: "¿Qué es OWASP WebGoat?", opciones: ["Un laboratorio para practicar hacking", "Un lenguaje de programación", "Un servidor"], correcta: 0, explicacion: "Es una app vulnerable diseñada para aprender de forma segura." },
    { pregunta: "¿Puedes hacer pruebas en una web que no es tuya?", opciones: ["Sí, si es pública", "No, necesitas autorización", "Solo los fines de semana"], correcta: 1, explicacion: "Debes tener permiso explícito del dueño." }
  ]
};

window.mapaMisiones = {
  1: { nombre: "Los cimientos (HTML)" },
  2: { nombre: "Enciende el neón (CSS)" },
  3: { nombre: "Sala de máquinas (Backend)" },
  4: { nombre: "El escudo (Ciberseguridad)" },
  5: { nombre: "Central de comunicaciones (API)" },
  6: { nombre: "Reserva de energía (Service Worker)" },
  7: { nombre: "Identidad digital (Manifiesto)" },
  8: { nombre: "Laboratorio de errores (Depuración)" },
  9: { nombre: "El lanzamiento (Repositorio)" },
  10: { nombre: "El mapa del código (Archivos)" },
  11: { nombre: "Compañero electrónico (IA)" },
  12: { nombre: "El Pentester (Hacking)" }
};
