# Rediseño del portafolio de Brian Tellez

**Fecha:** 2026-09-11
**Estado:** aprobado, pendiente de plan de implementación

---

## 1. Objetivo

Conseguir **trabajo junior o prácticas en la industria**. Todo lo demás se subordina a
eso: qué se muestra primero, qué tono usa el copy, y qué tan rápido un reclutador llega
al CV y al código.

## 2. Diagnóstico

El portafolio actual funciona pero no distingue. Tres problemas de fondo:

**No se parece a su autor.** Paleta gris de saturación 0, Inter, tarjetas redondeadas
idénticas, `hover:scale-105` en todo. Es el kit por defecto de cualquier plantilla.

**No cuenta lo que hay debajo.** Brian ensambló un servidor bare-metal (Ryzen 5 9600X,
64 GB DDR5), le instaló Ubuntu, y **ocho dominios en producción corren sobre esa máquina**.
Verificado el 2026-09-11: los ocho responden HTTP 200. El sitio actual no menciona eso.

**La arquitectura resiste el cambio.** Agregar un proyecto exige tocar tres lugares
desacoplados: la tarjeta en `projects`/`general_projects`, el bloque `<proyecto>_details`
de forma libre, y una página React escrita a mano de 80–300 líneas. No existe
`<ProjectCard>` ni `<ProjectPage>`. Nueve páginas copian el mismo markup con distinto color.

Este spec agrega **cuatro** proyectos. Sin refactor previo, ese trabajo se multiplica por
cuatro y el sitio queda igual de rígido para el siguiente.

## 3. Requisitos no negociables

Pedidos explícitamente por el usuario. Ninguno se sacrifica por estética:

| # | Requisito | Estado |
|---|---|---|
| R1 | "Brian Tellez" **sin acentos**, siempre | Verificado: no hay "Téllez" en el código hoy |
| R2 | Responsive real, debe verse bien en teléfono | Se valida en cada página |
| R3 | Tema oscuro **por defecto** + tema claro | Ya existe vía next-themes; se conserva |
| R4 | Bilingüe ES/EN con el i18n propio | Ya existe; **no se quita ni se reemplaza** |

R4 implica: todo texto nuevo va a `locales/es.json` y `locales/en.json`. Nada hardcodeado
en JSX. Esto incluye corregir el diagrama ASCII de Koko, hoy hardcodeado en español.

## 4. Concepto: "el servidor en el cuarto"

El sitio se comporta como el sistema que Brian administra. Informativo, no decorativo.

El hero no es un nombre grande con gradiente, sino **la infraestructura con su estado
real**: los ocho servicios en vivo. Un reclutador ve de inmediato que no son capturas de
pantalla, son cosas corriendo.

**Un solo lugar de audacia.** El panel de infraestructura es el elemento memorable; todo
lo demás queda quieto y disciplinado.

### Verificación de estados: build-time

El sitio es `output: 'export'` (estático, sin servidor Node), así que no puede hacer fetch
al cargar. Los estados se verifican **en tiempo de build** y se regeneran en cada deploy.

Es una decisión consciente: honesto, sin infraestructura extra, compatible con el modelo
actual. La UI debe decir la verdad sobre esto — etiqueta tipo "verificado en el último
despliegue" con fecha, nunca un "en vivo" que insinúe tiempo real.

Si un servicio no responde durante el build, se marca como inactivo; el build **no falla**.

## 5. Tokens

### Color

Base de terminal sobria. El ámbar viene de los LEDs de un rack, no de una paleta genérica,
y es funcional: señala lo que está vivo.

**Tema oscuro (por defecto)** — fondo `#0C0E10`:

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `--ink` | `#0C0E10` | Fondo | — |
| `--surface` | `#14171A` | Superficies elevadas | — |
| `--line` | `#232830` | Bordes, hairlines | — |
| `--text` | `#E4E7EB` | Texto principal | 15.59:1 AAA |
| `--dim` | `#8B95A1` | Texto secundario | 6.36:1 AA |
| `--signal` | `#F5A524` | Acento único, estados activos | 9.48:1 AAA |
| `--live` | `#3FB950` | Solo "en línea" | 7.61:1 AAA |

**Tema claro** — fondo `#FFFFFF`:

| Token | Hex | Rol | Contraste |
|---|---|---|---|
| `--ink` | `#FFFFFF` | Fondo | — |
| `--surface` | `#F7F8F9` | Superficies elevadas | — |
| `--line` | `#E3E6EA` | Bordes | — |
| `--text` | `#14171A` | Texto principal | 17.99:1 AAA |
| `--dim` | `#5A6570` | Texto secundario | 5.95:1 AA |
| `--signal` | `#9A6207` | Acento | 5.09:1 AA |
| `--live` | `#1A7F37` | "En línea" | 5.08:1 AA |

**Nota de accesibilidad:** el ámbar `#F5A524` da **2.04:1 sobre blanco — falla WCAG**. Por
eso el tema claro usa `#9A6207`. Los dos temas se definen con los mismos nombres de token;
solo cambian los valores.

Deliberadamente **no** se usa: crema/terracota, verde ácido, ni vermellón — son los
defaults reconocibles del diseño generado.

### Tipografía

Dos familias con roles claros y distintos:

- **Space Grotesk** — titulares y texto corrido. Carácter técnico sin ser monoespaciada;
  formas geométricas con detalles peculiares que la hacen memorable.
- **JetBrains Mono** — datos, estados, stacks, versiones, specs de hardware. Cuando se
  muestra uptime o specs, el monoespaciado *significa* algo; no es decoración.

No se usa Inter (la fuente por defecto de internet, y la actual del sitio).

Medida de línea < 70 caracteres en texto corrido. Ambas se cargan con `next/font/google`,
con `subsets: ["latin"]` y fallback declarado.

### Layout

Asimétrico. El sitio actual centra todo, y eso es parte de lo que lo hace sentir plantilla.

```
┌──────────────────────────────────────────────┐
│ BRIAN TELLEZ            es/en  ○ tema  CV ↓  │
├──────────────────────────────────────────────┤
│                                              │
│  Construyo y opero        ┌────────────────┐ │
│  el stack completo.       │ ourocore-server│ │
│                           │ Ryzen 5 9600X  │ │
│  Desde el hardware        │ 64GB · Ubuntu  │ │
│  hasta el frontend.       ├────────────────┤ │
│                           │ ● notecore     │ │
│  Tijuana · ITT 9º sem     │ ● wander       │ │
│  [Ver proyectos] [CV]     │ ● shokan       │ │
│                           │ ● koko         │ │
│                           │ ● zaga ↗       │ │
│                           │ 8 servicios ✓  │ │
│                           └────────────────┘ │
└──────────────────────────────────────────────┘
```

Texto a la izquierda, la máquina a la derecha. En móvil (R2) la columna de texto va
primero y el panel debajo, a ancho completo — nunca en scroll horizontal.

Los proyectos van en **lista densa con screenshot**, no en grid de tarjetas iguales. Los
que están en producción pesan visualmente más que los archivados.

### Movimiento

**Un solo momento orquestado:** al cargar, los servicios del panel se encienden en
secuencia (~40 ms entre uno y otro), como un arranque de sistema.

Nada más se anima por sí solo. Hover y focus responden, pero sin `scale` en todo.
`prefers-reduced-motion: reduce` desactiva la secuencia y muestra el estado final.

## 6. Arquitectura

### Datos centralizados

Un archivo `lib/proyectos.ts` como fuente única:

```ts
type Proyecto = {
  slug: string;              // ruta en /proyectos/<slug>
  claveI18n: string;         // clave en locales/*.json
  estado: "produccion" | "desarrollo" | "archivado";
  url?: string;              // dominio público, si existe
  repo?: string;             // GitHub, si es público
  stack: string[];
  acento: string;            // color del proyecto
  imagen?: string;           // screenshot en /public
  destacado: boolean;
};
```

Los textos siguen en `locales/*.json` (R4). El archivo de datos guarda **estructura**, no
prosa. Esto resuelve además el remapeo manual de slugs y el `any` de `renderProjectRow`.

### Plantilla de proyecto

Un `<ProyectoPage>` que consume esos datos y reemplaza las nueve páginas escritas a mano.
Secciones opcionales según los datos disponibles.

**Resultado: agregar un proyecto pasa de 3 archivos y ~200 líneas a una entrada en un array.**

### Tokens realmente usados

Hoy `globals.css` define tokens shadcn completos y **solo el `<body>` los consume**; todo
lo demás usa `zinc` crudo con el par claro/oscuro escrito a mano en cada clase. El
rediseño hace que los componentes consuman los tokens, que es lo que permite tener dos
temas sin duplicar cada clase (R3).

## 7. Contenido nuevo

### Proyectos

Cuatro, todos verificados en vivo el 2026-09-11:

| Proyecto | Por qué entra | URL |
|---|---|---|
| **NoteCore** | El más maduro: Android + web en producción, 47 commits este verano, ocho cuentas reales, `.aab` firmado listo para Play Store | notecore.ourocore.net |
| **ZAGA Distribuciones** | Único **cliente real pagando**. Astro 7 + Cloudflare Pages, bilingüe | zagadistribuciones.com |
| **Wander** | 12 fases, Steam OpenID + OAuth Discord/Google, argon2id. Ya en el CV pero no en el sitio | wander.ourocore.net |
| **Shokan** | PWA + app nativa Android (Kotlin), Web Push/VAPID sin Firebase | shokan.ourocore.net |

Descartado explícitamente: Goons & Gooners.

### CV

Página `/cv` navegable y bilingüe (R4) **más** PDF descargable.

- Fuente de verdad: `CV-General.md` / `CV-General-EN.md` (agosto 2026).
- El PDF se **regenera** desde `CV-General.html`, que ya trae `@media print`.
- **El `CV.pdf` actual no se usa**: sus metadatos dicen Canva, diciembre 2024 — veinte
  meses más viejo que los `.md` y sin relación con ellos.
- La variante RWS queda fuera (está enfocada a vacantes de anotación de datos).

### Bio

Actualizar desde el CV. El copy actual dice "8º semestre"; el CV dice **9º semestre,
promedio 93.64/100**, con residencia programada.

Corregir también la ficha del propio portafolio, que hoy se describe como "Next.js 14"
cuando el proyecto corre **Next.js 16.2.2**.

## 8. Errores existentes que se corrigen

Encontrados durante la exploración:

1. **Link 404:** la lista enlaza a `/proyectos/portfolio`; la carpeta real es `portafolio`.
2. **Ancla inexistente:** todos los botones "Volver" apuntan a `/#proyectos`, id que no
   existe en la home.
3. **Sitemap incompleto:** `public/sitemap.xml` no incluye `/proyectos/koko`.
4. **i18n roto en Koko:** el diagrama ASCII está hardcodeado en español y no se traduce (R4).
5. **Basura de scaffold:** `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`
   en `public/`, sin usar.
6. **Keyframes muertos:** `accordion-down/up` en `globals.css`, residuo de shadcn sin Radix.
7. **Koko ausente en la home**, que tiene sus tres tarjetas hardcodeadas aparte.

## 9. Fuera de alcance

- El `.env`: **no se toca**. Verificado que está cubierto por `.gitignore` (`.env*`) y que
  nunca entró al historial de git. El token de Cloudflare está a salvo.
- Goons & Gooners.
- La variante RWS del CV.
- Migrar el i18n a una librería: el Context propio funciona y es lo correcto para un
  export estático (R4).

## 10. Criterios de aceptación

1. Las cuatro páginas nuevas existen, con textos en ambos locales.
2. `/cv` funciona en ES y EN, y el PDF descargable corresponde al CV de agosto 2026.
3. Los siete errores de la sección 8 están corregidos.
4. Cada página se ve correctamente a 375 px de ancho, sin scroll horizontal (R2).
5. Los dos temas funcionan en todas las páginas, con oscuro por defecto (R3).
6. El selector de idioma traduce el sitio completo, incluido el diagrama de Koko (R4).
7. No aparece "Téllez" en ninguna parte (R1).
8. `npx tsc --noEmit` pasa limpio, como hoy.
9. La secuencia del hero respeta `prefers-reduced-motion`.
10. Agregar un quinto proyecto requiere una entrada en `lib/proyectos.ts` más sus textos.
