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
          {(t as Record<string, any>).proyectos_page?.title}
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
