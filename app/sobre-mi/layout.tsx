import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: "Conoce más sobre Brian Tellez, su trayectoria como Ingeniero en Sistemas, experiencia en DevOps, Full Stack y su pasión por la tecnología.",
};

export default function SobreMiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
