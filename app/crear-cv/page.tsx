import type { Metadata } from "next";
import { CvBuilder } from "@/components/CvBuilder";
import { CvContactSync } from "@/components/CvContactSync";
import { CvDesignEnhancer } from "@/components/CvDesignEnhancer";
import { CvPageManager } from "@/components/CvPageManager";
import { CvSectionStyleSync } from "@/components/CvSectionStyleSync";
import "./cv-designs.css";
import "./photo-alignment.css";
import "./azul-tecnico-redesign.css";
import "./cv-print-fix.css";
import "./cv-pages.css";
import "./cv-typography.css";

export const metadata: Metadata = {
  title: "Crear CV profesional gratis",
  description: "Crea un currículum profesional con plantillas elegantes, edítalo en línea y guárdalo en PDF.",
  alternates: { canonical: "/crear-cv" },
};

export default function CrearCvPage() {
  return <>
    <CvBuilder />
    <CvDesignEnhancer />
    <CvPageManager />
    <CvSectionStyleSync />
    <CvContactSync />
  </>;
}