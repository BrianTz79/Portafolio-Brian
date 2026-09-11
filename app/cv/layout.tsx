import { Metadata } from "next";

const URL = "https://briantellez.ourocore.net/cv";

export const metadata: Metadata = {
  title: "Currículum",
  description:
    "Currículum de Brian Tellez: Ingeniería en Sistemas Computacionales, desarrollo full-stack, DevOps e infraestructura autoalojada. Descargable en PDF.",
  keywords: [
    "Currículum Brian Tellez", "CV Brian Tellez", "Brian Tellez ingeniero en sistemas",
    "Full Stack Developer Tijuana", "DevOps Tijuana", "CV descargable PDF"
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Currículum | Brian Tellez - Ingeniero en Sistemas Computacionales",
    description: "Currículum de Brian Tellez, desarrollador full-stack y DevOps en Tijuana. Descargable en PDF.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "profile",
    images: [
      {
        url: "https://briantellez.ourocore.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Currículum de Brian Tellez - Ingeniero en Sistemas Computacionales Tijuana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currículum | Brian Tellez",
    description: "Currículum de Brian Tellez, desarrollador full-stack y DevOps en Tijuana. Descargable en PDF.",
    images: ["https://briantellez.ourocore.net/og-image.png"],
  },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
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
                "name": "Currículum",
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
