"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, Server, Code, Database, Gamepad2, GraduationCap, Briefcase, Mail } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
            {t.hero.title}
          </h1>
          <h2 className="text-xl md:text-3xl text-zinc-400 font-medium mb-12 max-w-3xl">
            {t.hero.subtitle}
          </h2>
          <div className="flex gap-4">
             <Link href="#proyectos" className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-transform">
                {t.hero.view_projects}
             </Link>
             <Link href="mailto:brian.tellez79@gmail.com" className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/50 px-8 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95 gap-2">
                <Mail className="h-4 w-4" />
                {t.hero.contact}
             </Link>
          </div>
        </div>
      </section>

      {/* Sobre Mí Section */}
      <section id="sobre-mi" className="py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">{t.about.title}</h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            {t.about.description}
          </p>
        </div>
      </section>

      {/* Experiencia y Educación Secton */}
      <section id="experiencia" className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.experience.title}</h2>
          <div className="space-y-6">
            {t.experience.items.map((item, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all shadow-md hover:shadow-lg">
                <div className="md:w-1/3 flex flex-col justify-start">
                  <span className="text-sm font-mono text-blue-400 mb-2">{item.date}</span>
                  <div className="flex items-center gap-2 font-medium text-zinc-300">
                    {idx > 2 ? <GraduationCap className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
                    {item.company}
                  </div>
                </div>
                <div className="md:w-2/3 border-l-2 border-zinc-800 pl-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades Section */}
      <section id="habilidades" className="py-20 bg-zinc-900/30 border-y border-zinc-800/50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.skills.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.skills.categories.map((cat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-sm">
                <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-zinc-800 pb-3">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.badges.map((badge, bidx) => (
                    <span key={bidx} className="px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 shadow-sm">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos Estrella */}
      <section id="proyectos" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{t.projects.title}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* ADA */}
            <Link href="/proyectos/ada" className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-900 hover:border-blue-500/50 hover:shadow-blue-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{t.projects.ada.name}</h3>
              <p className="mb-6 text-zinc-400 flex-1 text-lg">{t.projects.ada.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800">
                <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{t.projects.ada.status}</span>
                <div className="flex items-center text-zinc-300 group-hover:text-blue-400 transition-colors font-medium">
                  {t.projects.ada.view_more} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* IRIS */}
            <Link href="/proyectos/iris" className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-900 hover:border-purple-500/50 hover:shadow-purple-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Database className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{t.projects.iris.name}</h3>
              <p className="mb-6 text-zinc-400 flex-1 text-lg">{t.projects.iris.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800">
                <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{t.projects.iris.status}</span>
                <div className="flex items-center text-zinc-300 group-hover:text-purple-400 transition-colors font-medium">
                  {t.projects.iris.view_more} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Kanua Petto */}
            <Link href="/proyectos/kanua-petto" className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-900 hover:border-emerald-500/50 hover:shadow-emerald-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Gamepad2 className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{t.projects.kanua.name}</h3>
              <p className="mb-6 text-zinc-400 flex-1 text-lg">{t.projects.kanua.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800">
                 <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">{t.projects.kanua.status}</span>
                 <div className="flex items-center text-zinc-300 group-hover:text-emerald-400 transition-colors font-medium">
                  {t.projects.kanua.view_more} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Homelab */}
            <Link href="/proyectos/homelab" className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-900 hover:border-orange-500/50 hover:shadow-orange-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">{t.projects.homelab.name}</h3>
              <p className="mb-6 text-zinc-400 flex-1 text-lg">{t.projects.homelab.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800">
                 <span className="text-sm font-medium text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">{t.projects.homelab.status}</span>
                 <div className="flex items-center text-zinc-300 group-hover:text-orange-400 transition-colors font-medium">
                  {t.projects.homelab.view_more} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
