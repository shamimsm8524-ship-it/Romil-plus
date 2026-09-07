import Link from "next/link";
import { ArrowRight, Headphones, MessageCircle, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Star, User, Zap } from "lucide-react";
import { products } from "@/lib/products";

const featured = products.filter((p) => ["gemini-pro", "canva-pro", "capcut-pro"].includes(p.id));

export default function Home() {
  return (
    <>
      <style>{`
        body>div>header,body>div>footer{display:none!important}
        @keyframes rpFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes rpFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(1.5deg)}}
        @keyframes rpGlow{0%,100%{opacity:.45;transform:scale(.92)}50%{opacity:.9;transform:scale(1.08)}}
        @keyframes rpShine{0%{transform:translateX(-160%)}65%,100%{transform:translateX(190%)}}
        @keyframes rpPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,217,255,.18)}50%{box-shadow:0 0 0 10px rgba(0,217,255,0)}}
        .rp-in{animation:rpFadeUp .65s ease-out both}
        .rp-float{animation:rpFloat 3.4s ease-in-out infinite}
        .rp-glow{animation:rpGlow 4s ease-in-out infinite}
        .rp-shine{position:relative;overflow:hidden}
        .rp-shine:after{content:"";position:absolute;top:-40%;bottom:-40%;left:-30%;width:22%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.26),transparent);animation:rpShine 4.2s ease-in-out infinite}
        .rp-topbtn,.rp-feature,.rp-mini{transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease,background .22s ease}
        .rp-topbtn:hover{transform:translateY(-2px) scale(1.04);border-color:rgba(255,210,74,.9);box-shadow:0 0 24px rgba(255,191,46,.16)}
        .rp-feature:hover{transform:translateY(-4px) scale(1.01)}
        .rp-feature:hover .rp-arrow{transform:translateX(5px)}
        .rp-arrow{transition:transform .2s ease}
        .rp-mini:hover{transform:translateY(-2px)}
        @media(prefers-reduced-motion:reduce){.rp-in,.rp-float,.rp-glow,.rp-shine:after{animation:none!important}.rp-topbtn,.rp-feature,.rp-mini,.rp-arrow{transition:none!important}}
      `}</style>

      <main className="min-h-screen overflow-hidden bg-[#020203] text-white">
        <header className="relative border-b border-[#d4a83d]/25 bg-black/95">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,#ffbf2f,#00d9ff,#bb36ff,transparent)] opacity-70" />
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 min-[700px]:max-w-[980px] min-[700px]:py-3 lg:px-7">
            <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ROMIL PLUS">
              <div className="rp-float h-[78px] w-[98px] shrink-0 sm:h-[88px] sm:w-[112px] min-[700px]:h-[82px] min-[700px]:w-[124px] lg:h-[88px] lg:w-[134px]">
                <img src="/logo-romil-plus.png" alt="ROMIL PLUS" className="h-full w-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <p className="text-lg font-black tracking-wide">ROMIL <span className="text-[#f2c14e]">PLUS</span></p>
                <p className="text-[9px] font-bold uppercase tracking-[.28em] text-white/45">Tu mundo digital</p>
              </div>
            </Link>

            <div className="flex gap-2.5">
              <Link href="/soporte" aria-label="Chat" className="rp-topbtn grid h-12 w-12 place-items-center rounded-2xl border border-[#e1b64f]/45 bg-[linear-gradient(145deg,#111,#050505)] text-white sm:h-14 sm:w-14"><MessageCircle size={23}/></Link>
              <Link href="/login" aria-label="Cuenta" className="rp-topbtn grid h-12 w-12 place-items-center rounded-2xl border border-[#e1b64f]/45 bg-[linear-gradient(145deg,#111,#050505)] text-white sm:h-14 sm:w-14"><User size={22}/></Link>
              <Link href="/carrito" aria-label="Carrito" className="rp-topbtn relative grid h-12 w-12 place-items-center rounded-2xl border border-[#e1b64f]/45 bg-[linear-gradient(145deg,#111,#050505)] text-white sm:h-14 sm:w-14"><ShoppingCart size={22}/><span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#ffca35] shadow-[0_0_12px_rgba(255,202,53,.8)]"/></Link>
            </div>
          </div>
        </header>

        <section className="rp-in mx-auto max-w-5xl px-4 pt-4 sm:px-6 min-[700px]:max-w-[980px] min-[700px]:pt-3">
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#09090c] shadow-[0_12px_34px_rgba(0,0,0,.35)]">
            <div className="rp-mini flex min-h-[82px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center hover:bg-[#ffba2f]/[.05]"><ShieldCheck className="shrink-0 text-[#f2c14e]" size={24}/><div><p className="text-[10px] font-black uppercase sm:text-xs">Garantía</p><p className="mt-1 text-[10px] font-bold text-[#f2c14e] sm:text-[11px]">12 meses</p></div></div>
            <div className="rp-mini flex min-h-[82px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center hover:bg-[#00d9ff]/[.05]"><Zap className="shrink-0 text-[#33ddff]" size={24}/><div><p className="text-[10px] font-black uppercase sm:text-xs">Entrega</p><p className="mt-1 text-[10px] font-bold text-[#8beaff] sm:text-[11px]">Inmediata</p></div></div>
            <div className="rp-mini flex min-h-[82px] items-center justify-center gap-2 px-2 text-center hover:bg-[#c43cff]/[.05]"><Headphones className="shrink-0 text-[#d56aff]" size={24}/><div><p className="text-[10px] font-black uppercase sm:text-xs">Soporte</p><p className="mt-1 text-[10px] font-bold text-[#e5a4ff] sm:text-[11px]">24/7</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pt-5 sm:px-6 min-[700px]:max-w-[980px]">
          <div className="rp-in relative overflow-hidden rounded-[28px] border border-[#00d9ff]/55 bg-[radial-gradient(circle_at_15%_15%,rgba(25,100,255,.38),transparent_34%),radial-gradient(circle_at_86%_22%,rgba(212,45,255,.34),transparent_34%),radial-gradient(circle_at_62%_88%,rgba(0,217,255,.28),transparent_38%),linear-gradient(135deg,#071023,#10091d_54%,#06101c)] px-5 py-7 shadow-[0_0_0_1px_rgba(255,68,237,.2),0_0_40px_rgba(0,183,255,.18),0_0_58px_rgba(221,57,255,.10)] sm:px-7 sm:py-9" style={{animationDelay:".08s"}}>
            <div className="rp-glow pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-[#00d9ff]/25 blur-3xl"/>
            <div className="rp-glow pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full bg-[#d232ff]/25 blur-3xl" style={{animationDelay:".7s"}}/>
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-28 w-72 bg-[#235dff]/20 blur-3xl"/>

            <div className="relative z-10 grid items-center gap-7 min-[700px]:grid-cols-[1.25fr_.75fr]">
              <div className="text-center min-[700px]:text-left">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#61e6ff]/45 bg-[linear-gradient(90deg,rgba(126,54,255,.35),rgba(0,190,255,.28))] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.11em] text-white shadow-[0_0_18px_rgba(0,217,255,.14)] min-[700px]:mx-0">
                  <Sparkles size={13}/> Tu acceso a un mundo de posibilidades
                </div>
                <h1 className="text-[31px] font-black leading-[1.08] sm:text-4xl min-[700px]:text-[38px] lg:text-[43px]">Suscripciones digitales en Perú con <span className="bg-[linear-gradient(90deg,#ffd04a,#ffaf24)] bg-clip-text text-transparent">ROMIL PLUS</span></h1>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/72 sm:text-base min-[700px]:mx-0">Herramientas para diseño, edición, productividad e inteligencia artificial, con entrega rápida y soporte.</p>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 min-[700px]:max-w-[620px]">
                  {[{e:"✦",t:"Crea sin límites",c:"text-[#79ebff]"},{e:"▥",t:"Trabaja mejor",c:"text-[#54d8ff]"},{e:"👥",t:"Aprende y crece",c:"text-[#54f2d0]"},{e:"🚀",t:"Ideas en acción",c:"text-[#ff69da]"}].map((item)=><div key={item.t} className="rounded-xl border border-white/10 bg-black/20 px-2 py-2.5 text-center backdrop-blur"><div className={`text-lg ${item.c}`}>{item.e}</div><p className="mt-1 text-[9px] font-black uppercase tracking-wide text-white/80 sm:text-[10px]">{item.t}</p></div>)}
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row min-[700px]:max-w-[590px]">
                  <Link href="/catalogo" className="rp-shine flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#f4c34d,#ffb829)] px-5 text-sm font-black text-black shadow-[0_0_24px_rgba(255,188,41,.20)] transition hover:scale-[1.02]"><ShoppingBag size={17}/> Ver catálogo <ArrowRight size={17}/></Link>
                  <Link href="/soporte" className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl border border-[#6adfff]/40 bg-[#071221]/65 px-5 text-sm font-black text-white backdrop-blur transition hover:border-[#e359ff]/70 hover:bg-[#35134d]/45"><MessageCircle size={17}/> Soporte</Link>
                </div>
              </div>

              <div className="relative mx-auto hidden h-[260px] w-full max-w-[330px] min-[700px]:block">
                <div className="absolute left-1/2 top-1/2 h-[190px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[28px] border border-[#6ae6ff]/30 bg-[linear-gradient(145deg,#0b0d16,#080a13)] shadow-[0_25px_70px_rgba(0,0,0,.58),0_0_38px_rgba(0,215,255,.18)]">
                  <div className="absolute inset-[12px] flex items-center justify-center rounded-[20px] border border-[#e0ad3c]/20 bg-black"><img src="/logo-romil-plus.png" alt="Romil Plus" className="h-32 w-32 object-contain"/></div>
                </div>
                <div className="rp-float absolute left-0 top-4 h-24 w-24 overflow-hidden rounded-2xl border border-[#7bdcff]/45 bg-black shadow-[0_0_28px_rgba(0,207,255,.26)]"><img src="/gemini-pro.png" alt="Gemini Pro" className="h-full w-full object-cover"/></div>
                <div className="rp-float absolute right-0 top-1 h-24 w-24 overflow-hidden rounded-2xl border border-[#fb68ff]/45 bg-black shadow-[0_0_28px_rgba(229,55,255,.24)]" style={{animationDelay:".6s"}}><img src="/canva-pro-45-dias.jpg" alt="Canva" className="h-full w-full object-cover"/></div>
                <div className="rp-float absolute bottom-2 right-4 h-20 w-20 overflow-hidden rounded-2xl border border-white/35 bg-white shadow-[0_0_24px_rgba(255,255,255,.14)]" style={{animationDelay:"1.1s"}}><img src="/capcut-pro.png" alt="CapCut" className="h-full w-full object-cover"/></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 min-[700px]:max-w-[980px]">
          <div className="rp-in rounded-[28px] border border-white/10 bg-[#07080b] p-4 shadow-[0_20px_55px_rgba(0,0,0,.30)] sm:p-6" style={{animationDelay:".16s"}}>
            <div className="text-center">
              <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-[#a7ddff]/20 bg-[linear-gradient(90deg,rgba(36,103,255,.15),rgba(205,55,255,.15))] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/65"><Star size={12} className="text-[#ffd04a]"/> Selección destacada</div>
              <h2 className="text-2xl font-black sm:text-3xl">PRODUCTOS <span className="bg-[linear-gradient(90deg,#ffd04a,#ffbd2d)] bg-clip-text text-transparent">DESTACADOS</span></h2>
              <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[linear-gradient(90deg,#00d9ff,#8d49ff,#ff48d7)] shadow-[0_0_14px_rgba(85,198,255,.4)]"/>
            </div>

            <div className="mt-6 space-y-3">
              {featured.map((p,index)=>{
                const accent = p.id === "gemini-pro"
                  ? "border-[#2cbcff]/35 bg-[radial-gradient(circle_at_90%_50%,rgba(29,111,255,.32),transparent_34%),linear-gradient(90deg,#111325,#08101d)] shadow-[0_0_24px_rgba(0,170,255,.10)]"
                  : p.id === "canva-pro"
                    ? "border-[#c349ff]/35 bg-[radial-gradient(circle_at_84%_50%,rgba(168,48,255,.30),transparent_34%),linear-gradient(90deg,#151022,#090d16)] shadow-[0_0_24px_rgba(205,52,255,.10)]"
                    : "border-[#ff4db5]/30 bg-[radial-gradient(circle_at_86%_50%,rgba(255,66,174,.20),transparent_35%),linear-gradient(90deg,#111217,#090a0d)] shadow-[0_0_24px_rgba(255,70,180,.08)]";
                return <Link key={p.id} href={`/producto/${p.id}`} className={`rp-feature group grid grid-cols-[96px_1fr_auto] items-center gap-3 rounded-2xl border p-3 sm:grid-cols-[118px_1fr_auto] sm:gap-4 ${accent}`} style={{animationDelay:`${.2+index*.08}s`}}>
                  <div className="overflow-hidden rounded-2xl bg-white"><img src={p.image || "/logo-romil-plus.png"} alt={p.name} className="h-24 w-24 object-cover transition duration-300 group-hover:scale-105 sm:h-[118px] sm:w-[118px]"/></div>
                  <div className="min-w-0"><h3 className="text-lg font-black sm:text-xl">{p.name}</h3><p className="mt-1 text-xs text-white/55 sm:text-sm">Suscripción: <span className="font-bold text-[#f3c856]">{p.duration}</span></p><div className="mt-2 flex flex-wrap gap-1.5"><span className="rounded-full border border-[#664cff]/45 bg-[#4c38ff]/15 px-2 py-1 text-[9px] font-bold text-[#c9c0ff]">Digital</span><span className="rounded-full border border-[#20c6ff]/35 bg-[#11b8ff]/10 px-2 py-1 text-[9px] font-bold text-[#9feaff]">Premium</span></div></div>
                  <div className="flex items-center gap-2"><span className="rounded-xl border border-[#e3b64f]/50 bg-black/35 px-3 py-2 text-sm font-black text-[#ffd25a] sm:text-base">S/ {Number(p.price).toFixed(2)}</span><span className="rp-arrow text-2xl text-white/75">›</span></div>
                </Link>;
              })}
            </div>

            <Link href="/catalogo" className="rp-shine mt-5 flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#f4c34d,#ffb829)] px-4 text-sm font-black text-black shadow-[0_0_24px_rgba(255,188,41,.16)] transition hover:scale-[1.01]"><ShoppingBag size={18}/> VER CATÁLOGO DE SUSCRIPCIONES DIGITALES <ArrowRight size={17}/></Link>
          </div>

          <Link href="/catalogo" className="rp-in rp-feature mt-4 flex items-center gap-4 rounded-[22px] border border-[#b93dff]/45 bg-[radial-gradient(circle_at_95%_50%,rgba(0,174,255,.28),transparent_28%),radial-gradient(circle_at_12%_50%,rgba(255,45,181,.25),transparent_30%),linear-gradient(90deg,#1b0920,#08172b)] p-4 shadow-[0_0_34px_rgba(84,76,255,.12)]" style={{animationDelay:".24s"}}>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#ff48b8]/15 text-2xl shadow-[0_0_18px_rgba(255,72,184,.20)]">%</div>
            <div className="min-w-0 flex-1"><p className="font-black text-[#ffb6f1]">PROMOCIÓN POR TIEMPO LIMITADO</p><p className="mt-1 text-sm text-white/62">Revisa las ofertas disponibles en nuestras suscripciones digitales.</p></div>
            <ArrowRight className="shrink-0 text-[#91e9ff]" size={21}/>
          </Link>

          <section className="rp-in mt-4 grid gap-3 rounded-[22px] border border-white/10 bg-[linear-gradient(145deg,#0b0c10,#07080b)] p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center" style={{animationDelay:".3s"}}>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#e0b241]/45 bg-[#e3b64f]/10 text-2xl shadow-[0_0_18px_rgba(227,182,79,.14)] sm:mx-0">📖</div>
            <div className="text-center sm:text-left"><h2 className="text-lg font-black">Herramientas digitales para estudiar, crear y trabajar</h2><p className="mt-2 text-sm leading-6 text-white/55">ROMIL PLUS reúne opciones para diseño, edición de video, inteligencia artificial y productividad.</p></div>
            <div className="flex justify-center gap-3 text-[10px] font-bold text-white/55 sm:block sm:space-y-1"><p>✓ Pago seguro</p><p>✓ Atención rápida</p><p>✓ Soporte en Perú</p></div>
          </section>
        </section>
      </main>
    </>
  );
}
