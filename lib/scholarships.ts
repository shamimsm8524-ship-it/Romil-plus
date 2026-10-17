export type ScholarshipStatus = "Abierta" | "Próxima" | "Cerrada";

export type Scholarship = {
  slug: string;
  institution: string;
  title: string;
  status: ScholarshipStatus;
  level: string;
  destination: string;
  deadline: string;
  verifiedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  summary: string;
  coverage: string;
};

export const scholarships: Scholarship[] = [
  {
    slug: "pronabec-beca-18-2027",
    institution: "PRONABEC",
    title: "Beca 18 · Convocatoria 2027",
    status: "Abierta",
    level: "Pregrado",
    destination: "Perú",
    deadline: "18/10/2026 · 11:59 a. m.",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://www.pronabec.gob.pe/beca-18/",
    sourceLabel: "Portal oficial de PRONABEC",
    summary: "Dirigida a estudiantes del último grado de secundaria o egresados con alto rendimiento académico que se encuentren en situación de pobreza, pobreza extrema o una condición de vulnerabilidad. La etapa vigente corresponde a la inscripción al Examen Nacional de Preselección (ENP).",
    coverage: "Beca integral con costos académicos y, según la modalidad y condición del hogar, beneficios no académicos como alimentación, alojamiento, movilidad, materiales y equipo de estudio.",
  },
  {
    slug: "pronabec-generacion-bicentenario-extraordinaria-2026",
    institution: "PRONABEC",
    title: "Beca Generación Bicentenario · Extraordinaria 2026",
    status: "Próxima",
    level: "Maestría y doctorado",
    destination: "Extranjero",
    deadline: "Postulación: 30/10/2026 al 13/11/2026",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://www.pronabec.gob.pe/beca-generacion-bicentenario/",
    sourceLabel: "Portal oficial de PRONABEC",
    summary: "Ofrece 20 becas integrales para profesionales peruanos con alto rendimiento académico e insuficientes recursos económicos que realizarán estudios de maestría o doctorado en instituciones elegibles del extranjero.",
    coverage: "Incluye matrícula, pensión de estudios, obtención del grado, investigación, transporte internacional, alojamiento, alimentación, movilidad local y seguro médico, según las bases del concurso.",
  },
];
