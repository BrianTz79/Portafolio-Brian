"use client";

import { useTranslation } from "@/lib/i18n";
import { User, Code2, Terminal, Server } from "lucide-react";

export default function SobreMiPage() {
  const { t } = useTranslation();

  // Safeguard against missing translation keys during fast reloads
  const title = t.about_details?.title || "Conóceme a Fondo";
  const story = t.about_details?.story || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 transition-colors">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
          {title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
          
          {/* Avatar Placeholder */}
          <div className="w-full max-w-sm lg:w-1/3 flex flex-col items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center relative overflow-hidden group">
              {/* This is the placeholder, the user can replace it with an img tag later */}
              <User className="w-32 h-32 text-zinc-300 dark:text-zinc-700 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            {/* Quick Badges below photo */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 w-full">
               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                 <Terminal className="w-3 h-3 mr-2" /> Linux
               </span>
               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                 <Server className="w-3 h-3 mr-2" /> Homelab
               </span>
               <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700">
                 <Code2 className="w-3 h-3 mr-2" /> Full Stack
               </span>
            </div>
          </div>

          {/* Story Content */}
          <div className="w-full lg:w-2/3 space-y-6">
            {story.map((paragraph: string, index: number) => (
              <div 
                key={index} 
                className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 p-6 md:p-8 rounded-2xl shadow-sm text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg"
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
