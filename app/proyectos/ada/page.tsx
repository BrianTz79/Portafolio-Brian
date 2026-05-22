"use client";

import Link from "next/link";
import { ArrowLeft, Cpu, Server, Mic, MonitorPlay, Layers, Database, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function AdaPage() {
  const { t } = useTranslation();
  const data = t.ada_details;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-start min-h-screen max-w-5xl bg-zinc-50 dark:bg-zinc-950 transition-colors">

      {/* Back Button */}
      <Link
        href="/#proyectos"
        className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-12 transition-colors font-medium"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {data.back}
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-12 w-full">
        <div className="h-20 w-20 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20 shrink-0">
          <Mic className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
            {data.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base">{data.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 rounded-full text-sm font-semibold w-fit">
              {data.status}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">{data.team}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2-col content + 1-col sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

        {/* ── Left / Main Column ── */}
        <div className="md:col-span-2 space-y-12">

          {/* Problem */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Layers className="text-blue-600 dark:text-blue-400" />
              {data.problem_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {data.problem_body}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Mic className="text-blue-600 dark:text-blue-400" />
              {data.solution_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {data.solution_body}
            </p>
          </section>

          {/* Kiosk Screenshot Placeholder */}
          <section>
            <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center gap-3 text-zinc-400 dark:text-zinc-600">
              <MonitorPlay className="h-12 w-12" />
              <span className="text-sm font-medium">Espacio para captura de pantalla del Kiosko</span>
            </div>
          </section>

          {/* Interpreter Paradigm — accent card */}
          <section className="p-6 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{data.interpreter_title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{data.interpreter_body}</p>
          </section>

          {/* Fog Computing Architecture */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 text-zinc-900 dark:text-white">
              <Server className="text-blue-600 dark:text-blue-400" />
              {data.architecture_title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-1">{data.architecture_subtitle}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">{data.architecture_intro}</p>

            <div className="grid gap-6">
              {/* Edge Node */}
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 shrink-0">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest block">Edge Node</span>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{data.edge_title}</h3>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{data.edge_desc}</p>
                <ul className="space-y-1.5">
                  {data.edge_specs.map((spec: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fog Node */}
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 shrink-0">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest block">Fog Node</span>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{data.fog_title}</h3>
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{data.fog_desc}</p>
                <ul className="space-y-1.5">
                  {data.fog_specs.map((spec: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Processing Pipeline */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Cpu className="text-blue-600 dark:text-blue-400" />
              {data.pipeline_title}
            </h2>
            <div className="grid gap-4">
              {data.pipeline_steps.map((item: { step: string; desc: string }, i: number) => (
                <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none flex gap-4 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm block mb-0.5">{item.step}</span>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Layers className="text-blue-600 dark:text-blue-400" />
              {data.features_title}
            </h2>
            <div className="grid gap-6">
              {data.features.map((feature: { name: string; desc: string }, i: number) => (
                <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                  <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">{feature.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap — accent card */}
          <section className="p-6 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              {data.roadmap_title}
            </h2>
            <div className="grid gap-3">
              {data.roadmap_items.map((item: { phase: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`shrink-0 mt-0.5 text-xs font-bold uppercase tracking-widest w-28 ${i === 0 ? "text-blue-600 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                    {item.phase}
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── Right / Sidebar ── */}
        <div className="md:col-span-1 space-y-8">

          {/* Stack Sidebar — sticky */}
          <div className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl sticky top-24 shadow-sm dark:shadow-none space-y-8">

            {/* Stack by category */}
            <div>
              <h3 className="font-bold text-xl mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {data.stack_title}
              </h3>
              <div className="space-y-6">
                {data.stack_categories.map((cat: { name: string; items: string[] }, ci: number) => (
                  <div key={ci}>
                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">{cat.name}</span>
                    <div className="flex flex-col gap-2">
                      {cat.items.map((item: string, ii: number) => (
                        <span
                          key={ii}
                          className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium shadow-sm flex items-center text-zinc-800 dark:text-zinc-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2.5 shrink-0" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing Results */}
            <div>
              <h3 className="font-bold text-xl mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white">
                {data.testing_title}
              </h3>
              <div className="flex flex-col gap-3">
                {data.testing_items.map((item: { label: string; value: string; note: string }, i: number) => (
                  <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{item.value}</div>
                    <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{item.label}</div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
