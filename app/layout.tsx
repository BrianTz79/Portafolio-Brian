import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://briantellez.ourocore.net"),
  title: {
    default: "Brian Tellez | Portafolio - Ingeniero en Sistemas & Full Stack",
    template: "%s | Brian Tellez Portafolio"
  },
  description: "Descubre el portafolio de Brian Tellez, Ingeniero en Sistemas y Desarrollador Full Stack. Proyectos web, homelab, DevOps y soluciones tecnológicas.",
  keywords: ["Brian Tellez", "Brian Tellez portafolio", "Ingeniero en Sistemas", "Full Stack", "Desarrollador Web", "DevOps"],
  openGraph: {
    title: "Brian Tellez | Portafolio - Ingeniero en Sistemas & Full Stack",
    description: "Descubre el portafolio de Brian Tellez, Ingeniero en Sistemas y Desarrollador Full Stack. Proyectos web, homelab, DevOps y soluciones tecnológicas.",
    url: "https://briantellez.ourocore.net",
    siteName: "Brian Tellez",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Tellez | Portafolio - Ingeniero en Sistemas & Full Stack",
    description: "Descubre el portafolio de Brian Tellez, Ingeniero en Sistemas y Desarrollador Full Stack. Proyectos web, homelab, DevOps y soluciones tecnológicas.",
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
