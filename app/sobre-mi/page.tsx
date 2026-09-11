"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { Code2, Terminal, Server } from "lucide-react";


export default function SobreMiPage() {
  const { t } = useTranslation();

  // Safeguard against missing translation keys during fast reloads
  const title = t.about_details?.title || "Conóceme a Fondo";
  const story = t.about_details?.story || [];

  return (
    <div className="min-h-screen bg-[var(--ink)] py-20 transition-colors">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-[var(--text)]">
          {title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">

          <div className="w-full max-w-sm lg:w-1/3 flex flex-col items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-[var(--line)] shadow-xl relative overflow-hidden">
              <Image
                src="/BrianTellez.jpg"
                alt="Brian Tellez"
                fill
                className="object-cover"
              />
            </div>

            {/* Quick Badges below photo */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 w-full">
               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--dim)] border border-[var(--line)]">
                 <Terminal className="w-3 h-3 mr-2" /> Linux
               </span>
               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--dim)] border border-[var(--line)]">
                 <Server className="w-3 h-3 mr-2" /> Homelab
               </span>
               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--dim)] border border-[var(--line)]">
                 <Code2 className="w-3 h-3 mr-2" /> Full Stack
               </span>
            </div>
          </div>

          {/* Story Content */}
          <div className="w-full lg:w-2/3 space-y-6">
            {story.map((paragraph: string, index: number) => (
              <div
                key={index}
                className="bg-[var(--surface)] border border-[var(--line)] p-6 md:p-8 rounded-2xl shadow-sm text-[var(--dim)] leading-relaxed text-lg"
              >
                <p>{paragraph}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
