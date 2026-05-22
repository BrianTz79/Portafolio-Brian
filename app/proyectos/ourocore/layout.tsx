import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/ourocore`;

export const metadata: Metadata = {
  title: "OuroCore Web",
  description: "OuroCore Web por Brian Tellez: plataforma web corporativa con HTML5, CSS3, JavaScript, Nginx y Docker. Cofundador y desarrollador Full Stack en Tijuana.",
  keywords: [
    "Brian Tellez OuroCore", "OuroCore Web Tijuana",
    "HTML5 CSS3 JavaScript Nginx Docker", "web corporativa Tijuana", "cofundador desarrollador"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "OuroCore Web | Brian Tellez - Desarrollador y Cofundador",
    description: "Plataforma web corporativa de OuroCore desarrollada por Brian Tellez con HTML5, CSS3, JavaScript, Nginx y Docker desde Tijuana.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "OuroCore Web de Brian Tellez - Desarrollador Full Stack Tijuana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OuroCore Web | Brian Tellez",
    description: "Plataforma web corporativa con HTML5, CSS3, JavaScript, Nginx y Docker.",
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
              { "@type": "ListItem", "position": 3, "name": "OuroCore Web", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
