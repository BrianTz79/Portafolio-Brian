import { Metadata } from "next";

const URL = "https://briantellez.ourocore.net/proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de Brian Tellez: desarrollo Full Stack, DevOps, Homelab, sistemas embebidos y soluciones innovadoras. Ingeniero en Sistemas Computacionales de Tijuana.",
  keywords: [
    "Brian Tellez proyectos", "portafolio proyectos Tijuana",
    "Full Stack projects", "DevOps proyectos", "Homelab", "Next.js", "React", "Docker"
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Proyectos | Brian Tellez - Full Stack & DevOps",
    description: "Explora los proyectos de Brian Tellez: Full Stack, DevOps, Homelab y soluciones tecnológicas innovadoras desde Tijuana.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://briantellez.ourocore.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Proyectos de Brian Tellez - Full Stack Developer y DevOps en Tijuana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos | Brian Tellez",
    description: "Explora los proyectos de Brian Tellez: Full Stack, DevOps, Homelab y soluciones tecnológicas innovadoras.",
    images: ["https://briantellez.ourocore.net/og-image.png"],
  },
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://briantellez.ourocore.net"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Proyectos",
                "item": URL
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
