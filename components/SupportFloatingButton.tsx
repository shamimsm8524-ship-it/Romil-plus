"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
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
      className="fixed bottom-6 right-5 z-[80] grid h-[78px] w-[78px] place-items-center rounded-full border border-[#e3b64f]/80 bg-[#050505] text-white shadow-[0_0_0_5px_rgba(227,182,79,.08),0_0_28px_rgba(227,182,79,.55),0_14px_35px_rgba(0,0,0,.65)] transition duration-200 hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8 sm:h-[86px] sm:w-[86px]"
    >
      <span className="absolute inset-[7px] rounded-full border border-white/5 bg-gradient-to-br from-white/[0.07] to-transparent"/>
      <MessageCircle size={38} strokeWidth={2.35} className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,.2)] sm:h-[42px] sm:w-[42px]"/>
      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#f0c65b] shadow-[0_0_12px_rgba(240,198,91,.8)]"/>
    </Link>
  );
}
