import { Metadata } from "next";

const BASE = "https://briantellez.ourocore.net";
const URL = `${BASE}/proyectos/koko`;

export const metadata: Metadata = {
  title: "Koko — Co-presencia de Escritorio",
  description: "Koko por Brian Tellez: aplicación de escritorio de co-presencia para parejas y amigos a distancia. Mascota transparente P2P con Electron, WebRTC y Socket.io.",
  keywords: [
    "Koko co-presencia", "Brian Tellez Koko", "Electron WebRTC", "desktop overlay transparent",
    "Socket.io P2P", "aplicación pareja distancia", "koko.ourocore.net"
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Koko | Brian Tellez — Co-presencia de Escritorio",
    description: "Aplicación de co-presencia para parejas y amigos a distancia. Una mascota transparente que vive sobre el escritorio del otro, conectada P2P en tiempo real.",
    url: URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: "Koko de Brian Tellez - Co-presencia de Escritorio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koko | Brian Tellez",
    description: "Mascota transparente P2P que vive sobre el escritorio del otro. Electron + WebRTC + Socket.io.",
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
              { "@type": "ListItem", "position": 3, "name": "Koko", "item": URL }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
