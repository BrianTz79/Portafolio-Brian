import type { Proyecto } from "./proyectos";

/**
 * Marca visual generada para los proyectos que no tienen captura.
 *
 * La familia sale del stack real, no del slug: dos proyectos construidos de
 * forma parecida salen emparentados, que es lo que impide que catorce marcas
 * juntas se lean como ruido. El slug solo afina la variacion fina.
 *
 * No lleva color propio: se pinta con currentColor, asi que hereda --dim en la
 * lista y --signal en la ficha. El campo 'acento' de lib/proyectos.ts no se usa
 * — dos proyectos de esa lista caian fuera del gamut sRGB en tema claro y otros
 * dos compartian el mismo tono.
 */

export type Familia =
  | "nativa"
  | "ia"
  | "estatica"
  | "infra"
  | "juego"
  | "cumulo"
  | "pila"
  | "nucleo"
  | "cadena"
  | "pareja";

function incluye(stack: string[], ...terminos: string[]): boolean {
  return terminos.some((t) =>
    stack.some((s) => s.toLowerCase().includes(t.toLowerCase()))
  );
}

export function familiaDe(proyecto: Proyecto): Familia {
  const s = proyecto.stack;
  if (incluye(s, "React Native", "Expo", "Electron", "Kotlin")) return "nativa";
  if (incluye(s, "Ollama", "whisper", "ChromaDB", "discord.py")) return "ia";
  if (incluye(s, "Godot")) return "juego";
  if (incluye(s, "Astro")) return "estatica";
  if (incluye(s, "Ubuntu", "systemd") || (incluye(s, "Nginx") && !incluye(s, "React", "Vite")))
    return "infra";
  // La familia web se subdivide por capa de datos: sin esto, cinco proyectos
  // dibujaban practicamente la misma figura.
  if (incluye(s, "MongoDB")) return "cumulo";
  if (incluye(s, "FastAPI")) return "pila";
  if (incluye(s, "Fastify")) return "nucleo";
  if (incluye(s, "Express")) return "cadena";
  return "pareja";
}

/** Entero estable a partir del slug, para la variacion fina. */
function semilla(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const ANCHO = 320;
const ALTO = 180;

/** Devuelve los elementos SVG de la marca, ya posicionados. */
export function trazosDe(proyecto: Proyecto): string {
  const familia = familiaDe(proyecto);
  const n = semilla(proyecto.slug);
  const cx = ANCHO / 2;
  const cy = ALTO / 2;

  switch (familia) {
    /* Marcos concentricos girados: pantallas de dispositivo. */
    case "nativa": {
      const giro = 4 + (n % 7);
      return [0, 1, 2]
        .map((i) => {
          const w = 58 - i * 14;
          const h = 96 - i * 22;
          return `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="7" transform="rotate(${
            giro * (i - 1)
          } ${cx} ${cy})"/>`;
        })
        .join("");
    }

    /* Ondas: inferencia y audio. Sin modelo local, la onda va amortiguada. */
    case "ia": {
      const local = incluye(proyecto.stack, "Ollama", "whisper", "ChromaDB");
      const amp = local ? 34 : 14;
      const ciclos = local ? 2 : 3;
      const puntos: string[] = [];
      for (let x = 0; x <= ANCHO; x += 4) {
        const t = (x / ANCHO) * Math.PI * 2 * ciclos;
        const decaimiento = local ? 1 : 1 - x / (ANCHO * 1.6);
        puntos.push(`${x},${(cy + Math.sin(t) * amp * decaimiento).toFixed(1)}`);
      }
      return `<polyline points="${puntos.join(" ")}" fill="none"/>`;
    }

    /* Columnas macizas: documento paginado. */
    case "estatica": {
      const dens = 5 + (n % 3);
      const paso = (ANCHO - 68 - 14) / dens;
      return Array.from({ length: dens + 1 }, (_, i) => {
        const x = 34 + i * paso;
        const h = 44 + ((n >> i) % 5) * 14;
        return `<rect x="${x.toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="10" height="${h}" rx="2"/>`;
      }).join("");
    }

    /* Ejes verticales con nodos: servicios sobre un host. */
    case "infra": {
      const ejes = 4;
      const paso = (ANCHO - 80) / (ejes - 1);
      return Array.from({ length: ejes }, (_, i) => {
        const x = 40 + i * paso;
        const nodos = 2 + ((n >> (i * 2)) % 3);
        const linea = `<line x1="${x}" y1="34" x2="${x}" y2="${ALTO - 34}"/>`;
        const puntos = Array.from({ length: nodos }, (_, j) => {
          const y = 34 + ((ALTO - 68) / (nodos + 1)) * (j + 1);
          return `<circle cx="${x}" cy="${y.toFixed(1)}" r="5"/>`;
        }).join("");
        return linea + puntos;
      }).join("");
    }

    /* Rejilla isometrica: tablero. */
    case "juego": {
      const lineas = 3 + (n % 2);
      const paso = 24 + (n % 6);
      const salida: string[] = [];
      for (let i = -lineas; i <= lineas; i++) {
        const d = i * paso;
        salida.push(
          `<line x1="${cx - 78 + d}" y1="${cy + 44}" x2="${cx + 6 + d}" y2="${cy - 44}"/>`
        );
        salida.push(
          `<line x1="${cx - 6 + d}" y1="${cy - 44}" x2="${cx + 78 + d}" y2="${cy + 44}"/>`
        );
      }
      return salida.join("");
    }

    /* Racimos organicos: coleccion sin esquema fijo. */
    case "cumulo": {
      return Array.from({ length: 9 }, (_, i) => {
        const ang = (i / 9) * Math.PI * 2 + (n % 10) / 10;
        const rad = 30 + ((n >> i) % 26);
        return `<circle cx="${(cx + Math.cos(ang) * rad).toFixed(1)}" cy="${(
          cy +
          Math.sin(ang) * rad * 0.62
        ).toFixed(1)}" r="${5 + ((n >> (i + 3)) % 4)}"/>`;
      }).join("");
    }

    /* Capas horizontales apiladas. */
    case "pila": {
      return Array.from({ length: 4 }, (_, i) => {
        const w = 150 - i * 22;
        const y = cy - 48 + i * 27;
        return `<rect x="${(cx - w / 2).toFixed(1)}" y="${y}" width="${w}" height="17" rx="3"/>`;
      }).join("");
    }

    /* Nucleo con satelites. */
    case "nucleo": {
      const sat = 5;
      const orbitas = Array.from({ length: sat }, (_, i) => {
        const ang = (i / sat) * Math.PI * 2;
        const x = cx + Math.cos(ang) * 62;
        const y = cy + Math.sin(ang) * 42;
        return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(
          1
        )}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>`;
      }).join("");
      return `<circle cx="${cx}" cy="${cy}" r="17"/>${orbitas}`;
    }

    /* Cadena lineal escalonada: peticion que atraviesa capas. */
    case "cadena": {
      const pasos = 4;
      const paso = (ANCHO - 92) / (pasos - 1);
      const salida: string[] = [];
      for (let i = 0; i < pasos; i++) {
        const x = 46 + i * paso;
        const y = cy - 30 + (i % 2) * 60;
        salida.push(`<rect x="${(x - 19).toFixed(1)}" y="${y - 13}" width="38" height="26" rx="4"/>`);
        if (i < pasos - 1) {
          const xs = 46 + (i + 1) * paso;
          const ys = cy - 30 + ((i + 1) % 2) * 60;
          salida.push(
            `<line x1="${(x + 19).toFixed(1)}" y1="${y}" x2="${(xs - 19).toFixed(1)}" y2="${ys}"/>`
          );
        }
      }
      return salida.join("");
    }

    /* Dos cajas conectadas: cliente y almacen. La separacion, la altura y el
       numero de divisiones internas salen del slug, o dos proyectos de esta
       familia dibujarian exactamente la misma figura. */
    case "pareja": {
      const sep = 18 + (n % 14);
      const h = 56 + (n % 4) * 9;
      const w = 68 + ((n >> 3) % 3) * 8;
      const divisiones = 1 + (n % 3);
      const izq = cx - sep - w;
      const der = cx + sep;
      const rayas = Array.from({ length: divisiones }, (_, i) => {
        const y = cy - h / 2 + (h / (divisiones + 1)) * (i + 1);
        return `<line x1="${der + 9}" y1="${y.toFixed(1)}" x2="${der + w - 9}" y2="${y.toFixed(1)}"/>`;
      }).join("");
      return [
        `<rect x="${izq}" y="${cy - h / 2}" width="${w}" height="${h}" rx="6"/>`,
        `<rect x="${der}" y="${cy - h / 2}" width="${w}" height="${h}" rx="6"/>`,
        `<line x1="${izq + w}" y1="${cy}" x2="${der}" y2="${cy}"/>`,
        `<circle cx="${cx}" cy="${cy}" r="6"/>`,
        rayas,
      ].join("");
    }
  }
}

export const VIEWBOX = `0 0 ${ANCHO} ${ALTO}`;
