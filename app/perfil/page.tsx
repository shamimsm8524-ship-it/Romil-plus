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

  if(loading)return <main className="min-h-screen bg-[#030303] px-4 py-12 text-white"><div className="mx-auto max-w-3xl text-center text-white/60">Cargando perfil...</div></main>;

  const dateLabel=createdAt?new Date(createdAt).toLocaleDateString("es-PE",{year:"numeric",month:"long",day:"numeric"}):"—";

  return <main className="min-h-screen bg-[#030303] px-4 py-8 text-white sm:px-6 lg:py-12">
    <div className="mx-auto max-w-4xl">
      <div className="mb-7 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#d5a536]/55 bg-[#d5a536]/10 text-[#e7bd58] shadow-[0_0_28px_rgba(213,165,54,.16)]"><UserCircle2 size={40}/></div>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">MI <span className="text-[#e3b64f]">PERFIL</span></h1>
        <p className="mt-2 text-white/55">Datos de tu cuenta ROMIL PLUS</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 sm:p-6">
          <h2 className="text-xl font-black">Información de la cuenta</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4"><div className="flex items-center gap-3 text-white/55"><Mail size={19} className="text-[#e3b64f]"/><span className="text-sm font-bold">Correo</span></div><p className="mt-2 break-all font-semibold">{email}</p></div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4"><div className="flex items-center gap-3 text-white/55"><CalendarDays size={19} className="text-[#e3b64f]"/><span className="text-sm font-bold">Cuenta creada</span></div><p className="mt-2 font-semibold">{dateLabel}</p></div>
            <div><label className="mb-2 block text-sm font-bold text-white/70">Nombre</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" className="h-12 w-full rounded-2xl border border-white/10 bg-black px-4 outline-none transition focus:border-[#d5a536]/65"/><button onClick={saveName} disabled={savingName} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#d5a536]/55 bg-[#d5a536]/10 font-black text-[#efc75f] transition hover:bg-[#d5a536]/15 disabled:opacity-50"><Save size={18}/>{savingName?"Guardando...":"Guardar nombre"}</button></div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-5 sm:p-6">
          <h2 className="text-xl font-black">Seguridad</h2>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4"><div className="flex items-center gap-3 text-white/55"><KeyRound size={19} className="text-[#e3b64f]"/><span className="text-sm font-bold">Cambiar contraseña</span></div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nueva contraseña" autoComplete="new-password" className="mt-4 h-12 w-full rounded-2xl border border-white/10 bg-black px-4 outline-none transition focus:border-[#d5a536]/65"/><p className="mt-2 text-xs text-white/45">Mínimo 6 caracteres.</p><button onClick={savePassword} disabled={savingPassword} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#d5a536]/55 bg-[#d5a536]/10 font-black text-[#efc75f] transition hover:bg-[#d5a536]/15 disabled:opacity-50"><KeyRound size={18}/>{savingPassword?"Actualizando...":"Cambiar contraseña"}</button></div>
          <p className="mt-4 text-sm leading-6 text-white/50">Tu correo identifica la cuenta con la que estás conectado. Las compras y entregas siguen estando disponibles en “Mis compras”.</p>
        </section>
      </div>

      {message&&<div className="mt-5 rounded-2xl border border-[#d5a536]/35 bg-[#d5a536]/10 px-4 py-3 text-center text-sm font-semibold text-[#efc75f]">{message}</div>}
    </div>
  </main>;
}
