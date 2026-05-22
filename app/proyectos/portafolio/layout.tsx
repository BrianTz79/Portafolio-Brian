import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/portafolio`;

export const metadata: Metadata = {
  title: "Portafolio Personal Web",
  description: "Portafolio personal web de Brian Tellez: construido con Next.js 14, Tailwind CSS v4, i18n propio y desplegado con Docker. Ingeniero en Sistemas Computacionales de Tijuana.",
  keywords: [
    "Brian Tellez portafolio Next.js", "portafolio Next.js Tailwind",
    "portafolio Ingeniero Sistemas Tijuana", "Next.js 14 static export", "i18n portafolio"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Portafolio Personal | Brian Tellez - Next.js & Tailwind",
    description: "Portafolio personal de Brian Tellez construido con Next.js 14, Tailwind CSS v4, sistema i18n propio y desplegado con Docker.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Portafolio de Brian Tellez - Next.js y Tailwind CSS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio Personal | Brian Tellez",
    description: "Portafolio personal con Next.js 14, Tailwind CSS v4, i18n y Docker.",
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
              { "@type": "ListItem", "position": 3, "name": "Portafolio Personal Web", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
