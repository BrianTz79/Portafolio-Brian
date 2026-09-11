import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const ORIGEN = "/home/mizllet/miscosas/proyectos/CVBrian";

// Chromium viene de un snap y AppArmor solo le deja escribir dentro de
// ~/snap/chromium/. Por eso se genera ahi y despues se copia a public/.
const TEMPORAL = join(homedir(), "snap", "chromium", "common");

const VARIANTES = [
  { fuente: "CV-General.html", destino: "public/CV-Brian-Tellez-ES.pdf", temporal: "cv-es.pdf" },
  { fuente: "CV-General-EN.html", destino: "public/CV-Brian-Tellez-EN.pdf", temporal: "cv-en.pdf" },
];

mkdirSync(TEMPORAL, { recursive: true });
mkdirSync("public", { recursive: true });

for (const variante of VARIANTES) {
  const entrada = join(ORIGEN, variante.fuente);
  if (!existsSync(entrada)) {
    console.error(`No existe ${entrada}`);
    process.exit(1);
  }

  const salidaTemporal = join(TEMPORAL, variante.temporal);
  try {
    execFileSync("chromium", [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      `--print-to-pdf=${salidaTemporal}`,
      `file://${entrada}`,
    ], { stdio: ["ignore", "ignore", "pipe"] });
  } catch (error) {
    console.error(`No se pudo ejecutar chromium (¿esta en el PATH?): ${error.message}`);
    process.exit(1);
  }

  if (!existsSync(salidaTemporal)) {
    console.error(`Chromium no genero ${salidaTemporal}`);
    process.exit(1);
  }

  copyFileSync(salidaTemporal, variante.destino);
  console.log(`Generado ${variante.destino}`);
}
