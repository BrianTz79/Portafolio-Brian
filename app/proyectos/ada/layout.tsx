import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/ada`;

export const metadata: Metadata = {
  title: "Proyecto ADA",
  description: "Proyecto ADA por Brian Tellez: sistema de asistencia interactiva universitaria multimodal con Fog Computing. Raspberry Pi 5, Flutter, Python FastAPI e IA.",
  keywords: [
    "Brian Tellez ADA", "Fog Computing Tijuana", "asistencia interactiva universitaria",
    "Raspberry Pi 5 IA", "Flutter Python FastAPI", "proyecto ITT Tijuana"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Proyecto ADA | Brian Tellez - Fog Computing & IA",
    description: "Sistema de asistencia interactiva universitaria multimodal con arquitectura Fog Computing. Desarrollado por Brian Tellez con Raspberry Pi 5, Flutter y Python FastAPI.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Proyecto ADA de Brian Tellez - Fog Computing e IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyecto ADA | Brian Tellez",
    description: "Sistema de asistencia interactiva universitaria con Fog Computing, Raspberry Pi 5 y Python FastAPI.",
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
              { "@type": "ListItem", "position": 3, "name": "Proyecto ADA", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
