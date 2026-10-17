import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, CalendarClock, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { scholarships, type ScholarshipStatus } from "@/lib/scholarships";

export const metadata: Metadata = {
  title: "Becas verificadas para peruanos",
  description: "Becas nacionales e internacionales verificadas con fuentes oficiales, fechas de postulación, cobertura y enlace directo a la convocatoria original.",
  alternates: { canonical: "/becas" },
  openGraph: {
    title: "Becas verificadas para peruanos | ROMIL PLUS",
    description: "Oportunidades de estudio verificadas con fuentes oficiales y fechas claras para postular.",
    url: "https://www.romilplus.me/becas",
  },
};

const statusStyles: Record<ScholarshipStatus, string> = {
  Abierta: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Próxima: "border-sky-400/25 bg-sky-400/10 text-sky-200",
  Cerrada: "border-white/15 bg-white/[0.05] text-white/45",
};

const statusOrder: ScholarshipStatus[] = ["Abierta", "Próxima", "Cerrada"];

export default function ScholarshipsPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(229,185,79,.14),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#efcb70]">
            <GraduationCap size={15} /> Becas verificadas
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">Becas y oportunidades de estudio reales</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Reunimos becas para peruanos y contrastamos cada publicación con la fuente oficial. Mostramos el estado, la fecha límite, el nivel de estudios y qué cubre para que puedas decidir rápido si vale la pena revisar las bases.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            [BadgeCheck, "Fuente oficial", "Enlace directo a la institución"],
            [CalendarClock, "Fecha visible", "Apertura y cierre de postulación"],
            [ShieldCheck, "Sin intermediarios", "La postulación se realiza con la entidad"],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof BadgeCheck;
            return (
              <div key={String(title)} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <IconComponent size={20} className="text-[#e5b94f]" />
                <p className="mt-2 text-sm font-black text-white">{String(title)}</p>
                <p className="mt-1 text-xs leading-5 text-white/45">{String(text)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.05] p-4 text-sm leading-6 text-emerald-100/75">
        <strong className="text-emerald-100">Última verificación general: 17/10/2026.</strong> El estado mostrado corresponde a la información publicada por la fuente oficial al momento de la revisión. Confirma siempre el cronograma y las bases antes de enviar documentos.
      </div>

      <section className="mt-10 space-y-12">
        {statusOrder.map((status) => {
          const items = scholarships.filter((scholarship) => scholarship.status === status);
          if (!items.length) return null;

          return (
            <div key={status}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#e5b94f]">Estado</p>
                  <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">{status === "Abierta" ? "Becas abiertas" : status === "Próxima" ? "Próximas convocatorias" : "Convocatorias cerradas"}</h2>
                </div>
                <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${statusStyles[status]}`}>{status}</span>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {items.map((scholarship) => (
                  <article key={scholarship.slug} className="rounded-[26px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ${statusStyles[scholarship.status]}`}>{scholarship.status}</span>
                      <span className="text-[10px] font-bold text-white/35">Revisada {scholarship.verifiedAt}</span>
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
                      Ver convocatoria oficial <ArrowUpRight size={16} />
                    </a>
                    <p className="mt-3 text-xs text-white/35">Fuente: {scholarship.sourceLabel}</p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-14 rounded-[26px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-white">Cómo tratamos las becas en ROMIL PLUS</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
          No cobramos por postular ni recibimos expedientes de los usuarios. Nuestro contenido es un resumen informativo; si una fecha, requisito o beneficio cambia, la publicación de la institución que ofrece o canaliza la beca es la referencia definitiva.
        </p>
      </section>
    </main>
  );
}
