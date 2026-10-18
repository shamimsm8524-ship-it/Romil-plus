import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { jobGuides } from "@/lib/job-guides";

export const metadata: Metadata = {
  title: "Guías para postular a trabajos en Perú",
  description: "Guías prácticas sobre convocatorias CAS, CV para el sector público y seguridad al buscar empleo.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a2d5a]">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
        <section className="rounded-[30px] border border-[#dbe5f1] bg-[radial-gradient(circle_at_85%_15%,rgba(244,189,45,.16),transparent_30%),linear-gradient(145deg,#f7fbff,#ffffff)] p-6 shadow-[0_12px_34px_rgba(10,45,90,.06)] sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.15em] text-[#d89b09]">Aprende antes de postular</p>
            <h1 className="mt-3 text-4xl font-black text-[#0a2d5a] sm:text-5xl">Guías de empleo y convocatorias</h1>
            <p className="mt-4 text-base leading-7 text-[#52647a]">Contenido escrito por ROMIL PLUS para ayudarte a interpretar procesos, preparar documentos y evitar errores frecuentes al buscar trabajo.</p>
          </div>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {jobGuides.map((guide) => (
            <Link key={guide.slug} href={`/guias/${guide.slug}`} className="group rounded-[24px] border border-[#dbe5f1] bg-white p-5 shadow-[0_8px_26px_rgba(10,45,90,.05)] transition hover:-translate-y-1 hover:border-[#97bce8] hover:bg-[#f8fbff]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef5ff] text-[#0758ad]"><BookOpen size={22} /></span>
              <p className="mt-4 text-[10px] font-black uppercase tracking-[.12em] text-[#7a899b]">Lectura · {guide.readTime}</p>
              <h2 className="mt-2 text-xl font-black leading-tight text-[#102f57]">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5a6b7e]">{guide.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0866d8]">Leer guía <ArrowRight size={15}/></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
