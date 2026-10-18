export type JobListingSpecs = {
  employmentType: string;
  hours: string;
  schedule: string;
  salary: string;
  experience: string;
  education: string;
};

/*
 * Datos concretos mostrados en las tarjetas de empleos privados.
 * Solo se incluyen condiciones publicadas por la empresa o por la fuente
 * enlazada. Cuando una condición no aparece en el aviso, se indica como tal
 * en vez de estimarla.
 */
export const jobListingSpecs: Record<string, JobListingSpecs> = {
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
