"use client";

import Link from "next/link";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { supabase } from "@/lib/supabase";

function RomilLogo() {
  return (
    <div className="relative h-[48px] w-[66px] shrink-0" aria-label="RP">
      <span className="absolute left-0 top-0 text-[46px] font-black italic leading-none tracking-[-.14em] text-[#e8bd55]">R</span>
      <span className="absolute left-[27px] top-0 text-[46px] font-black italic leading-none tracking-[-.14em] text-[#c9932f]">P</span>
      <span className="absolute bottom-[2px] left-[5px] h-[3px] w-[52px] -skew-x-[35deg] bg-[#e0ad43]" />
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const [email, setEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false);
      return;
    }

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

  if (pathname === "/") return null;

  const hasItems = items.length > 0;

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setEmail(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#8f6927]/35 bg-[#020202]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-5">
          <RomilLogo />
          <span className="h-9 w-px bg-[#b78b37]/45" />
          <span className="whitespace-nowrap text-[14px] font-extrabold tracking-[.08em] text-white sm:text-lg">ROMIL <span className="text-[#e1b04a]">PLUS</span></span>
        </Link>
        <nav className="hidden gap-7 text-sm text-[#bbb4a7] md:flex"><Link href="/catalogo">Catálogo</Link><Link href="/mis-compras">Mis compras</Link><Link href="/admin">Admin</Link></nav>
        <div className="ml-2 flex items-center gap-2 sm:gap-3">
          {!checkingSession && email ? (
            <>
              <Link href="/mis-compras" className="hidden max-w-[230px] truncate rounded-xl border border-[#d5a536]/35 bg-[#d5a536]/10 px-3 py-2 text-xs font-bold text-[#f2d285] sm:block" title={email}>
                {email}
              </Link>
              <Link href="/mis-compras" className="grid h-12 w-12 place-items-center rounded-xl border border-[#d5a536]/55 text-[#e1b04a] sm:h-14 sm:w-14 sm:rounded-2xl" aria-label={`Cuenta: ${email}`} title={email}>
                <User size={21} strokeWidth={1.8}/>
              </Link>
              <button onClick={handleLogout} className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 text-white/75 transition hover:border-red-400/50 hover:text-red-300 sm:h-14 sm:w-14 sm:rounded-2xl" aria-label="Cerrar sesión" title="Cerrar sesión">
                <LogOut size={20} strokeWidth={1.8}/>
              </button>
            </>
          ) : (
            <Link href="/login" className="grid h-12 w-12 place-items-center rounded-xl border border-[#d5a536]/55 text-white sm:h-14 sm:w-14 sm:rounded-2xl" aria-label="Iniciar sesión"><User size={21} strokeWidth={1.8}/></Link>
          )}
          <Link
            href="/carrito"
            className={`relative grid h-12 w-12 place-items-center rounded-xl border transition-all duration-200 sm:h-14 sm:w-14 sm:rounded-2xl ${hasItems ? "border-black bg-black text-white shadow-lg shadow-black/60 scale-105" : "border-[#d5a536]/55 text-white"}`}
            aria-label="Carrito"
          >
            <ShoppingCart size={21} strokeWidth={1.8}/>
            {hasItems && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7b257] px-1 text-[11px] font-black text-black">{items.length}</span>}
          </Link>
        </div>
      </div>
      {!checkingSession && email && (
        <div className="border-t border-white/5 px-5 py-2 text-center text-[11px] font-semibold text-[#d8bd82] sm:hidden">
          Sesión: <span className="break-all text-white/75">{email}</span>
        </div>
      )}
    </header>
  );
}
