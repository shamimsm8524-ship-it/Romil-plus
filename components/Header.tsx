"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";

function RomilLogo() {
  return (
    <svg
      viewBox="0 0 104 64"
      className="h-12 w-[78px] shrink-0 sm:h-14 sm:w-[91px]"
      role="img"
      aria-label="ROMIL PLUS"
    >
      <defs>
        <linearGradient id="romil-gold-premium" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF2B8" />
          <stop offset="24%" stopColor="#F2D57A" />
          <stop offset="52%" stopColor="#D6A842" />
          <stop offset="76%" stopColor="#F1CF6E" />
          <stop offset="100%" stopColor="#A8751F" />
        </linearGradient>
        <linearGradient id="romil-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF8D7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF8D7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        fill="url(#romil-gold-premium)"
        d="M12 8h35c13.7 0 21.1 6.2 18.6 17.2-1.2 5.4-4.8 9.9-10.3 12.7L67.7 56H51.4L40.5 40.4H28.1L24.8 56H8.3L18.6 8H12Zm18 12-2.3 10.8h16.1c4.7 0 7.3-1.7 8.1-5.3.8-3.6-1.1-5.5-5.9-5.5H30Z"
      />
      <path
        fill="url(#romil-gold-premium)"
        d="M54.2 8h21.1C91 8 98.2 15.3 95.4 27.6 92.7 39.7 83 46 67.1 46H58l-2.1 10H39.8L50.1 8h4.1Zm8.1 12-3.2 14.1h10c7 0 10.7-2.2 11.9-7.2 1.1-4.8-1.7-6.9-8.8-6.9h-9.9Z"
      />
      <path fill="url(#romil-shine)" d="M20 8h30l-2 5H19z" opacity="0.7" />
      <path fill="#080808" d="M49.8 38.5 60 56H49.8L39.3 40.4Z" opacity="0.45" />
    </svg>
  );
}

export function Header() {
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d7b257]/20 bg-[#050505]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:py-5">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight sm:gap-4">
          <RomilLogo />
          <span className="hidden h-10 w-px bg-[#d7b257]/35 sm:block" />
          <span className="text-base font-extrabold tracking-[0.12em] text-[#f8f5ee] sm:text-xl">
            ROMIL <span className="text-[#e2bd5f]">PLUS</span>
          </span>
        </Link>

        <nav className="hidden gap-7 text-sm text-[#c9c2b4] md:flex">
          <Link href="/catalogo" className="transition hover:text-[#e5c56d]">Catálogo</Link>
          <Link href="/mis-compras" className="transition hover:text-[#e5c56d]">Mis compras</Link>
          <Link href="/admin" className="transition hover:text-[#e5c56d]">Admin</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="rounded-2xl border border-[#d7b257]/30 bg-white/[0.015] p-3 text-[#f7f2e8] transition hover:border-[#d7b257]/60 hover:bg-[#d7b257]/10" aria-label="Cuenta">
            <User size={21} />
          </Link>
          <Link href="/carrito" className="relative rounded-2xl border border-[#d7b257]/30 bg-white/[0.015] p-3 text-[#f7f2e8] transition hover:border-[#d7b257]/60 hover:bg-[#d7b257]/10" aria-label="Carrito">
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
