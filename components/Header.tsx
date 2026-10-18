"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Menu, Search, ShieldCheck, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "milagroslove.1693@gmail.com";

export function Header() {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsidePress = (event: PointerEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    return () => document.removeEventListener("pointerdown", handleOutsidePress);
  }, [mobileMenuOpen]);

  const isAdmin = (email || "").toLowerCase() === ADMIN_EMAIL;
  const accountHref = !checkingSession && email ? (isAdmin ? "/admin" : "/perfil") : "/login";

  const navClass = (href: string) => {
    const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
    return `rounded-xl px-3 py-2 text-sm font-black transition ${
      active
        ? "bg-[#fff2c8] text-[#8a6100] ring-1 ring-[#f0c24a]"
        : "text-[#3d5877] hover:bg-[#eef5ff] hover:text-[#0758ad]"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#dbe5f1] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ROMIL PLUS">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef5ff] text-[#0758ad]">
            <GraduationCap size={27} strokeWidth={2.5} />
          </span>
          <span className="min-w-0">
            <span className="block whitespace-nowrap text-xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-2xl">ROMIL <span className="text-[#e6aa16]">PLUS</span></span>
            <span className="block text-[10px] font-black uppercase tracking-[.17em] text-[#687b91] sm:text-[11px]">Trabajos · Becas · Guías</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 min-[820px]:flex lg:gap-2">
          <Link href="/" className={navClass("/")}>Inicio</Link>
          <Link href="/convocatorias" className={navClass("/convocatorias")}><span className="inline-flex items-center gap-1.5"><Search size={16}/> Trabajos</span></Link>
          <Link href="/becas" className={navClass("/becas")}><span className="inline-flex items-center gap-1.5"><GraduationCap size={16}/> Becas</span></Link>
          <Link href="/guias" className={navClass("/guias")}><span className="inline-flex items-center gap-1.5"><BookOpen size={16}/> Guías</span></Link>
          <Link href="/como-verificamos" className={navClass("/como-verificamos")}><span className="inline-flex items-center gap-1.5"><ShieldCheck size={16}/> Verificación</span></Link>
        </nav>

        <div className="hidden items-center gap-2 min-[820px]:flex">
          <Link href={accountHref} className="grid h-11 w-11 place-items-center rounded-xl border border-[#d7e2ef] text-[#17365d] transition hover:border-[#8bb6e8] hover:bg-[#eef5ff] hover:text-[#0758ad]" aria-label={email ? "Mi cuenta" : "Iniciar sesión"}>
            <User size={20}/>
          </Link>
        </div>

        <div ref={mobileMenuRef} className="relative min-[820px]:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#d7e2ef] text-[#0a2d5a]"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={25} />
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 top-14 w-[250px] rounded-[20px] border border-[#dbe5f1] bg-white p-2 shadow-[0_18px_45px_rgba(10,45,90,.16)]">
              <Link onClick={() => setMobileMenuOpen(false)} href="/" className="block rounded-xl px-4 py-3 text-base font-black text-[#17365d] hover:bg-[#eef5ff]">Inicio</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/convocatorias" className="block rounded-xl px-4 py-3 text-base font-black text-[#17365d] hover:bg-[#eef5ff]">Trabajos</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/becas" className="block rounded-xl px-4 py-3 text-base font-black text-[#17365d] hover:bg-[#eef5ff]">Becas</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/guias" className="block rounded-xl px-4 py-3 text-base font-black text-[#17365d] hover:bg-[#eef5ff]">Guías</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="/como-verificamos" className="block rounded-xl px-4 py-3 text-base font-black text-[#17365d] hover:bg-[#eef5ff]">Cómo verificamos</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href={accountHref} className="mt-1 flex items-center gap-2 rounded-xl bg-[#0a2d5a] px-4 py-3 text-base font-black text-white"><User size={18}/> {email ? "Mi cuenta" : "Iniciar sesión"}</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
