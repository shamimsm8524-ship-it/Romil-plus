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
    status: "Cerrada reciente",
    regime: "CAS · reemplazo",
    location: "Unidad de Tecnologías de la Información · Av. Edgardo Rebagliati 561, Jesús María, Lima",
    vacancies: 1,
    publishedAt: "06/10/2026",
    closesAt: "Postulación cerró el 21/10/2026 · 08:00 a 17:00",
    verifiedAt: "22/10/2026",
    sourceUrl: sunarpSource,
    sourceLabel: "Difusión oficial de CONADIS con convocatoria de SUNARP",
    summary: "CAS N.° 061-2026-SUNARP-ZRIX para una plaza de Asistente de Programación en la Unidad de Tecnologías de la Información de la Zona Registral IX.",
    details: {
      processCode: "CAS N.° 061-2026-SUNARP-ZRIX · Asistente de Programación",
      salary: "S/ 2,500.00",
      education: [
        "Egresado universitario de Ingeniería de Sistemas, Ingeniería Informática, Ingeniería de Software, Ingeniería de Computación o carreras afines previstas en el perfil.",
      ],
      experience: [
        "Experiencia general: dos (02) años.",
        "Experiencia específica: un (01) año en funciones relacionadas, contabilizada desde el nivel de practicante profesional según las bases del proceso.",
      ],
      requirements: [
        "Curso de Programación Estructurada con mínimo 20 horas acumuladas, o cursos de Java y ASP.NET con mínimo 30 horas acumuladas.",
        "Curso de PHP, Angular u Oracle Database con mínimo 30 horas acumuladas, o SQL Server con mínimo 20 horas, según las alternativas señaladas en el perfil.",
      ],
      documents: [
        "Ficha de Inscripción del postulante (Anexo 2A).",
        "Guardar la ficha en un solo archivo PDF identificado con apellidos y nombres del postulante.",
        "Enviar el PDF al correo convocatoriascas_lima@sunarp.gob.pe dentro del horario de postulación.",
        "Usar en el asunto el número de proceso, apellidos y nombres y el puesto Asistente de Programación.",
      ],
      positions: [{ title: "Asistente de Programación", vacancies: 1, location: "Unidad de Tecnologías de la Información · Jesús María, Lima", salary: "S/ 2,500.00" }],
      applicationUrl: sunarpSource,
      applicationLabel: "Ver convocatoria cerrada de SUNARP",
      applicationInstructions: "La recepción de postulaciones terminó el 21/10/2026. Se conserva la ficha para consulta de requisitos y trazabilidad de la fuente oficial.",
      notes: ["Al 22/10/2026 el plazo de postulación ya terminó; RomilPlus no muestra un botón activo de envío de candidatura."],
    },
  },
  {
    slug: "sunarp-cas-061-2026-analista-sistemas",
    entity: "SUNARP · Zona Registral IX",
    title: "Analista de Sistemas",
    category: "Ingeniería y TI",
    status: "Cerrada reciente",
    regime: "CAS · reemplazo",
    location: "Unidad de Tecnologías de la Información · Av. Edgardo Rebagliati 561, Jesús María, Lima",
    vacancies: 1,
    publishedAt: "06/10/2026",
    closesAt: "Postulación cerró el 21/10/2026 · 08:00 a 17:00",
    verifiedAt: "22/10/2026",
    sourceUrl: sunarpSource,
    sourceLabel: "Difusión oficial de CONADIS con convocatoria de SUNARP",
    summary: "CAS N.° 061-2026-SUNARP-ZRIX para una plaza de Analista de Sistemas en la Unidad de Tecnologías de la Información de la Zona Registral IX.",
    details: {
      processCode: "CAS N.° 061-2026-SUNARP-ZRIX · Analista de Sistemas",
      salary: "S/ 4,000.00",
      education: [
        "Egresado universitario de Ingeniería de Sistemas, Ingeniería Informática, Ingeniería de Software, Ingeniería de Computación o carreras afines previstas en el perfil.",
      ],
      experience: [
        "Experiencia general: dos (02) años.",
        "Experiencia específica: un (01) año en funciones relacionadas, contabilizada desde el nivel de practicante profesional según las bases del proceso.",
      ],
      requirements: [
        "Curso de Desarrollo de Software con mínimo 12 horas.",
        "Curso de PowerBuilder con mínimo 20 horas.",
        "Curso de Angular, Java, PHP o Programación Estructurada con mínimo 30 horas acumuladas, conforme al perfil publicado.",
      ],
      documents: [
        "Ficha de Inscripción del postulante (Anexo 2A).",
        "Guardar la ficha en un solo archivo PDF identificado con apellidos y nombres del postulante.",
        "Enviar el PDF al correo convocatoriascas_lima@sunarp.gob.pe dentro del horario de postulación.",
        "Usar en el asunto el número de proceso, apellidos y nombres y el puesto Analista de Sistemas.",
      ],
      positions: [{ title: "Analista de Sistemas", vacancies: 1, location: "Unidad de Tecnologías de la Información · Jesús María, Lima", salary: "S/ 4,000.00" }],
      applicationUrl: sunarpSource,
      applicationLabel: "Ver convocatoria cerrada de SUNARP",
      applicationInstructions: "La recepción de postulaciones terminó el 21/10/2026. Se conserva la ficha para consulta de requisitos y trazabilidad de la fuente oficial.",
      notes: ["Al 22/10/2026 el plazo de postulación ya terminó; RomilPlus no muestra un botón activo de envío de candidatura."],
    },
  },
  {
    slug: "ugel-gran-chimu-docente-matematica-jolluco-032-2026",
    entity: "UGEL Gran Chimú",
    title: "Docente de Matemática · I.E. 82548 Jolluco",
    category: "Docencia",
    status: "Cerrada reciente",
    regime: "Contrato docente 2026 · Etapa 3 por evaluación de expedientes",
    location: "Jolluco, Gran Chimú, La Libertad",
    vacancies: 1,
    publishedAt: "16/10/2026",
    closesAt: "Recepción de expedientes cerró el 20/10/2026 · adjudicación 23/10/2026 09:30",
    verifiedAt: "22/10/2026",
    sourceUrl: teacherSource,
    sourceLabel: "UGEL Gran Chimú · Comunicado N.° 32-2026",
    summary: "Plaza de nivel Secundaria, especialidad Matemática, generada por reasignación de titular. La recepción de expedientes ya concluyó; el proceso continúa con evaluación y adjudicación.",
    details: {
      processCode: "Comunicado N.° 32-2026-UGELGCH",
      salary: "El comunicado no consigna un monto; la remuneración corresponde al régimen de contratación docente aplicable.",
      contractDuration: "Hasta el 31/12/2026.",
      education: ["Plaza para docente de Educación Básica Regular, nivel Secundaria, especialidad Matemática.", "La evaluación corresponde a la Etapa 3 del proceso de contratación docente 2026 por evaluación de expedientes."],
      experience: ["El Comunicado N.° 32 no fija un número adicional de años de experiencia; la evaluación se realiza con el expediente y conforme a la normativa del proceso de contratación docente."],
      requirements: ["Cumplir los requisitos del proceso de contratación docente por evaluación de expedientes para EBR.", "Haber presentado el expediente dentro del plazo oficial del 19 al 20 de octubre de 2026."],
      documents: ["Expediente de postulación conforme al proceso de contrato docente.", "Presentación presencial o virtual a través de la Mesa de Partes de la UGEL Gran Chimú dentro del plazo establecido."],
      positions: [{ title: "Docente de Matemática · Secundaria", vacancies: 1, location: "I.E. 82548 · Jolluco", salary: "Según régimen de contratación docente" }],
      applicationUrl: teacherSource,
      applicationLabel: "Ver proceso de UGEL",
      applicationInstructions: "La recepción de expedientes terminó el 20/10/2026. Evaluación: 21/10; reclamos y resultado final: 22/10; adjudicación: 23/10 a las 09:30 en la sede de la UGEL.",
      basesUrl: teacherBases,
      notes: ["Motivo de vacante: reasignación de titular."],
    },
  },
  {
    slug: "ugel-gran-chimu-docente-matematica-cruz-pampa-032-2026",
    entity: "UGEL Gran Chimú",
    title: "Docente de Matemática · I.E. 821168 Cruz Pampa",
    category: "Docencia",
    status: "Cerrada reciente",
    regime: "Contrato docente 2026 · Etapa 3 por evaluación de expedientes",
    location: "Cruz Pampa, Gran Chimú, La Libertad",
    vacancies: 1,
    publishedAt: "16/10/2026",
    closesAt: "Recepción de expedientes cerró el 20/10/2026 · adjudicación 23/10/2026 09:30",
    verifiedAt: "22/10/2026",
    sourceUrl: teacherSource,
    sourceLabel: "UGEL Gran Chimú · Comunicado N.° 32-2026",
    summary: "Plaza de nivel Secundaria, especialidad Matemática, por cese temporal de titular. La recepción de expedientes ya concluyó; el proceso continúa con evaluación y adjudicación.",
    details: {
      processCode: "Comunicado N.° 32-2026-UGELGCH",
      salary: "El comunicado no consigna un monto; la remuneración corresponde al régimen de contratación docente aplicable.",
      contractDuration: "Hasta el 11/12/2026.",
      education: ["Plaza para docente de Educación Básica Regular, nivel Secundaria, especialidad Matemática.", "La evaluación corresponde a la Etapa 3 del proceso de contratación docente 2026 por evaluación de expedientes."],
      experience: ["El Comunicado N.° 32 no fija un número adicional de años de experiencia; la evaluación se realiza con el expediente y conforme a la normativa del proceso de contratación docente."],
      requirements: ["Cumplir los requisitos del proceso de contratación docente por evaluación de expedientes para EBR.", "Haber presentado el expediente dentro del plazo oficial del 19 al 20 de octubre de 2026."],
      documents: ["Expediente de postulación conforme al proceso de contrato docente.", "Presentación presencial o virtual a través de la Mesa de Partes de la UGEL Gran Chimú dentro del plazo establecido."],
      positions: [{ title: "Docente de Matemática · Secundaria", vacancies: 1, location: "I.E. 821168 · Cruz Pampa", salary: "Según régimen de contratación docente" }],
      applicationUrl: teacherSource,
      applicationLabel: "Ver proceso de UGEL",
      applicationInstructions: "La recepción de expedientes terminó el 20/10/2026. Evaluación: 21/10; reclamos y resultado final: 22/10; adjudicación: 23/10 a las 09:30 en la sede de la UGEL.",
      basesUrl: teacherBases,
      notes: ["Motivo de vacante: cese temporal de titular."],
    },
  },
];
