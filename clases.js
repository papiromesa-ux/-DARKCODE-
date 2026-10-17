// clases.js - Base de datos de preguntas (Las 10 Fases)
const baseDePreguntas = {
  fase1_html: [
    { tipo: "opcion", pregunta: "Vas a construir una página. ¿Cuál es la función principal de HTML?", opciones: ["Organizar el contenido y su significado.", "Administrar las contraseñas del servidor.", "Crear exclusivamente animaciones."], correcta: 0, explicacion: "HTML organiza la estructura y el significado del contenido." },
    { tipo: "opcion", pregunta: "¿Qué elemento elegirías para el encabezado principal de una página?", opciones: ["Un párrafo.", "Un encabezado de nivel 1.", "Un salto de línea."], correcta: 1, explicacion: "Los encabezados HTML tienen niveles del 1 al 6. El <h1> es el principal." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'Para que un texto sea un encabezado, basta con hacerlo grande visualmente'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "El nivel de encabezado se define con el elemento correspondiente, no solamente con su apariencia." }
  ],
  fase2_css: [
    { tipo: "opcion", pregunta: "Tu página tiene contenido, pero necesita colores y estilos. ¿Qué usarías?", opciones: ["CSS.", "Un sistema de contraseñas.", "Un servicio de correo."], correcta: 0, explicacion: "CSS permite definir la presentación de los elementos HTML." },
    { tipo: "opcion", pregunta: "El texto de una tarjeta está demasiado pegado a su borde. ¿Qué ajustarías?", opciones: ["El margen exterior.", "El espacio interior, llamado padding.", "El título de la página."], correcta: 1, explicacion: "El padding agrega espacio alrededor del contenido, dentro del borde." },
    { tipo: "opcion", pregunta: "Quieres separar dos tarjetas por fuera de sus bordes. ¿Qué propiedad necesitas?", opciones: ["Color.", "Tamaño de fuente.", "Margen."], correcta: 2, explicacion: "El margen corresponde al espacio exterior del borde." }
  ],
  fase3_lenguaje: [
    { tipo: "opcion", pregunta: "¿Qué usarías para guardar los puntos actuales del jugador mientras funciona el programa?", opciones: ["Una variable.", "Una imagen de fondo.", "Un encabezado."], correcta: 0, explicacion: "Las variables guardan datos en la memoria mientras el programa corre." },
    { tipo: "opcion", pregunta: "El usuario solo debe avanzar si respondió correctamente. ¿Qué concepto necesitas?", opciones: ["Un comentario.", "Una condición.", "Un icono."], correcta: 1, explicacion: "Las condiciones (if/else) permiten que el código tome decisiones." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'JavaScript solo puede ejecutarse dentro del navegador'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "JavaScript también puede ejecutarse en un servidor, por ejemplo mediante Node.js." }
  ],
  fase4_sw: [
    { tipo: "opcion", pregunta: "¿Qué misión puede cumplir un Service Worker?", opciones: ["Ayudar a ofrecer contenido sin conexión mediante recursos almacenados.", "Aumentar la memoria física del teléfono.", "Convertir automáticamente cualquier archivo en una aplicación."], correcta: 0, explicacion: "Puede interceptar solicitudes y gestionar recursos en caché." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'Agregar un Service Worker hace que toda la aplicación funcione sin internet automáticamente'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "Hay que definir qué recursos se almacenan y cómo se responden las solicitudes." },
    { tipo: "opcion", pregunta: "¿Dónde puedes registrar un Service Worker?", opciones: ["En cualquier página HTTP pública.", "Únicamente en aplicaciones de escritorio.", "En un contexto seguro, como HTTPS o localhost para desarrollo."], correcta: 2, explicacion: "Requiere un contexto seguro por razones de privacidad." }
  ],
  fase5_manifest: [
    { tipo: "opcion", pregunta: "¿Para qué sirve el manifiesto de una PWA?", opciones: ["Describir aspectos como su nombre, iconos y presentación.", "Guardar las contraseñas de todos los estudiantes.", "Sustituir el contenido HTML."], correcta: 0, explicacion: "El manifest le dice al sistema operativo cómo debe mostrarse la app instalada." },
    { tipo: "opcion", pregunta: "¿Cuál de estos datos pertenece al manifiesto?", opciones: ["La contraseña del administrador.", "Los iconos de la aplicación.", "Las respuestas privadas de otros usuarios."], correcta: 1, explicacion: "Los iconos son parte de la identidad visual de la PWA." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'El manifiesto, por sí solo, guarda las lecciones para usarlas sin conexión'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "La experiencia sin conexión requiere el Service Worker." }
  ],
  fase6_api: [
    { tipo: "opcion", pregunta: "En una aplicación que consulta un servidor, ¿qué permite una API?", opciones: ["Solicitar datos mediante una interfaz definida.", "Aumentar automáticamente la velocidad de internet.", "Evitar cualquier error del programa."], correcta: 0, explicacion: "Una API es un contrato para pedir y recibir datos." },
    { tipo: "opcion", pregunta: "La app necesita recuperar una lista de ejercicios del servidor. ¿Qué acción corresponde?", opciones: ["Cambiar el color del botón.", "Realizar una solicitud y procesar la respuesta.", "Instalar una fuente tipográfica."], correcta: 1, explicacion: "El frontend hace la petición y el servidor responde con los datos." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'Toda API pertenece a una empresa externa'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "También existen APIs proporcionadas por el navegador (como la del clima o el GPS)." }
  ],
  fase7_backend: [
    { tipo: "opcion", pregunta: "¿Dónde se ejecuta el código de backend?", opciones: ["Exclusivamente dentro de una imagen.", "En el servidor.", "Dentro del archivo de estilos."], correcta: 1, explicacion: "El backend corre en el servidor, lejos de la vista del usuario." },
    { tipo: "opcion", pregunta: "¿Qué tarea corresponde principalmente al backend?", opciones: ["Consultar una base de datos y preparar una respuesta.", "Elegir el grosor visual de un borde.", "Cambiar el espacio exterior de una tarjeta."], correcta: 0, explicacion: "El backend maneja la lógica de negocio y las bases de datos." },
    { tipo: "opcion", pregunta: "El navegador revisó los datos de un formulario. ¿Debe el servidor validarlos también?", opciones: ["No, nunca.", "Solo si el formulario tiene imágenes.", "Sí, antes de confiar en ellos."], correcta: 2, explicacion: "Nunca confíes en los datos del cliente; siempre valida en el servidor." }
  ],
  fase8_cyber: [
    { tipo: "opcion", pregunta: "¿Dónde guardarías una clave secreta de un servicio?", opciones: ["En el código público del navegador.", "En el servidor, fuera del frontend público.", "En el nombre del botón de inicio."], correcta: 1, explicacion: "Las claves secretas nunca deben estar en el código que el usuario puede ver." },
    { tipo: "opcion", pregunta: "Un campo espera una edad y recibe un texto enorme. ¿Qué debería hacer el servidor?", opciones: ["Aceptarlo sin revisarlo.", "Publicarlo automáticamente.", "Validar tipo, longitud y rango; rechazarlo si no cumple."], correcta: 2, explicacion: "La validación estricta previene ataques y errores." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'Los datos enviados por el usuario siempre son confiables'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "El usuario puede (y suele) manipular los datos antes de enviarlos." }
  ],
  fase9_ia: [
    { tipo: "opcion", pregunta: "¿Qué consulta le da mejor contexto a una IA para investigar un error?", opciones: ["'No funciona. Arréglalo'.", "'Esperaba este resultado, ocurrió este otro y aparece este mensaje de error'.", "'Cambia todo sin explicaciones'."], correcta: 1, explicacion: "La IA necesita contexto: qué esperabas, qué pasó y el error exacto." },
    { tipo: "opcion", pregunta: "La IA propone una solución. ¿Qué haces después?", opciones: ["Probarla y comprobar que resuelve el problema sin romper otras funciones.", "Publicarla sin revisarla.", "Borrar las pruebas anteriores."], correcta: 0, explicacion: "Siempre debes probar y entender el código que la IA te da." },
    { tipo: "opcion", pregunta: "El error continúa. ¿Cuál es el siguiente paso más útil?", opciones: ["Cambiar muchas cosas al azar.", "Suponer que el error desapareció.", "Reducir el problema a un caso pequeño y revisar las evidencias."], correcta: 2, explicacion: "Aislar el problema es la mejor técnica de depuración." }
  ],
  fase10_deploy: [
    { tipo: "opcion", pregunta: "¿Qué significa desplegar una aplicación web?", opciones: ["Publicarla en un entorno desde el que pueda utilizarse.", "Cambiar únicamente su logotipo.", "Borrar todos sus archivos."], correcta: 0, explicacion: "Desplegar es subir tu app a un servidor para que el mundo la use." },
    { tipo: "opcion", pregunta: "¿Qué dirección es adecuada para ofrecer una PWA instalable en producción?", opciones: ["Una dirección HTTP pública sin conexión segura.", "Una dirección HTTPS.", "Una ruta privada de tu computadora."], correcta: 1, explicacion: "HTTPS es obligatorio para instalar PWA por seguridad." },
    { tipo: "opcion", pregunta: "Verdadero o falso: 'Publicar la web e instalarla en el dispositivo son exactamente la misma acción'.", opciones: ["Verdadero.", "Falso."], correcta: 1, explicacion: "Publicar es subirla al servidor; instalar es guardarla en el dispositivo del usuario." }
  ]
};

// Nombres narrativos de las fases para el Mapa
const mapaMisiones = {
  1: { nombre: "Los cimientos", icono: "🧱" },
  2: { nombre: "Enciende el neón", icono: "🖌️" },
  3: { nombre: "El núcleo lógico", icono: "🧠" },
  4: { nombre: "Reserva de energía", icono: "🔋" },
  5: { nombre: "Identidad digital", icono: "🆔" },
  6: { nombre: "Central de comunicaciones", icono: "📡" },
  7: { nombre: "Sala de máquinas", icono: "⚙️" },
  8: { nombre: "El escudo", icono: "🛡️" },
  9: { nombre: "Laboratorio de errores", icono: "🔍" },
  10: { nombre: "Lanzamiento", icono: "🚀" }
};
