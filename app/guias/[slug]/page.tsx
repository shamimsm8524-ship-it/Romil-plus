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
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6">
        <Link href="/guias" className="inline-flex items-center gap-2 text-sm font-black text-[#0866d8]"><ArrowLeft size={15}/> Todas las guías</Link>
        <article className="mt-6 rounded-[28px] border border-[#dbe5f1] bg-white p-6 shadow-[0_10px_30px_rgba(10,45,90,.06)] sm:p-9">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#d89b09]">Guía ROMIL PLUS</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#0a2d5a] sm:text-4xl">{guide.title}</h1>
          <p className="mt-4 text-base leading-7 text-[#52647a]">{guide.description}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#7a899b]"><Clock size={14}/> Lectura aproximada: {guide.readTime}</p>

          <div className="mt-8">
            {guide.sections.map((section) => (
              <section key={section.heading} className="mt-8 first:mt-0">
                <h2 className="text-2xl font-black leading-tight text-[#102f57] sm:text-[1.7rem]">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-[#52647a]">{paragraph}</p>)}
                {section.bullets ? (
                  <ul className="mt-4 grid gap-3 pl-5 text-base leading-7 text-[#52647a]">
                    {section.bullets.map((bullet) => <li key={bullet} className="list-disc marker:text-[#d89b09]">{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#f0cf70] bg-[#fff9e8] p-5 text-sm leading-6 text-[#5a6b7e]">
            Esta guía es informativa. Para una convocatoria específica, revisa siempre las bases, anexos y cronograma publicados por la entidad responsable.
          </div>
        </article>
      </div>
    </main>
  );
}
