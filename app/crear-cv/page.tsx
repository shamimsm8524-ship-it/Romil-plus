import type { Metadata } from "next";
import { CvBuilder } from "@/components/CvBuilder";

export const metadata: Metadata = {
  title: "Crear CV profesional gratis",
  description: "Crea un currículum profesional con plantillas elegantes, edítalo en línea y guárdalo en PDF.",
  alternates: { canonical: "/crear-cv" },
};

export default function CrearCvPage() {
  return <CvBuilder />;
}
