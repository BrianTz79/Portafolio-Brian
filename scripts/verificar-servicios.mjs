import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";

const SALIDA = "data/servicios.json";

const DOMINIOS = [
  { nombre: "notecore", url: "https://notecore.ourocore.net" },
  { nombre: "wander", url: "https://wander.ourocore.net" },
  { nombre: "shokan", url: "https://shokan.ourocore.net" },
  { nombre: "koko", url: "https://koko.ourocore.net" },
  { nombre: "ourocore", url: "https://www.ourocore.net" },
  { nombre: "zaga", url: "https://www.zagadistribuciones.com" },
  { nombre: "goons", url: "https://goonsandgooners.stellarbanana.com" },
  { nombre: "portafolio", url: "https://briantellez.ourocore.net" },
];

async function comprobar({ nombre, url }) {
  // La latencia medida aqui alimenta el panel de la portada: cada servicio
  // entra en la animacion a su propio ritmo, asi que el numero tiene que ser
  // real. Se mide la peticion completa, incluida la resolucion de DNS y TLS.
  const inicio = performance.now();
  const transcurrido = () => Math.round(performance.now() - inicio);
  try {
    const control = new AbortController();
    const temporizador = setTimeout(() => control.abort(), 10000);
    const respuesta = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: control.signal,
    });
    clearTimeout(temporizador);
    return {
      nombre,
      url,
      estado: respuesta.ok ? "activo" : "inactivo",
      ms: transcurrido(),
    };
  } catch {
    // Un servicio caido no tiene latencia que reportar: el tiempo medido seria
    // el del timeout, no el suyo.
    return { nombre, url, estado: "inactivo" };
  }
}

const servicios = await Promise.all(DOMINIOS.map(comprobar));
const activos = servicios.filter((s) => s.estado === "activo").length;

// Si TODOS fallan, casi siempre es la red de quien construye, no ocho servicios
// caidos a la vez: conservamos la ultima medicion buena en vez de publicar ceros.
if (activos === 0 && existsSync(SALIDA)) {
  try {
    const previo = JSON.parse(readFileSync(SALIDA, "utf8"));
    if (previo?.servicios?.some((s) => s.estado === "activo")) {
      console.error(
        `Ningun servicio respondio; conservo la verificacion de ${previo.verificadoEn}.`
      );
      process.exit(0);
    }
  } catch {
    // Si el estado previo no se puede leer, seguimos y escribimos el actual.
  }
}

try {
  mkdirSync("data", { recursive: true });
  writeFileSync(
    SALIDA,
    JSON.stringify({ verificadoEn: new Date().toISOString(), servicios }, null, 2)
  );
  console.log(`Servicios verificados: ${activos}/${servicios.length} activos.`);
} catch (error) {
  // Escribir el estado es lo unico que puede fallar aqui, y no vale tumbar el
  // despliegue por eso: el build sigue, sin panel actualizado.
  console.error(`No se pudo escribir data/servicios.json: ${error.message}`);
}

// Nunca falla el build: un servicio caido se marca inactivo y ya.
process.exit(0);
