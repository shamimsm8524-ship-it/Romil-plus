import Link from "next/link";
import { Headphones, LogIn, MessageCircle, ShieldCheck, ShoppingBag, ShoppingCart, User, Zap } from "lucide-react";
import { products } from "@/lib/products";

const featured = products.filter(p => ["canva-pro","capcut-pro","gemini-pro"].includes(p.id));

export default function Home() {
  return (
    <>
      <style>{`body>div>header,body>div>footer{display:none!important}`}</style>
      <main className="min-h-screen bg-[#030303] text-white">
        <header className="border-b border-[#8f6927]/30 bg-black">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 min-[700px]:px-8 min-[700px]:py-4 lg:px-10">
            <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ROMIL PLUS">
              <div className="h-[78px] w-[92px] shrink-0 overflow-visible sm:h-[92px] sm:w-[110px] min-[700px]:h-[104px] min-[700px]:w-[150px] lg:h-[112px] lg:w-[165px] xl:h-[120px] xl:w-[180px]">
                <img src="/logo-romil-plus.png" alt="ROMIL PLUS" className="h-full w-full object-contain min-[700px]:scale-[1.18] lg:scale-[1.22] xl:scale-[1.25]" />
              </div>
            </Link>
            <div className="flex gap-2 sm:gap-3 min-[700px]:gap-3 lg:gap-4">
              <Link href="/soporte" aria-label="Chat" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white shadow-[0_0_18px_rgba(213,165,54,.08)] sm:h-14 sm:w-14 min-[700px]:h-[60px] min-[700px]:w-[60px] lg:h-16 lg:w-16"><MessageCircle className="min-[700px]:h-7 min-[700px]:w-7 lg:h-8 lg:w-8" size={23}/></Link>
              <Link href="/login" aria-label="Cuenta" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white sm:h-14 sm:w-14 min-[700px]:h-[60px] min-[700px]:w-[60px] lg:h-16 lg:w-16"><User className="min-[700px]:h-7 min-[700px]:w-7 lg:h-8 lg:w-8" size={22}/></Link>
              <Link href="/login" aria-label="Ingresar" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-black text-white sm:h-14 sm:w-14 min-[700px]:h-[60px] min-[700px]:w-[60px] lg:h-16 lg:w-16"><LogIn className="min-[700px]:h-7 min-[700px]:w-7 lg:h-8 lg:w-8" size={22}/></Link>
              <Link href="/carrito" aria-label="Carrito" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white sm:h-14 sm:w-14 min-[700px]:h-[60px] min-[700px]:w-[60px] lg:h-16 lg:w-16"><ShoppingCart className="min-[700px]:h-7 min-[700px]:w-7 lg:h-8 lg:w-8" size={22}/></Link>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 pt-4 sm:px-6">
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
            <div className="flex min-h-[92px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center sm:gap-3"><ShieldCheck className="shrink-0 text-[#e6b84f]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm">Garantía</p><p className="mt-1 text-[10px] font-bold text-[#e6b84f] sm:text-xs">12 meses</p></div></div>
            <div className="flex min-h-[92px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center sm:gap-3"><Zap className="shrink-0 text-[#e6b84f]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm">Entrega</p><p className="mt-1 text-[10px] font-bold sm:text-xs">Inmediata</p></div></div>
            <div className="flex min-h-[92px] items-center justify-center gap-2 px-2 text-center sm:gap-3"><Headphones className="shrink-0 text-[#e6b84f]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm">Soporte</p><p className="mt-1 text-[10px] font-bold sm:text-xs">24/7</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
          <div className="rounded-3xl border border-[#a97a25]/45 bg-[radial-gradient(circle_at_90%_100%,rgba(230,184,79,.16),transparent_33%),linear-gradient(135deg,#0d0d0d,#111)] px-5 py-7 text-center shadow-[0_0_28px_rgba(197,139,33,.08)] sm:py-9">
            <h1 className="text-3xl font-black sm:text-4xl">Bienvenido a <span className="text-[#e3b64f]">ROMIL PLUS</span></h1>
            <p className="mt-2 text-sm text-white/65 sm:text-base">Tu tienda de suscripciones digitales premium</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-[#080808] p-4 sm:p-6">
            <div className="text-center"><h2 className="text-2xl font-black sm:text-3xl">PRODUCTOS <span className="text-[#e3b64f]">DESTACADOS</span></h2><div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#e3b64f]"/></div>
            <div className="mt-6 space-y-3">
              {featured.map((p)=><Link key={p.id} href={`/producto/${p.id}`} className="grid grid-cols-[112px_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#101010] to-[#0a0a0a] p-3 transition hover:border-[#e3b64f]/40 sm:grid-cols-[140px_1fr_auto]">
                <img src={p.image || "/logo-romil-plus.png"} alt={p.name} className="h-28 w-28 rounded-2xl bg-white object-cover sm:h-32 sm:w-32"/>
                <div className="min-w-0"><p className="text-lg font-black sm:text-xl">{p.name}</p><p className="mt-2 text-sm text-white/60">Suscripción: <span className="font-bold text-[#e3b64f]">{p.duration}</span></p><p className="mt-3 inline-block rounded-xl border border-[#b17f26]/40 px-3 py-2 text-lg font-black text-[#e3b64f]">S/ {Number(p.price).toFixed(2)}</p></div>
                <span className="text-3xl text-white/75">›</span>
              </Link>)}
            </div>
            <Link href="/catalogo" className="mt-5 flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-[#d5a536]/55 bg-black px-4 font-black">VER TODOS LOS PRODUCTOS <ShoppingBag size={18} className="text-[#e3b64f]"/></Link>
          </div>

          <Link href="/catalogo" className="mt-4 flex items-center gap-4 rounded-3xl border border-[#a97a25]/45 bg-[linear-gradient(90deg,#0a0a0a,#171107,#0b0b0b)] p-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e3b64f]/10 text-2xl">🏷️</div>
            <div className="min-w-0 flex-1"><p className="font-black text-[#e3b64f]">PROMOCIÓN POR TIEMPO LIMITADO</p><p className="mt-1 text-sm text-white/60">Descuentos especiales en nuestras suscripciones</p></div>
            <span className="text-2xl">›</span>
          </Link>
        </section>
      </main>
    </>
  );
}
