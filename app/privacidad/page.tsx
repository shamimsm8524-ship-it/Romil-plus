import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Política de privacidad", description: "Política de privacidad de ROMIL PLUS.", alternates: { canonical: "/privacidad" } };

export default function PrivacidadPage() {
  return <InfoPage eyebrow="Legal" title="Política de privacidad" intro="Esta política explica de forma general qué información puede tratar ROMIL PLUS al utilizar el sitio y cómo puede intervenir la publicidad de terceros.">
    <h2>Información que puede recopilarse</h2><p>El sitio puede recibir datos técnicos habituales como dirección IP, tipo de navegador, dispositivo, páginas visitadas y datos similares generados durante la navegación. Si utilizas funciones de cuenta o soporte, también pueden tratarse los datos que facilites voluntariamente.</p>
    <h2>Cookies y tecnologías similares</h2><p>ROMIL PLUS puede utilizar cookies necesarias para el funcionamiento del sitio, medición de uso y, cuando se active, servicios publicitarios. Puedes administrar cookies desde la configuración de tu navegador y, cuando corresponda, mediante los controles de consentimiento disponibles en el sitio.</p>
    <h2>Google AdSense</h2><p>Cuando la publicidad de Google esté habilitada, Google y sus socios pueden utilizar cookies o identificadores para mostrar, medir y personalizar anuncios de acuerdo con sus políticas y la configuración aplicable del usuario. ROMIL PLUS activará AdSense únicamente después de configurar una cuenta y un identificador de editor válidos.</p>
    <h2>Enlaces externos</h2><p>Las convocatorias enlazan a sitios de entidades públicas u otros portales oficiales. Al salir de ROMIL PLUS, el tratamiento de datos se rige por las políticas del sitio de destino.</p>
    <h2>Datos sensibles</h2><p>No envíes a ROMIL PLUS contraseñas, códigos de verificación, información bancaria ni documentación personal que deba presentarse directamente a una entidad convocante.</p>
    <h2>Cambios en esta política</h2><p>Esta política puede actualizarse cuando cambien las funciones del sitio, proveedores utilizados o requisitos aplicables. Fecha de actualización: 17 de octubre de 2026.</p>
  </InfoPage>;
}
