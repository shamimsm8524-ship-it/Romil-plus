import type { PublicOpportunity } from "@/lib/state-opportunities";

export const jobSearchTopics = [
  {
    slug: "lima",
    title: "Ofertas laborales en Lima",
    description: "Encuentra ofertas laborales en Lima: administración, ventas, logística, restaurantes, tecnología y prácticas. Consulta requisitos, fechas y enlaces para postular.",
    intro: "Reúne en un solo listado empleos con sede en Lima que Romilplus ha revisado. Puedes comparar distritos, modalidad y requisitos antes de abrir la ficha completa y continuar en el canal de la empresa.",
    adviceTitle: "Cómo elegir un trabajo en Lima",
    advice: [
      "Comprueba el distrito y la sede exactos. Una empresa puede tener oficinas en Lima y ofrecer un puesto en otra región; este listado utiliza el lugar del puesto, no el domicilio de la empresa.",
      "Revisa los días de asistencia, el turno y el tiempo de traslado. Una vacante híbrida puede exigir presencia varios días por semana; atención telefónica tampoco significa automáticamente trabajo remoto.",
      "Distingue sueldo fijo, comisiones y bonos. Cuando la fuente no publica un importe o una fecha de cierre, la ficha lo indica. La fecha de revisión muestra cuándo se comprobó el aviso, no cuándo termina la postulación."
    ],
    match: (job: PublicOpportunity) => /\blima\b/i.test(job.location),
  },
  {
    slug: "mineria",
    title: "Ofertas de trabajo en minería en Perú",
    description: "Trabajos en minería: técnicos, operadores, mantenimiento, inspección, ingeniería y prácticas. Revisa ubicación, experiencia y régimen publicado por la empresa.",
    intro: "Consulta oportunidades del sector minero revisadas por Romilplus, desde prácticas hasta puestos técnicos y profesionales. Cada ficha distingue la sede y las condiciones que realmente publica la fuente.",
    adviceTitle: "Antes de postular a una minera",
    advice: [
      "Diferencia un puesto en unidad minera de uno de oficina o de servicios para minería. Las prácticas de nóminas o la ingeniería con base en Lima pueden estar vinculadas al sector sin ser trabajos permanentes en campamento.",
      "Comprueba la especialidad, certificaciones y experiencia exigidas para el equipo o servicio. No todas las convocatorias aceptan primer empleo; un requisito deseable y uno obligatorio tampoco significan lo mismo.",
      "Verifica régimen, traslados, alojamiento y alimentación directamente en el aviso. Si no se publica una rotación, no asumas que sea 14x7 o 20x10. Para paradas de planta, confirma además duración y disponibilidad requerida.",
      "Postula en el canal enlazado por el empleador. Romilplus organiza la información y no garantiza contratación ni cobra por asegurar una plaza."
    ],
    match: (job: PublicOpportunity) => /miner[ií]a|minera|minero|minerales|mineroducto|mining/i.test(job.regime + " " + job.title + " " + job.entity),
  },
];

export function jobDate(value: string) {
  const match = value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return match ? Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])) : 0;
}
