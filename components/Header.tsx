"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <div className="flex h-12 w-[72px] shrink-0 items-center" aria-label="ROMIL PLUS">
      <span className="text-[42px] font-black italic leading-none tracking-[-0.18em] text-transparent bg-gradient-to-br from-[#fff0ae] via-[#ddb54f] to-[#a8731f] bg-clip-text">R</span>
      <span className="-ml-[7px] text-[42px] font-black italic leading-none tracking-[-0.18em] text-transparent bg-gradient-to-br from-[#f7dc82] via-[#cf9e35] to-[#8f6018] bg-clip-text">P</span>
    </div>
  );
}

export function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d1a642]/20 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-4">
          <RomilLogo />
          <span className="hidden h-9 w-px bg-[#d1a642]/40 sm:block" />
          <span className="whitespace-nowrap text-[14px] font-extrabold tracking-[0.11em] text-white sm:text-xl">ROMIL <span className="text-[#e2b957]">PLUS</span></span>
        </Link>

        <nav className="hidden gap-7 text-sm text-[#bbb4a7] md:flex">
          <Link href="/catalogo" className="transition hover:text-[#e5c56d]">Catálogo</Link>
          <Link href="/mis-compras" className="transition hover:text-[#e5c56d]">Mis compras</Link>
          <Link href="/admin" className="transition hover:text-[#e5c56d]">Admin</Link>
        </nav>

        <div className="ml-2 flex items-center gap-2">
          <Link href="/login" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d1a642]/30 text-white" aria-label="Cuenta"><User size={21} strokeWidth={1.8} /></Link>
          <Link href="/carrito" className="relative grid h-12 w-12 place-items-center rounded-2xl border border-[#d1a642]/30 text-white" aria-label="Carrito">
            <ShoppingCart size={21} strokeWidth={1.8} />
            {items.length > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7b257] px-1 text-[11px] font-black text-black">{items.length}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
