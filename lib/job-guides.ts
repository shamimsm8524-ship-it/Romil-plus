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
    readTime: "3 min",
    sections: [
      { heading: "Empieza siempre por las bases oficiales", paragraphs: ["No te quedes solo con una publicación resumida. Abre las bases de la entidad y confirma el puesto, requisitos mínimos, experiencia, formación, remuneración, lugar de trabajo y cronograma.", "Si encuentras alguna diferencia, sigue siempre la información publicada por la entidad oficial."] },
      { heading: "Revisa si cumples los requisitos mínimos", paragraphs: ["En procesos CAS, los requisitos mínimos determinan si puedes continuar en el proceso. Lee con cuidado cómo se contabiliza la experiencia y qué estudios o certificados se aceptan."], bullets: ["Formación académica requerida.", "Experiencia general y específica.", "Cursos o especializaciones exigidas.", "Colegiatura o habilitación cuando corresponda.", "Conocimientos técnicos indicados en el perfil."] },
      { heading: "Ordena tus sustentos antes del día de postulación", paragraphs: ["Prepara con anticipación certificados de trabajo, constancias, títulos, grados y otros documentos que la convocatoria pida. Nombra tus archivos de forma clara y revisa que sean legibles."] },
      { heading: "Respeta el cronograma y el canal indicado", paragraphs: ["Algunas entidades reciben postulaciones por plataforma, otras por correo o formularios propios. También pueden establecer horas exactas. Presentar documentos fuera del canal o del plazo puede dejarte fuera aunque cumplas el perfil."] },
      { heading: "Guarda evidencia de tu postulación", paragraphs: ["Conserva el correo enviado, constancia, captura o número de registro. Luego revisa los resultados en las fechas indicadas por la entidad."] },
      { heading: "Construye una matriz de requisitos", paragraphs: ["Antes de completar el formulario, crea una tabla con cuatro columnas: requisito literal de las bases, documento que lo sustenta, página del archivo y observación pendiente. Esta revisión ayuda a detectar un certificado ilegible o una fecha que no coincide antes de enviar el expediente.", "Ejemplo orientativo: si el perfil exige experiencia específica en atención al público, registra qué constancia describe esas funciones y sus fechas. No asumas que el nombre del cargo basta. La forma de acreditar y contabilizar esa experiencia depende de las bases del proceso."], bullets: ["Comprueba que cada archivo abre y muestra todas sus páginas.", "Respeta el formato, peso y orden indicados por la entidad.", "Revisa firmas y declaraciones exigidas; no agregues requisitos por tu cuenta.", "Confirma si existe una modificación oficial del cronograma antes de enviar."] },
      { heading: "Después del envío", paragraphs: ["Anota las fechas de evaluación y revisa el mismo portal oficial donde se publicó el proceso. Guardar el expediente no sustituye revisar resultados, comunicados y eventuales etapas adicionales.", "Si necesitas consultar una observación, utiliza el canal y plazo que indiquen las bases. Incluye el número del proceso y explica la duda con precisión. Un resumen de ROMIL PLUS no modifica las reglas ni garantiza la admisión."] },
    ],
  },
  {
    slug: "como-detectar-convocatorias-falsas",
    title: "Cómo detectar una convocatoria de trabajo falsa",
    description: "Señales de alerta y comprobaciones básicas para evitar ofertas laborales engañosas.",
    readTime: "3 min",
    sections: [
      { heading: "Busca la fuente original", paragraphs: ["Una convocatoria del Estado debería poder comprobarse en el portal de la entidad, Talento Perú u otro canal institucional indicado oficialmente. No confíes solo en capturas reenviadas o publicaciones sin enlace verificable."] },
      { heading: "Desconfía si te piden pagar para asegurar una vacante", paragraphs: ["ROMIL PLUS no cobra por postular. Una persona que promete garantizarte una plaza a cambio de dinero, transferencias o depósitos es una señal de alerta importante."] },
      { heading: "Protege tus datos", paragraphs: ["Una postulación puede requerir información personal y documentos, pero no debería obligarte a entregar contraseñas de correo, claves bancarias o códigos de verificación."], bullets: ["No compartas claves ni códigos de autenticación.", "Comprueba el dominio del correo o portal.", "Evita enviar documentos sensibles a contactos no identificados.", "Guarda los comprobantes de todo trámite legítimo."] },
      { heading: "Comprueba fechas y nombres", paragraphs: ["Los avisos falsos suelen reutilizar logos o convocatorias antiguas. Verifica que el número del proceso, año, puesto y cronograma coincidan con lo publicado por la entidad."] },
      { heading: "Comprueba un enlace sin confiar en el logo", paragraphs: ["Escribe la dirección del portal institucional en el navegador o busca la entidad en gob.pe. Desde allí localiza su sección de convocatorias y busca el mismo número de proceso. Un candado HTTPS indica una conexión cifrada, pero por sí solo no demuestra que una oferta sea auténtica.", "Ejemplo ficticio: un aviso reenviado anuncia una fecha de cierre distinta a la de las bases. Antes de enviar documentos, busca una ampliación de plazo publicada por la entidad. Si no puedes confirmar el cambio, no lo des por válido y consulta el canal institucional."] },
      { heading: "Si ya compartiste información", paragraphs: ["Detén el intercambio con el contacto sospechoso y conserva el enlace, mensajes y comprobantes. Si compartiste una contraseña, cámbiala desde el sitio oficial y revisa las sesiones abiertas. Si entregaste un código o hiciste una transferencia, contacta de inmediato al proveedor o banco mediante sus canales oficiales.", "Puedes comunicar a ROMIL PLUS un enlace dudoso para que revisemos nuestra publicación. No reenvíes documentos personales completos ni contraseñas para justificar el reporte."] },
    ],
  },
  {
    slug: "cv-para-sector-publico",
    title: "CV para el sector público: qué preparar antes de postular",
    description: "Cómo ordenar tu experiencia y documentos para responder mejor a una convocatoria pública.",
    readTime: "3 min",
    sections: [
      { heading: "Haz que tu CV coincida con los sustentos", paragraphs: ["En muchos procesos públicos no basta con escribir una experiencia en el CV: después debes sustentarla. Evita incluir información que no puedas demostrar cuando la convocatoria exija documentación."] },
      { heading: "Separa experiencia general y específica", paragraphs: ["Lee cómo define la entidad cada tipo de experiencia. Una misma constancia puede servir para acreditar experiencia general, pero no necesariamente la experiencia específica solicitada para el puesto."] },
      { heading: "Ordena tu formación y cursos", paragraphs: ["Incluye primero lo que tenga relación directa con el perfil. Revisa si las bases piden una cantidad mínima de horas, una antigüedad determinada o un tema concreto."], bullets: ["Grado o título principal.", "Colegiatura y habilitación, si aplica.", "Cursos relacionados al perfil.", "Especializaciones y diplomados pertinentes.", "Certificados legibles y completos."] },
      { heading: "No uses un solo CV para todo", paragraphs: ["Puedes mantener un CV maestro, pero adapta el orden y énfasis para cada convocatoria. El objetivo no es inventar experiencia, sino facilitar que el evaluador identifique rápidamente dónde cumples los requisitos."] },
      { heading: "Describe funciones que puedas acreditar", paragraphs: ["Una entrada clara incluye entidad, cargo, fecha de inicio y fin, funciones y documento de sustento. Usa fechas consistentes con tus constancias. Si hay periodos superpuestos, decláralos tal como ocurrieron; no los sumes automáticamente para afirmar que cumples un mínimo.", "Ejemplo orientativo: en lugar de escribir únicamente «apoyo administrativo», describe una tarea real, como «registré expedientes y elaboré reportes de seguimiento». Utilízala solo si corresponde a tu experiencia y puede sustentarse cuando las bases lo exijan. No inventes cifras, cargos ni responsabilidades."] },
      { heading: "Revisión final del expediente", paragraphs: ["Si la entidad exige una ficha o formato propio, complétalo aunque ya tengas un CV diseñado. Comprueba que los datos de contacto sean correctos y que las páginas de los sustentos coincidan con el índice, si lo solicitan.", "Abre el archivo final desde otro dispositivo para revisar su legibilidad. Guarda una copia de la versión enviada y la constancia de recepción. Puedes preparar borradores con el creador de CV de ROMIL PLUS, pero el formato válido para la postulación lo determina cada convocatoria."], bullets: ["No incluyas datos bancarios ni contraseñas.", "Envía documentos únicamente por el canal oficial.", "Elimina información de terceros que no sea necesaria para tu expediente."] },
    ],
  },
];
