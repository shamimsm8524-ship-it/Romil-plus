import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck, CalendarClock, FileText, GraduationCap, ListChecks, MapPin, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { notFound } from "next/navigation";
import { scholarships } from "@/lib/scholarships";
import { getScholarshipBySlug, getScholarshipDetail } from "@/lib/scholarship-details";

export function generateStaticParams() {
  return scholarships.map((scholarship) => ({ slug: scholarship.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scholarship = getScholarshipBySlug(slug);
  if (!scholarship) return {};

  return {
    title: `${scholarship.title} · ${scholarship.institution}`,
    description: `${scholarship.title}: requisitos, cobertura, fechas, etapas y enlace oficial de postulación cuando está disponible.`,
    alternates: { canonical: `/becas/oportunidad/${scholarship.slug}` },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/58">
      {items.map((item) => (
        <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5b94f]"/><span>{item}</span></li>
      ))}
    </ul>
  );
}

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scholarship = getScholarshipBySlug(slug);
  if (!scholarship) notFound();

  const details = getScholarshipDetail(scholarship);
  const canApplyNow = scholarship.status === "Abierta" && Boolean(details.applicationUrl);

  return (
    <main className="mx-auto w-full max-w-[1050px] px-4 py-10 sm:px-6 lg:py-12">
      <Link href="/becas" className="inline-flex items-center gap-2 text-sm font-black text-[#e5b94f] hover:underline"><ArrowLeft size={15}/> Volver a becas</Link>

      <section className="mt-6 overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_10%,rgba(229,185,79,.15),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[.08] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-emerald-100">{scholarship.status}</span>
          <span className="rounded-full border border-[#e5b94f]/20 bg-[#e5b94f]/[.07] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#efcb70]">{scholarship.category}</span>
        </div>
        <p className="mt-5 text-xs font-black uppercase tracking-[.14em] text-white/45">{scholarship.institution}</p>
        <h1 className="mt-2 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">{scholarship.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/62">{scholarship.summary}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><GraduationCap size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Nivel</p><p className="mt-1 text-sm font-bold text-white/75">{scholarship.level}</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><MapPin size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Destino</p><p className="mt-1 text-sm font-bold text-white/75">{scholarship.destination}</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><CalendarClock size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Fecha límite</p><p className="mt-1 text-sm font-bold text-white/75">{scholarship.deadline}</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><UsersRound size={18} className="text-[#e5b94f]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-white/35">Cantidad</p><p className="mt-1 text-sm font-bold text-white/75">{details.quantity ?? "Según convocatoria"}</p></div>
        </div>
      </section>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">
        <div className="space-y-5">
          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-center gap-2"><UsersRound size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">¿Quién puede postular?</h2></div>
            <BulletList items={details.eligibility ?? [scholarship.summary]} />
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-center gap-2"><BadgeCheck size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Requisitos</h2></div>
            <BulletList items={details.requirements ?? []} />
          </section>

          <section className="rounded-[24px] border border-[#e5b94f]/20 bg-[#e5b94f]/[.045] p-5 sm:p-6">
            <div className="flex items-center gap-2"><Sparkles size={19} className="text-[#efcb70]"/><h2 className="text-xl font-black text-white">Qué cubre la beca</h2></div>
            <BulletList items={details.benefits ?? [scholarship.coverage]} />
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-center gap-2"><FileText size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Documentos</h2></div>
            <BulletList items={details.documents ?? []} />
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-center gap-2"><ListChecks size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Etapas del proceso</h2></div>
            <ol className="mt-4 space-y-3">
              {(details.stages ?? []).map((stage, index) => (
                <li key={stage} className="flex gap-3 text-sm leading-6 text-white/58"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#e5b94f]/25 bg-[#e5b94f]/[.08] text-xs font-black text-[#efcb70]">{index + 1}</span><span>{stage}</span></li>
              ))}
            </ol>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-center gap-2"><CalendarClock size={19} className="text-[#e5b94f]"/><h2 className="text-xl font-black text-white">Fechas importantes</h2></div>
            <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/20 px-4">
              {(details.importantDates ?? []).map((item) => (
                <div key={`${item.label}-${item.date}`} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><span className="text-sm font-bold text-white/72">{item.label}</span><span className="text-sm text-white/48">{item.date}</span></div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-[24px] border border-[#e5b94f]/25 bg-[#e5b94f]/[.06] p-5">
            <ShieldCheck size={22} className="text-[#efcb70]"/>
            <h2 className="mt-3 text-xl font-black text-white">Postulación oficial</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{details.applicationInstructions ?? "ROMIL PLUS no recibe postulaciones. Revisa el canal oficial indicado por la institución."}</p>

            {canApplyNow ? (
              <a href={details.applicationUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e5b94f] px-4 py-3 text-sm font-black text-black transition hover:brightness-105">
                {details.applicationLabel ?? "Postular en la página oficial"} <ArrowUpRight size={16}/>
              </a>
            ) : (
              <a href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5b94f]/30 bg-black/15 px-4 py-3 text-sm font-black text-[#efcb70] transition hover:bg-black/25">
                {scholarship.status === "Próxima" ? "Ver convocatoria y fecha de apertura" : "Ver fuente oficial"} <ArrowUpRight size={16}/>
              </a>
            )}

            <p className="mt-3 text-[11px] leading-5 text-white/35">El botón de postulación directa solo aparece cuando verificamos una URL oficial o un formulario enlazado explícitamente por la institución.</p>
          </section>

          <section className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
            <h2 className="text-base font-black text-white">Fuente y verificación</h2>
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <p><span className="font-bold text-white/75">Revisada:</span> {scholarship.verifiedAt}</p>
              <p><span className="font-bold text-white/75">Fuente:</span> {scholarship.sourceLabel}</p>
            </div>
            <a href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#efcb70] hover:underline">Abrir fuente oficial <ArrowUpRight size={14}/></a>
          </section>

          {details.notes?.length ? (
            <section className="rounded-[24px] border border-amber-300/15 bg-amber-300/[.05] p-5"><p className="text-sm font-black text-amber-100">Importante</p><BulletList items={details.notes}/></section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
