import { scholarships, type Scholarship } from "@/lib/scholarships";

export type ScholarshipMilestone = {
  label: string;
  date: string;
};

export type ScholarshipDetailExtra = {
  quantity?: string;
  eligibility?: string[];
  requirements?: string[];
  documents?: string[];
  benefits?: string[];
  stages?: string[];
  importantDates?: ScholarshipMilestone[];
  applicationUrl?: string;
  applicationLabel?: string;
  applicationInstructions?: string;
  basesUrl?: string;
  notes?: string[];
};

const detailMap: Record<string, ScholarshipDetailExtra> = {
  "osiptel-peu-2027": {
    quantity: "60 becas integrales",
    eligibility: [
      "Estudiantes del último año de pregrado, egresados o bachilleres del semestre 2026-I de una universidad licenciada del Perú.",
      "Carreras admitidas: Derecho; Economía o Ingeniería Económica; e Ingeniería de Telecomunicaciones, Electrónica, Sistemas, Informática, Software, Redes y Comunicaciones, Información o Industrial.",
    ],
    requirements: [
      "Ser estudiante del último año de pregrado a la fecha de postulación, egresado o bachiller del semestre 2026-I de una universidad licenciada del país.",
      "Pertenecer a una de las especialidades admitidas: Derecho; Economía o Ingeniería Económica; Ingeniería de Telecomunicaciones, Electrónica, Sistemas, Informática, Software, Redes y Comunicaciones, Información o Industrial.",
      "No estar titulado.",
      "Firmar un compromiso de dedicación exclusiva durante las semanas de desarrollo del programa.",
      "Completar la ficha oficial de inscripción del PEU OSIPTEL 2027.",
    ],
    documents: [
      "Documento que acredite la situación académica registrada, como constancia de matrícula u otro documento equivalente solicitado en el formulario oficial.",
      "Los documentos adicionales dependen de la modalidad de admisión y deben adjuntarse conforme a las bases vigentes del proceso.",
    ],
    benefits: [
      "Cobertura del 100 % de los costos académicos y materiales del programa.",
      "Alimentación y movilidad local durante el desarrollo presencial en Lima.",
      "Seguro contra accidentes.",
      "Para becarios provenientes de regiones: traslado y alojamiento en Lima.",
      "Los tres primeros puestos de cada especialidad podrán tener la oportunidad de incorporarse al OSIPTEL mediante prácticas preprofesionales o profesionales, según las condiciones del programa.",
    ],
    stages: [
      "Completar la inscripción en el formulario oficial.",
      "Rendir el examen de admisión virtual nacional.",
      "Presentar y validar la documentación exigida por la convocatoria.",
      "Participar en la entrevista final cuando corresponda.",
      "Selección de los 60 becarios por orden de mérito y especialidad.",
    ],
    importantDates: [
      { label: "Cierre de inscripciones", date: "31/10/2026" },
      { label: "Examen de admisión", date: "08/11/2026" },
      { label: "Inicio de clases", date: "11/01/2027" },
      { label: "Fin del programa", date: "19/03/2027" },
    ],
    applicationUrl: "https://sistemasweb.osiptel.gob.pe/CUREXTFront/",
    applicationLabel: "Postular al PEU OSIPTEL 2027",
    applicationInstructions: "Completa el formulario oficial del PEU OSIPTEL. Antes de enviarlo, verifica que tu situación académica, especialidad y documentos coincidan con las bases vigentes.",
    basesUrl: "https://beca.osiptel.gob.pe/",
    notes: [
      "El ingreso es por mérito. La convocatoria contempla evaluación y selección conforme a las bases oficiales del PEU OSIPTEL 2027.",
    ],
  },
  "pronabec-beca-18-2027": {
    quantity: "1,000 becas integrales anunciadas para la convocatoria 2027",
    eligibility: [
      "Peruanos que cursan el último grado de secundaria o que ya egresaron del colegio.",
      "Postulantes con alto rendimiento académico y condición de pobreza, pobreza extrema o una situación de vulnerabilidad contemplada por la convocatoria.",
    ],
    requirements: [
      "Tener nacionalidad peruana.",
      "Cumplir el límite de edad de la modalidad elegida; algunas modalidades y las personas que acreditan discapacidad no tienen límite de edad.",
      "Estar cursando el último grado de secundaria o haber egresado de estudios reconocidos por el Ministerio de Educación.",
      "Acreditar alto rendimiento académico en los dos últimos grados concluidos de secundaria.",
      "Acreditar la condición de vulnerabilidad o situación especial exigida por la modalidad.",
      "Presentar las declaraciones juradas y formatos generados por el módulo de inscripción.",
    ],
    benefits: [
      "Examen o carpeta de admisión cuando corresponda.",
      "Matrícula y pensión de estudios.",
      "Nivelación académica cuando forma parte de la malla curricular.",
      "Obtención del grado, título o equivalente.",
      "Idioma inglés en los casos previstos por la convocatoria.",
      "Según modalidad y condición del hogar: alimentación, alojamiento, movilidad, materiales, útiles, vestimenta, equipo de estudio y transporte interprovincial.",
    ],
    stages: [
      "Inscripción al Examen Nacional de Preselección (ENP).",
      "Revisión de la inscripción.",
      "Publicación de postulantes aptos.",
      "Aplicación del ENP.",
      "Publicación de preseleccionados.",
    ],
    importantDates: [
      { label: "Inscripción al ENP", date: "09/10/2026 al 18/10/2026 · 11:59 a. m." },
      { label: "Revisión de inscripción", date: "10/10/2026 al 06/11/2026" },
      { label: "Postulantes aptos para ENP", date: "11/11/2026" },
      { label: "Examen Nacional de Preselección", date: "22/11/2026" },
      { label: "Lista de preseleccionados", date: "23/12/2026" },
    ],
    applicationUrl: "https://becas.pronabec.gob.pe/beca18-2027",
    applicationLabel: "Inscribirme en Beca 18",
    applicationInstructions: "Este botón abre directamente el Módulo de inscripción oficial de PRONABEC para Beca 18 – Convocatoria 2027.",
    basesUrl: "https://www.pronabec.gob.pe/beca-18/",
  },
  "ucsp-beca-ingeniero-2027": {
    quantity: "6 becas",
    eligibility: [
      "Estudiantes que cursan quinto de secundaria en 2026 o egresados de secundaria en 2025.",
      "Interesados en Ingeniería Electrónica y de Telecomunicaciones o Ingeniería Mecatrónica en la UCSP.",
    ],
    requirements: [
      "Ser ingresante con vacante activa para el periodo 2027-1 al llegar a la etapa final de la beca.",
      "Quienes cursan quinto en 2026 deben haber pertenecido al tercio superior hasta cuarto de secundaria y luego acreditar el orden de mérito de primero a quinto.",
      "Egresados de 2025 deben haber pertenecido al tercio superior en cada uno de los cinco grados de secundaria.",
      "No haber iniciado estudios superiores previamente en la UCSP ni en otra institución de educación superior.",
    ],
    benefits: ["Cobertura del 100 % del valor de la cuota educativa de las carreras elegibles."],
    stages: [
      "Presentación virtual del expediente.",
      "Revisión de expedientes.",
      "Examen de aptitud académica y producción de textos.",
      "Entrevistas personales.",
      "Evaluación de requisitos finales.",
      "Comunicación de ganadores y aceptación de la beca.",
    ],
    importantDates: [
      { label: "Postulación", date: "31/08/2026 al 25/10/2026" },
      { label: "Publicación de preseleccionados", date: "04/11/2026" },
      { label: "Examen", date: "08/11/2026" },
      { label: "Entrevistas", date: "18/11/2026 y 24/11/2026" },
      { label: "Resultados finales", date: "01/03/2027" },
      { label: "Aceptación", date: "02/03/2027 al 05/03/2027" },
    ],
    applicationUrl: "https://docs.google.com/forms/d/1F6a4jbtvjtHWuYgfs0ae4FGELdfRzJpp4pzI185XiWw/viewform",
    applicationLabel: "Postular a Beca Ingeniero UCSP",
    applicationInstructions: "La UCSP enlaza este formulario como su inscripción oficial desde la página de la convocatoria. Antes de enviarlo, revisa las bases de la universidad.",
    basesUrl: "https://admision.ucsp.edu.pe/beca-ingeniero/",
  },
  "ubc-international-scholars-2027": {
    eligibility: [
      "Estudiante internacional que necesitará permiso de estudios canadiense.",
      "Ingreso directo a UBC desde un colegio secundario acreditado.",
      "Para la sesión 2027, haber egresado de secundaria no antes de junio de 2026.",
      "Postular a la primera carrera universitaria.",
      "Demostrar rendimiento académico sobresaliente, liderazgo, contribuciones significativas a la comunidad y necesidad económica importante.",
    ],
    requirements: [
      "Postular primero a admisión en UBC.",
      "Gestionar la nominación con el colegio y contar con una persona nominadora y un docente de referencia.",
      "Presentar información familiar y financiera que permita evaluar la necesidad económica.",
      "Completar los ensayos solicitados y, si corresponde, una entrevista en video.",
    ],
    benefits: [
      "Apoyo financiero determinado por la necesidad económica y el tipo de premio otorgado.",
      "Acompañamiento de asesores del International Scholars Program.",
      "Acceso a talleres, retiros y oportunidades de intercambio y co-op, según disponibilidad y elegibilidad.",
    ],
    stages: [
      "Elegir programa y campus.",
      "Coordinar nominación con el colegio.",
      "Postular a UBC y al programa de International Scholars.",
      "Entregar información financiera y ensayos.",
      "Evaluación y eventual entrevista en video.",
    ],
    importantDates: [
      { label: "Apertura de solicitudes", date: "05/10/2026" },
      { label: "Fecha límite International Scholars", date: "15/11/2026 · 11:59 p. m. PST" },
      { label: "Anuncio estimado de becas", date: "Abril de 2027" },
    ],
    applicationUrl: "https://you.ubc.ca/apply/",
    applicationLabel: "Postular oficialmente a UBC",
    applicationInstructions: "UBC indica que la postulación comienza con la solicitud oficial de admisión. Desde esa solicitud se continúa con el proceso del International Scholars Program.",
    basesUrl: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/",
  },
  "pronabec-generacion-bicentenario-extraordinaria-2026": {
    quantity: "20 becas integrales",
    eligibility: [
      "Profesionales peruanos que buscan realizar una maestría o doctorado en una institución elegible del extranjero.",
      "Postulantes con alto rendimiento académico e insuficientes recursos económicos para financiar el posgrado.",
    ],
    benefits: [
      "Matrícula y pensión de estudios.",
      "Obtención del grado y trabajo de investigación.",
      "Transporte internacional.",
      "Alojamiento, alimentación y movilidad local.",
      "Seguro médico y costos administrativos contemplados por las normas aplicables.",
    ],
    stages: ["Postulación", "Subsanación", "Publicación de seleccionados", "Aceptación de la beca", "Publicación de becarios"],
    importantDates: [
      { label: "Postulación", date: "30/10/2026 al 13/11/2026 · 11:59 p. m." },
      { label: "Subsanación", date: "03/11/2026 al 24/11/2026" },
      { label: "Seleccionados", date: "15/12/2026" },
      { label: "Aceptación", date: "16/12/2026 al 21/12/2026" },
      { label: "Lista de becarios", date: "A partir del 22/12/2026" },
    ],
    applicationInstructions: "La fase de postulación abre el 30/10/2026. Hasta entonces ROMIL PLUS no mostrará un botón de postulación directa para evitar enviar a un módulo antes de su apertura.",
    basesUrl: "https://www.pronabec.gob.pe/beca-generacion-bicentenario/",
  },
};

export function getScholarshipDetail(scholarship: Scholarship): ScholarshipDetailExtra {
  const specific = detailMap[scholarship.slug] ?? {};
  return {
    eligibility: specific.eligibility ?? [scholarship.summary],
    benefits: specific.benefits ?? [scholarship.coverage],
    requirements: specific.requirements ?? ["Revisar los requisitos completos de la convocatoria o programa en la fuente oficial antes de postular."],
    documents: specific.documents ?? ["La documentación exigida puede cambiar entre convocatorias. ROMIL PLUS solo la mostrará como definitiva cuando haya sido verificada en las bases vigentes."],
    stages: specific.stages ?? ["Revisar convocatoria y bases oficiales", "Preparar documentos", "Completar la postulación en el canal indicado por la institución"],
    importantDates: specific.importantDates ?? [{ label: "Fecha o estado publicado", date: scholarship.deadline }],
    ...specific,
  };
}

export function getScholarshipBySlug(slug: string) {
  return scholarships.find((scholarship) => scholarship.slug === slug);
}
