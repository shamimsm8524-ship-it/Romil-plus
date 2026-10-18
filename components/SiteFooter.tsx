import Link from "next/link";
import { BookOpen, GraduationCap, Mail, Search, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#dbe5f1] bg-[#f8fafc] text-[#0a2d5a]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_.75fr_.75fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="ROMIL PLUS">
            <img src="/logo-romil-plus.png" alt="ROMIL PLUS" className="h-14 w-16 object-contain" />
            <div>
              <p className="text-base font-black tracking-wide text-[#0a2d5a]">ROMIL <span className="text-[#e6aa16]">PLUS</span></p>
              <p className="text-xs text-[#687b91]">Trabajo y becas verificadas</p>
            </div>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#5f7084]">
            Portal independiente que reúne convocatorias de trabajo y becas, las contrasta con fuentes oficiales y facilita el acceso a la publicación original. No somos una entidad pública ni intermediamos postulaciones.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[.14em] text-[#17365d]">Explora</p>
          <div className="mt-4 grid gap-2 text-sm text-[#5f7084]">
            <Link href="/convocatorias" className="inline-flex items-center gap-2 transition hover:text-[#0866d8]"><Search size={15}/> Convocatorias</Link>
            <Link href="/becas" className="inline-flex items-center gap-2 transition hover:text-[#0866d8]"><GraduationCap size={15}/> Becas</Link>
            <Link href="/guias" className="inline-flex items-center gap-2 transition hover:text-[#0866d8]"><BookOpen size={15}/> Guías</Link>
            <Link href="/como-verificamos" className="inline-flex items-center gap-2 transition hover:text-[#0866d8]"><ShieldCheck size={15}/> Cómo verificamos</Link>
            <Link href="/nosotros" className="transition hover:text-[#0866d8]">Nosotros</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[.14em] text-[#17365d]">Información</p>
          <div className="mt-4 grid gap-2 text-sm text-[#5f7084]">
            <Link href="/contacto" className="inline-flex items-center gap-2 transition hover:text-[#0866d8]"><Mail size={15}/> Contacto</Link>
            <Link href="/privacidad" className="transition hover:text-[#0866d8]">Política de privacidad</Link>
            <Link href="/terminos" className="transition hover:text-[#0866d8]">Términos de uso</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#dbe5f1] bg-white px-4 py-5 text-center text-xs leading-5 text-[#718096]">
        <p>© {new Date().getFullYear()} ROMIL PLUS. Todos los derechos reservados.</p>
        <p className="mt-1">Verifica siempre las bases y el cronograma en la fuente oficial antes de postular a un trabajo o una beca.</p>
      </div>
    </footer>
  );
}
