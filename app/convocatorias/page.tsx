import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Cpu, GraduationCap, Landmark, ShieldCheck, Wrench } from "lucide-react";
import StateJobsExplorer from "@/components/StateJobsExplorer";
import { detailedPublicJobs } from "@/lib/job-details";
import { institutionSources } from "@/lib/state-opportunities";
import { getSunatLiveJobs } from "@/lib/sunat-live";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trabajo en SUNAT, docentes, ingeniería y carreras técnicas | ROMIL PLUS",
  description:
    "Convocatorias laborales verificadas para docentes, ingenieros, técnicos y profesionales universitarios, con sincronización automática de procesos disponibles en SUNAT.",
  alternates: { canonical: "/convocatorias" },
};

const detailSlugs = detailedPublicJobs.map((job) => job.slug);

export default async function ConvocatoriasPage() {
  const sunatJobs = await getSunatLiveJobs();
  const jobsForExplorer = [...sunatJobs, ...detailedPublicJobs];

  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <section className="overflow-hidden border-b border-[#dbe5f1] bg-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-7 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:px-6 lg:pb-12 lg:pt-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-4 py-2 text-sm font-black text-[#0b58b6]">
              <ShieldCheck size={18} /> Convocatorias verificadas
            </div>
            <h1 className="mt-5 max-w-3xl text-[2.55rem] font-black leading-[1.04] tracking-[-.035em] text-[#0a2d5a] sm:text-5xl lg:text-[4.1rem]">
              Trabajos y Convocatorias <span className="text-[#e6aa16]">Verificadas</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#52647a] sm:text-xl">
              Encuentra oportunidades laborales reales y actualizadas: docentes, ingeniería, TI, técnicos, administración y carreras universitarias en todo el Perú.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#listado" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0866d8] px-5 text-base font-black text-white transition hover:bg-[#075abc]">
                Ver convocatorias <ArrowRight size={18} />
              </a>
              <a href="https://unete.sunat.gob.pe/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#f0c24a] bg-[#fff6d9] px-5 text-base font-black text-[#775200] transition hover:bg-[#ffefb6]">
                SUNAT oficial <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[420px] items-end justify-center lg:justify-end">
            <div className="absolute inset-x-8 bottom-5 top-14 rounded-[42%] bg-[radial-gradient(circle,#eef5ff_0%,#fff7dc_62%,transparent_72%)]" />
            <img src="/romil-hero-student.svg" alt="Estudiante con cuadernos" className="relative z-10 h-auto w-full max-w-[340px] object-contain" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a href="https://unete.sunat.gob.pe/" target="_blank" rel="noopener noreferrer" className="rounded-[22px] border border-[#f0d481] bg-[#fff8e4] p-5 transition hover:-translate-y-0.5 hover:border-[#e0b841]">
            <Landmark size={28} className="text-[#b77d00]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">SUNAT automático</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">Se revisa aproximadamente cada 5 minutos y solo muestra procesos disponibles.</p>
          </a>
          <div className="rounded-[22px] border border-[#dbe5f1] bg-[#f5f9ff] p-5">
            <GraduationCap size={28} className="text-[#0866d8]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Docentes</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">UGEL, DRE y oportunidades del sector educación por especialidad.</p>
          </div>
          <div className="rounded-[22px] border border-[#dbe5f1] bg-[#f5f9ff] p-5">
            <Cpu size={28} className="text-[#0866d8]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Ingeniería y TI</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">Sistemas, software, industrial, infraestructura y tecnología.</p>
          </div>
          <div className="rounded-[22px] border border-[#dbe5f1] bg-[#f5f9ff] p-5">
            <Wrench size={28} className="text-[#0866d8]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Técnicos y profesionales</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">Administración, mantenimiento, legal, gestión y otras carreras.</p>
          </div>
        </div>
      </section>

      <div id="listado" className="mx-auto w-full max-w-[1180px] px-4 pb-12 sm:px-6 lg:px-6">
        <StateJobsExplorer jobs={jobsForExplorer} detailSlugs={detailSlugs} />
      </div>

      <section className="border-t border-[#dbe5f1] bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[.08em] text-[#0b58b6]">Fuentes oficiales</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-4xl">Instituciones que seguimos revisando</h2>
            <p className="mt-3 text-base font-medium leading-7 text-[#5f7084]">
              SUNAT, SUNARP, MINEDU, DRE, UGEL, BCRP/Casa Nacional de Moneda, Poder Judicial, Ministerio Público, IPD, MINEM, PCM y otras entidades públicas.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {institutionSources.map((source) => (
              <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="group rounded-[22px] border border-[#dbe5f1] bg-white p-5 shadow-[0_6px_20px_rgba(10,45,90,.04)] transition hover:-translate-y-0.5 hover:border-[#9bbde3]">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-black text-[#12365f]">{source.name}</p>
                  <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-[#0866d8]" />
                </div>
                <p className="mt-2 text-sm font-black uppercase tracking-[.06em] text-[#b77d00]">{source.area}</p>
                <p className="mt-3 text-base font-medium leading-6 text-[#657489]">{source.note}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-[#0a2d5a] p-6 text-white sm:p-7">
            <h2 className="text-2xl font-black">SUNAT sin convocatorias vencidas</h2>
            <p className="mt-3 text-base font-medium leading-7 text-white/78">
              Para SUNAT no guardamos procesos antiguos como si siguieran abiertos. La sincronización descarta procesos concluidos, cancelados o desiertos y retira los que ya superaron su fecha final. Las bases oficiales de SUNAT siempre prevalecen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
