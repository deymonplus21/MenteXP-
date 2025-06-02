const preguntas = [
  {categoria: "Matemática", pregunta: "¿Cuánto es 5 × 4?", opciones: ["20", "10", "15", "25"], respuesta: "20"},
  {categoria: "Comunicación", pregunta: "¿Qué es un sustantivo?", opciones: ["Un verbo", "Una acción", "Una persona, lugar o cosa", "Un adjetivo"], respuesta: "Una persona, lugar o cosa"},
  {categoria: "Ciencia y Tecnología", pregunta: "¿Qué planeta es conocido como el planeta rojo?", opciones: ["Marte", "Júpiter", "Venus", "Saturno"], respuesta: "Marte"},
  {categoria: "DPCC", pregunta: "¿Qué es el respeto?", opciones: ["Insultar", "Escuchar a otros", "Gritar", "Ignorar"], respuesta: "Escuchar a otros"},
  {categoria: "Sociales", pregunta: "¿En qué continente está Perú?", opciones: ["Asia", "Europa", "América", "África"], respuesta: "América"},
  {categoria: "Arte", pregunta: "¿Qué mezcla de colores da como resultado el color verde?", opciones: ["Rojo + Azul", "Azul + Amarillo", "Amarillo + Rojo", "Negro + Blanco"], respuesta: "Azul + Amarillo"},
  {categoria: "Educación Física", pregunta: "¿Cuál es un ejercicio de calentamiento?", opciones: ["Dormir", "Caminar", "Estudiar", "Comer"], respuesta: "Caminar"}
];

let tiempoTotal = 20;
let temporizador;
let jugador = "";
let usadas = [];

function iniciarJuego() {
  jugador = document.getElementById("nombreJugador").value;
  if (!jugador) {
    alert("Por favor escribe tu nombre.");
    return;
  }
  document.querySelector(".pantalla-inicio").style.display = "none";
  document.querySelector(".juego").style.display = "block";
  iniciarTemporizador();
  mostrarPregunta();
}

function iniciarTemporizador() {
  document.getElementById("temporizador").textContent = `Tiempo: ${tiempoTotal}s`;
  temporizador = setInterval(() => {
    tiempoTotal--;
    document.getElementById("temporizador").textContent = `Tiempo: ${tiempoTotal}s`;
    if (tiempoTotal <= 0) {
      clearInterval(temporizador);
      alert("¡Tiempo terminado!");
      window.location.href = "tabla.html";
    }
  }, 1000);
}

function mostrarPregunta() {
  if (usadas.length === preguntas.length) usadas = [];

  let indice;
  do {
    indice = Math.floor(Math.random() * preguntas.length);
  } while (usadas.includes(indice));

  usadas.push(indice);

  const pregunta = preguntas[indice];
  document.getElementById("categoria").textContent = `Área: ${pregunta.categoria}`;
  document.getElementById("pregunta").textContent = pregunta.pregunta;

  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  pregunta.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => {
      if (op === pregunta.respuesta) {
        alert("¡Correcto!");
      } else {
        alert("Incorrecto");
      }
      mostrarPregunta();
    };
    opcionesDiv.appendChild(btn);
  });
}

document.getElementById("btnJugar").addEventListener("click", iniciarJuego);
