"use client";

import Link from "next/link";
import { ArrowLeft, Server, Cpu, HardDrive } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function HomelabPage() {
  const { t } = useTranslation();
  const data = t.homelab_details;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-start min-h-screen max-w-5xl bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <Link href="/#proyectos" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-12 transition-colors font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {data.back}
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-12 w-full">
         <div className="h-20 w-20 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 border border-orange-200 dark:border-orange-500/20 shrink-0">
            <Server className="h-10 w-10" />
         </div>
         <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-zinc-900 dark:text-white">
               {data.title}
            </h1>
            <span className="inline-block px-3 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 rounded-full text-sm font-semibold w-fit">
               {data.status}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
         <div className="md:col-span-2 space-y-12">
            <section>
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                  <Server className="text-orange-600 dark:text-orange-400" />
                  {data.description_title}
               </h2>
               <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {data.description}
               </p>
            </section>

            <section>
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                  <Cpu className="text-orange-600 dark:text-orange-400" />
                  {data.hardware_title}
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.specs.map((item: string, idx: number) => {
                     const [title, desc] = item.split(": ");
                     return (
                        <div key={idx} className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm dark:shadow-none">
                           <span className="block text-sm text-orange-600 dark:text-orange-400 font-semibold mb-1">{title}</span>
                           <span className="font-medium text-zinc-800 dark:text-zinc-200">{desc}</span>
                        </div>
                     );
                  })}
               </div>
            </section>
            
            <section className="p-6 bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
               <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
               <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{data.plan_title}</h2>
               <p className="text-zinc-600 dark:text-zinc-400">{data.plan_desc}</p>
            </section>
         </div>

         <div className="md:col-span-1 space-y-8">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl sticky top-24 shadow-sm dark:shadow-none">
               <h3 className="font-bold text-xl mb-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white">
                  <HardDrive className="text-orange-600 dark:text-orange-400" />
                  {data.orchestration_title}
               </h3>
               <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {data.orchestration_desc}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
