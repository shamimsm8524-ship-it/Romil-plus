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
      className="fixed bottom-5 right-4 z-[80] grid h-[82px] w-[82px] place-items-center rounded-full border border-[#e3b64f]/90 bg-[#050505] text-white shadow-[0_0_0_5px_rgba(227,182,79,.08),0_0_30px_rgba(227,182,79,.58),0_14px_34px_rgba(0,0,0,.68)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7 sm:h-[90px] sm:w-[90px] lg:bottom-12 lg:right-12 lg:h-[200px] lg:w-[200px] xl:h-[220px] xl:w-[220px] 2xl:h-[235px] 2xl:w-[235px]"
    >
      <span className="absolute inset-[7px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.08] to-transparent sm:inset-[8px] lg:inset-[14px] xl:inset-[15px]"/>
      <MessageCircleMore size={44} strokeWidth={2.25} className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,.24)] sm:h-[48px] sm:w-[48px] lg:h-[112px] lg:w-[112px] xl:h-[124px] xl:w-[124px] 2xl:h-[132px] 2xl:w-[132px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-[#f0c65b] shadow-[0_0_14px_rgba(240,198,91,.9)] sm:h-4 sm:w-4 lg:h-[28px] lg:w-[28px] xl:h-[30px] xl:w-[30px]"/>
    </Link>
  );
}
