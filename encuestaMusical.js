// encuestaMusical.js
// Registra hasta 6 personas encuestadas sobre sus gustos musicales, con sus
// datos personales y hasta 3 canciones favoritas cada una. Menú con opciones
// para agregar una persona y para consultar una persona por su posición.
// Ejecutar con: node encuestaMusical.js

const { crearLector, preguntar } = require("./entrada");

const rl = crearLector();
const MAX_PERSONAS = 6;
const MAX_CANCIONES = 3;

const personas = [];

async function pedirTexto(mensaje) {
  while (true) {
    const valor = (await preguntar(rl, mensaje)).trim();
    if (valor.length === 0) {
      console.log("Error: este dato no puede quedar vacío. Intente de nuevo.");
    } else {
      return valor;
    }
  }
}

async function pedirCorreo(mensaje) {
  while (true) {
    const valor = (await preguntar(rl, mensaje)).trim();
    if (!valor.includes("@") || !valor.includes(".")) {
      console.log("Error: ingrese un correo electrónico válido (ejemplo: nombre@dominio.com).");
    } else {
      return valor;
    }
  }
}

async function pedirFecha(mensaje) {
  // Formato esperado: dd/mm/aaaa
  const formato = /^\d{2}\/\d{2}\/\d{4}$/;
  while (true) {
    const valor = (await preguntar(rl, mensaje)).trim();
    if (!formato.test(valor)) {
      console.log("Error: use el formato dd/mm/aaaa, por ejemplo 05/09/1998.");
    } else {
      return valor;
    }
  }
}

async function pedirCantidadCanciones() {
  while (true) {
    const valor = parseInt(await preguntar(rl, `¿Cuántas canciones favoritas desea registrar? (1 a ${MAX_CANCIONES}): `));
    if (isNaN(valor) || valor < 1 || valor > MAX_CANCIONES) {
      console.log(`Error: ingrese un número entre 1 y ${MAX_CANCIONES}.`);
    } else {
      return valor;
    }
  }
}

async function agregarPersona() {
  if (personas.length >= MAX_PERSONAS) {
    console.log(`No se pueden agregar más personas. El máximo es ${MAX_PERSONAS}.`);
    return;
  }

  console.log("\n--- Datos personales ---");
  const nombre = await pedirTexto("Nombre completo: ");
  const cedula = await pedirTexto("Número de identificación (cédula): ");
  const fechaNacimiento = await pedirFecha("Fecha de nacimiento (dd/mm/aaaa): ");
  const correo = await pedirCorreo("Correo electrónico: ");
  const ciudadResidencia = await pedirTexto("Ciudad de residencia: ");
  const ciudadOrigen = await pedirTexto("Ciudad de origen: ");

  const cantidadCanciones = await pedirCantidadCanciones();
  const canciones = [];

  console.log("\n--- Canciones favoritas ---");
  for (let i = 1; i <= cantidadCanciones; i++) {
    const artista = await pedirTexto(`Artista de la canción ${i}: `);
    const titulo = await pedirTexto(`Título de la canción ${i}: `);
    canciones.push({ artista, titulo });
  }

  personas.push({
    nombre,
    cedula,
    fechaNacimiento,
    correo,
    ciudadResidencia,
    ciudadOrigen,
    canciones,
  });

  console.log(`\nPersona registrada correctamente en la posición ${personas.length}.`);
}

async function mostrarPersona() {
  if (personas.length === 0) {
    console.log("Todavía no hay personas registradas.");
    return;
  }

  const posicion = parseInt(
    await preguntar(rl, `Ingrese la posición de la persona a consultar (1 a ${personas.length}): `)
  );

  if (isNaN(posicion) || posicion < 1 || posicion > personas.length) {
    console.log("Error: posición no válida.");
    return;
  }

  const persona = personas[posicion - 1];

  console.log(`\n--- Persona en la posición ${posicion} ---`);
  console.log("Nombre: " + persona.nombre);
  console.log("Cédula: " + persona.cedula);
  console.log("Fecha de nacimiento: " + persona.fechaNacimiento);
  console.log("Correo electrónico: " + persona.correo);
  console.log("Ciudad de residencia: " + persona.ciudadResidencia);
  console.log("Ciudad de origen: " + persona.ciudadOrigen);
  console.log("Canciones favoritas:");
  persona.canciones.forEach((cancion, indice) => {
    console.log(`  ${indice + 1}. "${cancion.titulo}" - ${cancion.artista}`);
  });
}

function mostrarMenu() {
  console.log("\n--- Encuesta de gustos musicales ---");
  console.log("a. Agregar una persona");
  console.log("b. Mostrar la información de una persona por su posición");
  console.log("c. Salir");
}

async function main() {
  let salir = false;

  while (!salir) {
    mostrarMenu();
    const opcion = (await preguntar(rl, "Seleccione una opción: ")).trim().toLowerCase();

    switch (opcion) {
      case "a":
        await agregarPersona();
        break;
      case "b":
        await mostrarPersona();
        break;
      case "c":
        salir = true;
        break;
      default:
        console.log("Opción no válida. Escriba a, b o c.");
    }
  }

  console.log("\nPrograma finalizado.");
  rl.close();
}

main();