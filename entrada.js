// entrada.js
// Módulo reutilizable para leer datos desde la consola en cualquier ejercicio.
// Se importa una sola vez en cada archivo con:
// const { crearLector, preguntar } = require("./entrada");

const readline = require("node:readline");

function crearLector() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function preguntar(rl, mensaje) {
  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => resolve(respuesta));
  });
}

module.exports = { crearLector, preguntar };