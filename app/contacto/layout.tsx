import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Brian Tellez para oportunidades laborales, desarrollo de proyectos o consultoría técnica.",
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
