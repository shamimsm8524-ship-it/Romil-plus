import { privateVerifiedJobs } from "@/lib/private-verified-jobs";
import type { JobDetailExtra, JobDetailView } from "@/lib/job-details";
import type { PublicOpportunity } from "@/lib/state-opportunities";

function raw(slug: string) {
  const job = privateVerifiedJobs.find((item) => item.slug === slug);
  if (!job) throw new Error(`No existe la vacante privada ${slug}`);
  return job;
}

function detailed(
  slug: string,
  details: JobDetailExtra,
  overrides: Partial<PublicOpportunity> = {},
): JobDetailView {
  return {
    ...raw(slug),
    ...overrides,
    details,
  };
}

export const privateJobDetails: JobDetailView[] = [
  detailed("plaza-vea-cajero-5x2-octubre-2026", {
    processCode: "REQ-2026-137",
    workSchedule: "Tiempo parcial · contrato a tiempo parcial",
    education: ["Secundaria completa."],
    experience: ["Sin experiencia previa requerida (0+ años)."],
    functions: [
      "Registrar correctamente las transacciones de compra de los clientes y brindar una buena experiencia de compra.",
      "Atender al cliente de acuerdo con los protocolos establecidos.",
      "Realizar el cobro de los productos con el medio de pago correspondiente.",
      "Limpiar y ordenar el área de cajas.",
      "Dar a conocer las promociones vigentes.",
      "Cumplir otras funciones asignadas por el jefe inmediato.",
    ],
    applicationUrl: "https://jumpin.pe/es/jobs/e674c04e-f859-4756-88b4-05bcee9cdab0",
    applicationLabel: "Postular a Cajero 5X2",
    applicationInstructions: "El enlace abre la vacante exacta de Plaza Vea Oriente en Jumpin. Usa el botón Postular e inicia sesión o regístrate para enviar tu candidatura.",
    notes: ["El aviso no publica remuneración ni fecha límite de postulación."],
  }),

  detailed("tiendas-mass-multifuncional-part-time-lima-octubre-2026", {
    workSchedule: "Tiempo parcial · lunes a domingo con 2 días de descanso · rango disponible entre 6:30 a. m. y 10:15 p. m.",
    experience: ["Con o sin experiencia."],
    requirements: [
      "Ser mayor de edad.",
      "Disponibilidad para trabajar a tiempo parcial de lunes a domingo con dos días de descanso.",
      "Disponibilidad para trabajar en cualquier tienda de su distrito.",
    ],
    functions: [
      "Atención al cliente.",
      "Cobro de productos en el área de caja.",
      "Limpieza y orden del área.",
      "Recepción, almacenamiento y reposición de mercadería.",
      "Cumplimiento de protocolos y procesos.",
      "Otras funciones afines que designe el jefe inmediato.",
    ],
    benefits: [
      "Ingreso a planilla desde el primer día de labores.",
      "Pago de matrícula de estudios.",
      "Sueldo acorde al mercado.",
      "Beneficios de ley.",
      "Beneficios y descuentos del Grupo Intercorp.",
      "Agradable clima laboral.",
      "Línea de carrera a corto plazo.",
    ],
    applicationUrl: "https://empleate.upn.edu.pe/trabajar-en-compania-hard-discount-c1/trabajos/multifuncional-part-time-tiendas-mass-lima/966443",
    applicationLabel: "Postular a Tiendas Mass",
    applicationInstructions: "Abre la publicación exacta de Tiendas Mass y usa el mecanismo de postulación habilitado en el portal.",
    notes: ["El aviso no publica un monto exacto de remuneración."],
  }),

  detailed("tambo-atencion-cliente-la-molina-octubre-2026", {
    contractDuration: "Plazo fijo.",
    workSchedule: "Full Time Cierre: 2:15 p. m. a 11:15 p. m. · Full Time Rotativo: rango 6:00 a. m. a 4:00 p. m. / 2:15 p. m. a 11:15 p. m. · lunes a domingo con 1 día de descanso.",
    education: ["Secundaria completa."],
    experience: ["Con o sin experiencia en atención al cliente."],
    requirements: [
      "Ser mayor de edad.",
      "Buena actitud, disposición al aprendizaje y trabajo en equipo.",
      "Disponibilidad para trabajar de lunes a domingo con un día de descanso semanal.",
      "Disponibilidad para las tiendas de La Molina indicadas en el aviso: Óvalo Los Cóndores, Fresnos, Corregidor y Fontana.",
    ],
    functions: [
      "Manejo de caja, atención al cliente y ventas.",
      "Manipulación de alimentos.",
      "Recepción, reposición y conteo de productos de tienda y almacén.",
      "Limpieza y orden de toda la tienda.",
    ],
    benefits: [
      "Ingreso a planilla y beneficios de ley desde el primer día.",
      "Sueldo fijo, bono de movilidad y bono por desempeño.",
      "Descuentos en Tiendas Tambo y Aruma.",
      "Capacitaciones constantes y línea de carrera.",
      "Convenios con institutos y universidades.",
      "Descuentos recreativos.",
      "Pagos quincenales y a fin de mes.",
    ],
    applicationUrl: "https://empleate.upn.edu.pe/trabajar-en-tambo-sac1/trabajos/atencion-al-cliente-tambo-la-molina/964021",
    applicationLabel: "Postular a Tambo+",
    applicationInstructions: "Abre la publicación exacta de Tambo+ y sigue el canal de postulación indicado por la empresa.",
  }),

  detailed("popeyes-aurora-part-time-octubre-2026", {
    workSchedule: "Part time · 19 horas semanales · turnos rotativos · disponibilidad para fines de semana y feriados · cierres de caja 2 a 3 veces por semana.",
    experience: ["No requiere experiencia previa."],
    requirements: [
      "Ser mayor de edad.",
      "Vivir a un máximo de 40 minutos de Popeyes Aurora.",
      "Disponibilidad para turnos rotativos, fines de semana y feriados.",
      "Actitud proactiva, ganas de aprender y compromiso con el equipo.",
    ],
    functions: [
      "Brindar atención cordial al cliente en el punto de venta.",
      "Apoyar en operaciones de producción según la necesidad del turno.",
      "Realizar cierres de caja de 2 a 3 veces por semana.",
      "Cumplir los estándares de calidad e higiene de la marca.",
    ],
    benefits: [
      "Sueldo fijo actualizado según ley.",
      "Bono por recargo de consumo.",
      "Ingreso a planilla desde el primer día.",
      "25 % de descuento en 6 marcas de NGR.",
      "Convenios educativos con UTP, Zegel e Idat.",
      "Descuentos corporativos en entretenimiento y salud.",
      "Plataforma de bienestar con psicología, medicina y nutrición.",
      "Oportunidades de crecimiento interno.",
    ],
    applicationUrl: "https://www.emplezio.com/empleos/atencion-al-cliente-popeyes-aurora-part-time-job_mvaao3drk03tyv",
    applicationLabel: "Postular a Popeyes Aurora",
    applicationInstructions: "La publicación abre la candidatura de NGR en Computrabajo mediante el botón Postular.",
    notes: ["La descripción del aviso especifica 19 horas semanales, aunque el agregador muestra una etiqueta general FULL TIME."],
  }),

  detailed("eulen-limpieza-pucallpa-octubre-2026", {
    workSchedule: "Full time · turno de mañana según el aviso; horario exacto no publicado en el texto visible.",
    experience: ["Experiencia requerida en el puesto de limpieza o en un rubro afín."],
    requirements: [
      "Disponibilidad para laborar en el horario indicado por la empresa.",
      "Responsabilidad, puntualidad y compromiso.",
      "Disponibilidad inmediata.",
      "Actitud proactiva y disposición para trabajar en equipo.",
    ],
    functions: [
      "Realizar labores de limpieza y mantenimiento de los ambientes asignados.",
      "Mantener las áreas en óptimas condiciones de higiene y orden.",
      "Cubrir posiciones de limpieza según la necesidad del servicio.",
      "Cumplir las indicaciones del supervisor.",
    ],
    benefits: [
      "Ingreso a planilla con beneficios de ley desde el primer día.",
      "Capacitaciones constantes y oportunidad de desarrollo.",
    ],
    applicationUrl: "https://emplezio.com/empleos/operarioa-de-limpieza-adp-pucallpa-full-time-manana-cmvce2x7m002169e479hkjjoz",
    applicationLabel: "Postular a Grupo EULEN",
    applicationInstructions: "El aviso enlaza la postulación de Grupo EULEN en Computrabajo.",
    notes: ["El título identifica la sede ADP Pucallpa; el agregador muestra Lima en su campo de ubicación. RomilPlus conserva Pucallpa por ser la sede indicada expresamente en el nombre de la vacante."],
  }),

  detailed("prosegur-agente-seguridad-2026", {
    salary: "S/ 2,012 aprox. en jornada rotativa de 12 h · S/ 1,800 aprox. en régimen 14x7, según la información publicada por Prosegur.",
    contractDuration: "Contrato a plazo fijo por incremento de actividades: 1 año para personal nuevo y 6 meses para personal reingresante.",
    workSchedule: "Rotativo 6x1 de 12 horas (7 a. m.–7 p. m. / 7 p. m.–7 a. m.) o régimen 14 días de trabajo por 7 de descanso, según servicio.",
    education: ["Secundaria completa."],
    experience: ["Mínimo 6 meses de experiencia como agente de seguridad o ser licenciado de las Fuerzas Armadas."],
    requirements: [
      "No tener antecedentes penales ni policiales.",
      "Curso SUCAMEC vigente, de preferencia; Prosegur informa que puede ofrecerlo gratuitamente si el postulante aún no lo tiene.",
      "Licencia de armas no obligatoria para postular; mejora el perfil y Prosegur puede apoyar el trámite si el servicio la requiere.",
      "Buena actitud, interés, motivación por la seguridad, responsabilidad y orientación al cliente.",
    ],
    functions: [
      "Proteger la vida e integridad de las personas y la seguridad interna y perimetral de las instalaciones asignadas.",
      "Verificar cargos y consignas del personal entrante y saliente según lo acordado con el cliente.",
      "Registrar novedades y emergencias en el cuaderno de servicio y firmarlo al entregar o recibir el puesto.",
      "Informar los siniestros ocurridos y ejecutar los procedimientos correspondientes ante eventualidades.",
    ],
    documents: ["Durante el proceso se solicitan documentos como DNI y certificados académicos, además de los documentos requeridos para la contratación."],
    applicationUrl: "https://www.prosegur.com.pe/trabaja-con-nosotros/agente-de-seguridad",
    applicationLabel: "Postular directamente en Prosegur",
    applicationInstructions: "Completa el formulario oficial de Prosegur en esta misma página. Si no cuentas con curso SUCAMEC, la empresa también publica el acceso a su formación.",
    notes: ["La empresa informa que el proceso incluye revisión inicial, entrevista, recolección de documentos, examen médico y firma de contrato."],
  }),

  detailed("arca-pucusana-operario-produccion-octubre-2026", {
    workSchedule: "6x1 con un día de descanso rotativo · turnos 07:00–15:00, 15:00–23:00 o 23:00–07:00.",
    education: ["Secundaria completa acreditada mediante certificado o C4."],
    experience: [
      "Mínimo 6 meses de experiencia en el puesto o en un puesto similar en plantas del rubro industrial.",
      "Experiencia en trabajos operativos, plantas o actividades relacionadas.",
    ],
    requirements: ["Disponibilidad para trabajar en turnos rotativos y bajo esquema 6x1."],
    functions: [
      "Cumplir las normas de calidad, medio ambiente y seguridad y salud ocupacional.",
      "Cumplir las medidas de control de la matriz IPER y de aspectos ambientales.",
      "Seleccionar productos no conformes de los productos operativos.",
      "Efectuar el destripe de las unidades que vienen de ruta.",
      "Registrar las mermas de productos ocurridas en el almacén.",
      "Trasladar el producto mermado a la zona de cambios.",
      "Controlar lote y/o fecha de ingreso para la adecuada rotación de productos.",
      "Mantener los productos limpios y en buenas condiciones.",
      "Mantener orden y limpieza en la zona asignada.",
    ],
    benefits: [
      "Ingreso a planilla directa desde el primer día.",
      "Beneficios de ley y corporativos.",
      "Alimentación cubierta al 100 %.",
      "Seguro de vida ley desde el primer día.",
      "Seguro contra accidentes.",
      "Movilidad cubierta al 100 %.",
      "Utilidades.",
    ],
    applicationUrl: "https://careers.arcacontal.com/job/Lima-OPERARIO-DE-PRODUCCION-PLANTA-PUCUSANA-15026/1441060800/",
    applicationLabel: "Enviar solicitud a Arca Continental",
    applicationInstructions: "Abre la vacante exacta del portal de carreras de Arca Continental y usa el botón Enviar Solicitud.",
  }),

  detailed("talma-auxiliar-rampa-callao-octubre-2026", {
    salary: "S/ 1,130 base + horas extras + bonos; el aviso muestra un rango aproximado de S/ 1,130 a S/ 1,300 mensuales.",
    workSchedule: "Tiempo completo · turnos rotativos.",
    education: ["Secundaria completa."],
    requirements: [
      "Brevete A1 deseable, no excluyente.",
      "Vivir en zonas aledañas al Callao.",
      "Disponibilidad para turnos rotativos.",
    ],
    functions: [
      "Guiar y realizar el aparcado de aeronaves en la plataforma del aeropuerto.",
      "Apoyar la guía del equipo de carga y descarga en la estiba de equipajes.",
      "Ejecutar operaciones de limpieza interna de cabina.",
    ],
    benefits: [
      "Planilla desde el primer día y beneficios de ley al 100 %.",
      "Horas extras y bonos.",
      "Tarjeta canjeable por víveres mensualmente.",
      "Alimentación cubierta al 85 %.",
      "Uniforme y EPP cubiertos al 100 %.",
      "Movilidad gratuita nocturna.",
      "Capacitaciones y línea de carrera.",
    ],
    applicationUrl: "https://pe.indeed.com/viewjob?jk=fef07afd6367ad66",
    applicationLabel: "Postular a Talma",
    applicationInstructions: "Abre la vacante exacta de Talma en Indeed y usa el botón Postularse ahora.",
  }),

  detailed("mdy-atencion-cliente-remoto-octubre-2026", {
    salary: "S/ 1,230",
    workSchedule: "Full time remoto · turno tarde/noche: 2:00 p. m.–11:00 p. m. o 3:00 p. m.–12:00 a. m.",
    experience: ["Vacante abierta a personas con experiencia y también a primer empleo."],
    requirements: [
      "Disponibilidad para turno de tarde/noche.",
      "Capacidad de adaptación al trabajo remoto y manejo básico de herramientas digitales.",
      "Buenas habilidades de comunicación verbal y escucha activa.",
      "Disponibilidad para capacitación pagada e ingreso inmediato.",
    ],
    functions: [
      "Atender llamadas entrantes de clientes de Claro para resolver dudas, consultas y reclamos.",
      "Aplicar soluciones según los protocolos y estándares de calidad de la compañía.",
      "Garantizar una experiencia de usuario positiva y eficiente durante la interacción.",
    ],
    benefits: [
      "Bono de desempeño.",
      "Bono por condición de trabajo.",
      "Capacitación pagada y adelantada.",
      "Seguro de salud particular gratuito con cobertura familiar.",
      "Apoyo en salud mental.",
      "Convenios educativos y corporativos.",
      "Línea de carrera rápida.",
    ],
    applicationUrl: "https://emplezio.com/empleos/agente-de-atencion-al-cliente-remoto-claro-turno-noche-job_mv7gv1758ctv7p",
    applicationLabel: "Postular a MDY",
    applicationInstructions: "El aviso enlaza directamente la postulación de MDY en Computrabajo.",
  }),

  detailed("hyatt-housekeeping-practicante-octubre-2026", {
    workSchedule: "Prácticas profesionales · presencial en Lima.",
    education: ["Egresado de Hotelería, Turismo o carrera similar."],
    experience: ["Mínimo 6 meses de prácticas, deseable."],
    requirements: ["Inglés básico.", "Alta disposición y orientación al servicio al cliente."],
    functions: [
      "Apoyar al auxiliar de ama de llaves asignado realizando el aseo y preparación de habitaciones para mantenerlas en excelentes condiciones.",
      "Aseo de áreas comunes.",
      "Trabajo en lavandería.",
    ],
    benefits: ["Convenio de prácticas.", "Subvención económica mensual.", "Seguro."],
    applicationUrl: "mailto:pamela.zelada@hyatt.com?subject=CV_PRACTICANTE%20PROFESIONAL%20DE%20HOUSEKEEPING",
    applicationLabel: "Enviar CV a Hyatt",
    applicationInstructions: "Envía tu CV actualizado a pamela.zelada@hyatt.com con el asunto exacto: CV_PRACTICANTE PROFESIONAL DE HOUSEKEEPING.",
    contact: ["Correo de postulación publicado: pamela.zelada@hyatt.com."],
  }),

  detailed("auxiliar-almacen-obra-cusco-octubre-2026", {
    salary: "S/ 1,800 a más",
    contractDuration: "Plazo indeterminado.",
    workSchedule: "Tiempo completo · 100 % presencial en Cusco.",
    education: ["Técnico egresado o bachiller en Administración, Logística o carreras afines."],
    experience: ["Mínimo 6 meses de experiencia en almacén, de preferencia en obras; la preferencia por obras no es excluyente."],
    requirements: [
      "Conocimiento de materiales de construcción y acabados.",
      "Conocimiento y aplicación de metodología 5S en almacenes.",
      "Excel básico/intermedio.",
      "Experiencia en manejo de ERP para almacenes e inventarios.",
      "Conocimiento de control de inventarios, recepción y despacho de materiales.",
      "Capacidad para trabajar bajo presión con orden, responsabilidad y proactividad.",
      "Disponibilidad para trabajo 100 % presencial en Cusco.",
    ],
    functions: [
      "Recepción, almacenamiento, control y despacho de materiales.",
      "Registrar y actualizar información en Excel o ERP, según corresponda.",
      "Apoyar en inventarios y mantener el orden y organización del almacén bajo metodología 5S.",
    ],
    benefits: ["Ingreso a planilla."],
    applicationUrl: "https://peruconvoca.com/oportunidad/2005",
    applicationLabel: "Ver canal oficial de postulación",
    applicationInstructions: "La convocatoria ya cerró. La ficha se conserva como referencia; el aviso enlazaba la postulación en Empleos Perú (MTPE).",
    notes: ["La fecha de cierre publicada fue 20/10/2026; al 22/10/2026 ya no está vigente."],
  }, {
    status: "Cerrada reciente",
    verifiedAt: "22/10/2026",
  }),

  detailed("rvr-agro-cosechador-arandanos-octubre-2026", {
    salary: "S/ 1,230 a más",
    contractDuration: "Plazo indeterminado.",
    workSchedule: "Tiempo completo · labores de campo.",
    education: ["Secundaria completa."],
    experience: ["1 mes de experiencia según el aviso oficial."],
    functions: [
      "Realizar la cosecha manual de arándanos.",
      "Seleccionar y recolectar frutos que cumplan los estándares de calidad de la empresa.",
      "Manipular el producto cuidadosamente para evitar daños.",
      "Cumplir buenas prácticas agrícolas y normas de seguridad y salud en el trabajo durante las labores de campo.",
    ],
    applicationUrl: "https://mtpe-candidatos.empleosperu.gob.pe/search-jobs/description?jobId=dc7f51f6ed774b00a64e4b7195c08da1",
    applicationLabel: "Postular en Empleos Perú",
    applicationInstructions: "Abre la publicación oficial en Empleos Perú (MTPE) para registrar tu postulación.",
    basesUrl: "https://peruconvoca.com/oportunidad/3235",
  }),

  detailed("cencosud-cajeros-reponedores-navidad-2026", {
    salary: "Full time: S/ 1,130 + S/ 80 de pasajes · Part time 3 días: S/ 500 + S/ 40 de pasajes. Indeed muestra un rango general de S/ 1,130 a S/ 1,250 para la publicación.",
    workSchedule: "Full time: 6 días por semana, 8 h de gestión + 1 h de refrigerio y 1 día de descanso · Part time: 3 días por semana, 7 h de gestión + 1 h de refrigerio y 4 días de descanso.",
    education: ["Secundaria completa, indispensable."],
    experience: ["Con o sin experiencia."],
    requirements: [
      "Ser mayor de edad.",
      "Predisposición para realizar esfuerzo físico y mantenerse en movimiento continuo.",
      "En la postulación se solicita DNI, correo electrónico, WhatsApp, horarios de estudio y distrito de residencia.",
    ],
    positions: [
      { title: "Cajera/o Full Time · Campaña Navideña" },
      { title: "Reponedor/a Full Time · Campaña Navideña" },
      { title: "Reponedor/a Part Time · Campaña Navideña" },
      { title: "Cajero/a Part Time · Campaña Navideña" },
    ],
    benefits: [
      "Ingreso a planilla desde el primer día y estabilidad laboral.",
      "Asignación por escolaridad.",
      "Cuponeras de tiempo libre.",
      "Descuentos en compras en Wong y Metro para el colaborador y un familiar.",
      "Bonificación por quinquenio.",
      "Excelente clima laboral.",
    ],
    applicationUrl: "https://pe.indeed.com/viewjob?jk=44bc66f3bc8863eb",
    applicationLabel: "Postular a Cencosud",
    applicationInstructions: "Abre la publicación exacta de Cencosud en Indeed y completa la candidatura para la campaña navideña.",
    notes: ["Tiendas indicadas en el aviso: Metro Pershing, Garzón, Arenales, Rímac y Shell; Wong Dos de Mayo, Óvalo Gutiérrez, Benavides, Aurora y Bajada Balta."],
  }),

  detailed("manicurista-pedicurista-san-isidro-octubre-2026", {
    salary: "S/ 2,300 al mes + comisiones",
    workSchedule: "Tiempo completo · presencial en San Isidro.",
    education: ["Formación técnica o cursos de manicure y pedicure."],
    experience: ["Al menos 1 año de experiencia."],
    requirements: [
      "Ser responsable, carismática/o y con ganas de trabajar.",
      "Habilidad para cuidado e higiene de uñas, atención al cliente y desinfección de herramientas y espacio de trabajo.",
    ],
    functions: [
      "Realizar servicios de manicure con distintos sistemas y servicios de pedicure.",
      "Aplicar esmalte tradicional y semipermanente.",
      "Cuidar la higiene de las uñas durante cada servicio.",
      "Atender a los clientes con profesionalismo y cordialidad.",
      "Desinfectar herramientas y mantener limpia la estación de trabajo.",
    ],
    applicationUrl: "https://cazvid.com/es/empleo/manicurista-y-pedicuristasan-isidro-47da53",
    applicationLabel: "Postular al empleo",
    applicationInstructions: "CazVid abre el enlace del empleador conectado a esta vacante desde la sección Postúlate a este empleo.",
  }),

  detailed("asesor-creditos-mype-cajamarca-octubre-2026", {
    workSchedule: "Tiempo completo · presencial en Cajamarca.",
    education: ["Carrera técnica o universitaria en Contabilidad, Administración, Economía o afines."],
    requirements: [
      "Presentar reporte favorable en la central de riesgo.",
      "Contar con licencia de conducir, indispensable según la ampliación oficial de la cooperativa.",
    ],
    functions: [
      "Promover y brindar información a socios actuales y potenciales del segmento de pequeña empresa para concretar colocaciones de crédito.",
      "Recopilar información de solicitantes, evaluar la conveniencia y viabilidad del crédito y preparar expedientes para aprobación.",
      "Sustentar operaciones ante el Comité de Crédito y subsanar observaciones para la aprobación final.",
      "Elaborar reportes de control de créditos y cobros de cartera morosa solicitados por la jefatura.",
    ],
    benefits: [
      "Integrarse a una empresa líder y posicionada a nivel nacional.",
      "Esquema remunerativo acorde al mercado.",
      "Beneficios de ley en Régimen General.",
      "Capacitaciones constantes y EPP.",
      "Línea de carrera.",
    ],
    contact: ["Correo oficial para CV: recursoshumanos@cscb.com.pe · asunto: MYPE- CAJAMARCA."],
    applicationUrl: "mailto:recursoshumanos@cscb.com.pe?subject=MYPE-%20CAJAMARCA",
    applicationLabel: "Enviar CV a la Cooperativa",
    applicationInstructions: "La publicación oficial de la Cooperativa indica enviar el CV a recursoshumanos@cscb.com.pe con el asunto MYPE- CAJAMARCA.",
    basesUrl: "https://coopscb.com.pe/?p=7594",
    notes: ["La ampliación oficial de la empresa indicó convocatoria del 10/10/2026 al 19/10/2026. Al 22/10/2026 está cerrada; esta fecha oficial prevalece sobre agregadores que mostraban otro cierre."],
  }, {
    status: "Cerrada reciente",
    closesAt: "Convocatoria oficial cerró el 19/10/2026",
    verifiedAt: "22/10/2026",
    sourceUrl: "https://coopscb.com.pe/?p=7594",
    sourceLabel: "Convocatoria oficial de Cooperativa Santo Cristo de Bagazán",
  }),
];
