"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { proyectoPorSlug } from "@/lib/proyectos";

type ItemArquitectura = { name: string; desc: string };

/** Formas de elemento de lista que aparecen en los distintos bloques _details. */
type ItemLista =
  | string
  | { name: string; desc?: string; req?: string }
  | { step: string; desc?: string }
  | { phase: string; desc?: string }
  | { label: string; value?: string; note?: string };

type CategoriaStack = { name: string; items: string[] };

/** Pares título + cuerpo de texto que se repiten entre proyectos (patrón 1). */
const PARES_TEXTO: Array<[string, string]> = [
  ["problem_title", "problem_body"],
  ["solution_title", "solution_body"],
  ["interpreter_title", "interpreter_body"],
  ["origin_title", "origin_body"],
  ["what_title", "what_body"],
  ["design_title", "design_body"],
  ["overlay_title", "overlay_body"],
  ["connection_title", "connection_body"],
  ["justification_title", "justification"],
  ["plan_title", "plan_desc"],
  ["orchestration_title", "orchestration_desc"],
];

/** Pares título + lista que se repiten entre proyectos (patrón 2). */
const PARES_LISTA: Array<[string, string]> = [
  ["pipeline_title", "pipeline_steps"],
  ["testing_title", "testing_items"],
  ["roadmap_title", "roadmap_items"],
  ["pride_title", "pride_items"],
  ["functional_title", "functional_items"],
  ["platforms_title", "platforms"],
  ["hardware_title", "specs"],
];

/** Extrae una etiqueta y una descripción de cualquier forma conocida de item. */
function partesDeItem(item: ItemLista): { etiqueta: string; detalle?: string } {
  if (typeof item === "string") {
    // homelab_details.specs usa el formato "Título: descripción"
    const separador = item.indexOf(": ");
    if (separador > -1) {
      return { etiqueta: item.slice(0, separador), detalle: item.slice(separador + 2) };
    }
    return { etiqueta: item };
  }
  if ("step" in item) return { etiqueta: item.step, detalle: item.desc };
  if ("phase" in item) return { etiqueta: item.phase, detalle: item.desc };
  if ("label" in item) {
    const detalle = [item.value, item.note].filter(Boolean).join(" — ");
    return { etiqueta: item.label, detalle: detalle || undefined };
  }
  return { etiqueta: item.name, detalle: item.desc ?? item.req };
}

function claveDeItem(item: ItemLista): string {
  if (typeof item === "string") return item;
  if ("step" in item) return item.step;
  if ("phase" in item) return item.phase;
  if ("label" in item) return item.label;
  return item.name;
}

/** Lista genérica: título + colección de items en cualquiera de las formas conocidas. */
function ListaDeItems({ items }: { items: ItemLista[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => {
        const { etiqueta, detalle } = partesDeItem(item);
        return (
          <li key={claveDeItem(item)} className="flex gap-3 text-[var(--dim)]">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" />
            <span className="max-w-[65ch]">
              <span className="font-medium text-[var(--text)]">{etiqueta}</span>
              {detalle && <span> — {detalle}</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function ProyectoPage({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) return null;

  const datos = (t as Record<string, any>)[`${proyecto.claveI18n}_details`];
  if (!datos) return null;

  const enlaceRepo = proyecto.repo && (
    <a
      href={proyecto.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface)]"
    >
      {datos.repo_btn ?? datos.github_btn ?? "GitHub"}
      <Code2 className="h-4 w-4" />
    </a>
  );

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
        {datos.context_label && datos.team && (
          <p className="mt-2 font-mono text-xs text-[var(--dim)]">
            <span className="uppercase tracking-wide">{datos.context_label}</span>
            {" · "}
            {datos.team}
          </p>
        )}

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
          {enlaceRepo}
        </div>
      </header>

      {proyecto.imagen && (
        <div className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-[var(--line)]">
          <Image src={proyecto.imagen} alt={datos.screenshot_alt ?? datos.title} fill className="object-cover" />
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
          {datos.description_title}
        </h2>
        <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--dim)]">{datos.description}</p>
      </section>

      {/* Patrón 1: pares título + cuerpo (problema, solución, intérprete, origen, diseño, overlay, conexión, justificación, plan, orquestación...) */}
      {PARES_TEXTO.map(([claveTitulo, claveCuerpo]) => {
        const titulo = datos[claveTitulo];
        const cuerpo = datos[claveCuerpo];
        if (!titulo || !cuerpo) return null;
        return (
          <section key={claveTitulo} className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{titulo}</h2>
            <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--dim)]">{cuerpo}</p>
          </section>
        );
      })}

      {Array.isArray(datos.features) && datos.features.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
            {datos.features_title}
          </h2>
          <ListaDeItems items={datos.features} />
        </section>
      )}

      {Array.isArray(datos.architecture_items) && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[var(--text)]">
            {datos.architecture_title}
          </h2>
          {datos.architecture_subtitle && (
            <p className="mt-2 text-lg text-[var(--dim)]">{datos.architecture_subtitle}</p>
          )}
          {datos.architecture_intro && (
            <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--dim)]">{datos.architecture_intro}</p>
          )}
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

      {/* Patrón 3: nodos Edge/Fog de ADA — título + párrafo + lista de specs */}
      {["edge", "fog"].map((prefijo) => {
        const titulo = datos[`${prefijo}_title`];
        const cuerpo = datos[`${prefijo}_desc`];
        const specs = datos[`${prefijo}_specs`];
        if (!titulo) return null;
        return (
          <section key={prefijo} className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{titulo}</h2>
            {cuerpo && <p className="mt-3 max-w-[65ch] leading-relaxed text-[var(--dim)]">{cuerpo}</p>}
            {Array.isArray(specs) && specs.length > 0 && <ListaDeItems items={specs} />}
          </section>
        );
      })}

      {/* Patrón 2: pares título + lista (pipeline, pruebas, roadmap, orgullo, funcionalidades, plataformas, hardware...) */}
      {PARES_LISTA.map(([claveTitulo, claveLista]) => {
        const titulo = datos[claveTitulo];
        const items = datos[claveLista];
        if (!titulo || !Array.isArray(items) || items.length === 0) return null;
        return (
          <section key={claveTitulo} className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-[var(--text)]">{titulo}</h2>
            <ListaDeItems items={items} />
          </section>
        );
      })}

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
        {Array.isArray(datos.stack_categories) && datos.stack_categories.length > 0 ? (
          <div className="mt-4 space-y-4">
            {datos.stack_categories.map((cat: CategoriaStack) => (
              <div key={cat.name}>
                <h3 className="font-mono text-xs uppercase tracking-wide text-[var(--dim)]">{cat.name}</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {cat.items.map((tec) => (
                    <li
                      key={tec}
                      className="rounded border border-[var(--line)] px-2.5 py-1 font-mono text-xs text-[var(--dim)]"
                    >
                      {tec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </section>
    </article>
  );
}
