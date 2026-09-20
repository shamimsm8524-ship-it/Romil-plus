"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";

export function SupportFloatingButton(){
  const pathname=usePathname();
  const isHome=pathname==="/";
  const isCatalog=pathname==="/catalogo";
  const isAdmin=pathname==="/admin";
  if(!isHome&&!isCatalog&&!isAdmin)return null;
  const href=isAdmin?"/admin/soporte":"/soporte";
  const label=isAdmin?"Abrir mensajes de soporte":"Abrir chat de atención al cliente";
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="fixed bottom-4 right-3 z-[80] grid h-[56px] w-[56px] place-items-center rounded-full border border-[#e3b64f]/80 bg-[#050505] text-white shadow-[0_0_0_3px_rgba(227,182,79,.06),0_0_16px_rgba(227,182,79,.26),0_8px_20px_rgba(0,0,0,.52)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-5 sm:right-5 sm:h-[58px] sm:w-[58px] min-[760px]:h-[60px] min-[760px]:w-[60px] min-[1024px]:bottom-5 min-[1024px]:right-5 min-[1024px]:h-[60px] min-[1024px]:w-[60px] min-[1500px]:h-[66px] min-[1500px]:w-[66px]"
    >
      <span className="absolute inset-[6px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.08] to-transparent"/>
      <MessageCircleMore size={27} strokeWidth={2.2} className="relative z-10 drop-shadow-[0_0_7px_rgba(255,255,255,.18)] sm:h-[28px] sm:w-[28px] min-[760px]:h-[29px] min-[760px]:w-[29px] min-[1500px]:h-[32px] min-[1500px]:w-[32px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#f0c65b] shadow-[0_0_8px_rgba(240,198,91,.8)] min-[1500px]:h-3 min-[1500px]:w-3"/>
    </Link>
  );
}
