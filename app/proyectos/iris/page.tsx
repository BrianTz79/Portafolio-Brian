"use client";

import Link from "next/link";
import { ArrowLeft, Database, Layers, Network } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function IrisPage() {
  const { t } = useTranslation();
  const data = t.iris_details;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-start min-h-screen max-w-5xl bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <Link href="/#proyectos" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-12 transition-colors font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {data.back}
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-12 w-full">
         <div className="h-20 w-20 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 border border-purple-200 dark:border-purple-500/20 shrink-0">
            <Database className="h-10 w-10" />
         </div>
         <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-zinc-900 dark:text-white">
               {data.title}
            </h1>
            <span className="inline-block px-3 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 rounded-full text-sm font-semibold w-fit">
               {data.status}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
         <div className="md:col-span-2 space-y-12">
            <section>
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                  <Layers className="text-purple-600 dark:text-purple-400" />
                  {data.description_title}
               </h2>
               <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {data.description}
               </p>
            </section>

            <section>
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                  <Network className="text-purple-600 dark:text-purple-400" />
                  {data.architecture_title}
               </h2>
               <div className="grid gap-6">
                  {data.architecture_items.map((item: any, idx: number) => (
                     <div key={idx} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                        <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">{item.name}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="md:col-span-1 space-y-8">
            <div className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl sticky top-24 shadow-sm dark:shadow-none">
               <h3 className="font-bold text-xl mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white">{data.stack_title}</h3>
               <div className="flex flex-col gap-3">
                  {data.stack.map((tech: string, idx: number) => (
                     <span key={idx} className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium shadow-sm flex items-center text-zinc-800 dark:text-zinc-300">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-3" />
                        {tech}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
