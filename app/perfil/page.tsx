"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, KeyRound, LogOut, Mail, Save, Sparkles, UserCircle2 } from "lucide-react";
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
  const [signingOut,setSigningOut]=useState(false);
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

  const handleLogout=async()=>{
    if(!supabase)return;
    setSigningOut(true);setMessage("");
    const {error}=await supabase.auth.signOut();
    if(error){setMessage(`No se pudo cerrar sesión: ${error.message}`);setSigningOut(false);return;}
    router.push("/login");router.refresh();
  };

  if(loading)return <main className="min-h-screen bg-[#030303] px-4 py-8 text-white sm:py-12"><div className="mx-auto max-w-3xl text-center text-sm text-white/60 sm:text-base">Cargando perfil...</div></main>;

  const dateLabel=createdAt?new Date(createdAt).toLocaleDateString("es-PE",{year:"numeric",month:"long",day:"numeric"}):"—";

  return <main className="relative min-h-screen overflow-hidden bg-[#030308] px-3 py-5 text-white sm:px-5 sm:py-7 min-[700px]:px-6 min-[700px]:py-8 lg:py-12">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(0,190,255,.18),transparent_26%),radial-gradient(circle_at_88%_14%,rgba(217,70,239,.17),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(139,92,246,.15),transparent_34%)]"/>
    <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#37d7ff,#955cff,#ff4fcf,transparent)]"/>

    <div className="relative z-10 mx-auto max-w-4xl">
      <div className="mb-5 text-center sm:mb-6 min-[700px]:mb-7">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#63e4ff]/45 bg-[linear-gradient(145deg,rgba(38,198,255,.18),rgba(179,71,255,.18),rgba(255,72,190,.16))] text-white shadow-[0_0_36px_rgba(75,204,255,.20),0_0_54px_rgba(202,70,255,.12)] sm:h-20 sm:w-20 min-[700px]:h-24 min-[700px]:w-24"><UserCircle2 className="h-8 w-8 sm:h-10 sm:w-10 min-[700px]:h-12 min-[700px]:w-12"/></div>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[11px] font-black uppercase tracking-[.13em] text-[#bfefff]"><Sparkles size={13}/> Tu espacio ROMIL PLUS</div>
        <h1 className="mt-3 text-[28px] font-black sm:text-3xl min-[700px]:mt-4 min-[700px]:text-4xl"><span className="text-white">MI</span> <span className="text-[#d6b25e]">PERFIL</span></h1>
        <p className="mt-1.5 text-sm text-white/55 sm:text-base min-[700px]:mt-2">Datos y seguridad de tu cuenta</p>
      </div>

      <div className="grid gap-3.5 sm:gap-4 min-[700px]:gap-5 lg:grid-cols-2">
        <section className="relative overflow-hidden rounded-[24px] border border-[#55d7ff]/20 bg-[radial-gradient(circle_at_0%_0%,rgba(39,177,255,.18),transparent_42%),linear-gradient(160deg,rgba(10,19,42,.94),rgba(8,8,16,.96))] p-4 shadow-[0_18px_55px_rgba(0,0,0,.34),0_0_28px_rgba(50,180,255,.08)] sm:rounded-3xl sm:p-5 min-[700px]:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#54dfff,transparent)] opacity-70"/>
          <h2 className="text-lg font-black text-[#c8f4ff] sm:text-xl">Información de la cuenta</h2>
          <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
            <div className="rounded-2xl border border-[#54dfff]/18 bg-[#07101b]/70 p-3.5 sm:p-4"><div className="flex items-center gap-2.5 text-white/55"><Mail size={18} className="text-[#55ddff]"/><span className="text-xs font-bold sm:text-sm">Correo</span></div><p className="mt-2 break-all text-[15px] font-semibold sm:text-base">{email}</p></div>
            <div className="rounded-2xl border border-[#a66cff]/20 bg-[#100b1d]/70 p-3.5 sm:p-4"><div className="flex items-center gap-2.5 text-white/55"><CalendarDays size={18} className="text-[#b37cff]"/><span className="text-xs font-bold sm:text-sm">Cuenta creada</span></div><p className="mt-2 text-[15px] font-semibold sm:text-base">{dateLabel}</p></div>
            <div><label className="mb-1.5 block text-xs font-bold text-white/70 sm:text-sm">Nombre</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" className="h-11 w-full rounded-xl border border-[#57dfff]/18 bg-black/55 px-3.5 text-sm outline-none transition focus:border-[#63e4ff]/70 focus:shadow-[0_0_22px_rgba(73,211,255,.12)] sm:h-12 sm:rounded-2xl sm:px-4 sm:text-base"/><button onClick={saveName} disabled={savingName} className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#57dfff]/35 bg-[linear-gradient(90deg,rgba(34,211,238,.18),rgba(99,102,241,.18))] text-sm font-black text-[#c8f7ff] transition hover:brightness-125 disabled:opacity-50 sm:mt-3 sm:h-12 sm:rounded-2xl sm:text-base"><Save size={17}/>{savingName?"Guardando...":"Guardar nombre"}</button></div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[24px] border border-[#e759ff]/20 bg-[radial-gradient(circle_at_100%_0%,rgba(220,72,255,.18),transparent_42%),linear-gradient(160deg,rgba(24,10,34,.94),rgba(8,8,16,.96))] p-4 shadow-[0_18px_55px_rgba(0,0,0,.34),0_0_28px_rgba(210,73,255,.08)] sm:rounded-3xl sm:p-5 min-[700px]:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#e75cff,transparent)] opacity-70"/>
          <h2 className="text-lg font-black text-[#f2cdff] sm:text-xl">Seguridad</h2>
          <div className="mt-4 rounded-2xl border border-[#e759ff]/18 bg-[#120819]/70 p-3.5 sm:mt-5 sm:p-4"><div className="flex items-center gap-2.5 text-white/55"><KeyRound size={18} className="text-[#ed68ff]"/><span className="text-xs font-bold sm:text-sm">Cambiar contraseña</span></div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nueva contraseña" autoComplete="new-password" className="mt-3 h-11 w-full rounded-xl border border-[#e759ff]/18 bg-black/55 px-3.5 text-sm outline-none transition focus:border-[#ef72ff]/70 focus:shadow-[0_0_22px_rgba(226,75,255,.12)] sm:mt-4 sm:h-12 sm:rounded-2xl sm:px-4 sm:text-base"/><p className="mt-2 text-[11px] text-white/45 sm:text-xs">Mínimo 6 caracteres.</p><button onClick={savePassword} disabled={savingPassword} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#ed63ff]/35 bg-[linear-gradient(90deg,rgba(168,85,247,.20),rgba(236,72,153,.18))] text-sm font-black text-[#f7d8ff] transition hover:brightness-125 disabled:opacity-50 sm:mt-4 sm:h-12 sm:rounded-2xl sm:text-base"><KeyRound size={17}/>{savingPassword?"Actualizando...":"Cambiar contraseña"}</button></div>
          <p className="mt-3 text-xs leading-5 text-white/50 sm:mt-4 sm:text-sm sm:leading-6">Tu correo identifica la cuenta con la que estás conectado. Las compras y entregas siguen estando disponibles en “Mis compras”.</p>
          <button onClick={handleLogout} disabled={signingOut} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-400/40 bg-[linear-gradient(90deg,rgba(248,113,113,.12),rgba(244,63,94,.16))] text-sm font-black text-red-200 transition hover:border-red-400/70 hover:brightness-125 disabled:opacity-50 sm:h-12 sm:rounded-2xl sm:text-base"><LogOut size={18}/>{signingOut?"Cerrando sesión...":"Cerrar sesión"}</button>
        </section>
      </div>

      {message&&<div className="mt-4 rounded-xl border border-[#ffd45d]/35 bg-[linear-gradient(90deg,rgba(255,211,80,.11),rgba(171,84,255,.10))] px-3.5 py-3 text-center text-xs font-semibold text-[#ffe38c] shadow-[0_0_24px_rgba(255,207,69,.08)] sm:mt-5 sm:rounded-2xl sm:px-4 sm:text-sm">{message}</div>}
    </div>
  </main>;
}
