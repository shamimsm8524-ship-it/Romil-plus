import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Contacto", description: "Contacto con ROMIL PLUS para reportar correcciones o consultar sobre el portal.", alternates: { canonical: "/contacto" } };

export default function ContactoPage() {
  return <InfoPage eyebrow="Contacto" title="¿Encontraste una convocatoria desactualizada?" intro="Puedes escribirnos para reportar un enlace roto, un cambio de cronograma o una información que deba revisarse.">
    <h2>Qué información enviar</h2><p>Indica el nombre de la entidad, puesto o número de convocatoria y, si es posible, agrega el enlace oficial que muestra la actualización. Eso facilita comprobar el cambio.</p>
    <h2>Canales de atención</h2><p>Escríbenos a <a href="mailto:factororigentv@gmail.com">factororigentv@gmail.com</a> para consultas, correcciones y solicitudes sobre tus datos. Puedes enviar un correo sin crear una cuenta en ROMIL PLUS.</p><p>También puedes <a href="/soporte">abrir el chat de soporte con clientes</a>; este canal requiere iniciar sesión. La respuesta depende de la disponibilidad del equipo.</p><p>No recibimos postulaciones ni documentos destinados a las entidades empleadoras. ROMIL PLUS es un portal informativo independiente; la evaluación y selección corresponden a cada entidad.</p>
    <h2>Privacidad</h2><p>No envíes contraseñas, códigos de verificación, claves bancarias ni documentos personales completos para reportar una corrección del sitio.</p>
  </InfoPage>;
}
