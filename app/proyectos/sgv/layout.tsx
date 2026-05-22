import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/sgv`;

export const metadata: Metadata = {
  title: "Sistema Gestor de Viviendas",
  description: "SGV por Brian Tellez: sistema de gestión de viviendas con React, FastAPI, PostgreSQL, JWT y Docker. Proyecto Full Stack del ITT Tijuana.",
  keywords: [
    "Brian Tellez SGV", "sistema gestor viviendas", "React FastAPI PostgreSQL",
    "JWT Docker Full Stack", "proyecto ITT Tijuana"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Sistema Gestor de Viviendas | Brian Tellez - Full Stack",
    description: "Sistema de gestión de viviendas desarrollado por Brian Tellez con React, FastAPI, PostgreSQL, JWT y Docker.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Sistema Gestor de Viviendas de Brian Tellez - Full Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SGV | Brian Tellez",
    description: "Sistema de gestión de viviendas con React, FastAPI, PostgreSQL y Docker.",
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
              { "@type": "ListItem", "position": 3, "name": "Sistema Gestor de Viviendas", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
