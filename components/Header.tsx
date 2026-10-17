"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Search, ShieldCheck, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "milagroslove.1693@gmail.com";

export function Header() {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (!supabase) { setCheckingSession(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
      setCheckingSession(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      setCheckingSession(false);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const isAdmin = (email || "").toLowerCase() === ADMIN_EMAIL;

  const navClass = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
    return `rounded-xl px-3 py-2 text-sm font-semibold transition ${active ? "bg-[#e5b94f]/12 text-[#efcb70] ring-1 ring-[#e5b94f]/35" : "text-white/62 hover:bg-white/[0.05] hover:text-white"}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/93 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-3 px-3 py-2 sm:px-5 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label="ROMIL PLUS">
          <img src="/logo-romil-plus.png" alt="ROMIL PLUS" className="h-14 w-16 object-contain sm:h-16 sm:w-20" />
          <span className="hidden border-l border-white/10 pl-3 min-[430px]:block">
            <span className="block text-sm font-black tracking-wide text-white">ROMIL <span className="text-[#e5b94f]">PLUS</span></span>
            <span className="block text-[9px] font-bold uppercase tracking-[.16em] text-white/35">Trabajo y becas</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 min-[820px]:flex lg:gap-2">
          <Link href="/" className={navClass("/")}>Inicio</Link>
          <Link href="/convocatorias" className={navClass("/convocatorias")}><span className="inline-flex items-center gap-1.5"><Search size={15}/> Convocatorias</span></Link>
          <Link href="/becas" className={navClass("/becas")}><span className="inline-flex items-center gap-1.5"><GraduationCap size={15}/> Becas</span></Link>
          <Link href="/guias" className={navClass("/guias")}><span className="inline-flex items-center gap-1.5"><BookOpen size={15}/> Guías</span></Link>
          <Link href="/como-verificamos" className={navClass("/como-verificamos")}><span className="inline-flex items-center gap-1.5"><ShieldCheck size={15}/> Cómo verificamos</span></Link>
          <Link href="/nosotros" className={navClass("/nosotros")}>Nosotros</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/convocatorias" className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white transition hover:border-[#e5b94f]/50 hover:text-[#e5b94f] min-[820px]:hidden" aria-label="Buscar convocatorias"><Search size={19}/></Link>
          <Link href="/becas" className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white transition hover:border-[#e5b94f]/50 hover:text-[#e5b94f] min-[820px]:hidden" aria-label="Ver becas"><GraduationCap size={19}/></Link>
          {!checkingSession && email ? (
            <Link href={isAdmin ? "/admin" : "/perfil"} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white transition hover:border-[#e5b94f]/50 hover:text-[#e5b94f]" aria-label="Mi cuenta"><User size={19}/></Link>
          ) : (
            <Link href="/login" className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white transition hover:border-[#e5b94f]/50 hover:text-[#e5b94f]" aria-label="Iniciar sesión"><User size={19}/></Link>
          )}
        </div>
      </div>
    </header>
  );
}
