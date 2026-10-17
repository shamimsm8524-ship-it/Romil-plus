import type { Metadata } from "next";
import { ArrowUpRight, Landmark, ShieldCheck } from "lucide-react";
import StateJobsExplorer from "@/components/StateJobsExplorer";
import { institutionSources, publicOpportunities } from "@/lib/state-opportunities";

export const metadata: Metadata = {
  title: "Convocatorias de trabajo del Estado peruano | ROMIL PLUS",
  description:
    "Convocatorias laborales del Estado peruano con filtros por entidad y profesión: docentes, ingenieros, técnicos, salud, administración, SUNAT, SUNARP, Cuna Más, Poder Judicial y más.",
  alternates: { canonical: "/convocatorias" },
};

export default function ConvocatoriasPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(229,185,79,.14),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Empleo público en Perú</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">Convocatorias de todas las áreas del Estado</h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            Reunimos oportunidades para docentes, ingenieros, técnicos, profesionales de salud, administrativos, abogados y otros perfiles. Incluimos ministerios, programas sociales, organismos reguladores, Poder Judicial, SUNAT, SUNARP, Cuna Más, BCRP/Casa Nacional de Moneda, DRE, UGEL y más.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href="https://www.gob.pe/talento-peru"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-[#e5b94f]/25 bg-[#e5b94f]/[.07] p-5 transition hover:bg-[#e5b94f]/10"
          >
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
            <p className="mt-2 text-sm leading-6 text-emerald-100/65">Mostramos el estado que pudimos confirmar hoy. La fecha y las bases de la institución convocante siguen siendo la referencia definitiva antes de postular.</p>
          </div>
        </div>
      </section>

      <StateJobsExplorer jobs={publicOpportunities} />

      <section className="mt-14">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Directorio oficial</p>
          <h2 className="mt-2 text-3xl font-black text-white">Instituciones y portales que revisamos</h2>
          <p className="mt-3 text-sm leading-6 text-white/52">
            Algunas entidades publican sus procesos en plataformas propias además de Talento Perú. Este directorio permite entrar directamente a sus fuentes institucionales, incluso cuando hoy no tengan una convocatoria abierta.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {institutionSources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[22px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#e5b94f]/30 hover:bg-[#e5b94f]/[.025]"
            >
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
        <h2 className="text-xl font-black text-white">Qué significa “todas” en ROMIL PLUS</h2>
        <p className="mt-3 text-sm leading-6 text-white/52">
          Buscamos cubrir el mayor número posible de publicaciones del Estado y no limitarnos a unas pocas entidades. Aun así, una convocatoria puede aparecer, cambiar o cerrar durante el día. Por eso ROMIL PLUS enlaza siempre a la fuente oficial y mantiene Talento Perú como referencia nacional para comprobar cualquier proceso que todavía no figure en nuestro catálogo.
        </p>
      </section>
    </main>
  );
}
