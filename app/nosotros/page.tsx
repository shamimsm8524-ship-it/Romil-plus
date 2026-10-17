import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Sobre ROMIL PLUS", description: "Qué es ROMIL PLUS y cómo funciona nuestro portal de convocatorias laborales verificadas.", alternates: { canonical: "/nosotros" } };

export default function NosotrosPage() {
  return <InfoPage eyebrow="Sobre el proyecto" title="ROMIL PLUS: empleo con fuentes comprobables" intro="ROMIL PLUS es un portal independiente que organiza convocatorias laborales y contenido útil para personas que buscan oportunidades en Perú.">
    <h2>Qué hacemos</h2><p>Localizamos convocatorias publicadas por entidades identificables, resumimos la información principal y facilitamos el acceso a la fuente original. También publicamos guías propias sobre postulaciones, documentos, CV y seguridad al buscar empleo.</p>
    <h2>Qué no hacemos</h2><p>No somos una entidad del Estado, no representamos a las instituciones convocantes y no decidimos quién obtiene una vacante. Tampoco cobramos a los usuarios por poder postular a las convocatorias mostradas.</p>
    <h2>Nuestra prioridad</h2><p>Preferimos publicar menos oportunidades, pero con una fuente verificable, antes que llenar el sitio con avisos difíciles de comprobar. La fecha de verificación y el enlace oficial forman parte de cada publicación.</p>
    <h2>Responsabilidad del postulante</h2><p>Antes de postular, cada persona debe leer las bases originales, confirmar el cronograma vigente y verificar que cumple los requisitos. Las condiciones oficiales pueden cambiar después de nuestra última revisión.</p>
  </InfoPage>;
}
