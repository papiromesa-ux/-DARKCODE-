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
    { pregunta: "¿En qué índice empieza un arreglo?", opciones: ["0", "1", "10"], correcta: 0, explicacion: "Los arreglos empiezan en el índice 0." }
  ],
  php: [
    { pregunta: "¿Con qué símbolo comienzan las variables en PHP?", opciones: ["#", "$", "@"], correcta: 1, explicacion: "Usan el símbolo $." },
    { pregunta: "¿Qué etiqueta abre PHP?", opciones: ["<php>", "<?php", "<script>"], correcta: 1, explicacion: "Se usa <?php." },
    { pregunta: "¿Qué instrucción muestra texto?", opciones: ["echo", "print_text", "show"], correcta: 0, explicacion: "echo imprime en pantalla." },
    { pregunta: "¿Dónde se ejecuta PHP?", opciones: ["En el navegador", "En el servidor", "En CSS"], correcta: 1, explicacion: "Es un lenguaje del lado del servidor." },
    { pregunta: "¿Qué extensión tienen los archivos?", opciones: [".html", ".php", ".js"], correcta: 1, explicacion: "El servidor lee .php." }
  ],
  ruby: [
    { pregunta: "¿Qué es Ruby?", opciones: ["Lenguaje de programación", "Sistema operativo", "Base de datos"], correcta: 0, explicacion: "Es un lenguaje." },
    { pregunta: "¿Cómo empieza una variable local?", opciones: ["Mayúscula", "Minúscula", "Con @"], correcta: 1, explicacion: "Empiezan con minúscula." },
    { pregunta: "¿Cómo empieza una variable de instancia?", opciones: ["@", "$", "@@"], correcta: 0, explicacion: "Usan un solo @." },
    { pregunta: "¿Qué guarda un arreglo?", opciones: ["Un solo dato", "Una lista ordenada", "Una función"], correcta: 1, explicacion: "Es una colección." },
    { pregunta: "¿Qué guarda un hash?", opciones: ["Clave y valor", "Solo números", "Solo listas"], correcta: 0, explicacion: "Son pares clave-valor." }
  ],
  c: [
    { pregunta: "¿Qué es C?", opciones: ["Lenguaje de programación", "Navegador", "Sistema operativo"], correcta: 0, explicacion: "Es un lenguaje." },
    { pregunta: "¿Qué tipo guarda enteros?", opciones: ["char", "int", "float"], correcta: 1, explicacion: "int guarda enteros." },
    { pregunta: "¿Qué tipo guarda un carácter?", opciones: ["int", "char", "text"], correcta: 1, explicacion: "char guarda un carácter." },
    { pregunta: "¿Dónde inicia el programa?", opciones: ["start()", "main()", "begin()"], correcta: 1, explicacion: "Todo inicia en main." },
    { pregunta: "¿Qué traduce el código?", opciones: ["El navegador", "El compilador", "El teclado"], correcta: 1, explicacion: "El compilador traduce a máquina." }
  ],
  cpp: [
    { pregunta: "¿Qué es C++?", opciones: ["Lenguaje de programación", "Sistema operativo", "Navegador"], correcta: 0, explicacion: "Es un lenguaje." },
    { pregunta: "¿Qué tipo guarda enteros?", opciones: ["int", "char", "bool"], correcta: 0, explicacion: "int guarda enteros." },
    { pregunta: "¿Qué tipo guarda verdadero/falso?", opciones: ["int", "char", "bool"], correcta: 2, explicacion: "bool es para booleanos." },
    { pregunta: "¿Dónde inicia el programa?", opciones: ["main", "start", "begin"], correcta: 0, explicacion: "Todo inicia en main." },
    { pregunta: "¿Qué es una clase?", opciones: ["Un molde para crear objetos", "Una variable", "Un error"], correcta: 0, explicacion: "Es un molde." }
  ],
  backend: [
    { pregunta: "¿Dónde se ejecuta el backend?", opciones: ["En el servidor", "En el navegador", "En CSS"], correcta: 0, explicacion: "El backend corre en el servidor." },
    { pregunta: "¿Qué significa autenticación?", opciones: ["Verificar quién eres", "Verificar qué puedes hacer", "Verificar tu velocidad"], correcta: 0, explicacion: "Autenticación verifica la identidad." },
    { pregunta: "¿Qué significa autorización?", opciones: ["Verificar quién eres", "Verificar qué permisos tienes", "Verificar la base de datos"], correcta: 1, explicacion: "Autorización determina qué acciones puedes realizar." },
    { pregunta: "¿Dónde debe validarse la información importante?", opciones: ["En el backend", "En el frontend", "En el CSS"], correcta: 0, explicacion: "El backend nunca debe confiar en el frontend." },
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
    { pregunta: "¿Qué es una API?", opciones: ["Un lenguaje de programación", "Una interfaz que conecta aplicaciones", "Un tipo de base de datos"], correcta: 1, explicacion: "Una API permite la comunicación." },
    { pregunta: "¿Qué método HTTP se usa para pedir datos?", opciones: ["GET", "POST", "DELETE"], correcta: 0, explicacion: "GET se utiliza para obtener información." },
    { pregunta: "¿Qué método HTTP se usa para enviar datos?", opciones: ["GET", "POST", "PUT"], correcta: 1, explicacion: "POST se utiliza para crear o enviar información." },
    { pregunta: "¿Qué significa el código de estado 404?", opciones: ["Éxito", "Error del servidor", "No encontrado"], correcta: 2, explicacion: "404 significa que el recurso solicitado no existe." },
    { pregunta: "¿En qué formato suelen devolver las APIs los datos?", opciones: ["JSON", "HTML", "CSS"], correcta: 0, explicacion: "JSON es el formato estándar." }
  ],
  sw: [
    { pregunta: "¿Dónde trabaja un Service Worker?", opciones: ["En el frontend visual", "En segundo plano", "En la base de datos"], correcta: 1, explicacion: "Es un script que corre en segundo plano." },
    { pregunta: "¿Para qué sirve el modo offline?", opciones: ["Para usar la app sin internet", "Para limpiar la caché", "Para instalar actualizaciones"], correcta: 0, explicacion: "Gracias a la caché, la app funciona parcialmente." },
    { pregunta: "¿Qué evento intercepta las solicitudes de red?", opciones: ["install", "activate", "fetch"], correcta: 2, explicacion: "El evento 'fetch' intercepta las solicitudes." },
    { pregunta: "¿Qué requisito de seguridad necesita?", opciones: ["HTTP", "HTTPS", "FTP"], correcta: 1, explicacion: "Requiere HTTPS por seguridad." },
    { pregunta: "¿Qué es una estrategia de caché?", opciones: ["Decidir si usar caché o red", "Borrar archivos", "Programar en C++"], correcta: 0, explicacion: "Es la regla que define de dónde obtener el recurso." }
  ],
  manifest: [
    { pregunta: "¿Qué es el manifest.json?", opciones: ["Un documento de identidad de la app", "Un script de JavaScript", "Un archivo de estilos"], correcta: 0, explicacion: "Define cómo se instala y muestra la aplicación." },
    { pregunta: "¿Qué formato tiene el manifest.json?", opciones: ["HTML", "JSON", "XML"], correcta: 1, explicacion: "Es un archivo con formato JSON." },
    { pregunta: "¿Qué hace el 'display: standalone'?", opciones: ["Abre la app sin barra del navegador", "Borra la caché", "Guarda datos"], correcta: 0, explicacion: "Hace que la app se sienta nativa." },
    { pregunta: "¿Qué se define en el campo 'icons'?", opciones: ["Los íconos de la app", "Los textos", "Los colores del fondo"], correcta: 0, explicacion: "Define los íconos al instalar la app." },
    { pregunta: "¿El manifest reemplaza al HTML?", opciones: ["Sí", "No", "Solo en móviles"], correcta: 1, explicacion: "El manifest es solo configuración." }
  ],
  debug: [
    { pregunta: "¿Qué es depurar?", opciones: ["Encontrar y corregir errores", "Escribir código desde cero", "Diseñar interfaces"], correcta: 0, explicacion: "Depurar es encontrar y solucionar fallos." },
    { pregunta: "¿Qué herramienta del navegador muestra los errores?", opciones: ["La consola", "El editor de código", "El CSS"], correcta: 0, explicacion: "La consola muestra mensajes y errores." },
    { pregunta: "¿Qué es un punto de interrupción?", opciones: ["Pausa el código para revisar valores", "Borra el código", "Reinicia la app"], correcta: 0, explicacion: "Permite pausar la ejecución." },
    { pregunta: "¿Cómo reconoces un archivo sw.js?", opciones: ["Tiene etiquetas HTML", "Tiene self.addEventListener", "Tiene colores CSS"], correcta: 1, explicacion: "El SW usa self.addEventListener." },
    { pregunta: "¿Qué pestaña te muestra si una petición a la API falló?", opciones: ["Network (Red)", "Elements", "Console"], correcta: 0, explicacion: "Network muestra las solicitudes." }
  ],
  repo: [
    { pregunta: "¿Qué es un repositorio?", opciones: ["Un lugar para guardar el proyecto", "Un servidor web", "Una base de datos"], correcta: 0, explicacion: "Es el espacio donde se almacena el código." },
    { pregunta: "¿Qué es un commit?", opciones: ["Un registro de cambios guardado", "Una rama", "Un error"], correcta: 0, explicacion: "Un commit guarda un cambio." },
    { pregunta: "¿Qué es una rama (branch)?", opciones: ["Una línea de trabajo independiente", "Un archivo", "Un commit"], correcta: 0, explicacion: "Permite trabajar en paralelo." },
    { pregunta: "¿Para qué sirve el README.md?", opciones: ["Para explicar el proyecto", "Para ejecutar código", "Para diseño"], correcta: 0, explicacion: "Es la documentación principal." },
    { pregunta: "¿Qué hace el archivo .gitignore?", opciones: ["Excluye archivos del repositorio", "Borra archivos", "Ejecuta pruebas"], correcta: 0, explicacion: "Indica qué archivos no deben guardarse." }
  ],
  files: [
    { pregunta: "¿Qué archivo contiene la estructura principal de la página?", opciones: ["index.html", "styles.css", "app.js"], correcta: 0, explicacion: "index.html contiene la estructura base." },
    { pregunta: "¿Qué archivo contiene los estilos visuales?", opciones: ["index.html", "styles.css", "app.js"], correcta: 1, explicacion: "styles.css contiene el diseño." },
    { pregunta: "¿Cómo identificas un Service Worker por su contenido?", opciones: ["Tiene self.addEventListener", "Tiene etiquetas <div>", "Tiene colores"], correcta: 0, explicacion: "El código del SW usa self.addEventListener." },
    { pregunta: "¿Qué archivo describe la configuración de la PWA?", opciones: ["manifest.json", "app.js", "index.html"], correcta: 0, explicacion: "manifest.json contiene la configuración." },
    { pregunta: "¿Qué archivo maneja la lógica principal del frontend?", opciones: ["app.js", "styles.css", "manifest.json"], correcta: 0, explicacion: "app.js contiene la lógica." }
  ],
  ia: [
    { pregunta: "¿Qué necesita la IA para dar una buena respuesta?", opciones: ["Contexto y instrucciones claras", "Que le hables en inglés", "Nada, ella adivina"], correcta: 0, explicacion: "El contexto permite entender el proyecto." },
    { pregunta: "¿Debes copiar el código de la IA a ciegas?", opciones: ["Sí, siempre", "No, debes revisarlo y entenderlo", "Solo si es corto"], correcta: 1, explicacion: "Siempre debes revisar el código." },
    { pregunta: "¿Qué es un buen prompt?", opciones: ["Decir 'haz una app'", "Pedir paso a paso y dar restricciones", "Escribir solo una palabra"], correcta: 1, explicacion: "Los prompts específicos generan mejores resultados." },
    { pregunta: "¿Puedes compartir contraseñas con la IA?", opciones: ["Sí", "No, nunca", "Solo si es de prueba"], correcta: 1, explicacion: "Nunca compartas secretos." },
    { pregunta: "¿Qué hacer si la IA se equivoca?", opciones: ["Rendirte", "Explicarle el error exacto y dar contexto", "Culpar al teclado"], correcta: 1, explicacion: "El mensaje de error ayuda a la IA a corregirse." }
  ],
  hacking: [
    { pregunta: "¿Qué es el hacking ético?", opciones: ["Buscar vulnerabilidades con autorización", "Atacar sistemas ajenos", "Borrar bases de datos"], correcta: 0, explicacion: "Se realiza siempre con permiso." },
    { pregunta: "¿Cuál es la regla principal del hacking ético?", opciones: ["Nunca probar sin autorización", "Aprender rápido", "Atacar cualquier web"], correcta: 0, explicacion: "La autorización es el límite." },
    { pregunta: "¿Qué es una vulnerabilidad?", opciones: ["Una debilidad explotable", "Un servidor rápido", "Un tipo de contraseña"], correcta: 0, explicacion: "Es un fallo que compromete la seguridad." },
    { pregunta: "¿Qué es OWASP WebGoat?", opciones: ["Un laboratorio para practicar hacking", "Un lenguaje de programación", "Un servidor"], correcta: 0, explicacion: "Es una app vulnerable para aprender." },
    { pregunta: "¿Puedes hacer pruebas en una web que no es tuya?", opciones: ["Sí, si es pública", "No, necesitas autorización", "Solo los fines de semana"], correcta: 1, explicacion: "Debes tener permiso explícito." }
  ]
};
