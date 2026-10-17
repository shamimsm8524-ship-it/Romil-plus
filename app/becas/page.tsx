import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarClock, Flag, Globe2, GraduationCap, ShieldCheck } from "lucide-react";
import { scholarships } from "@/lib/scholarships";
import ScholarshipGrid from "./ScholarshipGrid";

export const metadata: Metadata = {
  title: "Becas nacionales e internacionales para peruanos",
  description: "Catálogo de becas nacionales e internacionales para peruanos con fuentes oficiales, estado de convocatoria, cobertura y enlace a la institución responsable.",
  alternates: { canonical: "/becas" },
  openGraph: {
    title: "Becas nacionales e internacionales | ROMIL PLUS",
    description: "Programas de becas para peruanos, separados entre nacionales e internacionales y contrastados con fuentes oficiales.",
    url: "https://www.romilplus.me/becas",
  },
};

export default function ScholarshipsPage() {
  const nationalCount = scholarships.filter((item) => item.category === "Nacional").length;
  const internationalCount = scholarships.filter((item) => item.category === "Internacional").length;

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(229,185,79,.14),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#efcb70]">
            <GraduationCap size={15} /> Catálogo de becas
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">Becas nacionales e internacionales</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
            Aquí encontrarás tanto convocatorias abiertas como programas de becas existentes cuya próxima edición aún no ha sido publicada. Cada ficha muestra su estado real y una fuente oficial.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            [BadgeCheck, "Fuente oficial", "Confirmamos que el programa existe"],
            [CalendarClock, "Estado visible", "Abierta, próxima, cerrada o sin convocatoria"],
            [ShieldCheck, "Sin intermediarios", "La postulación se realiza con la entidad"],
          ].map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof BadgeCheck;
            return (
              <div key={String(title)} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <IconComponent size={20} className="text-[#e5b94f]" />
                <p className="mt-2 text-sm font-black text-white">{String(title)}</p>
                <p className="mt-1 text-xs leading-5 text-white/45">{String(text)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href="/becas/nacionales" className="group rounded-[26px] border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#e5b94f]/35 hover:bg-[#e5b94f]/[.035]">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#e5b94f]/25 bg-[#e5b94f]/10 text-[#efcb70]"><Flag size={23} /></div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-white/45">{nationalCount} programas</span>
          </div>
          <h2 className="mt-5 text-2xl font-black text-white">Becas nacionales</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Oportunidades para estudiar en universidades, institutos y programas dentro del Perú.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#efcb70]">Ver becas nacionales <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
        </Link>

        <Link href="/becas/internacionales" className="group rounded-[26px] border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#e5b94f]/35 hover:bg-[#e5b94f]/[.035]">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#e5b94f]/25 bg-[#e5b94f]/10 text-[#efcb70]"><Globe2 size={23} /></div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-white/45">{internationalCount} programas</span>
          </div>
          <h2 className="mt-5 text-2xl font-black text-white">Becas internacionales</h2>
          <p className="mt-2 text-sm leading-6 text-white/55">Becas para peruanos que permiten realizar estudios en otros países o programas internacionales.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#efcb70]">Ver becas internacionales <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
        </Link>
      </section>

      <div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.05] p-4 text-sm leading-6 text-emerald-100/75">
        <strong className="text-emerald-100">Fuentes revisadas el 17/10/2026.</strong> Que un programa exista no significa que esté recibiendo postulaciones hoy. Por eso mostramos por separado el estado de cada convocatoria.
      </div>

      <div className="mt-10">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[.14em] text-[#e5b94f]">Todas</p>
          <h2 className="mt-1 text-3xl font-black text-white">Todas las becas y programas registrados</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/50">Incluye oportunidades abiertas, próximas, cerradas y programas existentes que todavía no han publicado una nueva convocatoria.</p>
        </div>
        <ScholarshipGrid items={scholarships} />
      </div>

      <section className="mt-14 rounded-[26px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-white">Cómo tratamos las becas en ROMIL PLUS</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
          No cobramos por postular ni recibimos expedientes. Verificamos que el programa tenga una fuente oficial y diferenciamos claramente entre la existencia de la beca y una convocatoria vigente. Si una fecha, requisito o beneficio cambia, la publicación oficial de la institución es la referencia definitiva.
        </p>
      </section>
    </main>
  );
}
