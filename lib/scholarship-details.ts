import { scholarships, type Scholarship } from "@/lib/scholarships";

export type ScholarshipMilestone = {
  label: string;
  date: string;
};

export type ScholarshipDetailExtra = {
  quantity?: string;
  eligibility?: string[];
  requirements?: string[];
  documents?: string[];
  benefits?: string[];
  stages?: string[];
  importantDates?: ScholarshipMilestone[];
  applicationUrl?: string;
  applicationLabel?: string;
  applicationInstructions?: string;
  basesUrl?: string;
  notes?: string[];
};

const detailMap: Record<string, ScholarshipDetailExtra> = {
"osinergmin-peu-2027": {
  "quantity": "270 vacantes: 50 % para Lima y Callao y 50 % para otras regiones, según criterios por especialidad.",
  "eligibility": [
    "Egresados universitarios de 2026, bachilleres no titulados que egresaron en 2026 o estudiantes del último ciclo académico de ese año.",
    "Carreras elegibles según especialidad: ingenierías, Derecho, Economía, Administración y otras listadas en la fuente."
  ],
  "requirements": [
    "No haber participado en ediciones anteriores.",
    "Contar con medios técnicos para el programa virtual y cumplir las condiciones de la declaración jurada."
  ],
  "documents": [
    "DNI y declaración jurada firmada.",
    "Constancia de egreso o carta universitaria según situación académica; revisar contenido requerido en la fuente."
  ],
  "importantDates": [
    {
      "label": "Cierre de inscripciones",
      "date": "30/11/2026 · 23:59"
    },
    {
      "label": "Programa virtual",
      "date": "14/01/2027 al 15/03/2027"
    }
  ],
  "benefits": [
    "Beca académica completa y doble certificación.",
    "Posibilidad de prácticas profesionales sujeta al proceso y necesidades institucionales."
  ],
  "applicationUrl": "https://becas.osinergmin.gob.pe/requisitos-e-inscripcion/",
  "applicationLabel": "Revisar requisitos e inscripción oficial",
  "applicationInstructions": "Revisar la especialidad, preparar los documentos y seguir el botón Inscríbete del portal oficial. Confirmar que el registro finalice correctamente.",
  "notes": [
    "La portada conserva texto de años anteriores; se usaron las páginas específicas de requisitos y cronograma 2027.",
    "No equivale a una beca de pregrado ni a una contratación laboral garantizada.",
    "Consultar las condiciones de correo electrónico y los documentos completos en la fuente."
  ]
},
"france-excellence-eiffel-2027": {
  "eligibility": [
    "Postulantes extranjeros a maestría o doctorado en Francia, con respaldo de una institución francesa."
  ],
  "requirements": [
    "Edad máxima anunciada: 29 años para maestría y 35 para doctorado; comprobar las fechas de nacimiento de las bases.",
    "Cumplir los requisitos del programa elegido y obtener la nominación institucional."
  ],
  "documents": [
    "Expediente y documentos solicitados por la universidad que presenta la candidatura."
  ],
  "importantDates": [
    {
      "label": "Apertura",
      "date": "Octubre de 2026"
    },
    {
      "label": "Cierre interno para estudiantes",
      "date": "Lo determina cada universidad; puede ser anterior al 06/01/2027"
    },
    {
      "label": "Envío de expedientes por instituciones",
      "date": "06/01/2027"
    }
  ],
  "applicationUrl": "https://www.campusfrance.org/en/the-france-excellence-eiffel-scholarship-program",
  "applicationLabel": "Consultar cómo solicitar la nominación Eiffel",
  "applicationInstructions": "Contactar al área internacional de la universidad francesa elegida. La institución presenta la candidatura a Campus France; el estudiante no envía una solicitud directa.",
  "basesUrl": "https://www.campusfrance.org/en/france-excellence-eiffel-scholarship-program",
  "notes": [
    "Verificación mediante información oficial indexada de Campus France; la apertura directa del portal devolvió un error de acceso.",
    "No se indica un monto de doctorado porque las páginas oficiales consultadas muestran cifras diferentes."
  ]
},
"oxford-clarendon-2027-2028": {
  "eligibility": [
    "Cualquier nacionalidad y área de estudios; nuevos postulantes a maestría o DPhil."
  ],
  "requirements": [
    "Mérito y potencial académico sobresalientes.",
    "Completar la admisión antes del cierre de financiación del curso."
  ],
  "documents": [
    "Documentos de admisión requeridos por el curso."
  ],
  "importantDates": [
    {
      "label": "Cierre para consideración de financiación",
      "date": "Diciembre de 2026 o enero de 2027, según el curso"
    }
  ],
  "applicationUrl": "https://www.ox.ac.uk/admissions/graduate/courses",
  "applicationLabel": "Elegir curso y solicitar admisión en Oxford",
  "applicationInstructions": "Seleccionar el curso y presentar la admisión completa dentro de su plazo de diciembre o enero. Clarendon no exige solicitud independiente.",
  "basesUrl": "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/funding/clarendon",
  "notes": [
    "La admisión no garantiza la beca; la selección es competitiva."
  ]
},
"cambridge-woolf-masters-2027-2028": {
  "eligibility": [
    "Postulantes al MPhil en Asian and Middle Eastern Studies, itinerario Muslim-Jewish Relations."
  ],
  "requirements": [
    "Cumplir las condiciones académicas y lingüísticas del MPhil.",
    "Presentar una propuesta de investigación pertinente al Woolf Institute y responder las preguntas de financiación de la admisión."
  ],
  "documents": [
    "Documentación académica y de idioma exigida por el directorio del MPhil."
  ],
  "importantDates": [
    {
      "label": "Apertura de admisión",
      "date": "09/09/2026"
    },
    {
      "label": "Plazo de financiación del curso",
      "date": "08/12/2026"
    },
    {
      "label": "Cierre general de admisión; no sustituye el plazo de beca",
      "date": "13/05/2027"
    },
    {
      "label": "Inicio de estudios",
      "date": "01/10/2027"
    }
  ],
  "applicationUrl": "https://www.postgraduate.study.cam.ac.uk/courses/directory/amammpmjr",
  "applicationLabel": "Consultar el MPhil y solicitar admisión",
  "applicationInstructions": "Enviar la admisión antes del 08/12/2026 para optar a financiación y responder las preguntas de la beca. Woolf no requiere una solicitud independiente.",
  "basesUrl": "https://www.cambridgetrust.org/scholarship/woolf-institute-cambridge-scholarship/",
  "notes": [
    "El cronograma de financiación se contrastó con el directorio oficial de Cambridge para ingreso 2027.",
    "La beca no garantiza la admisión ni se concede automáticamente."
  ]
},
  "osiptel-peu-2027": {
    quantity: "60 becas integrales",
    eligibility: [
      "Estudiantes del último año de pregrado, egresados o bachilleres del semestre 2026-I de universidades licenciadas del país.",
      "Especialidades: Derecho, Economía o Ingeniería Económica e ingenierías de Telecomunicaciones, Electrónica, Sistemas, Informática, Software, Redes y Comunicaciones, Información o Industrial.",
    ],
    requirements: [
      "Ser estudiante del último año de pregrado a la fecha de postulación, egresado o bachiller del semestre 2026-I de una universidad licenciada del país.",
      "Pertenecer a una de las carreras admitidas por la convocatoria.",
      "No estar titulado.",
      "Firmar el compromiso de dedicación exclusiva durante las semanas del programa.",
      "Completar correctamente la ficha oficial de inscripción.",
    ],
    documents: [
      "Ficha de inscripción oficial completada.",
      "La documentación de sustento que OSIPTEL solicite para acreditar la condición académica y especialidad declaradas.",
    ],
    benefits: [
      "100 % de los costos académicos y materiales.",
      "Alimentación, movilidad local y seguro contra accidentes.",
      "Para becarios de regiones: traslado y alojamiento en Lima.",
      "Posibilidad de prácticas para quienes ocupen los primeros puestos por especialidad.",
    ],
    stages: [
      "Inscripción virtual.",
      "Examen de admisión virtual.",
      "Selección en estricto orden de mérito por especialidad.",
      "Inicio del programa presencial en Lima.",
    ],
    importantDates: [
      { label: "Cierre de postulaciones", date: "31/10/2026" },
      { label: "Examen de admisión", date: "08/11/2026" },
      { label: "Clases", date: "11/01/2027 al 19/03/2027" },
    ],
    applicationUrl: "https://beca.osiptel.gob.pe/",
    applicationLabel: "Postular al PEU OSIPTEL 2027",
    applicationInstructions: "Completa la inscripción en el formulario oficial de OSIPTEL antes del cierre de la convocatoria.",
    basesUrl: "https://www.osiptel.gob.pe/portal-del-usuario/noticias/estudias-derecho-econom%C3%ADa-e-ingenier%C3%ADa-conoce-las-razones-para-postular-por-una-de-las-60-becas-del-peu-osiptel/",
  },

  "upc-laureate-transforma-2027": {
    quantity: "50 becas integrales",
    eligibility: [
      "Jóvenes peruanos residentes en Lima o Callao que culminaron el colegio entre 2024 y 2026.",
      "Postulantes con alto rendimiento escolar y necesidad económica acreditada.",
    ],
    requirements: [
      "Ser peruano y residir en Lima o Callao.",
      "Haber terminado el colegio entre 2024 y 2026.",
      "Haber pertenecido al tercio superior en 4.° y 5.° de secundaria.",
      "Acreditar condición de pobreza o pobreza extrema mediante la clasificación socioeconómica correspondiente del OFIS/SISFOH.",
      "No haber cursado estudios superiores previamente.",
      "Aprobar el examen de admisión de la UPC.",
      "Superar la entrevista personal con el director de la carrera.",
      "Si resulta ganador, aceptar la beca dentro del plazo comunicado por la universidad.",
    ],
    documents: [
      "Documentación académica que acredite el rendimiento escolar solicitado.",
      "Sustento de la clasificación socioeconómica exigida por la convocatoria.",
      "Expediente digital solicitado por la UPC durante el proceso de postulación.",
    ],
    benefits: [
      "100 % de matrícula y pensiones durante la carrera.",
      "Programa de acompañamiento.",
      "Curso de inglés WeTALK.",
      "Carné universitario y trámite para obtener el bachillerato, según las bases.",
    ],
    stages: [
      "Registro y expediente digital.",
      "Examen de admisión UPC.",
      "Entrevista personal.",
      "Evaluación final y comunicación de resultados.",
      "Aceptación de la beca por el ganador.",
    ],
    importantDates: [
      { label: "Postulación", date: "15/09/2026 al 30/10/2026" },
      { label: "Posible cierre anticipado", date: "La UPC puede cerrar al completarse los cupos" },
    ],
    applicationUrl: "https://upc.edu.pe/nosotros/pilares-estrategicos/conoce-beca-laureate-transforma/",
    applicationLabel: "Revisar y postular en UPC",
    applicationInstructions: "La UPC concentra las bases y el acceso al expediente de postulación en la página oficial de la beca.",
    basesUrl: "https://upc.edu.pe/nosotros/pilares-estrategicos/conoce-beca-laureate-transforma/",
  },

  "proinversion-peu-2027": {
    quantity: "45 becas",
    eligibility: [
      "Estudiantes de los tres últimos ciclos o egresados en 2026 de las carreras admitidas por PROINVERSIÓN.",
      "Carreras elegibles: Economía o Ingeniería Económica, Derecho, Ingeniería Industrial, Administración, Gestión y Alta Dirección, Gestión Pública, Ingeniería Civil, Ingeniería Eléctrica, Mecánica Eléctrica o de Energía, Ingeniería Ambiental e Ingeniería Sanitaria.",
    ],
    requirements: [
      "Estar cursando uno de los tres últimos ciclos o haber egresado en 2026 de una carrera elegible.",
      "Completar la información de inscripción dentro del cronograma.",
      "Rendir las evaluaciones psicotécnica y psicológica y participar en la entrevista personal.",
      "No haber sido alumno del PEU de PROINVERSIÓN en ediciones anteriores.",
      "No encontrarse en impedimentos aplicables a servidores públicos.",
    ],
    documents: [
      "Durante la inscripción: foto tipo carné en alta calidad.",
      "Si resulta seleccionado: constancia de estudios o documento universitario que acredite carrera y ciclo, o documento que acredite egreso en 2026.",
      "Declaración jurada de cumplimiento de requisitos y ausencia de incompatibilidades.",
      "Compromiso de dedicación y permanencia en el curso.",
    ],
    benefits: [
      "Programa de 120 horas sin costo.",
      "Doble certificación de PROINVERSIÓN y ENAP para quienes aprueben.",
      "Posibilidad de prácticas preprofesionales o profesionales para los primeros puestos de cada especialidad.",
    ],
    stages: [
      "Inscripción en línea.",
      "Prueba psicotécnica.",
      "Evaluación psicológica.",
      "Entrevista personal.",
      "Publicación de seleccionados.",
    ],
    importantDates: [
      { label: "Inscripciones", date: "10/09/2026 al 30/10/2026" },
      { label: "Relación de inscritos", date: "05/11/2026" },
      { label: "Lista de becados", date: "27/11/2026" },
      { label: "Inicio de clases", date: "04/01/2027" },
    ],
    applicationUrl: "https://siga.proinversion.gob.pe/FichaPEU",
    applicationLabel: "Inscribirme al PEU PROINVERSIÓN",
    applicationInstructions: "La inscripción oficial se realiza en la ficha PEU de PROINVERSIÓN.",
    basesUrl: "https://www.investinperu.pe/peu-2027/",
  },

  "apci-becas-excelencia-suiza-2027-2028": {
    eligibility: [
      "Investigadores peruanos de todas las disciplinas que busquen realizar investigación o doctorado en Suiza.",
      "Para Perú, la convocatoria 2027-2028 no ofrece becas de pregrado, maestría, postdoctorado, artes ni estudios de idiomas.",
    ],
    requirements: [
      "Contar con grado de maestría o equivalente antes del 31/07/2027 para investigación o doctorado.",
      "Haber nacido después del 31/12/1991; la convocatoria para Perú establece un máximo de 35 años.",
      "Presentar un plan de investigación detallado con cronograma.",
      "Contar con el respaldo y carta de un supervisor académico en una universidad o institución suiza elegible.",
      "Para quienes ya residan en Suiza, cumplir con la fecha máxima de ingreso establecida por la convocatoria.",
      "No haber recibido previamente una beca del Gobierno suizo en los supuestos excluidos por las bases.",
    ],
    documents: [
      "Solicitud completa en la plataforma GO ESKAS.",
      "Diploma de maestría o equivalente y certificados académicos, traducidos y legalizados cuando corresponda.",
      "Plan de investigación.",
      "Carta de apoyo del supervisor académico en Suiza y su CV breve.",
      "Documentación adicional solicitada en el manual oficial de candidatura para Perú.",
    ],
    benefits: [
      "Subvención mensual de CHF 2,450 para cubrir gastos básicos de una persona.",
      "Cobertura y apoyos adicionales según el tipo de beca y las reglas oficiales vigentes.",
    ],
    stages: [
      "Verificar elegibilidad para Perú.",
      "Conseguir supervisor académico en Suiza.",
      "Registrar y completar solicitud en GO ESKAS.",
      "Evaluación por la Comisión Federal de Becas.",
      "Comunicación de resultados durante 2027.",
    ],
    importantDates: [
      { label: "Cierre para Perú", date: "13/11/2026" },
      { label: "Inicio previsto", date: "01/09/2027" },
    ],
    applicationUrl: "https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships",
    applicationLabel: "Postular en GO ESKAS",
    applicationInstructions: "La postulación se realiza únicamente en línea mediante GO ESKAS. No se envían expedientes por correo ni en papel.",
    basesUrl: "https://www.schweiz-peru.eda.admin.ch/es/becas",
    notes: ["La convocatoria para Perú 2027-2028 está orientada a investigación y doctorado; no incluye maestrías ni postdoctorados."],
  },

  "pucp-tu-ventana-al-mundo-2027": {
    eligibility: [
      "Estudiantes de pregrado de la PUCP que busquen una experiencia académica internacional de corta duración en 2027.",
    ],
    requirements: [
      "Ser mayor de edad.",
      "Estar matriculado en facultad para el semestre 2027-1; no aplica para estudiantes que permanezcan en Estudios Generales durante ese periodo.",
      "Tener CRAEST mayor a 50.",
      "Contar con pasaporte vigente hasta finales de 2027.",
      "No tener deudas con la PUCP ni sanciones disciplinarias.",
      "Acreditar inglés nivel B2 para los destinos que lo exijan.",
    ],
    documents: [
      "Pasaporte vigente.",
      "La documentación académica y de idioma que solicite la DARI según el destino elegido.",
    ],
    stages: [
      "Revisar destinos disponibles.",
      "Completar la postulación PUCP dentro del periodo habilitado.",
      "Evaluación de requisitos y selección según la convocatoria.",
    ],
    importantDates: [
      { label: "Apertura", date: "02/11/2026" },
      { label: "Cierre", date: "15/12/2026" },
    ],
    basesUrl: "https://internacional.pucp.edu.pe/convocatorias/tu-ventana-al-mundo-2027/",
  },

  "pronabec-beca-18-2027": {
    quantity: "1,000 becas integrales anunciadas para la convocatoria 2027",
    eligibility: [
      "Peruanos que cursan el último grado de secundaria o que ya egresaron del colegio.",
      "Postulantes con alto rendimiento académico y condición de pobreza, pobreza extrema o una situación de vulnerabilidad contemplada por la convocatoria.",
    ],
    requirements: [
      "Tener nacionalidad peruana.",
      "Cumplir el límite de edad de la modalidad elegida; algunas modalidades y las personas que acreditan discapacidad no tienen límite de edad.",
      "Estar cursando el último grado de secundaria o haber egresado de estudios reconocidos por el Ministerio de Educación.",
      "Acreditar alto rendimiento académico en los dos últimos grados concluidos de secundaria.",
      "Acreditar la condición de vulnerabilidad o situación especial exigida por la modalidad.",
      "Presentar las declaraciones juradas y formatos generados por el módulo de inscripción.",
    ],
    benefits: [
      "Examen o carpeta de admisión cuando corresponda.",
      "Matrícula y pensión de estudios.",
      "Nivelación académica cuando forma parte de la malla curricular.",
      "Obtención del grado, título o equivalente.",
      "Idioma inglés en los casos previstos por la convocatoria.",
      "Según modalidad y condición del hogar: alimentación, alojamiento, movilidad, materiales, útiles, vestimenta, equipo de estudio y transporte interprovincial.",
    ],
    stages: [
      "Inscripción al Examen Nacional de Preselección (ENP).",
      "Revisión de la inscripción.",
      "Publicación de postulantes aptos.",
      "Aplicación del ENP.",
      "Publicación de preseleccionados.",
    ],
    importantDates: [
      { label: "Inscripción al ENP", date: "09/10/2026 al 18/10/2026 · 11:59 a. m." },
      { label: "Revisión de inscripción", date: "10/10/2026 al 06/11/2026" },
      { label: "Postulantes aptos para ENP", date: "11/11/2026" },
      { label: "Examen Nacional de Preselección", date: "22/11/2026" },
      { label: "Lista de preseleccionados", date: "23/12/2026" },
    ],
    basesUrl: "https://www.pronabec.gob.pe/beca-18/",
  },

  "ucsp-beca-ingeniero-2027": {
    quantity: "6 becas",
    eligibility: [
      "Estudiantes que cursan quinto de secundaria en 2026 o egresados de secundaria en 2025.",
      "Interesados en Ingeniería Electrónica y de Telecomunicaciones o Ingeniería Mecatrónica en la UCSP.",
    ],
    requirements: [
      "Ser ingresante con vacante activa para el periodo 2027-1 al llegar a la etapa final de la beca.",
      "Quienes cursan quinto en 2026 deben haber pertenecido al tercio superior hasta cuarto de secundaria y luego acreditar el orden de mérito de primero a quinto.",
      "Egresados de 2025 deben haber pertenecido al tercio superior en cada uno de los cinco grados de secundaria.",
      "No haber iniciado estudios superiores previamente en la UCSP ni en otra institución de educación superior.",
    ],
    benefits: ["Cobertura del 100 % del valor de la cuota educativa de las carreras elegibles."],
    stages: [
      "Presentación virtual del expediente.",
      "Revisión de expedientes.",
      "Examen de aptitud académica y producción de textos.",
      "Entrevistas personales.",
      "Evaluación de requisitos finales.",
      "Comunicación de ganadores y aceptación de la beca.",
    ],
    importantDates: [
      { label: "Postulación", date: "31/08/2026 al 25/10/2026" },
      { label: "Publicación de preseleccionados", date: "04/11/2026" },
      { label: "Examen", date: "08/11/2026" },
      { label: "Entrevistas", date: "18/11/2026 y 24/11/2026" },
      { label: "Resultados finales", date: "01/03/2027" },
      { label: "Aceptación", date: "02/03/2027 al 05/03/2027" },
    ],
    applicationUrl: "https://docs.google.com/forms/d/1F6a4jbtvjtHWuYgfs0ae4FGELdfRzJpp4pzI185XiWw/viewform",
    applicationLabel: "Postular a Beca Ingeniero UCSP",
    applicationInstructions: "La UCSP enlaza este formulario como su inscripción oficial desde la página de la convocatoria. Antes de enviarlo, revisa las bases de la universidad.",
    basesUrl: "https://admision.ucsp.edu.pe/beca-ingeniero/",
  },

  "becas-bcp": {
    eligibility: [
      "Jóvenes talentosos del Perú de colegios públicos o privados que no cuenten con los recursos necesarios para acceder a educación superior de calidad.",
    ],
    requirements: [
      "Cumplir los requisitos que establezcan las bases de la convocatoria vigente de Becas BCP.",
      "Haber aprobado el proceso de admisión de una universidad o instituto aliado por una modalidad permitida por la beca.",
      "Haber ingresado a una de las carreras financiadas por el programa.",
      "Completar el formulario de inscripción de Becas BCP cuando la convocatoria se encuentre abierta.",
    ],
    documents: [
      "Documentación académica y socioeconómica solicitada en las bases de la convocatoria vigente.",
      "Constancia o documento de admisión a una institución educativa aliada, cuando corresponda.",
    ],
    stages: [
      "Revisión y verificación de requisitos.",
      "Evaluación psicométrica virtual.",
      "Entrevistas personales.",
    ],
    basesUrl: "https://www.viabcp.com/becasbcp1",
    notes: ["Actualmente el portal del BCP no publica una convocatoria abierta; los requisitos específicos deben actualizarse cuando se publiquen nuevas bases."],
  },

  "pronabec-beca-peru-2026": {
    eligibility: ["Peruanos que busquen iniciar estudios superiores en una institución, sede y programa elegible de la convocatoria."],
    requirements: [
      "Tener nacionalidad peruana.",
      "Haber culminado secundaria en Educación Básica Regular o Alternativa reconocida por el Ministerio de Educación.",
      "Haber ingresado a una institución de educación superior, sede, programa y modalidad elegibles.",
      "Cumplir adicionalmente los requisitos particulares de la institución educativa donante elegida.",
      "Presentar declaraciones juradas y formatos generados por el Módulo de Postulación para la Selección.",
    ],
    documents: ["Los documentos exigidos por PRONABEC y por la institución donante, según la oferta educativa elegida."],
    basesUrl: "https://www.pronabec.gob.pe/beca-peru/",
    notes: ["La convocatoria 2026 ya concluyó; estos requisitos corresponden a la edición publicada en 2026."],
  },

  "pronabec-beca-permanencia": {
    eligibility: ["Estudiantes de universidades públicas elegibles con buen rendimiento académico y condición de pobreza o pobreza extrema."],
    requirements: [
      "Tener nacionalidad peruana.",
      "Acreditar pobreza o pobreza extrema vigente según SISFOH/OFIS.",
      "Acreditar rendimiento académico de medio superior como mínimo en el último periodo concluido o acumulado.",
      "Ser estudiante de una universidad pública, carrera y sede elegibles.",
      "Contar con matrícula vigente desde el segundo ciclo o año académico en adelante, según el régimen de estudios.",
      "Presentar declaraciones juradas y formatos generados por el Módulo de Postulación.",
    ],
    documents: [
      "Constancia o certificado de matrícula vigente.",
      "Constancia o certificado que acredite el rendimiento académico exigido.",
      "Documentación adicional prevista en las bases para condiciones priorizables, si corresponde.",
    ],
    benefits: ["Alimentación.", "Movilidad local.", "Útiles de escritorio.", "Acompañamiento socioemocional y de bienestar."],
    basesUrl: "https://www.pronabec.gob.pe/beca-permanencia/",
    notes: ["La última convocatoria publicada corresponde a 2025 y está concluida."],
  },

  "pronabec-beca-hijos-docentes": {
    quantity: "800 becas en la convocatoria 2025",
    eligibility: ["Hijos de docentes que forman parte de la Carrera Pública Magisterial y que buscan iniciar o continuar estudios superiores."],
    requirements: [
      "Tener nacionalidad peruana.",
      "Ser hijo de un docente que forma parte de la Carrera Pública Magisterial.",
      "Cumplir el límite de edad de la convocatoria: menos de 22 años para egresados del colegio que no iniciaron estudios superiores y menos de 29 años para estudiantes de educación superior.",
      "Haber concluido la secundaria en EBR, EBA o EBE reconocida por el Ministerio de Educación.",
      "Para quienes ya estudian educación superior, acreditar matrícula, estudios o reserva de matrícula según el ciclo y la situación académica indicada en las bases.",
      "Presentar declaraciones juradas y formatos generados por el Módulo de Postulación para la Selección.",
    ],
    documents: [
      "Documentos que acrediten el vínculo con el docente de la Carrera Pública Magisterial.",
      "Documentación académica y de matrícula o reserva, según corresponda.",
      "Formatos y declaraciones juradas del módulo de postulación.",
    ],
    basesUrl: "https://www.pronabec.gob.pe/beca-hijos-de-docentes/",
    notes: ["La convocatoria 2025 está concluida; los requisitos mostrados corresponden a esa edición oficial."],
  },

  "pronabec-beca-tec": {
    quantity: "300 becas en la convocatoria 2025",
    eligibility: ["Peruanos que culminaron la secundaria y tenían entre 17 y 39 años a la fecha establecida en las bases 2025."],
    requirements: [
      "Tener nacionalidad peruana.",
      "Tener entre 17 y 39 años a la fecha de publicación de las bases de la convocatoria 2025.",
      "Haber culminado la secundaria.",
      "Cumplir con las condiciones académicas y de admisión de una institución y programa técnico elegibles.",
      "No encontrarse en los impedimentos señalados por PRONABEC, como haber culminado estudios superiores o mantener determinadas incompatibilidades con otras becas estatales.",
    ],
    documents: ["Documentación académica, de admisión y declaraciones juradas exigidas por las bases del concurso."],
    benefits: [
      "Examen o carpeta de admisión, matrícula y pensiones.",
      "Obtención del grado o título.",
      "Alimentación, alojamiento, movilidad, materiales, útiles y transporte interprovincial, según corresponda.",
      "Laptop para quienes sigan estudios de nivel profesional técnico, según las bases.",
    ],
    basesUrl: "https://www.pronabec.gob.pe/beca-tec/",
    notes: ["La convocatoria 2025 está concluida; los requisitos pueden cambiar en una futura edición."],
  },

  "pronabec-beca-productiva": {
    eligibility: ["Personas peruanas mayores de edad que pertenezcan a las poblaciones y ámbitos definidos para las modalidades de formación técnico-productiva."],
    requirements: [
      "Ser peruano.",
      "Tener como mínimo 18 años a la fecha establecida en las bases 2025.",
      "Acreditar residencia en el ámbito geográfico exigido por la modalidad correspondiente.",
      "Acreditar la condición de vulnerabilidad o situación especial requerida por la modalidad.",
      "Acreditar estudios de educación básica, primaria o secundaria, completa o incompleta, reconocidos por el Ministerio de Educación.",
      "Haber sido admitido por una institución, sede y curso de capacitación elegibles.",
      "Presentar formatos y declaraciones juradas establecidos en las bases.",
    ],
    documents: [
      "Documento o sustento de residencia cuando corresponda.",
      "Documentación que acredite la condición de vulnerabilidad o situación especial.",
      "Documento de admisión a la institución y curso elegibles.",
      "Formatos y declaraciones juradas exigidos por PRONABEC.",
    ],
    benefits: ["Matrícula y pensiones.", "Certificación al culminar satisfactoriamente.", "Alimentación, movilidad, materiales y útiles.", "Alojamiento y transporte interprovincial en las modalidades que lo contemplen."],
    basesUrl: "https://www.pronabec.gob.pe/beca-productiva/",
    notes: ["La convocatoria 2025 está concluida; los requisitos corresponden a sus modalidades publicadas."],
  },

  "pronabec-beca-inclusion-carreras-profesionales": {
    quantity: "20 becas en la convocatoria 2025",
    eligibility: ["Personas peruanas con discapacidad que busquen iniciar o continuar estudios universitarios o técnico-profesionales en instituciones elegibles."],
    requirements: [
      "Tener nacionalidad peruana.",
      "Acreditar la condición de discapacidad mediante registro, carné o resolución de CONADIS, o certificado de discapacidad.",
      "Haber concluido la secundaria en EBR o EBA reconocida por el Ministerio de Educación.",
      "Haber ingresado a una universidad, instituto o escuela, sede y carrera elegibles para iniciar estudios en 2025-II o 2026-I, o continuar estudios ya iniciados.",
      "Presentar declaraciones juradas y formatos generados por PRONABEC.",
    ],
    documents: [
      "Documento que acredite la discapacidad.",
      "Documento de conclusión de secundaria.",
      "Documento de ingreso o matrícula en institución y programa elegibles.",
      "Declaraciones juradas y formatos del módulo de postulación.",
    ],
    basesUrl: "https://www.pronabec.gob.pe/beca-inclusion-carreras-profesionales/",
    notes: ["La convocatoria 2025 está concluida; los requisitos mostrados corresponden a esa edición."],
  },

  "ubc-international-scholars-2027": {
    eligibility: [
      "Estudiante internacional que necesitará permiso de estudios canadiense.",
      "Ingreso directo a UBC desde un colegio secundario acreditado.",
      "Para la sesión 2027, haber egresado de secundaria no antes de junio de 2026.",
      "Postular a la primera carrera universitaria.",
      "Demostrar rendimiento académico sobresaliente, liderazgo, contribuciones significativas a la comunidad y necesidad económica importante.",
    ],
    requirements: [
      "Postular primero a admisión en UBC.",
      "Gestionar la nominación con el colegio y contar con una persona nominadora y un docente de referencia.",
      "Presentar información familiar y financiera que permita evaluar la necesidad económica.",
      "Completar los ensayos solicitados y, si corresponde, una entrevista en video.",
    ],
    benefits: [
      "Apoyo financiero determinado por la necesidad económica y el tipo de premio otorgado.",
      "Acompañamiento de asesores del International Scholars Program.",
      "Acceso a talleres, retiros y oportunidades de intercambio y co-op, según disponibilidad y elegibilidad.",
    ],
    stages: [
      "Elegir programa y campus.",
      "Coordinar nominación con el colegio.",
      "Postular a UBC y al programa de International Scholars.",
      "Entregar información financiera y ensayos.",
      "Evaluación y eventual entrevista en video.",
    ],
    importantDates: [
      { label: "Apertura de solicitudes", date: "05/10/2026" },
      { label: "Fecha límite International Scholars", date: "15/11/2026 · 11:59 p. m. PST" },
      { label: "Anuncio estimado de becas", date: "Abril de 2027" },
    ],
    applicationUrl: "https://you.ubc.ca/apply/",
    applicationLabel: "Postular oficialmente a UBC",
    applicationInstructions: "UBC indica que la postulación comienza con la solicitud oficial de admisión. Desde esa solicitud se continúa con el proceso del International Scholars Program.",
    basesUrl: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/",
  },

  "pronabec-generacion-bicentenario-extraordinaria-2026": {
    quantity: "20 becas integrales",
    eligibility: [
      "Profesionales peruanos que buscan realizar una maestría o doctorado en una institución elegible del extranjero.",
      "Postulantes con alto rendimiento académico e insuficientes recursos económicos para financiar el posgrado.",
    ],
    requirements: [
      "Tener nacionalidad peruana.",
      "Para maestría, contar con grado de bachiller, título profesional o título profesional técnico, según las bases.",
      "Para doctorado, contar con grado de bachiller, título profesional o grado de maestría, según las bases.",
      "Cumplir con los requisitos del programa y de una institución de educación superior extranjera elegible.",
      "El programa financiado debe iniciar dentro del periodo señalado por la convocatoria extraordinaria 2026.",
      "Cumplir las condiciones económicas, académicas y demás requisitos establecidos en las bases vigentes.",
    ],
    benefits: [
      "Matrícula y pensión de estudios.",
      "Obtención del grado y trabajo de investigación.",
      "Transporte internacional.",
      "Alojamiento, alimentación y movilidad local.",
      "Seguro médico y costos administrativos contemplados por las normas aplicables.",
    ],
    stages: ["Postulación", "Subsanación", "Publicación de seleccionados", "Aceptación de la beca", "Publicación de becarios"],
    importantDates: [
      { label: "Postulación", date: "30/10/2026 al 13/11/2026 · 11:59 p. m." },
      { label: "Subsanación", date: "03/11/2026 al 24/11/2026" },
      { label: "Seleccionados", date: "15/12/2026" },
      { label: "Aceptación", date: "16/12/2026 al 21/12/2026" },
      { label: "Lista de becarios", date: "A partir del 22/12/2026" },
    ],
    applicationInstructions: "La fase de postulación abre el 30/10/2026. Hasta entonces ROMIL PLUS no mostrará un botón de postulación directa para evitar enviar a un módulo antes de su apertura.",
    basesUrl: "https://www.pronabec.gob.pe/beca-generacion-bicentenario/",
  },

  "pronabec-alianza-pacifico-2026": {
    eligibility: ["Peruanos que buscaban realizar movilidad académica en Chile, Colombia o México durante la convocatoria 2026."],
    requirements: [
      "Ser ciudadano peruano o de uno de los países miembros de la Alianza del Pacífico, según corresponda.",
      "Contar con aceptación definitiva de una institución de educación superior extranjera elegible.",
      "Acreditar permiso para ausentarse durante la beca y la convalidación de estudios por parte de la institución de origen.",
      "Acreditar vínculo académico o laboral con la institución de origen; para pregrado, contar con matrícula vigente.",
      "No encontrarse en los impedimentos indicados en las bases, como residencia permanente o doble nacionalidad con el país de destino en los supuestos señalados.",
    ],
    documents: ["Carta de aceptación de la institución extranjera.", "Documentos de vínculo académico o laboral y autorización de la institución de origen.", "Documentación adicional prevista en las bases de la modalidad elegida."],
    basesUrl: "https://www.pronabec.gob.pe/beca-alianza-del-pacifico/",
    notes: ["La convocatoria 2026 está concluida."],
  },

  "pronabec-beca-japon-2027": {
    eligibility: ["Escolares de quinto de secundaria, egresados, universitarios y profesionales peruanos interesados en estudiar en Japón y con al menos nivel intermedio de inglés, según modalidad."],
    requirements: [
      "Técnica/Ocupacional: cursar el último año de secundaria, ser egresado o estudiante universitario; tener más de 16 y menos de 24 años; buena preparación en las materias exigidas; inglés intermedio como mínimo y buena salud física y mental.",
      "Pregrado: demostrar preparación para ingresar a la universidad; tener más de 16 y menos de 24 años; inglés intermedio como mínimo y buena salud física y mental.",
      "Posgrado: ser menor de 35 años; ser graduado universitario o de escuela superior con al menos cinco años de formación; contar con inglés y/o japonés intermedio como mínimo y buena salud física y mental.",
    ],
    documents: ["Documentación académica y personal requerida por la Embajada del Japón según modalidad, presentada en PDF conforme a las instrucciones oficiales."],
    stages: ["Postulación virtual.", "Revisión de documentos.", "Evaluaciones y selección según la modalidad MEXT correspondiente."],
    basesUrl: "https://www.pronabec.gob.pe/beca-japon-2027/",
    notes: ["La convocatoria para ingreso 2027 cerró en junio de 2026."],
  },

  "pronabec-beca-brasil-2026": {
    quantity: "889 becas anunciadas: 539 maestrías y 350 doctorados",
    eligibility: ["Estudiantes internacionales, incluidos peruanos, interesados en cursar maestría o doctorado presencial en una institución brasileña asociada al GCUB."],
    requirements: [
      "Ser ciudadano de un Estado que mantenga relaciones diplomáticas con Brasil.",
      "No poseer nacionalidad brasileña.",
      "Tener dominio del idioma en el que se dicte el programa elegido.",
      "Declarar que goza de buena salud física y mental para realizar estudios de posgrado.",
      "Tener capacidad financiera para cubrir gastos no incluidos por la beca, como pasajes, visa, seguro médico internacional y otros gastos de mantenimiento.",
      "Contar con título de pregrado; para determinados doctorados, verificar si además se exige título de maestría.",
    ],
    documents: ["Formulario de inscripción en línea y documentos académicos requeridos en PDF por el GCUB."],
    benefits: ["Exención de tasas académicas.", "Acceso a servicios de la institución anfitriona.", "Subvención mensual."],
    stages: ["Elegir hasta cuatro opciones de programa.", "Completar una única inscripción en línea.", "Adjuntar documentos requeridos.", "Evaluación y selección por el programa."],
    basesUrl: "https://www.pronabec.gob.pe/beca-brasil-2026/",
    notes: ["La convocatoria 2026 cerró el 06/07/2026."],
  },
};

export function getScholarshipDetail(scholarship: Scholarship): ScholarshipDetailExtra {
  const specific = detailMap[scholarship.slug] ?? {};
  return {
    eligibility: specific.eligibility ?? [scholarship.summary],
    benefits: specific.benefits ?? [scholarship.coverage],
    requirements: specific.requirements ?? [
      `Cumplir los requisitos de la convocatoria de ${scholarship.institution} y acreditar las condiciones descritas para esta oportunidad antes de postular.`,
    ],
    documents: specific.documents ?? [
      "Presentar los documentos que acrediten los requisitos de la convocatoria según la fuente oficial vigente.",
    ],
    stages: specific.stages ?? [
      "Revisar la convocatoria y bases oficiales",
      "Preparar los documentos exigidos",
      "Completar la postulación en el canal oficial indicado",
    ],
    importantDates: specific.importantDates ?? [{ label: "Fecha o estado publicado", date: scholarship.deadline }],
    ...specific,
  };
}

export function getScholarshipBySlug(slug: string) {
  return scholarships.find((scholarship) => scholarship.slug === slug);
}
