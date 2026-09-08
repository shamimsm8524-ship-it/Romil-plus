"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Image as ImageIcon, Paperclip, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL="milagroslove.1693@gmail.com";

function WhatsAppIcon({className="h-6 w-6"}:{className?:string}){
  return <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
    <path d="M16.02 3C8.84 3 3 8.71 3 15.72c0 2.47.73 4.87 2.12 6.92L3 29l6.55-2.06a13.13 13.13 0 0 0 6.46 1.69h.01C23.2 28.63 29 22.92 29 15.9 29 8.87 23.2 3 16.02 3Zm0 23.48h-.01a10.9 10.9 0 0 1-5.56-1.53l-.4-.23-3.89 1.23 1.28-3.75-.26-.4a10.56 10.56 0 0 1-1.7-5.76c0-5.83 4.72-10.58 10.54-10.58 2.82 0 5.47 1.1 7.46 3.1a10.45 10.45 0 0 1 3.08 7.44c0 5.82-4.72 10.48-10.54 10.48Zm5.79-7.86c-.32-.16-1.88-.92-2.17-1.03-.29-.1-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57a9.5 9.5 0 0 1-1.76-2.17c-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.25-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.29 3.27c.16.21 2.24 3.41 5.42 4.78.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z"/>
  </svg>;
}

export default function AdminWhatsAppPage(){
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState("");

  useEffect(()=>{
    const start=async()=>{
      if(!supabase){setError("Supabase no está configurado.");setLoading(false);return;}
      const{data}=await supabase.auth.getSession();
      const user=data.session?.user;
      if(!user){window.location.replace("/login?next=%2Fadmin%2Fwhatsapp");return;}
      if((user.email||"").toLowerCase()!==ADMIN_EMAIL){window.location.replace("/catalogo");return;}
      setLoading(false);
    };
    start();
  },[]);

  if(loading)return <main className="mx-auto max-w-6xl px-4 py-14 text-white/60">Cargando WhatsApp...</main>;

  return <main className="relative mx-auto min-h-[75vh] max-w-6xl px-4 py-10">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-[#25D366]"><WhatsAppIcon className="h-6 w-6"/><p className="text-sm font-black uppercase tracking-wider">WhatsApp</p></div>
        <h1 className="mt-2 text-4xl font-black">Mensajes de WhatsApp</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/50">Bandeja independiente para ver conversaciones, fecha, hora, fotos y archivos recibidos desde WhatsApp Business.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[.07] px-4 py-2.5 text-sm font-black text-amber-200"><span className="h-2.5 w-2.5 rounded-full bg-amber-300"/> Pendiente de conexión</span>
        <Link href="/admin/soporte" className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-black">Chat de la página</Link>
        <Link href="/admin" className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-black">Pedidos</Link>
      </div>
    </div>

    {error&&<p className="mt-4 rounded-xl bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}

    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[.06] p-4"><p className="text-xs font-black uppercase tracking-wider text-[#73e89d]">Conversaciones</p><p className="mt-2 text-4xl font-black">0</p></div>
      <div className="rounded-2xl border border-red-400/20 bg-red-400/[.05] p-4"><p className="text-xs font-black uppercase tracking-wider text-red-300">Sin leer</p><p className="mt-2 text-4xl font-black">0</p></div>
      <div className="rounded-2xl border border-sky-400/20 bg-sky-400/[.05] p-4"><p className="text-xs font-black uppercase tracking-wider text-sky-300">Fotos y archivos</p><p className="mt-2 text-4xl font-black">0</p></div>
    </div>

    <section className="mt-6 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-[340px_1fr]">
      <aside className="min-h-[620px] border-b border-white/10 lg:border-b-0 lg:border-r">
        <div className="border-b border-white/10 p-4">
          <p className="font-black">Conversaciones</p>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 text-white/40"><Search size={17}/><span className="text-sm">Buscar por nombre o número</span></div>
        </div>
        <div className="p-5">
          <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-center">
            <WhatsAppIcon className="mx-auto h-10 w-10 text-[#25D366]"/>
            <p className="mt-3 font-black">Sin conversaciones todavía</p>
            <p className="mt-2 text-sm leading-6 text-white/45">Cuando conectemos WhatsApp Business, aquí aparecerá cada chat con el nombre del cliente, último mensaje, fecha y hora.</p>
          </div>
        </div>
      </aside>

      <div className="flex min-h-[620px] flex-col">
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366]"><WhatsAppIcon className="h-6 w-6"/></div>
            <div><p className="font-black">Selecciona una conversación</p><p className="text-xs text-white/40">Aquí se mostrará el historial completo</p></div>
          </div>
        </div>
        <div className="grid flex-1 place-items-center p-8 text-center">
          <div className="max-w-md">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-[#25D366]/20 bg-[#25D366]/[.06] text-[#25D366]"><WhatsAppIcon className="h-10 w-10"/></div>
            <h2 className="mt-5 text-2xl font-black">Bandeja de WhatsApp preparada</h2>
            <p className="mt-3 text-sm leading-6 text-white/45">Al conectarla, cada mensaje conservará su fecha y hora y las imágenes o documentos recibidos aparecerán dentro del mismo chat.</p>
            <div className="mt-5 grid gap-2 text-left sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/60"><ImageIcon className="mb-2 text-[#25D366]" size={19}/><b className="text-white">Imágenes</b><br/>Vista previa dentro del chat</div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/60"><Paperclip className="mb-2 text-[#25D366]" size={19}/><b className="text-white">Archivos</b><br/>Adjuntos organizados por mensaje</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
