import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import type { PublicOpportunity } from "@/lib/state-opportunities";

function dateTimestamp(value: string) {
  const match = value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return 0;
  const [, day, month, year] = match;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function sortByPublicationDate(a: PublicOpportunity, b: PublicOpportunity) {
  return (
    dateTimestamp(b.publishedAt) - dateTimestamp(a.publishedAt) ||
    b.title.localeCompare(a.title, "es", { numeric: true })
  );
}

function SunatJobCard({ job }: { job: PublicOpportunity }) {
  const upcoming = job.status === "Próxima";

  return (
    <article className="rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_24px_rgba(10,45,90,.05)]">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[.04em] ${
            upcoming ? "bg-[#fff3c4] text-[#8a6200]" : "bg-[#e5f7ec] text-[#13723d]"
          }`}
        >
          {job.status}
        </span>
        <span className="rounded-full bg-[#eef5ff] px-3 py-1.5 text-xs font-black uppercase tracking-[.04em] text-[#0b58b6]">
          SUNAT
        </span>
      </div>

      <p className="mt-4 text-xs font-black uppercase tracking-[.08em] text-[#6b7b8e]">{job.entity}</p>
      <h3 className="mt-2 text-xl font-black leading-tight tracking-[-.02em] text-[#0a2d5a]">{job.title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-[#607085]">{job.summary}</p>

      <div className="mt-4 space-y-2 text-sm font-bold text-[#607085]">
        <p className="flex items-start gap-2">
          <MapPin size={18} className="mt-0.5 shrink-0 text-[#0866d8]" />
          <span>{job.location}</span>
        </p>
        <p className="flex items-start gap-2">
          <CalendarDays size={18} className="mt-0.5 shrink-0 text-[#0866d8]" />
          <span>Publicación/inicio: {job.publishedAt} · cierre: {job.closesAt}</span>
        </p>
      </div>

      <Link
        href={`/convocatorias/${job.slug}`}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0866d8] px-4 text-sm font-black text-white transition hover:bg-[#075abc]"
      >
        Ver convocatoria <ArrowRight size={17} />
      </Link>
    </article>
  );
}

function SunatGroup({
  title,
  description,
  jobs,
  kind,
}: {
  title: string;
  description: string;
  jobs: PublicOpportunity[];
  kind: "practice" | "cas";
}) {
  const Icon = kind === "practice" ? GraduationCap : BriefcaseBusiness;

  return (
    <div className="rounded-[28px] border border-[#dbe5f1] bg-[#f8fbff] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-3 shadow-[0_4px_14px_rgba(10,45,90,.06)]">
          <Icon size={25} className="text-[#0866d8]" />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-2xl">{title}</h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#657489]">{description}</p>
        </div>
      </div>

      {jobs.length > 0 ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <SunatJobCard key={job.slug} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-[#cbd9e8] bg-white px-4 py-5 text-sm font-bold text-[#657489]">
          No hay convocatorias visibles en esta sección por el momento.
        </div>
      )}
    </div>
  );
}

export default function SunatSections({ jobs }: { jobs: PublicOpportunity[] }) {
  const professionalPractices = jobs
    .filter((job) => job.slug.startsWith("sunat-pra-"))
    .sort(sortByPublicationDate);
  const casJobs = jobs
    .filter((job) => job.slug.startsWith("sunat-cas-"))
    .sort(sortByPublicationDate);

  if (jobs.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 pb-10 sm:px-6 lg:px-6" aria-labelledby="sunat-title">
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-[.08em] text-[#0b58b6]">Convocatorias oficiales SUNAT</p>
        <h2 id="sunat-title" className="mt-1 text-3xl font-black tracking-[-.03em] text-[#0a2d5a] sm:text-4xl">
          SUNAT separado por modalidad
        </h2>
        <p className="mt-2 max-w-3xl text-base font-semibold leading-7 text-[#657489]">
          Las prácticas profesionales y los procesos CAS aparecen en secciones distintas. También mostramos las convocatorias próximas para que puedas prepararte antes de que abra la postulación.
        </p>
      </div>

      <div className="grid gap-5">
        <SunatGroup
          title="Prácticas profesionales SUNAT"
          description="Convocatorias PRA para egresados y practicantes profesionales. Ordenadas por fecha de publicación/inicio, de la más reciente a la más antigua."
          jobs={professionalPractices}
          kind="practice"
        />
        <SunatGroup
          title="Convocatorias laborales SUNAT · CAS"
          description="Procesos laborales CAS de SUNAT, separados de las prácticas profesionales y ordenados por fecha."
          jobs={casJobs}
          kind="cas"
        />
      </div>
    </section>
  );
}
