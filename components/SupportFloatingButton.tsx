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
      className="fixed bottom-4 right-3 z-[80] grid h-[64px] w-[64px] place-items-center rounded-full border border-[#e3b64f]/85 bg-[#050505] text-white shadow-[0_0_0_4px_rgba(227,182,79,.07),0_0_22px_rgba(227,182,79,.34),0_10px_24px_rgba(0,0,0,.58)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-5 sm:right-5 sm:h-[66px] sm:w-[66px] md:h-[56px] md:w-[56px] lg:bottom-5 lg:right-5 lg:h-[74px] lg:w-[74px] lg:shadow-[0_0_0_5px_rgba(227,182,79,.08),0_0_28px_rgba(227,182,79,.42),0_12px_30px_rgba(0,0,0,.62)] xl:h-[78px] xl:w-[78px]"
    >
      <span className="absolute inset-[6px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.08] to-transparent lg:inset-[7px] lg:from-white/[0.09]"/>
      <MessageCircleMore size={32} strokeWidth={2.2} className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,.2)] sm:h-[34px] sm:w-[34px] md:h-[30px] md:w-[30px] lg:h-[40px] lg:w-[40px] lg:drop-shadow-[0_0_9px_rgba(255,255,255,.24)] xl:h-[42px] xl:w-[42px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#f0c65b] shadow-[0_0_10px_rgba(240,198,91,.85)] lg:h-3.5 lg:w-3.5 lg:shadow-[0_0_12px_rgba(240,198,91,.9)]"/>
    </Link>
  );
}
