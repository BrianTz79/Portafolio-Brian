"use client";

import { useTranslation } from "@/lib/i18n";
import { ArrowLeft, FolderCode, Layers, Database, Rocket } from "lucide-react";
import Link from "next/link";

export default function PortafolioPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 transition-colors">
      <div className="bg-zinc-200/50 dark:bg-zinc-900/50 pt-20 pb-16 border-b border-zinc-300 dark:border-zinc-800">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <Link href="/proyectos" className="inline-flex items-center text-zinc-700 dark:text-zinc-400 font-medium mb-8 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.portafolio_details?.back || "Volver"}
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-xl">
              <FolderCode className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
              {t.portafolio_details?.title}
            </h1>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-400 dark:border-zinc-700 shadow-sm">
            {t.portafolio_details?.status}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-zinc-900 dark:text-white">
              <Rocket className="w-6 h-6 mr-3 text-zinc-500" />
              {t.portafolio_details?.description_title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t.portafolio_details?.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center text-zinc-900 dark:text-white">
              <Layers className="w-6 h-6 mr-3 text-zinc-500" />
              {t.portafolio_details?.architecture_title}
            </h2>
            <div className="grid gap-6">
              {t.portafolio_details?.architecture_items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
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
              <Database className="w-5 h-5 mr-3 text-zinc-500" />
              {t.portafolio_details?.stack_title}
            </h2>
            <ul className="space-y-3 font-mono font-medium text-sm text-zinc-800 dark:text-zinc-200">
              {t.portafolio_details?.stack?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full mr-3"></span>
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
