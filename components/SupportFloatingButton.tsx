"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";

export function SupportFloatingButton(){
  const pathname=usePathname();
  const isHome=pathname==="/";
  const isAdmin=pathname==="/admin";
  if(!isHome&&!isAdmin)return null;
  const href=isAdmin?"/admin/soporte":"/soporte";
  const label=isAdmin?"Abrir mensajes de soporte":"Abrir chat de atención al cliente";
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-4 z-[80] grid h-[82px] w-[82px] place-items-center rounded-full border border-[#e3b64f]/90 bg-[#050505] text-white shadow-[0_0_0_5px_rgba(227,182,79,.08),0_0_30px_rgba(227,182,79,.58),0_14px_34px_rgba(0,0,0,.68)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7 sm:h-[90px] sm:w-[90px] md:bottom-10 md:right-10 md:h-[136px] md:w-[136px] lg:bottom-12 lg:right-12 lg:h-[156px] lg:w-[156px] xl:h-[168px] xl:w-[168px]"
    >
      <span className="absolute inset-[7px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.08] to-transparent sm:inset-[8px] md:inset-[10px] lg:inset-[11px]"/>
      <MessageCircleMore size={44} strokeWidth={2.25} className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,.24)] sm:h-[48px] sm:w-[48px] md:h-[74px] md:w-[74px] lg:h-[86px] lg:w-[86px] xl:h-[92px] xl:w-[92px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-[#f0c65b] shadow-[0_0_14px_rgba(240,198,91,.9)] sm:h-4 sm:w-4 md:h-[20px] md:w-[20px] lg:h-[22px] lg:w-[22px]"/>
    </Link>
  );
}
