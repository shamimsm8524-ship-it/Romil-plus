import type { PublicOpportunity } from "@/lib/state-opportunities";

export type PriorityCareerJob = PublicOpportunity & {
  details: {
    processCode?: string;
    salary?: string;
    contractDuration?: string;
    workSchedule?: string;
    education?: string[];
    experience?: string[];
    requirements?: string[];
    functions?: string[];
    documents?: string[];
    positions?: Array<{ title: string; vacancies?: number | null; location?: string; salary?: string }>;
    applicationUrl?: string;
    applicationLabel?: string;
    applicationInstructions?: string;
    basesUrl?: string;
    notes?: string[];
  };
};

const sunarpSource = "https://soycapaz.conadisperu.gob.pe/jobs/vacante-8bcff1e9?page=8";
const teacherSource = "https://www.ugelgranchimu.gob.pe/contratos/convocatoria-de-plazas-para-contrato-docente/";
const teacherBases = "https://www.ugelgranchimu.gob.pe/wp-content/uploads/2026/10/Convocatoria-N-032.pdf";

export const priorityCareerJobs: PriorityCareerJob[] = [
  {
    slug: "sunarp-cas-061-2026-asistente-programacion",
    entity: "SUNARP · Zona Registral IX",
    title: "Asistente de Programación",
    category: "Ingeniería y TI",
    status: "Vigente",
    regime: "CAS · reemplazo",
    location: "Jesús María, Lima",
    vacancies: 1,
    publishedAt: "06/10/2026",
    closesAt: "Postulación: 21/10/2026 · 08:00 a 17:00",
    verifiedAt: "17/10/2026",
    sourceUrl: sunarpSource,
    sourceLabel: "Difusión oficial de CONADIS con convocatoria de SUNARP",
    summary: "Una plaza de Asistente de Programación para la Zona Registral IX. La convocatoria oficial difundida por CONADIS confirma el puesto, la vacante y el canal de postulación de SUNARP.",
    details: {
      processCode: "CAS N.° 061-2026-SUNARP-ZRIX · Asistente de Programación",
      salary: "Consultar la remuneración exacta en las bases vigentes del CAS N.° 061-2026-SUNARP-ZRIX.",
      education: ["Consultar la formación académica exacta exigida para Asistente de Programación en las bases vigentes del CAS N.° 061-2026-SUNARP-ZRIX."],
      experience: ["Consultar la experiencia general y específica exacta exigida para este puesto en las bases vigentes del proceso."],
      requirements: ["ROMIL PLUS no mostrará cursos o requisitos específicos como definitivos mientras no pueda contrastarlos directamente con las bases vigentes del proceso."],
      documents: ["Ficha de Inscripción del postulante (Anexo 2A).", "Guardar la ficha en un solo PDF con apellidos y nombres del postulante.", "Enviar el PDF a convocatoriascas_lima@sunarp.gob.pe el 21/10/2026, de 08:00 a 17:00.", "En el asunto colocar el proceso, apellidos y nombres y el puesto Asistente de Programación."],
      positions: [{ title: "Asistente de Programación", vacancies: 1, location: "Zona Registral IX · Jesús María, Lima", salary: "Según bases vigentes" }],
      applicationUrl: "mailto:convocatoriascas_lima@sunarp.gob.pe?subject=CAS%20N%C2%B0%20061-2026%20-%20APELLIDOS%20Y%20NOMBRES%20-%20ASISTENTE%20DE%20PROGRAMACION",
      applicationLabel: "Enviar al correo oficial de SUNARP",
      applicationInstructions: "La difusión oficial indica postulación el 21/10/2026 de 08:00 a 17:00 mediante el correo convocatoriascas_lima@sunarp.gob.pe, adjuntando el Anexo 2A en un solo PDF y usando el asunto indicado por la entidad.",
      notes: ["ROMIL PLUS no recibe CV ni documentos de postulación.", "Para remuneración, formación, experiencia y cursos, prevalecen las bases vigentes de SUNARP."],
    },
  },
  {
    slug: "sunarp-cas-061-2026-analista-sistemas",
    entity: "SUNARP · Zona Registral IX",
    title: "Analista de Sistemas",
    category: "Ingeniería y TI",
    status: "Vigente",
    regime: "CAS · reemplazo",
    location: "Jesús María, Lima",
    vacancies: 1,
    publishedAt: "06/10/2026",
    closesAt: "Postulación: 21/10/2026 · 08:00 a 17:00",
    verifiedAt: "17/10/2026",
    sourceUrl: sunarpSource,
    sourceLabel: "Difusión oficial de CONADIS con convocatoria de SUNARP",
    summary: "Una plaza de Analista de Sistemas para la Zona Registral IX. La convocatoria oficial difundida por CONADIS confirma el puesto, la vacante y el canal de postulación de SUNARP.",
    details: {
      processCode: "CAS N.° 061-2026-SUNARP-ZRIX · Analista de Sistemas",
      salary: "Consultar la remuneración exacta en las bases vigentes del CAS N.° 061-2026-SUNARP-ZRIX.",
      education: ["Consultar la formación académica exacta exigida para Analista de Sistemas en las bases vigentes del CAS N.° 061-2026-SUNARP-ZRIX."],
      experience: ["Consultar la experiencia general y específica exacta exigida para este puesto en las bases vigentes del proceso."],
      requirements: ["ROMIL PLUS no mostrará cursos o requisitos específicos como definitivos mientras no pueda contrastarlos directamente con las bases vigentes del proceso."],
      documents: ["Ficha de Inscripción del postulante (Anexo 2A).", "Guardar la ficha en un solo PDF con apellidos y nombres del postulante.", "Enviar el PDF a convocatoriascas_lima@sunarp.gob.pe el 21/10/2026, de 08:00 a 17:00.", "En el asunto colocar el proceso, apellidos y nombres y el puesto Analista de Sistemas."],
      positions: [{ title: "Analista de Sistemas", vacancies: 1, location: "Zona Registral IX · Jesús María, Lima", salary: "Según bases vigentes" }],
      applicationUrl: "mailto:convocatoriascas_lima@sunarp.gob.pe?subject=CAS%20N%C2%B0%20061-2026%20-%20APELLIDOS%20Y%20NOMBRES%20-%20ANALISTA%20DE%20SISTEMAS",
      applicationLabel: "Enviar al correo oficial de SUNARP",
      applicationInstructions: "La difusión oficial indica postulación el 21/10/2026 de 08:00 a 17:00 mediante el correo convocatoriascas_lima@sunarp.gob.pe, adjuntando el Anexo 2A en un solo PDF y usando el asunto indicado por la entidad.",
      notes: ["ROMIL PLUS no recibe CV ni documentos de postulación.", "Para remuneración, formación, experiencia y cursos, prevalecen las bases vigentes de SUNARP."],
    },
  },
  {
    slug: "ugel-gran-chimu-docente-matematica-jolluco-032-2026",
    entity: "UGEL Gran Chimú",
    title: "Docente de Matemática · I.E. 82548 Jolluco",
    category: "Docencia",
    status: "Vigente",
    regime: "Contrato docente 2026 · Etapa 3 por evaluación de expedientes",
    location: "Jolluco, Gran Chimú, La Libertad",
    vacancies: 1,
    publishedAt: "16/10/2026",
    closesAt: "Expedientes: 19 y 20/10/2026 · adjudicación 23/10/2026 09:30",
    verifiedAt: "17/10/2026",
    sourceUrl: teacherSource,
    sourceLabel: "UGEL Gran Chimú · Comunicado N.° 32-2026",
    summary: "Plaza de nivel Secundaria, especialidad Matemática, generada por reasignación de titular. Contrato hasta el 31 de diciembre de 2026.",
    details: {
      processCode: "Comunicado N.° 32-2026-UGELGCH",
      salary: "El comunicado no consigna un monto; la remuneración corresponde al régimen de contratación docente aplicable.",
      contractDuration: "Hasta el 31/12/2026.",
      education: ["Plaza para docente de Educación Básica Regular, nivel Secundaria, especialidad Matemática.", "La evaluación se realiza por expediente dentro de la Etapa 3 del proceso de contratación docente 2026."],
      experience: ["El Comunicado N.° 32 no fija un número adicional de años de experiencia; la evaluación se realiza con el expediente y conforme a la normativa del proceso de contratación docente."],
      requirements: ["Presentar expediente de postulación dentro del plazo oficial.", "Cumplir los requisitos del proceso de contratación docente por evaluación de expedientes para EBR."],
      documents: ["Expediente de postulación conforme al proceso de contrato docente.", "Presentación presencial o virtual a través de la Mesa de Partes de la UGEL Gran Chimú."],
      positions: [{ title: "Docente de Matemática · Secundaria", vacancies: 1, location: "I.E. 82548 · Jolluco", salary: "Según régimen de contratación docente" }],
      applicationUrl: teacherSource,
      applicationLabel: "Ver postulación oficial en UGEL",
      applicationInstructions: "Presenta el expediente el 19 o 20 de octubre de 2026, de forma presencial o virtual mediante la Mesa de Partes de la UGEL Gran Chimú. Evaluación: 21/10; reclamos y resultado final: 22/10; adjudicación: 23/10 a las 09:30 en la sede de la UGEL.",
      basesUrl: teacherBases,
      notes: ["Motivo de vacante: reasignación de titular."],
    },
  },
  {
    slug: "ugel-gran-chimu-docente-matematica-cruz-pampa-032-2026",
    entity: "UGEL Gran Chimú",
    title: "Docente de Matemática · I.E. 821168 Cruz Pampa",
    category: "Docencia",
    status: "Vigente",
    regime: "Contrato docente 2026 · Etapa 3 por evaluación de expedientes",
    location: "Cruz Pampa, Gran Chimú, La Libertad",
    vacancies: 1,
    publishedAt: "16/10/2026",
    closesAt: "Expedientes: 19 y 20/10/2026 · adjudicación 23/10/2026 09:30",
    verifiedAt: "17/10/2026",
    sourceUrl: teacherSource,
    sourceLabel: "UGEL Gran Chimú · Comunicado N.° 32-2026",
    summary: "Plaza de nivel Secundaria, especialidad Matemática, por cese temporal de titular. Contrato hasta el 11 de diciembre de 2026.",
    details: {
      processCode: "Comunicado N.° 32-2026-UGELGCH",
      salary: "El comunicado no consigna un monto; la remuneración corresponde al régimen de contratación docente aplicable.",
      contractDuration: "Hasta el 11/12/2026.",
      education: ["Plaza para docente de Educación Básica Regular, nivel Secundaria, especialidad Matemática.", "La evaluación se realiza por expediente dentro de la Etapa 3 del proceso de contratación docente 2026."],
      experience: ["El Comunicado N.° 32 no fija un número adicional de años de experiencia; la evaluación se realiza con el expediente y conforme a la normativa del proceso de contratación docente."],
      requirements: ["Presentar expediente de postulación dentro del plazo oficial.", "Cumplir los requisitos del proceso de contratación docente por evaluación de expedientes para EBR."],
      documents: ["Expediente de postulación conforme al proceso de contrato docente.", "Presentación presencial o virtual a través de la Mesa de Partes de la UGEL Gran Chimú."],
      positions: [{ title: "Docente de Matemática · Secundaria", vacancies: 1, location: "I.E. 821168 · Cruz Pampa", salary: "Según régimen de contratación docente" }],
      applicationUrl: teacherSource,
      applicationLabel: "Ver postulación oficial en UGEL",
      applicationInstructions: "Presenta el expediente el 19 o 20 de octubre de 2026, de forma presencial o virtual mediante la Mesa de Partes de la UGEL Gran Chimú. Evaluación: 21/10; reclamos y resultado final: 22/10; adjudicación: 23/10 a las 09:30 en la sede de la UGEL.",
      basesUrl: teacherBases,
      notes: ["Motivo de vacante: cese temporal de titular."],
    },
  },
];
