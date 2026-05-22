import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Brian Tellez | Portafolio - Ingeniero en Sistemas Computacionales & Full Stack",
    template: "%s | Brian Tellez"
  },
  description: "Portafolio de Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales del Instituto Tecnológico de Tijuana. Especialista en Full Stack, DevOps y Homelab.",
  keywords: [
    "Brian Tellez", "Brian Tellez portafolio", "Brian Guadalupe Tellez Escobar",
    "Ingeniero en Sistemas Computacionales Tijuana", "Ingeniero en Sistemas Tijuana",
    "Full Stack Developer Tijuana", "Desarrollador Web Tijuana",
    "DevOps Tijuana", "Homelab", "Instituto Tecnológico de Tijuana"
  ],
  authors: [{ name: "Brian Guadalupe Tellez Escobar", url: BASE_URL }],
  creator: "Brian Guadalupe Tellez Escobar",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Brian Tellez | Portafolio - Ingeniero en Sistemas Computacionales",
    description: "Portafolio de Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales del ITT. Full Stack, DevOps y Homelab en Tijuana.",
    url: BASE_URL,
    siteName: "Brian Tellez - Portafolio",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Brian Tellez - Ingeniero en Sistemas Computacionales y Full Stack Developer en Tijuana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Tellez | Portafolio - Ingeniero en Sistemas Computacionales",
    description: "Portafolio de Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales del ITT. Full Stack, DevOps y Homelab en Tijuana.",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-98KZK05595"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-98KZK05595');
          `
        }} />
        {/* JSON-LD: Person — identidad de Brian Tellez para Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://briantellez.ourocore.net/#person",
              "name": "Brian Guadalupe Tellez Escobar",
              "alternateName": ["Brian Tellez", "BrianTz"],
              "jobTitle": "Ingeniero en Sistemas Computacionales | Full Stack & DevOps",
              "description": "Ingeniero en Sistemas Computacionales egresado del Instituto Tecnológico de Tijuana, especializado en desarrollo Full Stack, DevOps y administración de servidores Homelab.",
              "url": "https://briantellez.ourocore.net",
              "email": "brian.tellez79@gmail.com",
              "image": "https://briantellez.ourocore.net/og-image.png",
              "sameAs": [
                "https://github.com/BrianTz79",
                "https://www.linkedin.com/in/brian-tellez-8b67b0359/",
                "https://www.instagram.com/brian.tz97/"
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Instituto Tecnológico de Tijuana",
                "alternateName": "ITT",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Tijuana",
                  "addressRegion": "Baja California",
                  "addressCountry": "MX"
                }
              },
              "knowsAbout": [
                "Full Stack Development", "DevOps", "Homelab",
                "Docker", "Linux", "Next.js", "React", "Python",
                "FastAPI", "PostgreSQL", "Cloudflare", "Fog Computing"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tijuana",
                "addressRegion": "Baja California",
                "addressCountry": "MX"
              }
            })
          }}
        />
        {/* JSON-LD: WebSite — habilita sitelinks search box en Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://briantellez.ourocore.net/#website",
              "name": "Brian Tellez - Portafolio",
              "description": "Portafolio profesional de Brian Guadalupe Tellez Escobar, Ingeniero en Sistemas Computacionales de Tijuana.",
              "url": "https://briantellez.ourocore.net",
              "inLanguage": ["es-MX", "en-US"],
              "author": { "@id": "https://briantellez.ourocore.net/#person" },
              "publisher": { "@id": "https://briantellez.ourocore.net/#person" }
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased flex flex-col`}>
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1 flex flex-col w-full">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
