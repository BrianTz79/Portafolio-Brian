"use client";

import { useTranslation } from "@/lib/i18n";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer aria-label="Pie de página - Contacto y redes sociales de Brian Tellez" className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-6">
        <nav aria-label="Redes sociales de Brian Tellez">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            <li>
              <Link
                href="https://github.com/BrianTz79"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                aria-label="GitHub de Brian Tellez - Repositorios y código fuente"
                title="GitHub de Brian Tellez"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/brian-tellez-8b67b0359/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-500 transition-colors"
                aria-label="LinkedIn de Brian Tellez - Perfil profesional e Ingeniero en Sistemas Computacionales"
                title="LinkedIn de Brian Tellez"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/brian.tz97/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-pink-600 dark:text-zinc-400 dark:hover:text-pink-500 transition-colors"
                aria-label="Instagram de Brian Tellez - Setup y vida personal"
                title="Instagram de Brian Tellez"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </Link>
            </li>
            <li>
              <Link
                href="mailto:brian.tellez79@gmail.com"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                aria-label="Enviar correo a Brian Tellez - brian.tellez79@gmail.com"
                title="Correo de Brian Tellez"
              >
                <Mail className="h-6 w-6" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center font-medium">
          {t.footer.text}
        </p>
      </div>
    </footer>
  );
}
