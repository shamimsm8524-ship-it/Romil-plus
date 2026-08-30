"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

export function Header() {
  const { items } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070914]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
          <span className="relative flex h-11 w-14 items-center" aria-label="ROMIL PLUS">
            <span className="absolute left-0 text-[42px] font-black italic leading-none tracking-[-0.22em] text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600">R</span>
            <span className="absolute left-7 top-[7px] text-[27px] font-black italic leading-none tracking-[-0.18em] text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">P</span>
          </span>
          <span className="text-lg sm:text-xl">ROMIL PLUS</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-white/70 md:flex">
          <Link href="/catalogo" className="hover:text-white">Catálogo</Link>
          <Link href="/mis-compras" className="hover:text-white">Mis compras</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-xl border border-white/10 p-2.5 hover:bg-white/5" aria-label="Cuenta"><User size={19} /></Link>
          <Link href="/carrito" className="relative rounded-xl border border-white/10 p-2.5 hover:bg-white/5" aria-label="Carrito">
            <ShoppingCart size={19} />
            {items.length > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-fuchsia-500 px-1 text-[11px] font-bold">{items.length}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
