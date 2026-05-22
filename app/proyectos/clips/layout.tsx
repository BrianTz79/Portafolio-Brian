import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/clips`;

export const metadata: Metadata = {
  title: "ClipsBanana",
  description: "ClipsBanana por Brian Tellez: plataforma de clips y vídeos con React, Node.js, Prisma, PostgreSQL y FFmpeg. Full Stack developer en Tijuana.",
  keywords: [
    "Brian Tellez ClipsBanana", "plataforma clips React Node.js",
    "Prisma PostgreSQL FFmpeg", "Full Stack Tijuana", "streaming clips"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "ClipsBanana | Brian Tellez - Full Stack",
    description: "Plataforma de clips y vídeos desarrollada por Brian Tellez con React, Node.js, Prisma, PostgreSQL y FFmpeg.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "ClipsBanana de Brian Tellez - Plataforma Full Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipsBanana | Brian Tellez",
    description: "Plataforma de clips con React, Node.js, Prisma, PostgreSQL y FFmpeg.",
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
              { "@type": "ListItem", "position": 3, "name": "ClipsBanana", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
