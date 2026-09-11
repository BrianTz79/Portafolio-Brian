"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import estadoInfraJson from "@/data/servicios.json";
import PanelInfra from "./components/PanelInfra";
import type { EstadoInfra } from "@/lib/infraestructura";

const estadoInfra = estadoInfraJson as EstadoInfra;

type CategoriaHabilidad = { name: string; badges: string[] };
type ItemExperiencia = { date: string; company: string; title: string; description: string };

export default function Home() {
  const { t } = useTranslation();
  const habilidades = t.skills.categories as CategoriaHabilidad[];
  const experiencia = t.experience.items as ItemExperiencia[];

  return (
    <div className="flex flex-col bg-[var(--ink)]">
      {/* Portada: rejilla de fondo + titular con degradado plateado */}
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div aria-hidden="true" className="rejilla-hero pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.35fr_1fr] md:gap-14 md:py-28">
          <div>
            <h1 className="titular-metal emerge emerge-1 text-[length:var(--text-display-xl)] font-bold">
              {t.hero.titular}
            </h1>
            <p className="emerge emerge-2 mt-4 max-w-[24ch] text-[length:var(--text-display-m)] font-light leading-snug text-[var(--dim)]">
              {t.hero.subtitular}
            </p>
            <p className="emerge emerge-3 etiqueta-mono mt-6">{t.hero.ubicacion}</p>
            <div className="emerge emerge-4 mt-8 flex flex-wrap gap-3">
              <Link
                href="/proyectos"
                className="accion-primaria rounded-md bg-[var(--text)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:opacity-90"
              >
                {t.hero.view_projects}
              </Link>
              <Link
                href="/cv"
                className="accion-secundaria rounded-md border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)]"
              >
                {t.hero.cv}
              </Link>
            </div>
          </div>
          <div className="emerge emerge-5">
            <PanelInfra estado={estadoInfra} />
          </div>
        </div>
      </section>

      {/* Resumen biografico */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-[length:var(--text-display-l)] font-semibold tracking-tight text-[var(--text)]">
            {t.about.title}
          </h2>
          <p className="medida-lectura mt-6 text-lg leading-relaxed text-[var(--dim)]">
            {t.about.description[0]}
          </p>
          <Link
            href="/sobre-mi"
            className="group mt-8 inline-flex items-center text-sm font-semibold text-[var(--signal-sur)] hover:opacity-80"
          >
            {t.ui?.read_more}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Aptitudes: rejilla con filetes, sin tarjetas */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-[length:var(--text-display-l)] font-semibold tracking-tight text-[var(--text)]">
            {t.skills.title}
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {habilidades.map((cat) => (
              <div key={cat.name} className="border-t border-[var(--line)] pt-5">
                <h3 className="etiqueta-mono">{cat.name}</h3>
                <p className="mt-3 leading-relaxed text-[var(--dim)]">
                  {cat.badges.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trayectoria: lectura vertical, sin tarjetas centradas */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-[length:var(--text-display-l)] font-semibold tracking-tight text-[var(--text)]">
            {t.experience.title}
          </h2>
          <div className="mt-10 space-y-10">
            {experiencia.map((item, idx) => (
              <article
                key={`${item.company}-${item.title}`}
                className="grid gap-3 border-l-2 border-[var(--line)] pl-6 md:grid-cols-[14rem_1fr] md:gap-8"
              >
                <div>
                  <p className="etiqueta-mono text-[var(--signal-sur)]">{item.date}</p>
                  <p className="mt-2 flex items-center gap-2 font-medium text-[var(--dim)]">
                    {idx >= 3 ? (
                      <GraduationCap className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <Briefcase className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    {item.company}
                  </p>
                </div>
                <div>
                  <h3 className="text-[length:var(--text-display-m)] font-semibold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="medida-lectura mt-2 leading-relaxed text-[var(--dim)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
