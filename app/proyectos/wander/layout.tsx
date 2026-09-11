import { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "Wander",
  description:
    "Plataforma de perfiles de jugador con datos importados de Steam, en React y Express. Por Brian Tellez.",
  keywords: [
    "Brian Tellez Wander", "perfil de jugador", "Steam OpenID Discord Google",
    "React Express Prisma", "argon2id sesiones seguras"
  ],
  alternates: { canonical: `${BASE_URL}/proyectos/wander` },
  openGraph: {
    title: "Wander | Brian Tellez - Perfiles de Jugador",
    description:
      "Plataforma de perfiles de jugador con datos importados de Steam. Desarrollada por Brian Tellez con React, Express y Prisma.",
    url: `${BASE_URL}/proyectos/wander`,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Wander de Brian Tellez - Perfiles de Jugador" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wander | Brian Tellez",
    description: "Plataforma de perfiles de jugador con datos importados de Steam, en React y Express.",
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
