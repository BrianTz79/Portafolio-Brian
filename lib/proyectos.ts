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
    imagen: "/zaga.jpg",
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
    imagen: "/koko.jpg",
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
    imagen: "/wander.jpg",
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
    imagen: "/shokan.jpg",
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
    imagen: "/ourocore.jpg",
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
