"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, Server, Code, Database, Gamepad2, Blocks, Video, Globe, TerminalSquare, FolderCode, GraduationCap, Briefcase, Mail } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:[mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
            {t.hero.title}
          </h1>
          <h2 className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 font-medium mb-12 max-w-3xl">
            {t.hero.subtitle}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
             <Link href="/proyectos" className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white px-8 text-sm font-semibold text-white dark:text-zinc-950 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-transform">
                {t.hero.view_projects}
             </Link>
             <Link href="mailto:brian.tellez79@gmail.com" className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-8 text-sm font-semibold text-zinc-900 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 gap-2">
                <Mail className="h-4 w-4" />
                {t.hero.contact}
             </Link>
          </div>
        </div>
      </section>

      {/* Sobre Mí Section (Resumen) */}
      <section className="py-20 bg-white dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">{t.about.title}</h2>
          <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl mx-auto">
            {/* Solo mostramos el primer parrafo y sugerimos continuar a la ruta /sobre-mi */}
            <p>{t.about.description[0]}</p>
          </div>
          <div className="mt-10">
             <Link href="/sobre-mi" className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group">
               Conóceme mejor <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* Proyectos Estrella */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-zinc-900 dark:text-white">{t.projects.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
            {/* ADA */}
            <Link href="/proyectos/ada" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 xl:p-8 shadow-sm dark:shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md dark:hover:shadow-blue-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">{t.projects.ada.name}</h3>
              <p className="mb-6 text-zinc-600 dark:text-zinc-400 flex-1 text-base md:text-lg">{t.projects.ada.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 flex-wrap gap-4">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full">{t.projects.ada.status}</span>
                <div className="flex items-center text-sm md:text-base text-zinc-500 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* IRIS */}
            <Link href="/proyectos/iris" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 xl:p-8 shadow-sm dark:shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-md dark:hover:shadow-purple-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                <Database className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">{t.projects.iris.name}</h3>
              <p className="mb-6 text-zinc-600 dark:text-zinc-400 flex-1 text-base md:text-lg">{t.projects.iris.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 flex-wrap gap-4">
                <span className="text-xs font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-3 py-1 rounded-full">{t.projects.iris.status}</span>
                <div className="flex items-center text-sm md:text-base text-zinc-500 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Homelab */}
            <Link href="/proyectos/homelab" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 xl:p-8 shadow-sm dark:shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-md dark:hover:shadow-orange-900/20 flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20">
                <Server className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white">{t.projects.homelab.name}</h3>
              <p className="mb-6 text-zinc-600 dark:text-zinc-400 flex-1 text-base md:text-lg">{t.projects.homelab.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800 flex-wrap gap-4">
                 <span className="text-xs font-medium text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full">{t.projects.homelab.status}</span>
                 <div className="flex items-center text-sm md:text-base text-zinc-500 dark:text-zinc-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-medium">
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12">
             <Link href="/proyectos" className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-8 text-sm font-semibold text-zinc-900 dark:text-white transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95">
                Explorar todo mi trabajo
             </Link>
          </div>
        </div>
      </section>

      {/* Habilidades Section */}
      <section className="py-20 bg-white dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-white">{t.skills.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.skills.categories.map((cat: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
                <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-zinc-200 dark:border-zinc-800 pb-3 text-zinc-900 dark:text-white">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.badges.map((badge: string, bidx: number) => (
                    <span key={bidx} className="px-3 py-1.5 rounded-full text-sm font-medium bg-zinc-200 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800">
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
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-white">{t.experience.title}</h2>
           <div className="space-y-6 flex flex-col items-center">
            {t.experience.items.map((item: any, idx: number) => (
              <div key={idx} className="w-full relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
                <div className="md:w-1/3 flex flex-col justify-start">
                  <span className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-2">{item.date}</span>
                  <div className="flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-300">
                    {idx >= 3 ? <GraduationCap className="h-4 w-4 text-zinc-400" /> : <Briefcase className="h-4 w-4 text-zinc-400" />}
                    {item.company}
                  </div>
                </div>
                <div className="md:w-2/3 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
