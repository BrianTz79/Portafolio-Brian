import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Explora los proyectos de Brian Tellez. Desarrollo Full Stack, DevOps, Homelab y soluciones innovadoras.",
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
