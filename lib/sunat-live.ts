import type { PublicJobCategory, PublicOpportunity } from "@/lib/state-opportunities";

const SUNAT_SEARCH_URL =
  "https://unete.sunat.gob.pe/es/unete/form_proceso_convocatoria_nueva/search";
const SUNAT_PAGES_TO_CHECK = [0, 1];
const TERMINAL_STATES = new Set([
  "CONCLUIDAS",
  "CONCLUIDA",
  "CONCLUIDO",
  "CANCELADAS",
  "CANCELADA",
  "CANCELADO",
  "DESIERTO",
  "DESIERTA",
]);
const ACTIVE_STATES = new Set(["NUEVO", "EN PROCESO", "VIGENTE", "ABIERTA", "ABIERTO"]);

function decodeHtml(value: string) {
  const namedEntities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&ordm;": "º",
    "&deg;": "°",
    "&aacute;": "á",
    "&eacute;": "é",
    "&iacute;": "í",
    "&oacute;": "ó",
    "&uacute;": "ú",
    "&ntilde;": "ñ",
    "&Aacute;": "Á",
    "&Eacute;": "É",
    "&Iacute;": "Í",
    "&Oacute;": "Ó",
    "&Uacute;": "Ú",
    "&Ntilde;": "Ñ",
  };

  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(
      /&(nbsp|amp|quot|apos|ordm|deg|aacute|eacute|iacute|oacute|uacute|ntilde|Aacute|Eacute|Iacute|Oacute|Uacute|Ntilde);/g,
      (entity) => namedEntities[entity] ?? entity,
    );
}

function htmlToText(html: string) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value: string) {
  const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function limaTodayUtc() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return Date.UTC(get("year"), get("month") - 1, get("day"));
}

function limaDateLabel() {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}

function displayDate(value: string) {
  const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  return match ? `${match[1]}/${match[2]}/${match[3]}` : value;
}

function titleCase(value: string) {
  const lower = value.toLocaleLowerCase("es");
  const result = lower.replace(/(^|[\s(/-])([a-záéíóúñ])/g, (_, prefix, letter) =>
    `${prefix}${String(letter).toLocaleUpperCase("es")}`,
  );

  return result
    .replace(/\bTi\b/g, "TI")
    .replace(/\bJava\b/g, "Java")
    .replace(/\bSunat\b/g, "SUNAT")
    .replace(/\bIqbf\b/g, "IQBF");
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function inferCategory(title: string, career: string): PublicJobCategory {
  const text = `${title} ${career}`.toLocaleLowerCase("es");

  if (
    /(program|sistemas?|software|cloud|inform[aá]tic|computaci[oó]n|tecnolog|base de datos|help desk|soporte inform[aá]tico|arquitecto ti)/.test(
      text,
    )
  ) {
    return "Ingeniería y TI";
  }
  if (/(m[eé]dic|enfermer|psicolog|salud|trabajo social|ocupacional)/.test(text)) {
    return "Salud";
  }
  if (/(t[eé]cnic|t[eé]cnico)/.test(text)) return "Técnicos";
  if (/(legal|derecho|abogad|jur[ií]dic)/.test(text)) return "Legal";
  if (
    /(administr|contab|econom|contrat|almac[eé]n|log[ií]st|gesti[oó]n|tributari|fiscaliz|aduaner|negocios internacionales)/.test(
      text,
    )
  ) {
    return "Administración";
  }
  return "Varias";
}

function isProfessionalPractice(processType: string, rawTitle: string) {
  if (processType !== "PRA") return false;
  return /^PR[ÁA]CTICAS\s+PROFESIONALES\b/i.test(rawTitle.trim());
}

function parseSunatPage(html: string): PublicOpportunity[] {
  const text = htmlToText(html);
  const today = limaTodayUtc();
  const verifiedAt = limaDateLabel();
  const jobs: PublicOpportunity[] = [];
  const processPattern =
    /(CAS|PRA)\s+N[º°]\s*(\d+)\s*-\s*(\d{4})\s+(.+?)\s+Fecha de Inicio:\s*(\d{2}-\d{2}-\d{4})\s+a Fecha Fin:\s*(\d{2}-\d{2}-\d{4})\s+Ciudad:\s*(.+?)\.\s+(?:Carrera:\s*(.+?)\.\s+)?Estado:\s*(NUEVO|EN PROCESO|CONCLUIDAS|CONCLUIDA|CONCLUIDO|CANCELADAS|CANCELADA|CANCELADO|DESIERTO|DESIERTA|VIGENTE|ABIERTA|ABIERTO)/gi;

  let match: RegExpExecArray | null;
  while ((match = processPattern.exec(text)) !== null) {
    const [
      ,
      processType,
      processNumber,
      year,
      rawTitle,
      startDate,
      endDate,
      rawCity,
      rawCareer = "",
      rawStateValue,
    ] = match;
    const rawState = rawStateValue.toLocaleUpperCase("es").trim();
    const end = parseDate(endDate);
    const start = parseDate(startDate);

    if (!start || !end) continue;
    if (TERMINAL_STATES.has(rawState) || !ACTIVE_STATES.has(rawState)) continue;
    if (end < today) continue;

    // RomilPlus publica los procesos CAS y, dentro de PRA, únicamente las
    // prácticas profesionales. Las prácticas preprofesionales quedan fuera
    // para no mezclar modalidades distintas en esta sincronización.
    if (processType === "PRA" && !isProfessionalPractice(processType, rawTitle)) continue;

    const readableTitle = titleCase(rawTitle.trim());
    const career = rawCareer.trim().replace(/\s+/g, " ");
    const city = rawCity.trim().replace(/\s+/g, " ");
    const processCode = `${processType} Nº ${processNumber} - ${year}`;
    const specificSearch = `${SUNAT_SEARCH_URL}?busqueda=${encodeURIComponent(
      processCode,
    )}&form_id=mysearch_form&op=Buscar`;
    const isPractice = processType === "PRA";

    jobs.push({
      slug: `sunat-${processType.toLocaleLowerCase("es")}-${processNumber}-${year}-${slugify(readableTitle)}`,
      entity: "SUNAT",
      title: `${processCode} · ${readableTitle}`,
      category: inferCategory(readableTitle, career),
      status: start > today ? "Próxima" : "Vigente",
      regime: isPractice
        ? "Prácticas profesionales · SUNAT · sincronización automática"
        : "CAS · SUNAT · sincronización automática",
      location: /^ver convocatoria$/i.test(city) ? "Según convocatoria SUNAT" : titleCase(city),
      vacancies: null,
      publishedAt: displayDate(startDate),
      closesAt: displayDate(endDate),
      verifiedAt,
      sourceUrl: specificSearch,
      sourceLabel: "SUNAT · sincronización automática",
      summary: career
        ? isPractice
          ? `Prácticas profesionales SUNAT. Carreras admitidas según el portal oficial: ${career}.`
          : `Carreras admitidas según el portal oficial de SUNAT: ${career}.`
        : isPractice
          ? "Convocatoria de prácticas profesionales detectada directamente en el portal oficial Únete a la SUNAT. Revisa las bases antes de postular."
          : "Convocatoria detectada directamente en el portal oficial Únete a la SUNAT. Revisa las bases antes de postular.",
    });
  }

  return jobs;
}

export async function getSunatLiveJobs(): Promise<PublicOpportunity[]> {
  try {
    const results = await Promise.allSettled(
      SUNAT_PAGES_TO_CHECK.map(async (page) => {
        const response = await fetch(`${SUNAT_SEARCH_URL}/?page=${page}`, {
          headers: {
            Accept: "text/html,application/xhtml+xml",
            "User-Agent": "ROMIL-PLUS-SUNAT-SYNC/1.0 (+https://www.romilplus.me)",
          },
          next: { revalidate: 300 },
        });

        if (!response.ok) {
          throw new Error(`SUNAT respondió ${response.status}`);
        }

        return parseSunatPage(await response.text());
      }),
    );

    const bySlug = new Map<string, PublicOpportunity>();
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      for (const job of result.value) bySlug.set(job.slug, job);
    }

    return Array.from(bySlug.values()).sort((a, b) =>
      b.slug.localeCompare(a.slug, "es", { numeric: true }),
    );
  } catch (error) {
    console.error("No se pudo sincronizar SUNAT", error);
    return [];
  }
}
