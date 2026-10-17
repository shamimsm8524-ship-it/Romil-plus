"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Building2, CalendarDays, MapPin, Search, UsersRound } from "lucide-react";
import type { PublicJobCategory, PublicJobStatus, PublicOpportunity } from "@/lib/state-opportunities";

const statusStyles: Record<PublicJobStatus, string> = {
  Vigente: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Próxima: "border-sky-400/25 bg-sky-400/10 text-sky-200",
  "Cerrada reciente": "border-white/15 bg-white/[0.05] text-white/45",
  "Sin convocatoria vigente": "border-amber-300/20 bg-amber-300/[0.07] text-amber-100/70",
};

const categories: Array<"Todas" | PublicJobCategory> = [
  "Todas",
  "Docencia",
  "Ingeniería y TI",
  "Técnicos",
  "Salud",
  "Administración",
  "Legal",
  "Varias",
];

const categoryKeywords: Partial<Record<PublicJobCategory, string[]>> = {
  Docencia: ["docent", "ugel", "drec", "minedu", "educación"],
  "Ingeniería y TI": ["ingenier", "sistemas", "programación", "tecnolog", "ti ", "saneamiento"],
  Técnicos: ["técnic", "tecnico", "técnico"],
  Salud: ["salud", "enfermer", "médic", "medic", "nutricion", "farmacia"],
  Administración: ["administr", "logística", "logistica", "gestión", "gestion", "contrataciones"],
  Legal: ["legal", "abogad", "juríd", "jurid", "judicial", "fiscal"],
};

const statuses: Array<"Todas" | PublicJobStatus> = ["Todas", "Vigente", "Próxima", "Cerrada reciente"];

export default function StateJobsExplorer({ jobs }: { jobs: PublicOpportunity[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todas");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Vigente");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");

    return jobs.filter((job) => {
      const searchable = `${job.entity} ${job.title} ${job.category} ${job.location} ${job.summary} ${job.regime}`.toLocaleLowerCase("es");
      const keywords = category === "Todas" ? [] : categoryKeywords[category] ?? [];
      const matchesCategory =
        category === "Todas" ||
        job.category === category ||
        keywords.some((keyword) => searchable.includes(keyword));
      const matchesStatus = status === "Todas" || job.status === status;
      const matchesQuery = !normalized || searchable.includes(normalized);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [jobs, query, category, status]);

  const activeVacancies = jobs
    .filter((job) => job.status === "Vigente")
    .reduce((total, job) => total + (job.vacancies ?? 0), 0);

  return (
    <section className="mt-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <BriefcaseBusiness size={19} className="text-[#e5b94f]" />
          <p className="mt-2 text-2xl font-black text-white">{jobs.filter((job) => job.status === "Vigente").length}</p>
          <p className="text-xs text-white/45">publicaciones vigentes registradas</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <UsersRound size={19} className="text-[#e5b94f]" />
          <p className="mt-2 text-2xl font-black text-white">{activeVacancies}+</p>
          <p className="text-xs text-white/45">vacantes visibles en procesos vigentes</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <Building2 size={19} className="text-[#e5b94f]" />
          <p className="mt-2 text-2xl font-black text-white">Nacional</p>
          <p className="text-xs text-white/45">ministerios, programas, cortes, UGEL y organismos</p>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.025] p-4 sm:p-5">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar SUNAT, SUNARP, docente, ingeniero, técnico, Lima..."
            className="w-full rounded-2xl border border-white/10 bg-black/25 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#e5b94f]/45"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${
                status === item
                  ? "border-[#e5b94f]/40 bg-[#e5b94f]/12 text-[#efcb70]"
                  : "border-white/10 bg-white/[0.03] text-white/48 hover:text-white"
              }`}
            >
              {item === "Todas" ? "Todos los estados" : item}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                category === item
                  ? "border-white/25 bg-white/[0.08] text-white"
                  : "border-white/10 bg-transparent text-white/42 hover:text-white/75"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-white/55">{filtered.length} resultados</p>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setCategory("Todas");
            setStatus("Vigente");
          }}
          className="text-xs font-black text-[#efcb70] hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-7 text-center text-sm text-white/50">
          No encontramos una convocatoria con esos filtros. Prueba con otra entidad, profesión o selecciona “Todos los estados”.
        </div>
      ) : (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {filtered.map((job) => (
            <article key={job.slug} className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.11em] ${statusStyles[job.status]}`}>
                    {job.status}
                  </span>
                  <span className="rounded-full border border-[#e5b94f]/20 bg-[#e5b94f]/[.06] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.11em] text-[#efcb70]">
                    {job.category}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-white/35">Revisada {job.verifiedAt}</span>
              </div>

              <p className="mt-4 text-xs font-black uppercase tracking-[.13em] text-white/45">{job.entity}</p>
              <h2 className="mt-2 text-xl font-black leading-tight text-white">{job.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/52">{job.summary}</p>

              <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/52">
                <p className="inline-flex items-center gap-2"><MapPin size={14} className="text-[#e5b94f]" /> {job.location}</p>
                <p className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-[#e5b94f]" /> Publicada: {job.publishedAt}</p>
                <p className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-[#e5b94f]" /> Cierre / postulación: {job.closesAt}</p>
                <p className="inline-flex items-center gap-2"><Building2 size={14} className="text-[#e5b94f]" /> {job.regime}{job.vacancies !== null ? ` · ${job.vacancies} ${job.vacancies === 1 ? "vacante" : "vacantes"}` : ""}</p>
              </div>

              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-4 py-2.5 text-sm font-black text-[#efcb70] transition hover:bg-[#e5b94f]/15"
              >
                Ver fuente oficial <ArrowUpRight size={15} />
              </a>
              <p className="mt-3 text-[11px] text-white/33">Fuente: {job.sourceLabel}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
