import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/kanua-petto`;

export const metadata: Metadata = {
  title: "Kanua Petto",
  description: "Kanua Petto por Brian Tellez: videojuego desarrollado con Godot Engine 4.5 y C# (.NET) con arquitectura cloud. Proyecto indie desde Tijuana.",
  keywords: [
    "Brian Tellez Kanua Petto", "videojuego Godot Tijuana",
    "Godot Engine C# .NET", "indie game Tijuana", "game dev Brian Tellez"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Kanua Petto | Brian Tellez - Videojuego Godot",
    description: "Videojuego indie desarrollado por Brian Tellez con Godot Engine 4.5 y C# (.NET) con arquitectura cloud desde Tijuana.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Kanua Petto de Brian Tellez - Videojuego Godot Engine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanua Petto | Brian Tellez",
    description: "Videojuego indie con Godot Engine 4.5 y C# (.NET) con arquitectura cloud.",
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
              { "@type": "ListItem", "position": 3, "name": "Kanua Petto", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
