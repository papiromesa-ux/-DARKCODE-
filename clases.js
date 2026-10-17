// clases.js - Base de datos de preguntas (Las 5 clases completas)
window.baseDePreguntas = {
  // ==================== PHP ====================
  fase1_php: [
    { tipo: "opcion", pregunta: "¿Con qué símbolo comienzan normalmente las variables en PHP?", opciones: ["#", "$", "@"], correcta: 1, explicacion: "En PHP, las variables comienzan con el símbolo $, seguido del nombre de la variable." },
    { tipo: "opcion", pregunta: "¿Cuál de los siguientes nombres de variable es válido en PHP?", opciones: ["$nombreUsuario", "$nombre-usuario", "$123nombre"], correcta: 0, explicacion: "Un nombre de variable puede comenzar con una letra o guion bajo. No puede comenzar con un número ni contener guiones medios." },
    { tipo: "opcion", pregunta: "¿PHP distingue entre mayúsculas y minúsculas en los nombres de variables?", opciones: ["Sí", "No", "Solo en los servidores Linux"], correcta: 0, explicacion: "PHP considera diferentes variables como $nombre, $Nombre y $NOMBRE." },
    { tipo: "opcion", pregunta: "¿Es necesario declarar el tipo de una variable antes de utilizarla en PHP?", opciones: ["Sí, siempre hay que indicar si es texto o número", "No, PHP determina el tipo según el valor asignado", "Solo cuando se trabaja con servidores"], correcta: 1, explicacion: "PHP es un lenguaje de tipado dinámico. El tipo de una variable puede determinarse a partir del valor que recibe." },
    { tipo: "opcion", pregunta: "¿Qué símbolo se utiliza normalmente para terminar una instrucción en PHP?", opciones: ["Punto y coma ;", "Dos puntos :", "Coma ,"], correcta: 0, explicacion: "La mayoría de las instrucciones de PHP terminan con un punto y coma." },
    { tipo: "opcion", pregunta: "¿Qué etiquetas se utilizan para indicar que comienza código PHP dentro de un archivo?", opciones: ["<php> y </php>", "<?php y ?>", "<script> y </script>"], correcta: 1, explicacion: "La etiqueta de apertura habitual es <?php. La etiqueta de cierre ?> puede utilizarse cuando PHP está mezclado con contenido HTML." },
    { tipo: "opcion", pregunta: "¿Qué instrucción se utiliza comúnmente para mostrar texto en PHP?", opciones: ["echo", "show", "displayText"], correcta: 0, explicacion: "echo permite enviar texto o valores como parte de la respuesta que genera el servidor." },
    { tipo: "opcion", pregunta: "¿Cuál es el objetivo principal de un servidor PHP?", opciones: ["Ejecutar el código PHP y enviar el resultado al navegador", "Convertir PHP automáticamente en JavaScript", "Guardar únicamente imágenes"], correcta: 0, explicacion: "PHP se ejecuta normalmente en el servidor. El navegador recibe el resultado generado, no el código PHP original." },
    { tipo: "opcion", pregunta: "¿Qué ocurre normalmente cuando un navegador solicita una página PHP?", opciones: ["El navegador ejecuta directamente el código PHP", "El servidor procesa PHP y devuelve una respuesta", "El archivo PHP se descarga siempre"], correcta: 1, explicacion: "El servidor web entrega el archivo al procesador de PHP, y después envía al navegador el resultado producido." },
    { tipo: "opcion", pregunta: "¿Qué variable predefinida contiene información relacionada con el servidor y la ejecución?", opciones: ["$_SERVER", "$_DATABASE", "$_HOSTING"], correcta: 0, explicacion: "$_SERVER es una variable predefinida que contiene información sobre el servidor, la solicitud y el entorno de ejecución." },
    { tipo: "opcion", pregunta: "¿Qué tipo de información puede encontrarse en $_SERVER?", opciones: ["Rutas, encabezados y datos de la solicitud", "Únicamente contraseñas", "Solo imágenes almacenadas"], correcta: 0, explicacion: "$_SERVER puede contener información como rutas, nombres de archivos, encabezados y datos relacionados con la conexión." },
    { tipo: "opcion", pregunta: "¿Qué variable predefinida se utiliza normalmente para recibir datos enviados mediante el método GET?", opciones: ["$_GET", "$_SEND", "$_URLDATA"], correcta: 0, explicacion: "$_GET contiene los datos enviados en la dirección web mediante parámetros de consulta." },
    { tipo: "opcion", pregunta: "¿Qué variable predefinida se utiliza normalmente para recibir datos enviados mediante el método POST?", opciones: ["$_FORM", "$_POST", "$_INPUT"], correcta: 1, explicacion: "$_POST permite acceder a datos enviados en el cuerpo de una solicitud HTTP, por ejemplo, desde un formulario." },
    { tipo: "opcion", pregunta: "¿Cuál es una característica de las variables superglobales de PHP?", opciones: ["Están disponibles automáticamente en muchos contextos", "Solo funcionan dentro de una función específica", "Solo pueden utilizarse en archivos HTML"], correcta: 0, explicacion: "Las superglobales son variables predefinidas de PHP que pueden utilizarse desde distintos ámbitos, según la variable y el contexto." },
    { tipo: "opcion", pregunta: "¿Qué extensión suele tener un archivo que contiene código PHP?", opciones: [".php", ".ph", ".phtmlcode"], correcta: 0, explicacion: "Los archivos con extensión .php son reconocidos normalmente por el servidor para ser procesados como archivos PHP." }
  ],
  
  // ==================== RUBY ====================
  fase1_ruby: [
    { tipo: "opcion", pregunta: "¿Qué es Ruby?", opciones: ["Un lenguaje de programación", "Un sistema operativo", "Un tipo de computadora"], correcta: 0, explicacion: "Ruby es un lenguaje de programación utilizado para crear diferentes tipos de aplicaciones." },
    { tipo: "opcion", pregunta: "¿Cuál de los siguientes nombres representa normalmente una variable local válida en Ruby?", opciones: ["nombre_usuario", "2nombre", "nombre-usuario"], correcta: 0, explicacion: "Una variable local puede comenzar con una letra minúscula y utilizar guiones bajos." },
    { tipo: "opcion", pregunta: "¿Ruby distingue entre mayúsculas y minúsculas?", opciones: ["Sí", "No", "Solo en los nombres de clases"], correcta: 0, explicacion: "Ruby considera diferentes nombres como nombre y Nombre." },
    { tipo: "opcion", pregunta: "¿Con qué símbolo comienza normalmente una variable de instancia?", opciones: ["@", "#", "%"], correcta: 0, explicacion: "Ruby utiliza @ para identificar normalmente las variables de instancia." },
    { tipo: "opcion", pregunta: "¿Con qué símbolo comienza normalmente una variable global?", opciones: ["$", "&", "!"], correcta: 0, explicacion: "Las variables globales de Ruby comienzan con $ y pueden utilizarse en diferentes partes del programa." },
    { tipo: "opcion", pregunta: "¿Qué representa normalmente 'Hola' en Ruby?", opciones: ["Una cadena de texto", "Un valor booleano", "Una clase"], correcta: 0, explicacion: "El texto escrito entre comillas representa una cadena." },
    { tipo: "opcion", pregunta: "¿Cuál de estos valores representa verdadero en Ruby?", opciones: ["yes", "true", "correct"], correcta: 1, explicacion: "true representa el valor verdadero; false representa el valor falso." },
    { tipo: "opcion", pregunta: "¿Para qué sirve principalmente un método?", opciones: ["Para realizar una tarea específica y reutilizable", "Para apagar la computadora", "Para cambiar el idioma del teclado"], correcta: 0, explicacion: "Los métodos agrupan instrucciones que pueden ejecutarse cuando se necesitan." },
    { tipo: "opcion", pregunta: "¿Qué palabra se utiliza normalmente para iniciar una condición en Ruby?", opciones: ["if", "conditionStart", "testonly"], correcta: 0, explicacion: "if permite ejecutar instrucciones cuando una condición es verdadera." },
    { tipo: "opcion", pregunta: "¿Qué palabra se utiliza para representar una alternativa cuando una condición anterior no se cumple?", opciones: ["else", "otherwiseRuby", "alternativeOnly"], correcta: 0, explicacion: "else permite ejecutar otro bloque de instrucciones cuando la condición principal es falsa." },
    { tipo: "opcion", pregunta: "¿Qué es un arreglo en Ruby?", opciones: ["Una colección ordenada de elementos", "Una condición lógica", "Un mensaje de error"], correcta: 0, explicacion: "Los arreglos almacenan varios objetos en un orden específico." },
    { tipo: "opcion", pregunta: "¿Desde qué índice comienza normalmente un arreglo en Ruby?", opciones: ["0", "1", "10"], correcta: 0, explicacion: "En Ruby, el primer elemento de un arreglo normalmente se encuentra en la posición 0." },
    { tipo: "opcion", pregunta: "¿Qué estructura utiliza pares de clave y valor?", opciones: ["Un hash", "Un comentario", "Un número entero"], correcta: 0, explicacion: "Los hashes permiten asociar una clave con un valor." },
    { tipo: "opcion", pregunta: "¿Para qué sirve principalmente el símbolo # al inicio de una línea?", opciones: ["Para crear un comentario", "Para declarar una variable global", "Para crear un arreglo"], correcta: 0, explicacion: "Un comentario sirve para explicar el código y normalmente no se ejecuta." },
    { tipo: "opcion", pregunta: "¿Qué ocurre si se utiliza una variable local que no ha sido inicializada correctamente?", opciones: ["Ruby puede producir un error", "Ruby siempre la convierte en cero", "Ruby la convierte automáticamente en texto"], correcta: 0, explicacion: "Una variable local no inicializada puede provocar un error de nombre cuando el programa intenta utilizarla." }
  ],

  // ==================== JAVASCRIPT ====================
  fase1_javascript: [
    { tipo: "opcion", pregunta: "¿Qué es JavaScript?", opciones: ["Un lenguaje de programación", "Un programa para editar imágenes", "Un sistema operativo"], correcta: 0, explicacion: "JavaScript permite crear interactividad y comportamiento en páginas y aplicaciones." },
    { tipo: "opcion", pregunta: "¿Para qué se utiliza principalmente let?", opciones: ["Para declarar una variable que puede cambiar", "Para crear una imagen", "Para iniciar un servidor"], correcta: 0, explicacion: "let declara una variable local cuyo valor puede reasignarse." },
    { tipo: "opcion", pregunta: "¿Qué característica tiene una variable declarada con const?", opciones: ["No puede reasignarse", "Solo puede guardar números", "Se elimina automáticamente"], correcta: 0, explicacion: "const crea una variable cuyo identificador no puede recibir otra asignación." },
    { tipo: "opcion", pregunta: "¿Cuál de estos valores representa texto?", opciones: ["\"Hola\"", "false", "45"], correcta: 0, explicacion: "El valor entre comillas es una cadena de texto." },
    { tipo: "opcion", pregunta: "¿Cuál de estos valores representa verdadero?", opciones: ["yes", "true", "correcto"], correcta: 1, explicacion: "JavaScript utiliza true para representar el valor booleano verdadero." },
    { tipo: "opcion", pregunta: "¿Para qué sirven principalmente los operadores?", opciones: ["Para realizar operaciones o comparaciones", "Para instalar JavaScript", "Para crear carpetas automáticamente"], correcta: 0, explicacion: "Los operadores permiten calcular resultados y comparar valores." },
    { tipo: "opcion", pregunta: "¿Qué estructura se utiliza normalmente para evaluar una condición?", opciones: ["if", "conditionStart", "checkOnly"], correcta: 0, explicacion: "if ejecuta instrucciones cuando una condición es verdadera." },
    { tipo: "opcion", pregunta: "¿Qué palabra se utiliza para representar una alternativa cuando una condición no se cumple?", opciones: ["else", "otherwiseOnly", "alternativeCode"], correcta: 0, explicacion: "else permite ejecutar un bloque alternativo." },
    { tipo: "opcion", pregunta: "¿Para qué sirve principalmente una función?", opciones: ["Para agrupar instrucciones reutilizables", "Para apagar el navegador", "Para eliminar el programa"], correcta: 0, explicacion: "Las funciones organizan tareas y evitan repetir instrucciones." },
    { tipo: "opcion", pregunta: "¿Qué es un arreglo en JavaScript?", opciones: ["Una colección ordenada de valores", "Una condición lógica", "Un mensaje de error"], correcta: 0, explicacion: "Un arreglo puede guardar varios elementos organizados por posiciones." },
    { tipo: "opcion", pregunta: "¿Desde qué índice comienza normalmente un arreglo?", opciones: ["0", "1", "10"], correcta: 0, explicacion: "El primer elemento de un arreglo normalmente ocupa el índice 0." },
    { tipo: "opcion", pregunta: "¿Qué permite representar normalmente un objeto?", opciones: ["Una entidad con propiedades y valores", "Solo una resta", "Un archivo de imagen"], correcta: 0, explicacion: "Los objetos agrupan datos relacionados mediante propiedades." },
    { tipo: "opcion", pregunta: "¿Dónde puede ejecutarse JavaScript?", opciones: ["En navegadores y servidores", "Solo dentro de imágenes", "Únicamente en archivos PDF"], correcta: 0, explicacion: "JavaScript puede ejecutarse en el navegador y en servidores mediante entornos como Node.js." },
    { tipo: "opcion", pregunta: "¿Qué ocurre cuando una variable se declara con let dentro de un bloque?", opciones: ["Normalmente queda limitada a ese bloque", "Se convierte automáticamente en una constante global", "Se transforma en un arreglo"], correcta: 0, explicacion: "let tiene alcance de bloque." },
    { tipo: "opcion", pregunta: "¿Qué valor suele tener una variable declarada sin recibir un valor?", opciones: ["undefined", "alwaysTrue", "emptyNumber"], correcta: 0, explicacion: "Una variable declarada sin asignación puede tener el valor undefined." }
  ],

  // ==================== C ====================
  fase1_c: [
    { tipo: "opcion", pregunta: "¿Qué es C?", opciones: ["Un lenguaje de programación", "Un navegador web", "Un sistema operativo"], correcta: 0, explicacion: "C permite escribir instrucciones para crear programas y sistemas." },
    { tipo: "opcion", pregunta: "¿Para qué sirve una variable?", opciones: ["Para almacenar un valor", "Para apagar el programa", "Para conectar la computadora a internet"], correcta: 0, explicacion: "Una variable guarda información que puede utilizar el programa." },
    { tipo: "opcion", pregunta: "¿Qué tipo de dato se utiliza normalmente para guardar un número entero?", opciones: ["int", "char", "text"], correcta: 0, explicacion: "int representa números enteros." },
    { tipo: "opcion", pregunta: "¿Qué tipo de dato se utiliza normalmente para guardar un carácter?", opciones: ["char", "numberText", "integerOnly"], correcta: 0, explicacion: "char se utiliza para almacenar un carácter individual." },
    { tipo: "opcion", pregunta: "¿Cuál es el nombre de la función principal en C?", opciones: ["main", "startProgram", "beginCode"], correcta: 0, explicacion: "La ejecución de un programa C comienza normalmente en la función main." },
    { tipo: "opcion", pregunta: "¿Qué símbolo termina normalmente una instrucción en C?", opciones: ["Punto y coma", "Dos puntos", "Coma"], correcta: 0, explicacion: "Muchas instrucciones de C terminan con punto y coma." },
    { tipo: "opcion", pregunta: "¿Para qué sirven los comentarios?", opciones: ["Para explicar el código", "Para acelerar internet", "Para crear variables automáticamente"], correcta: 0, explicacion: "Los comentarios ayudan a entender el programa y normalmente no se ejecutan." },
    { tipo: "opcion", pregunta: "¿Para qué sirven los operadores?", opciones: ["Para realizar operaciones o comparaciones", "Para instalar el compilador", "Para apagar el monitor"], correcta: 0, explicacion: "Los operadores permiten calcular y comparar valores." },
    { tipo: "opcion", pregunta: "¿Qué palabra se utiliza normalmente para iniciar una condición?", opciones: ["if", "check", "conditionStart"], correcta: 0, explicacion: "if permite ejecutar instrucciones cuando una condición se cumple." },
    { tipo: "opcion", pregunta: "¿Qué palabra permite indicar una alternativa cuando una condición no se cumple?", opciones: ["else", "otherwiseCode", "alternativeStart"], correcta: 0, explicacion: "else ejecuta otro bloque cuando la condición principal es falsa." },
    { tipo: "opcion", pregunta: "¿Para qué sirve un bucle?", opciones: ["Para repetir instrucciones", "Para cambiar el teclado", "Para crear un archivo de imagen"], correcta: 0, explicacion: "Los bucles permiten repetir tareas." },
    { tipo: "opcion", pregunta: "¿Cuál de estas estructuras es un bucle de C?", opciones: ["for", "repeatTextOnly", "loopStartCode"], correcta: 0, explicacion: "for permite repetir instrucciones usando una estructura de control." },
    { tipo: "opcion", pregunta: "¿Para qué sirve principalmente una función?", opciones: ["Para agrupar instrucciones reutilizables", "Para apagar la computadora", "Para borrar el código fuente"], correcta: 0, explicacion: "Las funciones organizan tareas y evitan repetir código." },
    { tipo: "opcion", pregunta: "¿Qué componente traduce el código C para que la computadora pueda ejecutarlo?", opciones: ["El compilador", "El navegador", "El teclado"], correcta: 0, explicacion: "El compilador transforma el código fuente en una forma que puede ejecutar la computadora." },
    { tipo: "opcion", pregunta: "¿Qué puede ocurrir si falta un punto y coma donde es necesario?", opciones: ["Puede producirse un error de compilación", "El programa siempre funciona igual", "La computadora cambia de idioma"], correcta: 0, explicacion: "Los errores de sintaxis, como olvidar un punto y coma, pueden impedir que el programa compile." }
  ],

  // ==================== C++ ====================
  fase1_cplusplus: [
    { tipo: "opcion", pregunta: "¿Qué es C++?", opciones: ["Un lenguaje de programación", "Un sistema operativo", "Un navegador web"], correcta: 0, explicacion: "C++ permite crear aplicaciones, videojuegos, sistemas y otros programas." },
    { tipo: "opcion", pregunta: "¿Para qué sirve una variable?", opciones: ["Para almacenar un valor", "Para apagar el programa", "Para conectar la computadora a internet"], correcta: 0, explicacion: "Una variable guarda información que el programa puede utilizar." },
    { tipo: "opcion", pregunta: "¿Qué tipo de dato se utiliza normalmente para guardar un número entero?", opciones: ["int", "char", "bool"], correcta: 0, explicacion: "int representa números enteros." },
    { tipo: "opcion", pregunta: "¿Qué tipo de dato se utiliza normalmente para guardar verdadero o falso?", opciones: ["bool", "float", "char"], correcta: 0, explicacion: "bool representa valores booleanos: verdadero o falso." },
    { tipo: "opcion", pregunta: "¿Qué tipo de dato se utiliza normalmente para guardar un carácter?", opciones: ["char", "int", "double"], correcta: 0, explicacion: "char almacena un carácter individual." },
    { tipo: "opcion", pregunta: "¿Cuál es el nombre de la función principal en C++?", opciones: ["main", "startProgram", "beginCode"], correcta: 0, explicacion: "La ejecución de un programa C++ comienza normalmente en la función main." },
    { tipo: "opcion", pregunta: "¿Qué símbolo termina normalmente una instrucción en C++?", opciones: ["Punto y coma", "Dos puntos", "Coma"], correcta: 0, explicacion: "Muchas instrucciones de C++ terminan con punto y coma." },
    { tipo: "opcion", pregunta: "¿Para qué sirven los comentarios?", opciones: ["Para explicar el código", "Para acelerar la computadora", "Para crear variables automáticamente"], correcta: 0, explicacion: "Los comentarios documentan el programa y normalmente no se ejecutan." },
    { tipo: "opcion", pregunta: "¿Qué palabra se utiliza normalmente para iniciar una condición?", opciones: ["if", "check", "conditionStart"], correcta: 0, explicacion: "if permite ejecutar instrucciones cuando una condición se cumple." },
    { tipo: "opcion", pregunta: "¿Qué palabra permite indicar una alternativa cuando una condición no se cumple?", opciones: ["else", "otherwiseCode", "alternativeStart"], correcta: 0, explicacion: "else ejecuta otro bloque cuando la condición principal es falsa." },
    { tipo: "opcion", pregunta: "¿Para qué sirve un bucle?", opciones: ["Para repetir instrucciones", "Para cambiar el teclado", "Para crear una imagen"], correcta: 0, explicacion: "Los bucles repiten una tarea durante un tiempo o cantidad determinada." },
    { tipo: "opcion", pregunta: "¿Cuál de estas estructuras es un bucle de C++?", opciones: ["for", "repeatTextOnly", "loopStartCode"], correcta: 0, explicacion: "for es una estructura utilizada para repetir instrucciones." },
    { tipo: "opcion", pregunta: "¿Para qué sirve principalmente una función?", opciones: ["Para agrupar instrucciones reutilizables", "Para apagar la computadora", "Para borrar el código"], correcta: 0, explicacion: "Las funciones organizan tareas y evitan repetir código." },
    { tipo: "opcion", pregunta: "¿Qué es una clase en C++?", opciones: ["Un molde para crear objetos", "Un mensaje de error", "Un tipo de número"], correcta: 0, explicacion: "Una clase define las características y comportamientos de los objetos." },
    { tipo: "opcion", pregunta: "¿Qué puede ocurrir si falta un punto y coma donde es necesario?", opciones: ["Puede producirse un error de compilación", "El programa siempre funciona igual", "La computadora cambia de idioma"], correcta: 0, explicacion: "Olvidar un símbolo necesario puede provocar un error de sintaxis." }
  ],

  // ==================== HTML (Prueba) ====================
  fase1_html: [
    { tipo: "opcion", pregunta: "¿Qué significa HTML?", opciones: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"], correcta: 0, explicacion: "HTML significa HyperText Markup Language." },
    { tipo: "opcion", pregunta: "¿Cuál es la etiqueta correcta para crear un párrafo?", opciones: ["<h1>", "<p>", "<parrafo>"], correcta: 1, explicacion: "La etiqueta <p> viene de 'paragraph'." },
    { tipo: "opcion", pregunta: "¿Qué etiqueta se usa para insertar una imagen?", opciones: ["<picture>", "<img>", "<image>"], correcta: 1, explicacion: "La etiqueta correcta es <img>." }
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
