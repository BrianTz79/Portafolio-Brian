import { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "ZAGA Distribuciones",
  description:
    "Sitio corporativo bilingüe para una distribuidora de material eléctrico, con Astro y Cloudflare Pages. Por Brian Tellez.",
  keywords: [
    "Brian Tellez ZAGA", "sitio corporativo bilingüe", "distribuidora material eléctrico Tampico",
    "Astro Cloudflare Pages", "sitio estático Tailwind CSS"
  ],
  alternates: { canonical: `${BASE_URL}/proyectos/zaga` },
  openGraph: {
    title: "ZAGA Distribuciones | Brian Tellez - Sitio Corporativo",
    description:
      "Sitio corporativo bilingüe para una distribuidora de material eléctrico. Desarrollado por Brian Tellez con Astro y Cloudflare Pages.",
    url: `${BASE_URL}/proyectos/zaga`,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "article",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "ZAGA Distribuciones de Brian Tellez - Sitio Corporativo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAGA Distribuciones | Brian Tellez",
    description: "Sitio corporativo bilingüe para una distribuidora de material eléctrico, con Astro y Cloudflare Pages.",
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
