"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

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
  const { items } = useCart();
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#8f6927]/35 bg-[#020202]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-5">
          <RomilLogo />
          <span className="h-9 w-px bg-[#b78b37]/45" />
          <span className="whitespace-nowrap text-[14px] font-extrabold tracking-[.08em] text-white sm:text-lg">ROMIL <span className="text-[#e1b04a]">PLUS</span></span>
        </Link>
        <nav className="hidden gap-7 text-sm text-[#bbb4a7] md:flex"><Link href="/catalogo">Catálogo</Link><Link href="/mis-compras">Mis compras</Link><Link href="/admin">Admin</Link></nav>
        <div className="ml-2 flex gap-2 sm:gap-3">
          <Link href="/login" className="grid h-12 w-12 place-items-center rounded-xl border border-[#d5a536]/55 text-white sm:h-14 sm:w-14 sm:rounded-2xl" aria-label="Cuenta"><User size={21} strokeWidth={1.8}/></Link>
          <Link href="/carrito" className="relative grid h-12 w-12 place-items-center rounded-xl border border-[#d5a536]/55 text-white sm:h-14 sm:w-14 sm:rounded-2xl" aria-label="Carrito"><ShoppingCart size={21} strokeWidth={1.8}/>{items.length > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7b257] px-1 text-[11px] font-black text-black">{items.length}</span>}</Link>
        </div>
      </div>
    </header>
  );
}
