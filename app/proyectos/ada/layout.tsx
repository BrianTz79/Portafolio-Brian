import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyecto ADA",
  description: "Proyecto ADA por Brian Tellez. Sistema de asistencia interactiva universitaria multimodal bajo el paradigma de Fog Computing.",
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }