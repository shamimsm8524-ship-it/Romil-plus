"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <div className="relative h-[62px] w-[105px] shrink-0" aria-label="RP">
      <span className="absolute left-0 top-0 text-[68px] font-black italic leading-[.9] tracking-[-.14em] text-transparent bg-gradient-to-b from-[#ffe58a] via-[#e0ae3f] to-[#9b6417] bg-clip-text">R</span>
      <span className="absolute left-[43px] top-[2px] text-[62px] font-black italic leading-[.9] tracking-[-.12em] text-transparent bg-gradient-to-b from-[#ffe58a] via-[#d7a438] to-[#936016] bg-clip-text">P</span>
    </div>
  );
}

export function Header() {
  const { items } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-[#d4a63b]/20 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-5">
          <RomilLogo />
          <span className="whitespace-nowrap text-[15px] font-extrabold tracking-[.06em] text-white sm:text-xl">ROMIL PLUS</span>
        </Link>
        <nav className="hidden gap-7 text-sm text-[#bbb4a7] md:flex">
          <Link href="/catalogo">Catálogo</Link><Link href="/mis-compras">Mis compras</Link><Link href="/admin">Admin</Link>
        </nav>
        <div className="ml-2 flex gap-3">
          <Link href="/login" className="grid h-[54px] w-[54px] place-items-center rounded-[17px] border border-[#c99a32]/30 text-white" aria-label="Cuenta"><User size={24} strokeWidth={1.8}/></Link>
          <Link href="/carrito" className="relative grid h-[54px] w-[54px] place-items-center rounded-[17px] border border-[#c99a32]/30 text-white" aria-label="Carrito"><ShoppingCart size={24} strokeWidth={1.8}/>{items.length > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7b257] px-1 text-[11px] font-black text-black">{items.length}</span>}</Link>
        </div>
      </div>
    </header>
  );
}
