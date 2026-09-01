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
      className="fixed bottom-6 right-5 z-[80] grid h-[96px] w-[96px] place-items-center rounded-full border border-[#e3b64f]/90 bg-[#050505] text-white shadow-[0_0_0_6px_rgba(227,182,79,.08),0_0_34px_rgba(227,182,79,.62),0_16px_38px_rgba(0,0,0,.7)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 sm:h-[106px] sm:w-[106px]"
    >
      <span className="absolute inset-[8px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.08] to-transparent"/>
      <MessageCircleMore size={52} strokeWidth={2.25} className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,.24)] sm:h-[58px] sm:w-[58px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-[#f0c65b] shadow-[0_0_14px_rgba(240,198,91,.9)]"/>
    </Link>
  );
}
