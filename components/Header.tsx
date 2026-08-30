"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <div className="relative flex h-12 w-[82px] shrink-0 items-center" aria-label="ROMIL PLUS">
      <span className="select-none text-[50px] font-black italic leading-none tracking-[-0.14em] text-transparent bg-gradient-to-br from-[#fff3bd] via-[#e1b951] to-[#9d6b18] bg-clip-text drop-shadow-[0_0_14px_rgba(215,178,87,.12)]">
        R
      </span>
      <span className="-ml-[13px] select-none text-[50px] font-black italic leading-none tracking-[-0.16em] text-transparent bg-gradient-to-br from-[#ffe9a4] via-[#d7a83b] to-[#8e6015] bg-clip-text drop-shadow-[0_0_14px_rgba(215,178,87,.12)]">
        P
      </span>
    </div>
  );
}

export function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#c89b3c]/20 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
          <RomilLogo />
          <span className="hidden h-10 w-px bg-[#c89b3c]/35 xs:block sm:block" />
          <span className="whitespace-nowrap text-[15px] font-extrabold tracking-[0.12em] text-[#f8f6ef] sm:text-xl">
            ROMIL <span className="text-[#dfb957]">PLUS</span>
          </span>
        </Link>

        <nav className="hidden gap-7 text-sm text-[#bbb4a7] md:flex">
          <Link href="/catalogo" className="transition hover:text-[#e3bd61]">Catálogo</Link>
          <Link href="/mis-compras" className="transition hover:text-[#e3bd61]">Mis compras</Link>
          <Link href="/admin" className="transition hover:text-[#e3bd61]">Admin</Link>
        </nav>

        <div className="ml-3 flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="rounded-[18px] border border-[#c89b3c]/30 bg-white/[0.01] p-3 text-[#f7f4ed] transition hover:border-[#c89b3c]/60 hover:bg-[#c89b3c]/10" aria-label="Cuenta">
            <User size={21} strokeWidth={1.9} />
          </Link>
          <Link href="/carrito" className="relative rounded-[18px] border border-[#c89b3c]/30 bg-white/[0.01] p-3 text-[#f7f4ed] transition hover:border-[#c89b3c]/60 hover:bg-[#c89b3c]/10" aria-label="Carrito">
            <ShoppingCart size={21} strokeWidth={1.9} />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7b257] px-1 text-[11px] font-black text-black">{items.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
