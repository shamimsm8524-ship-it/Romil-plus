import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Landmark, ShieldCheck } from "lucide-react";
import StateJobsExplorer from "@/components/StateJobsExplorer";
import { detailedPublicJobs } from "@/lib/job-details";
import { inpeJobMeta } from "@/lib/inpe-job-details";
import { jobs as inpeJobs } from "@/lib/jobs";
import { institutionSources } from "@/lib/state-opportunities";

export const metadata: Metadata = {
  title: "Convocatorias de trabajo del Estado peruano",
  description:
    "Convocatorias laborales del Estado peruano con fichas por puesto, requisitos, remuneración, cronograma y acceso a la fuente oficial.",
  alternates: { canonical: "/convocatorias" },
};

export default function ConvocatoriasPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(229,185,79,.14),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Empleo público en Perú</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">Convocatorias del Estado con ficha por puesto</h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            Cada convocatoria publicada como ficha incluye únicamente información que pudimos contrastar: puesto, vacantes, requisitos, experiencia, remuneración cuando está confirmada, cronograma y canal oficial de postulación. Ya no agrupamos cargos distintos en una sola ficha incompleta.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a href="https://www.gob.pe/talento-peru" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#e5b94f]/25 bg-[#e5b94f]/[.07] p-5 transition hover:bg-[#e5b94f]/10">
            <div className="flex items-start justify-between gap-3">
              <Landmark size={22} className="text-[#efcb70]" />
              <ArrowUpRight size={17} className="text-[#efcb70] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <p className="mt-4 text-lg font-black text-white">Talento Perú · SERVIR</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Portal central oficial donde las entidades públicas registran y difunden sus ofertas de empleo y prácticas.</p>
          </a>

          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[.05] p-5">
            <ShieldCheck size={22} className="text-emerald-200" />
            <p className="mt-4 text-lg font-black text-emerald-100">Revisión 17/10/2026</p>
            <p className="mt-2 text-sm leading-6 text-emerald-100/65">Las bases de la institución convocante siguen siendo la referencia definitiva. Si una publicación cambia, el cronograma oficial prevalece.</p>
          </div>
        </div>
      </section>

      <StateJobsExplorer jobs={detailedPublicJobs} />

      <section className="mt-14">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">INPE · fichas verificadas</p>
          <h2 className="mt-2 text-3xl font-black text-white">Convocatorias INPE con requisitos y remuneración</h2>
          <p className="mt-3 text-sm leading-6 text-white/52">
            Estas convocatorias ya tienen fecha de postulación, formación, experiencia, remuneración, distribución de plazas y documentos principales transcritos desde la información oficial disponible.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {inpeJobs.map((job) => {
            const meta = inpeJobMeta[job.slug];
            return (
              <article key={job.slug} className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.1em] text-emerald-100/80">{meta?.status ?? "Revisar cronograma"}</span>
                  <span className="text-[10px] font-bold text-white/35">Revisada {job.verifiedAt}</span>
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[.12em] text-white/42">{job.entity}</p>
                <h3 className="mt-2 text-xl font-black leading-tight text-white">{job.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/52">{job.summary}</p>
                <div className="mt-4 grid gap-1.5 text-xs text-white/45">
                  <p>{meta?.location ?? job.location} · {job.vacancies} {job.vacancies === 1 ? "vacante" : "vacantes"}</p>
                  <p>{job.regime}</p>
                  <p>{meta?.closesAt ?? `Publicada: ${job.publishedAt}`}</p>
                </div>
                <Link href={`/convocatorias/${job.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#efcb70] hover:underline">
                  Ver ficha completa <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Directorio oficial</p>
          <h2 className="mt-2 text-3xl font-black text-white">Instituciones y portales que revisamos</h2>
          <p className="mt-3 text-sm leading-6 text-white/52">
            Conservamos aquí las fuentes de SUNAT, SUNARP, Cuna Más, BCRP/Casa Nacional de Moneda, educación, Poder Judicial y otras entidades. Un proceso solo pasa al listado principal cuando podemos publicarlo como ficha individual y no como un grupo ambiguo de cargos.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {institutionSources.map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="group rounded-[22px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#e5b94f]/30 hover:bg-[#e5b94f]/[.025]">
              <div className="flex items-start justify-between gap-3">
                <p className="font-black text-white">{source.name}</p>
                <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-white/35 transition group-hover:text-[#efcb70]" />
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#e5b94f]">{source.area}</p>
              <p className="mt-3 text-sm leading-6 text-white/48">{source.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[24px] border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <h2 className="text-xl font-black text-white">Criterio de publicación</h2>
        <p className="mt-3 text-sm leading-6 text-white/52">
          ROMIL PLUS no mostrará una tarjeta como “ficha completa” si solo conocemos el número total de plazas. Cuando una entidad reúne varios puestos en un proceso, los separamos por cargo para que requisitos y remuneración no se mezclen.
        </p>
      </section>
    </main>
  );
}
