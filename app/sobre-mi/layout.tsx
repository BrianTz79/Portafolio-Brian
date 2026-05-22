import { Metadata } from "next";

const URL = "https://briantellez.ourocore.net/sobre-mi";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: "Conoce a Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales del Instituto Tecnológico de Tijuana. Trayectoria, proyectos, DevOps, Full Stack y Homelab.",
  keywords: [
    "Brian Tellez sobre mí", "Brian Tellez Tijuana", "Ingeniero en Sistemas Computacionales Tijuana",
    "ITT Tijuana", "Full Stack Developer", "DevOps", "Homelab"
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Sobre Mí | Brian Tellez - Ingeniero en Sistemas Computacionales",
    description: "Conoce a Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales del Instituto Tecnológico de Tijuana. Especialista en Full Stack, DevOps y Homelab.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "profile",
    images: [
      {
        url: "https://briantellez.ourocore.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brian Tellez Escobar - Ingeniero en Sistemas Computacionales Tijuana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Mí | Brian Tellez",
    description: "Conoce a Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales del Instituto Tecnológico de Tijuana.",
    images: ["https://briantellez.ourocore.net/og-image.png"],
  },
};

export default function SobreMiLayout({ children }: { children: React.ReactNode }) {
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
                "name": "Sobre Mí",
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
