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
    description: "Programas y convocatorias de becas para estudiar en universidades, institutos y centros de formación dentro del Perú.",
    icon: Flag,
  },
  internacionales: {
    category: "Internacional",
    title: "Becas internacionales",
    description: "Programas y convocatorias para peruanos que buscan estudiar, investigar o realizar movilidad académica en el extranjero.",
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
    description: `${config.description} Consulta el estado actual, cobertura y la fuente oficial antes de postular.`,
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
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold">
          <Link href="/becas" className="inline-flex items-center gap-2 text-[#52647a] transition hover:text-[#0866d8]"><ArrowLeft size={15} /> Todas las becas</Link>
          <span className="text-[#b8c3cf]">/</span>
          <span className="text-[#17365d]">{config.title}</span>
        </div>

        <section className="overflow-hidden rounded-[30px] border border-[#dbe5f1] bg-[radial-gradient(circle_at_85%_15%,rgba(244,189,45,.18),transparent_32%),linear-gradient(145deg,#f7fbff,#ffffff)] p-6 shadow-[0_12px_34px_rgba(10,45,90,.06)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f0cf70] bg-[#fff7da] px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#9a6a00]">
              <Icon size={15} /> {config.category}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#0a2d5a] sm:text-5xl">{config.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#52647a]">{config.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#dbe5f1] bg-white px-4 py-2 text-sm font-bold text-[#52647a]">
              <GraduationCap size={16} className="text-[#d89b09]" /> {items.length} {items.length === 1 ? "programa registrado" : "programas registrados"}
            </div>
          </div>
        </section>

        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Tipos de becas">
          <Link href="/becas" className="rounded-xl border border-[#dbe5f1] bg-white px-4 py-2 text-sm font-black text-[#52647a] transition hover:border-[#97bce8] hover:text-[#0866d8]">Todas</Link>
          <Link href="/becas/nacionales" className={`rounded-xl border px-4 py-2 text-sm font-black transition ${categoria === "nacionales" ? "border-[#f0cf70] bg-[#fff7da] text-[#8a6100]" : "border-[#dbe5f1] bg-white text-[#52647a] hover:border-[#97bce8] hover:text-[#0866d8]"}`}>Nacionales</Link>
          <Link href="/becas/internacionales" className={`rounded-xl border px-4 py-2 text-sm font-black transition ${categoria === "internacionales" ? "border-[#f0cf70] bg-[#fff7da] text-[#8a6100]" : "border-[#dbe5f1] bg-white text-[#52647a] hover:border-[#97bce8] hover:text-[#0866d8]"}`}>Internacionales</Link>
        </nav>

        <div className="mt-8 rounded-2xl border border-[#b9e8c8] bg-[#eefaf2] p-4 text-sm leading-6 text-[#35664b]">
          <strong className="text-[#14763e]">Fuentes revisadas el 17/10/2026.</strong> La clasificación se basa en el destino de estudios. Un programa puede existir aunque su convocatoria actual esté cerrada o todavía no haya sido publicada.
        </div>

        <div className="mt-10">
          <ScholarshipGrid items={items} />
        </div>
      </div>
    </main>
  );
}
