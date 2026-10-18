import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarClock, Flag, Globe2, GraduationCap, ShieldCheck } from "lucide-react";
import { scholarships } from "@/lib/scholarships";
import ScholarshipGrid from "./ScholarshipGrid";

export const metadata: Metadata = {
  title: "Becas nacionales e internacionales para peruanos",
  description: "Catálogo de becas nacionales e internacionales para peruanos con requisitos, cobertura, fechas, etapas y acceso a la postulación oficial cuando está disponible.",
  alternates: { canonical: "/becas" },
  openGraph: {
    title: "Becas nacionales e internacionales | ROMIL PLUS",
    description: "Programas de becas para peruanos con fichas completas y fuentes oficiales.",
    url: "https://www.romilplus.me/becas",
  },
};

export default function ScholarshipsPage() {
  const nationalCount = scholarships.filter((item) => item.category === "Nacional").length;
  const internationalCount = scholarships.filter((item) => item.category === "Internacional").length;

  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
        <section className="overflow-hidden rounded-[30px] border border-[#dbe5f1] bg-[radial-gradient(circle_at_85%_15%,rgba(244,189,45,.18),transparent_32%),linear-gradient(145deg,#f7fbff,#ffffff)] p-6 shadow-[0_12px_34px_rgba(10,45,90,.06)] sm:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_340px] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f0cf70] bg-[#fff7da] px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#9a6a00]">
                <GraduationCap size={15} /> Catálogo de becas
              </div>
              <h1 className="mt-5 text-4xl font-black leading-tight text-[#0a2d5a] sm:text-5xl">Becas nacionales e internacionales</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#52647a]">
                Cada oportunidad abre una ficha propia con requisitos, quién puede postular, cobertura, documentos, etapas y fechas importantes. Cuando verificamos un enlace oficial directo de postulación, el botón te lleva a ese canal; si no existe uno estable, te mostramos las instrucciones y la fuente oficial sin inventar enlaces.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-[390px] items-end justify-center px-5 py-4 sm:px-7">
              <div className="absolute inset-x-6 bottom-4 top-10 rounded-[42%] bg-[radial-gradient(circle,#eef5ff_0%,#fff4c7_62%,transparent_74%)]" />
              <img
                src="/romil-hero-scholar.svg"
                alt="Estudiante con cuadernos"
                className="relative z-10 h-auto w-full max-w-[285px] object-contain sm:max-w-[305px]"
              />
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              [BadgeCheck, "Fuente oficial", "Confirmamos que el programa existe"],
              [CalendarClock, "Ficha completa", "Requisitos, cobertura, etapas y fechas"],
              [ShieldCheck, "Sin intermediarios", "La postulación se realiza con la entidad"],
            ].map(([Icon, title, text]) => {
              const IconComponent = Icon as typeof BadgeCheck;
              return (
                <div key={String(title)} className="rounded-2xl border border-[#dbe5f1] bg-white p-4 shadow-[0_6px_18px_rgba(10,45,90,.04)]">
                  <IconComponent size={20} className="text-[#d89b09]" />
                  <p className="mt-2 text-sm font-black text-[#102f57]">{String(title)}</p>
                  <p className="mt-1 text-xs leading-5 text-[#66768a]">{String(text)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Link href="/becas/nacionales" className="group rounded-[26px] border border-[#dbe5f1] bg-[#f8fafc] p-6 transition hover:-translate-y-0.5 hover:border-[#97bce8] hover:bg-[#eef5ff]">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#f0cf70] bg-[#fff7da] text-[#b77d00]"><Flag size={23} /></div>
              <span className="rounded-full border border-[#dbe5f1] bg-white px-3 py-1 text-xs font-black text-[#66768a]">{nationalCount} programas</span>
            </div>
            <h2 className="mt-5 text-2xl font-black text-[#102f57]">Becas nacionales</h2>
            <p className="mt-2 text-sm leading-6 text-[#5a6b7e]">Oportunidades para estudiar en universidades, institutos y programas dentro del Perú.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0866d8]">Ver becas nacionales <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>

          <Link href="/becas/internacionales" className="group rounded-[26px] border border-[#dbe5f1] bg-[#f8fafc] p-6 transition hover:-translate-y-0.5 hover:border-[#97bce8] hover:bg-[#eef5ff]">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#f0cf70] bg-[#fff7da] text-[#b77d00]"><Globe2 size={23} /></div>
              <span className="rounded-full border border-[#dbe5f1] bg-white px-3 py-1 text-xs font-black text-[#66768a]">{internationalCount} programas</span>
            </div>
            <h2 className="mt-5 text-2xl font-black text-[#102f57]">Becas internacionales</h2>
            <p className="mt-2 text-sm leading-6 text-[#5a6b7e]">Becas para peruanos que permiten realizar estudios en otros países o programas internacionales.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0866d8]">Ver becas internacionales <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </section>

        <div className="mt-8 rounded-2xl border border-[#b9e8c8] bg-[#eefaf2] p-4 text-sm leading-6 text-[#35664b]">
          <strong className="text-[#14763e]">Fuentes revisadas el 17/10/2026.</strong> Que un programa exista no significa que esté recibiendo postulaciones hoy. Por eso mostramos por separado el estado de cada convocatoria.
        </div>

        <div className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#d89b09]">Todas</p>
            <h2 className="mt-1 text-3xl font-black text-[#0a2d5a]">Todas las becas y programas registrados</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5a6b7e]">Incluye oportunidades abiertas, próximas, cerradas y programas existentes que todavía no han publicado una nueva convocatoria.</p>
          </div>
          <ScholarshipGrid items={scholarships} />
        </div>

        <section className="mt-14 rounded-[26px] border border-[#dbe5f1] bg-[#f8fafc] p-6 sm:p-8">
          <h2 className="text-2xl font-black text-[#0a2d5a]">Cómo tratamos las becas en ROMIL PLUS</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5a6b7e]">
            No cobramos por postular ni recibimos expedientes. Verificamos que el programa tenga una fuente oficial y diferenciamos claramente entre la existencia de la beca y una convocatoria vigente. Si una fecha, requisito o beneficio cambia, la publicación oficial de la institución es la referencia definitiva.
          </p>
        </section>
      </div>
    </main>
  );
}
