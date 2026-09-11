import type { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "Shokan",
  description:
    "PWA y app Android para convocar grupos de juego con notificaciones push sin Firebase. Por Brian Tellez.",
  alternates: { canonical: `${BASE_URL}/proyectos/shokan` },
  openGraph: {
    title: "Shokan | Brian Tellez",
    description:
      "PWA y app Android para convocar grupos de juego con notificaciones push sin Firebase.",
    url: `${BASE_URL}/proyectos/shokan`,
    images: [`${BASE_URL}/og-image.png`],
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
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "Proyectos", item: `${BASE_URL}/proyectos` },
              { "@type": "ListItem", position: 3, name: "Shokan", item: `${BASE_URL}/proyectos/shokan` },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
