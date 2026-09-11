# Rediseño del portafolio de Brian Tellez — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar el portafolio con identidad propia, centralizar los datos de proyectos, incorporar cuatro proyectos nuevos y una página de CV, y corregir todo dato obsoleto.

**Architecture:** Se introduce `lib/proyectos.ts` como fuente única de estructura (slug, estado, stack, URL) mientras la prosa sigue en `locales/*.json`. Una plantilla `<ProyectoPage>` reemplaza las nueve páginas escritas a mano. Los tokens de color pasan a consumirse de verdad por los componentes, lo que permite los dos temas sin duplicar clases.

**Tech Stack:** Next.js 16.2.2 (App Router, `output: 'export'`), React 19.2.4, Tailwind CSS 4.2.2 (CSS-first, sin archivo de config), TypeScript 5.9.3, next-themes, lucide-react, i18n propio por React Context.

**Spec:** `docs/superpowers/specs/2026-09-11-rediseno-portafolio-design.md`

## Global Constraints

Requisitos del spec que aplican a **todas** las tareas:

- **R1 — Nombre sin acentos:** siempre "Brian Tellez", nunca "Téllez". Aplica a código, copy, metadatos y commits.
- **R2 — Responsive:** toda página debe renderizar correctamente a 375 px de ancho sin scroll horizontal.
- **R3 — Dos temas:** oscuro por defecto + claro. Ningún color se escribe a mano por tema; todo sale de tokens.
- **R4 — Bilingüe ES/EN:** todo texto visible vive en `locales/es.json` y `locales/en.json`. Nada hardcodeado en JSX. Las dos claves deben existir siempre en ambos archivos.
- **Sin tests previos:** el proyecto no tiene framework de tests. La verificación de cada tarea es por comando ejecutable (`tsc`, `next build`, scripts de validación), no por suite unitaria.
- **`output: 'export'`:** sin servidor. Prohibido usar `cookies()`, `headers()`, Server Actions, o rutas `route.ts` dinámicas.
- **Contraste:** ningún par texto/fondo por debajo de 4.5:1.
- **No tocar `.env`** (contiene el token de Cloudflare; ya está en `.gitignore`).

**Paleta (valores exactos):**

| Token | Oscuro | Claro |
|---|---|---|
| `--ink` | `#0C0E10` | `#FFFFFF` |
| `--surface` | `#14171A` | `#F7F8F9` |
| `--line` | `#232830` | `#E3E6EA` |
| `--text` | `#E4E7EB` | `#14171A` |
| `--dim` | `#8B95A1` | `#5A6570` |
| `--signal` | `#F5A524` | `#9A6207` |
| `--live` | `#3FB950` | `#1A7F37` |

**Tipografía:** Space Grotesk (pesos 300,400,500,600,700) para titulares y texto; JetBrains Mono (400,500,700) para datos y estados. Verificadas disponibles en Google Fonts.

---

## Estructura de archivos

**Se crean:**
- `lib/proyectos.ts` — fuente única de estructura de proyectos
- `lib/infraestructura.ts` — lista de servicios del hero + tipo del estado
- `scripts/verificar-servicios.mjs` — comprueba los dominios en build, escribe JSON
- `scripts/validar-locales.mjs` — comprueba paridad de claves ES/EN
- `scripts/generar-cv-pdf.mjs` — HTML → PDF con chromium
- `app/components/PanelInfra.tsx` — panel del hero
- `app/components/ProyectoPage.tsx` — plantilla de página de proyecto
- `app/components/ListaProyectos.tsx` — lista densa con imagen
- `app/cv/page.tsx` + `app/cv/layout.tsx` — página de CV
- `app/proyectos/{notecore,zaga,wander,shokan}/page.tsx` + `layout.tsx`
- `data/servicios.json` — generado en build (gitignored)

**Se modifican:**
- `app/globals.css` — tokens reales, se borran los keyframes muertos
- `app/layout.tsx` — fuentes nuevas, GA por variable de entorno
- `app/page.tsx` — hero nuevo, tarjetas hardcodeadas fuera
- `app/proyectos/page.tsx` — consume `lib/proyectos.ts`
- `locales/es.json`, `locales/en.json` — datos corregidos + contenido nuevo
- `public/sitemap.xml` — rutas nuevas
- `package.json` — scripts de build y validación

**Se borran:** `public/{next,vercel,file,globe,window}.svg`

---

### Task 1: Tokens, fuentes y limpieza de base

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Delete: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`

**Interfaces:**
- Consumes: nada (primera tarea)
- Produces: variables CSS `--ink --surface --line --text --dim --signal --live` en ambos temas; clases de fuente `font-display` (Space Grotesk) y `font-mono` (JetBrains Mono) disponibles globalmente.

- [ ] **Step 1: Reemplazar el bloque de tokens en `app/globals.css`**

Sustituir todo el contenido actual por:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-ink: var(--ink);
  --color-surface: var(--surface);
  --color-line: var(--line);
  --color-text: var(--text);
  --color-dim: var(--dim);
  --color-signal: var(--signal);
  --color-live: var(--live);
  --radius-lg: 0.5rem;
  --radius-md: 0.375rem;
  --radius-sm: 0.25rem;
  --font-display: var(--fuente-display), system-ui, sans-serif;
  --font-mono: var(--fuente-mono), ui-monospace, monospace;
}

:root {
  --ink: #FFFFFF;
  --surface: #F7F8F9;
  --line: #E3E6EA;
  --text: #14171A;
  --dim: #5A6570;
  --signal: #9A6207;
  --live: #1A7F37;
}

.dark {
  --ink: #0C0E10;
  --surface: #14171A;
  --line: #232830;
  --text: #E4E7EB;
  --dim: #8B95A1;
  --signal: #F5A524;
  --live: #3FB950;
}

@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--line);
  }
  body {
    background-color: var(--ink);
    color: var(--text);
    font-family: var(--font-display);
  }
  :focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Nota: los keyframes `accordion-down/up` desaparecen — eran residuo de shadcn sin Radix instalado.

- [ ] **Step 2: Cambiar las fuentes en `app/layout.tsx`**

Reemplazar el import de Inter y su uso:

```tsx
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--fuente-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--fuente-mono",
  display: "swap",
});
```

Y en el elemento `<html>`, cambiar la className del body por la del html:

```tsx
<html lang="es" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
```

El `<body>` pierde `className={inter.className}` y queda sin className (los estilos vienen de `@layer base`).

- [ ] **Step 3: Mover el ID de Google Analytics a variable de entorno**

En `app/layout.tsx`, el script de gtag tiene `G-98KZK05595` escrito a mano. Reemplazar las dos ocurrencias del ID literal por `process.env.NEXT_PUBLIC_GA_ID`, y envolver todo el bloque del script para que no se renderice si la variable no existe:

```tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
    <script dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `}} />
  </>
)}
```

- [ ] **Step 4: Borrar la basura del scaffold**

```bash
git rm public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 5: Verificar que compila y que no quedan referencias muertas**

```bash
npx tsc --noEmit
grep -rn "next.svg\|vercel.svg\|window.svg\|globe.svg\|file.svg" app/ lib/ --include="*.tsx" --include="*.ts"
grep -rn "accordion-down\|accordion-up\|inter.className" app/
```

Expected: `tsc` sin salida (éxito). Los dos `grep` sin resultados. Si algún grep devuelve algo, corregir ese archivo antes de seguir.

- [ ] **Step 6: Verificar que el build pasa**

```bash
npx next build
```

Expected: build exitoso, genera `out/`. El sitio se verá roto visualmente (las páginas aún usan clases `zinc`) — es esperado en esta tarea.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/layout.tsx public/
git commit -m "Tokens de color propios, tipografia y limpieza de scaffold"
```

---

### Task 2: Validador de locales

**Files:**
- Create: `scripts/validar-locales.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: nada
- Produces: comando `npm run validar:locales` que sale con código 1 si `es.json` y `en.json` difieren en claves. Todas las tareas siguientes lo usan como verificación de R4.

- [ ] **Step 1: Escribir el validador**

Crear `scripts/validar-locales.mjs`:

```js
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
```

Nota: los arrays se comparan por longitud además de por contenido, porque un array con distinto número de elementos entre idiomas rompe los `.map()` de las páginas.

- [ ] **Step 2: Añadir el script a `package.json`**

En `"scripts"`, añadir:

```json
"validar:locales": "node scripts/validar-locales.mjs"
```

- [ ] **Step 3: Ejecutarlo contra los locales actuales**

```bash
npm run validar:locales
```

Expected: PASA con "Locales en paridad: N claves en ambos idiomas." Si falla, hay una discrepancia preexistente — corregirla en los JSON antes de continuar, porque todas las tareas siguientes dependen de esta verificación.

- [ ] **Step 4: Commit**

```bash
git add scripts/validar-locales.mjs package.json
git commit -m "Validador de paridad entre los dos idiomas"
```

---

### Task 3: Corregir todos los datos obsoletos

**Files:**
- Modify: `locales/es.json`
- Modify: `locales/en.json`

**Interfaces:**
- Consumes: `npm run validar:locales` de Task 2
- Produces: datos correctos en `about.description`, `experience.items`, `skills.categories`, `general_projects.portfolio`, `portafolio_details.stack`

- [ ] **Step 1: Corregir `about.description[0]` en ambos idiomas**

En `es.json`, el primer párrafo dice "8º semestre". Cambiar a "9º semestre". El párrafo completo corregido:

> "Soy estudiante de 9º semestre de Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de Tijuana, con promedio acumulado de 93.64/100. Mi visión de la tecnología no se limita a escribir código: busco comprender todo el ecosistema, desde el hardware hasta el despliegue. Esa curiosidad me llevó a diseñar, ensamblar y administrar mi propio servidor bare-metal, que hoy aloja ocho servicios en producción y me sirve de laboratorio para Fog Computing, orquestación con Docker, administración de Linux y seguridad de redes."

En `en.json`, el equivalente:

> "I'm a 9th-semester Computer Systems Engineering student at Instituto Tecnológico de Tijuana, with a 93.64/100 cumulative average. My view of technology isn't limited to writing code: I want to understand the whole ecosystem, from hardware to deployment. That curiosity led me to design, assemble and administer my own bare-metal server, which today hosts eight services in production and serves as my lab for Fog Computing, Docker orchestration, Linux administration and network security."

- [ ] **Step 2: Corregir `experience.items` en ambos idiomas**

Tres correcciones en `es.json`:

1. Item "Ingeniería en Sistemas Computacionales": `description` pasa de `"Promedio acumulado: 9.1 / 10."` a `"Promedio acumulado: 93.64 / 100. Cursando 9º semestre, con residencia profesional programada."`
2. Item "Dibujo Arquitectónico": `description` pasa de `"Promedio final: 8.6 / 10."` a `"Promedio final: 86 / 100. Egresado en 2021."`
3. Item "Cofundador y Desarrollador Full-Stack" (OuroCore): la descripción menciona "Raspberry Pi 5" como infraestructura, pero hoy corre en el servidor Ryzen. Cambiar a: `"Desarrollo web full-stack e infraestructura propia: servidor bare-metal Ryzen 5 9600X con Ubuntu Server, Docker y Cloudflare Tunnels, alojando ocho servicios en producción."`

Los mismos tres cambios en `en.json`:

1. `"Cumulative average: 93.64 / 100. Currently in 9th semester, with professional residency scheduled."`
2. `"Final average: 86 / 100. Graduated 2021."`
3. `"Full-stack web development and self-hosted infrastructure: bare-metal Ryzen 5 9600X server running Ubuntu Server, Docker and Cloudflare Tunnels, hosting eight services in production."`

- [ ] **Step 3: Actualizar `skills.categories` en ambos idiomas**

El stack actual subvende lo que Brian usa. Reemplazar los `badges` de las categorías existentes por estos (mismos nombres de categoría, mismo orden):

Lenguajes: `["Python", "TypeScript / JavaScript", "C# (.NET)", "Kotlin", "Dart", "SQL", "HTML / CSS", "Haskell", "Prolog"]`

Desarrollo Web y Móvil: `["React 19", "Next.js 16", "Astro", "Vite", "Tailwind CSS 4", "React Native / Expo", "Flutter", "Electron", "Zustand", "FastAPI", "Node.js / Express", "WebSockets", "WebRTC", "REST APIs"]`

Bases de Datos: `["PostgreSQL", "MongoDB", "Prisma", "Drizzle ORM", "Firebase Realtime Database", "ChromaDB"]`

Infraestructura, Redes y Adm.: `["Ubuntu Server & Linux", "Docker & Docker Compose", "Nginx", "Cloudflare Tunnels (Zero Trust)", "systemd", "Git & GitHub", "Redes (SSH, Samba, FTP)"]`

Hardware e IoT: `["Ensamblaje de servidores bare-metal", "Raspberry Pi 5", "Arduino / ESP32", "Arquitectura Fog Computing"]`

Añadir una categoría nueva **antes** de Idiomas, con el mismo formato de emoji que las demás:

```json
{
  "name": "🤖 IA y Datos",
  "badges": ["RAG", "Embeddings", "Whisper (ASR)", "TTS", "LLMs (Ollama, Llama 3)", "Evaluación y anotación de datos"]
}
```

En Idiomas, corregir el nivel de inglés: `"Inglés: Básico / Técnico (Oral y Escrito)"` pasa a `"Inglés: B1 — lectura y comprensión técnica avanzada"`.

Aplicar las mismas listas en `en.json` con los nombres de categoría ya traducidos que ya existen ahí, y el idioma como `"English: B1 — advanced technical reading and comprehension"`.

- [ ] **Step 4: Corregir la ficha del propio portafolio**

En `general_projects.portfolio` (ambos idiomas): `status` pasa de `"Proyecto Actual (Abr 2026)"` a `"Rediseñado (Sept 2026)"` / `"Redesigned (Sept 2026)"`.

En `portafolio_details.status`: de `"Versión Actual (Abril 2026)"` a `"Versión actual (septiembre 2026)"` / `"Current version (September 2026)"`.

En `portafolio_details.stack`, el primer elemento dice `"Next.js 14 (SSG)"`. Cambiar el array completo a:

```json
["Next.js 16 (SSG)", "React 19", "Tailwind CSS 4", "React Context (i18n)", "next-themes", "Docker Compose", "Nginx"]
```

- [ ] **Step 5: Verificar paridad y compilación**

```bash
npm run validar:locales
npx tsc --noEmit
grep -rn "8º semestre\|9.1 / 10\|8.6 / 10\|Next.js 14\|Básico / Técnico" locales/
```

Expected: validador PASA, `tsc` sin salida, el `grep` sin resultados.

- [ ] **Step 6: Commit**

```bash
git add locales/
git commit -m "Datos al dia: 9o semestre, promedios reales, stack completo"
```

---

### Task 4: Fuente única de proyectos

**Files:**
- Create: `lib/proyectos.ts`

**Interfaces:**
- Consumes: nada
- Produces:
  - `export type EstadoProyecto = "produccion" | "desarrollo" | "archivado"`
  - `export type Proyecto = { slug, claveI18n, estado, url?, repo?, stack, acento, imagen?, destacado, anio }`
  - `export const PROYECTOS: Proyecto[]`
  - `export function proyectoPorSlug(slug: string): Proyecto | undefined`
  - `export function proyectosDestacados(): Proyecto[]`
  - `export function proyectosSecundarios(): Proyecto[]`

- [ ] **Step 1: Crear `lib/proyectos.ts`**

```ts
export type EstadoProyecto = "produccion" | "desarrollo" | "archivado";

export type Proyecto = {
  /** Segmento de ruta bajo /proyectos/ */
  slug: string;
  /** Clave del bloque <clave>_details en locales/*.json */
  claveI18n: string;
  estado: EstadoProyecto;
  /** Dominio público, si el proyecto está desplegado */
  url?: string;
  /** Repositorio, si es público */
  repo?: string;
  stack: string[];
  /** Color de acento, en formato de utilidad Tailwind (ej. "blue") */
  acento: string;
  /** Ruta de la captura en /public, si existe */
  imagen?: string;
  destacado: boolean;
  /** Año o rango, para ordenar */
  anio: string;
};

export const PROYECTOS: Proyecto[] = [
  {
    slug: "notecore",
    claveI18n: "notecore",
    estado: "produccion",
    url: "https://notecore.ourocore.net",
    repo: "https://github.com/BrianTz79/NoteCore",
    stack: ["React Native", "Expo", "Next.js 16", "Fastify", "PostgreSQL", "Drizzle ORM", "TypeScript"],
    acento: "sky",
    destacado: true,
    anio: "2026",
  },
  {
    slug: "ada",
    claveI18n: "ada",
    estado: "desarrollo",
    repo: "https://github.com/BrianTz79/ADA",
    stack: ["Flutter", "Python", "FastAPI", "faster-whisper", "Ollama", "ChromaDB", "Raspberry Pi 5"],
    acento: "blue",
    imagen: "/pantallaInicioADA.png",
    destacado: true,
    anio: "2026",
  },
  {
    slug: "zaga",
    claveI18n: "zaga",
    estado: "produccion",
    url: "https://www.zagadistribuciones.com",
    stack: ["Astro 7", "Tailwind CSS 4", "Cloudflare Pages", "Wrangler"],
    acento: "amber",
    destacado: true,
    anio: "2026",
  },
  {
    slug: "koko",
    claveI18n: "koko",
    estado: "produccion",
    url: "https://koko.ourocore.net",
    stack: ["Electron 39", "React 19", "TypeScript", "WebRTC", "Socket.io", "Node.js"],
    acento: "rose",
    destacado: true,
    anio: "2026",
  },
  {
    slug: "wander",
    claveI18n: "wander",
    estado: "produccion",
    url: "https://wander.ourocore.net",
    stack: ["React 19", "Vite", "TypeScript", "Express 5", "Prisma 7", "PostgreSQL 17", "Docker"],
    acento: "violet",
    destacado: true,
    anio: "2026",
  },
  {
    slug: "shokan",
    claveI18n: "shokan",
    estado: "produccion",
    url: "https://shokan.ourocore.net",
    stack: ["React", "Kotlin", "Express", "Prisma", "PostgreSQL", "Web Push / VAPID"],
    acento: "cyan",
    destacado: true,
    anio: "2026",
  },
  {
    slug: "homelab",
    claveI18n: "homelab",
    estado: "produccion",
    stack: ["Ubuntu Server", "Docker", "Nginx", "Cloudflare Tunnels", "systemd"],
    acento: "orange",
    destacado: true,
    anio: "2025",
  },
  {
    slug: "iris",
    claveI18n: "iris",
    estado: "desarrollo",
    stack: ["React", "Vite", "Python", "FastAPI", "MongoDB", "WebSockets"],
    acento: "purple",
    destacado: false,
    anio: "2025",
  },
  {
    slug: "kanua-petto",
    claveI18n: "kanua",
    estado: "archivado",
    repo: "https://github.com/BrianTz79/KanuaPetto",
    stack: ["Godot 4.5", "C#", "Node.js", "Express", "MongoDB", "Docker"],
    acento: "emerald",
    imagen: "/kanua-petto-gameplay.jpg",
    destacado: false,
    anio: "2025",
  },
  {
    slug: "sgv",
    claveI18n: "sgv",
    estado: "desarrollo",
    stack: ["React", "FastAPI", "PostgreSQL", "Docker"],
    acento: "teal",
    destacado: false,
    anio: "2025",
  },
  {
    slug: "clips",
    claveI18n: "clips",
    estado: "archivado",
    repo: "https://github.com/BrianTz79/ClipsBanana",
    stack: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "FFmpeg"],
    acento: "indigo",
    destacado: false,
    anio: "2025",
  },
  {
    slug: "ourocore",
    claveI18n: "ourocore",
    estado: "produccion",
    url: "https://www.ourocore.net",
    stack: ["Astro", "Tailwind CSS", "Nginx", "Docker"],
    acento: "lime",
    destacado: false,
    anio: "2025",
  },
  {
    slug: "bots",
    claveI18n: "bots",
    estado: "archivado",
    stack: ["Python", "discord.py", "FastAPI", "FFmpeg"],
    acento: "fuchsia",
    destacado: false,
    anio: "2025",
  },
  {
    slug: "portafolio",
    claveI18n: "portafolio",
    estado: "produccion",
    url: "https://briantellez.ourocore.net",
    repo: "https://github.com/BrianTz79/Portafolio-Brian",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "TypeScript", "Docker", "Nginx"],
    acento: "slate",
    destacado: false,
    anio: "2026",
  },
];

export function proyectoPorSlug(slug: string): Proyecto | undefined {
  return PROYECTOS.find((p) => p.slug === slug);
}

export function proyectosDestacados(): Proyecto[] {
  return PROYECTOS.filter((p) => p.destacado);
}

export function proyectosSecundarios(): Proyecto[] {
  return PROYECTOS.filter((p) => !p.destacado);
}
```

Nota: `slug` es `"portafolio"` y `claveI18n` es `"portafolio"`, lo que elimina el remapeo manual que causaba el 404 de `/proyectos/portfolio`. Igual con `kanua-petto` / `kanua`.

- [ ] **Step 2: Verificar que cada slug tiene su carpeta o está planificado**

```bash
npx tsc --noEmit
node -e "
const {PROYECTOS} = await import('./lib/proyectos.ts').catch(()=>({}));
" 2>/dev/null || true
ls app/proyectos/
```

Expected: `tsc` sin salida. El `ls` muestra las carpetas actuales; `notecore`, `zaga`, `wander` y `shokan` **aún no existen** — se crean en Task 7. Las demás sí deben aparecer.

- [ ] **Step 3: Commit**

```bash
git add lib/proyectos.ts
git commit -m "Fuente unica de datos de proyectos"
```

---

### Task 5: Verificación de servicios en build

**Files:**
- Create: `scripts/verificar-servicios.mjs`
- Create: `lib/infraestructura.ts`
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nada
- Produces:
  - `lib/infraestructura.ts` exporta `export type Servicio = { nombre, url, estado: "activo" | "inactivo" }` y `export type EstadoInfra = { verificadoEn: string; servicios: Servicio[] }`
  - `data/servicios.json` con forma `EstadoInfra`, generado en cada build
  - `npm run verificar:servicios`

- [ ] **Step 1: Crear el tipo en `lib/infraestructura.ts`**

```ts
export type Servicio = {
  nombre: string;
  url: string;
  estado: "activo" | "inactivo";
};

export type EstadoInfra = {
  /** Fecha ISO del momento del build en que se verificó */
  verificadoEn: string;
  servicios: Servicio[];
};

/** Dominios a verificar. El orden es el de aparición en el panel. */
export const DOMINIOS: { nombre: string; url: string }[] = [
  { nombre: "notecore", url: "https://notecore.ourocore.net" },
  { nombre: "wander", url: "https://wander.ourocore.net" },
  { nombre: "shokan", url: "https://shokan.ourocore.net" },
  { nombre: "koko", url: "https://koko.ourocore.net" },
  { nombre: "ourocore", url: "https://www.ourocore.net" },
  { nombre: "zaga", url: "https://www.zagadistribuciones.com" },
  { nombre: "goons", url: "https://goonsandgooners.stellarbanana.com" },
  { nombre: "portafolio", url: "https://briantellez.ourocore.net" },
];
```

Nota: `goonsandgooners` se verifica porque corre en la misma máquina y cuenta como servicio alojado, aunque no tenga ficha de proyecto (decisión del usuario).

- [ ] **Step 2: Crear `scripts/verificar-servicios.mjs`**

```js
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
```

- [ ] **Step 3: Enganchar al build y a gitignore**

En `package.json`, cambiar el script `build` y añadir el nuevo:

```json
"verificar:servicios": "node scripts/verificar-servicios.mjs",
"build": "node scripts/verificar-servicios.mjs && next build"
```

En `.gitignore`, añadir al final:

```
# estado de servicios, regenerado en cada build
/data/servicios.json
```

- [ ] **Step 4: Ejecutar y comprobar la salida**

```bash
npm run verificar:servicios
cat data/servicios.json
```

Expected: imprime "Servicios verificados: N/8 activos." y el JSON tiene `verificadoEn` con fecha ISO y ocho entradas con `estado`. Al 2026-09-11 los ocho respondían.

- [ ] **Step 5: Comprobar que no rompe el build si un dominio falla**

```bash
node -e "
const s = JSON.parse(require('fs').readFileSync('data/servicios.json','utf8'));
if (!s.verificadoEn || !Array.isArray(s.servicios) || s.servicios.length !== 8) {
  console.error('Forma invalida'); process.exit(1);
}
console.log('Forma correcta.');
"
```

Expected: "Forma correcta."

- [ ] **Step 6: Commit**

```bash
git add scripts/verificar-servicios.mjs lib/infraestructura.ts package.json .gitignore
git commit -m "Verificacion de servicios en tiempo de build"
```

---

### Task 6: Hero con panel de infraestructura

**Files:**
- Create: `app/components/PanelInfra.tsx`
- Modify: `app/page.tsx`
- Modify: `locales/es.json`, `locales/en.json`

**Interfaces:**
- Consumes: `EstadoInfra` de `lib/infraestructura.ts`, `data/servicios.json` de Task 5
- Produces: `<PanelInfra estado={EstadoInfra} />`

- [ ] **Step 1: Añadir las claves de traducción**

En `es.json`, reemplazar el bloque `hero` completo:

```json
"hero": {
  "title": "Brian Tellez",
  "titular": "Construyo y opero el stack completo.",
  "subtitular": "Desde el hardware hasta el frontend.",
  "ubicacion": "Tijuana · ITT, 9º semestre",
  "view_projects": "Ver proyectos",
  "contact": "Contactar",
  "cv": "Ver CV"
},
"infra": {
  "titulo": "ourocore-server",
  "specs": "Ryzen 5 9600X · 64 GB DDR5 · Ubuntu Server",
  "activos": "servicios respondiendo",
  "verificado": "Verificado en el último despliegue",
  "activo": "activo",
  "inactivo": "sin respuesta"
}
```

En `en.json`, el mismo bloque:

```json
"hero": {
  "title": "Brian Tellez",
  "titular": "I build and operate the whole stack.",
  "subtitular": "From the hardware up to the frontend.",
  "ubicacion": "Tijuana · ITT, 9th semester",
  "view_projects": "View projects",
  "contact": "Get in touch",
  "cv": "View CV"
},
"infra": {
  "titulo": "ourocore-server",
  "specs": "Ryzen 5 9600X · 64 GB DDR5 · Ubuntu Server",
  "activos": "services responding",
  "verificado": "Checked at last deployment",
  "activo": "up",
  "inactivo": "no response"
}
```

- [ ] **Step 2: Crear `app/components/PanelInfra.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import type { EstadoInfra } from "@/lib/infraestructura";

export default function PanelInfra({ estado }: { estado: EstadoInfra }) {
  const { t, locale } = useTranslation();
  const [encendidos, setEncendidos] = useState(0);

  useEffect(() => {
    const prefiereQuieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefiereQuieto) {
      setEncendidos(estado.servicios.length);
      return;
    }
    const temporizadores = estado.servicios.map((_, i) =>
      setTimeout(() => setEncendidos((n) => Math.max(n, i + 1)), 120 + i * 40)
    );
    return () => temporizadores.forEach(clearTimeout);
  }, [estado.servicios.length, estado.servicios]);

  const activos = estado.servicios.filter((s) => s.estado === "activo").length;
  const fecha = new Date(estado.verificadoEn).toLocaleDateString(
    locale === "en" ? "en-US" : "es-MX",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <div className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] font-mono text-sm">
      <div className="border-b border-[var(--line)] px-4 py-3">
        <p className="font-medium text-[var(--text)]">{t.infra.titulo}</p>
        <p className="mt-1 text-xs text-[var(--dim)]">{t.infra.specs}</p>
      </div>

      <ul className="px-4 py-3">
        {estado.servicios.map((servicio, i) => {
          const visible = i < encendidos;
          const activo = servicio.estado === "activo";
          return (
            <li
              key={servicio.nombre}
              className="flex items-center gap-3 py-1.5 transition-opacity duration-300"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: activo ? "var(--live)" : "var(--dim)" }}
              />
              <span className="text-[var(--text)]">{servicio.nombre}</span>
              <span className="ml-auto text-xs text-[var(--dim)]">
                {activo ? t.infra.activo : t.infra.inactivo}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--dim)]">
        <p>
          <span className="text-[var(--signal)]">{activos}</span>/{estado.servicios.length}{" "}
          {t.infra.activos}
        </p>
        <p className="mt-1">{t.infra.verificado} · {fecha}</p>
      </div>
    </div>
  );
}
```

Nota sobre R2: el panel usa `w-full` y en móvil se apila bajo el texto. El `ml-auto` mantiene la etiqueta a la derecha sin forzar ancho mínimo.

- [ ] **Step 3: Reescribir el hero en `app/page.tsx`**

Reemplazar la sección hero (el `<section>` con el grid de fondo) por:

```tsx
<section className="border-b border-[var(--line)]">
  <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-5 md:gap-12 md:py-24">
    <div className="md:col-span-3 md:pt-6">
      <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text)] md:text-6xl">
        {t.hero.titular}
      </h1>
      <p className="mt-3 font-display text-2xl font-light text-[var(--dim)] md:text-4xl">
        {t.hero.subtitular}
      </p>
      <p className="mt-6 font-mono text-sm text-[var(--dim)]">{t.hero.ubicacion}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/proyectos"
          className="rounded-md bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90"
        >
          {t.hero.view_projects}
        </Link>
        <Link
          href="/cv"
          className="rounded-md border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface)]"
        >
          {t.hero.cv}
        </Link>
      </div>
    </div>
    <div className="md:col-span-2">
      <PanelInfra estado={estadoInfra} />
    </div>
  </div>
</section>
```

Y arriba del archivo, importar el JSON generado y el componente:

```tsx
import estadoInfra from "@/data/servicios.json";
import PanelInfra from "./components/PanelInfra";
```

Como `app/page.tsx` es `"use client"`, el import del JSON se resuelve en build y viaja al bundle — correcto para `output: 'export'`.

- [ ] **Step 4: Quitar las tres tarjetas hardcodeadas de la home**

Borrar por completo la sección "Proyectos Estrella" con los tres `<Link>` escritos a mano (ADA, IRIS, Homelab). La lista real la aporta Task 8; en esta tarea la home queda con hero + sobre-mí + skills + experiencia.

- [ ] **Step 5: Verificar**

```bash
npm run verificar:servicios
npm run validar:locales
npx tsc --noEmit
npx next build
```

Expected: los cuatro pasan. Si `tsc` se queja de que no encuentra `@/data/servicios.json`, confirmar que `resolveJsonModule` está en `tsconfig.json` (ya lo está, porque los locales se importan igual).

- [ ] **Step 6: Comprobar el panel en móvil**

```bash
npx next build && npx serve out -l 4321 &
sleep 3
chromium --headless --disable-gpu --no-sandbox --window-size=375,900 \
  --screenshot="$HOME/snap/chromium/common/hero-movil.png" http://localhost:4321/
kill %1
```

Abrir `~/snap/chromium/common/hero-movil.png` y confirmar: el texto va arriba, el panel debajo a ancho completo, sin corte lateral. **Importante:** chromium bajo snap solo escribe dentro de `~/snap/chromium/common/` — no uses `/tmp` ni `~/.cache`, fallan con "Permission denied".

- [ ] **Step 7: Commit**

```bash
git add app/components/PanelInfra.tsx app/page.tsx locales/
git commit -m "Hero con el panel de infraestructura real"
```

---

### Task 7: Fichas de los cuatro proyectos nuevos

**Files:**
- Modify: `locales/es.json`, `locales/en.json`
- Create: `app/proyectos/notecore/page.tsx`, `app/proyectos/notecore/layout.tsx`
- Create: `app/proyectos/zaga/page.tsx`, `app/proyectos/zaga/layout.tsx`
- Create: `app/proyectos/wander/page.tsx`, `app/proyectos/wander/layout.tsx`
- Create: `app/proyectos/shokan/page.tsx`, `app/proyectos/shokan/layout.tsx`

**Interfaces:**
- Consumes: `proyectoPorSlug` de Task 4, `<ProyectoPage>` de Task 8
- Produces: bloques `notecore_details`, `zaga_details`, `wander_details`, `shokan_details` en ambos locales; cuatro rutas navegables

> **Orden:** esta tarea depende de `<ProyectoPage>` (Task 8). Si se ejecuta antes, crear primero el componente de Task 8 Step 1–2.

- [ ] **Step 1: Añadir `notecore_details` a `es.json`**

```json
"notecore_details": {
  "title": "NoteCore",
  "subtitle": "El núcleo de tu vida académica",
  "status": "En producción · Listo para Play Store",
  "back": "Volver a proyectos",
  "website_btn": "Abrir NoteCore",
  "repo_btn": "Ver código",
  "description_title": "El problema",
  "description": "Los estudiantes pierden materias por acumular faltas sin darse cuenta, y organizan sus tareas en notas dispersas que no están ligadas a su horario real. NoteCore junta las dos cosas, con el horario como eje.",
  "features_title": "Qué hace",
  "features": [
    "Horario visual, capturado a mano o importado desde una foto procesada por IA",
    "Control de faltas con límite sugerido según la norma de 80% de asistencia",
    "Agenda de tareas y exámenes, ligados o no a una materia",
    "Calendario que combina clases y vencimientos en una sola vista",
    "Recordatorios antes de cada entrega y aviso antes de cada clase",
    "Compartir horarios y actividades por QR, código o enlace",
    "Semestres y cuatrimestres con archivo histórico consultable",
    "Consulta sin conexión de lo ya cargado"
  ],
  "architecture_title": "Cómo está construido",
  "architecture_items": [
    { "name": "Una sola fuente de verdad", "desc": "Toda la lógica de negocio vive en la API. Los clientes nunca la duplican, así que app y web no pueden divergir." },
    { "name": "Monorepo de tres capas", "desc": "App Android en React Native con Expo, web en Next.js 16 y API en Fastify, compartiendo tipos y utilidades en TypeScript estricto." },
    { "name": "Widgets nativos", "desc": "Una familia de siete widgets de pantalla principal escritos en Kotlin, que se actualizan solos sin abrir la app." },
    { "name": "Sistema de diseño común", "desc": "Web y app derivan sus colores y espaciados de los mismos tokens, así que se ven como el mismo producto." }
  ],
  "highlight_title": "Lo que más me costó",
  "highlight": "Verificar cada función en las dos plataformas antes de darla por cerrada. Una fase no se cierra hasta comprobarla en un emulador Android y en un navegador reales, marcando en uno y leyendo en el otro.",
  "stack_title": "Stack"
}
```

- [ ] **Step 2: Añadir `notecore_details` a `en.json`**

```json
"notecore_details": {
  "title": "NoteCore",
  "subtitle": "The core of your academic life",
  "status": "In production · Play Store ready",
  "back": "Back to projects",
  "website_btn": "Open NoteCore",
  "repo_btn": "View code",
  "description_title": "The problem",
  "description": "Students fail courses by racking up absences without noticing, and keep their assignments in scattered notes disconnected from their actual class schedule. NoteCore brings both together, with the schedule as the backbone.",
  "features_title": "What it does",
  "features": [
    "Visual schedule, entered by hand or imported from a photo processed by AI",
    "Absence tracking with a suggested limit based on the 80% attendance rule",
    "Assignment and exam planner, linked to a course or standalone",
    "Calendar combining classes and due dates in a single view",
    "Reminders before each deadline and a heads-up before each class",
    "Share schedules and activities by QR, code or link",
    "Semesters and trimesters with a browsable archive",
    "Offline access to everything already loaded"
  ],
  "architecture_title": "How it's built",
  "architecture_items": [
    { "name": "A single source of truth", "desc": "All business logic lives in the API. Clients never duplicate it, so app and web can't drift apart." },
    { "name": "Three-layer monorepo", "desc": "Android app in React Native with Expo, web in Next.js 16 and API in Fastify, sharing types and utilities in strict TypeScript." },
    { "name": "Native widgets", "desc": "A family of seven home-screen widgets written in Kotlin that refresh on their own without opening the app." },
    { "name": "Shared design system", "desc": "Web and app derive their colors and spacing from the same tokens, so they read as one product." }
  ],
  "highlight_title": "The hardest part",
  "highlight": "Verifying every feature on both platforms before calling it done. A phase doesn't close until it's checked on a real Android emulator and a real browser, marking on one and reading on the other.",
  "stack_title": "Stack"
}
```

- [ ] **Step 3: Añadir `zaga_details` a ambos locales**

En `es.json`:

```json
"zaga_details": {
  "title": "ZAGA Distribuciones",
  "subtitle": "Sitio corporativo para un cliente real",
  "status": "En producción · Cliente activo",
  "back": "Volver a proyectos",
  "website_btn": "Visitar el sitio",
  "description_title": "El encargo",
  "description": "Una distribuidora de material eléctrico en Tampico necesitaba presencia en línea con catálogo de marcas y contacto directo. El sitio debía cargar rápido desde cualquier conexión y funcionar en español e inglés.",
  "features_title": "Qué incluye",
  "features": [
    "Catálogo de marcas con filtros por categoría",
    "Sitio bilingüe con sitemap anotado por idioma",
    "Presets de paleta y tipografía que el cliente puede alternar",
    "Formulario de contacto con enlace directo a WhatsApp",
    "SEO técnico y datos estructurados del negocio"
  ],
  "architecture_title": "Decisiones técnicas",
  "architecture_items": [
    { "name": "Estático de verdad", "desc": "Generación estática con Astro: cero JavaScript en las páginas que no lo necesitan, y tiempos de carga que no dependen de un servidor." },
    { "name": "Fuentes autoalojadas", "desc": "Se descargan y empaquetan en tiempo de build, así que en producción no hay ni una petición a terceros." },
    { "name": "Despliegue en el borde", "desc": "Cloudflare Pages sirve el sitio desde la red global, sin infraestructura que mantener." }
  ],
  "highlight_title": "Lo que aprendí",
  "highlight": "Trabajar con un cliente real cambia las prioridades. No importa qué tan elegante sea la solución si el dueño del negocio no puede actualizar sus marcas sin llamarme.",
  "stack_title": "Stack"
}
```

En `en.json`:

```json
"zaga_details": {
  "title": "ZAGA Distribuciones",
  "subtitle": "Corporate site for a real client",
  "status": "In production · Active client",
  "back": "Back to projects",
  "website_btn": "Visit the site",
  "description_title": "The brief",
  "description": "An electrical supply distributor in Tampico needed an online presence with a brand catalog and direct contact. The site had to load fast on any connection and work in Spanish and English.",
  "features_title": "What it includes",
  "features": [
    "Brand catalog with category filters",
    "Bilingual site with language-annotated sitemap",
    "Color and typography presets the client can switch between",
    "Contact form with a direct WhatsApp link",
    "Technical SEO and structured business data"
  ],
  "architecture_title": "Technical decisions",
  "architecture_items": [
    { "name": "Genuinely static", "desc": "Static generation with Astro: zero JavaScript on pages that don't need it, and load times that don't depend on a server." },
    { "name": "Self-hosted fonts", "desc": "Downloaded and bundled at build time, so production makes no third-party requests at all." },
    { "name": "Deployed at the edge", "desc": "Cloudflare Pages serves the site from the global network, with no infrastructure to maintain." }
  ],
  "highlight_title": "What I learned",
  "highlight": "Working with a real client changes the priorities. It doesn't matter how elegant the solution is if the business owner can't update their brands without calling me.",
  "stack_title": "Stack"
}
```

- [ ] **Step 4: Añadir `wander_details` a ambos locales**

En `es.json`:

```json
"wander_details": {
  "title": "Wander",
  "subtitle": "Tu identidad como jugador, en un solo enlace",
  "status": "En producción",
  "back": "Volver a proyectos",
  "website_btn": "Abrir Wander",
  "description_title": "La idea",
  "description": "Una especie de perfil profesional para jugadores: en vez de experiencia laboral, los juegos que juegas, tus horas, tus logros y tus perfiles en cada plataforma, todo en una página que se comparte con un enlace.",
  "features_title": "Qué hace",
  "features": [
    "Los datos se traen solos: vinculas Steam y tus juegos y horas aparecen sin escribir nada",
    "Perfil por bloques que se añaden, quitan y reordenan",
    "Control total del tema, hasta CSS propio con alcance limitado al perfil",
    "Social real: seguir gente, feed de actividad, comentarios y mensajería con grupos",
    "Interfaz en español e inglés"
  ],
  "architecture_title": "Decisiones técnicas",
  "architecture_items": [
    { "name": "Sesiones que no se pueden robar", "desc": "Contraseñas con argon2id y sesión en cookies httpOnly con rotación del token de refresco, más límite de peticiones en dos capas." },
    { "name": "CSS del usuario, con red de seguridad", "desc": "Quien sabe CSS puede escribir el suyo, pero se sanitiza y se le limita el alcance para que no pueda salirse de su propio perfil." },
    { "name": "Privacidad explícita", "desc": "Cada vinculación dice qué lee y qué guarda, con permisos granulares y desvinculación que borra de verdad." }
  ],
  "highlight_title": "El reto",
  "highlight": "Que vincular Steam no creara una segunda cuenta cuando el usuario ya tenía una. Resolverlo obligó a repensar cómo se unen identidades de distintos proveedores sobre una misma persona.",
  "stack_title": "Stack"
}
```

En `en.json`:

```json
"wander_details": {
  "title": "Wander",
  "subtitle": "Your identity as a player, in a single link",
  "status": "In production",
  "back": "Back to projects",
  "website_btn": "Open Wander",
  "description_title": "The idea",
  "description": "Something like a professional profile for gamers: instead of work experience, the games you play, your hours, your achievements and your profiles on each platform, all on one page you share with a link.",
  "features_title": "What it does",
  "features": [
    "Data pulls itself in: link Steam and your games and hours appear without typing anything",
    "Block-based profile you can add to, remove from and reorder",
    "Full theme control, down to your own CSS scoped to your profile",
    "Real social features: follow people, activity feed, comments and group messaging",
    "Interface in Spanish and English"
  ],
  "architecture_title": "Technical decisions",
  "architecture_items": [
    { "name": "Sessions that can't be stolen", "desc": "Passwords with argon2id and sessions in httpOnly cookies with refresh token rotation, plus rate limiting in two layers." },
    { "name": "User CSS, with a safety net", "desc": "People who know CSS can write their own, but it's sanitized and scoped so it can't escape their own profile." },
    { "name": "Explicit privacy", "desc": "Each linked account states what it reads and what it stores, with granular permissions and unlinking that genuinely deletes." }
  ],
  "highlight_title": "The challenge",
  "highlight": "Making sure linking Steam didn't create a second account when the user already had one. Solving it meant rethinking how identities from different providers merge onto one person.",
  "stack_title": "Stack"
}
```

- [ ] **Step 5: Añadir `shokan_details` a ambos locales**

En `es.json`:

```json
"shokan_details": {
  "title": "Shokan",
  "subtitle": "Convocar a jugar con un botón",
  "status": "En producción · Web y Android",
  "back": "Volver a proyectos",
  "website_btn": "Abrir Shokan",
  "description_title": "El problema",
  "description": "Juntar al grupo para jugar significaba etiquetar a todo el mundo en WhatsApp y esperar. Shokan lo reduce a un botón: alguien lo toca y a los demás les suena el celular.",
  "features_title": "Qué hace",
  "features": [
    "Grupos con código de seis caracteres, sin necesidad de correo",
    "Cada grupo configura su juego, su icono y su sonido de aviso",
    "Notificaciones push reales, incluso con la app cerrada",
    "App instalable desde el navegador y app nativa de Android",
    "Mensaje fijo del grupo, o el que escriba quien manda la señal"
  ],
  "architecture_title": "Decisiones técnicas",
  "architecture_items": [
    { "name": "Push sin Firebase", "desc": "Notificaciones con el estándar Web Push y claves VAPID propias, sin depender de los servicios de Google ni de sus cuotas." },
    { "name": "Dos clientes, un backend", "desc": "El servidor distingue si la petición viene de un navegador o de la app nativa, y entrega la notificación por el canal correcto." },
    { "name": "Migración sin cortar el servicio", "desc": "Al mudar de dominio, el túnel sirvió los dos hostnames a la vez para que nadie perdiera acceso a medio camino." }
  ],
  "highlight_title": "Lo que aprendí",
  "highlight": "Que el navegador aísla por origen. Al cambiar de dominio, ni la sesión ni las suscripciones de push se heredan: hay que avisarlo bien o la gente cree que la app se rompió.",
  "stack_title": "Stack"
}
```

En `en.json`:

```json
"shokan_details": {
  "title": "Shokan",
  "subtitle": "Calling the group to play, with one button",
  "status": "In production · Web and Android",
  "back": "Back to projects",
  "website_btn": "Open Shokan",
  "description_title": "The problem",
  "description": "Getting the group together to play meant tagging everyone on WhatsApp and waiting. Shokan reduces it to a button: someone taps it and everyone else's phone rings.",
  "features_title": "What it does",
  "features": [
    "Groups with a six-character code, no email required",
    "Each group sets its own game, icon and alert sound",
    "Real push notifications, even with the app closed",
    "Installable from the browser, plus a native Android app",
    "A fixed group message, or whatever the sender writes"
  ],
  "architecture_title": "Technical decisions",
  "architecture_items": [
    { "name": "Push without Firebase", "desc": "Notifications using the Web Push standard with our own VAPID keys, depending on neither Google's services nor their quotas." },
    { "name": "Two clients, one backend", "desc": "The server tells whether a request comes from a browser or the native app, and delivers the notification through the right channel." },
    { "name": "Migration without downtime", "desc": "When moving domains, the tunnel served both hostnames at once so nobody lost access mid-way." }
  ],
  "highlight_title": "What I learned",
  "highlight": "That browsers isolate by origin. When you change domains, neither the session nor the push subscriptions carry over: you have to say so clearly or people think the app broke.",
  "stack_title": "Stack"
}
```

- [ ] **Step 6: Crear las cuatro páginas**

Cada una es idéntica salvo el slug. Para `notecore`, crear `app/proyectos/notecore/page.tsx`:

```tsx
"use client";

import ProyectoPage from "@/app/components/ProyectoPage";

export default function Page() {
  return <ProyectoPage slug="notecore" />;
}
```

Repetir con `slug="zaga"`, `slug="wander"` y `slug="shokan"` en sus carpetas.

- [ ] **Step 7: Crear los cuatro layouts**

Para `app/proyectos/notecore/layout.tsx`:

```tsx
import type { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "NoteCore",
  description:
    "Plataforma de organización académica para estudiantes: horario visual, control de faltas y agenda, en app Android y web. Por Brian Tellez.",
  alternates: { canonical: `${BASE_URL}/proyectos/notecore` },
  openGraph: {
    title: "NoteCore | Brian Tellez",
    description:
      "Plataforma de organización académica para estudiantes, en app Android y web.",
    url: `${BASE_URL}/proyectos/notecore`,
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "Proyectos", item: `${BASE_URL}/proyectos` },
              { "@type": "ListItem", position: 3, name: "NoteCore", item: `${BASE_URL}/proyectos/notecore` },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
```

Repetir para los otros tres, cambiando nombre, slug y descripción:
- **zaga**: "ZAGA Distribuciones" — "Sitio corporativo bilingüe para una distribuidora de material eléctrico, con Astro y Cloudflare Pages."
- **wander**: "Wander" — "Plataforma de perfiles de jugador con datos importados de Steam, en React y Express."
- **shokan**: "Shokan" — "PWA y app Android para convocar grupos de juego con notificaciones push sin Firebase."

- [ ] **Step 8: Verificar**

```bash
npm run validar:locales
npx tsc --noEmit
npx next build
ls out/proyectos/
```

Expected: validador pasa, `tsc` limpio, build exitoso, y `out/proyectos/` contiene `notecore/`, `zaga/`, `wander/` y `shokan/`.

- [ ] **Step 9: Commit**

```bash
git add locales/ app/proyectos/notecore app/proyectos/zaga app/proyectos/wander app/proyectos/shokan
git commit -m "NoteCore, ZAGA, Wander y Shokan entran al portafolio"
```

---

### Task 8: Plantilla de proyecto y lista

**Files:**
- Create: `app/components/ProyectoPage.tsx`
- Create: `app/components/ListaProyectos.tsx`
- Modify: `app/proyectos/page.tsx`

**Interfaces:**
- Consumes: `PROYECTOS`, `proyectoPorSlug`, `proyectosDestacados`, `proyectosSecundarios` de Task 4
- Produces: `<ProyectoPage slug="..." />` y `<ListaProyectos />`

- [ ] **Step 1: Crear `app/components/ProyectoPage.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { proyectoPorSlug } from "@/lib/proyectos";

type ItemArquitectura = { name: string; desc: string };

export default function ProyectoPage({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) return null;

  const datos = (t as Record<string, any>)[`${proyecto.claveI18n}_details`];
  if (!datos) return null;

  return (
    <article className="mx-auto max-w-4xl px-5 py-12 md:py-16">
      <Link
        href="/proyectos"
        className="inline-flex items-center gap-2 font-mono text-sm text-[var(--dim)] transition-colors hover:text-[var(--text)]"
      >
        <ArrowLeft className="h-4 w-4" />
        {datos.back}
      </Link>

      <header className="mt-8 border-b border-[var(--line)] pb-8">
        <p className="font-mono text-sm text-[var(--signal)]">{datos.status}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
          {datos.title}
        </h1>
        <p className="mt-2 text-xl text-[var(--dim)]">{datos.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {proyecto.url && (
            <a
              href={proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--text)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90"
            >
              {datos.website_btn}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {proyecto.repo && (
            <a
              href={proyecto.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface)]"
            >
              {datos.repo_btn ?? "GitHub"}
              <Code2 className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      {proyecto.imagen && (
        <div className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-[var(--line)]">
          <Image src={proyecto.imagen} alt={datos.title} fill className="object-cover" />
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
          {datos.description_title}
        </h2>
        <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--dim)]">{datos.description}</p>
      </section>

      {Array.isArray(datos.features) && datos.features.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
            {datos.features_title}
          </h2>
          <ul className="mt-4 space-y-2">
            {datos.features.map((f: string) => (
              <li key={f} className="flex gap-3 text-[var(--dim)]">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" />
                <span className="max-w-[65ch]">{f}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(datos.architecture_items) && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
            {datos.architecture_title}
          </h2>
          <div className="mt-4 space-y-5">
            {datos.architecture_items.map((item: ItemArquitectura) => (
              <div key={item.name} className="border-l-2 border-[var(--line)] pl-4">
                <h3 className="font-medium text-[var(--text)]">{item.name}</h3>
                <p className="mt-1 max-w-[65ch] text-[var(--dim)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {datos.highlight && (
        <section className="mt-10 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--text)]">
            {datos.highlight_title}
          </h2>
          <p className="mt-2 max-w-[65ch] text-[var(--dim)]">{datos.highlight}</p>
        </section>
      )}

      <section className="mt-10 border-t border-[var(--line)] pt-8">
        <h2 className="font-mono text-sm uppercase tracking-wide text-[var(--dim)]">
          {datos.stack_title}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {proyecto.stack.map((tec) => (
            <li
              key={tec}
              className="rounded border border-[var(--line)] px-2.5 py-1 font-mono text-xs text-[var(--dim)]"
            >
              {tec}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Crear `app/components/ListaProyectos.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { proyectosDestacados, proyectosSecundarios, type Proyecto } from "@/lib/proyectos";

function Fila({ proyecto }: { proyecto: Proyecto }) {
  const { t } = useTranslation();
  const datos = (t as Record<string, any>)[`${proyecto.claveI18n}_details`];
  const ficha = (t as Record<string, any>).projects?.[proyecto.claveI18n]
    ?? (t as Record<string, any>).general_projects?.[proyecto.claveI18n];

  const titulo = datos?.title ?? ficha?.name ?? proyecto.slug;
  const resumen = datos?.subtitle ?? ficha?.description ?? "";
  const estado = datos?.status ?? ficha?.status ?? "";

  return (
    <li>
      <Link
        href={`/proyectos/${proyecto.slug}`}
        className="group flex flex-col gap-4 border-b border-[var(--line)] py-6 transition-colors hover:bg-[var(--surface)] sm:flex-row sm:items-center sm:gap-6"
      >
        {proyecto.imagen ? (
          <div className="relative h-32 w-full shrink-0 overflow-hidden rounded border border-[var(--line)] sm:h-20 sm:w-32">
            <Image src={proyecto.imagen} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-32 w-full shrink-0 items-center justify-center rounded border border-[var(--line)] bg-[var(--surface)] font-mono text-xs text-[var(--dim)] sm:h-20 sm:w-32"
          >
            {proyecto.slug}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-xl font-medium text-[var(--text)]">{titulo}</h3>
            {estado && <span className="font-mono text-xs text-[var(--signal)]">{estado}</span>}
          </div>
          <p className="mt-1 max-w-[60ch] text-sm text-[var(--dim)]">{resumen}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {proyecto.stack.slice(0, 4).map((tec) => (
              <li key={tec} className="font-mono text-xs text-[var(--dim)]">
                {tec}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}

export default function ListaProyectos() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
        {(t as Record<string, any>).proyectos_page?.title ?? "Proyectos"}
      </h1>

      <ul className="mt-10">
        {proyectosDestacados().map((p) => (
          <Fila key={p.slug} proyecto={p} />
        ))}
      </ul>

      <h2 className="mt-14 font-mono text-sm uppercase tracking-wide text-[var(--dim)]">
        {(t as Record<string, any>).proyectos_page?.others_title ?? "Otros desarrollos"}
      </h2>
      <ul className="mt-4">
        {proyectosSecundarios().map((p) => (
          <Fila key={p.slug} proyecto={p} />
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 3: Reemplazar `app/proyectos/page.tsx`**

El archivo completo pasa a ser:

```tsx
"use client";

import ListaProyectos from "@/app/components/ListaProyectos";

export default function Page() {
  return <ListaProyectos />;
}
```

Esto elimina la cadena de `if/else`, el remapeo manual de slugs y, con él, el enlace roto a `/proyectos/portfolio`.

- [ ] **Step 4: Migrar las páginas de proyecto existentes a la plantilla**

Para cada slug ya existente (`ada`, `koko`, `homelab`, `iris`, `kanua-petto`, `sgv`, `clips`, `ourocore`, `bots`, `portafolio`), reemplazar el contenido de su `page.tsx` por:

```tsx
"use client";

import ProyectoPage from "@/app/components/ProyectoPage";

export default function Page() {
  return <ProyectoPage slug="AQUI_EL_SLUG" />;
}
```

Los `layout.tsx` de cada uno **no se tocan**: sus metadatos siguen siendo válidos.

Atención: algunos bloques `_details` existentes no tienen todas las claves que la plantilla espera (`subtitle`, `highlight`, `repo_btn`). La plantilla ya las trata como opcionales, así que esas secciones simplemente no se renderizan. Donde falte `subtitle`, añadirlo a ambos locales con una línea corta que describa el proyecto.

- [ ] **Step 5: Arreglar el diagrama ASCII de Koko**

En `koko_details` de ambos locales, añadir la clave `diagrama`. En `es.json`:

```json
"diagrama": "[Usuario A]                              [Usuario B]\n  App ──────── Socket.io (señalización) ──────── App\n\n       ◄──────────── WebRTC P2P ───────────────►\n              (video + eventos directos)"
```

En `en.json`:

```json
"diagrama": "[User A]                                  [User B]\n  App ──────── Socket.io (signaling) ─────────── App\n\n       ◄──────────── WebRTC P2P ───────────────►\n              (video + direct events)"
```

La plantilla no renderiza diagramas, así que añadir esta sección a `ProyectoPage.tsx`, justo antes de la sección de stack:

```tsx
{datos.diagrama && (
  <section className="mt-10">
    <div className="overflow-x-auto rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
      <pre className="font-mono text-xs leading-relaxed text-[var(--dim)]">{datos.diagrama}</pre>
    </div>
  </section>
)}
```

El `overflow-x-auto` cumple R2: el diagrama hace scroll dentro de su caja en lugar de desbordar la página.

- [ ] **Step 6: Verificar que no quedan enlaces rotos**

```bash
npm run validar:locales
npx tsc --noEmit
npx next build
grep -rn "proyectos/portfolio\|/#proyectos" app/ || echo "Sin enlaces rotos."
ls out/proyectos/
```

Expected: validador pasa, `tsc` limpio, build exitoso, el `grep` imprime "Sin enlaces rotos.", y `out/proyectos/` lista las catorce carpetas.

- [ ] **Step 7: Commit**

```bash
git add app/components/ProyectoPage.tsx app/components/ListaProyectos.tsx app/proyectos/ locales/
git commit -m "Plantilla unica de proyecto y lista con imagenes"
```

---

### Task 9: Página de CV y PDF

**Files:**
- Create: `scripts/generar-cv-pdf.mjs`
- Create: `app/cv/page.tsx`, `app/cv/layout.tsx`
- Create: `public/CV-Brian-Tellez-ES.pdf`, `public/CV-Brian-Tellez-EN.pdf`
- Modify: `locales/es.json`, `locales/en.json`
- Modify: `package.json`

**Interfaces:**
- Consumes: nada de tareas previas
- Produces: ruta `/cv`; `npm run generar:cv`

- [ ] **Step 1: Crear `scripts/generar-cv-pdf.mjs`**

```js
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
  execFileSync("chromium", [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    `--print-to-pdf=${salidaTemporal}`,
    `file://${entrada}`,
  ], { stdio: ["ignore", "ignore", "pipe"] });

  if (!existsSync(salidaTemporal)) {
    console.error(`Chromium no genero ${salidaTemporal}`);
    process.exit(1);
  }

  copyFileSync(salidaTemporal, variante.destino);
  console.log(`Generado ${variante.destino}`);
}
```

- [ ] **Step 2: Añadir el script y generar los PDF**

En `package.json`, dentro de `"scripts"`:

```json
"generar:cv": "node scripts/generar-cv-pdf.mjs"
```

Ejecutar:

```bash
npm run generar:cv
```

Expected: imprime las dos rutas generadas.

- [ ] **Step 3: Verificar que los PDF son válidos**

```bash
node -e "
const fs = require('fs');
for (const f of ['public/CV-Brian-Tellez-ES.pdf','public/CV-Brian-Tellez-EN.pdf']) {
  const d = fs.readFileSync(f);
  const paginas = (d.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  if (d.subarray(0,5).toString() !== '%PDF-') { console.error(f, 'no es PDF'); process.exit(1); }
  if (paginas < 1) { console.error(f, 'sin paginas'); process.exit(1); }
  console.log(f, '-', d.length, 'bytes,', paginas, 'paginas');
}
"
```

Expected: ambos válidos, unas 3 páginas cada uno (la prueba del CV en español dio 3 páginas y 110 KB).

- [ ] **Step 4: Añadir las claves del CV a ambos locales**

En `es.json`:

```json
"cv": {
  "title": "Currículum",
  "descargar": "Descargar PDF",
  "actualizado": "Actualizado en septiembre de 2026",
  "perfil_title": "Perfil",
  "perfil": "Estudiante de 9º semestre de Ingeniería en Sistemas Computacionales, con promedio de 93.64/100 y más de diez proyectos propios en producción, desde aplicaciones web full-stack hasta sistemas de IA e infraestructura autoalojada. Domino el ciclo completo: diseño y ensamblo el hardware del servidor, administro el sistema Linux, contenerizo la aplicación, la expongo de forma segura y escribo el backend y el frontend. Busco una residencia profesional o una posición junior donde aportar esta capacidad de ejecución de principio a fin.",
  "educacion_title": "Educación",
  "educacion": [
    { "titulo": "Ingeniería en Sistemas Computacionales", "lugar": "Instituto Tecnológico de Tijuana", "fecha": "9º semestre en curso", "detalle": "Promedio acumulado 93.64/100. Residencia profesional programada." },
    { "titulo": "Dibujo Arquitectónico", "lugar": "Preparatoria Federal Lázaro Cárdenas", "fecha": "2021", "detalle": "Promedio final 86/100." }
  ],
  "idiomas_title": "Idiomas",
  "idiomas": [
    { "idioma": "Español", "nivel": "Nativo, oral y escrito" },
    { "idioma": "Inglés", "nivel": "B1 — lectura y comprensión técnica avanzada, producción oral en desarrollo" }
  ],
  "personales_title": "Competencias personales",
  "personales": "Aprendizaje autónomo · Trabajo inmersivo · Resolución creativa de problemas · Pensamiento crítico · Adaptabilidad · Trabajo en equipo · Gestión de proyectos de principio a fin"
}
```

En `en.json`:

```json
"cv": {
  "title": "Résumé",
  "descargar": "Download PDF",
  "actualizado": "Updated September 2026",
  "perfil_title": "Profile",
  "perfil": "Ninth-semester Computer Systems Engineering student with a 93.64/100 average and more than ten personal projects in production, from full-stack web applications to AI systems and self-hosted infrastructure. I cover the whole cycle: I design and assemble the server hardware, administer the Linux system, containerize the application, expose it securely and write both backend and frontend. I'm looking for a professional residency or a junior position where I can bring that end-to-end execution.",
  "educacion_title": "Education",
  "educacion": [
    { "titulo": "Computer Systems Engineering", "lugar": "Instituto Tecnológico de Tijuana", "fecha": "9th semester, in progress", "detalle": "Cumulative average 93.64/100. Professional residency scheduled." },
    { "titulo": "Architectural Drafting", "lugar": "Preparatoria Federal Lázaro Cárdenas", "fecha": "2021", "detalle": "Final average 86/100." }
  ],
  "idiomas_title": "Languages",
  "idiomas": [
    { "idioma": "Spanish", "nivel": "Native, spoken and written" },
    { "idioma": "English", "nivel": "B1 — advanced technical reading and comprehension, speaking in development" }
  ],
  "personales_title": "Personal skills",
  "personales": "Self-directed learning · Deep work · Creative problem solving · Critical thinking · Adaptability · Teamwork · Running projects end to end"
}
```

- [ ] **Step 5: Crear `app/cv/page.tsx`**

```tsx
"use client";

import { Download } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { PROYECTOS } from "@/lib/proyectos";

type Estudio = { titulo: string; lugar: string; fecha: string; detalle: string };
type Idioma = { idioma: string; nivel: string };

export default function Page() {
  const { t, locale } = useTranslation();
  const cv = (t as Record<string, any>).cv;
  const skills = (t as Record<string, any>).skills;
  const archivo = locale === "en" ? "/CV-Brian-Tellez-EN.pdf" : "/CV-Brian-Tellez-ES.pdf";

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-8">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--text)]">
            {cv.title}
          </h1>
          <p className="mt-2 font-mono text-sm text-[var(--dim)]">{cv.actualizado}</p>
        </div>
        <a
          href={archivo}
          download
          className="inline-flex items-center gap-2 rounded-md bg-[var(--text)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          {cv.descargar}
        </a>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{cv.perfil_title}</h2>
        <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--dim)]">{cv.perfil}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
          {(t as Record<string, any>).proyectos_page?.title ?? "Proyectos"}
        </h2>
        <ul className="mt-4 space-y-3">
          {PROYECTOS.filter((p) => p.destacado).map((p) => {
            const datos = (t as Record<string, any>)[`${p.claveI18n}_details`];
            return (
              <li key={p.slug} className="border-l-2 border-[var(--line)] pl-4">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-medium text-[var(--text)]">{datos?.title ?? p.slug}</h3>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--signal)] hover:underline"
                    >
                      {p.url.replace("https://", "")}
                    </a>
                  )}
                </div>
                <p className="mt-1 max-w-[65ch] text-sm text-[var(--dim)]">{datos?.subtitle ?? ""}</p>
                <p className="mt-1 font-mono text-xs text-[var(--dim)]">{p.stack.join(" · ")}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{skills.title}</h2>
        <div className="mt-4 space-y-4">
          {skills.categories.map((categoria: { name: string; badges: string[] }) => (
            <div key={categoria.name}>
              <h3 className="text-sm font-medium text-[var(--text)]">{categoria.name}</h3>
              <p className="mt-1 max-w-[65ch] font-mono text-xs leading-relaxed text-[var(--dim)]">
                {categoria.badges.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{cv.educacion_title}</h2>
        <ul className="mt-4 space-y-4">
          {cv.educacion.map((estudio: Estudio) => (
            <li key={estudio.titulo} className="border-l-2 border-[var(--line)] pl-4">
              <h3 className="font-medium text-[var(--text)]">{estudio.titulo}</h3>
              <p className="text-sm text-[var(--dim)]">{estudio.lugar}</p>
              <p className="font-mono text-xs text-[var(--dim)]">{estudio.fecha}</p>
              <p className="mt-1 text-sm text-[var(--dim)]">{estudio.detalle}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{cv.idiomas_title}</h2>
        <ul className="mt-4 space-y-2">
          {cv.idiomas.map((item: Idioma) => (
            <li key={item.idioma} className="text-[var(--dim)]">
              <span className="font-medium text-[var(--text)]">{item.idioma}</span> — {item.nivel}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-[var(--line)] pt-8">
        <h2 className="font-mono text-sm uppercase tracking-wide text-[var(--dim)]">
          {cv.personales_title}
        </h2>
        <p className="mt-2 max-w-[65ch] text-sm text-[var(--dim)]">{cv.personales}</p>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: Crear `app/cv/layout.tsx`**

```tsx
import type { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "Currículum",
  description:
    "Currículum de Brian Tellez: Ingeniería en Sistemas Computacionales, desarrollo full-stack, DevOps e infraestructura autoalojada. Descargable en PDF.",
  alternates: { canonical: `${BASE_URL}/cv` },
  openGraph: {
    title: "Currículum | Brian Tellez",
    description: "Currículum de Brian Tellez, desarrollador full-stack y DevOps en Tijuana.",
    url: `${BASE_URL}/cv`,
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 7: Verificar**

```bash
npm run validar:locales
npx tsc --noEmit
npx next build
ls -la out/cv/ out/CV-Brian-Tellez-*.pdf
```

Expected: todo pasa, `out/cv/index.html` existe y los dos PDF están copiados en `out/`.

- [ ] **Step 8: Commit**

```bash
git add scripts/generar-cv-pdf.mjs app/cv package.json locales/ public/CV-Brian-Tellez-ES.pdf public/CV-Brian-Tellez-EN.pdf
git commit -m "Pagina de CV y PDF regenerado desde el CV de agosto"
```

---

### Task 10: Navbar, footer, sitemap y cierre

**Files:**
- Modify: `app/components/Navbar.tsx`
- Modify: `app/components/Footer.tsx`
- Modify: `app/sobre-mi/page.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `public/sitemap.xml`
- Modify: `locales/es.json`, `locales/en.json`

**Interfaces:**
- Consumes: todo lo anterior
- Produces: sitio completo y coherente

- [ ] **Step 1: Añadir el CV a la navegación**

En ambos locales, dentro de `nav`, añadir la clave:

```json
"cv": "CV"
```

En `app/components/Navbar.tsx`, añadir el enlace a `/cv` en la lista de enlaces, junto a los existentes, y actualizar los colores: sustituir todas las clases `zinc` por las variables (`text-[var(--text)]`, `border-[var(--line)]`, `bg-[var(--ink)]`, `hover:bg-[var(--surface)]`).

Confirmar que el menú móvil sigue funcionando con el enlace nuevo (R2).

- [ ] **Step 2: Actualizar el footer**

En `app/components/Footer.tsx`, sustituir las clases `zinc` por las variables igual que en el navbar. Añadir el enlace a `/cv` si el footer lista rutas.

- [ ] **Step 3: Actualizar las páginas restantes a los tokens**

En `app/sobre-mi/page.tsx` y `app/contacto/page.tsx`, reemplazar todas las clases de color `zinc-*` por las variables. El patrón de sustitución:

| Antes | Después |
|---|---|
| `bg-zinc-50 dark:bg-zinc-950` | `bg-[var(--ink)]` |
| `bg-white dark:bg-zinc-900/40` | `bg-[var(--surface)]` |
| `text-zinc-900 dark:text-white` | `text-[var(--text)]` |
| `text-zinc-600 dark:text-zinc-400` | `text-[var(--dim)]` |
| `border-zinc-200 dark:border-zinc-800` | `border-[var(--line)]` |

En `sobre-mi/page.tsx`, borrar además el comentario obsoleto `{/* Avatar Placeholder */}`, que quedó tras poner la foto real.

- [ ] **Step 4: Regenerar el sitemap**

Reemplazar `public/sitemap.xml` con las rutas actuales. Estructura por cada URL:

```xml
<url>
  <loc>https://briantellez.ourocore.net/RUTA</loc>
  <lastmod>2026-09-11</lastmod>
</url>
```

Las rutas: `/`, `/sobre-mi`, `/contacto`, `/cv`, `/proyectos`, y `/proyectos/<slug>` para los catorce slugs de `lib/proyectos.ts` (`notecore`, `ada`, `zaga`, `koko`, `wander`, `shokan`, `homelab`, `iris`, `kanua-petto`, `sgv`, `clips`, `ourocore`, `bots`, `portafolio`).

Esto corrige la ausencia de Koko y añade los cuatro nuevos.

- [ ] **Step 5: Barrido final de anti-patrones**

```bash
grep -rn "Téllez" app/ lib/ locales/ public/ scripts/ && echo "FALLO R1" || echo "R1 ok"
grep -rn "zinc-" app/ --include="*.tsx" && echo "Quedan clases zinc" || echo "Tokens ok"
grep -rn "proyectos/portfolio\|/#proyectos" app/ && echo "Enlaces rotos" || echo "Enlaces ok"
npm run validar:locales
npx tsc --noEmit
npx next build
```

Expected: "R1 ok", "Tokens ok", "Enlaces ok", validador pasa, `tsc` limpio, build exitoso.

- [ ] **Step 6: Comprobar las dos temas y el móvil**

```bash
npx serve out -l 4321 &
sleep 3
for ruta in "" "proyectos" "proyectos/notecore" "cv" "sobre-mi" "contacto"; do
  nombre=$(echo "${ruta:-home}" | tr '/' '-')
  chromium --headless --disable-gpu --no-sandbox --window-size=375,900 \
    --screenshot="$HOME/snap/chromium/common/movil-$nombre.png" "http://localhost:4321/$ruta"
done
kill %1
ls -la "$HOME/snap/chromium/common/"movil-*.png
```

Revisar cada captura: sin scroll horizontal, texto legible, panel apilado. Después repetir cambiando el tema a claro desde el navegador para confirmar contraste (R3).

Recordatorio: chromium bajo snap **solo** escribe en `~/snap/chromium/common/`.

- [ ] **Step 7: Commit**

```bash
git add app/ public/sitemap.xml locales/
git commit -m "Navbar, footer y sitemap al dia; tokens en todas las paginas"
```

---

## Self-Review

**Cobertura del spec:**

| Requisito del spec | Tarea |
|---|---|
| R1 sin acentos | Verificado en Task 10 Step 5 |
| R2 responsive | Task 6 Step 6, Task 10 Step 6 |
| R3 dos temas | Task 1 (tokens), Task 10 Step 6 |
| R4 bilingüe | Task 2 (validador), usado en todas |
| Paleta y contraste | Task 1 Step 1 |
| Tipografía | Task 1 Step 2 |
| Hero de infraestructura | Tasks 5 y 6 |
| Build-time, no falla si cae un servicio | Task 5 Step 2 |
| Movimiento con reduced-motion | Task 1 Step 1, Task 6 Step 2 |
| Datos centralizados | Task 4 |
| Plantilla de proyecto | Task 8 |
| Cuatro proyectos nuevos | Task 7 |
| CV página + PDF | Task 9 |
| Bio y datos corregidos | Task 3 |
| Error 1: link `/proyectos/portfolio` | Task 8 Step 3 |
| Error 2: ancla `/#proyectos` | Task 8 Step 4, verificado Step 6 |
| Error 3: sitemap sin Koko | Task 10 Step 4 |
| Error 4: diagrama de Koko en español | Task 8 Step 5 |
| Error 5: basura de scaffold | Task 1 Step 4 |
| Error 6: keyframes muertos | Task 1 Step 1 |
| Error 7: Koko ausente en home | Task 6 Step 4 (se quitan las tarjetas hardcodeadas) |
| GA por variable de entorno | Task 1 Step 3 |

Sin huecos.

**Consistencia de tipos:** `Proyecto`, `EstadoProyecto`, `Servicio` y `EstadoInfra` se definen en Tasks 4 y 5 y se consumen con los mismos nombres en Tasks 6, 8 y 9. `proyectoPorSlug`, `proyectosDestacados` y `proyectosSecundarios` mantienen su firma. Las variables CSS usan los mismos siete nombres en todas las tareas.

**Notas de entorno verificadas antes de escribir el plan:**
- Chromium existe pero es un snap: solo escribe en `~/snap/chromium/common/`. Escribir en `/tmp` o `~/.cache` falla con "Permission denied". El script de Task 9 lo contempla.
- El CV en español genera un PDF de 3 páginas y 110 KB.
- Space Grotesk expone 300/400/500/600/700; JetBrains Mono, 400/500/700. Los pesos del plan existen.
- Los ocho dominios respondían 200 el 2026-09-11.
- No hay framework de tests: la verificación es por comando, no por suite.
