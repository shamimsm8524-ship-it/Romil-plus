import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Cómo verificamos las convocatorias", description: "Metodología de ROMIL PLUS para verificar oportunidades laborales antes de publicarlas.", alternates: { canonical: "/como-verificamos" } };

export default function ComoVerificamosPage() {
  return <InfoPage eyebrow="Transparencia" title="Cómo verificamos una convocatoria" intro="Nuestro objetivo es reducir la posibilidad de compartir ofertas falsas, desactualizadas o sin una fuente comprobable.">
    <h2>1. Buscamos la publicación original</h2><p>Priorizamos Talento Perú, el portal institucional de la entidad convocante y sus plataformas oficiales de selección. No consideramos suficiente una captura, una publicación reenviada o un blog de terceros sin enlace a la fuente.</p>
    <h2>2. Comprobamos los datos básicos</h2><p>Contrastamos entidad, nombre del puesto, número del proceso cuando existe, fecha de publicación, régimen y número de vacantes. Si un dato no está claro, lo indicamos como pendiente de revisar en las bases.</p>
    <h2>3. Registramos cuándo fue revisada</h2><p>Las convocatorias cambian y vencen. Por eso mostramos una fecha de verificación. Esa fecha no sustituye el cronograma oficial: el postulante debe confirmar que el proceso continúa vigente antes de enviar documentos.</p>
    <h2>4. Enlazamos a la fuente oficial</h2><p>Cada aviso debe permitir llegar a la publicación original. ROMIL PLUS resume y organiza la información, pero no reemplaza las bases ni recibe postulaciones en nombre de las entidades.</p>
    <h2>5. Corregimos información cuando cambia</h2><p>Si detectamos que una convocatoria venció, fue anulada o cambió de cronograma, debemos actualizarla. También puedes avisarnos desde la página de contacto indicando la convocatoria y la fuente correspondiente.</p>
  </InfoPage>;
}
