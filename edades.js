// edades.js
// Almacena las edades de 10 personas en un vector (array), valida cada
// entrada entre 1 y 120, y calcula menores de edad, mayores de edad,
// adultos mayores (60+), edad mínima, edad máxima y promedio.
// Ejecutar con: node edades.js

const { crearLector, preguntar } = require("./entrada");

const rl = crearLector();
const TOTAL_PERSONAS = 10;

async function pedirEdadValida(numeroPersona) {
  while (true) {
    const respuesta = await preguntar(
      rl,
      `Ingrese la edad de la persona ${numeroPersona}: `
    );
    const edad = parseInt(respuesta);

    if (isNaN(edad) || edad < 1 || edad > 120) {
      console.log("Error: la edad debe ser un número entero entre 1 y 120. Intente de nuevo.");
    } else {
      return edad;
    }
  }
}

async function main() {
  const edades = [];

  for (let i = 1; i <= TOTAL_PERSONAS; i++) {
    const edad = await pedirEdadValida(i);
    edades.push(edad);
  }

  let menores = 0;
  let mayores = 0;
  let adultosMayores = 0;
  let sumaEdades = 0;
  let edadMinima = edades[0];
  let edadMaxima = edades[0];

  for (const edad of edades) {
    if (edad < 18) {
      menores++;
    } else {
      mayores++;
    }

    if (edad >= 60) {
      adultosMayores++;
    }

    sumaEdades += edad;
    if (edad < edadMinima) edadMinima = edad;
    if (edad > edadMaxima) edadMaxima = edad;
  }

  const promedio = sumaEdades / edades.length;

  console.log("\n--- Resultados ---");
  console.log("Edades ingresadas: " + edades.join(", "));
  console.log("Menores de edad: " + menores);
  console.log("Mayores de edad: " + mayores);
  console.log("Adultos mayores (60 o más): " + adultosMayores);
  console.log("Edad más baja: " + edadMinima);
  console.log("Edad más alta: " + edadMaxima);
  console.log("Promedio de edades: " + promedio.toFixed(2));

  rl.close();
}

main();