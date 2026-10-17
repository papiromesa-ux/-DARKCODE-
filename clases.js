// clases.js - Base de datos de preguntas
const baseDePreguntas = {
  fase1_html: [
    {
      tipo: "opcion",
      pregunta: "¿Qué significa HTML?",
      opciones: [
        "HyperText Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language"
      ],
      correcta: 0,
      explicacion: "HTML significa HyperText Markup Language (Lenguaje de Marcas de Hipertexto)."
    },
    {
      tipo: "opcion",
      pregunta: "¿Cuál es la etiqueta correcta para crear un párrafo?",
      opciones: ["<h1>", "<p>", "<parrafo>"],
      correcta: 1,
      explicacion: "La etiqueta <p> viene de 'paragraph' (párrafo)."
    },
    {
      tipo: "completar",
      pregunta: "Completa la etiqueta para cerrar un título: <h1>Hola Mundo___",
      opciones: ["</h1>", "<h1>", "</h2>"],
      correcta: 0,
      explicacion: "Las etiquetas de cierre siempre llevan una barra inclinada '/'."
    },
    {
      tipo: "opcion",
      pregunta: "¿Qué etiqueta se usa para insertar una imagen?",
      opciones: ["<picture>", "<img>", "<image>"],
      correcta: 1,
      explicacion: "La etiqueta correcta es <img> (image), y es una etiqueta que no necesita cierre."
    },
    {
      tipo: "opcion",
      pregunta: "¿Cuál es la estructura básica de un documento HTML?",
      opciones: [
        "<html><body></body></html>",
        "<html><head></head><body></body></html>",
        "<body><html></html></body>"
      ],
      correcta: 1,
      explicacion: "Un documento HTML siempre lleva <html>, dentro <head> (configuración) y <body> (contenido visible)."
    }
  ]
};
