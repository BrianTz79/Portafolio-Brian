import { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "NoteCore",
  description:
    "Plataforma de organización académica para estudiantes: horario visual, control de faltas y agenda, en app Android y web. Por Brian Tellez.",
  keywords: [
    "Brian Tellez NoteCore", "app organización académica", "control de faltas",
    "React Native Expo Next.js", "Fastify PostgreSQL", "widgets Android Kotlin"
  ],
  alternates: { canonical: `${BASE_URL}/proyectos/notecore` },
  openGraph: {
    title: "NoteCore | Brian Tellez - Organización Académica",
    description:
      "Plataforma de organización académica para estudiantes, en app Android y web. Desarrollada por Brian Tellez con React Native, Next.js y Fastify.",
    url: `${BASE_URL}/proyectos/notecore`,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "NoteCore de Brian Tellez - Organización Académica" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteCore | Brian Tellez",
    description: "Plataforma de organización académica para estudiantes, con horario visual, control de faltas y agenda.",
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
              { "@type": "ListItem", position: 3, name: "NoteCore", item: `${BASE_URL}/proyectos/notecore` },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
