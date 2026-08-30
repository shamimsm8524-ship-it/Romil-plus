"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <svg
      viewBox="0 0 78 56"
      className="h-12 w-[67px] shrink-0 sm:h-14 sm:w-[78px]"
      role="img"
      aria-label="ROMIL PLUS"
    >
      <defs>
        <linearGradient id="romil-rp-gradient" x1="0" y1="0" x2="1" y2="0.9">
          <stop offset="0%" stopColor="#11c5ff" />
          <stop offset="38%" stopColor="#2563eb" />
          <stop offset="68%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>

      {/* Monograma RP compacto: ambas letras comparten el centro para verse como una sola marca. */}
      <path
        fill="url(#romil-rp-gradient)"
        fillRule="evenodd"
        d="M10 4h31.5C54 4 60.7 10.1 58.6 20.3c-1.2 5.8-4.6 9.8-9.8 12.1L59.5 52H45.2L34.7 34.8H24.1L20.5 52H4L14.2 4H10Zm17 10.7-2.1 10h13.4c3.9 0 6.3-1.8 7-5.1.7-3.3-1.2-4.9-5.3-4.9H27Z"
      />
      <path
        fill="url(#romil-rp-gradient)"
        fillRule="evenodd"
        d="M42.2 4H60c11.2 0 17 6.3 14.8 16.8-2.3 10.9-10.2 16.5-23 16.5h-8.1L40.6 52H27.2L37.4 4h4.8Zm7.1 10.7-2.5 11.8h7.7c4.6 0 7.3-2 8.1-5.9.8-3.9-1.1-5.9-5.8-5.9h-7.5Z"
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
