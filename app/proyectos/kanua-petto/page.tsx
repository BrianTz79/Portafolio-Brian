"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Gamepad2,
  Layers,
  CloudCog,
  Cloud,
  Cpu,
  Database,
  Container,
  Smile,
  ShoppingBag,
  Trophy,
  ExternalLink,
  Clock,
  Code2,
  Heart,
  RefreshCw,
  Wallet,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const featureIcons = [Cloud, Smile, ShoppingBag, Trophy];
const functionalIcons = [Heart, RefreshCw, Cloud, Wallet, Sparkles];

export default function KanuaPettoPage() {
  const { t } = useTranslation();
  const data = t.kanua_details;

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
        <div className="h-20 w-20 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20 shrink-0">
          <Gamepad2 className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
            {data.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base">{data.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full text-sm font-semibold w-fit">
              {data.status}
            </span>
            <a
              href="https://kp.stellarbanana.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-semibold transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {data.official_site_btn}
            </a>
            <a
              href="https://github.com/BrianTz79/KanuaPetto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-full text-sm font-semibold transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              {data.github_btn}
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: 2-col content + 1-col sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

        {/* ── Left / Main Column ── */}
        <div className="md:col-span-2 space-y-12">

          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Layers className="text-emerald-600 dark:text-emerald-400" />
              {data.description_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {data.description}
            </p>
          </section>

          {/* Game Screenshot */}
          <section>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none relative">
              <Image
                src="/kanua-petto-gameplay.jpg"
                alt={data.screenshot_alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 text-center">{data.screenshot_alt}</p>
          </section>

          {/* Justification — accent card */}
          <section className="p-6 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{data.justification_title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{data.justification}</p>
          </section>

          {/* Platforms */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Gamepad2 className="text-emerald-600 dark:text-emerald-400" />
              {data.platforms_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.platforms.map((p: { name: string; req: string }, i: number) => (
                <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{p.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">{p.req}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Implemented Features */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Cpu className="text-emerald-600 dark:text-emerald-400" />
              {data.functional_title}
            </h2>
            <div className="grid gap-4">
              {data.functional_items.map((item: { name: string; desc: string }, i: number) => {
                const Icon = functionalIcons[i] ?? Layers;
                return (
                  <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none flex gap-4 items-start">
                    <div className="shrink-0 h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{item.name}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Game Mechanics / Features */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Layers className="text-emerald-600 dark:text-emerald-400" />
              {data.features_title}
            </h2>
            <div className="grid gap-6">
              {data.features.map((feature: { name: string; desc: string }, i: number) => {
                const Icon = featureIcons[i] ?? Layers;
                return (
                  <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl border-l-[3px] border-l-emerald-400 dark:border-l-emerald-500/50 shadow-sm dark:shadow-none">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{feature.name}</h3>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 text-zinc-900 dark:text-white">
              <CloudCog className="text-emerald-600 dark:text-emerald-400" />
              {data.architecture_title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">{data.architecture_intro}</p>
            <div className="grid gap-6">
              {data.architecture_items.map((item: { name: string; desc: string }, i: number) => {
                const icons = [Cpu, Container, Database, Container];
                const Icon = icons[i] ?? Cpu;
                return (
                  <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{item.name}</h3>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Canva Presentation */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Sparkles className="text-emerald-600 dark:text-emerald-400" />
              {data.presentation_title}
            </h2>
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none" style={{ position: "relative", width: "100%", height: 0, paddingTop: "56.25%" }}>
              <iframe
                loading="lazy"
                src="https://www.canva.com/design/DAG3o3po3uQ/bd3WPszmiUQ8B7SB7EKPSg/view?embed"
                allowFullScreen
                allow="fullscreen"
                style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, border: "none", padding: 0, margin: 0 }}
                title={data.presentation_label}
              />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2 text-center">{data.presentation_label}</p>
          </section>

          {/* Roadmap — accent card */}
          <section className="p-6 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
              <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {data.roadmap_title}
            </h2>
            <div className="grid gap-3">
              {data.roadmap_items.map((item: { phase: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`shrink-0 mt-0.5 text-xs font-bold uppercase tracking-widest w-28 ${i === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`}>
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
          <div className="p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl sticky top-24 shadow-sm dark:shadow-none space-y-8">

            {/* Stack by category */}
            <div>
              <h3 className="font-bold text-xl mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
                          className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm font-medium shadow-sm flex items-center text-zinc-800 dark:text-zinc-300"
                        >
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mr-3 shrink-0" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
              <a
                href="https://kp.stellarbanana.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                {data.official_site_btn}
              </a>
              <a
                href="https://github.com/BrianTz79/KanuaPetto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Code2 className="h-4 w-4" />
                {data.github_btn}
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
