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
      className="fixed bottom-4 right-3 z-[80] grid h-[82px] w-[82px] place-items-center rounded-full border border-[#e3b64f]/90 bg-[#050505] text-white shadow-[0_0_0_5px_rgba(227,182,79,.08),0_0_28px_rgba(227,182,79,.42),0_12px_30px_rgba(0,0,0,.62)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-5 sm:right-5 sm:h-[86px] sm:w-[86px] md:h-[70px] md:w-[70px] lg:bottom-5 lg:right-5 lg:h-[74px] lg:w-[74px] xl:h-[78px] xl:w-[78px]"
    >
      <span className="absolute inset-[7px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.09] to-transparent"/>
      <MessageCircleMore size={44} strokeWidth={2.3} className="relative z-10 drop-shadow-[0_0_9px_rgba(255,255,255,.24)] sm:h-[46px] sm:w-[46px] md:h-[38px] md:w-[38px] lg:h-[40px] lg:w-[40px] xl:h-[42px] xl:w-[42px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-[#f0c65b] shadow-[0_0_12px_rgba(240,198,91,.9)]"/>
    </Link>
  );
}
