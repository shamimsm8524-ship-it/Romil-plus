"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <svg
      viewBox="0 0 88 58"
      className="h-11 w-[68px] shrink-0 sm:h-12 sm:w-[74px]"
      role="img"
      aria-label="ROMIL PLUS"
    >
      <defs>
        <linearGradient id="romil-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF1B8" />
          <stop offset="32%" stopColor="#E7C66A" />
          <stop offset="68%" stopColor="#C89B3C" />
          <stop offset="100%" stopColor="#F3D98B" />
        </linearGradient>
      </defs>
      <path
        fill="url(#romil-gold)"
        d="M7 7h29c13 0 20 6 18 16-1 6-5 10-11 12l10 16H39L30 37H20l-3 14H4L13 7H7Zm16 10-2 10h13c4 0 7-2 7-5 1-3-1-5-5-5H23Z"
      />
      <path
        fill="url(#romil-gold)"
        d="M40 7h19c15 0 23 7 20 20-2 12-11 18-27 18h-7l-1 6H31l9-44Zm11 10-4 18h7c7 0 11-3 12-9 1-6-2-9-9-9h-6Z"
      />
    </svg>
  );
}

export function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d7b257]/15 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
          <RomilLogo />
          <span className="text-base font-extrabold tracking-[0.08em] text-[#f7f2e8] sm:text-xl">ROMIL PLUS</span>
        </Link>

        <nav className="hidden gap-7 text-sm text-[#c9c2b4] md:flex">
          <Link href="/catalogo" className="transition hover:text-[#e5c56d]">Catálogo</Link>
          <Link href="/mis-compras" className="transition hover:text-[#e5c56d]">Mis compras</Link>
          <Link href="/admin" className="transition hover:text-[#e5c56d]">Admin</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-2xl border border-[#d7b257]/20 bg-white/[0.02] p-3 text-[#f7f2e8] transition hover:border-[#d7b257]/50 hover:bg-[#d7b257]/10" aria-label="Cuenta">
            <User size={21} />
          </Link>
          <Link href="/carrito" className="relative rounded-2xl border border-[#d7b257]/20 bg-white/[0.02] p-3 text-[#f7f2e8] transition hover:border-[#d7b257]/50 hover:bg-[#d7b257]/10" aria-label="Carrito">
            <ShoppingCart size={21} />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7b257] px-1 text-[11px] font-black text-black">{items.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
