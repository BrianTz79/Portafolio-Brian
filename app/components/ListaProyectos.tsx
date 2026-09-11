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
    <div className="mx-auto w-full min-w-0 max-w-4xl px-5 py-12 md:py-16">
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
