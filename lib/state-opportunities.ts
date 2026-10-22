export type PublicJobStatus = "Vigente" | "Próxima" | "Cerrada reciente" | "Sin convocatoria vigente";

export type PublicJobCategory =
  | "Docencia"
  | "Ingeniería y TI"
  | "Técnicos"
  | "Salud"
  | "Administración"
  | "Legal"
  | "Transporte y delivery"
  | "Varias";

export type PublicOpportunity = {
  slug: string;
  entity: string;
  title: string;
  category: PublicJobCategory;
  status: PublicJobStatus;
  regime: string;
  location: string;
  vacancies: number | null;
  publishedAt: string;
  closesAt: string;
  verifiedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  summary: string;
};

export const publicOpportunities: PublicOpportunity[] = [
  {
    slug: "sunarp-zrix-cas-061-2026",
    entity: "SUNARP · Zona Registral IX",
    title: "Asistente de Programación y Analista de Sistemas",
    category: "Ingeniería y TI",
    status: "Vigente",
    regime: "CAS · reemplazo",
    location: "Lima",
    vacancies: 2,
    publishedAt: "06/10/2026",
    closesAt: "20/10/2026 · postulación 21/10/2026",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://soycapaz.conadisperu.gob.pe/jobs/vacante-8bcff1e9?page=8",
    sourceLabel: "CONADIS / publicación de SUNARP",
    summary: "Proceso CAS N.° 061-2026-SUNARP-ZRIX: una plaza de Asistente de Programación y una de Analista de Sistemas. La ficha oficial difundida por CONADIS indica recepción de la postulación el 21 de octubre.",
  },
  {
    slug: "ipd-cas-062-069-2026",
    entity: "Instituto Peruano del Deporte (IPD)",
    title: "CAS 062 al 069-2026 · 16 plazas",
    category: "Varias",
    status: "Vigente",
    regime: "CAS",
    location: "Lima Metropolitana",
    vacancies: 16,
    publishedAt: "12/10/2026",
    closesAt: "23/10/2026 · postulación 26/10/2026",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://convocatorias.ipd.gob.pe/convocatorias/convocatorias/index.php",
    sourceLabel: "Portal oficial de convocatorias del IPD",
    summary: "Incluye analistas administrativos, especialistas en gestión y coordinación regional y perfiles de seguridad deportiva. El portal oficial del IPD muestra los procesos CAS 062 al 069-2026 como vigentes.",
  },
  {
    slug: "ministerio-publico-octubre-2026-6",
    entity: "Ministerio Público",
    title: "Convocatorias vigentes · 6 plazas",
    category: "Varias",
    status: "Vigente",
    regime: "Empleo público · revisar bases",
    location: "Perú · según proceso",
    vacancies: 6,
    publishedAt: "14/10/2026",
    closesAt: "27/10/2026",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://portal.mpfn.gob.pe/convoca/convocatorias",
    sourceLabel: "Portal oficial del Ministerio Público",
    summary: "Grupo de procesos difundido como disponible por una fuente oficial del Estado. El detalle de puestos, requisitos y forma de postulación se consulta en Convoca del Ministerio Público.",
  },
  {
    slug: "ministerio-publico-octubre-2026-3",
    entity: "Ministerio Público",
    title: "Convocatorias vigentes · 3 plazas",
    category: "Varias",
    status: "Vigente",
    regime: "Empleo público · revisar bases",
    location: "Perú · según proceso",
    vacancies: 3,
    publishedAt: "14/10/2026",
    closesAt: "27/10/2026",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://portal.mpfn.gob.pe/convoca/convocatorias",
    sourceLabel: "Portal oficial del Ministerio Público",
    summary: "Grupo de procesos difundido como disponible por una fuente oficial del Estado. El detalle de puestos, requisitos y forma de postulación se consulta en Convoca del Ministerio Público.",
  },
];
