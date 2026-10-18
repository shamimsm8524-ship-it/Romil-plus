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
    <ul className="mt-4 space-y-2 text-sm leading-6 text-[#52647a]">
      {items.map((item) => (
        <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d89b09]"/><span>{item}</span></li>
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
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[1050px] px-4 py-10 sm:px-6 lg:py-12">
        <Link href="/becas" className="inline-flex items-center gap-2 text-sm font-black text-[#0866d8] hover:underline"><ArrowLeft size={15}/> Volver a becas</Link>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-[#dbe5f1] bg-[radial-gradient(circle_at_85%_10%,rgba(244,189,45,.18),transparent_32%),linear-gradient(145deg,#f7fbff,#ffffff)] p-6 shadow-[0_12px_34px_rgba(10,45,90,.06)] sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#b9e8c8] bg-[#eaf8ef] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#14763e]">{scholarship.status}</span>
            <span className="rounded-full border border-[#f0cf70] bg-[#fff7da] px-3 py-1 text-[11px] font-black uppercase tracking-[.1em] text-[#8a6100]">{scholarship.category}</span>
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[.14em] text-[#66768a]">{scholarship.institution}</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-black leading-tight text-[#0a2d5a] sm:text-5xl">{scholarship.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#52647a]">{scholarship.summary}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><GraduationCap size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#7a899b]">Nivel</p><p className="mt-1 text-sm font-bold text-[#17365d]">{scholarship.level}</p></div>
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><MapPin size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#7a899b]">Destino</p><p className="mt-1 text-sm font-bold text-[#17365d]">{scholarship.destination}</p></div>
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><CalendarClock size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#7a899b]">Fecha límite</p><p className="mt-1 text-sm font-bold text-[#17365d]">{scholarship.deadline}</p></div>
            <div className="rounded-2xl border border-[#dbe5f1] bg-white p-4"><UsersRound size={18} className="text-[#d89b09]"/><p className="mt-2 text-xs font-bold uppercase tracking-[.1em] text-[#7a899b]">Cantidad</p><p className="mt-1 text-sm font-bold text-[#17365d]">{details.quantity ?? "Según convocatoria"}</p></div>
          </div>
        </section>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">
          <div className="space-y-5">
            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.045)] sm:p-6">
              <div className="flex items-center gap-2"><UsersRound size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#102f57]">¿Quién puede postular?</h2></div>
              <BulletList items={details.eligibility ?? [scholarship.summary]} />
            </section>

            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.045)] sm:p-6">
              <div className="flex items-center gap-2"><BadgeCheck size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#102f57]">Requisitos</h2></div>
              <BulletList items={details.requirements ?? []} />
            </section>

            <section className="rounded-[24px] border border-[#f0cf70] bg-[#fff9e8] p-5 sm:p-6">
              <div className="flex items-center gap-2"><Sparkles size={19} className="text-[#b77d00]"/><h2 className="text-xl font-black text-[#102f57]">Qué cubre la beca</h2></div>
              <BulletList items={details.benefits ?? [scholarship.coverage]} />
            </section>

            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.045)] sm:p-6">
              <div className="flex items-center gap-2"><FileText size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#102f57]">Documentos</h2></div>
              <BulletList items={details.documents ?? []} />
            </section>

            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.045)] sm:p-6">
              <div className="flex items-center gap-2"><ListChecks size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#102f57]">Etapas del proceso</h2></div>
              <ol className="mt-4 space-y-3">
                {(details.stages ?? []).map((stage, index) => (
                  <li key={stage} className="flex gap-3 text-sm leading-6 text-[#52647a]"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#f0cf70] bg-[#fff7da] text-xs font-black text-[#8a6100]">{index + 1}</span><span>{stage}</span></li>
                ))}
              </ol>
            </section>

            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.045)] sm:p-6">
              <div className="flex items-center gap-2"><CalendarClock size={19} className="text-[#d89b09]"/><h2 className="text-xl font-black text-[#102f57]">Fechas importantes</h2></div>
              <div className="mt-4 divide-y divide-[#e5ebf2] rounded-2xl border border-[#dbe5f1] bg-[#f8fafc] px-4">
                {(details.importantDates ?? []).map((item) => (
                  <div key={`${item.label}-${item.date}`} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><span className="text-sm font-bold text-[#17365d]">{item.label}</span><span className="text-sm text-[#66768a]">{item.date}</span></div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-[24px] border border-[#f0cf70] bg-[#fff9e8] p-5">
              <ShieldCheck size={22} className="text-[#b77d00]"/>
              <h2 className="mt-3 text-xl font-black text-[#102f57]">Postulación oficial</h2>
              <p className="mt-3 text-sm leading-6 text-[#52647a]">{details.applicationInstructions ?? "ROMIL PLUS no recibe postulaciones. Revisa el canal oficial indicado por la institución."}</p>

              {canApplyNow ? (
                <a href={details.applicationUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0866d8] px-4 py-3 text-sm font-black text-white transition hover:bg-[#075abc]">
                  {details.applicationLabel ?? "Postular en la página oficial"} <ArrowUpRight size={16}/>
                </a>
              ) : (
                <a href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#f0cf70] bg-white px-4 py-3 text-sm font-black text-[#8a6100] transition hover:bg-[#fff7da]">
                  {scholarship.status === "Próxima" ? "Ver convocatoria y fecha de apertura" : "Ver fuente oficial"} <ArrowUpRight size={16}/>
                </a>
              )}

              <p className="mt-3 text-[11px] leading-5 text-[#7a899b]">El botón de postulación directa solo aparece cuando verificamos una URL oficial o un formulario enlazado explícitamente por la institución.</p>
            </section>

            <section className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.045)]">
              <h2 className="text-base font-black text-[#102f57]">Fuente y verificación</h2>
              <div className="mt-4 space-y-3 text-sm text-[#52647a]">
                <p><span className="font-bold text-[#17365d]">Revisada:</span> {scholarship.verifiedAt}</p>
                <p><span className="font-bold text-[#17365d]">Fuente:</span> {scholarship.sourceLabel}</p>
              </div>
              <a href={scholarship.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0866d8] hover:underline">Abrir fuente oficial <ArrowUpRight size={14}/></a>
            </section>

            {details.notes?.length ? (
              <section className="rounded-[24px] border border-[#f0cf70] bg-[#fff9e8] p-5"><p className="text-sm font-black text-[#8a6100]">Importante</p><BulletList items={details.notes}/></section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
