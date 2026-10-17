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
    <main className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 lg:px-6">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">Aprende antes de postular</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Guías de empleo y convocatorias</h1>
        <p className="mt-4 text-base leading-7 text-white/60">Contenido escrito por ROMIL PLUS para ayudarte a interpretar procesos, preparar documentos y evitar errores frecuentes al buscar trabajo.</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {jobGuides.map((guide) => (
          <Link key={guide.slug} href={`/guias/${guide.slug}`} className="group rounded-[24px] border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#e5b94f]/30">
            <BookOpen size={22} className="text-[#e5b94f]" />
            <p className="mt-4 text-[10px] font-black uppercase tracking-[.12em] text-white/35">Lectura · {guide.readTime}</p>
            <h2 className="mt-2 text-xl font-black leading-tight text-white">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/52">{guide.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#e5b94f]">Leer guía <ArrowRight size={15}/></span>
          </Link>
        ))}
      </div>
    </main>
  );
}
