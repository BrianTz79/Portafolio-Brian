"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { proyectoPorSlug } from "@/lib/proyectos";
import MarcaProyecto from "./MarcaProyecto";

type ItemArquitectura = { name: string; desc: string };

/** Formas de elemento de lista que aparecen en los distintos bloques _details. */
type ItemLista =
  | string
  | { name: string; desc?: string; req?: string }
  | { step: string; desc?: string }
  | { phase: string; desc?: string }
  | { label: string; value?: string; note?: string };

type CategoriaStack = { name: string; items: string[] };

/** Un bloque `<clave>_details` de los locales. Las claves varian mucho entre
    proyectos, y sus valores son cadenas, listas o listas de objetos segun el
    caso, asi que el valor queda sin acotar y se comprueba en cada uso. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Campos = Record<string, any>;

/** Pares titulo + cuerpo que se repiten entre proyectos. */
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

/** Pares titulo + lista que se repiten entre proyectos. */
const PARES_LISTA: Array<[string, string]> = [
  ["pipeline_title", "pipeline_steps"],
  ["testing_title", "testing_items"],
  ["roadmap_title", "roadmap_items"],
  ["pride_title", "pride_items"],
  ["functional_title", "functional_items"],
  ["platforms_title", "platforms"],
  ["hardware_title", "specs"],
];

function partesDeItem(item: ItemLista): { etiqueta: string; detalle?: string } {
  if (typeof item === "string") {
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

/** Rejilla densa: las funcionalidades no se leen como prosa, se ojean. */
function RejillaDeItems({ items }: { items: ItemLista[] }) {
  return (
    <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {items.map((item) => {
        const { etiqueta, detalle } = partesDeItem(item);
        return (
          <li key={claveDeItem(item)} className="border-t border-[var(--line)] pt-3">
            <p className="font-medium text-[var(--text)]">{etiqueta}</p>
            {detalle && <p className="mt-1 text-sm leading-relaxed text-[var(--dim)]">{detalle}</p>}
          </li>
        );
      })}
    </ul>
  );
}

/** Lista en secuencia: para pipelines y hojas de ruta, donde el orden importa. */
function ListaEnOrden({ items }: { items: ItemLista[] }) {
  return (
    <ol className="mt-5 space-y-4">
      {items.map((item, i) => {
        const { etiqueta, detalle } = partesDeItem(item);
        return (
          <li key={claveDeItem(item)} className="grid grid-cols-[2.5rem_1fr] gap-3">
            <span className="font-mono text-sm text-[var(--signal-sur)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="font-medium text-[var(--text)]">{etiqueta}</span>
              {detalle && (
                <span className="mt-1 block text-sm leading-relaxed text-[var(--dim)]">{detalle}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function ProyectoPage({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const proyecto = proyectoPorSlug(slug);
  if (!proyecto) return null;

  const raiz = t as unknown as Record<string, unknown>;
  /* Los bloques _details tienen formas muy distintas entre proyectos (unos
     traen listas de objetos, otros cadenas sueltas), asi que se leen como
     diccionario laxo y cada uso comprueba lo que espera antes de usarlo. */
  const datos = raiz[`${proyecto.claveI18n}_details`] as Campos | undefined;
  if (!datos) return null;

  const ficha = (raiz.ficha ?? {}) as Record<string, string>;
  const etiquetaEstado =
    proyecto.estado === "produccion"
      ? ficha.estado_produccion
      : proyecto.estado === "desarrollo"
        ? ficha.estado_desarrollo
        : ficha.estado_archivado;

  /* La entradilla toma el primer bloque de prosa que exista: ada y koko no
     tienen `description`, y sin esto abririan sin texto de entrada. */
  const entradilla: string | undefined =
    datos.description ?? datos.problem_body ?? datos.origin_body;

  /* Las secuencias llevan numeracion; el resto, no. */
  const CLAVES_SECUENCIA = new Set(["pipeline_title", "roadmap_title"]);

  return (
    <article className="mx-auto w-full min-w-0 max-w-4xl px-5 py-12 md:py-16">
      <Link
        href="/proyectos"
        className="inline-flex items-center gap-2 font-mono text-sm text-[var(--dim)] transition-colors hover:text-[var(--text)]"
      >
        <ArrowLeft className="h-4 w-4" />
        {datos.back}
      </Link>

      {/* Cabecera: lo que un reclutador necesita en diez segundos. */}
      <header className="emerge emerge-1 mt-8">
        <h1 className="titular-metal text-[length:var(--text-display-l)] font-bold">
          {datos.title}
        </h1>
        <p className="medida-lectura mt-3 text-xl text-[var(--dim)]">{datos.subtitle}</p>

        <dl className="mt-7 grid gap-x-8 gap-y-4 border-y border-[var(--line)] py-5 sm:grid-cols-3">
          <div>
            <dt className="etiqueta-mono">{ficha.estado_label}</dt>
            <dd className="mt-1 flex items-center gap-2 text-[var(--text)]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    proyecto.estado === "produccion" ? "var(--live)" : "var(--dim)",
                }}
              />
              {etiquetaEstado}
            </dd>
          </div>
          <div>
            <dt className="etiqueta-mono">{ficha.anio_label}</dt>
            <dd className="mt-1 font-mono text-[var(--text)]">{proyecto.anio}</dd>
          </div>
          <div>
            <dt className="etiqueta-mono">{ficha.stack_label}</dt>
            <dd className="mt-1 font-mono text-[var(--text)]">
              {String(ficha.conteo_tecnologias ?? "{n}").replace(
                "{n}",
                String(proyecto.stack.length)
              )}
            </dd>
          </div>
        </dl>

        {/* El status escrito a mano solo aporta cuando dice algo que la tabla no
            cubre ya (una version, una fecha); si repite el estado, se omite. */}
        {typeof datos.status === "string" &&
          etiquetaEstado &&
          !datos.status.toLowerCase().startsWith(String(etiquetaEstado).toLowerCase()) && (
            <p className="mt-4 font-mono text-sm text-[var(--signal-sur)]">{datos.status}</p>
          )}
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
              className="accion-primaria inline-flex items-center gap-2 rounded-md bg-[var(--text)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:opacity-90"
            >
              {datos.website_btn ?? ficha.en_vivo}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {proyecto.repo && (
            <a
              href={proyecto.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="accion-secundaria inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)]"
            >
              {datos.repo_btn ?? datos.github_btn ?? "GitHub"}
              <Code2 className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      {/* Imagen real si existe; si no, la marca generada del proyecto. */}
      <div className="emerge emerge-2 relative mt-10 aspect-video overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]">
        {proyecto.imagen ? (
          <Image
            src={proyecto.imagen}
            alt={datos.screenshot_alt ?? datos.title}
            fill
            sizes="(min-width: 896px) 56rem, 100vw"
            className="object-cover object-top"
            priority
          />
        ) : (
          /* La marca generada no llena el encuadre como lo haria una captura:
             se deja respirar para que lea como emblema y no como ilustracion. */
          <MarcaProyecto
            proyecto={proyecto}
            className="h-full w-full p-12 text-[var(--signal)] opacity-80 md:p-16"
          />
        )}
      </div>

      {/* Entradilla: el parrafo de entrada, mas grande que el cuerpo. */}
      {entradilla && (
        <p className="medida-lectura mt-10 text-xl leading-relaxed text-[var(--text)]">
          {entradilla}
        </p>
      )}

      {/* Pares titulo + cuerpo, saltando el que ya se uso como entradilla. */}
      {PARES_TEXTO.map(([claveTitulo, claveCuerpo]) => {
        const titulo = datos[claveTitulo];
        const cuerpo = datos[claveCuerpo];
        if (!titulo || !cuerpo || cuerpo === entradilla) return null;
        return (
          <section key={claveTitulo} className="mt-12">
            <h2 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
              {titulo}
            </h2>
            <p className="medida-lectura mt-3 leading-relaxed text-[var(--dim)]">{cuerpo}</p>
          </section>
        );
      })}

      {Array.isArray(datos.features) && datos.features.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
            {datos.features_title}
          </h2>
          <RejillaDeItems items={datos.features} />
        </section>
      )}

      {/* Arquitectura como tabla de decisiones: que se eligio y por que. */}
      {Array.isArray(datos.architecture_items) && (
        <section className="mt-12">
          <h2 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
            {datos.architecture_title}
          </h2>
          {datos.architecture_subtitle && (
            <p className="mt-2 text-lg text-[var(--dim)]">{datos.architecture_subtitle}</p>
          )}
          {datos.architecture_intro && (
            <p className="medida-lectura mt-3 leading-relaxed text-[var(--dim)]">
              {datos.architecture_intro}
            </p>
          )}
          <dl className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {datos.architecture_items.map((item: ItemArquitectura) => (
              <div key={item.name} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-medium text-[var(--text)]">{item.name}</dt>
                <dd className="leading-relaxed text-[var(--dim)]">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Nodos Edge/Fog de ADA. */}
      {["edge", "fog"].map((prefijo) => {
        const titulo = datos[`${prefijo}_title`];
        const cuerpo = datos[`${prefijo}_desc`];
        const specs = datos[`${prefijo}_specs`];
        if (!titulo) return null;
        return (
          <section key={prefijo} className="mt-12">
            <h2 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
              {titulo}
            </h2>
            {cuerpo && (
              <p className="medida-lectura mt-3 leading-relaxed text-[var(--dim)]">{cuerpo}</p>
            )}
            {Array.isArray(specs) && specs.length > 0 && <RejillaDeItems items={specs} />}
          </section>
        );
      })}

      {PARES_LISTA.map(([claveTitulo, claveLista]) => {
        const titulo = datos[claveTitulo];
        const items = datos[claveLista];
        if (!titulo || !Array.isArray(items) || items.length === 0) return null;
        const enOrden = CLAVES_SECUENCIA.has(claveTitulo);
        return (
          <section key={claveTitulo} className="mt-12">
            <h2 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
              {titulo}
            </h2>
            {enOrden ? <ListaEnOrden items={items} /> : <RejillaDeItems items={items} />}
          </section>
        );
      })}

      {/* Lo que mas costo: cita destacada, no una tarjeta mas. */}
      {datos.highlight && (
        <section className="mt-12 border-l-2 border-[var(--signal)] pl-6">
          <h2 className="etiqueta-mono">{datos.highlight_title}</h2>
          <p className="medida-lectura mt-3 text-lg leading-relaxed text-[var(--text)]">
            {datos.highlight}
          </p>
        </section>
      )}

      {datos.diagrama && (
        <section className="mt-12">
          {ficha.diagrama_title && <h2 className="etiqueta-mono">{ficha.diagrama_title}</h2>}
          <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
            <pre className="font-mono text-xs leading-relaxed text-[var(--dim)]">{datos.diagrama}</pre>
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-[var(--line)] pt-8">
        <h2 className="etiqueta-mono">{datos.stack_title ?? ficha.stack_label}</h2>
        {Array.isArray(datos.stack_categories) && datos.stack_categories.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {datos.stack_categories.map((cat: CategoriaStack) => (
              <div key={cat.name}>
                <h3 className="font-mono text-xs uppercase tracking-wide text-[var(--dim)]">
                  {cat.name}
                </h3>
                <p className="mt-2 font-mono text-sm text-[var(--dim)]">{cat.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 font-mono text-sm text-[var(--dim)]">
            {(Array.isArray(datos.stack) && datos.stack.length > 0
              ? datos.stack
              : proyecto.stack
            ).join(" · ")}
          </p>
        )}
      </section>
    </article>
  );
}
