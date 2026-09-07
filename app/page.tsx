import Link from "next/link";
import { ArrowRight, Headphones, MessageCircle, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, User, Zap } from "lucide-react";
import { products } from "@/lib/products";

const featured = products.filter(p => ["canva-pro","capcut-pro","gemini-pro"].includes(p.id));

export default function Home() {
  return (
    <>
      <style>{`
        body>div>header,body>div>footer{display:none!important}
        @keyframes homeFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes homeGlow{0%,100%{opacity:.38;transform:scale(.96)}50%{opacity:.85;transform:scale(1.06)}}
        @keyframes homePulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(227,182,79,.18)}50%{transform:scale(1.04);box-shadow:0 0 0 8px rgba(227,182,79,0)}}
        @keyframes homeShine{0%{transform:translateX(-140%)}60%,100%{transform:translateX(180%)}}
        @keyframes homeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .home-fade{animation:homeFadeUp .62s ease-out both}
        .home-card{transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease;background:linear-gradient(90deg,#101010,#0a0a0a)}
        .home-card:hover{transform:translateY(-3px) scale(1.01);border-color:rgba(227,182,79,.56);box-shadow:0 14px 35px rgba(0,0,0,.35),0 0 24px rgba(227,182,79,.09)}
        .home-card:hover .home-arrow{transform:translateX(5px);color:#e3b64f}
        .home-arrow{transition:transform .22s ease,color .22s ease}
        .home-benefit{transition:background .2s ease,transform .2s ease}
        .home-benefit:hover{background:rgba(227,182,79,.055);transform:translateY(-1px)}
        .home-cta{position:relative;overflow:hidden}
        .home-cta:after{content:"";position:absolute;inset:-30% auto -30% -35%;width:28%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:homeShine 3.8s ease-in-out infinite}
        .home-float{animation:homeFloat 2.8s ease-in-out infinite}
        .home-pulse{animation:homePulse 2.4s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.home-fade,.home-float,.home-pulse,.home-cta:after{animation:none!important}.home-card,.home-arrow,.home-benefit{transition:none!important}}
      `}</style>
      <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
        <header className="border-b border-[#8f6927]/30 bg-black">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:px-6 min-[700px]:py-3 lg:px-7">
            <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ROMIL PLUS - tienda de suscripciones digitales en Perú">
              <div className="home-float h-[78px] w-[92px] shrink-0 overflow-visible sm:h-[92px] sm:w-[110px] min-[700px]:h-[82px] min-[700px]:w-[122px] lg:h-[88px] lg:w-[132px] xl:h-[92px] xl:w-[138px]">
                <img src="/logo-romil-plus.png" alt="ROMIL PLUS, tienda digital en Perú" className="h-full w-full object-contain min-[700px]:scale-[1.08] lg:scale-[1.1]" />
              </div>
            </Link>
            <div className="flex gap-2 sm:gap-3 min-[700px]:gap-2.5 lg:gap-3">
              <Link href="/soporte" aria-label="Chat" className="group grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white shadow-[0_0_18px_rgba(213,165,54,.08)] transition hover:-translate-y-0.5 hover:border-[#e3b64f] hover:bg-[#e3b64f]/10 sm:h-14 sm:w-14 min-[700px]:h-[52px] min-[700px]:w-[52px] lg:h-14 lg:w-14"><MessageCircle className="transition group-hover:scale-110 min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" size={23}/></Link>
              <Link href="/login" aria-label="Cuenta" className="group grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white transition hover:-translate-y-0.5 hover:border-[#e3b64f] hover:bg-[#e3b64f]/10 sm:h-14 sm:w-14 min-[700px]:h-[52px] min-[700px]:w-[52px] lg:h-14 lg:w-14"><User className="transition group-hover:scale-110 min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" size={22}/></Link>
              <Link href="/carrito" aria-label="Carrito" className="group grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white transition hover:-translate-y-0.5 hover:border-[#e3b64f] hover:bg-[#e3b64f]/10 sm:h-14 sm:w-14 min-[700px]:h-[52px] min-[700px]:w-[52px] lg:h-14 lg:w-14"><ShoppingCart className="transition group-hover:scale-110 min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" size={22}/></Link>
            </div>
          </div>
        </header>

        <section className="home-fade mx-auto max-w-5xl px-4 pt-4 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:pt-3">
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_12px_32px_rgba(0,0,0,.22)]">
            <div className="home-benefit flex min-h-[92px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center sm:gap-3 min-[700px]:min-h-[70px]"><ShieldCheck className="shrink-0 text-[#e6b84f] min-[700px]:h-[22px] min-[700px]:w-[22px]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm min-[700px]:text-xs">Garantía</p><p className="mt-1 text-[10px] font-bold text-[#e6b84f] sm:text-xs min-[700px]:text-[11px]">12 meses</p></div></div>
            <div className="home-benefit flex min-h-[92px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center sm:gap-3 min-[700px]:min-h-[70px]"><Zap className="shrink-0 text-[#e6b84f] min-[700px]:h-[22px] min-[700px]:w-[22px]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm min-[700px]:text-xs">Entrega</p><p className="mt-1 text-[10px] font-bold sm:text-xs min-[700px]:text-[11px]">Inmediata</p></div></div>
            <div className="home-benefit flex min-h-[92px] items-center justify-center gap-2 px-2 text-center sm:gap-3 min-[700px]:min-h-[70px]"><Headphones className="shrink-0 text-[#e6b84f] min-[700px]:h-[22px] min-[700px]:w-[22px]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm min-[700px]:text-xs">Soporte</p><p className="mt-1 text-[10px] font-bold sm:text-xs min-[700px]:text-[11px]">24/7</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pt-5 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:pt-4">
          <div className="home-fade relative overflow-hidden rounded-3xl border border-[#a97a25]/50 bg-[radial-gradient(circle_at_90%_100%,rgba(230,184,79,.18),transparent_34%),linear-gradient(135deg,#0d0d0d,#111)] px-5 py-7 text-center shadow-[0_0_34px_rgba(197,139,33,.10)] sm:py-9 min-[700px]:py-6" style={{animationDelay:".08s"}}>
            <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#e3b64f]/10 blur-3xl" style={{animation:"homeGlow 3.4s ease-in-out infinite"}}/>
            <div className="pointer-events-none absolute -bottom-20 -left-14 h-48 w-48 rounded-full bg-[#9c6d1f]/10 blur-3xl" style={{animation:"homeGlow 4.2s ease-in-out infinite"}}/>
            <div className="relative z-10">
              <div className="home-pulse mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#e3b64f]/35 bg-[#e3b64f]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[.12em] text-[#f0cb76] sm:text-xs">
                <Sparkles size={14}/> Ofertas y productos digitales
              </div>
              <h1 className="text-3xl font-black sm:text-4xl min-[700px]:text-[28px]">Suscripciones digitales en Perú con <span className="text-[#e3b64f]">ROMIL PLUS</span></h1>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/65 sm:text-base min-[700px]:text-sm">Encuentra herramientas digitales para diseño, edición, productividad e inteligencia artificial, con entrega rápida y soporte.</p>
              <div className="mx-auto mt-5 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:justify-center min-[700px]:mt-4">
                <Link href="/catalogo" className="home-cta flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#e3b64f] px-5 text-sm font-black text-black transition hover:scale-[1.02] hover:bg-[#f0c85d] min-[700px]:min-h-[44px]">
                  Ver catálogo <ArrowRight size={17}/>
                </Link>
                <Link href="/soporte" className="flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[.035] px-5 text-sm font-black text-white transition hover:border-[#e3b64f]/60 hover:bg-[#e3b64f]/10 min-[700px]:min-h-[44px]">
                  <MessageCircle size={17}/> Hablar con soporte
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:py-4">
          <div className="home-fade rounded-3xl border border-white/10 bg-[#080808] p-4 shadow-[0_18px_50px_rgba(0,0,0,.24)] sm:p-6 min-[700px]:p-4" style={{animationDelay:".16s"}}>
            <div className="text-center">
              <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/55"><Sparkles size={12} className="text-[#e3b64f]"/> Selección destacada</div>
              <h2 className="text-2xl font-black sm:text-3xl min-[700px]:text-[24px]">PRODUCTOS <span className="text-[#e3b64f]">DESTACADOS</span></h2>
              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#e3b64f] shadow-[0_0_12px_rgba(227,182,79,.35)] min-[700px]:mt-2"/>
            </div>
            <div className="mt-6 space-y-3 min-[700px]:mt-4 min-[700px]:space-y-2.5">
              {featured.map((p,index)=><Link key={p.id} href={`/producto/${p.id}`} aria-label={`Ver ${p.name} en ROMIL PLUS`} className="home-card home-fade group grid grid-cols-[112px_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 p-3 sm:grid-cols-[140px_1fr_auto] min-[700px]:grid-cols-[104px_1fr_auto] min-[700px]:gap-3 min-[700px]:p-2.5" style={{animationDelay:`${.22 + index*.08}s`}}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={p.image || "/logo-romil-plus.png"} alt={`${p.name} - suscripción digital`} className="h-28 w-28 bg-white object-cover transition duration-300 group-hover:scale-[1.05] sm:h-32 sm:w-32 min-[700px]:h-24 min-[700px]:w-24"/>
                  <span className="absolute right-1.5 top-1.5 rounded-full border border-black/20 bg-black/70 px-2 py-1 text-[9px] font-black text-[#f0cb76] backdrop-blur">TOP</span>
                </div>
                <div className="min-w-0"><h2 className="text-lg font-black sm:text-xl min-[700px]:text-base">{p.name}</h2><p className="mt-2 text-sm text-white/60 min-[700px]:mt-1 min-[700px]:text-xs">Suscripción: <span className="font-bold text-[#e3b64f]">{p.duration}</span></p><p className="mt-3 inline-block rounded-xl border border-[#b17f26]/40 bg-[#e3b64f]/[.04] px-3 py-2 text-lg font-black text-[#e3b64f] min-[700px]:mt-2 min-[700px]:px-2.5 min-[700px]:py-1.5 min-[700px]:text-base">S/ {Number(p.price).toFixed(2)}</p></div>
                <span className="home-arrow text-3xl text-white/75 min-[700px]:text-2xl">›</span>
              </Link>)}
            </div>
            <Link href="/catalogo" className="home-cta mt-5 flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-[#d5a536]/65 bg-[linear-gradient(90deg,#0a0a0a,#161006,#0a0a0a)] px-4 font-black transition hover:border-[#e3b64f] hover:shadow-[0_0_24px_rgba(227,182,79,.10)] min-[700px]:mt-4 min-[700px]:min-h-[48px] min-[700px]:text-sm">VER CATÁLOGO DE SUSCRIPCIONES DIGITALES <ShoppingBag size={18} className="text-[#e3b64f]"/></Link>
          </div>

          <Link href="/catalogo" className="home-fade group mt-4 flex items-center gap-4 rounded-3xl border border-[#a97a25]/45 bg-[linear-gradient(90deg,#0a0a0a,#171107,#0b0b0b)] p-4 transition hover:-translate-y-0.5 hover:border-[#e3b64f]/70 hover:shadow-[0_12px_30px_rgba(0,0,0,.28)] min-[700px]:mt-3 min-[700px]:p-3" style={{animationDelay:".46s"}}>
            <div className="home-pulse grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e3b64f]/10 text-2xl min-[700px]:h-10 min-[700px]:w-10 min-[700px]:text-xl">🏷️</div>
            <div className="min-w-0 flex-1"><p className="font-black text-[#e3b64f] min-[700px]:text-sm">PROMOCIÓN POR TIEMPO LIMITADO</p><p className="mt-1 text-sm text-white/60 min-[700px]:text-xs">Revisa las ofertas disponibles en nuestras suscripciones digitales.</p></div>
            <span className="home-arrow text-2xl">›</span>
          </Link>

          <section className="home-fade relative mt-5 overflow-hidden rounded-3xl border border-white/10 bg-[#080808] p-5 text-center sm:p-6" style={{animationDelay:".54s"}}>
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#e3b64f]/70 to-transparent"/>
            <h2 className="text-xl font-black">Herramientas digitales para estudiar, crear y trabajar</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-white/55">ROMIL PLUS reúne opciones digitales orientadas a diseño, edición de video, inteligencia artificial y productividad. Consulta cada producto para conocer su duración, precio y condiciones antes de comprar.</p>
            <Link href="/catalogo" className="mx-auto mt-4 inline-flex items-center gap-2 text-sm font-black text-[#e3b64f] transition hover:gap-3">Explorar productos <ArrowRight size={16}/></Link>
          </section>
        </section>
      </main>
    </>
  );
}
