import type { Metadata } from "next";

const BASE_URL = "https://briantellez.ourocore.net";

export const metadata: Metadata = {
  title: "Currículum",
  description:
    "Currículum de Brian Tellez: Ingeniería en Sistemas Computacionales, desarrollo full-stack, DevOps e infraestructura autoalojada. Descargable en PDF.",
  alternates: { canonical: `${BASE_URL}/cv` },
  openGraph: {
    title: "Currículum | Brian Tellez",
    description: "Currículum de Brian Tellez, desarrollador full-stack y DevOps en Tijuana.",
    url: `${BASE_URL}/cv`,
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
