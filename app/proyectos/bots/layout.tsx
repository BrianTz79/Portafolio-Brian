import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/bots`;

export const metadata: Metadata = {
  title: "Ecosistema de Bots Discord",
  description: "Ecosistema de bots para Discord desarrollado por Brian Tellez: Python 3.11, FastAPI, discord.py y FFmpeg para automatización y entretenimiento.",
  keywords: [
    "Brian Tellez Discord bots", "bots Python Discord",
    "discord.py FastAPI", "automatización Discord", "Python 3.11 bots"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Ecosistema Discord Bots | Brian Tellez - Python & FastAPI",
    description: "Bots para Discord desarrollados por Brian Tellez con Python 3.11, FastAPI y discord.py para automatización y entretenimiento.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Discord Bots de Brian Tellez - Python FastAPI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discord Bots | Brian Tellez",
    description: "Bots para Discord con Python 3.11, FastAPI y discord.py.",
    images: [`${BASE}/og-image.png`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE },
              { "@type": "ListItem", "position": 2, "name": "Proyectos", "item": `${BASE}/proyectos` },
              { "@type": "ListItem", "position": 3, "name": "Ecosistema Discord Bots", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
