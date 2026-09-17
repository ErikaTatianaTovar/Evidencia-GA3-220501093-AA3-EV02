// mezclaVectores.js
// Lee dos vectores de enteros ordenados ascendentemente (tamaño fijo de 5),
// valida que cada dato ingresado mantenga el orden ascendente, y produce
// la lista ordenada resultante de mezclar ambos vectores.
// Ejecutar con: node mezclaVectores.js

const { crearLector, preguntar } = require("./entrada");

const rl = crearLector();
const TAMANO = 5;

async function pedirVectorAscendente(nombreVector) {
  const vector = [];

  for (let i = 1; i <= TAMANO; i++) {
    while (true) {
      const valor = parseInt(await preguntar(rl, `Ingrese el elemento ${i} del ${nombreVector}: `));

      if (isNaN(valor)) {
        console.log("Error: debe ingresar un número entero. Intente de nuevo.");
        continue;
      }

      const anterior = vector[vector.length - 1];
      if (vector.length > 0 && valor <= anterior) {
        console.log(`Error: el valor debe ser mayor que el anterior (${anterior}), para mantener el orden ascendente. Intente de nuevo.`);
        continue;
      }

      vector.push(valor);
      break;
    }
  }

  return vector;
}

function mezclarVectoresOrdenados(vectorA, vectorB) {
  const resultado = [];
  let i = 0;
  let j = 0;

  while (i < vectorA.length && j < vectorB.length) {
    if (vectorA[i] <= vectorB[j]) {
      resultado.push(vectorA[i]);
      i++;
    } else {
      resultado.push(vectorB[j]);
      j++;
    }
  }

  while (i < vectorA.length) resultado.push(vectorA[i++]);
  while (j < vectorB.length) resultado.push(vectorB[j++]);

  return resultado;
}

async function main() {
  console.log(`Ingrese los ${TAMANO} valores del primer vector, en orden ascendente:`);
  const vectorA = await pedirVectorAscendente("vector A");

  console.log(`\nIngrese los ${TAMANO} valores del segundo vector, en orden ascendente:`);
  const vectorB = await pedirVectorAscendente("vector B");

  const mezcla = mezclarVectoresOrdenados(vectorA, vectorB);

  console.log("\n--- Resultado ---");
  console.log("Vector A: " + vectorA.join(" "));
  console.log("Vector B: " + vectorB.join(" "));
  console.log("Lista mezclada: " + mezcla.join(" "));

  rl.close();
}

main();