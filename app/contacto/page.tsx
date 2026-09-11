"use client";

import { useTranslation } from "@/lib/i18n";
import { Mail, ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const IconoGitHub = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const IconoLinkedIn = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const IconoInstagram = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

/** Una sola forma para los cuatro canales: filete arriba, sin tarjetas ni
    sombras de color. El acento aparece solo al apuntar, igual que en la lista
    de proyectos. */
function Canal({
  href,
  icono,
  nombre,
  descripcion,
  accion,
  indice,
  children,
}: {
  href: string;
  icono: ReactNode;
  nombre: string;
  descripcion?: string;
  accion?: string;
  indice: number;
  children?: ReactNode;
}) {
  const externo = href.startsWith("http");
  return (
    <div className={`emerge emerge-${Math.min(indice + 1, 6)} border-t border-[var(--line)] pt-6`}>
      <Link
        href={href}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group block"
      >
        <div className="flex items-center gap-3 text-[var(--text)]">
          <span className="text-[var(--dim)] transition-colors group-hover:text-[var(--signal)]">
            {icono}
          </span>
          <h2 className="text-[length:var(--text-display-m)] font-semibold">{nombre}</h2>
        </div>
        {descripcion && (
          <p className="mt-3 max-w-[46ch] leading-relaxed text-[var(--dim)]">{descripcion}</p>
        )}
        {accion && (
          <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--signal-sur)]">
            {accion}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </Link>
      {children}
    </div>
  );
}

export default function ContactoPage() {
  const { t } = useTranslation();
  const [copiado, setCopiado] = useState(false);

  const copiarCorreo = () => {
    navigator.clipboard.writeText("brian.tellez79@gmail.com");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 md:py-16">
      <h1 className="titular-metal text-[length:var(--text-display-l)] font-bold">
        {t.contacto?.title}
      </h1>
      <p className="medida-lectura mt-4 text-lg text-[var(--dim)]">{t.contacto?.subtitle}</p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <Canal
          href="mailto:brian.tellez79@gmail.com"
          icono={<Mail className="h-5 w-5" />}
          nombre="Email"
          descripcion={t.contacto?.mail_desc}
          accion={t.contacto?.mail_btn}
          indice={0}
        >
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-2">
            <span className="truncate font-mono text-sm text-[var(--text)]">
              brian.tellez79@gmail.com
            </span>
            <button
              onClick={copiarCorreo}
              className="shrink-0 rounded p-1.5 text-[var(--dim)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--text)]"
              title={t.contacto?.mail_copy}
              aria-label={t.contacto?.mail_copy}
            >
              {copiado ? (
                <Check className="h-4 w-4 text-[var(--live)]" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          {copiado && (
            <p role="status" className="mt-2 font-mono text-xs text-[var(--live)]">
              {t.contacto?.mail_copied}
            </p>
          )}
        </Canal>

        <Canal
          href="https://www.linkedin.com/in/brian-tellez-8b67b0359/"
          icono={IconoLinkedIn}
          nombre="LinkedIn"
          descripcion={t.contacto?.linkedin_desc}
          accion={t.contacto?.linkedin_btn}
          indice={1}
        />

        <Canal
          href="https://github.com/BrianTz79"
          icono={IconoGitHub}
          nombre="GitHub"
          descripcion={t.contacto?.github_desc}
          accion={t.contacto?.github_btn}
          indice={2}
        />

        <Canal
          href="https://www.instagram.com/brian.tz97/"
          icono={IconoInstagram}
          nombre="Instagram"
          descripcion={t.contacto?.instagram_desc}
          accion={t.contacto?.instagram_btn}
          indice={3}
        />
      </div>
    </div>
  );
}
