"use client";

import { useTranslation } from "@/lib/i18n";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactoPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 transition-colors">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-zinc-900 dark:text-white">
            Networking & Contacto
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            ¿Tienes una propuesta laboral o un proyecto en mente? Hablemos sobre tecnología y desarrollo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* GitHub */}
          <Link href="https://github.com/BrianTz79" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-md flex flex-col items-start h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-zinc-100 dark:bg-white text-zinc-900">
                {/* SVG Github Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">GitHub</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 flex-1 text-lg">
              Explora mis repositorios públicos, scripts y el código fuente de mis proyectos de infraestructura.
            </p>
            <div className="mt-auto flex items-center text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white transition-colors font-semibold">
              Explorar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* LinkedIn */}
          <Link href="https://www.linkedin.com/in/brian-tellez-8b67b0359/" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:shadow-blue-900/20 flex flex-col items-start h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">LinkedIn</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 flex-1 text-lg">
              Conectemos profesionalmente. Aquí comparto mi trayectoria y metas en la industria.
            </p>
            <div className="mt-auto flex items-center text-zinc-500 group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-blue-400 transition-colors font-semibold">
              Conectar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Mail */}
          <Link href="mailto:brian.tellez79@gmail.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-900/20 flex flex-col items-start h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-600 text-emerald-700 dark:text-white">
                 <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Correo Personal</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 flex-1 text-lg">
              Envíame un mensaje directo para propuestas laborales, entrevistas o planeación de proyectos.
            </p>
             <div className="mt-auto flex items-center text-zinc-500 group-hover:text-emerald-600 dark:text-zinc-400 dark:group-hover:text-emerald-400 transition-colors font-semibold">
              Escribir Email <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Instagram */}
          <Link href="https://www.instagram.com/brian.tz97/" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-md hover:shadow-pink-900/20 flex flex-col items-start h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-pink-100 dark:bg-pink-600 text-pink-700 dark:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Instagram</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 flex-1 text-lg">
              Un vistazo más personal a mi día a día, mi setup y mi entorno creativo.
            </p>
             <div className="mt-auto flex items-center text-zinc-500 group-hover:text-pink-600 dark:text-zinc-400 dark:group-hover:text-pink-400 transition-colors font-semibold">
              Ver Perfil <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
