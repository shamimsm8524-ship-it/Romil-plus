import { jobs as inpeJobs } from "@/lib/jobs";
import { publicOpportunities } from "@/lib/state-opportunities";

export type JobPosition = {
  title: string;
  vacancies?: number | null;
  location?: string;
  salary?: string;
};

export type JobDetailExtra = {
  processCode?: string;
  salary?: string;
  contractDuration?: string;
  workSchedule?: string;
  education?: string[];
  experience?: string[];
  requirements?: string[];
  functions?: string[];
  documents?: string[];
  positions?: JobPosition[];
  applicationUrl?: string;
  applicationLabel?: string;
  applicationInstructions?: string;
  basesUrl?: string;
  notes?: string[];
};

export type JobDetailView = {
  slug: string;
  entity: string;
  title: string;
  category: string;
  status: string;
  regime: string;
  location: string;
  vacancies: number | null;
  publishedAt: string;
  closesAt: string;
  verifiedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  summary: string;
  details: JobDetailExtra;
};

const manualDetails: Record<string, JobDetailExtra> = {
  "sunarp-zrix-cas-061-2026": {
    processCode: "CAS N.° 061-2026-SUNARP-ZRIX",
    salary: "Asistente de Programación: S/ 2,500.00 · Analista de Sistemas: S/ 4,000.00",
    education: [
      "Universitaria completa: egresado/a de Ingeniería de Sistemas, Informática, Software o Computación.",
    ],
    experience: [
      "Experiencia laboral general: dos (02) años en el sector público o privado.",
      "Experiencia específica en la función o materia: un (01) año, con nivel mínimo desde prácticas profesionales.",
    ],
    requirements: [
      "Asistente de Programación: Programación Estructurada (20 horas acumuladas) o Java y ASP.Net (30 horas acumuladas).",
      "Asistente de Programación: PHP, Angular u Oracle Database (30 horas acumuladas) o SQL Server (20 horas acumuladas).",
      "Analista de Sistemas: curso de Desarrollo de Software (12 horas acumuladas).",
      "Analista de Sistemas: Power Builder (20 horas acumuladas).",
      "Analista de Sistemas: Angular, Java, PHP o Programación Estructurada (30 horas acumuladas).",
    ],
    documents: [
      "Ficha de Inscripción de postulante (Anexo 2A).",
      "Enviar la ficha en un solo archivo PDF guardado con los apellidos y nombres del postulante.",
      "Remitir el PDF al correo oficial convocatoriascas_lima@sunarp.gob.pe el 21/10/2026, de 08:00 a 17:00.",
      "En el asunto colocar: CAS N° 061-2026, APELLIDOS Y NOMBRES + PUESTO al que postula.",
    ],
    positions: [
      { title: "Asistente de Programación", vacancies: 1, location: "Unidad de Tecnologías de la Información · Av. Edgardo Rebagliati 561, Jesús María, Lima", salary: "S/ 2,500.00" },
      { title: "Analista de Sistemas", vacancies: 1, location: "Unidad de Tecnologías de la Información · Av. Edgardo Rebagliati 561, Jesús María, Lima", salary: "S/ 4,000.00" },
    ],
    applicationUrl: "mailto:convocatoriascas_lima@sunarp.gob.pe?subject=CAS%20N%C2%B0%20061-2026%20-%20APELLIDOS%20Y%20NOMBRES%20-%20PUESTO",
    applicationLabel: "Enviar al correo oficial de SUNARP",
    applicationInstructions: "La postulación se realiza por correo institucional de SUNARP el 21 de octubre de 2026, de 08:00 a 17:00. Adjunta la Ficha de Inscripción (Anexo 2A) en un solo PDF e indica en el asunto el proceso, tus apellidos y nombres y el puesto al que postulas.",
    notes: [
      "ROMIL PLUS no recibe CV ni documentos de postulación.",
      "Los dos puestos pertenecen al mismo proceso, pero tienen remuneración y cursos requeridos distintos.",
    ],
  },
  "ipd-cas-062-069-2026": {
    processCode: "CAS 062 al 069-2026",
    applicationUrl: "https://convocatorias.ipd.gob.pe/convocatorias/convocatorias/index.php",
    applicationLabel: "Ir al portal oficial de postulación",
    applicationInstructions: "En el portal del IPD selecciona el número de proceso correspondiente y usa únicamente la opción de postulación habilitada por la entidad.",
  },
  "ministerio-publico-octubre-2026-6": {
    applicationUrl: "https://portal.mpfn.gob.pe/convoca/convocatorias",
    applicationLabel: "Ir a Convoca del Ministerio Público",
    applicationInstructions: "Ubica el proceso por cargo o número de convocatoria y revisa la ficha antes de registrar la postulación.",
  },
  "ministerio-publico-octubre-2026-3": {
    applicationUrl: "https://portal.mpfn.gob.pe/convoca/convocatorias",
    applicationLabel: "Ir a Convoca del Ministerio Público",
    applicationInstructions: "Ubica el proceso por cargo o número de convocatoria y revisa la ficha antes de registrar la postulación.",
  },
  "pcm-octubre-2026": {
    applicationUrl: "https://convocatorias.pcm.gob.pe/",
    applicationLabel: "Ir al sistema oficial de la PCM",
    applicationInstructions: "Selecciona la convocatoria correspondiente dentro del sistema de la PCM y continúa con el registro oficial de postulación.",
  },
  "minem-octubre-2026-3": {
    applicationUrl: "https://pad2.minem.gob.pe/ConvocaMinem_Portal",
    applicationLabel: "Ir a Convoca MINEM",
    applicationInstructions: "Busca el proceso vigente en Convoca MINEM y utiliza la opción de postulación de esa misma ficha.",
  },
  "minem-octubre-2026-2": {
    applicationUrl: "https://pad2.minem.gob.pe/ConvocaMinem_Portal",
    applicationLabel: "Ir a Convoca MINEM",
    applicationInstructions: "Busca el proceso vigente en Convoca MINEM y utiliza la opción de postulación de esa misma ficha.",
  },
  "programa-mac-005-2026": {
    processCode: "005-2026-PMAC-UA",
    applicationUrl: "https://convocatorias.mac.gob.pe:9443/",
    applicationLabel: "Ir al sistema oficial de postulación",
    applicationInstructions: "Ingresa al sistema oficial del Programa MAC, ubica el concurso 005-2026-PMAC-UA y continúa desde la opción de postulación del proceso.",
  },
  "ositran-octubre-2026": {
    applicationUrl: "http://oportunidadlaboral.ositran.gob.pe/convocatoria",
    applicationLabel: "Ir a Oportunidad Laboral OSITRAN",
    applicationInstructions: "Abre la convocatoria vigente dentro del portal de OSITRAN y utiliza la opción institucional indicada para postular.",
  },
  "corte-huaura-octubre-2026": {
    positions: [
      { title: "Analistas" },
      { title: "Asistentes administrativos" },
      { title: "Secretarios judiciales" },
      { title: "Trabajadores sociales" },
      { title: "Especialistas judiciales" },
      { title: "Cajeros" },
      { title: "Técnicos judiciales" },
    ],
    applicationUrl: "https://aplicativo.pj.gob.pe/psep/wfrmConvocatoriasV.aspx?TCon=C",
    applicationLabel: "Ir al sistema PSEP",
    applicationInstructions: "En PSEP identifica la convocatoria de la Corte Superior de Justicia de Huaura y entra a la ficha del puesto que te interesa antes de postular.",
  },
  "corte-huanuco-octubre-2026": {
    applicationUrl: "https://aplicativo.pj.gob.pe/psep/wfrmConvocatoriasV.aspx?TCon=C",
    applicationLabel: "Ir al sistema PSEP",
    applicationInstructions: "En PSEP identifica la convocatoria de la Corte Superior de Justicia de Huánuco y entra a la ficha del puesto antes de postular.",
  },
  "mininter-octubre-2026": {
    applicationUrl: "https://aplicaciones.mininter.gob.pe/sisconvir/convocatorias/index",
    applicationLabel: "Ir a SISCONVIR",
    applicationInstructions: "Ubica la convocatoria en SISCONVIR y continúa únicamente desde la opción oficial de postulación del Ministerio del Interior.",
  },
  "ugel-gran-chimu-docente-octubre-2026": {
    processCode: "Convocatoria N.° 032",
    applicationInstructions: "La postulación se realiza según el cronograma y el mecanismo indicado por la UGEL. Revisa la convocatoria N.° 032 antes de presentar el expediente.",
  },
  "drec-contratacion-docente-octubre-2026": {
    applicationInstructions: "Revisa el cronograma, plazas y mecanismo de presentación publicado por la DREC para el nivel educativo correspondiente.",
  },
  "cuna-mas-setiembre-octubre-2026": {
    applicationUrl: "http://extranet.cunamas.gob.pe/jobs",
    applicationLabel: "Ir al portal CAS de Cuna Más",
    applicationInstructions: "El proceso registrado ya cerró. Usa este portal oficial para revisar si Cuna Más publica una nueva convocatoria.",
  },
};

for (const job of inpeJobs) {
  manualDetails[job.slug] = {
    ...(manualDetails[job.slug] ?? {}),
    applicationInstructions: "Abre el portal oficial del INPE, ubica el número de convocatoria indicado en la ficha y revisa las bases, anexos y cronograma antes de presentar documentos.",
    notes: ["El INPE publica varios procesos en una misma página; ROMIL PLUS no marcará un botón como postulación directa si no existe una URL estable para ese proceso."],
  };
}

const publicViews: JobDetailView[] = publicOpportunities.map((job) => ({
  ...job,
  details: manualDetails[job.slug] ?? {},
}));

const inpeViews: JobDetailView[] = inpeJobs.map((job) => ({
  ...job,
  category: job.title.toLocaleLowerCase("es").includes("técnic") ? "Técnicos" : job.title.toLocaleLowerCase("es").includes("enfer") || job.title.toLocaleLowerCase("es").includes("nutric") || job.title.toLocaleLowerCase("es").includes("farmacia") ? "Salud" : job.title.toLocaleLowerCase("es").includes("legal") ? "Legal" : "Administración",
  status: "Revisar cronograma",
  closesAt: "Revisar cronograma oficial del proceso",
  details: manualDetails[job.slug] ?? {},
}));

export const allJobDetails: JobDetailView[] = [
  ...publicViews,
  ...inpeViews.filter((legacy) => !publicViews.some((item) => item.slug === legacy.slug)),
];

export function getJobBySlug(slug: string) {
  return allJobDetails.find((job) => job.slug === slug);
}

export function fieldOrOfficial(value?: string) {
  return value || "Revisa este dato en las bases oficiales del proceso.";
}
