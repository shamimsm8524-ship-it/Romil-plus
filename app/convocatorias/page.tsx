import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, Building2, CalendarDays, MapPin } from "lucide-react";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Convocatorias de trabajo verificadas en Perú",
  description: "Convocatorias laborales verificadas en fuentes oficiales, con entidad, fecha, ubicación y enlace directo a las bases originales.",
  alternates: { canonical: "/convocatorias" },
};

export default function ConvocatoriasPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Empleo verificado</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Convocatorias de trabajo reales</h1>
        <p className="mt-4 text-base leading-7 text-white/60">Cada oportunidad de esta sección fue contrastada con una fuente oficial. Mostramos un resumen para facilitar la búsqueda, pero las bases de la entidad son siempre la referencia definitiva.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.05] p-4 text-sm leading-6 text-emerald-100/75">
        <strong className="text-emerald-100">Última verificación general: 17/10/2026.</strong> Si una fecha de postulación ya venció o cambió, la información oficial de la entidad prevalece.
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <article key={job.slug} className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5b94f]/25 bg-[#e5b94f]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#e5b94f]"><BadgeCheck size={12}/> Verificada</span>
              <span className="text-[10px] font-bold text-white/35">Revisada {job.verifiedAt}</span>
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[.13em] text-white/45">{job.entity}</p>
            <h2 className="mt-2 text-xl font-black leading-tight text-white">{job.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/52">{job.summary}</p>
            <div className="mt-4 grid gap-2 text-xs text-white/52">
              <p className="inline-flex items-center gap-2"><MapPin size={14} className="text-[#e5b94f]"/> {job.location}</p>
              <p className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-[#e5b94f]"/> Publicada: {job.publishedAt}</p>
              <p className="inline-flex items-center gap-2"><Building2 size={14} className="text-[#e5b94f]"/> {job.regime} · {job.vacancies} {job.vacancies === 1 ? "vacante" : "vacantes"}</p>
            </div>
            <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-4 py-2.5 text-sm font-black text-[#efcb70] transition hover:bg-[#e5b94f]/15">Ver fuente oficial <ArrowUpRight size={15}/></a>
          </article>
        ))}
      </div>
    </main>
  );
}
