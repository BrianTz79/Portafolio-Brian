"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { proyectosDestacados, proyectosSecundarios, type Proyecto } from "@/lib/proyectos";
import MarcaProyecto from "./MarcaProyecto";

/** Los bloques de locale se indexan por clave dinamica, asi que se leen como
    diccionarios de texto en vez de por el tipo exacto de locales/es.json. */
type Bloque = Record<string, unknown>;

function texto(bloque: Bloque | undefined, clave: string): string | undefined {
  const valor = bloque?.[clave];
  return typeof valor === "string" ? valor : undefined;
}

function Fila({ proyecto, indice }: { proyecto: Proyecto; indice: number }) {
  const { t } = useTranslation();
  const raiz = t as unknown as Bloque;
  const datos = raiz[`${proyecto.claveI18n}_details`] as Bloque | undefined;
  const catalogo = (raiz.projects ?? {}) as Bloque;
  const generales = (raiz.general_projects ?? {}) as Bloque;
  const ficha = (catalogo[proyecto.claveI18n] ?? generales[proyecto.claveI18n]) as
    | Bloque
    | undefined;

  const titulo = texto(datos, "title") ?? texto(ficha, "name") ?? proyecto.slug;
  const resumen = texto(datos, "subtitle") ?? texto(ficha, "description") ?? "";
  const estado = texto(datos, "status") ?? texto(ficha, "status") ?? "";

  return (
    <li>
      <Link
        href={`/proyectos/${proyecto.slug}`}
        className={`fila-proyecto emerge emerge-${Math.min(indice + 1, 6)} group grid gap-4 border-b border-[var(--line)] py-6 sm:grid-cols-[13rem_1fr] sm:gap-7`}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded border border-[var(--line)] bg-[var(--surface)]">
          {proyecto.imagen ? (
            <Image
              src={proyecto.imagen}
              alt=""
              fill
              sizes="(min-width: 640px) 13rem, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <MarcaProyecto
              proyecto={proyecto}
              className="h-full w-full text-[var(--dim)] opacity-70 transition-opacity group-hover:opacity-100"
            />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
              {titulo}
            </h3>
            {estado && <span className="etiqueta-mono text-[var(--signal-sur)]">{estado}</span>}
          </div>
          <p className="mt-2 max-w-[60ch] text-[var(--dim)]">{resumen}</p>
          <p className="mt-2 font-mono text-xs text-[var(--dim)]">
            {proyecto.stack.slice(0, 4).join(" · ")}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default function ListaProyectos() {
  const { t } = useTranslation();
  const pagina = (t as unknown as Bloque).proyectos_page as Bloque | undefined;
  const destacados = proyectosDestacados();
  const secundarios = proyectosSecundarios();

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl px-5 py-12 md:py-16">
      <h1 className="titular-metal text-[length:var(--text-display-l)] font-bold">
        {texto(pagina, "title")}
      </h1>
      <p className="medida-lectura mt-4 text-lg text-[var(--dim)]">
        {texto(pagina, "subtitle")}
      </p>

      <ul className="mt-10">
        {destacados.map((p, i) => (
          <Fila key={p.slug} proyecto={p} indice={i} />
        ))}
      </ul>

      <h2 className="etiqueta-mono mt-14">{texto(pagina, "others")}</h2>
      <ul className="mt-4">
        {secundarios.map((p, i) => (
          <Fila key={p.slug} proyecto={p} indice={i} />
        ))}
      </ul>
    </div>
  );
}
