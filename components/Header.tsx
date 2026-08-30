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
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-lg text-white shadow-lg shadow-violet-500/25">R+</span>
          <span>ROMIL PLUS</span>
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
