"use client";

import Link from "next/link";
import { MessageCircle, ShoppingCart, User, ReceiptText, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL="milagroslove.1693@gmail.com";

function RomilLogo() {
  return <span className="relative flex h-[58px] w-[70px] shrink-0 items-center justify-center overflow-visible min-[420px]:h-[64px] min-[420px]:w-[78px] sm:h-[72px] sm:w-[88px] min-[700px]:h-[72px] min-[700px]:w-[88px] lg:h-[78px] lg:w-[96px]"><img src="/logo-romil-plus.png" alt="Romil Plus" className="h-full w-full object-contain scale-[1.18] min-[420px]:scale-[1.22] sm:scale-[1.28] min-[700px]:scale-[1.08] lg:scale-[1.1]"/></span>;
}

function WhatsAppIcon({className="h-6 w-6"}:{className?:string}){
  return <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor"><path d="M16.02 3C8.84 3 3 8.71 3 15.72c0 2.47.73 4.87 2.12 6.92L3 29l6.55-2.06a13.13 13.13 0 0 0 6.46 1.69h.01C23.2 28.63 29 22.92 29 15.9 29 8.87 23.2 3 16.02 3Zm0 23.48h-.01a10.9 10.9 0 0 1-5.56-1.53l-.4-.23-3.89 1.23 1.28-3.75-.26-.4a10.56 10.56 0 0 1-1.7-5.76c0-5.83 4.72-10.58 10.54-10.58 2.82 0 5.47 1.1 7.46 3.1a10.45 10.45 0 0 1 3.08 7.44c0 5.82-4.72 10.48-10.54 10.48Zm5.79-7.86c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57a9.5 9.5 0 0 1-1.76-2.17c-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.25-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.29 3.27c.16.21 2.24 3.41 5.42 4.78.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z"/></svg>;
}

export function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [email,setEmail]=useState<string|null>(null);
  const [checkingSession,setCheckingSession]=useState(true);

  useEffect(()=>{
    if(!supabase){setCheckingSession(false);return;}
    supabase.auth.getSession().then(({data})=>{setEmail(data.session?.user.email??null);setCheckingSession(false);});
    const{data:authListener}=supabase.auth.onAuthStateChange((_event,session)=>{setEmail(session?.user.email??null);setCheckingSession(false);});
    return()=>authListener.subscription.unsubscribe();
  },[]);

  if(pathname==="/")return null;
  const hasItems=items.length>0;
  const isAdmin=(email||"").toLowerCase()===ADMIN_EMAIL;
  const supportHref=isAdmin?"/admin/soporte":"/soporte";

  const navClass=(href:string)=>{
    const active=pathname===href||pathname.startsWith(`${href}/`);
    return `rounded-xl px-3 py-2 lg:px-4 lg:py-2.5 transition-all duration-200 ${active?"bg-[#d5a536]/15 text-[#efc75f] shadow-[0_0_18px_rgba(213,165,54,.18)] ring-1 ring-[#d5a536]/45":"hover:bg-white/[0.07] hover:text-[#efc75f] active:scale-[.97]"}`;
  };

  const desktopButton="grid h-10 w-10 place-items-center rounded-xl sm:h-11 sm:w-11 min-[700px]:h-[48px] min-[700px]:w-[48px] lg:h-[52px] lg:w-[52px]";

  return <header className="sticky top-0 z-50 border-b border-[#8f6927]/35 bg-[#020202]/95 backdrop-blur-xl">
    <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-1.5 px-2 py-2 sm:gap-2 sm:px-3 sm:py-2.5 min-[700px]:gap-3 min-[700px]:px-5 min-[700px]:py-2 lg:px-6">
      <Link href={isAdmin?"/admin/soporte":"/"} className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 min-[700px]:gap-3">
        <RomilLogo/>
        <span className="hidden h-10 w-px bg-[#b78b37]/45 min-[420px]:block min-[700px]:h-9"/>
        <span className="hidden whitespace-nowrap text-[11px] font-extrabold tracking-[.06em] text-white min-[420px]:inline sm:text-[13px] min-[700px]:text-[15px] lg:text-base">ROMIL <span className="text-[#e1b04a]">PLUS</span></span>
      </Link>

      <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 font-semibold text-[#c8c0b2] min-[900px]:flex min-[900px]:text-sm lg:gap-3 lg:text-[15px]">
        {isAdmin ? <>
          <Link href="/admin/soporte" className={navClass("/admin/soporte")}>Atención al cliente</Link>
          <Link href="/admin/whatsapp" className={`${navClass("/admin/whatsapp")} ${pathname.startsWith("/admin/whatsapp")?"!bg-[#25D366]/10 !text-[#63e891] !ring-[#25D366]/35":"hover:!text-[#63e891]"}`}>WhatsApp</Link>
          <Link href="/admin" className={navClass("/admin")}>Pedidos</Link>
        </> : <>
          <Link href="/catalogo" className={navClass("/catalogo")}>Catálogo</Link>
          <Link href="/mis-compras" className={navClass("/mis-compras")}>Mis compras</Link>
          <Link href="/soporte" className={navClass("/soporte")}>Soporte</Link>
        </>}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 min-[700px]:gap-2.5">
        {isAdmin ? <>
          <Link href="/admin" className={`${desktopButton} border transition-all active:scale-95 ${pathname==="/admin"?"border-[#d5a536]/70 bg-[#d5a536]/15 text-[#efc75f]":"border-[#d5a536]/55 text-[#e1b04a] hover:bg-[#d5a536]/15"}`} aria-label="Pedidos" title="Pedidos"><ClipboardList className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/></Link>
          <Link href="/admin/soporte" className={`${desktopButton} border transition-all active:scale-95 ${pathname.startsWith("/admin/soporte")?"border-[#d5a536]/70 bg-[#d5a536]/15 text-[#efc75f]":"border-[#d5a536]/55 text-white hover:bg-[#d5a536]/15"}`} aria-label="Atención al cliente" title="Atención al cliente"><MessageCircle className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/></Link>
          <Link href="/admin/whatsapp" className={`${desktopButton} border transition-all active:scale-95 ${pathname.startsWith("/admin/whatsapp")?"border-[#25D366]/65 bg-[#25D366]/15 text-[#63e891] shadow-[0_0_22px_rgba(37,211,102,.16)]":"border-[#25D366]/45 text-[#63e891] hover:bg-[#25D366]/10"}`} aria-label="WhatsApp" title="WhatsApp"><WhatsAppIcon className="h-6 w-6 lg:h-7 lg:w-7"/></Link>
          <Link href="/perfil" className={`${desktopButton} border transition-all active:scale-95 ${pathname.startsWith("/perfil")?"border-[#d5a536]/70 bg-[#d5a536]/15 text-[#efc75f]":"border-[#d5a536]/55 text-[#e1b04a] hover:bg-[#d5a536]/15"}`} aria-label={`Mi perfil: ${email}`} title="Mi perfil"><User className="h-[19px] w-[19px] sm:h-[21px] sm:w-[21px] min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/></Link>
        </> : <>
          <Link href={supportHref} className={`${desktopButton} hidden border border-[#d5a536]/55 text-white transition-all hover:bg-[#d5a536]/15 active:scale-95 min-[900px]:grid`} aria-label="Soporte"><MessageCircle className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/></Link>
          {!checkingSession&&email?<Link href="/perfil" className={`${desktopButton} border transition-all active:scale-95 ${pathname.startsWith("/perfil")?"border-[#d5a536]/70 bg-[#d5a536]/15 text-[#efc75f]":"border-[#d5a536]/55 text-[#e1b04a] hover:bg-[#d5a536]/15"}`} aria-label={`Mi perfil: ${email}`} title="Mi perfil"><User className="h-[19px] w-[19px] sm:h-[21px] sm:w-[21px] min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/></Link>:<Link href="/login" className={`${desktopButton} border border-[#d5a536]/55 text-white transition-all hover:bg-[#d5a536]/15 active:scale-95`} aria-label="Iniciar sesión"><User className="h-[19px] w-[19px] sm:h-[21px] sm:w-[21px] min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/></Link>}
          {!checkingSession&&email&&<Link href="/mis-compras" className={`relative flex h-10 w-10 flex-col items-center justify-center rounded-xl border transition-all active:scale-95 sm:h-11 sm:w-11 min-[700px]:h-[48px] min-[700px]:w-[48px] min-[900px]:hidden ${pathname.startsWith("/mis-compras")?"border-[#d5a536]/70 bg-[#d5a536]/15 text-[#efc75f]":"border-[#d5a536]/55 text-[#e1b04a] hover:bg-[#d5a536]/15"}`} aria-label="Historial de compras" title="Historial de compras"><ReceiptText className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] min-[700px]:h-6 min-[700px]:w-6" strokeWidth={1.8}/><span className="mt-0.5 text-[6px] font-black uppercase leading-none tracking-[-.02em] sm:text-[7px] min-[700px]:text-[8px]">Historial</span></Link>}
          <Link href="/carrito" className={`${desktopButton} relative border transition-all duration-200 active:scale-95 ${pathname.startsWith("/carrito")||hasItems?"border-[#d5a536]/70 bg-[#d5a536]/10 text-white":"border-[#d5a536]/55 text-white hover:bg-[#d5a536]/15"}`} aria-label="Carrito"><ShoppingCart className="h-5 w-5 sm:h-[22px] sm:w-[22px] min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" strokeWidth={1.8}/>{hasItems&&<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#d7b257] px-1 text-[9px] font-black text-black min-[700px]:h-5 min-[700px]:min-w-5 min-[700px]:text-[10px]">{items.length}</span>}</Link>
        </>}
      </div>
    </div>
  </header>;
}
