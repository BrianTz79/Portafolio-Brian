import { writeFileSync, mkdirSync } from "node:fs";

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
  try {
    const control = new AbortController();
    const temporizador = setTimeout(() => control.abort(), 10000);
    const respuesta = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: control.signal,
    });
    clearTimeout(temporizador);
    return { nombre, url, estado: respuesta.ok ? "activo" : "inactivo" };
  } catch {
    return { nombre, url, estado: "inactivo" };
  }
}

const servicios = await Promise.all(DOMINIOS.map(comprobar));
const activos = servicios.filter((s) => s.estado === "activo").length;

mkdirSync("data", { recursive: true });
writeFileSync(
  "data/servicios.json",
  JSON.stringify({ verificadoEn: new Date().toISOString(), servicios }, null, 2)
);

console.log(`Servicios verificados: ${activos}/${servicios.length} activos.`);
// Nunca falla el build: un servicio caido se marca inactivo y ya.
process.exit(0);
