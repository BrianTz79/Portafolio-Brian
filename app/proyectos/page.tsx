"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, ImageIcon, Sparkles, FolderOpen } from "lucide-react";

export default function ProyectosPage() {
  const { t } = useTranslation();

  const renderProjectRow = (id: string, project: any, featured: boolean = false) => {
    return (
      <div key={id} className="relative group transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
          
          {/* Visual Placeholder */}
          <div className="w-full md:w-1/3 aspect-video md:aspect-square lg:aspect-[4/3] rounded-xl bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:dark:bg-zinc-900 transition-colors">
            {featured ? (
              <Sparkles className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
            ) : (
              <FolderOpen className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
            )}
            <span className="text-sm text-zinc-400 dark:text-zinc-600 mt-4 font-medium tracking-widest uppercase">
              {project.name}
            </span>
          </div>

          {/* Info */}
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                {project.name}
              </h2>
            </div>
            
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                 {project.status}
              </span>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
              {project.description}
            </p>

            <div className="mt-auto">
              <Link 
                href={`/proyectos/${id}`} 
                className={`inline-flex items-center justify-center h-12 px-8 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 ${
                  featured 
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200" 
                  : "border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                 {project.view_more || t.ui?.view_details} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const featuredProjects = ["homelab", "ada", "iris"];
  const generalProjects = ["sgv", "clips", "ourocore", "bots", "kanua", "portfolio"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 transition-colors">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-zinc-900 dark:text-white">
            {t.proyectos_page?.title}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.proyectos_page?.subtitle}
          </p>
        </div>

        <div className="space-y-12">
          {/* Render Featured Projects First */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span className="font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase text-sm">{t.proyectos_page?.featured}</span>
            <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          
          <div className="space-y-8">
            {featuredProjects.map((id) => (
              t.projects?.[id as keyof typeof t.projects] ? renderProjectRow(id, t.projects[id as keyof typeof t.projects], true) : null
            ))}
          </div>

          <div className="flex items-center gap-4 py-8">
            <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span className="font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase text-sm">{t.proyectos_page?.others}</span>
            <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Render General Projects */}
          <div className="space-y-8">
            {generalProjects.map((id) => {
              // fallback key management since kanua is generic mapped but some might be bots etc.
              let projData = null;
              if (id === 'kanua' && t.general_projects?.kanua) projData = t.general_projects.kanua;
              else if (id === 'sgv' && t.general_projects?.sgv) projData = t.general_projects.sgv;
              else if (id === 'clips' && t.general_projects?.clips) projData = t.general_projects.clips;
              else if (id === 'ourocore' && t.general_projects?.ourocore) projData = t.general_projects.ourocore;
              else if (id === 'bots' && t.general_projects?.bots) projData = t.general_projects.bots;
              else if (id === 'portfolio' && t.general_projects?.portfolio) projData = t.general_projects.portfolio;
              
              const correctedId = id === 'kanua' ? 'kanua-petto' : id; // Map generic key to actual route

              return projData ? renderProjectRow(correctedId, projData, false) : null;
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
