"use client";

import Link from "next/link";
import { BookOpen, FileText, GraduationCap, Menu, Search, ShieldCheck, User } from "lucide-react";
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

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const navClass = (href: string) => {
    const active = isActive(href);
    return `rounded-xl px-3 py-2 text-sm font-black transition ${
      active
        ? "bg-[#fff2c8] text-[#8a6100] ring-1 ring-[#f0c24a]"
        : "text-[#3d5877] hover:bg-[#eef5ff] hover:text-[#0758ad]"
    }`;
  };

  const mobileNavClass = (href: string) => {
    const active = isActive(href);
    return `block rounded-xl px-4 py-3 text-base font-black transition ${
      active
        ? "bg-[#fff2c8] text-[#0a2d5a] ring-1 ring-inset ring-[#f0c24a]"
        : "text-[#17365d] hover:bg-[#eef5ff]"
    }`;
  };

  return (
    <header className="cv-no-print sticky top-0 z-50 border-b border-[#dbe5f1] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ROMIL PLUS">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef5ff] text-[#0758ad]">
            <GraduationCap size={27} strokeWidth={2.5} />
          </span>
          <span className="min-w-0">
            <span className="block whitespace-nowrap text-xl font-black tracking-[-.02em] text-[#0a2d5a] sm:text-2xl">ROMIL <span className="text-[#e6aa16]">PLUS</span></span>
            <span className="block whitespace-nowrap text-[10px] font-black uppercase tracking-[.15em] text-[#6d7f92] sm:text-xs">Trabajos · Becas · Guías</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link href="/convocatorias" className={navClass("/convocatorias")}><Search size={15} className="mr-1 inline"/> Convocatorias</Link>
          <Link href="/becas" className={navClass("/becas")}><GraduationCap size={15} className="mr-1 inline"/> Becas</Link>
          <Link href="/guias" className={navClass("/guias")}><BookOpen size={15} className="mr-1 inline"/> Guías</Link>
          <Link href="/crear-cv" className={navClass("/crear-cv")}><FileText size={15} className="mr-1 inline"/> Crear CV</Link>
          <Link href="/como-verificamos" className={navClass("/como-verificamos")}><ShieldCheck size={15} className="mr-1 inline"/> Cómo verificamos</Link>
          <Link href={accountHref} className={navClass(accountHref)}><User size={15} className="mr-1 inline"/> Cuenta</Link>
        </nav>

        <div ref={mobileMenuRef} className="relative lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen((value) => !value)} className="grid h-12 w-12 place-items-center rounded-2xl border border-[#dbe5f1] bg-white text-[#0a2d5a]" aria-label="Abrir menú" aria-expanded={mobileMenuOpen}>
            <Menu size={26}/>
          </button>
          {mobileMenuOpen && <div className="absolute right-0 top-[58px] z-[70] w-[min(86vw,330px)] rounded-2xl border border-[#dbe5f1] bg-white p-2 shadow-[0_18px_45px_rgba(10,45,90,.18)]">
            <Link href="/convocatorias" className={mobileNavClass("/convocatorias")}>Convocatorias</Link>
            <Link href="/becas" className={mobileNavClass("/becas")}>Becas</Link>
            <Link href="/guias" className={mobileNavClass("/guias")}>Guías</Link>
            <Link href="/crear-cv" className={mobileNavClass("/crear-cv")}>Crear CV</Link>
            <Link href="/como-verificamos" className={mobileNavClass("/como-verificamos")}>Cómo verificamos</Link>
            <Link href={accountHref} className={mobileNavClass(accountHref)}>Cuenta</Link>
          </div>}
        </div>
      </div>
    </header>
  );
}
