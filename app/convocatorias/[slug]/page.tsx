import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Building2, CalendarDays, CircleDollarSign, Clock3, FileText, GraduationCap, ListChecks, MapPin, ShieldCheck, UsersRound } from "lucide-react";
import { notFound } from "next/navigation";
import { allJobDetails, getJobBySlug } from "@/lib/job-details";

export function generateStaticParams() {
  return allJobDetails.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
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
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const details = job.details;
  const canApply = job.status === "Vigente" && Boolean(details.applicationUrl);
  const hasEducation = Boolean(details.education?.length || details.requirements?.length);
  const hasExperience = Boolean(details.experience?.length);
  const hasFunctions = Boolean(details.functions?.length);
  const hasDocuments = Boolean(details.documents?.length);
  const hasConditions = Boolean(details.salary || details.workSchedule || details.contractDuration);

  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[1050px] px-4 py-10 sm:px-6 lg:py-12">
        <Link href="/convocatorias" className="inline-flex items-center gap-2 text-sm font-black text-[#b77d00] hover:text-[#8a6100] hover:underline">
          <ArrowLeft size={15} /> Volver a convocatorias
        </Link>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-[#dbe5f1] bg-[radial-gradient(circle_at_85%_10%,rgba(229,185,79,.16),transparent_30%),linear-gradient(145deg,#f7fbff,#ffffff)] p-6 shadow-[0_12px_34px_rgba(10,45,90,.06)] sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#8dd5ae] bg-[#eefaf2] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#14763e]">{job.status}</span>
            <span className="rounded-full border border-[#f0cf70] bg-[#fff7da] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#9a6a00]">{job.category}</span>
            {details.processCode ? <span className="rounded-full border border-[#dbe5f1] bg-white px-3 py-1 text-[11px] font-bold text-[#66768a]">{details.processCode}</span> : null}
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[.14em] text-[#66768a]">{job.entity}</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-black leading-tight text-[#0a2d5a] sm:text-5xl">{job.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#52647a]">{job.summary}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4 shadow-[0_5px_16px_rgba(10,45,90,.035)]"><MapPin size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Lugar</p><p className="mt-1 text-sm font-bold text-[#17365d]">{job.location}</p></div>
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4 shadow-[0_5px_16px_rgba(10,45,90,.035)]"><UsersRound size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Vacantes</p><p className="mt-1 text-sm font-bold text-[#17365d]">{job.vacancies ?? "Revisar bases"}</p></div>
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4 shadow-[0_5px_16px_rgba(10,45,90,.035)]"><Building2 size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Régimen</p><p className="mt-1 text-sm font-bold text-[#17365d]">{job.regime}</p></div>
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4 shadow-[0_5px_16px_rgba(10,45,90,.035)]"><CalendarDays size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Postulación / cierre</p><p className="mt-1 text-sm font-bold text-[#17365d]">{job.closesAt}</p></div>
          </div>
        </section>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">
          <div className="space-y-5">
            {details.positions?.length ? (
              <section className="rounded-[24px] border border-[#dbe5f1] bg-[#f8fafc] p-5 sm:p-6">
                <div className="flex items-center gap-2"><BriefcaseBusiness size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#0a2d5a]">Puestos incluidos</h2></div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {details.positions.map((position) => (
                    <div key={`${position.title}-${position.location ?? ""}`} className="rounded-2xl border border-[#dbe5f1] bg-white p-4">
                      <p className="font-black text-[#17365d]">{position.title}</p>
                      {position.vacancies !== undefined ? <p className="mt-2 text-sm text-[#66768a]">Vacantes: {position.vacancies ?? "Revisar bases"}</p> : null}
                      {position.location ? <p className="mt-1 text-sm leading-6 text-[#66768a]">Lugar: {position.location}</p> : null}
                      {position.salary ? <p className="mt-1 text-sm font-bold text-[#9a6a00]">Remuneración: {position.salary}</p> : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {hasEducation ? (
              <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_5px_16px_rgba(10,45,90,.03)] sm:p-6">
                <div className="flex items-center gap-2"><GraduationCap size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#0a2d5a]">Formación y requisitos</h2></div>
                <DetailList items={details.education} />
                {details.requirements?.length ? <div className="mt-5 border-t border-[#e5ebf2] pt-5"><p className="text-sm font-black text-[#17365d]">Cursos y otros requisitos</p><DetailList items={details.requirements} /></div> : null}
              </section>
            ) : null}

            {hasExperience ? (
              <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_5px_16px_rgba(10,45,90,.03)] sm:p-6">
                <div className="flex items-center gap-2"><BadgeCheck size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#0a2d5a]">Experiencia requerida</h2></div>
                <DetailList items={details.experience} />
              </section>
            ) : null}

            {hasFunctions ? (
              <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_5px_16px_rgba(10,45,90,.03)] sm:p-6">
                <div className="flex items-center gap-2"><ListChecks size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#0a2d5a]">Funciones del puesto</h2></div>
                <DetailList items={details.functions} />
              </section>
            ) : null}

            {hasDocuments ? (
              <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_5px_16px_rgba(10,45,90,.03)] sm:p-6">
                <div className="flex items-center gap-2"><FileText size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#0a2d5a]">Documentos y envío de postulación</h2></div>
                <DetailList items={details.documents} />
              </section>
            ) : null}

            {hasConditions ? (
              <section className="rounded-[24px] border border-[#dbe5f1] bg-[#f8fafc] p-5 sm:p-6">
                <h2 className="text-xl font-black text-[#0a2d5a]">Condiciones del trabajo</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {details.salary ? <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><CircleDollarSign size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Remuneración</p><p className="mt-1 text-sm leading-6 text-[#5f7084]">{details.salary}</p></div> : null}
                  {details.workSchedule ? <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><Clock3 size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Jornada</p><p className="mt-1 text-sm leading-6 text-[#5f7084]">{details.workSchedule}</p></div> : null}
                  {details.contractDuration ? <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><BriefcaseBusiness size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#8190a1]">Duración</p><p className="mt-1 text-sm leading-6 text-[#5f7084]">{details.contractDuration}</p></div> : null}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-[24px] border border-[#f0cf70] bg-[#fff8e4] p-5">
              <ShieldCheck size={22} className="text-[#b77d00]" />
              <h2 className="mt-3 text-xl font-black text-[#0a2d5a]">Postulación oficial</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f7084]">{details.applicationInstructions ?? "Abre la fuente oficial y sigue únicamente el mecanismo de postulación indicado por la institución."}</p>

              {canApply ? (
                <a href={details.applicationUrl} rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0866d8] px-4 py-3 text-sm font-black text-white transition hover:bg-[#075abc]">
                  {details.applicationLabel ?? "Postular en la página oficial"} <ArrowUpRight size={16}/>
                </a>
              ) : (
                <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2b93f] bg-white px-4 py-3 text-sm font-black text-[#8a6100] transition hover:bg-[#fff3c6]">
                  Ver instrucciones oficiales <ArrowUpRight size={16}/>
                </a>
              )}

              <p className="mt-3 text-[11px] leading-5 text-[#7b8795]">Mostramos una vía directa solo cuando está verificada en la publicación oficial. Si la entidad usa correo u otro canal institucional, se indica ese medio.</p>
            </section>

            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_5px_16px_rgba(10,45,90,.03)]">
              <h2 className="text-base font-black text-[#0a2d5a]">Datos verificados</h2>
              <div className="mt-4 space-y-3 text-sm text-[#66768a]">
                <p><span className="font-bold text-[#17365d]">Publicada:</span> {job.publishedAt}</p>
                <p><span className="font-bold text-[#17365d]">Revisada:</span> {job.verifiedAt}</p>
                <p><span className="font-bold text-[#17365d]">Fuente:</span> {job.sourceLabel}</p>
              </div>
              <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0866d8] hover:underline">Abrir fuente oficial <ArrowUpRight size={14}/></a>
            </section>

            {details.notes?.length ? (
              <section className="rounded-[24px] border border-[#f0cf70] bg-[#fff8e4] p-5">
                <p className="text-sm font-black text-[#8a6100]">Importante</p>
                <DetailList items={details.notes} />
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
