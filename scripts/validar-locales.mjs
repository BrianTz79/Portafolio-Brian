import { readFileSync } from "node:fs";

const es = JSON.parse(readFileSync("locales/es.json", "utf8"));
const en = JSON.parse(readFileSync("locales/en.json", "utf8"));

function rutas(obj, prefijo = "") {
  const salida = [];
  for (const [clave, valor] of Object.entries(obj)) {
    const ruta = prefijo ? `${prefijo}.${clave}` : clave;
    if (Array.isArray(valor)) {
      salida.push(`${ruta}[${valor.length}]`);
      valor.forEach((item, i) => {
        if (item && typeof item === "object") salida.push(...rutas(item, `${ruta}[${i}]`));
      });
    } else if (valor && typeof valor === "object") {
      salida.push(...rutas(valor, ruta));
    } else {
      salida.push(ruta);
    }
  }
  return salida;
}

const enEs = new Set(rutas(es));
const enEn = new Set(rutas(en));

const faltanEnEn = [...enEs].filter((r) => !enEn.has(r));
const faltanEnEs = [...enEn].filter((r) => !enEs.has(r));

if (faltanEnEn.length || faltanEnEs.length) {
  if (faltanEnEn.length) {
    console.error(`\nFaltan en en.json (${faltanEnEn.length}):`);
    faltanEnEn.forEach((r) => console.error(`  ${r}`));
  }
  if (faltanEnEs.length) {
    console.error(`\nFaltan en es.json (${faltanEnEs.length}):`);
    faltanEnEs.forEach((r) => console.error(`  ${r}`));
  }
  process.exit(1);
}

console.log(`Locales en paridad: ${enEs.size} claves en ambos idiomas.`);
