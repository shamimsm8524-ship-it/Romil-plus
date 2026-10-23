"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";
import { supabase, checkGoogleConnection } from "@/lib/supabase";
import { withRequestTimeout, supportErrorMessage, loginDestination } from "@/lib/auth-feedback";

type Mode = "login" | "register";

const ADMIN_EMAIL="milagroslove.1693@gmail.com";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login"); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [loading, setLoading] = useState(false); const [checkingSession, setCheckingSession] = useState(true); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  const [sessionAttempt, setSessionAttempt] = useState(0);
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const getNextPath = () => loginDestination(new URLSearchParams(window.location.search).get("next"), false);
  const isAdminEmail = (userEmail?: string | null) => (userEmail || "").trim().toLowerCase() === ADMIN_EMAIL;
  const getDestination = (userEmail?: string | null) => loginDestination(
    new URLSearchParams(window.location.search).get("next"), isAdminEmail(userEmail),
  );
  useEffect(() => {
    let active = true;
    setCheckingSession(true);
    setInAppBrowser(["; wv)", "FBAN", "FBAV", "Instagram", "Line/"].some(marker => navigator.userAgent.includes(marker)));
    const check = async () => {
      try {
        const query = new URLSearchParams(window.location.search);
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const oauthError = query.get("error_description") || hash.get("error_description") || query.get("error") || hash.get("error");
        if (oauthError) {
          setError("Google no pudo completar el acceso: " + oauthError);
          window.history.replaceState(null, "", "/login?next=" + encodeURIComponent(getNextPath()));
          return;
        }
        const { data, error: sessionError } = await withRequestTimeout(supabase.auth.getSession());
        if (sessionError) throw sessionError;
        if (active && data.session) window.location.replace(getDestination(data.session.user.email));
      } catch (err) {
        if (active) setError(supportErrorMessage(err));
      } finally {
        if (active) setCheckingSession(false);
      }
    };
    void check();
    return () => { active = false; };
  }, [sessionAttempt]);
  const ensureSupabase=()=>{if(!supabase){setError("Falta conectar Supabase para activar el acceso.");return false;}return true;};
  const handleSubmit=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setMessage("");setError("");if(!ensureSupabase())return;setLoading(true);try{const nextPath=getNextPath();if(mode==="register"){const{data,error:signUpError}=await withRequestTimeout(supabase!.auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/login?next=${encodeURIComponent(nextPath)}`}}));if(signUpError)throw signUpError;if(data.session){window.location.replace(getDestination(data.session.user.email));return;}setMessage("Cuenta creada. Revisa tu correo para confirmar tu cuenta y luego podrás continuar.");}else{const{data,error:signInError}=await withRequestTimeout(supabase!.auth.signInWithPassword({email,password}));if(signInError)throw signInError;window.location.replace(getDestination(data.user?.email));}}catch(err){setError(supportErrorMessage(err));}finally{setLoading(false);}};
  const handleGoogle = async () => {
    setMessage(""); setError("");
    if (!ensureSupabase()) return;
    if (inAppBrowser) {
      setError("Abre Romilplus en Chrome o Safari para ingresar con Google. También puedes ingresar con correo.");
      return;
    }
    setLoading(true);
    try {
      await withRequestTimeout(checkGoogleConnection());
      const { data, error: googleError } = await withRequestTimeout(supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/login?next=" + encodeURIComponent(new URLSearchParams(window.location.search).get("next") || "/convocatorias"),
          skipBrowserRedirect: true,
        },
      }));
      if (googleError) throw googleError;
      if (!data.url || new URL(data.url).protocol !== "https:") throw new Error("No se recibió el enlace de acceso de Google.");
      window.location.assign(data.url);
    } catch (err) {
      setError(supportErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  if(checkingSession)return <main className="grid min-h-[75vh] place-items-center px-4"><p className="text-sm text-white/50">Comprobando sesión...</p></main>;
  return <main className="mx-auto grid min-h-[75vh] max-w-md place-items-center px-4 py-14"><section className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"><div className="mx-auto h-44 w-44 overflow-hidden rounded-full border border-[#d5a536]/70 bg-black shadow-[0_0_32px_rgba(213,165,54,0.16)] sm:h-48 sm:w-48"><img src="/logo-romil-plus.png" alt="Romil Plus" className="h-full w-full object-cover" style={{objectPosition:"50% 13%",transform:"scale(1.48)",transformOrigin:"50% 13%"}}/></div><h1 className="mt-6 text-center text-3xl font-black">{mode==="login"?"Inicia sesión":"Crea tu cuenta"}</h1><p className="mt-2 text-center text-sm text-white/50">Inicia sesión para acceder a tu cuenta y al chat de soporte de Romilplus.</p><button type="button" onClick={handleGoogle} disabled={loading} className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white px-4 py-3 font-black text-slate-950 transition hover:bg-white/90 disabled:opacity-50"><span className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 text-sm font-black text-[#4285F4]">G</span>Continuar con Google</button><div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-white/10"/><span className="text-xs uppercase tracking-wider text-white/35">o con correo</span><span className="h-px flex-1 bg-white/10"/></div><form onSubmit={handleSubmit} className="space-y-3"><label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-[#d5a536]"><Mail size={18} className="text-white/35"/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="Correo" className="w-full bg-transparent py-3 outline-none"/></label><label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-[#d5a536]"><LockKeyhole size={18} className="text-white/35"/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength={6} required placeholder="Contraseña" className="w-full bg-transparent py-3 outline-none"/></label><button type="submit" disabled={loading} className="w-full rounded-xl bg-white px-4 py-3 font-black text-slate-950 transition hover:bg-white/90 disabled:opacity-50">{loading?"Procesando...":mode==="login"?"Entrar":"Crear cuenta"}</button></form>{error&&<p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-center text-sm text-red-200">{error}</p>}{error&&<button type="button" onClick={()=>{setError("");setSessionAttempt(value=>value+1);}} className="mt-3 w-full text-sm font-bold text-[#e3b64f]">Volver a comprobar sesión</button>}{message&&<p className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-center text-sm text-emerald-200">{message}</p>}<button type="button" onClick={()=>{setMode(mode==="login"?"register":"login");setError("");setMessage("");}} className="mt-5 w-full text-center text-sm font-bold text-[#e3b64f] hover:underline">{mode==="login"?"¿No tienes cuenta? Crear cuenta":"¿Ya tienes cuenta? Iniciar sesión"}</button><p className="mt-5 text-center text-xs leading-5 text-white/35">Si abriste este enlace dentro de WhatsApp, Facebook u otra aplicación, utiliza «Abrir en el navegador» en su menú para ingresar con Google.</p></section></main>;
}
