import type { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "Wander",
  description:
    "Plataforma de perfiles de jugador con datos importados de Steam, en React y Express. Por Brian Tellez.",
  alternates: { canonical: `${BASE_URL}/proyectos/wander` },
  openGraph: {
    title: "Wander | Brian Tellez",
    description:
      "Plataforma de perfiles de jugador con datos importados de Steam, en React y Express.",
    url: `${BASE_URL}/proyectos/wander`,
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
              { "@type": "ListItem", position: 3, name: "Wander", item: `${BASE_URL}/proyectos/wander` },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
