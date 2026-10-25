import type { Metadata } from "next";
import { ArrowRight, Cpu, GraduationCap, Landmark, ShieldCheck, Wrench } from "lucide-react";
import StateJobsExplorer from "@/components/StateJobsExplorer";
import { detailedPublicJobs } from "@/lib/job-details";
import { privateVerifiedJobs } from "@/lib/private-verified-jobs";
import { getSunatLiveJobs } from "@/lib/sunat-live";
import "./convocatorias.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Ofertas laborales en Perú: Lima, minería y más",
  description:
    "Vacantes verificadas en Perú para cajeros, ventas, restaurantes, limpieza, almacén, seguridad, técnicos, profesionales, prácticas y empleo público, siempre enlazadas a una fuente comprobable.",
  alternates: { canonical: "/convocatorias" },
};

const employmentSectors = [
  "Cajeros y ventas",
  "Atención al cliente",
  "Restaurantes y pollerías",
  "Mozo, azafata y cocina",
  "Bar, cafetería y barista",
  "Limpieza y mantenimiento",
  "Hoteles y turismo",
  "Aeropuertos y aerolíneas",
  "Seguridad y vigilancia",
  "Almacén y logística",
  "Transporte y delivery",
  "Supermercados y tiendas",
  "Producción y fábricas",
  "Construcción y oficios",
  "Salud",
  "Educación",
  "Administración y oficina",
  "Ingeniería y TI",
  "Belleza y cuidado personal",
  "Minería e industria",
  "Agroindustria y campo",
  "Banca y finanzas",
  "Sector público",
  "Prácticas",
  "Trabajo remoto",
];

function publishedAtTimestamp(value: string) {
  const match = value.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return 0;
  const [, day, month, year] = match;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

export default async function ConvocatoriasPage() {
  const sunatJobs = await getSunatLiveJobs();
  const detailedSlugSet = new Set(detailedPublicJobs.map((job) => job.slug));
  const privateJobsForExplorer = privateVerifiedJobs.filter(
    (job) =>
      job.slug !== "pardos-chicken-puestos-operativos-2026" &&
      !detailedSlugSet.has(job.slug),
  );
  const jobsForExplorer = [...privateJobsForExplorer, ...sunatJobs, ...detailedPublicJobs].sort(
    (a, b) =>
      publishedAtTimestamp(b.verifiedAt) - publishedAtTimestamp(a.verifiedAt) ||
      publishedAtTimestamp(b.publishedAt) - publishedAtTimestamp(a.publishedAt),
  );
  const detailSlugs = jobsForExplorer.map((job) => job.slug);

  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <section className="overflow-hidden border-b border-[#dbe5f1] bg-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-7 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:px-6 lg:pb-12 lg:pt-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-4 py-2 text-sm font-black text-[#0b58b6]">
              <ShieldCheck size={18} /> Empleos con fuente comprobable
            </div>
            <h1 className="mt-5 max-w-3xl text-[2.55rem] font-black leading-[1.04] tracking-[-.035em] text-[#0a2d5a] sm:text-5xl lg:text-[3.35rem]">
              Ofertas laborales en Perú <span className="text-[#e6aa16]">por rubro y región</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#52647a] sm:text-lg lg:text-[1.05rem] lg:leading-7">
              Cajeros, ventas, restaurantes, pollerías, limpieza, almacén, seguridad, hoteles, fábricas, técnicos, profesionales, prácticas y empleo público en todo el Perú. Solo mostramos ofertas que puedan rastrearse a una fuente real.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#listado" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0866d8] px-5 text-base font-black text-white transition hover:bg-[#075abc]">
                Buscar trabajo <ArrowRight size={18} />
              </a>
              <a href="/como-verificamos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#f0c24a] bg-[#fff6d9] px-5 text-base font-black text-[#775200] transition hover:bg-[#ffefb6]">
                Cómo verificamos <ShieldCheck size={18} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[430px] w-full max-w-[430px] items-end justify-center lg:justify-end">
            <div className="absolute inset-x-8 bottom-5 top-14 rounded-[42%] bg-[radial-gradient(circle,#eef5ff_0%,#fff7dc_62%,transparent_72%)]" />
            <img
              src="/romil-hero-worker.webp"
              alt="Trabajador con casco y chaleco de seguridad"
              className="relative z-10 h-auto w-full max-w-[390px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-4 py-8 sm:px-6 lg:px-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[22px] border border-[#f0d481] bg-[#fff8e4] p-5">
            <Landmark size={28} className="text-[#b77d00]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Sector público</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">SUNAT y convocatorias institucionales con bases y fuente oficial.</p>
          </div>
          <div className="rounded-[22px] border border-[#dbe5f1] bg-[#f5f9ff] p-5">
            <Wrench size={28} className="text-[#0866d8]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Operativos y servicios</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">Limpieza, almacén, seguridad, producción, construcción, transporte y mantenimiento.</p>
          </div>
          <div className="rounded-[22px] border border-[#dbe5f1] bg-[#f5f9ff] p-5">
            <GraduationCap size={28} className="text-[#0866d8]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Atención y servicios</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">Cajeros, ventas, restaurantes, pollerías, hoteles, turismo y atención al cliente.</p>
          </div>
          <div className="rounded-[22px] border border-[#dbe5f1] bg-[#f5f9ff] p-5">
            <Cpu size={28} className="text-[#0866d8]" />
            <p className="mt-3 text-xl font-black text-[#0a2d5a]">Técnicos y profesionales</p>
            <p className="mt-2 text-base font-medium leading-6 text-[#657489]">Administración, salud, educación, ingeniería, TI, legal, finanzas y prácticas.</p>
          </div>
        </div>
      </section>

      <nav aria-label="Buscar trabajo por ubicación y sector" className="mx-auto flex w-full max-w-[1180px] flex-wrap gap-3 px-4 py-5 text-sm font-bold text-[#0866d8] sm:px-6">
        <a className="rounded-xl border border-[#dbe5f1] bg-[#f5f9ff] px-4 py-3 hover:underline" href="/trabajos/lima">Ofertas laborales en Lima</a>
        <a className="rounded-xl border border-[#dbe5f1] bg-[#f5f9ff] px-4 py-3 hover:underline" href="/trabajos/mineria">Trabajos en minería en Perú</a>
      </nav>

      <div id="listado" className="mx-auto w-full max-w-[1180px] px-4 pb-12 sm:px-6 lg:px-6">
        <StateJobsExplorer jobs={jobsForExplorer} detailSlugs={detailSlugs} />
      </div>

      <section className="mx-auto w-full max-w-[1180px] px-4 pb-12 sm:px-6 lg:px-6">
        <div className="rounded-[26px] border border-[#dbe5f1] bg-[#f8fbff] p-5 sm:p-6">
          <p className="text-sm font-black uppercase tracking-[.08em] text-[#0b58b6]">Rubros que cubre RomilPlus</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-3xl">Desde trabajos sin experiencia hasta puestos profesionales</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {employmentSectors.map((sector) => (
              <span key={sector} className="rounded-full border border-[#d7e4f2] bg-white px-3.5 py-2 text-sm font-black text-[#38546f] shadow-[0_2px_8px_rgba(10,45,90,.03)]">
                {sector}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold leading-6 text-[#657489]">
            Que un rubro aparezca aquí no significa que inventemos una oferta. Una vacante solo entra al listado cuando encontramos una fuente trazable, comprobamos los datos básicos y sigue vigente.
          </p>
        </div>
      </section>
    </main>
  );
}
