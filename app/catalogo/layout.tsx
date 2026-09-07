import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de suscripciones y herramientas digitales",
  description: "Explora el catálogo de ROMIL PLUS: suscripciones, herramientas digitales, diseño, edición, productividad e inteligencia artificial disponibles en Perú.",
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    type: "website",
    url: "/catalogo",
    title: "Catálogo digital | ROMIL PLUS",
    description: "Suscripciones y herramientas digitales disponibles en ROMIL PLUS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CatalogoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
