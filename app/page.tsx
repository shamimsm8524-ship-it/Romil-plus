import Link from "next/link";
import { ArrowRight, BadgeCheck, BellRing, BookOpen, Building2, CalendarDays, GraduationCap, MapPin, Search, ShieldCheck } from "lucide-react";
import { jobs } from "@/lib/jobs";
import { scholarships } from "@/lib/scholarships";

const guides = [
  {
    href: "/guias/como-postular-convocatoria-cas",
    title: "Cómo postular a una convocatoria CAS sin perderte en el proceso",
    description: "Qué revisar en las bases, cómo ordenar tus documentos y cómo seguir el cronograma oficial.",
  },
  {
    href: "/guias/como-detectar-convocatorias-falsas",
    title: "Cómo detectar una convocatoria de trabajo falsa",
    description: "Señales de alerta, fuentes que debes comprobar y datos que nunca deberías entregar sin verificar.",
  },
  {
    href: "/guias/cv-para-sector-publico",
    title: "CV para el sector público: qué preparar antes de postular",
    description: "Una lista práctica para ordenar experiencia, estudios, certificados y sustentos antes de una convocatoria.",
  },
];

export default function Home() {
  const featured = jobs.slice(0, 6);
  const featuredScholarships = scholarships.slice(0, 2);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(229,185,79,.17),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(57,140,255,.10),transparent_28%),linear-gradient(180deg,#060606,#09090b)]" />
        <div className="relative mx-auto grid min-h-[590px] w-full max-w-[1180px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-6 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5b94f]/30 bg-[#e5b94f]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[.12em] text-[#efcb70]">
              <BadgeCheck size={14} /> Trabajo y becas verificadas en fuentes oficiales
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.03] text-white sm:text-5xl lg:text-6xl">
              Encuentra <span className="text-[#e5b94f]">oportunidades reales</span> de trabajo y estudio.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">
              ROMIL PLUS reúne convocatorias laborales y becas para peruanos, organiza sus especificaciones en fichas completas y te dirige al canal oficial de postulación cuando existe un enlace directo verificado.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/convocatorias" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#e5b94f] px-6 text-sm font-black text-black transition hover:brightness-110">
                <Search size={18} /> Ver convocatorias <ArrowRight size={17} />
              </Link>
              <Link href="/becas" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#e5b94f]/35 bg-[#e5b94f]/10 px-6 text-sm font-black text-[#efcb70] transition hover:bg-[#e5b94f]/15">
                <GraduationCap size={18} /> Ver becas
              </Link>
              <Link href="/guias" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-6 text-sm font-black text-white transition hover:border-[#e5b94f]/50 hover:bg-[#e5b94f]/10">
                <BookOpen size={18} /> Guías
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                [ShieldCheck, "Fuente oficial", "Enlace a la entidad"],
                [CalendarDays, "Fecha visible", "Publicación y verificación"],
                [BellRing, "Sin cobro", "No cobramos por postular"],
              ].map(([Icon, title, text]) => {
                const IconComponent = Icon as typeof ShieldCheck;
                return (
                  <div key={String(title)} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <IconComponent size={21} className="text-[#e5b94f]" />
                    <p className="mt-2 text-sm font-black text-white">{String(title)}</p>
                    <p className="mt-1 text-xs text-white/45">{String(text)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px]">
            <div className="absolute -inset-8 rounded-full bg-[#e5b94f]/10 blur-3xl" />
            <div className="relative rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,#111114,#070708)] p-5 shadow-[0_30px_90px_rgba(0,0,0,.55)] sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#e5b94f]">Verificación ROMIL PLUS</p>
                  <h2 className="mt-2 text-2xl font-black text-white">¿Qué comprobamos?</h2>
                </div>
                <img src="/logo-romil-plus.png" alt="ROMIL PLUS" className="h-20 w-24 object-contain" />
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  [Building2, "Institución identificada", "La oportunidad debe pertenecer a una entidad u organización real."],
                  [BadgeCheck, "Publicación oficial", "Buscamos la convocatoria en el portal de la institución responsable."],
                  [CalendarDays, "Cronograma comprobable", "Mostramos fechas y cuándo verificamos la fuente."],
                ].map(([Icon, title, text]) => {
                  const IconComponent = Icon as typeof Building2;
                  return (
                    <div key={String(title)} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e5b94f]/10 text-[#e5b94f]"><IconComponent size={19} /></div>
                      <div><p className="text-sm font-black text-white">{String(title)}</p><p className="mt-1 text-xs leading-5 text-white/50">{String(text)}</p></div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-400/[.06] px-4 py-3 text-xs leading-5 text-emerald-100/75">
                ROMIL PLUS no reemplaza las bases oficiales. La fuente original siempre manda si existe una diferencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Trabajo</p>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Convocatorias laborales verificadas recientemente</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">Cada oportunidad abre una ficha con requisitos, experiencia, funciones, documentos, condiciones, cronograma y el acceso oficial de postulación cuando está disponible.</p>
          </div>
          <Link href="/convocatorias" className="inline-flex items-center gap-2 text-sm font-black text-[#e5b94f]">Ver todas <ArrowRight size={16} /></Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((job) => (
            <article key={job.slug} className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#e5b94f]/30">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border border-[#e5b94f]/25 bg-[#e5b94f]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#e5b94f]">Fuente verificada</span>
                <span className="text-[10px] font-bold text-white/35">{job.verifiedAt}</span>
              </div>
              <p className="mt-4 text-xs font-black uppercase tracking-[.13em] text-white/45">{job.entity}</p>
              <h3 className="mt-2 text-xl font-black leading-tight text-white">{job.title}</h3>
              <div className="mt-4 grid gap-2 text-xs text-white/52">
                <p className="inline-flex items-center gap-2"><MapPin size={14} className="text-[#e5b94f]" /> {job.location}</p>
                <p className="inline-flex items-center gap-2"><CalendarDays size={14} className="text-[#e5b94f]" /> Publicada: {job.publishedAt}</p>
                <p className="inline-flex items-center gap-2"><Building2 size={14} className="text-[#e5b94f]" /> {job.regime}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/52">{job.summary}</p>
              <Link href={`/convocatorias/${job.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#e5b94f]">Ver ficha completa <ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Estudios</p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Becas verificadas para peruanos</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">Cada beca tiene una ficha con requisitos, cobertura, documentos, etapas, fechas importantes y postulación oficial cuando la convocatoria está abierta.</p>
            </div>
            <Link href="/becas" className="inline-flex items-center gap-2 text-sm font-black text-[#e5b94f]">Ver todas las becas <ArrowRight size={16} /></Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featuredScholarships.map((scholarship) => (
              <article key={scholarship.slug} className="rounded-[26px] border border-white/10 bg-[#09090b] p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em] ${scholarship.status === "Abierta" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-sky-400/25 bg-sky-400/10 text-sky-200"}`}>{scholarship.status}</span>
                  <span className="text-[10px] font-bold text-white/35">Revisada {scholarship.verifiedAt}</span>
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-[.13em] text-white/45">{scholarship.institution}</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-white">{scholarship.title}</h3>
                <div className="mt-4 grid gap-2 text-sm text-white/55">
                  <p className="inline-flex items-center gap-2"><GraduationCap size={16} className="text-[#e5b94f]" /> {scholarship.level}</p>
                  <p className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-[#e5b94f]" /> {scholarship.deadline}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/52">{scholarship.summary}</p>
                <Link href={`/becas/oportunidad/${scholarship.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#e5b94f]">Ver ficha completa <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-16 sm:px-6 lg:px-6">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Prepárate mejor</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Guías para postular con más orden</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">Contenido propio para entender procesos, preparar documentos y evitar ofertas dudosas.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="group rounded-[24px] border border-white/10 bg-[#09090b] p-5 transition hover:-translate-y-1 hover:border-[#e5b94f]/30">
              <BookOpen size={22} className="text-[#e5b94f]" />
              <h3 className="mt-4 text-xl font-black leading-tight text-white">{guide.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/52">{guide.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-white/75 group-hover:text-[#e5b94f]">Leer guía <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-16 sm:px-6 lg:px-6">
        <div className="rounded-[28px] border border-[#e5b94f]/25 bg-[#e5b94f]/[.055] p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Importante</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Nunca pagues a ROMIL PLUS para poder postular.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">Nuestro trabajo es ayudarte a encontrar y entender oportunidades. Si una entidad exige algún trámite específico, debe estar indicado en sus bases oficiales. No entregues contraseñas ni códigos de verificación a terceros.</p>
          </div>
          <Link href="/guias/como-detectar-convocatorias-falsas" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#e5b94f] px-5 py-3 text-sm font-black text-black lg:mt-0">Ver guía de seguridad <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}