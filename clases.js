// clases.js - Teoría y Preguntas completas
window.teoria = {
  html: `<h3>1. Cómo funciona HTML</h3><p>HTML es el lenguaje que estructura el contenido de una página web. Utiliza etiquetas para indicar qué es un título, un párrafo o una imagen. No es un lenguaje de programación, sino de marcado.</p><h3>2. Etiquetas y atributos</h3><p>Un elemento HTML tiene una etiqueta de apertura, contenido y una etiqueta de cierre. Los atributos dan información extra, como el enlace de una imagen o el destino de un link.</p>`,
  css: `<h3>1. ¿Qué es CSS?</h3><p>CSS (Cascading Style Sheets) define la apariencia de la página. Mientras HTML es el esqueleto, CSS es la ropa y el maquillaje: colores, tamaños, márgenes y diseño.</p><h3>2. Selectores y modelo de caja</h3><p>Los selectores indican a qué elemento aplicar el estilo. Todo elemento es una caja con contenido, padding (relleno), borde y margen.</p>`,
  js: `<h3>1. Variables con let y const</h3><p>Una variable guarda información. Usamos <b>let</b> si el valor puede cambiar y <b>const</b> si queremos que sea fijo.</p><h3>2. Tipos de datos y operadores</h3><p>Los tipos básicos son texto (en comillas), números y booleanos (true/false). Los operadores matemáticos (+, -, *, /, %) realizan cálculos. Usamos <b>if</b> y <b>else</b> para tomar decisiones.</p>`,
  php: `<h3>1. Variables en PHP</h3><p>Las variables guardan datos y siempre comienzan con el símbolo <b>$</b>. PHP detecta el tipo de dato automáticamente.</p><h3>2. Sintaxis y Servidores</h3><p>El código PHP se escribe entre las etiquetas <b>&lt;?php y ?&gt;</b> y la mayoría de instrucciones terminan con punto y coma (;). PHP se ejecuta en el servidor, y el navegador solo recibe el resultado final.</p>`,
  ruby: `<h3>1. Variables en Ruby</h3><p>Ruby es muy legible. Las variables locales empiezan con minúscula, las de instancia con <b>@</b>, las de clase con <b>@@</b> y las globales con <b>$</b>.</p><h3>2. Textos, Arreglos y Hashes</h3><p>Los textos van entre comillas. Los arreglos son listas que empiezan en el índice 0. Los hashes guardan datos en pares de "clave => valor".</p>`,
  c: `<h3>1. Variables en C</h3><p>C es estricto y requiere indicar el tipo de dato. Usamos <b>int</b> para enteros y <b>char</b> para caracteres. Todo programa inicia en la función <b>main</b>.</p><h3>2. Sintaxis y Compilador</h3><p>Las instrucciones terminan en punto y coma (;). El compilador traduce el código a lenguaje máquina. Usamos <b>if/else</b> para condiciones y <b>for/while</b> para bucles.</p>`,
  cpp: `<h3>1. Variables en C++</h3><p>C++ usa tipos estrictos como <b>int</b>, <b>char</b> y <b>bool</b> (verdadero/falso). Es un lenguaje de tipado fuerte y rápido.</p><h3>2. Clases y Objetos</h3><p>C++ añade Programación Orientada a Objetos. Una <b>clase</b> es un molde y un <b>objeto</b> es una instancia creada a partir de ese molde.</p>`,
  sw: `<h3>1. ¿Qué es un Service Worker?</h3><p>Es un script que corre en segundo plano en el navegador. Actúa como intermediario entre la app, la red y la caché, permitiendo que la app funcione parcialmente sin internet.</p><h3>2. Ciclo de vida y Estrategias</h3><p>Se instala, se activa e intercepta las solicitudes (fetch). Podemos usar estrategias como "Caché primero" o "Red primero" dependiendo del recurso.</p>`,
  manifest: `<h3>1. ¿Qué es el manifest.json?</h3><p>Es el documento de identidad de una PWA. Le dice al navegador cómo instalar la app: su nombre, iconos, colores y cómo debe abrirse (por ejemplo, en modo "standalone" sin barra de navegación).</p>`,
  api: `<h3>1. ¿Qué es una API?</h3><p>Es una interfaz de comunicación que permite que el frontend pida datos al backend. Usa endpoints (rutas) y métodos HTTP como GET (obtener) y POST (enviar).</p><h3>2. Códigos de estado y JSON</h3><p>Las respuestas incluyen códigos como 200 (OK), 404 (No encontrado) o 500 (Error del servidor). Los datos se envían normalmente en formato JSON.</p>`,
  backend: `<h3>1. ¿Qué es el Backend?</h3><p>Es la parte del servidor invisible al usuario. Procesa solicitudes, valida datos, aplica reglas de negocio y se conecta a la base de datos.</p><h3>2. Seguridad y Validación</h3><p>El backend nunca debe confiar en el frontend. Debe validar los datos, comprobar la autenticación (quién eres) y la autorización (qué puedes hacer).</p>`,
  cyber: `<h3>1. Ciberseguridad Básica</h3><p>Consiste en proteger el código y los datos. Las contraseñas deben guardarse encriptadas (hash) y las rutas privadas deben requerir autenticación.</p><h3>2. Validación y Permisos</h3><p>Nunca confíes en el usuario. Valida siempre en el servidor. Aplica el principio de menor privilegio (cada usuario solo tiene los permisos necesarios).</p>`,
  debug: `<h3>1. Depuración</h3><p>Es el proceso de encontrar y corregir errores. Consiste en reproducir el problema, aislar la causa y aplicar una corrección mínima. Usa la consola y las herramientas de desarrollo.</p><h3>2. Identificar archivos</h3><p>Revisa el nombre, la extensión y el contenido. Por ejemplo, sw.js tendrá self.addEventListener, y manifest.json tendrá llaves y comillas.</p>`,
  repo: `<h3>1. Repositorios y GitHub</h3><p>Un repositorio es el lugar donde se guarda el proyecto. Git es el sistema de control de versiones y GitHub es la nube donde lo alojas.</p><h3>2. Commits y Ramas</h3><p>Un commit guarda un cambio con un mensaje. Las ramas permiten trabajar en paralelo sin afectar la rama principal (main).</p>`
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
  js: [
    { pregunta: "¿Cuál es la diferencia entre let y const?", opciones: ["let permite cambiar el valor, const no.", "const permite cambiar el valor, let no.", "Ambas hacen lo mismo."], correcta: 0, explicacion: "let es mutable, const es inmutable." },
    { pregunta: "¿Cómo se escribe un texto?", opciones: ["Sin comillas.", "Entre comillas.", "Con $."], correcta: 1, explicacion: "Los strings van entre comillas." },
    { pregunta: "¿Qué significa el operador %?", opciones: ["Porcentaje.", "El residuo de una división.", "División."], correcta: 1, explicacion: "% devuelve el sobrante." },
    { pregunta: "¿Cuándo se ejecuta 'else'?", opciones: ["Cuando 'if' es verdadero.", "Cuando 'if' es falso.", "Siempre."], correcta: 1, explicacion: "else es la alternativa al if." },
    { pregunta: "¿En qué índice empieza un arreglo?", opciones: ["0", "1", "10"], correcta: 0, explicacion: "Los arreglos empiezan en el índice 0." },
    { pregunta: "¿Qué es una función?", opciones: ["Una variable", "Un bloque de código reutilizable", "Un bucle"], correcta: 1, explicacion: "Agrupa código para reutilizarlo." },
    { pregunta: "¿Qué valor es booleano?", opciones: ["'Hola'", "45", "true"], correcta: 2, explicacion: "true y false son booleanos." },
    { pregunta: "¿Qué operador significa 'exactamente igual'?", opciones: ["=", "==", "==="], correcta: 2, explicacion: "=== compara valor y tipo." },
    { pregunta: "¿Qué estructura repite código?", opciones: ["if", "for", "const"], correcta: 1, explicacion: "for es un bucle." },
    { pregunta: "¿Dónde se ejecuta JS en la web?", opciones: ["En el servidor", "En el navegador", "En la base de datos"], correcta: 1, explicacion: "El navegador interpreta JS." }
  ],
  php: [
    { pregunta: "¿Con qué símbolo comienzan las variables en PHP?", opciones: ["#", "$", "@"], correcta: 1, explicacion: "Usan el símbolo $." },
    { pregunta: "¿Qué etiqueta abre PHP?", opciones: ["<php>", "<?php", "<script>"], correcta: 1, explicacion: "Se usa <?php." },
    { pregunta: "¿Qué instrucción muestra texto?", opciones: ["echo", "print_text", "show"], correcta: 0, explicacion: "echo imprime en pantalla." },
    { pregunta: "¿Dónde se ejecuta PHP?", opciones: ["En el navegador", "En el servidor", "En CSS"], correcta: 1, explicacion: "Es un lenguaje del lado del servidor." },
    { pregunta: "¿Qué variable guarda datos del servidor?", opciones: ["$_GET", "$_SERVER", "$_POST"], correcta: 1, explicacion: "$_SERVER tiene info del entorno." },
    { pregunta: "¿Qué método envía datos por la URL?", opciones: ["POST", "GET", "PUT"], correcta: 1, explicacion: "GET expone datos en la URL." },
    { pregunta: "¿Qué método se usa en formularios?", opciones: ["POST", "GET", "DELETE"], correcta: 0, explicacion: "POST oculta los datos en el cuerpo." },
    { pregunta: "¿Cómo termina una instrucción?", opciones: ["Punto", "Coma", "Punto y coma"], correcta: 2, explicacion: "Se usa ;" },
    { pregunta: "¿Qué extensión tienen los archivos?", opciones: [".html", ".php", ".js"], correcta: 1, explicacion: "El servidor lee .php." },
    { pregunta: "¿Qué es una superglobal?", opciones: ["Variable de usuario", "Variable del sistema", "Variable predefinida"], correcta: 2, explicacion: "Son variables ya creadas por PHP." }
  ],
  ruby: [
    { pregunta: "¿Qué es Ruby?", opciones: ["Lenguaje de programación", "Sistema operativo", "Base de datos"], correcta: 0, explicacion: "Es un lenguaje." },
    { pregunta: "¿Cómo empieza una variable local?", opciones: ["Mayúscula", "Minúscula", "Con @"], correcta: 1, explicacion: "Empiezan con minúscula." },
    { pregunta: "¿Cómo empieza una variable de instancia?", opciones: ["@", "$", "@@"], correcta: 0, explicacion: "Usan un solo @." },
    { pregunta: "¿Qué significa true?", opciones: ["Falso", "Verdadero", "Nulo"], correcta: 1, explicacion: "Es el valor booleano verdadero." },
    { pregunta: "¿Qué palabra inicia una condición?", opciones: ["if", "else", "for"], correcta: 0, explicacion: "if evalúa la condición." },
    { pregunta: "¿Qué guarda un arreglo?", opciones: ["Un solo dato", "Una lista ordenada", "Una función"], correcta: 1, explicacion: "Es una colección." },
    { pregunta: "¿En qué índice empieza un arreglo?", opciones: ["0", "1", "10"], correcta: 0, explicacion: "Empieza en 0." },
    { pregunta: "¿Qué guarda un hash?", opciones: ["Clave y valor", "Solo números", "Solo listas"], correcta: 0, explicacion: "Son pares clave-valor." },
    { pregunta: "¿Qué símbolo crea un comentario?", opciones: ["//", "#", "/*"], correcta: 1, explicacion: "Se usa el numeral #." },
    { pregunta: "¿Para qué sirve un método?", opciones: ["Para repetir código", "Para agrupar instrucciones", "Para hacer variables"], correcta: 1, explicacion: "Agrupa tareas reutilizables." }
  ],
  c: [
    { pregunta: "¿Qué es C?", opciones: ["Lenguaje de programación", "Navegador", "Sistema operativo"], correcta: 0, explicacion: "Es un lenguaje." },
    { pregunta: "¿Qué tipo guarda enteros?", opciones: ["char", "int", "float"], correcta: 1, explicacion: "int guarda enteros." },
    { pregunta: "¿Qué tipo guarda un carácter?", opciones: ["int", "char", "text"], correcta: 1, explicacion: "char guarda un carácter." },
    { pregunta: "¿Dónde inicia el programa?", opciones: ["start()", "main()", "begin()"], correcta: 1, explicacion: "Todo inicia en main." },
    { pregunta: "¿Qué traduce el código?", opciones: ["El navegador", "El compilador", "El teclado"], correcta: 1, explicacion: "El compilador traduce a máquina." },
    { pregunta: "¿Qué termina una instrucción?", opciones: ["Punto", "Punto y coma", "Coma"], correcta: 1, explicacion: "Se usa ;." },
    { pregunta: "¿Qué palabra inicia una condición?", opciones: ["if", "for", "while"], correcta: 0, explicacion: "if evalúa." },
    { pregunta: "¿Qué estructura repite código?", opciones: ["if", "for", "int"], correcta: 1, explicacion: "for es un bucle." },
    { pregunta: "¿Para qué sirve una función?", opciones: ["Para repetir código", "Para agrupar código", "Para borrar código"], correcta: 1, explicacion: "Agrupa y reutiliza." },
    { pregunta: "¿Qué es un comentario?", opciones: ["Código que se ejecuta", "Texto ignorado", "Un error"], correcta: 1, explicacion: "El compilador lo ignora." }
  ],
  cpp: [
    { pregunta: "¿Qué es C++?", opciones: ["Lenguaje de programación", "Sistema operativo", "Navegador"], correcta: 0, explicacion: "Es un lenguaje." },
    { pregunta: "¿Qué tipo guarda enteros?", opciones: ["int", "char", "bool"], correcta: 0, explicacion: "int guarda enteros." },
    { pregunta: "¿Qué tipo guarda verdadero/falso?", opciones: ["int", "char", "bool"], correcta: 2, explicacion: "bool es para booleanos." },
    { pregunta: "¿Dónde inicia el programa?", opciones: ["main", "start", "begin"], correcta: 0, explicacion: "Todo inicia en main." },
    { pregunta: "¿Qué es una clase?", opciones: ["Un molde para crear objetos", "Una variable", "Un error"], correcta: 0, explicacion: "Es un molde." },
    { pregunta: "¿Qué es un objeto?", opciones: ["Una clase", "Una instancia de una clase", "Una función"], correcta: 1, explicacion: "Es una creación de la clase." },
    { pregunta: "¿Qué palabra inicia una condición?", opciones: ["if", "for", "int"], correcta: 0, explicacion: "if evalúa." },
    { pregunta: "¿Qué estructura repite código?", opciones: ["if", "for", "bool"], correcta: 1, explicacion: "for es un bucle." },
    { pregunta: "¿Para qué sirve una función?", opciones: ["Para agrupar código", "Para hacer clases", "Para variables"], correcta: 0, explicacion: "Agrupa código." },
    { pregunta: "¿Qué termina una instrucción?", opciones: ["Punto", "Punto y coma", "Coma"], correcta: 1, explicacion: "Se usa ;." }
  ],
  sw: [
    { pregunta: "¿Qué hace un Service Worker?", opciones: ["Corre en segundo plano", "Borra la base de datos", "Diseña la página"], correcta: 0, explicacion: "Trabaja en segundo plano." },
    { pregunta: "¿Qué permite el modo offline?", opciones: ["Usar la app sin internet", "Instalar Windows", "Jugar juegos"], correcta: 0, explicacion: "Usa caché para funcionar." },
    { pregunta: "¿Dónde se registra?", opciones: ["En app.js", "En styles.css", "En index.html solo"], correcta: 0, explicacion: "Se registra en JS." },
    { pregunta: "¿Qué evento intercepta?", opciones: ["install", "fetch", "click"], correcta: 1, explicacion: "fetch intercepta solicitudes." },
    { pregunta: "¿Qué requisito de seguridad tiene?", opciones: ["HTTPS", "HTTP", "FTP"], correcta: 0, explicacion: "Requiere HTTPS." }
  ],
  manifest: [
    { pregunta: "¿Qué es manifest.json?", opciones: ["Documento de identidad", "Un script", "Un estilo"], correcta: 0, explicacion: "Identifica la app." },
    { pregunta: "¿Para qué sirve el display: standalone?", opciones: ["Abrir sin barra", "Borrar caché", "Guardar datos"], correcta: 0, explicacion: "Modo app nativa." },
    { pregunta: "¿Qué se define con icons?", opciones: ["Los íconos", "Los textos", "Los colores"], correcta: 0, explicacion: "Los íconos de la app." },
    { pregunta: "¿Qué lenguaje usa?", opciones: ["JSON", "HTML", "CSS"], correcta: 0, explicacion: "Usa formato JSON." },
    { pregunta: "¿Reemplaza al HTML?", opciones: ["Sí", "No", "A veces"], correcta: 1, explicacion: "Es solo configuración." }
  ],
  api: [
    { pregunta: "¿Qué es una API?", opciones: ["Interfaz de comunicación", "Un lenguaje", "Un servidor"], correcta: 0, explicacion: "Conecta frontend y backend." },
    { pregunta: "¿Qué método pide datos?", opciones: ["GET", "POST", "DELETE"], correcta: 0, explicacion: "GET obtiene datos." },
    { pregunta: "¿Qué método envía datos?", opciones: ["GET", "POST", "PUT"], correcta: 1, explicacion: "POST envía datos." },
    { pregunta: "¿Qué código significa OK?", opciones: ["200", "404", "500"], correcta: 0, explicacion: "200 es éxito." },
    { pregunta: "¿Qué formato es común?", opciones: ["JSON", "HTML", "CSS"], correcta: 0, explicacion: "Usa JSON." }
  ],
  backend: [
    { pregunta: "¿Dónde corre el backend?", opciones: ["En el servidor", "En el navegador", "En CSS"], correcta: 0, explicacion: "Corre en servidor." },
    { pregunta: "¿Qué hace el backend?", opciones: ["Procesa datos", "Diseña la página", "Muestra botones"], correcta: 0, explicacion: "Procesa lógica." },
    { pregunta: "¿Qué es la autenticación?", opciones: ["Quién eres", "Qué haces", "Dónde estás"], correcta: 0, explicacion: "Verifica identidad." },
    { pregunta: "¿Qué es la autorización?", opciones: ["Qué puedes hacer", "Quién eres", "Dónde estás"], correcta: 0, explicacion: "Verifica permisos." },
    { pregunta: "¿A qué se conecta?", opciones: ["A la base de datos", "A CSS", "Al teclado"], correcta: 0, explicacion: "Consulta la BD." }
  ],
  cyber: [
    { pregunta: "¿Qué protege la ciberseguridad?", opciones: ["Datos y código", "Solo el diseño", "Solo los botones"], correcta: 0, explicacion: "Protege todo." },
    { pregunta: "¿Cómo se guardan contraseñas?", opciones: ["En texto plano", "Con hash", "En la URL"], correcta: 1, explicacion: "Siempre con hash." },
    { pregunta: "¿De quién no debes fiarte?", opciones: ["Del usuario", "Del backend", "De la base de datos"], correcta: 0, explicacion: "El usuario puede manipular datos." },
    { pregunta: "¿Dónde va la validación importante?", opciones: ["En el backend", "En el frontend solo", "En CSS"], correcta: 0, explicacion: "El servidor valida." },
    { pregunta: "¿Qué es HTTPS?", opciones: ["Conexión segura", "Un lenguaje", "Una base de datos"], correcta: 0, explicacion: "Encripta los datos." }
  ],
  debug: [
    { pregunta: "¿Qué es depurar?", opciones: ["Encontrar y corregir errores", "Escribir código", "Diseñar"], correcta: 0, explicacion: "Es corregir fallos." },
    { pregunta: "¿Qué muestra la consola?", opciones: ["Mensajes y errores", "El diseño", "La base de datos"], correcta: 0, explicacion: "Muestra logs." },
    { pregunta: "¿Qué es sw.js?", opciones: ["Un Service Worker", "Una imagen", "Un estilo"], correcta: 0, explicacion: "Es el SW." },
    { pregunta: "¿Qué hace un punto de interrupción?", opciones: ["Pausa el código", "Borra todo", "Cierra la app"], correcta: 0, explicacion: "Pausa para revisar." },
    { pregunta: "¿Qué extensión tiene un archivo JS?", opciones: [".js", ".css", ".html"], correcta: 0, explicacion: "Es .js." }
  ],
  repo: [
    { pregunta: "¿Qué es un repositorio?", opciones: ["Espacio para el código", "Un servidor", "Una base de datos"], correcta: 0, explicacion: "Guarda el proyecto." },
    { pregunta: "¿Qué es Git?", opciones: ["Control de versiones", "Un lenguaje", "Un navegador"], correcta: 0, explicacion: "Registra cambios." },
    { pregunta: "¿Qué es un commit?", opciones: ["Un registro de cambios", "Una rama", "Un error"], correcta: 0, explicacion: "Guarda un cambio." },
    { pregunta: "¿Qué es una rama?", opciones: ["Línea de trabajo", "Un archivo", "Un commit"], correcta: 0, explicacion: "Permite trabajo paralelo." },
    { pregunta: "¿Qué es GitHub?", opciones: ["Nube para repositorios", "Un lenguaje", "Un editor"], correcta: 0, explicacion: "Aloja repositorios." }
  ]
};

window.mapaMisiones = {
  1: { nombre: "Los cimientos" },
  2: { nombre: "Enciende el neón" },
  3: { nombre: "El núcleo lógico" },
  4: { nombre: "Reserva de energía" },
  5: { nombre: "Identidad digital" },
  6: { nombre: "Central de comunicaciones" },
  7: { nombre: "Sala de máquinas" },
  8: { nombre: "El escudo" },
  9: { nombre: "Laboratorio de errores" },
  10: { nombre: "Lanzamiento" }
};
