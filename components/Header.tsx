"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <span className="relative inline-flex h-12 w-[66px] shrink-0 items-center" aria-label="ROMIL PLUS">
      <span className="absolute left-0 top-[1px] text-[48px] font-black italic leading-none tracking-[-0.12em] text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 via-blue-500 to-violet-600">R</span>
      <span className="absolute left-[32px] top-[8px] text-[34px] font-black italic leading-none tracking-[-0.12em] text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">P</span>
    </span>
  );
}

export function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050913]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
          <RomilLogo />
          <span className="text-lg text-white sm:text-xl">ROMIL PLUS</span>
        </Link>

        <nav className="hidden gap-6 text-sm text-white/70 md:flex">
          <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
          <Link href="/mis-compras" className="hover:text-white">Mis compras</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-2xl border border-white/10 p-3 hover:bg-white/5" aria-label="Cuenta">
            <User size={22} />
          </Link>
          <Link href="/carrito" className="relative rounded-2xl border border-white/10 p-3 hover:bg-white/5" aria-label="Carrito">
            <ShoppingCart size={22} />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-fuchsia-500 px-1 text-[11px] font-bold">{items.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
