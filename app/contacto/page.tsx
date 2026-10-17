import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Contacto", description: "Contacto con ROMIL PLUS para reportar correcciones o consultar sobre el portal.", alternates: { canonical: "/contacto" } };

export default function ContactoPage() {
  return <InfoPage eyebrow="Contacto" title="¿Encontraste una convocatoria desactualizada?" intro="Puedes escribirnos para reportar un enlace roto, un cambio de cronograma o una información que deba revisarse.">
    <h2>Qué información enviar</h2><p>Indica el nombre de la entidad, puesto o número de convocatoria y, si es posible, agrega el enlace oficial que muestra la actualización. Eso facilita comprobar el cambio.</p>
    <h2>Canal de atención</h2><p>Para consultas generales puedes utilizar el centro de soporte disponible en ROMIL PLUS. No recibimos postulaciones ni documentos destinados a las entidades empleadoras.</p>
    <h2>Privacidad</h2><p>No envíes contraseñas, códigos de verificación, claves bancarias ni documentos personales completos para reportar una corrección del sitio.</p>
  </InfoPage>;
}
