"use client";

import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/i18n";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-lg text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.nav.brand}
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/#sobre-mi" className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                {t.nav.about}
              </Link>
              <Link href="/#experiencia" className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                {t.nav.experience}
              </Link>
              <Link href="/#habilidades" className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                {t.nav.skills}
              </Link>
              <Link href="/#proyectos" className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white">
                {t.nav.projects}
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="relative group">
              <button
                className="flex items-center justify-center p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Change language"
              >
                <span className="text-xl mr-1">{locale === "es" ? "🇲🇽" : "🇺🇸"}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setLocale("es")}
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors text-left"
                >
                  <span className="mr-2">🇲🇽</span> Español
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors text-left"
                >
                  <span className="mr-2">🇺🇸</span> English
                </button>
              </div>
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
