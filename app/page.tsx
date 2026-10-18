import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Cpu,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { detailedPublicJobs, type JobDetailView } from "@/lib/job-details";
import { scholarships } from "@/lib/scholarships";
import { getSunatLiveJobs } from "@/lib/sunat-live";
import type { PublicOpportunity } from "@/lib/state-opportunities";

export const revalidate = 300;

type HomeJob = PublicOpportunity | JobDetailView;

function salaryFor(job: HomeJob) {
  const raw = "details" in job ? job.details.salary : undefined;
  if (!raw) return undefined;
  return /(?:^|\s)(?:S\/|US\$|\$|€)\s*[\d.,]+/i.test(raw) ? raw : undefined;
}

function hasInternalDetail(job: HomeJob): job is JobDetailView {
  return "details" in job;
}

export default async function Home() {
  const sunatJobs = await getSunatLiveJobs();
  const featuredJobs = [...sunatJobs, ...detailedPublicJobs]
    .filter((job) => job.status === "Vigente")
    .slice(0, 3);
  const featuredScholarships = scholarships
    .filter((item) => item.status === "Abierta" || item.status === "Próxima")
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <section className="overflow-hidden border-b border-[#dbe5f1] bg-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:px-6 lg:pb-14 lg:pt-12">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-4 py-2 text-sm font-black text-[#0b58b6]">
              <ShieldCheck size={18} /> Información verificada
            </div>
            <h1 className="mt-5 max-w-3xl text-[2.5rem] font-black leading-[1.04] tracking-[-.035em] text-[#0a2d5a] sm:text-5xl lg:text-[4.2rem]">
              Convocatorias, Becas y <span className="text-[#e6aa16]">Oportunidades Verificadas</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#52647a] sm:text-xl">
              Tu futuro en un solo lugar. Trabajos y becas con información clara, legible y enlazada a su fuente oficial.
            </p>

            <form action="/convocatorias" className="mt-7 flex w-full max-w-3xl items-center gap-2 rounded-[22px] border-2 border-[#d7e2ef] bg-white p-2 shadow-[0_12px_35px_rgba(10,45,90,.08)]">
              <Search className="ml-2 shrink-0 text-[#0b58b6]" size={28} />
              <input
                name="q"
                aria-label="Buscar trabajos"
                placeholder="Buscar trabajos por puesto o institución..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base font-semibold text-[#17365d] outline-none placeholder:text-[#7a899b] sm:text-lg"
              />
              <button type="submit" className="min-h-12 rounded-2xl bg-[#0866d8] px-5 text-base font-black text-white shadow-sm transition hover:bg-[#075abc] sm:px-8 sm:text-lg">
                Buscar
              </button>
            </form>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/convocatorias" className="flex min-h-20 items-center justify-between rounded-[20px] bg-[#0758ad] px-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#064d98]">
                <span className="inline-flex items-center gap-3 text-lg font-black"><BriefcaseBusiness size={26} /> Trabajos</span>
                <ArrowRight size={22} />
              </Link>
              <Link href="/becas" className="flex min-h-20 items-center justify-between rounded-[20px] bg-[#f4bd2d] px-5 text-[#0a2d5a] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#eab21e]">
                <span className="inline-flex items-center gap-3 text-lg font-black"><GraduationCap size={27} /> Becas</span>
                <ArrowRight size={22} />
              </Link>
              <Link href="/guias" className="flex min-h-20 items-center justify-between rounded-[20px] bg-[#0758ad] px-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#064d98]">
                <span className="inline-flex items-center gap-3 text-lg font-black"><BookOpen size={26} /> Guías</span>
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[430px] items-end justify-center lg:justify-end">
            <div className="absolute inset-x-8 bottom-5 top-16 rounded-[42%] bg-[radial-gradient(circle,#eef5ff_0%,#fff7dc_62%,transparent_72%)]" />
            <img
              src="/romil-hero-worker.webp"
              alt="Trabajador con casco de seguridad"
              className="relative z-10 h-auto w-full max-w-[430px] object-contain"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[.08em] text-[#0b58b6]">Explora por perfil</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-4xl">Categorías populares</h2>
          </div>
          <Link href="/convocatorias" className="inline-flex items-center gap-2 text-base font-black text-[#0866d8]">Ver todas <ArrowRight size={19} /></Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [GraduationCap, "Docentes", "/convocatorias?q=docente"],
            [Cpu, "Ingeniería", "/convocatorias?q=ingeniero"],
            [Wrench, "Técnicos", "/convocatorias?q=técnico"],
            [BriefcaseBusiness, "Universitarios", "/convocatorias?q=profesional"],
          ].map(([Icon, label, href]) => {
            const IconComponent = Icon as typeof GraduationCap;
            return (
              <Link key={String(label)} href={String(href)} className="flex min-h-20 items-center justify-center gap-3 rounded-[20px] border border-[#dbe5f1] bg-[#f5f8fc] px-4 text-base font-black text-[#183d6b] transition hover:border-[#97bce8] hover:bg-[#eef5ff] sm:text-lg">
                <IconComponent size={24} className="text-[#0758ad]" /> {String(label)}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-12 sm:px-6 lg:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[.08em] text-[#0b58b6]">Trabajo</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-4xl">Últimas convocatorias de trabajo</h2>
          </div>
          <Link href="/convocatorias" className="inline-flex items-center gap-2 text-base font-black text-[#0866d8]">Ver más <ArrowRight size={19} /></Link>
        </div>

        {featuredJobs.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-[#dbe5f1] bg-[#f8fafc] p-7 text-base font-semibold text-[#52647a]">
            Estamos comprobando las convocatorias vigentes. Revisa el listado completo para ver las oportunidades disponibles.
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {featuredJobs.map((job) => {
              const salary = salaryFor(job);
              const internal = hasInternalDetail(job);
              return (
                <article key={job.slug} className="grid gap-4 rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_26px_rgba(10,45,90,.06)] md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#e9f9ee] px-3 py-1 text-sm font-black uppercase tracking-[.04em] text-[#14763e]">{job.status}</span>
                      <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-sm font-black uppercase tracking-[.04em] text-[#0b58b6]">{job.entity}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black leading-tight text-[#102f57]">{job.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold text-[#5a6b7e]">
                      <span className="inline-flex items-center gap-2"><MapPin size={18} className="text-[#0b58b6]" /> {job.location}</span>
                      <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-[#0b58b6]" /> {job.closesAt}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                    {salary ? <span className="w-fit rounded-xl bg-[#e5f7e9] px-4 py-2 text-xl font-black text-[#12643a]">{salary}</span> : null}
                    {internal ? (
                      <Link href={`/convocatorias/${job.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0866d8] px-5 text-base font-black text-white transition hover:bg-[#075abc]">
                        Ver ficha completa <ArrowRight size={18} />
                      </Link>
                    ) : (
                      <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0866d8] px-5 text-base font-black text-white transition hover:bg-[#075abc]">
                        Ver proceso oficial <ArrowRight size={18} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-y border-[#dbe5f1] bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[.08em] text-[#d89b09]">Becas</p>
              <h2 className="mt-1 text-3xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-4xl">Becas destacadas</h2>
            </div>
            <Link href="/becas" className="inline-flex items-center gap-2 text-base font-black text-[#0866d8]">Ver todas <ArrowRight size={19} /></Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {featuredScholarships.map((scholarship) => (
              <article key={scholarship.slug} className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_26px_rgba(10,45,90,.05)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#fff2c8] px-3 py-1 text-sm font-black uppercase tracking-[.04em] text-[#8d6200]">{scholarship.category}</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-black uppercase tracking-[.04em] ${scholarship.status === "Abierta" ? "bg-[#ffe7e7] text-[#c22f2f]" : "bg-[#e8f3ff] text-[#1260b7]"}`}>{scholarship.status}</span>
                </div>
                <p className="mt-4 text-sm font-black uppercase tracking-[.06em] text-[#66768a]">{scholarship.institution}</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-[#102f57]">{scholarship.title}</h3>
                <div className="mt-4 grid gap-2 text-base font-semibold text-[#5a6b7e]">
                  <span className="inline-flex items-center gap-2"><GraduationCap size={18} className="text-[#d89b09]" /> {scholarship.level}</span>
                  <span className="inline-flex items-center gap-2"><CalendarDays size={18} className="text-[#d89b09]" /> {scholarship.deadline}</span>
                </div>
                <Link href={`/becas/oportunidad/${scholarship.slug}`} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#f4bd2d] px-5 text-base font-black text-[#0a2d5a] transition hover:bg-[#eab21e]">
                  Ver ficha completa <ArrowRight size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
        <div className="rounded-[28px] bg-[#0a2d5a] p-6 text-white sm:p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[.08em] text-[#f4bd2d]">Información clara</p>
            <h2 className="mt-2 text-3xl font-black">Antes de postular, revisa la ficha completa</h2>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-white/75">ROMIL PLUS organiza requisitos y fechas, pero las bases oficiales de cada institución siempre prevalecen.</p>
          </div>
          <Link href="/como-verificamos" className="mt-5 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-base font-black text-[#0a2d5a] md:mt-0">
            Cómo verificamos <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
