"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Layers, Network, Monitor, Globe, Database, Clock, Shield } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function KokoPage() {
  const { t } = useTranslation();
  const data = t.koko_details;

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
        <div className="h-20 w-20 rounded-2xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 shrink-0">
          <Heart className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">
            {data.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base">{data.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="inline-block px-3 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 rounded-full text-sm font-semibold w-fit">
              {data.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="https://koko.ourocore.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-sm font-semibold transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              {data.website_btn}
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

        {/* ── Left / Main Column ── */}
        <div className="md:col-span-2 space-y-12">

          {/* Origin */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Heart className="text-rose-600 dark:text-rose-400" />
              {data.origin_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {data.origin_body}
            </p>
          </section>

          {/* What is Koko */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Layers className="text-rose-600 dark:text-rose-400" />
              {data.what_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {data.what_body}
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Layers className="text-rose-600 dark:text-rose-400" />
              {data.features_title}
            </h2>
            <div className="grid gap-4">
              {data.features.map((feature: { name: string; desc: string }, i: number) => (
                <div key={i} className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none flex gap-4 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm block mb-0.5">{feature.name}</span>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Design Decision — accent card */}
          <section className="p-6 bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              {data.design_title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{data.design_body}</p>
          </section>

          {/* Overlay Window */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Monitor className="text-rose-600 dark:text-rose-400" />
              {data.overlay_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {data.overlay_body}
            </p>
          </section>

          {/* Connection */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
              <Network className="text-rose-600 dark:text-rose-400" />
              {data.connection_title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {data.connection_body}
            </p>

            {/* Connection Diagram */}
            <div className="p-5 bg-zinc-900 dark:bg-zinc-950 rounded-xl border border-zinc-700 dark:border-zinc-800 font-mono text-sm text-zinc-300">
              <pre className="whitespace-pre-wrap leading-relaxed">{`[Usuario A]                    [Usuario B]
  App ──── Socket.io ────────── App
           (señalización)
           mina.stellarbanana.com

    ◄──────── WebRTC P2P ────────►
         (video + eventos)`}</pre>
            </div>
          </section>

          {/* Platforms */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Monitor className="text-rose-600 dark:text-rose-400" />
              {data.platforms_title}
            </h2>
            <div className="grid gap-4">
              {data.platforms.map((platform: { name: string; desc: string }, i: number) => (
                <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm dark:shadow-none">
                  <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">{platform.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{platform.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pride Items */}
          <section className="p-6 bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-xl relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
              <Shield className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              {data.pride_title}
            </h2>
            <div className="grid gap-4">
              {data.pride_items.map((item: { name: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="shrink-0 w-2 h-2 rounded-full bg-rose-500 mt-2" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm block">{item.name}</span>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
              <Clock className="text-rose-600 dark:text-rose-400" />
              {data.roadmap_title}
            </h2>
            <div className="grid gap-3">
              {data.roadmap_items.map((item: { phase: string; desc: string }, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`shrink-0 mt-0.5 text-xs font-bold uppercase tracking-widest w-24 ${i === 0 ? "text-rose-600 dark:text-rose-400" : "text-zinc-400 dark:text-zinc-500"}`}>
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

            {/* Stack */}
            <div>
              <h3 className="font-bold text-xl mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 text-zinc-900 dark:text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-rose-600 dark:text-rose-400" />
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
                          <div className="w-2 h-2 rounded-full bg-rose-500 mr-2.5 shrink-0" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://koko.ourocore.net"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Globe className="h-4 w-4" />
                {data.website_btn}
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
