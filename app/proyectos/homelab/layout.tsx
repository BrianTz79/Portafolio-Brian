import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/homelab`;

export const metadata: Metadata = {
  title: "Homelab e Infraestructura",
  description: "Homelab de Brian Tellez: servidor bare-metal con AMD Ryzen 5 9600X, 64GB DDR5, Ubuntu Server, Docker y Cloudflare. Laboratorio personal de DevOps en Tijuana.",
  keywords: [
    "Brian Tellez Homelab", "servidor homelab Tijuana", "DevOps homelab",
    "AMD Ryzen Ubuntu Server Docker", "Cloudflare Tunnels", "bare-metal server"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Homelab e Infraestructura | Brian Tellez - DevOps",
    description: "Servidor bare-metal personal de Brian Tellez: AMD Ryzen 5 9600X, 64GB DDR5, Ubuntu Server, Docker y Cloudflare Tunnels en Tijuana.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Homelab de Brian Tellez - Servidor DevOps en Tijuana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Homelab | Brian Tellez",
    description: "Servidor bare-metal personal con AMD Ryzen 5 9600X, Ubuntu Server, Docker y Cloudflare Tunnels.",
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
              { "@type": "ListItem", "position": 3, "name": "Homelab e Infraestructura", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
