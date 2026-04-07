"use client";

import { useTranslation } from "@/lib/i18n";
import { ArrowLeft, TerminalSquare, Layers, Database, Rocket } from "lucide-react";
import Link from "next/link";

export default function BotsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 transition-colors">
      <div className="bg-indigo-900/10 dark:bg-indigo-900/20 pt-20 pb-16 border-b border-indigo-200 dark:border-indigo-900/50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <Link href="/proyectos" className="inline-flex items-center text-indigo-700 dark:text-indigo-400 font-medium mb-8 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.bots_details?.back || "Volver"}
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <TerminalSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
              {t.bots_details?.title}
            </h1>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 shadow-sm">
            {t.bots_details?.status}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-zinc-900 dark:text-white">
              <Rocket className="w-6 h-6 mr-3 text-indigo-500" />
              {t.bots_details?.description_title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t.bots_details?.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center text-zinc-900 dark:text-white">
              <Layers className="w-6 h-6 mr-3 text-indigo-500" />
              {t.bots_details?.architecture_title}
            </h2>
            <div className="grid gap-6">
              {t.bots_details?.architecture_items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{item.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-zinc-100 dark:bg-zinc-900/60 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
            <h2 className="text-xl font-bold mb-6 flex items-center text-zinc-900 dark:text-white">
              <Database className="w-5 h-5 mr-3 text-indigo-500" />
              {t.bots_details?.stack_title}
            </h2>
            <ul className="space-y-3 font-mono font-medium text-sm text-zinc-800 dark:text-zinc-200">
              {t.bots_details?.stack?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
