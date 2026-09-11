"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { Code2, Terminal, Server } from "lucide-react";

export default function SobreMiPage() {
  const { t } = useTranslation();

  const titulo = t.about_details?.title || "Conóceme a Fondo";
  const historia: string[] = t.about_details?.story || [];

  const marcas = [
    { icono: <Terminal className="h-3.5 w-3.5" aria-hidden="true" />, texto: "Linux" },
    { icono: <Server className="h-3.5 w-3.5" aria-hidden="true" />, texto: "Homelab" },
    { icono: <Code2 className="h-3.5 w-3.5" aria-hidden="true" />, texto: "Full Stack" },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-12 md:py-16">
      <h1 className="titular-metal emerge emerge-1 text-[length:var(--text-display-l)] font-bold">
        {titulo}
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-[16rem_1fr] md:gap-12">
        <div className="emerge emerge-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-[var(--line)]">
            <Image
              src="/BrianTellez.jpg"
              alt="Brian Tellez"
              fill
              sizes="(min-width: 768px) 16rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {marcas.map((m) => (
              <li key={m.texto} className="flex items-center gap-2 font-mono text-xs text-[var(--dim)]">
                {m.icono}
                {m.texto}
              </li>
            ))}
          </ul>
        </div>

        {/* Lectura corrida: la historia es prosa, no fichas apiladas. */}
        <div className="emerge emerge-3 space-y-5">
          {historia.map((parrafo, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "medida-lectura text-xl leading-relaxed text-[var(--text)]"
                  : "medida-lectura leading-relaxed text-[var(--dim)]"
              }
            >
              {parrafo}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
