"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, KeyRound, Mail, Save, UserCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PerfilPage(){
  const router=useRouter();
  const [loading,setLoading]=useState(true);
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [createdAt,setCreatedAt]=useState("");
  const [password,setPassword]=useState("");
  const [savingName,setSavingName]=useState(false);
  const [savingPassword,setSavingPassword]=useState(false);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    if(!supabase){setLoading(false);return;}
    supabase.auth.getUser().then(({data})=>{
      const user=data.user;
      if(!user){router.replace("/login");return;}
      setEmail(user.email||"");
      setName((user.user_metadata?.full_name||user.user_metadata?.name||"").toString());
      setCreatedAt(user.created_at||"");
      setLoading(false);
    });
  },[router]);

  const saveName=async()=>{
    if(!supabase)return;
    setSavingName(true);setMessage("");
    const {error}=await supabase.auth.updateUser({data:{full_name:name.trim()}});
    setMessage(error?`No se pudo guardar: ${error.message}`:"Nombre actualizado correctamente.");
    setSavingName(false);
  };

  const savePassword=async()=>{
    if(!supabase||password.length<6){setMessage("La contraseña debe tener al menos 6 caracteres.");return;}
    setSavingPassword(true);setMessage("");
    const {error}=await supabase.auth.updateUser({password});
    if(!error)setPassword("");
    setMessage(error?`No se pudo cambiar la contraseña: ${error.message}`:"Contraseña actualizada correctamente.");
    setSavingPassword(false);
  };

  if(loading)return <main className="min-h-screen bg-[#030303] px-4 py-8 text-white sm:py-12"><div className="mx-auto max-w-3xl text-center text-sm text-white/60 sm:text-base">Cargando perfil...</div></main>;

  const dateLabel=createdAt?new Date(createdAt).toLocaleDateString("es-PE",{year:"numeric",month:"long",day:"numeric"}):"—";

  return <main className="min-h-screen bg-[#030303] px-3 py-5 text-white sm:px-5 sm:py-7 min-[700px]:px-6 min-[700px]:py-8 lg:py-12">
    <div className="mx-auto max-w-4xl">
      <div className="mb-5 text-center sm:mb-6 min-[700px]:mb-7">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#d5a536]/55 bg-[#d5a536]/10 text-[#e7bd58] shadow-[0_0_28px_rgba(213,165,54,.16)] sm:h-16 sm:w-16 min-[700px]:h-20 min-[700px]:w-20"><UserCircle2 className="h-7 w-7 sm:h-8 sm:w-8 min-[700px]:h-10 min-[700px]:w-10"/></div>
        <h1 className="mt-3 text-[26px] font-black sm:text-3xl min-[700px]:mt-4 min-[700px]:text-4xl">MI <span className="text-[#e3b64f]">PERFIL</span></h1>
        <p className="mt-1.5 text-sm text-white/55 sm:text-base min-[700px]:mt-2">Datos de tu cuenta ROMIL PLUS</p>
      </div>

      <div className="grid gap-3.5 sm:gap-4 min-[700px]:gap-5 lg:grid-cols-2">
        <section className="rounded-[22px] border border-white/10 bg-[#0a0a0a] p-4 sm:rounded-3xl sm:p-5 min-[700px]:p-6">
          <h2 className="text-lg font-black sm:text-xl">Información de la cuenta</h2>
          <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 sm:p-4"><div className="flex items-center gap-2.5 text-white/55"><Mail size={18} className="text-[#e3b64f]"/><span className="text-xs font-bold sm:text-sm">Correo</span></div><p className="mt-2 break-all text-[15px] font-semibold sm:text-base">{email}</p></div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 sm:p-4"><div className="flex items-center gap-2.5 text-white/55"><CalendarDays size={18} className="text-[#e3b64f]"/><span className="text-xs font-bold sm:text-sm">Cuenta creada</span></div><p className="mt-2 text-[15px] font-semibold sm:text-base">{dateLabel}</p></div>
            <div><label className="mb-1.5 block text-xs font-bold text-white/70 sm:text-sm">Nombre</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" className="h-11 w-full rounded-xl border border-white/10 bg-black px-3.5 text-sm outline-none transition focus:border-[#d5a536]/65 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-base"/><button onClick={saveName} disabled={savingName} className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#d5a536]/55 bg-[#d5a536]/10 text-sm font-black text-[#efc75f] transition hover:bg-[#d5a536]/15 disabled:opacity-50 sm:mt-3 sm:h-12 sm:rounded-2xl sm:text-base"><Save size={17}/>{savingName?"Guardando...":"Guardar nombre"}</button></div>
          </div>
        </section>

        <section className="rounded-[22px] border border-white/10 bg-[#0a0a0a] p-4 sm:rounded-3xl sm:p-5 min-[700px]:p-6">
          <h2 className="text-lg font-black sm:text-xl">Seguridad</h2>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-3.5 sm:mt-5 sm:p-4"><div className="flex items-center gap-2.5 text-white/55"><KeyRound size={18} className="text-[#e3b64f]"/><span className="text-xs font-bold sm:text-sm">Cambiar contraseña</span></div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nueva contraseña" autoComplete="new-password" className="mt-3 h-11 w-full rounded-xl border border-white/10 bg-black px-3.5 text-sm outline-none transition focus:border-[#d5a536]/65 sm:mt-4 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-base"/><p className="mt-2 text-[11px] text-white/45 sm:text-xs">Mínimo 6 caracteres.</p><button onClick={savePassword} disabled={savingPassword} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#d5a536]/55 bg-[#d5a536]/10 text-sm font-black text-[#efc75f] transition hover:bg-[#d5a536]/15 disabled:opacity-50 sm:mt-4 sm:h-12 sm:rounded-2xl sm:text-base"><KeyRound size={17}/>{savingPassword?"Actualizando...":"Cambiar contraseña"}</button></div>
          <p className="mt-3 text-xs leading-5 text-white/50 sm:mt-4 sm:text-sm sm:leading-6">Tu correo identifica la cuenta con la que estás conectado. Las compras y entregas siguen estando disponibles en “Mis compras”.</p>
        </section>
      </div>

      {message&&<div className="mt-4 rounded-xl border border-[#d5a536]/35 bg-[#d5a536]/10 px-3.5 py-3 text-center text-xs font-semibold text-[#efc75f] sm:mt-5 sm:rounded-2xl sm:px-4 sm:text-sm">{message}</div>}
    </div>
  </main>;
}
