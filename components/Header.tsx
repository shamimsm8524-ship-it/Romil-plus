"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <svg
      viewBox="0 0 68 48"
      className="h-12 w-[68px] shrink-0"
      role="img"
      aria-label="ROMIL PLUS"
    >
      <defs>
        <linearGradient id="romil-rp-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="42%" stopColor="#3b82f6" />
          <stop offset="72%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>

      <path
        fill="url(#romil-rp-gradient)"
        d="M4 44 12 4h20c11.5 0 17.8 5.6 15.7 15.2-1.5 6.8-6.3 10.8-13.2 12.1L44 44H32.8L22.5 31.7h-5L15 44H4Zm15-31-2.2 10.6h13.6c4.9 0 7.4-1.8 8.1-5.3.8-3.7-1.7-5.3-6.5-5.3H19Z"
      />
      <path
        fill="url(#romil-rp-gradient)"
        d="M31.5 44 38 12h14.7c10.6 0 16 5.1 14.1 13.7-1.8 8-7.6 12.1-17.6 12.1h-7.4L40.5 44h-9Zm12.2-23.7-1.9 9.5h8.1c4.7 0 7.4-1.6 8.1-4.8.7-3.1-1.5-4.7-6.2-4.7h-8.1Z"
      />
    </svg>
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
