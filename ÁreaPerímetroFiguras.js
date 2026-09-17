// AreaPerimetroFiguras.js
// Calcula el área y el perímetro de una figura plana (triángulo, rectángulo,
// cuadrado o círculo) según la Tabla 1, a partir de un menú de selección.
// Ejecutar con: node AreaPerimetroFiguras.js

const { crearLector, preguntar } = require("./entrada");

const rl = crearLector();

// Pide un número y repite la pregunta hasta que el valor sea positivo
async function pedirNumeroPositivo(mensaje) {
  while (true) {
    const valor = parseFloat(await preguntar(rl, mensaje));

    if (isNaN(valor) || valor <= 0) {
      console.log("Error: debe ingresar un número mayor que 0. Intente de nuevo.");
    } else {
      return valor;
    }
  }
}

async function calcularTriangulo() {
  const a = await pedirNumeroPositivo("Ingrese el lado a: ");
  const b = await pedirNumeroPositivo("Ingrese el lado b (base): ");
  const c = await pedirNumeroPositivo("Ingrese el lado c: ");
  const h = await pedirNumeroPositivo("Ingrese la altura h: ");

  const perimetro = a + b + c;
  const area = (b * h) / 2;

  mostrarResultado("Triángulo", perimetro, area);
}

async function calcularRectangulo() {
  const base = await pedirNumeroPositivo("Ingrese la base (b): ");
  const altura = await pedirNumeroPositivo("Ingrese la altura (a): ");

  const perimetro = 2 * (base + altura);
  const area = base * altura;

  mostrarResultado("Rectángulo", perimetro, area);
}

async function calcularCuadrado() {
  const lado = await pedirNumeroPositivo("Ingrese el lado (a): ");

  const perimetro = 4 * lado;
  const area = lado ** 2;

  mostrarResultado("Cuadrado", perimetro, area);
}

async function calcularCirculo() {
  const radio = await pedirNumeroPositivo("Ingrese el radio (r): ");

  const perimetro = 2 * Math.PI * radio;
  const area = Math.PI * radio ** 2;

  mostrarResultado("Círculo", perimetro, area);
}

function mostrarResultado(figura, perimetro, area) {
  console.log(`\n--- ${figura} ---`);
  console.log("Perímetro: " + perimetro.toFixed(2));
  console.log("Área: " + area.toFixed(2));
}

async function main() {
  console.log("Seleccione la figura:");
  console.log("1. Triángulo");
  console.log("2. Rectángulo");
  console.log("3. Cuadrado");
  console.log("4. Círculo");

  const opcion = await preguntar(rl, "Opción (1-4): ");

  switch (opcion.trim()) {
    case "1":
      await calcularTriangulo();
      break;
    case "2":
      await calcularRectangulo();
      break;
    case "3":
      await calcularCuadrado();
      break;
    case "4":
      await calcularCirculo();
      break;
    default:
      console.log("Opción no válida.");
  }

  rl.close();
}

main();