import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Building2, CalendarDays, CircleDollarSign, Clock3, FileText, Gift, GraduationCap, ListChecks, Mail, MapPin, ShieldCheck, UsersRound } from "lucide-react";
import { notFound } from "next/navigation";
import { allJobDetails, getJobBySlug, type JobDetailExtra, type JobDetailView } from "@/lib/job-details";
import { privateVerifiedJobs } from "@/lib/private-verified-jobs";
import { getSunatLiveJobs } from "@/lib/sunat-live";
import { jobListingSpecs } from "@/lib/job-listing-specs";
import type { PublicOpportunity } from "@/lib/state-opportunities";

function genericDetails(job: PublicOpportunity): JobDetailExtra {
  const specs = jobListingSpecs[job.slug];

  return {
    salary: specs?.salary,
    workSchedule: specs
      ? [specs.employmentType, specs.hours, specs.schedule].filter(Boolean).join(" · ")
      : job.regime,
    education: specs?.education ? [specs.education] : undefined,
    experience: specs?.experience ? [specs.experience] : undefined,
    applicationUrl: job.sourceUrl,
    applicationLabel: "Abrir postulación oficial",
    applicationInstructions:
      "Esta ficha reúne la información verificada disponible en RomilPlus. Antes de enviar tus datos, abre la fuente oficial y confirma requisitos, fechas y el canal de postulación.",
    notes: [
      "Si un dato no fue publicado por la empresa o entidad, RomilPlus no lo completa por estimación.",
    ],
  };
}

function asDetailView(job: PublicOpportunity): JobDetailView {
  return {
    ...job,
    details: genericDetails(job),
  };
}

async function getAnyJobBySlug(slug: string): Promise<JobDetailView | undefined> {
  const detailed = getJobBySlug(slug);
  if (detailed) return detailed;

  const privateJob = privateVerifiedJobs.find((job) => job.slug === slug);
  if (privateJob) return asDetailView(privateJob);

  const sunatJobs = await getSunatLiveJobs();
  const sunatJob = sunatJobs.find((job) => job.slug === slug);
  return sunatJob ? asDetailView(sunatJob) : undefined;
}

export function generateStaticParams() {
  const slugs = new Set([
    ...allJobDetails.map((job) => job.slug),
    ...privateVerifiedJobs.map((job) => job.slug),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getAnyJobBySlug(slug);
  if (!job) return {};

  return {
    title: `${job.title} · ${job.entity}`,
    description: `${job.title} en ${job.entity}. Revisa vacantes, requisitos, cronograma, lugar, régimen y el canal oficial de postulación.`,
    alternates: { canonical: `/convocatorias/${job.slug}` },
  };
}

function DetailList({ items }: { items?: string[] }) {
  if (!items?.length) return null;

  return (
    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5f7084]">
      {items.map((item) => (
        <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5b94f]" /> <span>{item}</span></li>
      ))}
    </ul>
  );
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getAnyJobBySlug(slug);
  if (!job) notFound();

  const details = job.details;
  const canApply = job.status === "Vigente" && Boolean(details.applicationUrl);
  const hasEducation = Boolean(details.education?.length || details.requirements?.length);
  const hasExperience = Boolean(details.experience?.length);
  const hasFunctions = Boolean(details.functions?.length);
  const hasDocuments = Boolean(details.documents?.length);
  const hasBenefits = Boolean(details.benefits?.length);
  const hasContact = Boolean(details.contact?.length);
  const hasConditions = Boolean(details.salary || details.workSchedule || details.contractDuration);

  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[1050px] px-4 py-8 sm:px-6 lg:py-10">
        <Link href="/convocatorias" className="inline-flex items-center gap-2 text-sm font-black text-[#b77d00] hover:text-[#8a6100] hover:underline">
          <ArrowLeft size={15} /> Volver a convocatorias
        </Link>

        <section className="mt-5 overflow-hidden rounded-[24px] border border-[#dbe5f1] bg-[radial-gradient(circle_at_85%_10%,rgba(229,185,79,.13),transparent_30%),linear-gradient(145deg,#f7fbff,#ffffff)] p-5 shadow-[0_8px_24px_rgba(10,45,90,.05)] sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#8dd5ae] bg-[#eefaf2] px-3 py-1 text-[10px] font-black uppercase tracking-[.09em] text-[#14763e]">{job.status}</span>
            <span className="rounded-full border border-[#f0cf70] bg-[#fff7da] px-3 py-1 text-[10px] font-black uppercase tracking-[.09em] text-[#9a6a00]">{job.category}</span>
            {details.processCode ? <span className="rounded-full border border-[#dbe5f1] bg-white px-3 py-1 text-[10px] font-bold text-[#66768a]">{details.processCode}</span> : null}
          </div>

          <p className="mt-4 text-[11px] font-black uppercase tracking-[.12em] text-[#66768a]">{job.entity}</p>
          <h1 className="mt-2 max-w-4xl text-2xl font-black leading-tight text-[#0a2d5a] sm:text-3xl lg:text-[2rem]">{job.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#52647a]">{job.summary}</p>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><MapPin size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Lugar</p><p className="mt-1 text-xs font-bold leading-5 text-[#17365d]">{job.location}</p></div>
            <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><UsersRound size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Vacantes</p><p className="mt-1 text-xs font-bold leading-5 text-[#17365d]">{job.vacancies ?? "No publicado"}</p></div>
            <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><Building2 size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Régimen</p><p className="mt-1 text-xs font-bold leading-5 text-[#17365d]">{job.regime}</p></div>
            <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><CalendarDays size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Postulación / cierre</p><p className="mt-1 text-xs font-bold leading-5 text-[#17365d]">{job.closesAt}</p></div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {details.positions?.length ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-[#f8fafc] p-4 sm:p-5">
                <div className="flex items-center gap-2"><BriefcaseBusiness size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Puestos incluidos</h2></div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {details.positions.map((position) => (
                    <div key={`${position.title}-${position.location ?? ""}`} className="rounded-xl border border-[#dbe5f1] bg-white p-3">
                      <p className="text-sm font-black text-[#17365d]">{position.title}</p>
                      {position.vacancies !== undefined ? <p className="mt-1 text-xs text-[#66768a]">Vacantes: {position.vacancies ?? "No publicado"}</p> : null}
                      {position.location ? <p className="mt-1 text-xs leading-5 text-[#66768a]">Lugar: {position.location}</p> : null}
                      {position.salary ? <p className="mt-1 text-xs font-bold text-[#9a6a00]">Remuneración: {position.salary}</p> : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {hasEducation ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-white p-4 sm:p-5">
                <div className="flex items-center gap-2"><GraduationCap size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Formación y requisitos</h2></div>
                <DetailList items={details.education} />
                {details.requirements?.length ? <div className="mt-4 border-t border-[#e5ebf2] pt-4"><p className="text-sm font-black text-[#17365d]">Cursos y otros requisitos</p><DetailList items={details.requirements} /></div> : null}
              </section>
            ) : null}

            {hasExperience ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-white p-4 sm:p-5">
                <div className="flex items-center gap-2"><BadgeCheck size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Experiencia requerida</h2></div>
                <DetailList items={details.experience} />
              </section>
            ) : null}

            {hasFunctions ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-white p-4 sm:p-5">
                <div className="flex items-center gap-2"><ListChecks size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Funciones del puesto</h2></div>
                <DetailList items={details.functions} />
              </section>
            ) : null}

            {hasDocuments ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-white p-4 sm:p-5">
                <div className="flex items-center gap-2"><FileText size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Documentos y envío de postulación</h2></div>
                <DetailList items={details.documents} />
              </section>
            ) : null}

            {hasBenefits ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-[#fffdf7] p-4 sm:p-5">
                <div className="flex items-center gap-2"><Gift size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Beneficios</h2></div>
                <DetailList items={details.benefits} />
              </section>
            ) : null}

            {hasContact ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-white p-4 sm:p-5">
                <div className="flex items-center gap-2"><Mail size={18} className="text-[#d89b09]"/><h2 className="text-lg font-black text-[#0a2d5a]">Contacto y canal publicado</h2></div>
                <DetailList items={details.contact} />
              </section>
            ) : null}

            {hasConditions ? (
              <section className="rounded-[20px] border border-[#dbe5f1] bg-[#f8fafc] p-4 sm:p-5">
                <h2 className="text-lg font-black text-[#0a2d5a]">Condiciones del trabajo</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {details.salary ? <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><CircleDollarSign size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Remuneración</p><p className="mt-1 text-xs leading-5 text-[#5f7084]">{details.salary}</p></div> : null}
                  {details.workSchedule ? <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><Clock3 size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Jornada</p><p className="mt-1 text-xs leading-5 text-[#5f7084]">{details.workSchedule}</p></div> : null}
                  {details.contractDuration ? <div className="rounded-xl border border-[#dbe5f1] bg-white p-3"><BriefcaseBusiness size={16} className="text-[#d89b09]"/><p className="mt-2 text-[10px] font-bold uppercase tracking-[.08em] text-[#8190a1]">Duración</p><p className="mt-1 text-xs leading-5 text-[#5f7084]">{details.contractDuration}</p></div> : null}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-[20px] border border-[#f0cf70] bg-[#fff8e4] p-4">
              <ShieldCheck size={20} className="text-[#b77d00]" />
              <h2 className="mt-2 text-lg font-black text-[#0a2d5a]">Postulación oficial</h2>
              <p className="mt-2 text-xs leading-5 text-[#5f7084]">{details.applicationInstructions ?? "Abre la fuente oficial y sigue únicamente el mecanismo de postulación indicado por la institución."}</p>

              {canApply ? (
                <a href={details.applicationUrl} target={details.applicationUrl?.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0866d8] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#075abc]">
                  {details.applicationLabel ?? "Postular en la página oficial"} <ArrowUpRight size={15}/>
                </a>
              ) : (
                <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2b93f] bg-white px-4 py-2.5 text-xs font-black text-[#8a6100] transition hover:bg-[#fff3c6]">
                  Ver instrucciones oficiales <ArrowUpRight size={15}/>
                </a>
              )}

              <p className="mt-3 text-[10px] leading-4 text-[#7b8795]">La ficha interna organiza la información verificada. La fuente oficial siempre prevalece para postular.</p>
            </section>

            <section className="rounded-[20px] border border-[#dbe5f1] bg-white p-4">
              <h2 className="text-sm font-black text-[#0a2d5a]">Datos verificados</h2>
              <div className="mt-3 space-y-2 text-xs text-[#66768a]">
                <p><span className="font-bold text-[#17365d]">Publicada:</span> {job.publishedAt}</p>
                <p><span className="font-bold text-[#17365d]">Revisada:</span> {job.verifiedAt}</p>
                <p><span className="font-bold text-[#17365d]">Fuente:</span> {job.sourceLabel}</p>
              </div>
              <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#0866d8] hover:underline">Abrir fuente oficial <ArrowUpRight size={13}/></a>
            </section>

            {details.notes?.length ? (
              <section className="rounded-[20px] border border-[#f0cf70] bg-[#fff8e4] p-4">
                <p className="text-xs font-black text-[#8a6100]">Importante</p>
                <DetailList items={details.notes} />
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
