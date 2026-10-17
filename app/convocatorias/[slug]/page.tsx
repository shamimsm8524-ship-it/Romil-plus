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
    <ul className="mt-3 space-y-2 text-sm leading-6 text-white/58">
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
    <main className="mx-auto w-full max-w-[1050px] px-4 py-10 sm:px-6 lg:py-12">
      <Link href="/convocatorias" className="inline-flex items-center gap-2 text-sm font-black text-[#e5b94f] hover:underline">
        <ArrowLeft size={15} /> Volver a convocatorias
      </Link>

      <section className="mt-6 overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_10%,rgba(229,185,79,.15),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[.08] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-emerald-100">{job.status}</span>
          <span className="rounded-full border border-[#e5b94f]/20 bg-[#e5b94f]/[.07] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#efcb70]">{job.category}</span>
          {details.processCode ? <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[11px] font-bold text-white/50">{details.processCode}</span> : null}
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[.14em] text-white/45">{job.entity}</p>
        <h1 className="mt-2 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">{job.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/62">{job.summary}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><MapPin size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Lugar</p><p className="mt-1 text-sm font-bold text-white/75">{job.location}</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><UsersRound size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Vacantes</p><p className="mt-1 text-sm font-bold text-white/75">{job.vacancies ?? "Revisar bases"}</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><Building2 size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Régimen</p><p className="mt-1 text-sm font-bold text-white/75">{job.regime}</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><CalendarDays size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Postulación / cierre</p><p className="mt-1 text-sm font-bold text-white/75">{job.closesAt}</p></div>
        </div>
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">
        <div className="space-y-5">
          {details.positions?.length ? (
            <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center gap-2"><BriefcaseBusiness size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Puestos incluidos</h2></div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {details.positions.map((position) => (
                  <div key={`${position.title}-${position.location ?? ""}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="font-black text-white">{position.title}</p>
                    {position.vacancies !== undefined ? <p className="mt-2 text-sm text-white/50">Vacantes: {position.vacancies ?? "Revisar bases"}</p> : null}
                    {position.location ? <p className="mt-1 text-sm leading-6 text-white/50">Lugar: {position.location}</p> : null}
                    {position.salary ? <p className="mt-1 text-sm font-bold text-[#efcb70]">Remuneración: {position.salary}</p> : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {hasEducation ? (
            <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center gap-2"><GraduationCap size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Formación y requisitos</h2></div>
              <DetailList items={details.education} />
              {details.requirements?.length ? <div className="mt-5 border-t border-white/10 pt-5"><p className="text-sm font-black text-white/80">Cursos y otros requisitos</p><DetailList items={details.requirements} /></div> : null}
            </section>
          ) : null}

          {hasExperience ? (
            <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center gap-2"><BadgeCheck size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Experiencia requerida</h2></div>
              <DetailList items={details.experience} />
            </section>
          ) : null}

          {hasFunctions ? (
            <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center gap-2"><ListChecks size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Funciones del puesto</h2></div>
              <DetailList items={details.functions} />
            </section>
          ) : null}

          {hasDocuments ? (
            <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-center gap-2"><FileText size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Documentos y envío de postulación</h2></div>
              <DetailList items={details.documents} />
            </section>
          ) : null}

          {hasConditions ? (
            <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <h2 className="text-xl font-black text-white">Condiciones del trabajo</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {details.salary ? <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><CircleDollarSign size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Remuneración</p><p className="mt-1 text-sm leading-6 text-white/58">{details.salary}</p></div> : null}
                {details.workSchedule ? <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><Clock3 size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Jornada</p><p className="mt-1 text-sm leading-6 text-white/58">{details.workSchedule}</p></div> : null}
                {details.contractDuration ? <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><BriefcaseBusiness size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Duración</p><p className="mt-1 text-sm leading-6 text-white/58">{details.contractDuration}</p></div> : null}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-[24px] border border-[#e5b94f]/25 bg-[#e5b94f]/[.06] p-5">
            <ShieldCheck size={22} className="text-[#efcb70]" />
            <h2 className="mt-3 text-xl font-black text-white">Postulación oficial</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{details.applicationInstructions ?? "ROMIL PLUS no recibe postulaciones. Abre la fuente oficial y sigue únicamente el mecanismo indicado por la institución."}</p>

            {canApply ? (
              <a href={details.applicationUrl} rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e5b94f] px-4 py-3 text-sm font-black text-black transition hover:brightness-105">
                {details.applicationLabel ?? "Postular en la página oficial"} <ArrowUpRight size={16}/>
              </a>
            ) : (
              <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5b94f]/30 bg-black/15 px-4 py-3 text-sm font-black text-[#efcb70] transition hover:bg-black/25">
                Ver instrucciones oficiales <ArrowUpRight size={16}/>
              </a>
            )}

            <p className="mt-3 text-[11px] leading-5 text-white/35">Solo mostramos una vía directa cuando está verificada en la publicación oficial. Si la entidad recibe postulaciones por correo, mostramos ese canal institucional en lugar de inventar un formulario.</p>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
            <h2 className="text-base font-black text-white">Datos verificados</h2>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <p><span className="font-bold text-white/75">Publicada:</span> {job.publishedAt}</p>
              <p><span className="font-bold text-white/75">Revisada:</span> {job.verifiedAt}</p>
              <p><span className="font-bold text-white/75">Fuente:</span> {job.sourceLabel}</p>
            </div>
            <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#efcb70] hover:underline">Abrir fuente oficial <ArrowUpRight size={14}/></a>
          </section>

          {details.notes?.length ? (
            <section className="rounded-[24px] border border-amber-300/15 bg-amber-300/[.05] p-5">
              <p className="text-sm font-black text-amber-100">Importante</p>
              <DetailList items={details.notes} />
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
