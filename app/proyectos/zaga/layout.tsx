import type { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "ZAGA Distribuciones",
  description:
    "Sitio corporativo bilingüe para una distribuidora de material eléctrico, con Astro y Cloudflare Pages. Por Brian Tellez.",
  alternates: { canonical: `${BASE_URL}/proyectos/zaga` },
  openGraph: {
    title: "ZAGA Distribuciones | Brian Tellez",
    description:
      "Sitio corporativo bilingüe para una distribuidora de material eléctrico, con Astro y Cloudflare Pages.",
    url: `${BASE_URL}/proyectos/zaga`,
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
              { "@type": "ListItem", position: 3, name: "ZAGA Distribuciones", item: `${BASE_URL}/proyectos/zaga` },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
