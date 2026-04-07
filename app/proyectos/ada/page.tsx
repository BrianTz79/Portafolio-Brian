"use client";

import Link from "next/link";
import { ArrowLeft, Code, Layers, Server } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function AdaPage() {
  const { t } = useTranslation();
  const data = t.ada_details;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-start min-h-screen max-w-5xl">
      <Link href="/#proyectos" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-12 transition-colors font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {data.back}
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-border/50 pb-12 w-full">
         <div className="h-20 w-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shrink-0">
            <Code className="h-10 w-10" />
         </div>
         <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
               {data.title}
            </h1>
            <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-semibold w-fit">
               {data.status}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
         <div className="md:col-span-2 space-y-12">
            <section>
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <Layers className="text-blue-400" />
                  {data.description_title}
               </h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.description}
               </p>
            </section>

            <section>
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                  <Server className="text-blue-400" />
                  {data.architecture_title}
               </h2>
               <div className="grid gap-6">
                  {data.architecture_items.map((item, idx) => (
                     <div key={idx} className="p-6 bg-card border border-border/50 rounded-xl">
                        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="md:col-span-1 space-y-8">
            <div className="p-6 bg-muted/30 border border-border/50 rounded-xl sticky top-24">
               <h3 className="font-bold text-xl mb-6 border-b border-border/50 pb-4">{data.stack_title}</h3>
               <div className="flex flex-col gap-3">
                  {data.stack.map((tech, idx) => (
                     <span key={idx} className="px-4 py-2 bg-background border border-border/50 rounded-lg text-sm font-medium shadow-sm flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
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
