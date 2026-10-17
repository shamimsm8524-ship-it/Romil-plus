import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Flag, Globe2, GraduationCap } from "lucide-react";
import { notFound } from "next/navigation";
import { scholarships, type ScholarshipCategory } from "@/lib/scholarships";
import ScholarshipGrid from "../ScholarshipGrid";

const categoryConfig: Record<string, { category: ScholarshipCategory; title: string; description: string; icon: typeof Flag }> = {
  nacionales: {
    category: "Nacional",
    title: "Becas nacionales",
    description: "Becas verificadas para estudiar en universidades, institutos y programas dentro del Perú.",
    icon: Flag,
  },
  internacionales: {
    category: "Internacional",
    title: "Becas internacionales",
    description: "Becas verificadas para peruanos que buscan estudiar en el extranjero o acceder a programas internacionales.",
    icon: Globe2,
  },
};

export function generateStaticParams() {
  return [{ categoria: "nacionales" }, { categoria: "internacionales" }];
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const config = categoryConfig[categoria];
  if (!config) return {};

  return {
    title: `${config.title} para peruanos`,
    description: `${config.description} Revisa fechas, cobertura y la fuente oficial antes de postular.`,
    alternates: { canonical: `/becas/${categoria}` },
    openGraph: {
      title: `${config.title} para peruanos | ROMIL PLUS`,
      description: config.description,
      url: `https://www.romilplus.me/becas/${categoria}`,
    },
  };
}

export default async function ScholarshipCategoryPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const config = categoryConfig[categoria];
  if (!config) notFound();

  const items = scholarships.filter((item) => item.category === config.category);
  const Icon = config.icon;

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold">
        <Link href="/becas" className="inline-flex items-center gap-2 text-white/45 transition hover:text-[#efcb70]"><ArrowLeft size={15} /> Todas las becas</Link>
        <span className="text-white/20">/</span>
        <span className="text-white/70">{config.title}</span>
      </div>

      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(229,185,79,.14),transparent_30%),linear-gradient(145deg,#111114,#070708)] p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#efcb70]">
            <Icon size={15} /> {config.category}
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">{config.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">{config.description}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-bold text-white/55">
            <GraduationCap size={16} className="text-[#e5b94f]" /> {items.length} {items.length === 1 ? "oportunidad publicada" : "oportunidades publicadas"}
          </div>
        </div>
      </section>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Tipos de becas">
        <Link href="/becas" className="rounded-xl border border-white/10 px-4 py-2 text-sm font-black text-white/55 transition hover:border-[#e5b94f]/30 hover:text-[#efcb70]">Todas</Link>
        <Link href="/becas/nacionales" className={`rounded-xl border px-4 py-2 text-sm font-black transition ${categoria === "nacionales" ? "border-[#e5b94f]/35 bg-[#e5b94f]/10 text-[#efcb70]" : "border-white/10 text-white/55 hover:border-[#e5b94f]/30 hover:text-[#efcb70]"}`}>Nacionales</Link>
        <Link href="/becas/internacionales" className={`rounded-xl border px-4 py-2 text-sm font-black transition ${categoria === "internacionales" ? "border-[#e5b94f]/35 bg-[#e5b94f]/10 text-[#efcb70]" : "border-white/10 text-white/55 hover:border-[#e5b94f]/30 hover:text-[#efcb70]"}`}>Internacionales</Link>
      </nav>

      <div className="mt-8 rounded-2xl border border-emerald-400/15 bg-emerald-400/[.05] p-4 text-sm leading-6 text-emerald-100/75">
        <strong className="text-emerald-100">Verificadas el 17/10/2026.</strong> La clasificación se basa en el destino de estudios. Revisa siempre las bases y el cronograma en la fuente oficial.
      </div>

      <div className="mt-10">
        <ScholarshipGrid items={items} />
      </div>
    </main>
  );
}
