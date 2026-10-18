export type JobGuide = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const jobGuides: JobGuide[] = [
  {
    slug: "como-postular-convocatoria-cas",
    title: "Cómo postular a una convocatoria CAS sin perderte en el proceso",
    description: "Una guía práctica para leer las bases, preparar documentos y seguir correctamente el cronograma de una convocatoria CAS.",
    readTime: "7 min",
    sections: [
      { heading: "Empieza siempre por las bases oficiales", paragraphs: ["No te quedes solo con una publicación resumida. Abre las bases de la entidad y confirma el puesto, requisitos mínimos, experiencia, formación, remuneración, lugar de trabajo y cronograma.", "Si encuentras alguna diferencia, sigue siempre la información publicada por la entidad oficial."] },
      { heading: "Revisa si cumples los requisitos mínimos", paragraphs: ["En procesos CAS, los requisitos mínimos determinan si puedes continuar en el proceso. Lee con cuidado cómo se contabiliza la experiencia y qué estudios o certificados se aceptan."], bullets: ["Formación académica requerida.", "Experiencia general y específica.", "Cursos o especializaciones exigidas.", "Colegiatura o habilitación cuando corresponda.", "Conocimientos técnicos indicados en el perfil."] },
      { heading: "Ordena tus sustentos antes del día de postulación", paragraphs: ["Prepara con anticipación certificados de trabajo, constancias, títulos, grados y otros documentos que la convocatoria pida. Nombra tus archivos de forma clara y revisa que sean legibles."] },
      { heading: "Respeta el cronograma y el canal indicado", paragraphs: ["Algunas entidades reciben postulaciones por plataforma, otras por correo o formularios propios. También pueden establecer horas exactas. Presentar documentos fuera del canal o del plazo puede dejarte fuera aunque cumplas el perfil."] },
      { heading: "Guarda evidencia de tu postulación", paragraphs: ["Conserva el correo enviado, constancia, captura o número de registro. Luego revisa los resultados en las fechas indicadas por la entidad."] },
    ],
  },
  {
    slug: "como-detectar-convocatorias-falsas",
    title: "Cómo detectar una convocatoria de trabajo falsa",
    description: "Señales de alerta y comprobaciones básicas para evitar ofertas laborales engañosas.",
    readTime: "6 min",
    sections: [
      { heading: "Busca la fuente original", paragraphs: ["Una convocatoria del Estado debería poder comprobarse en el portal de la entidad, Talento Perú u otro canal institucional indicado oficialmente. No confíes solo en capturas reenviadas o publicaciones sin enlace verificable."] },
      { heading: "Desconfía si te piden pagar para asegurar una vacante", paragraphs: ["ROMIL PLUS no cobra por postular. Una persona que promete garantizarte una plaza a cambio de dinero, transferencias o depósitos es una señal de alerta importante."] },
      { heading: "Protege tus datos", paragraphs: ["Una postulación puede requerir información personal y documentos, pero no debería obligarte a entregar contraseñas de correo, claves bancarias o códigos de verificación."], bullets: ["No compartas claves ni códigos de autenticación.", "Comprueba el dominio del correo o portal.", "Evita enviar documentos sensibles a contactos no identificados.", "Guarda los comprobantes de todo trámite legítimo."] },
      { heading: "Comprueba fechas y nombres", paragraphs: ["Los avisos falsos suelen reutilizar logos o convocatorias antiguas. Verifica que el número del proceso, año, puesto y cronograma coincidan con lo publicado por la entidad."] },
    ],
  },
  {
    slug: "cv-para-sector-publico",
    title: "CV para el sector público: qué preparar antes de postular",
    description: "Cómo ordenar tu experiencia y documentos para responder mejor a una convocatoria pública.",
    readTime: "6 min",
    sections: [
      { heading: "Haz que tu CV coincida con los sustentos", paragraphs: ["En muchos procesos públicos no basta con escribir una experiencia en el CV: después debes sustentarla. Evita incluir información que no puedas demostrar cuando la convocatoria exija documentación."] },
      { heading: "Separa experiencia general y específica", paragraphs: ["Lee cómo define la entidad cada tipo de experiencia. Una misma constancia puede servir para acreditar experiencia general, pero no necesariamente la experiencia específica solicitada para el puesto."] },
      { heading: "Ordena tu formación y cursos", paragraphs: ["Incluye primero lo que tenga relación directa con el perfil. Revisa si las bases piden una cantidad mínima de horas, una antigüedad determinada o un tema concreto."], bullets: ["Grado o título principal.", "Colegiatura y habilitación, si aplica.", "Cursos relacionados al perfil.", "Especializaciones y diplomados pertinentes.", "Certificados legibles y completos."] },
      { heading: "No uses un solo CV para todo", paragraphs: ["Puedes mantener un CV maestro, pero adapta el orden y énfasis para cada convocatoria. El objetivo no es inventar experiencia, sino facilitar que el evaluador identifique rápidamente dónde cumples los requisitos."] },
    ],
  },
];
