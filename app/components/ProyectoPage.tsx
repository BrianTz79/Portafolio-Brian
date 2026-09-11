"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { proyectoPorSlug } from "@/lib/proyectos";

type ItemArquitectura = { name: string; desc: string };
type Caracteristica = { name: string; desc: string };

export default function ProyectoPage({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) return null;

  const datos = (t as Record<string, any>)[`${proyecto.claveI18n}_details`];
  if (!datos) return null;

  return (
    <article className="mx-auto w-full min-w-0 max-w-4xl px-5 py-12 md:py-16">
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
            {datos.features.map((f: string | Caracteristica) => {
              const esObjeto = typeof f === "object" && f !== null;
              const clave = esObjeto ? f.name : f;
              return (
                <li key={clave} className="flex gap-3 text-[var(--dim)]">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" />
                  {esObjeto ? (
                    <span className="max-w-[65ch]">
                      <span className="font-medium text-[var(--text)]">{f.name}</span>
                      {f.desc && <span> — {f.desc}</span>}
                    </span>
                  ) : (
                    <span className="max-w-[65ch]">{clave}</span>
                  )}
                </li>
              );
            })}
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

      {datos.diagrama && (
        <section className="mt-10">
          <div className="overflow-x-auto rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
            <pre className="font-mono text-xs leading-relaxed text-[var(--dim)]">{datos.diagrama}</pre>
          </div>
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
