import type { JobDetailView } from "@/lib/job-details";

const sourceUrl = "https://www.pardoschicken.pe/trabaja-con-nosotros/puestos-de-trabajo";
const applicationUrl = "https://www.pardoschicken.pe/trabaja-con-nosotros/envianos-tu-cv";

const common = {
  entity: "Pardos Chicken",
  status: "Vigente" as const,
  category: "Varias" as const,
  location: "Perú · según restaurante disponible",
  vacancies: null,
  publishedAt: "18/10/2026",
  closesAt: "Postulación abierta · sin fecha de cierre publicada",
  verifiedAt: "22/10/2026",
  sourceUrl,
  sourceLabel: "Portal oficial de Pardos Chicken",
};

function applicationDetails() {
  return {
    applicationUrl,
    applicationLabel: "Enviar CV a Pardos Chicken",
    applicationInstructions:
      "El botón abre directamente el formulario oficial de Pardos Chicken. Allí debes elegir el puesto y restaurante, completar tus datos y adjuntar tu CV en PDF (máximo 1 MB).",
    basesUrl: sourceUrl,
    notes: [
      "Pardos Chicken publica como beneficios generales ingreso a planilla, alimentación, uniforme, línea de carrera, capacitación, beneficios corporativos y flexibilidad de horarios según el puesto.",
      "La disponibilidad exacta por restaurante se confirma en el formulario oficial de postulación.",
    ],
  };
}

export const pardosJobDetails: JobDetailView[] = [
  {
    ...common,
    slug: "pardos-anfitrion-bienvenida-2026",
    title: "Anfitrión de Bienvenida",
    regime: "Restaurante · atención al cliente · full time / part time",
    summary: "Puesto de recepción y bienvenida a invitados, orientado a brindar una buena experiencia desde el ingreso al restaurante.",
    details: {
      experience: ["Experiencia en puestos de atención al cliente."],
      requirements: [
        "Elevada vocación de servicio.",
        "Enfoque en el detalle.",
        "Capacidad para manejar situaciones difíciles.",
        "Disponibilidad para trabajar full time o part time en turnos de apertura y cierre.",
      ],
      functions: ["Recibir a los invitados en el restaurante y brindar un adecuado nivel de servicio."],
      workSchedule: "Full time o part time · turnos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-anfitrion-servicio-mozo-azafata-2026",
    title: "Anfitrión de Servicio · Mozo / Azafata",
    regime: "Restaurante · servicio de salón · full time / part time",
    summary: "Atención de invitados en salón, manejo de solicitudes y apoyo durante toda su estadía en el restaurante.",
    details: {
      experience: ["Experiencia en atención al cliente y servicio a invitados."],
      requirements: [
        "Elevada vocación de servicio y empatía.",
        "Alta tolerancia al trabajo bajo presión y manejo de estrés.",
        "Disponibilidad para trabajar full time o part time en turnos de apertura y cierre.",
      ],
      functions: ["Atender solicitudes e inquietudes de los invitados y brindar un buen servicio durante su estadía."],
      workSchedule: "Full time o part time · turnos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-anfitrion-cajas-2026",
    title: "Anfitrión de Cajas",
    regime: "Restaurante · caja · full time / part time",
    summary: "Puesto de caja para atención a clientes y manejo de operaciones de cobro en restaurante.",
    details: {
      experience: ["Experiencia en puestos similares como cajero(a)."],
      requirements: [
        "Conocimiento de arqueo de caja.",
        "Manejo de POS.",
        "Detección de billetes falsos.",
        "Elevada vocación de servicio y enfoque en el detalle.",
        "Capacidad para manejar situaciones difíciles y de estrés.",
        "Disponibilidad para trabajar full time o part time en turnos de apertura y cierre.",
      ],
      workSchedule: "Full time o part time · turnos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-anfitrion-counter-2026",
    title: "Anfitrión de Servicio · Counter",
    regime: "Restaurante · atención al cliente · full time / part time",
    summary: "Atención de clientes en counter para personas con ganas de aprender y orientación al servicio.",
    details: {
      requirements: [
        "Conocimientos básicos de atención al cliente y ganas de aprender.",
        "Actitud positiva, entusiasmo y respeto.",
        "Buen trabajo en equipo.",
      ],
      workSchedule: "Modalidad full time y part time",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-limpieza-vajillero-2026",
    title: "Anfitrión de Limpieza y Vajillero",
    regime: "Restaurante · limpieza · turnos rotativos",
    summary: "Labores de limpieza de salón, producción y áreas comunes, además del lavado de vajilla, ollas y utensilios.",
    details: {
      experience: ["Experiencia en puestos similares de limpieza y lavado de menaje."],
      requirements: [
        "Ser responsable, atento y servicial.",
        "Disponibilidad para trabajar en horarios rotativos de apertura, intermedio y cierre.",
      ],
      functions: ["Limpieza de salón, área de producción y áreas comunes.", "Lavado de vajilla, ollas y utensilios."],
      workSchedule: "Turnos rotativos · apertura, intermedio y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-delivery-empaquetador-2026",
    title: "Anfitrión de Delivery · Empaquetador",
    regime: "Restaurante · delivery · atención de pedidos",
    summary: "Gestión y preparación de pedidos de delivery desde su registro en el sistema hasta el despacho.",
    details: {
      experience: ["Experiencia en posiciones de atención en delivery."],
      functions: [
        "Centralizar y preparar la orden del servicio en el sistema de inicio a fin.",
        "Verificar y procesar pedidos para generar el comprobante de pago.",
        "Armar el pedido y enviarlo.",
      ],
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-teleoperador-2026",
    title: "Teleoperador",
    regime: "Call center · atención telefónica · horarios rotativos",
    summary: "Atención de comunicaciones telefónicas y solicitudes de clientes siguiendo los protocolos de servicio de Pardos Chicken.",
    details: {
      experience: ["Experiencia mínima de 3 meses en puestos similares."],
      functions: ["Recepcionar comunicaciones telefónicas y atender solicitudes cumpliendo los protocolos de servicio."],
      workSchedule: "Horarios rotativos de acuerdo con el call center",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-ayudante-cocina-produccion-2026",
    title: "Anfitrión de Producción · Ayudante de Cocina",
    regime: "Restaurante · cocina · producción · turnos rotativos",
    summary: "Apoyo en cocina y preparación de alimentos para producción del restaurante.",
    details: {
      requirements: [
        "Conocimientos básicos de cocina y preparación de comida para grupos grandes.",
        "Manejo de hornos de carbón, preferible.",
        "Talleres de cocina, preferible.",
        "Experiencia u orientación hacia labores de servicio.",
        "Disponibilidad para trabajar en horarios rotativos de apertura, intermedio y cierre.",
      ],
      workSchedule: "Turnos rotativos · apertura, intermedio y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-barman-2026",
    title: "Barman",
    regime: "Restaurante · bar · turnos rotativos",
    summary: "Preparación de bebidas y coctelería para el servicio del restaurante.",
    details: {
      requirements: [
        "Conocimientos sólidos en preparación de bebidas como chicha morada, maracuyá y limonada frozen.",
        "Conocimientos de coctelería como Pisco Sour, Chilcano, Sangría y Piña Colada, entre otras.",
        "Experiencia u orientación hacia labores de servicio.",
        "Disponibilidad para trabajar en horarios rotativos de apertura, intermedio y cierre.",
      ],
      workSchedule: "Turnos rotativos · apertura, intermedio y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-maestro-brasa-2026",
    title: "Maestro Brasa",
    regime: "Restaurante · cocina · brasa · tiempo completo",
    summary: "Puesto de producción en cocina orientado al manejo de brasa y hornos de carbón.",
    details: {
      experience: ["Experiencia mínima de 6 meses como brasero/parrillero o en puestos de producción en restaurantes."],
      requirements: [
        "Manejo de hornos de carbón, preferible.",
        "Conocimientos básicos de cocina o ganas de aprender del rubro gastronómico, preferible.",
        "Disponibilidad para laborar a tiempo completo y en horario rotativo de apertura y cierre.",
      ],
      workSchedule: "Tiempo completo · turnos rotativos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-maestro-parrilla-2026",
    title: "Maestro Parrilla",
    regime: "Restaurante · parrilla · tiempo completo",
    summary: "Puesto de producción especializado en parrilla para operación de restaurante.",
    details: {
      experience: ["Experiencia mínima de 6 meses como parrillero o en puestos de producción en restaurantes, indispensable."],
      requirements: [
        "Conocimientos básicos de cocina, indispensable.",
        "Talleres de cocina y manejo de hornos de carbón, preferible.",
        "Disponibilidad para laborar a tiempo completo y en horario rotativo de apertura y cierre.",
      ],
      workSchedule: "Tiempo completo · turnos rotativos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-maestro-plancha-2026",
    title: "Maestro Plancha",
    regime: "Restaurante · cocina · plancha",
    summary: "Puesto de cocina en estación de plancha.",
    details: {
      experience: ["Mínimo de 6 meses de experiencia en puestos similares."],
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-maestro-frituras-2026",
    title: "Maestro Frituras",
    regime: "Restaurante · cocina caliente · tiempo completo",
    summary: "Puesto de producción en cocina caliente y frituras.",
    details: {
      experience: ["Experiencia mínima de 6 meses como ayudante de cocina caliente o en puestos de producción en restaurantes, indispensable."],
      requirements: [
        "Conocimientos básicos de cocina, indispensable.",
        "Talleres de cocina, preferible.",
        "Disponibilidad para laborar a tiempo completo y en horario rotativo de apertura y cierre.",
      ],
      workSchedule: "Tiempo completo · turnos rotativos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-maestro-ensaladas-2026",
    title: "Maestro Ensaladas",
    regime: "Restaurante · cocina · tiempo completo",
    summary: "Puesto de cocina orientado a manipulación y picado de verduras y preparación de ensaladas.",
    details: {
      experience: ["Experiencia mínima de 6 meses como ayudante de cocina en manipulación y picado de verduras o en producción de restaurantes, indispensable."],
      requirements: [
        "Conocimientos básicos de cocina, indispensable.",
        "Disponibilidad para laborar a tiempo completo y en horario rotativo de apertura y cierre.",
      ],
      workSchedule: "Tiempo completo · turnos rotativos de apertura y cierre",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-almacenero-2026",
    title: "Almacenero",
    regime: "Restaurante · almacén · full time",
    summary: "Control de insumos, inventarios, stock y almacenamiento para la operación del restaurante.",
    details: {
      experience: ["Experiencia mínima de 6 meses en almacenes de alimentos, empresas de consumo masivo o plantas de producción, deseable."],
      requirements: ["Manejo de inventarios y stock en el sistema.", "Buenas prácticas de almacenamiento y mantenimiento del almacén."],
      functions: ["Validar insumos, productos y activos según requerimientos de calidad, número, peso y documentación."],
      workSchedule: "Turno mañana de 7:00 a. m. a 4:00 p. m. · lunes a domingo con 1 día de descanso semanal · full time",
      ...applicationDetails(),
    },
  },
  {
    ...common,
    slug: "pardos-lider-restaurante-administrador-2026",
    title: "Líder de Restaurante · Administrador",
    regime: "Restaurante · administración · tiempo completo",
    summary: "Responsable de liderar procesos operativos y administrativos del restaurante, supervisando servicio, calidad e infraestructura.",
    details: {
      experience: ["Experiencia mínima de 2 años liderando procesos operativos y de gestión administrativa en restaurantes."],
      functions: ["Supervisar productos, nivel de servicio, infraestructura y calidad para brindar una experiencia satisfactoria."],
      requirements: ["Disponibilidad para laborar en turnos rotativos de apertura y cierre, de lunes a domingo."],
      workSchedule: "Tiempo completo · turnos rotativos de apertura y cierre · lunes a domingo",
      ...applicationDetails(),
    },
  },
];
