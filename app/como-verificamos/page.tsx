import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = { title: "Cómo verificamos trabajos y becas", description: "Metodología de ROMIL PLUS para verificar convocatorias laborales y becas antes de publicarlas.", alternates: { canonical: "/como-verificamos" } };

export default function ComoVerificamosPage() {
  return <InfoPage eyebrow="Transparencia" title="Cómo verificamos una oportunidad" intro="Nuestro objetivo es reducir la posibilidad de compartir empleos o becas falsas, desactualizadas o sin una fuente comprobable.">
    <h2>1. Buscamos la publicación original</h2><p>Para empleos priorizamos Talento Perú, el portal institucional de la entidad convocante y sus plataformas oficiales de selección. Para becas buscamos la institución que ofrece o canaliza la ayuda, como PRONABEC, universidades, embajadas u organismos internacionales. No consideramos suficiente una captura, una publicación reenviada o un blog de terceros sin enlace a la fuente.</p>
    <h2>2. Comprobamos los datos básicos</h2><p>En trabajos contrastamos entidad, puesto, número del proceso cuando existe, fecha de publicación, régimen y vacantes. En becas revisamos institución, nivel de estudios, público objetivo, beneficios, apertura y cierre de postulación. Si un dato no está claro, indicamos que debe revisarse directamente en las bases.</p>
    <h2>3. Registramos cuándo fue revisada</h2><p>Las oportunidades cambian y vencen. Por eso mostramos una fecha de verificación y, en becas, un estado como Abierta, Próxima o Cerrada. Esa información no sustituye el cronograma oficial: el postulante debe confirmar que el proceso continúa vigente antes de enviar documentos.</p>
    <h2>4. Enlazamos a la fuente oficial</h2><p>Cada aviso debe permitir llegar a la publicación original. ROMIL PLUS resume y organiza la información, pero no reemplaza las bases ni recibe postulaciones en nombre de las entidades o instituciones que ofrecen la oportunidad.</p>
    <h2>5. Corregimos información cuando cambia</h2><p>Si detectamos que una convocatoria venció, fue anulada o cambió de cronograma, debemos actualizarla. También puedes avisarnos desde la página de contacto indicando la oportunidad y la fuente correspondiente.</p>
  </InfoPage>;
}
