import { exactStateJobDetails } from "@/lib/exact-state-job-details";
import { exactStateJobs } from "@/lib/exact-state-jobs";
import { inpeJobDetails, inpeJobMeta } from "@/lib/inpe-job-details";
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

const sunarpDetails: JobDetailExtra = {
  processCode: "CAS N.° 061-2026-SUNARP-ZRIX",
  salary: "Asistente de Programación: S/ 2,500.00 · Analista de Sistemas: S/ 4,000.00",
  education: ["Universitaria completa: egresado/a de Ingeniería de Sistemas, Informática, Software o Computación."],
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
  notes: ["ROMIL PLUS no recibe CV ni documentos de postulación.", "Los dos puestos pertenecen al mismo proceso, pero tienen remuneración y cursos requeridos distintos."],
};

const sunarpJob = publicOpportunities.find((job) => job.slug === "sunarp-zrix-cas-061-2026");

export const detailedPublicJobs = [
  ...(sunarpJob ? [sunarpJob] : []),
  ...exactStateJobs,
];

const publicDetails: Record<string, JobDetailExtra> = {
  "sunarp-zrix-cas-061-2026": sunarpDetails,
  ...exactStateJobDetails,
};

const publicViews: JobDetailView[] = detailedPublicJobs.map((job) => ({
  ...job,
  details: publicDetails[job.slug] ?? {},
}));

const inpeViews: JobDetailView[] = inpeJobs.map((job) => {
  const meta = inpeJobMeta[job.slug];
  return {
    ...job,
    location: meta?.location ?? job.location,
    category: job.title.toLocaleLowerCase("es").includes("técnic")
      ? "Técnicos"
      : job.title.toLocaleLowerCase("es").includes("enfer") ||
          job.title.toLocaleLowerCase("es").includes("nutric") ||
          job.title.toLocaleLowerCase("es").includes("farmacia") ||
          job.title.toLocaleLowerCase("es").includes("seguridad y salud")
        ? "Salud"
        : job.title.toLocaleLowerCase("es").includes("legal") || job.title.toLocaleLowerCase("es").includes("contrataciones")
          ? "Legal"
          : "Administración",
    status: meta?.status ?? "Revisar cronograma",
    closesAt: meta?.closesAt ?? "Revisar cronograma oficial del proceso",
    details: inpeJobDetails[job.slug] ?? {},
  };
});

export const allJobDetails: JobDetailView[] = [
  ...publicViews,
  ...inpeViews,
];

export function getJobBySlug(slug: string) {
  return allJobDetails.find((job) => job.slug === slug);
}
