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
    slug: "ucsp-beca-ingeniero-2027",
    institution: "Universidad Católica San Pablo",
    title: "Beca Ingeniero UCSP · Convocatoria 2027",
    status: "Abierta",
    level: "Pregrado",
    destination: "Arequipa, Perú",
    deadline: "Postulación hasta 25/10/2026",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://admision.ucsp.edu.pe/beca-ingeniero/",
    sourceLabel: "Admisión oficial de la UCSP",
    summary: "Concurso dirigido a jóvenes que cursan quinto de secundaria en 2026 o egresaron en 2025, con buen rendimiento académico y vocación por Ingeniería Electrónica y de Telecomunicaciones o Ingeniería Mecatrónica.",
    coverage: "Se otorgarán 6 becas que cubren el 100 % del valor de la cuota educativa de las carreras elegibles, sujeto al cumplimiento de los requisitos y etapas del concurso.",
  },
  {
    slug: "ubc-international-scholars-2027",
    institution: "University of British Columbia",
    title: "UBC International Scholars Program · Ingreso 2027",
    status: "Abierta",
    level: "Pregrado",
    destination: "Canadá",
    deadline: "15/11/2026 · 11:59 p. m. PST",
    verifiedAt: "17/10/2026",
    sourceUrl: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/",
    sourceLabel: "Portal oficial de admisiones de UBC",
    summary: "Programa para estudiantes internacionales que ingresan directamente desde secundaria, con rendimiento académico sobresaliente, liderazgo, impacto en su comunidad y necesidad económica significativa. La convocatoria para septiembre de 2027 está abierta.",
    coverage: "Ayuda financiera basada en necesidad económica y mérito, según la categoría de premio asignada por UBC. El programa ofrece apoyo para que estudiantes con necesidad financiera puedan cursar su primera carrera universitaria en la institución.",
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
