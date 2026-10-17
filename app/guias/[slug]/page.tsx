import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { jobGuides } from "@/lib/job-guides";

export function generateStaticParams() {
  return jobGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = jobGuides.find((item) => item.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guias/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = jobGuides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <main className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6">
      <Link href="/guias" className="inline-flex items-center gap-2 text-sm font-black text-[#e5b94f]"><ArrowLeft size={15}/> Todas las guías</Link>
      <article className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-9">
        <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Guía ROMIL PLUS</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">{guide.title}</h1>
        <p className="mt-4 text-base leading-7 text-white/60">{guide.description}</p>
        <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white/35"><Clock size={14}/> Lectura aproximada: {guide.readTime}</p>

        <div className="article-copy mt-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#e5b94f]/20 bg-[#e5b94f]/[.05] p-5 text-sm leading-6 text-white/60">
          Esta guía es informativa. Para una convocatoria específica, revisa siempre las bases, anexos y cronograma publicados por la entidad responsable.
        </div>
      </article>
    </main>
  );
}
