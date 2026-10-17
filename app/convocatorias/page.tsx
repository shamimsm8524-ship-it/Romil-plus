import type { Metadata } from "next";
import { ArrowUpRight, Cpu, GraduationCap, Landmark, ShieldCheck, Wrench } from "lucide-react";
import StateJobsExplorer from "@/components/StateJobsExplorer";
import { detailedPublicJobs } from "@/lib/job-details";
import { institutionSources } from "@/lib/state-opportunities";

export const metadata: Metadata = {
  title: "Trabajo en SUNAT, docentes, ingeniería y carreras técnicas | ROMIL PLUS",
  description:
    "Convocatorias laborales verificadas para docentes, ingenieros, técnicos y profesionales universitarios, con fichas completas y acceso a la postulación oficial.",
  alternates: { canonical: "/convocatorias" },
};

const detailSlugs = detailedPublicJobs.map((job) => job.slug);

export default function ConvocatoriasPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(229,185,79,.14),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8 lg:p-10">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Empleo público que vale la pena revisar</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">Docentes, ingeniería, TI, técnicos y carreras universitarias</h1>
          <p className="mt-4 text-base leading-7 text-white/60">
            El listado principal muestra solo convocatorias con ficha completa: puesto, vacantes, remuneración cuando la entidad la publica, formación, experiencia, requisitos, cronograma, documentos y canal oficial de postulación. Dejamos de priorizar INPE y nos enfocamos en oportunidades profesionales y técnicas de mayor interés.
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <a href="https://unete.sunat.gob.pe/" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-[#e5b94f]/25 bg-[#e5b94f]/[.07] p-5 transition hover:bg-[#e5b94f]/10">
            <div className="flex items-start justify-between gap-3"><Landmark size={22} className="text-[#efcb70]" /><ArrowUpRight size={17} className="text-[#efcb70]" /></div>
            <p className="mt-4 text-lg font-black text-white">SUNAT</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Portal oficial vigilado. Publicaremos una ficha apenas exista una convocatoria abierta confirmada; no mostraremos procesos ya concluidos como vigentes.</p>
          </a>

          <div className="rounded-2xl border border-sky-400/15 bg-sky-400/[.05] p-5">
            <GraduationCap size={22} className="text-sky-200" />
            <p className="mt-4 text-lg font-black text-white">Docentes</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Contratación docente de UGEL y DRE, separada por especialidad, institución educativa y periodo de contrato.</p>
          </div>

          <div className="rounded-2xl border border-violet-400/15 bg-violet-400/[.05] p-5">
            <Cpu size={22} className="text-violet-200" />
            <p className="mt-4 text-lg font-black text-white">Ingeniería y TI</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Sistemas, software, industrial, seguridad, infraestructura, programación y perfiles de gestión tecnológica.</p>
          </div>

          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[.05] p-5">
            <Wrench size={22} className="text-emerald-200" />
            <p className="mt-4 text-lg font-black text-white">Técnicos y profesionales</p>
            <p className="mt-2 text-sm leading-6 text-white/50">Puestos que aceptan carreras técnicas o universitarias en administración, tecnología, gestión, legal y otras especialidades.</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.04] p-4 sm:flex sm:items-center sm:gap-3">
          <ShieldCheck size={21} className="shrink-0 text-emerald-200" />
          <p className="mt-2 text-sm leading-6 text-emerald-100/65 sm:mt-0">Revisión: 17/10/2026. Las bases de la institución convocante y su cronograma oficial siempre prevalecen.</p>
        </div>
      </section>

      <StateJobsExplorer jobs={detailedPublicJobs} detailSlugs={detailSlugs} />

      <section className="mt-14">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Fuentes oficiales</p>
          <h2 className="mt-2 text-3xl font-black text-white">Instituciones que seguimos revisando</h2>
          <p className="mt-3 text-sm leading-6 text-white/52">
            SUNAT, SUNARP, MINEDU, DRE, UGEL, BCRP/Casa Nacional de Moneda, Poder Judicial, Ministerio Público, IPD, MINEM, PCM y otras entidades siguen bajo revisión. Una oportunidad entra al listado principal cuando puede mostrarse como ficha individual completa y con fuente oficial.
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
        <h2 className="text-xl font-black text-white">Sin fichas a medias</h2>
        <p className="mt-3 text-sm leading-6 text-white/52">
          Si un proceso agrupa varios cargos con sueldos o requisitos distintos, ROMIL PLUS los separa. Si la entidad todavía no permite confirmar los datos necesarios, esa convocatoria no se publica como ficha completa hasta poder contrastarla.
        </p>
      </section>
    </main>
  );
}
