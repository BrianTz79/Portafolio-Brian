import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/iris`;

export const metadata: Metadata = {
  title: "Plataforma IRIS",
  description: "Plataforma IRIS por Brian Tellez: sistema de gestión universitaria en tiempo real con React, FastAPI, WebSockets, MongoDB y Docker.",
  keywords: [
    "Brian Tellez IRIS", "plataforma universitaria React FastAPI",
    "WebSockets tiempo real", "MongoDB Docker Nginx", "proyecto Full Stack Tijuana"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Plataforma IRIS | Brian Tellez - Full Stack en Tiempo Real",
    description: "Sistema de gestión universitaria en tiempo real con React, Vite, FastAPI, WebSockets, MongoDB y Docker. Desarrollado por Brian Tellez.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Plataforma IRIS de Brian Tellez - Full Stack y WebSockets" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plataforma IRIS | Brian Tellez",
    description: "Sistema de gestión universitaria en tiempo real con React, FastAPI y WebSockets.",
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
              { "@type": "ListItem", "position": 3, "name": "Plataforma IRIS", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
