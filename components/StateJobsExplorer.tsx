"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Cpu,
  GraduationCap,
  MapPin,
  Search,
  UsersRound,
  Wrench,
} from "lucide-react";
import type { PublicJobStatus, PublicOpportunity } from "@/lib/state-opportunities";

type FilterCategory =
  | "Todas"
  | "Cajeros y ventas"
  | "Atención al cliente"
  | "Restaurantes y comida"
  | "Limpieza y mantenimiento"
  | "Hoteles y turismo"
  | "Aeropuertos y aerolíneas"
  | "Seguridad"
  | "Almacén y logística"
  | "Transporte y delivery"
  | "Supermercados y tiendas"
  | "Producción y fábricas"
  | "Construcción y oficios"
  | "Salud"
  | "Docencia"
  | "Administración"
  | "Ingeniería y TI"
  | "Técnicos"
  | "Belleza y cuidado personal"
  | "Minería e industria"
  | "Agroindustria y campo"
  | "Banca y finanzas"
  | "Legal"
  | "Sector público"
  | "Prácticas"
  | "Trabajo remoto"
  | "Varias";

const categories: FilterCategory[] = [
  "Todas",
  "Cajeros y ventas",
  "Atención al cliente",
  "Restaurantes y comida",
  "Limpieza y mantenimiento",
  "Hoteles y turismo",
  "Aeropuertos y aerolíneas",
  "Seguridad",
  "Almacén y logística",
  "Transporte y delivery",
  "Supermercados y tiendas",
  "Producción y fábricas",
  "Construcción y oficios",
  "Salud",
  "Docencia",
  "Administración",
  "Ingeniería y TI",
  "Técnicos",
  "Belleza y cuidado personal",
  "Minería e industria",
  "Agroindustria y campo",
  "Banca y finanzas",
  "Legal",
  "Sector público",
  "Prácticas",
  "Trabajo remoto",
  "Varias",
];

const categoryKeywords: Record<Exclude<FilterCategory, "Todas">, string[]> = {
  "Cajeros y ventas": ["cajer", "vendedor", "ventas", "promotor", "impulsador", "asesor comercial", "retail"],
  "Atención al cliente": ["atención al cliente", "atencion al cliente", "anfitri", "recepcion", "call center", "teleoper", "servicio al cliente"],
  "Restaurantes y comida": ["restaurante", "poller", "mozo", "mesero", "azafata", "cocin", "ayudante de cocina", "barista", "bartender", "bar ", "cafeter", "panader", "pasteler", "fast food", "lavaplat"],
  "Limpieza y mantenimiento": ["limpieza", "operario de limpieza", "mantenimiento", "housekeeping", "jardiner", "saneamiento"],
  "Hoteles y turismo": ["hotel", "turismo", "camarer", "housekeeping", "botones", "reservas", "hospedaje", "guía", "guia"],
  "Aeropuertos y aerolíneas": ["aeropuerto", "aerolínea", "aerolinea", "tripulante", "cabina", "rampa", "equipaje", "pasajero", "aviación", "aviacion"],
  Seguridad: ["seguridad", "vigilante", "prevención de pérdidas", "prevencion de perdidas", "control de accesos", "cctv"],
  "Almacén y logística": ["almacén", "almacen", "logística", "logistica", "picking", "packing", "inventario", "despacho", "montacarg"],
  "Transporte y delivery": ["conductor", "chofer", "repartidor", "delivery", "motoriz", "transporte", "distribución", "distribucion"],
  "Supermercados y tiendas": ["supermercado", "tienda", "reponedor", "reposición", "reposicion", "retail", "mercaderista"],
  "Producción y fábricas": ["producción", "produccion", "operario", "planta", "fábrica", "fabrica", "manufactura", "envasado", "etiquetado", "calidad"],
  "Construcción y oficios": ["construcción", "construccion", "albañil", "electricista", "gasfiter", "soldador", "pintor", "maestro de obra", "obra"],
  Salud: ["salud", "enfermer", "médic", "medic", "nutricion", "farmacia", "laboratorio", "odont", "clínica", "clinica"],
  Docencia: ["docent", "profesor", "auxiliar de educación", "ugel", "drec", "minedu", "educación", "educacion"],
  Administración: ["administr", "secretari", "digitador", "archivo", "recursos humanos", "rrhh", "contabilidad", "cobranzas", "gestión", "gestion"],
  "Ingeniería y TI": ["ingenier", "sistemas", "programación", "programacion", "software", "tecnolog", "soporte técnico", "soporte tecnico", "redes", "datos", "ciberseguridad"],
  Técnicos: ["técnic", "tecnico", "técnico"],
  "Belleza y cuidado personal": ["estilista", "barbero", "manicur", "cosmet", "masaj", "salón", "salon", "belleza"],
  "Minería e industria": ["minería", "mineria", "mina", "industrial", "mecánico", "mecanico", "operador", "campamento"],
  "Agroindustria y campo": ["agro", "agrícola", "agricola", "campo", "cosecha", "packing", "selección", "seleccion", "agroindustr"],
  "Banca y finanzas": ["banco", "banca", "finanzas", "crédito", "credito", "cajero bancario", "microfinanzas", "préstamo", "prestamo"],
  Legal: ["legal", "abogad", "juríd", "jurid", "judicial", "fiscal"],
  "Sector público": ["cas", "convocatoria", "ministerio", "municipalidad", "sunat", "sunarp", "ugel", "poder judicial", "sector público", "sector publico"],
  Prácticas: ["practicante", "prácticas", "practicas", "preprofesional", "pre-profesional", "práctica profesional", "practica profesional"],
  "Trabajo remoto": ["remoto", "teletrabajo", "home office", "desde casa", "trabajo remoto"],
  Varias: ["varias", "diversos", "múltiples", "multiples"],
};

const statuses: Array<"Todas" | PublicJobStatus> = [
  "Todas",
  "Vigente",
  "Próxima",
  "Cerrada reciente",
  "Sin convocatoria vigente",
];

type FeaturedCategory = {
  value: FilterCategory;
  label: string;
  icon: typeof BriefcaseBusiness;
  query?: string;
};

const featuredCategories: FeaturedCategory[] = [
  { value: "Cajeros y ventas", label: "Cajeros y ventas", icon: BriefcaseBusiness },
  { value: "Restaurantes y comida", label: "Restaurantes", icon: UsersRound },
  { value: "Limpieza y mantenimiento", label: "Limpieza", icon: Wrench },
  { value: "Almacén y logística", label: "Almacén", icon: Building2 },
  { value: "Todas", label: "Sin experiencia", icon: GraduationCap, query: "sin experiencia" },
  { value: "Ingeniería y TI", label: "Profesionales", icon: Cpu },
];

function regionFromLocation(location: string) {
  const last = location.split(",").pop()?.trim() || location;
  return last.split("·")[0].trim();
}

type ExplorerJob = PublicOpportunity & {
  details?: {
    salary?: string;
    applicationUrl?: string;
  };
};

function verifiedSalary(raw?: string) {
  if (!raw) return undefined;
  return /(?:^|\s)(?:S\/|US\$|\$|€)\s*[\d.,]+/i.test(raw) ? raw : undefined;
}

export default function StateJobsExplorer({
  jobs,
}: {
  jobs: PublicOpportunity[];
  detailSlugs?: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FilterCategory>("Todas");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Vigente");
  const [region, setRegion] = useState("Todas");

  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQuery(initial);
  }, []);

  const regions = useMemo(() => {
    const values = Array.from(new Set(jobs.map((job) => regionFromLocation(job.location)).filter(Boolean)));
    return ["Todas", ...values.sort((a, b) => a.localeCompare(b, "es"))];
  }, [jobs]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");

    return jobs.filter((job) => {
      const searchable = `${job.entity} ${job.title} ${job.category} ${job.location} ${job.summary} ${job.regime}`.toLocaleLowerCase("es");
      const keywords = category === "Todas" ? [] : categoryKeywords[category];
      const matchesCategory = category === "Todas" || job.category === category || keywords.some((keyword) => searchable.includes(keyword));
      const matchesStatus = status === "Todas" || job.status === status;
      const matchesRegion = region === "Todas" || job.location.toLocaleLowerCase("es").includes(region.toLocaleLowerCase("es"));
      const matchesQuery = !normalized || searchable.includes(normalized);
      return matchesCategory && matchesStatus && matchesRegion && matchesQuery;
    });
  }, [jobs, query, category, status, region]);

  const activeVacancies = jobs
    .filter((job) => job.status === "Vigente")
    .reduce((total, job) => total + (job.vacancies ?? 0), 0);

  const activeCount = jobs.filter((job) => job.status === "Vigente").length;

  return (
    <section className="pt-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[20px] border border-[#dbe5f1] bg-[#f8fafc] p-4">
          <BriefcaseBusiness size={22} className="text-[#0866d8]" />
          <p className="mt-2 text-3xl font-black text-[#0a2d5a]">{activeCount}</p>
          <p className="mt-1 text-base font-semibold text-[#6b7b8e]">publicaciones vigentes</p>
        </div>
        <div className="rounded-[20px] border border-[#dbe5f1] bg-[#f8fafc] p-4">
          <UsersRound size={22} className="text-[#0866d8]" />
          <p className="mt-2 text-3xl font-black text-[#0a2d5a]">{activeVacancies}+</p>
          <p className="mt-1 text-base font-semibold text-[#6b7b8e]">vacantes visibles</p>
        </div>
        <div className="rounded-[20px] border border-[#f0d481] bg-[#fff8e4] p-4">
          <Building2 size={22} className="text-[#b77d00]" />
          <p className="mt-2 text-3xl font-black text-[#0a2d5a]">Perú</p>
          <p className="mt-1 text-base font-semibold text-[#6b7b8e]">empresas, entidades y regiones</p>
        </div>
      </div>

      <div className="mt-6 rounded-[26px] border border-[#dbe5f1] bg-white p-4 shadow-[0_8px_26px_rgba(10,45,90,.05)] sm:p-5">
        <div className="flex items-center gap-2 rounded-[18px] border-2 border-[#d8e3ef] bg-white px-3 focus-within:border-[#8bb6e8]">
          <Search size={24} className="shrink-0 text-[#0866d8]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar cajero, limpieza, almacén, mozo, ingeniero..."
            className="min-w-0 flex-1 bg-transparent py-4 text-base font-semibold text-[#17365d] outline-none placeholder:text-[#8391a1] sm:text-lg"
          />
          <button type="button" onClick={() => setQuery(query.trim())} className="hidden rounded-xl bg-[#0866d8] px-5 py-3 text-base font-black text-white sm:block">Buscar</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {featuredCategories.map(({ value, label, icon: Icon, query: categoryQuery }) => {
            const active = categoryQuery
              ? category === "Todas" && query.toLocaleLowerCase("es") === categoryQuery
              : category === value && !query;
            return (
              <button
                key={`${value}-${label}`}
                type="button"
                onClick={() => {
                  setCategory(value);
                  setQuery(categoryQuery ?? "");
                }}
                className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-[18px] border px-3 text-center text-sm font-black transition sm:text-base ${
                  active
                    ? "border-[#efbd38] bg-[#f7c843] text-[#0a2d5a] shadow-sm"
                    : "border-[#dbe5f1] bg-[#f5f8fc] text-[#17365d] hover:border-[#a7c5e7] hover:bg-[#eef5ff]"
                }`}
              >
                <Icon size={25} className={active ? "text-[#0a2d5a]" : "text-[#0758ad]"} />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <label className="relative">
            <span className="sr-only">Región</span>
            <MapPin size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0758ad]" />
            <select value={region} onChange={(event) => setRegion(event.target.value)} className="min-h-14 w-full appearance-none rounded-[16px] border border-[#d7e2ef] bg-white pl-11 pr-4 text-base font-black text-[#17365d] outline-none focus:border-[#8bb6e8]">
              {regions.map((item) => <option key={item} value={item}>{item === "Todas" ? "Todas las regiones" : item}</option>)}
            </select>
          </label>

          <label className="relative">
            <span className="sr-only">Rubro de empleo</span>
            <BriefcaseBusiness size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0758ad]" />
            <select value={category} onChange={(event) => { setCategory(event.target.value as FilterCategory); setQuery(""); }} className="min-h-14 w-full appearance-none rounded-[16px] border border-[#d7e2ef] bg-white pl-11 pr-4 text-base font-black text-[#17365d] outline-none focus:border-[#8bb6e8]">
              {categories.map((item) => <option key={item} value={item}>{item === "Todas" ? "Todos los rubros" : item}</option>)}
            </select>
          </label>

          <label className="relative">
            <span className="sr-only">Estado</span>
            <CalendarDays size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0758ad]" />
            <select value={status} onChange={(event) => setStatus(event.target.value as (typeof statuses)[number])} className="min-h-14 w-full appearance-none rounded-[16px] border border-[#d7e2ef] bg-white pl-11 pr-4 text-base font-black text-[#17365d] outline-none focus:border-[#8bb6e8]">
              {statuses.map((item) => <option key={item} value={item}>{item === "Todas" ? "Todos los estados" : item}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[.08em] text-[#0b58b6]">Resultados</p>
          <h2 className="mt-1 text-3xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-4xl">Últimas oportunidades verificadas</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setCategory("Todas");
            setStatus("Vigente");
            setRegion("Todas");
          }}
          className="text-base font-black text-[#0866d8] hover:underline"
        >
          Limpiar filtros
        </button>
      </div>
      <p className="mt-2 text-base font-semibold text-[#697a8e]">{filtered.length} resultados</p>

      {filtered.length === 0 ? (
        <div className="mt-5 rounded-[22px] border border-[#dbe5f1] bg-[#f8fafc] p-7 text-center text-base font-semibold leading-7 text-[#647487]">
          Aún no encontramos una vacante vigente y verificada con esos filtros. Prueba otro rubro, región o palabra clave.
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {filtered.map((job) => {
            const typedJob = job as ExplorerJob;
            const isSunatLive = job.sourceLabel === "SUNAT · sincronización automática";
            const salary = verifiedSalary(typedJob.details?.salary);
            const applicationUrl = typedJob.details?.applicationUrl || job.sourceUrl;

            return (
              <article key={job.slug} className="grid gap-4 rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.055)] md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-sm font-black uppercase tracking-[.04em] ${
                      job.status === "Vigente"
                        ? "bg-[#e7f8ec] text-[#15723f]"
                        : job.status === "Próxima"
                          ? "bg-[#e9f3ff] text-[#0a5fbf]"
                          : "bg-[#f1f3f6] text-[#657489]"
                    }`}>
                      {job.status}
                    </span>
                    <span className="rounded-full bg-[#fff2c8] px-3 py-1 text-sm font-black uppercase tracking-[.04em] text-[#8d6200]">{job.category}</span>
                    {isSunatLive ? <span className="rounded-full bg-[#e9f7ff] px-3 py-1 text-sm font-black uppercase tracking-[.04em] text-[#0a668f]">SUNAT automático</span> : null}
                  </div>

                  <p className="mt-4 text-sm font-black uppercase tracking-[.055em] text-[#657489]">{job.entity}</p>
                  <h3 className="mt-1.5 text-2xl font-black leading-tight text-[#102f57] sm:text-[1.7rem]">{job.title}</h3>
                  <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-[#5d6f84]">{job.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold text-[#5d6f84]">
                    <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-[#0866d8]" /> {job.location}</span>
                    <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-[#0866d8]" /> {job.closesAt}</span>
                    {job.vacancies !== null ? <span className="inline-flex items-center gap-2"><UsersRound size={18} className="text-[#0866d8]" /> {job.vacancies} {job.vacancies === 1 ? "vacante" : "vacantes"}</span> : null}
                  </div>
                </div>

                <div className="flex min-w-[220px] flex-col gap-3 md:items-end">
                  {salary ? <span className="w-fit rounded-xl bg-[#e5f7e9] px-4 py-2 text-xl font-black text-[#12643a]">{salary}</span> : null}
                  <a
                    href={applicationUrl}
                    target={applicationUrl.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0866d8] px-5 text-base font-black text-white transition hover:bg-[#075abc]"
                  >
                    Postular ahora <ArrowUpRight size={18} />
                  </a>
                  <span className="text-sm font-semibold text-[#7b8998]">Revisada {job.verifiedAt}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
