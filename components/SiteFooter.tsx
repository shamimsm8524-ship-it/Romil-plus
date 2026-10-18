import Link from "next/link";
import { BookOpen, GraduationCap, Mail, Search, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/45">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_.75fr_.75fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="ROMIL PLUS">
            <img src="/logo-romil-plus.png" alt="ROMIL PLUS" className="h-14 w-16 object-contain" />
            <div>
              <p className="text-base font-black tracking-wide text-white">ROMIL <span className="text-[#e5b94f]">PLUS</span></p>
              <p className="text-xs text-white/50">Trabajo y becas verificadas</p>
            </div>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/55">
            Portal independiente que reúne convocatorias de trabajo y becas, las contrasta con fuentes oficiales y facilita el acceso a la publicación original. No somos una entidad pública ni intermediamos postulaciones.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[.14em] text-white/80">Explora</p>
          <div className="mt-4 grid gap-2 text-sm text-white/55">
            <Link href="/convocatorias" className="inline-flex items-center gap-2 transition hover:text-[#e5b94f]"><Search size={15}/> Convocatorias</Link>
            <Link href="/becas" className="inline-flex items-center gap-2 transition hover:text-[#e5b94f]"><GraduationCap size={15}/> Becas</Link>
            <Link href="/guias" className="inline-flex items-center gap-2 transition hover:text-[#e5b94f]"><BookOpen size={15}/> Guías</Link>
            <Link href="/como-verificamos" className="inline-flex items-center gap-2 transition hover:text-[#e5b94f]"><ShieldCheck size={15}/> Cómo verificamos</Link>
            <Link href="/nosotros" className="transition hover:text-[#e5b94f]">Nosotros</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[.14em] text-white/80">Información</p>
          <div className="mt-4 grid gap-2 text-sm text-white/55">
            <Link href="/contacto" className="inline-flex items-center gap-2 transition hover:text-[#e5b94f]"><Mail size={15}/> Contacto</Link>
            <Link href="/privacidad" className="transition hover:text-[#e5b94f]">Política de privacidad</Link>
            <Link href="/terminos" className="transition hover:text-[#e5b94f]">Términos de uso</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs leading-5 text-white/40">
        <p>© {new Date().getFullYear()} ROMIL PLUS. Todos los derechos reservados.</p>
        <p className="mt-1">Verifica siempre las bases y el cronograma en la fuente oficial antes de postular a un trabajo o una beca.</p>
      </div>
    </footer>
  );
}
