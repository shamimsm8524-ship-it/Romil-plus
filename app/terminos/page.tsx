import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Términos de uso", description: "Términos de uso del portal ROMIL PLUS.", alternates: { canonical: "/terminos" } };

export default function TerminosPage() {
  return <InfoPage eyebrow="Legal" title="Términos de uso" intro="Al utilizar ROMIL PLUS aceptas que el portal tiene una finalidad informativa y que la información oficial de cada entidad es la referencia definitiva para postular.">
    <h2>Carácter informativo</h2><p>ROMIL PLUS selecciona, organiza y resume convocatorias laborales encontradas en fuentes verificables. No somos la entidad convocante, no evaluamos postulantes y no garantizamos una contratación.</p>
    <h2>Vigencia de las convocatorias</h2><p>Las fechas, requisitos y cronogramas pueden cambiar después de nuestra última verificación. Antes de enviar una postulación debes consultar las bases y comunicaciones oficiales de la entidad.</p>
    <h2>Postulación y pagos</h2><p>ROMIL PLUS no cobra por permitir el acceso a una convocatoria ni por garantizar una plaza. Cualquier trámite que una entidad establezca debe constar en sus canales oficiales. Nunca realices pagos a una persona que afirme poder asegurar una vacante en nombre de ROMIL PLUS.</p>
    <h2>Propiedad de terceros</h2><p>Los nombres, logotipos y marcas de entidades o empresas pertenecen a sus respectivos titulares. Su mención se utiliza únicamente para identificar la fuente u oportunidad laboral correspondiente.</p>
    <h2>Uso responsable</h2><p>No utilices el sitio para enviar información falsa, intentar acceder a sistemas sin autorización, distribuir contenido malicioso o suplantar a una entidad o postulante.</p>
    <h2>Actualización</h2><p>Estos términos fueron actualizados el 17 de octubre de 2026 y pueden modificarse cuando cambien las funciones del portal.</p>
  </InfoPage>;
}
