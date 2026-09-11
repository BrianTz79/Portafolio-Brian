"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import estadoInfraJson from "@/data/servicios.json";
import PanelInfra from "./components/PanelInfra";
import type { EstadoInfra } from "@/lib/infraestructura";

const estadoInfra = estadoInfraJson as EstadoInfra;

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--ink)] transition-colors">
      {/* Hero Section */}
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

      {/* Sobre Mí Section (Resumen) */}
      <section className="py-20 bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text)]">{t.about.title}</h2>
          <div className="space-y-6 text-lg text-[var(--dim)] leading-relaxed max-w-3xl mx-auto">
            {/* Solo mostramos el primer parrafo y sugerimos continuar a la ruta /sobre-mi */}
            <p>{t.about.description[0]}</p>
          </div>
          <div className="mt-10">
             <Link href="/sobre-mi" className="inline-flex items-center text-sm font-semibold text-[var(--signal)] hover:opacity-80 transition-opacity group">
               {t.ui?.read_more} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* Habilidades Section */}
      <section className="py-20 bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text)]">{t.skills.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.skills.categories.map((cat: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl bg-[var(--ink)] border border-[var(--line)] shadow-sm">
                <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-[var(--line)] pb-3 text-[var(--text)]">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.badges.map((badge: string, bidx: number) => (
                    <span key={bidx} className="px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--surface)] text-[var(--dim)] border border-[var(--line)]">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia y Educación Section */}
      <section className="py-20 bg-[var(--ink)]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text)]">{t.experience.title}</h2>
           <div className="space-y-6 flex flex-col items-center">
            {t.experience.items.map((item: any, idx: number) => (
              <div key={idx} className="w-full relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm">
                <div className="md:w-1/3 flex flex-col justify-start">
                  <span className="text-sm font-mono text-[var(--signal)] mb-2">{item.date}</span>
                  <div className="flex items-center gap-2 font-medium text-[var(--dim)]">
                    {idx >= 3 ? <GraduationCap className="h-4 w-4 text-[var(--dim)]" /> : <Briefcase className="h-4 w-4 text-[var(--dim)]" />}
                    {item.company}
                  </div>
                </div>
                <div className="md:w-2/3 md:border-l border-[var(--line)] md:pl-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-bold mb-3 text-[var(--text)]">{item.title}</h3>
                  <p className="text-[var(--dim)] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
