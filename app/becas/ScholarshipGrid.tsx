import { ArrowUpRight, CalendarClock, GraduationCap, MapPin } from "lucide-react";
import type { Scholarship, ScholarshipStatus } from "@/lib/scholarships";

const statusStyles: Record<ScholarshipStatus, string> = {
  Abierta: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Próxima: "border-sky-400/25 bg-sky-400/10 text-sky-200",
  Cerrada: "border-white/15 bg-white/[0.05] text-white/45",
  "Sin convocatoria vigente": "border-amber-300/20 bg-amber-300/[0.07] text-amber-100/70",
};

const statusOrder: ScholarshipStatus[] = ["Abierta", "Próxima", "Sin convocatoria vigente", "Cerrada"];

const statusHeadings: Record<ScholarshipStatus, string> = {
  Abierta: "Becas abiertas",
  Próxima: "Próximas convocatorias",
  "Sin convocatoria vigente": "Programas sin convocatoria vigente",
  Cerrada: "Convocatorias cerradas",
};

export default function ScholarshipGrid({ items }: { items: Scholarship[] }) {
  return (
    <section className="space-y-12">
      {statusOrder.map((status) => {
        const statusItems = items.filter((scholarship) => scholarship.status === status);
        if (!statusItems.length) return null;

        return (
          <div key={status}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#e5b94f]">Estado</p>
                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">{statusHeadings[status]}</h2>
              </div>
              <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusStyles[status]}`}>{status}</span>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {statusItems.map((scholarship) => (
                <article key={scholarship.slug} className="rounded-[26px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ${statusStyles[scholarship.status]}`}>{scholarship.status}</span>
                      <span className="rounded-full border border-[#e5b94f]/20 bg-[#e5b94f]/[.06] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#efcb70]">{scholarship.category}</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/35">Fuente revisada {scholarship.verifiedAt}</span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[.13em] text-white/45">{scholarship.institution}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-white">{scholarship.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/56">{scholarship.summary}</p>

                  <div className="mt-5 grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/58">
                    <p className="inline-flex items-center gap-2"><GraduationCap size={16} className="text-[#e5b94f]" /> {scholarship.level}</p>
                    <p className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#e5b94f]" /> {scholarship.destination}</p>
                    <p className="inline-flex items-center gap-2"><CalendarClock size={16} className="text-[#e5b94f]" /> {scholarship.deadline}</p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#e5b94f]/15 bg-[#e5b94f]/[.045] p-4">
                    <p className="text-xs font-black uppercase tracking-[.12em] text-[#e5b94f]">Qué cubre</p>
                    <p className="mt-2 text-sm leading-6 text-white/55">{scholarship.coverage}</p>
                  </div>

                  <a href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-4 py-2.5 text-sm font-black text-[#efcb70] transition hover:bg-[#e5b94f]/15">
                    {scholarship.status === "Abierta" || scholarship.status === "Próxima" ? "Ver convocatoria oficial" : "Ver fuente oficial"} <ArrowUpRight size={16} />
                  </a>
                  <p className="mt-3 text-xs text-white/35">Fuente: {scholarship.sourceLabel}</p>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
