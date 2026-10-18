import Link from "next/link";
import { ArrowRight, CalendarClock, GraduationCap, MapPin } from "lucide-react";
import type { Scholarship, ScholarshipStatus } from "@/lib/scholarships";

const statusStyles: Record<ScholarshipStatus, string> = {
  Abierta: "border-[#b9e8c8] bg-[#eaf8ef] text-[#14763e]",
  Próxima: "border-[#bfdcf6] bg-[#edf6ff] text-[#1260b7]",
  Cerrada: "border-[#dbe5f1] bg-[#f4f7fa] text-[#6b7b8f]",
  "Sin convocatoria vigente": "border-[#f2d784] bg-[#fff8dd] text-[#8a6100]",
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
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#d89b09]">Estado</p>
                <h2 className="mt-1 text-2xl font-black text-[#0a2d5a] sm:text-3xl">{statusHeadings[status]}</h2>
              </div>
              <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusStyles[status]}`}>{status}</span>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {statusItems.map((scholarship) => (
                <article key={scholarship.slug} className="rounded-[26px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_26px_rgba(10,45,90,.06)] sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ${statusStyles[scholarship.status]}`}>{scholarship.status}</span>
                      <span className="rounded-full border border-[#f0cf70] bg-[#fff7da] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#8a6100]">{scholarship.category}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#7a899b]">Fuente revisada {scholarship.verifiedAt}</span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[.13em] text-[#66768a]">{scholarship.institution}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-[#102f57]">{scholarship.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a6b7e]">{scholarship.summary}</p>

                  <div className="mt-5 grid gap-2 rounded-2xl border border-[#dbe5f1] bg-[#f8fafc] p-4 text-sm text-[#52647a]">
                    <p className="inline-flex items-center gap-2"><GraduationCap size={16} className="text-[#d89b09]" /> {scholarship.level}</p>
                    <p className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#d89b09]" /> {scholarship.destination}</p>
                    <p className="inline-flex items-center gap-2"><CalendarClock size={16} className="text-[#d89b09]" /> {scholarship.deadline}</p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#f0cf70] bg-[#fff9e8] p-4">
                    <p className="text-xs font-black uppercase tracking-[.12em] text-[#b77d00]">Qué cubre</p>
                    <p className="mt-2 text-sm leading-6 text-[#5a6b7e]">{scholarship.coverage}</p>
                  </div>

                  <Link href={`/becas/oportunidad/${scholarship.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0866d8] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#075abc]">
                    Ver ficha completa <ArrowRight size={16} />
                  </Link>
                  <p className="mt-3 text-xs text-[#7a899b]">Requisitos, documentos, etapas, fechas y postulación oficial dentro de la ficha.</p>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
