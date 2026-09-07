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
      className="fixed bottom-4 right-3 z-[80] grid h-[64px] w-[64px] place-items-center rounded-full border border-[#e3b64f]/85 bg-[#050505] text-white shadow-[0_0_0_4px_rgba(227,182,79,.07),0_0_22px_rgba(227,182,79,.34),0_10px_24px_rgba(0,0,0,.58)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-5 sm:right-5 sm:h-[66px] sm:w-[66px] min-[760px]:bottom-7 min-[760px]:right-7 min-[760px]:h-[128px] min-[760px]:w-[128px] min-[760px]:shadow-[0_0_0_7px_rgba(227,182,79,.10),0_0_42px_rgba(227,182,79,.52),0_18px_38px_rgba(0,0,0,.68)] xl:h-[148px] xl:w-[148px]"
    >
      <span className="absolute inset-[6px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.08] to-transparent min-[760px]:inset-[10px] min-[760px]:from-white/[0.10]"/>
      <MessageCircleMore size={32} strokeWidth={2.2} className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,.2)] sm:h-[34px] sm:w-[34px] min-[760px]:h-[72px] min-[760px]:w-[72px] min-[760px]:drop-shadow-[0_0_13px_rgba(255,255,255,.3)] xl:h-[84px] xl:w-[84px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#f0c65b] shadow-[0_0_10px_rgba(240,198,91,.85)] min-[760px]:h-5 min-[760px]:w-5 min-[760px]:shadow-[0_0_16px_rgba(240,198,91,.95)]"/>
    </Link>
  );
}
