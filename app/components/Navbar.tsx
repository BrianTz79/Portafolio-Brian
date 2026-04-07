"use client";

import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/i18n";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/proyectos", label: t.nav.projects },
    { href: "/sobre-mi", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand + Desktop Links */}
          <div className="flex gap-6 md:gap-10">
            <Link href="/" onClick={closeMenu} className="flex items-center space-x-2">
              <span className="inline-block font-bold text-lg text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t.nav.brand}
              </span>
            </Link>
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`flex items-center text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-white ${
                    pathname === link.href ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Controls & Mobile Toggle */}
          <div className="flex items-center space-x-1 md:space-x-4">
            
            {/* Lang Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center justify-center p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Change language"
              >
                <span className="text-xl">{locale === "es" ? "🇲🇽" : "🇺🇸"}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => { setLocale("es"); closeMenu(); }}
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors text-left"
                >
                  <span className="mr-2">🇲🇽</span> Español
                </button>
                <button
                  onClick={() => { setLocale("en"); closeMenu(); }}
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors text-left"
                >
                  <span className="mr-2">🇺🇸</span> English
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); closeMenu(); }}
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

            {/* Hamburger Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
               {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800/40 bg-zinc-50 dark:bg-zinc-950 px-4 py-4 space-y-3">
           {navLinks.map((link) => (
             <Link 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === link.href 
                    ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white" 
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
               {link.label}
             </Link>
           ))}
        </div>
      )}
    </nav>
  );
}
