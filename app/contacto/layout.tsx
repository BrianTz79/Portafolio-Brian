import { Metadata } from "next";

const URL = "https://briantellez.ourocore.net/contacto";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Brian Tellez para oportunidades laborales, prácticas profesionales, desarrollo de proyectos o consultoría técnica en Tijuana.",
  keywords: [
    "Contactar Brian Tellez", "Brian Tellez email", "contratar desarrollador Tijuana",
    "Ingeniero en Sistemas Tijuana contacto", "Full Stack Developer Tijuana"
  ],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "Contacto | Brian Tellez - Ingeniero en Sistemas Computacionales",
    description: "Contáctame para oportunidades laborales, prácticas profesionales o proyectos tecnológicos en Tijuana.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://briantellez.ourocore.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contactar a Brian Tellez - Ingeniero en Sistemas Computacionales Tijuana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Brian Tellez",
    description: "Contáctame para oportunidades laborales, prácticas profesionales o proyectos tecnológicos en Tijuana.",
    images: ["https://briantellez.ourocore.net/og-image.png"],
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
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
                "name": "Contacto",
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
