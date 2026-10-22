import type { JobDetailView } from "@/lib/job-details";

const applyUrl = "http://concas.mtc.gob.pe/";
const sourceUrl = "https://www.gob.pe/institucion/mtc/informes-publicaciones/tipos/107-concurso-publico";

const common = {
  entity: "Ministerio de Transportes y Comunicaciones (MTC)",
  status: "Vigente" as const,
  regime: "CAS",
  location: "Lima, Lima",
  vacancies: 1,
  publishedAt: "14/10/2026",
  closesAt: "Postulación hasta 27/10/2026 · registrar candidatura en CONCAS según cronograma",
  verifiedAt: "22/10/2026",
  sourceUrl,
  sourceLabel: "MTC / perfil difundido en Talento Perú y sistema institucional CONCAS",
};

function apply(code: string) {
  return {
    applicationUrl: applyUrl,
    applicationLabel: "Postular en CONCAS del MTC",
    applicationInstructions: `Ingresa al sistema oficial CONCAS del MTC, ubica el proceso ${code} y registra tu postulación dentro de la fecha y horario del cronograma.`,
    basesUrl: sourceUrl,
  };
}

export const mtcJobDetails: JobDetailView[] = [
  {
    ...common,
    slug: "mtc-cas-016-2026-asistente-administrativo-dgppc",
    title: "Asistente Administrativo · DGPPC · CAS 016-2026",
    category: "Administración",
    summary: "Una plaza de Asistente Administrativo para la DGPPC del MTC.",
    details: {
      processCode: "CAS 016-2026",
      salary: "S/ 5,364.19",
      education: ["Título técnico superior de 3 o 4 años en Administración, Asistente de Gerencia o Secretariado; o bachiller universitario en Administración."],
      experience: [
        "Experiencia general: cuatro (04) años en el sector público y/o privado.",
        "Experiencia específica: tres (03) años en la función o materia en el sector público y/o privado.",
        "Dentro de la experiencia específica: un (01) año como Auxiliar Administrativo, Asistente o puesto con funciones equivalentes.",
        "Experiencia en el sector público: un (01) año en la función o materia.",
      ],
      requirements: [
        "Cursos con mínimo 40 horas acumulativas en Gestión Documental y/o Archivo y/o sistemas administrativos del Estado (SIGA/SIAF).",
        "Conocimientos de la Ley del Procedimiento Administrativo General N.° 27444, gestión documental y gestión de archivo.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel básico.",
        "Competencias: trabajo en equipo, organización de la información, vocación de servicio y orden.",
      ],
      ...apply("CAS 016-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-017-2026-especialista-legal-saneamiento-bienes",
    title: "Especialista Legal en Saneamiento y Administración de Bienes Inmuebles · OPAT · CAS 017-2026",
    category: "Legal",
    summary: "Una plaza legal especializada en saneamiento y administración de bienes inmuebles para la OPAT.",
    details: {
      processCode: "CAS 017-2026",
      salary: "S/ 9,364.19",
      education: ["Título universitario en Derecho.", "Colegiatura y habilitación profesional vigente, sustentada con documento."],
      experience: [
        "Experiencia general: tres (03) años en el sector público y/o privado.",
        "Experiencia específica: dos (02) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: dos (02) años en la función o materia.",
        "Disponibilidad para viajar al interior del país.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en Derecho Administrativo y/o Derecho Registral.",
        "Curso de mínimo 8 horas acumulativas en saneamiento de predios de propiedad estatal.",
        "Conocimientos técnico-normativos sobre gestión de propiedad estatal, contrataciones del Estado, procedimiento administrativo general, adquisición y expropiación de inmuebles, transferencia de inmuebles del Estado y liberación de interferencias.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel básico.",
        "Competencias: capacidad de análisis, trabajo en equipo, orientación a resultados y proactividad.",
      ],
      ...apply("CAS 017-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-018-2026-especialista-saneamiento-bienes",
    title: "Especialista en Saneamiento de Bienes · OPAT · CAS 018-2026",
    category: "Administración",
    summary: "Una plaza de Especialista en Saneamiento de Bienes para la OPAT del MTC.",
    details: {
      processCode: "CAS 018-2026",
      salary: "S/ 6,864.19",
      education: ["Título universitario en Ingeniería Civil.", "Colegiatura y habilitación profesional vigente, sustentada con documento."],
      experience: [
        "Experiencia general: cinco (05) años en el sector público y/o privado.",
        "Experiencia específica: tres (03) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: un (01) año en la función o materia.",
        "Disponibilidad para viajar al interior del país.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en Gestión de Bienes Muebles e Inmuebles de Propiedad Estatal, Saneamiento Físico Legal de Predios o afines.",
        "Cursos con mínimo 40 horas acumulativas en Gestión Patrimonial y/o Sistema Nacional de Bienes Estatales.",
        "Conocimientos de saneamiento físico-legal de predios e inmuebles, gestión y administración de bienes inmuebles del Estado, gestión patrimonial, control de bienes estatales, normativa sobre predios de propiedad estatal y Ley N.° 29151.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel básico.",
        "Competencias: trabajo en equipo, orientación a resultados, orden y capacidad de planificación y organización.",
      ],
      ...apply("CAS 018-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-019-2026-coordinador-gestion-social-odgs",
    title: "Coordinador/a de Gestión Social · ODGS · CAS 019-2026",
    category: "Administración",
    summary: "Una plaza de Coordinador/a de Gestión Social para la ODGS del MTC.",
    details: {
      processCode: "CAS 019-2026",
      salary: "S/ 10,364.19",
      education: ["Título universitario en Antropología, Ciencias de la Comunicación, Ciencias Políticas, Derecho o Sociología."],
      experience: [
        "Experiencia general: ocho (08) años en el sector público y/o privado.",
        "Experiencia específica: seis (06) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: un (01) año en la función o materia.",
        "Disponibilidad para viajar al interior del país.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en Resolución de Conflictos y/o Gestión Social y/o Gestión de Proyectos.",
        "Cursos con mínimo 40 horas acumulativas relacionados con impacto socioambiental y/o estrategias de comunicación o afines.",
        "Conocimientos en relaciones comunitarias, relaciones interinstitucionales y solución de conflictos.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel básico.",
        "Competencias: negociación, control, organización de la información y análisis.",
      ],
      ...apply("CAS 019-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-020-2026-especialista-afectaciones-prediales-odgs",
    title: "Especialista en Afectaciones Prediales · ODGS · CAS 020-2026",
    category: "Legal",
    summary: "Una plaza de Especialista en Afectaciones Prediales para la ODGS del MTC.",
    details: {
      processCode: "CAS 020-2026",
      salary: "S/ 9,364.19",
      education: ["Título universitario en Derecho.", "Egresado de maestría en Derecho Civil y/o Derecho Procesal y/o Derecho Administrativo o afines."],
      experience: [
        "Experiencia general: tres (03) años en el sector público y/o privado.",
        "Experiencia específica: dos (02) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: dos (02) años en la función o materia.",
        "Disponibilidad para viajar al interior del país.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en Formalización de la Propiedad Predial o afines.",
        "Cursos con mínimo 40 horas acumulativas en proyectos de infraestructura y/o saneamiento físico legal de bienes e inmuebles o afines.",
        "Conocimientos en relaciones comunitarias y/o adquisición y expropiación de bienes inmuebles y/o arbitraje y/o Leyes N.° 30025, 27628 y 30230.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel básico.",
        "Competencias: análisis, control, planificación y organización, y organización de la información.",
      ],
      ...apply("CAS 020-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-021-2026-analista-programador-odtd",
    title: "Analista Programador · ODTD · CAS 021-2026",
    category: "Ingeniería y TI",
    summary: "Una plaza de Analista Programador para la ODTD del MTC.",
    details: {
      processCode: "CAS 021-2026",
      salary: "S/ 6,364.19",
      education: ["Bachiller o egresado universitario en Ingeniería en Computación y Sistemas o Ingeniería Informática."],
      experience: [
        "Experiencia general: cinco (05) años en el sector público y/o privado.",
        "Experiencia específica: dos (02) años en la función o materia en el sector público y/o privado.",
        "Dos (02) años de experiencia específica como Analista o puesto equivalente.",
        "Experiencia en el sector público: un (01) año como Analista o puesto equivalente en la función o materia.",
      ],
      requirements: [
        "Curso en Administración de Base de Datos, mínimo 12 horas.",
        "Curso de Programación con Microsoft ADO.NET, mínimo 12 horas.",
        "Conocimientos en lenguajes de programación .NET C#, base de datos y MS Project.",
        "Competencias: trabajo en equipo, iniciativa, orientación a resultados y capacidad de análisis y síntesis.",
      ],
      ...apply("CAS 021-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-022-2026-analista-legal-dgc",
    title: "Analista Legal · DGC · CAS 022-2026",
    category: "Legal",
    summary: "Una plaza de Analista Legal para la DGC del MTC.",
    details: {
      processCode: "CAS 022-2026",
      salary: "S/ 7,364.19",
      education: ["Título universitario en Derecho o Derecho y Ciencias Políticas.", "Colegiatura y habilitación profesional vigente, sustentada con documento."],
      experience: [
        "Experiencia general: cinco (05) años en el sector público y/o privado.",
        "Experiencia específica: cuatro (04) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: dos (02) años en la función o materia.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en regulación, supervisión de servicios públicos de telecomunicaciones o Derecho Administrativo.",
        "Conocimientos de Ley N.° 27444, reglamentación general de telecomunicaciones, ISO 37001, DS N.° 004-2021-MTC y servicios públicos.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel básico.",
        "Competencias: capacidad de análisis, orden, planificación y orientación a resultados.",
      ],
      ...apply("CAS 022-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-023-2026-coordinador-proyectos-dgi",
    title: "Coordinador de Proyectos · DGI · CAS 023-2026",
    category: "Administración",
    summary: "Una plaza de Coordinador de Proyectos para la DGI del MTC.",
    details: {
      processCode: "CAS 023-2026",
      salary: "S/ 10,364.19",
      education: [
        "Título universitario en Administración, Arquitectura, Economía, Ingeniería Civil, Ingeniería de Transportes, Ingeniería Económica, Ingeniería Industrial o Sociología.",
        "Colegiatura y habilitación profesional vigente, sustentada con documento.",
        "Egresado de maestría en Gestión Pública o Gestión de Proyectos.",
      ],
      experience: [
        "Experiencia general: seis (06) años en el sector público y/o privado.",
        "Experiencia específica: cinco (05) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: dos (02) años en la función o materia.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en Inversión Pública o Transporte Urbano.",
        "Cursos con mínimo 40 horas acumulativas en Planeamiento Estratégico Institucional y/o Programación Multianual y/o Presupuesto Público y/o Gestión de Inversiones.",
        "Conocimientos en formulación y evaluación de proyectos de inversión, Invierte.pe, Sistema Nacional de Programación Multianual y Política Nacional de Transporte Urbano.",
        "Procesador de texto, hojas de cálculo y presentaciones a nivel intermedio.",
        "Competencias: organización de información, planificación, orientación a resultados y control.",
      ],
      ...apply("CAS 023-2026"),
    },
  },
  {
    ...common,
    slug: "mtc-cas-024-2026-especialista-procesos-innovacion-odm",
    title: "Especialista en Gestión por Procesos e Innovación · ODM · CAS 024-2026",
    category: "Administración",
    summary: "Una plaza de Especialista en Gestión por Procesos e Innovación para la ODM del MTC.",
    details: {
      processCode: "CAS 024-2026",
      salary: "S/ 8,364.19",
      education: ["Bachiller universitario en Ingeniería Industrial."],
      experience: [
        "Experiencia general: cinco (05) años en el sector público y/o privado.",
        "Experiencia específica: cuatro (04) años en la función o materia en el sector público y/o privado.",
        "Experiencia en el sector público: tres (03) años en la función o materia.",
      ],
      requirements: [
        "Programa, curso de especialización y/o diplomado en Sistemas Integrados de Gestión de Calidad.",
        "Curso con mínimo 40 horas acumulativas en Gestión por Procesos.",
        "Conocimientos en gestión por procesos, modernización de la gestión pública y análisis de calidad regulatoria.",
        "Office, Bizagi y MS Project a nivel intermedio.",
        "Competencias: trabajo en equipo, orientación a resultados, capacidad de análisis, planificación y organización.",
      ],
      ...apply("CAS 024-2026"),
    },
  },
];
