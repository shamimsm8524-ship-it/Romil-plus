import { detailedPublicJobs } from "@/lib/job-details";

export type JobListingSpecs = {
  employmentType: string;
  hours: string;
  schedule: string;
  salary: string;
  experience: string;
  education: string;
};

const NOT_PUBLISHED = "No publicado por la fuente";

function compactList(values?: string[]) {
  if (!values?.length) return NOT_PUBLISHED;
  const visible = values.slice(0, 2).join(" ");
  return values.length > 2 ? `${visible} Revisa la fuente para requisitos adicionales.` : visible;
}

function inferEmploymentType(regime: string) {
  const value = regime.toLocaleLowerCase("es");
  if (value.includes("part time") || value.includes("tiempo parcial")) return "Tiempo parcial";
  if (value.includes("full time") || value.includes("tiempo completo")) return "Tiempo completo";
  if (value.includes("práctica") || value.includes("practica")) return "Prácticas";
  if (value.includes("cas")) return "CAS";
  return regime || NOT_PUBLISHED;
}

function hoursFromSchedule(schedule?: string) {
  if (!schedule) return NOT_PUBLISHED;
  const match = schedule.match(/(?:\d+(?:[.,]\d+)?\s*(?:horas?|h)\b[^.;]*)/i);
  return match?.[0]?.trim() || NOT_PUBLISHED;
}

function salaryFromPositions(
  positions?: Array<{ salary?: string }>,
) {
  const values = Array.from(new Set((positions ?? []).map((item) => item.salary).filter(Boolean))) as string[];
  if (!values.length) return undefined;
  if (values.length <= 3) return values.join(" / ");
  return `${values.slice(0, 3).join(" / ")} · según puesto`;
}

/*
 * Datos concretos mostrados en las tarjetas de empleos privados.
 * Solo se incluyen condiciones publicadas por la empresa o por la fuente
 * enlazada. Cuando una condición no aparece en el aviso, se indica como tal
 * en vez de estimarla.
 */
const verifiedPrivateListingSpecs: Record<string, JobListingSpecs> = {
  "plaza-vea-cajero-5x2-octubre-2026": {
    employmentType: "Tiempo parcial",
    hours: "No indicadas en el aviso",
    schedule: "Esquema 5x2; horario exacto no publicado",
    salary: "No publicado",
    experience: "Sin experiencia",
    education: "Secundaria completa",
  },
  "tiendas-mass-multifuncional-part-time-lima-octubre-2026": {
    employmentType: "Part time",
    hours: "Jornada parcial; horas exactas no publicadas",
    schedule: "Lun. a dom., 2 descansos; rango 6:30 a. m. – 10:15 p. m.",
    salary: "Acorde al mercado",
    experience: "Con o sin experiencia",
    education: "No especificada en el aviso",
  },
  "tambo-atencion-cliente-la-molina-octubre-2026": {
    employmentType: "Full time",
    hours: "Turno completo",
    schedule: "Cierre 2:15 p. m. – 11:15 p. m. o rotativo 6 a. m. – 4 p. m. / 2:15 p. m. – 11:15 p. m.",
    salary: "Sueldo fijo + movilidad + bono por desempeño",
    experience: "Con o sin experiencia",
    education: "Secundaria completa",
  },
  "popeyes-aurora-part-time-octubre-2026": {
    employmentType: "Part time",
    hours: "19 horas semanales",
    schedule: "Turnos rotativos; fines de semana y feriados; 2–3 cierres por semana",
    salary: "Sueldo fijo según ley + bono por recargo de consumo",
    experience: "Sin experiencia",
    education: "No especificada en el aviso",
  },
  "pardos-chicken-puestos-operativos-2026": {
    employmentType: "Full time / Part time según puesto",
    hours: "Varían según puesto y sede",
    schedule: "Turnos según sede; apertura/cierre en puestos operativos",
    salary: "No publicado en el portal general",
    experience: "Depende del puesto",
    education: "Secundaria completa para puestos operativos",
  },
  "eulen-limpieza-pucallpa-octubre-2026": {
    employmentType: "Full time",
    hours: "Jornada completa",
    schedule: "Turno mañana; horario exacto no publicado",
    salary: "A convenir",
    experience: "Experiencia en limpieza o rubro afín; meses no precisados",
    education: "No especificada en el aviso",
  },
  "prosegur-agente-seguridad-2026": {
    employmentType: "Tiempo completo según servicio",
    hours: "Según servicio asignado",
    schedule: "Turnos rotativos",
    salary: "No publicado en el portal oficial",
    experience: "Mínimo 6 meses como agente de seguridad",
    education: "Secundaria completa; curso SUCAMEC preferido",
  },
  "arca-pucusana-operario-produccion-octubre-2026": {
    employmentType: "Full time",
    hours: "8 horas diarias · régimen 6x1",
    schedule: "7 a. m.–3 p. m. / 3 p. m.–11 p. m. / 11 p. m.–7 a. m.",
    salary: "No publicado en esta vacante",
    experience: "Mínimo 6 meses en puesto similar o planta industrial",
    education: "Secundaria completa",
  },
  "talma-auxiliar-rampa-callao-octubre-2026": {
    employmentType: "Tiempo completo",
    hours: "Jornada completa",
    schedule: "Turnos rotativos; horario exacto no publicado",
    salary: "S/ 1,130 – S/ 1,300 al mes + horas extras y bonos",
    experience: "No indicada como requisito en el aviso consultado",
    education: "Secundaria completa; brevete A1 deseable",
  },
  "mdy-atencion-cliente-remoto-octubre-2026": {
    employmentType: "Full time · 100% remoto",
    hours: "Turno completo",
    schedule: "2 p. m.–11 p. m. o 3 p. m.–12 a. m.",
    salary: "S/ 1,230 + bonos",
    experience: "Acepta primer empleo; experiencia no obligatoria",
    education: "No especificada en el aviso",
  },
  "hyatt-housekeeping-practicante-octubre-2026": {
    employmentType: "Prácticas profesionales",
    hours: "No indicadas en el aviso",
    schedule: "Presencial; horario no publicado",
    salary: "Subvención económica mensual; monto no publicado",
    experience: "6 meses de prácticas deseable",
    education: "Egresado de Hotelería, Turismo o afines; inglés básico",
  },
  "auxiliar-almacen-obra-cusco-octubre-2026": {
    employmentType: "Tiempo completo",
    hours: "No indicadas en el aviso",
    schedule: "Presencial en obra; horario no publicado",
    salary: "S/ 1,800",
    experience: "Mínimo 6 meses en almacén; construcción deseable",
    education: "Técnico egresado o bachiller en Administración, Logística o afines",
  },
  "rvr-agro-cosechador-arandanos-octubre-2026": {
    employmentType: "Tiempo completo · contrato indeterminado",
    hours: "No indicadas en el aviso",
    schedule: "Trabajo de campo; horario no publicado",
    salary: "S/ 1,230 al mes",
    experience: "Mínimo 1 mes",
    education: "Secundaria completa",
  },
  "cencosud-cajeros-reponedores-navidad-2026": {
    employmentType: "Full time / Part time",
    hours: "Full: 8 h + 1 h refrigerio, 6 días/sem. · Part: 7 h + 1 h refrigerio, 3 días/sem.",
    schedule: "Turnos según tienda",
    salary: "Full: S/ 1,130 + S/ 80 pasajes · Part: S/ 500 + S/ 40 pasajes",
    experience: "Con o sin experiencia",
    education: "Secundaria completa",
  },
  "manicurista-pedicurista-san-isidro-octubre-2026": {
    employmentType: "Tiempo completo · presencial",
    hours: "No indicadas en el aviso",
    schedule: "Horario no publicado",
    salary: "S/ 2,300 al mes + comisiones",
    experience: "Mínimo 1 año",
    education: "Formación técnica o cursos de manicure y pedicure",
  },
  "asesor-creditos-mype-cajamarca-octubre-2026": {
    employmentType: "Tiempo completo · plazo fijo · presencial",
    hours: "No indicadas en el aviso",
    schedule: "Horario no publicado",
    salary: "Acorde al mercado / consultar en la fuente",
    experience: "3 años",
    education: "Técnica completa en Contabilidad, Administración, Economía o afines",
  },
};

const detailedPublicListingSpecs = Object.fromEntries(
  detailedPublicJobs.map((job) => {
    const details = job.details;
    const salary = details.salary || salaryFromPositions(details.positions) || NOT_PUBLISHED;
    const schedule = details.workSchedule || NOT_PUBLISHED;

    const specs: JobListingSpecs = {
      employmentType: inferEmploymentType(job.regime),
      hours: hoursFromSchedule(details.workSchedule),
      schedule,
      salary,
      experience: compactList(details.experience),
      education: compactList(details.education),
    };

    return [job.slug, specs];
  }),
) as Record<string, JobListingSpecs>;

const knownSpecs: Record<string, JobListingSpecs> = {
  ...detailedPublicListingSpecs,
  ...verifiedPrivateListingSpecs,
};

const genericSpecs: JobListingSpecs = {
  employmentType: NOT_PUBLISHED,
  hours: NOT_PUBLISHED,
  schedule: NOT_PUBLISHED,
  salary: NOT_PUBLISHED,
  experience: NOT_PUBLISHED,
  education: NOT_PUBLISHED,
};

export const jobListingSpecs = new Proxy(knownSpecs, {
  get(target, property: string | symbol) {
    if (typeof property !== "string") return Reflect.get(target, property);
    if (property in target) return target[property];

    if (property.startsWith("sunat-cas-")) {
      return { ...genericSpecs, employmentType: "CAS" };
    }

    return { ...genericSpecs };
  },
}) as Record<string, JobListingSpecs>;
