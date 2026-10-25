import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StateJobsExplorer from "@/components/StateJobsExplorer";
import { detailedPublicJobs } from "@/lib/job-details";
import { jobDate, jobSearchTopics } from "@/lib/job-search-topics";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return jobSearchTopics.map((topic) => ({ tema: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }): Promise<Metadata> {
  const { tema } = await params;
  const topic = jobSearchTopics.find((item) => item.slug === tema);
  if (!topic) return {};
  const url = "/trabajos/" + topic.slug;
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: url },
    openGraph: { title: topic.title + " | ROMIL PLUS", description: topic.description, url },
    twitter: { card: "summary_large_image", title: topic.title, description: topic.description },
  };
}

export default async function JobsByTopicPage({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const topic = jobSearchTopics.find((item) => item.slug === tema);
  if (!topic) notFound();
  const jobs = detailedPublicJobs.filter((job) => job.status === "Vigente" && topic.match(job))
    .sort((a, b) => jobDate(b.verifiedAt) - jobDate(a.verifiedAt) || jobDate(b.publishedAt) - jobDate(a.publishedAt));
  const pageUrl = "https://www.romilplus.me/trabajos/" + topic.slug;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: topic.title,
      description: topic.description,
      url: pageUrl,
      inLanguage: "es-PE",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: jobs.length,
        itemListElement: jobs.map((job, index) => ({
          "@type": "ListItem", position: index + 1,
          name: job.title,
          url: "https://www.romilplus.me/convocatorias/" + job.slug,
        })),
      },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.romilplus.me/" },
        { "@type": "ListItem", position: 2, name: "Ofertas laborales en Perú", item: "https://www.romilplus.me/convocatorias" },
        { "@type": "ListItem", position: 3, name: topic.title, item: pageUrl },
      ],
    },
  ];
  return <main className="min-h-screen bg-white text-[#0a2d5a]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6">
      <nav aria-label="Ruta de navegación" className="text-sm font-semibold text-[#0866d8]">
        <Link href="/">Inicio</Link> / <Link href="/convocatorias">Ofertas laborales</Link> / <span className="text-[#52647a]">{topic.title}</span>
      </nav>
      <h1 className="mt-6 text-3xl font-black leading-tight sm:text-5xl">{topic.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#52647a]">{topic.intro}</p>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#52647a]">Las ofertas sin fecha límite deben confirmarse en la fuente antes de postular. Revisa la fecha de comprobación y las condiciones de cada ficha.</p>
      <StateJobsExplorer jobs={jobs} detailSlugs={jobs.map((job) => job.slug)} />
      <section className="mt-10 max-w-4xl rounded-2xl border border-[#dbe5f1] bg-[#f8fafc] p-6">
        <h2 className="text-2xl font-black">{topic.adviceTitle}</h2>
        {topic.advice.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-[#52647a]">{paragraph}</p>)}
        <p className="mt-4 leading-7"><Link className="font-bold text-[#0866d8] underline" href="/como-verificamos">Cómo revisamos las fuentes</Link> · <Link className="font-bold text-[#0866d8] underline" href="/contacto">Reportar una oferta cerrada</Link></p>
      </section>
      <nav aria-label="Más oportunidades" className="mt-8 flex flex-wrap gap-4 text-[#0866d8] underline">
        <Link href="/convocatorias">Todas las ofertas laborales en Perú</Link>
        {jobSearchTopics.filter((item) => item.slug !== topic.slug).map((item) => <Link key={item.slug} href={"/trabajos/" + item.slug}>{item.title}</Link>)}
        <Link href="/guias/como-detectar-convocatorias-falsas">Cómo detectar ofertas falsas</Link>
      </nav>
    </div>
  </main>;
}
