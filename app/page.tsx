import Link from "next/link";
import { Headphones, MessageCircle, ShieldCheck, ShoppingBag, ShoppingCart, User, Zap } from "lucide-react";
import { products } from "@/lib/products";

const featured = products.filter(p => ["canva-pro","capcut-pro","gemini-pro"].includes(p.id));

export default function Home() {
  return (
    <>
      <style>{`body>div>header,body>div>footer{display:none!important}`}</style>
      <main className="min-h-screen bg-[#030303] text-white">
        <header className="border-b border-[#8f6927]/30 bg-black">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:px-6 min-[700px]:py-3 lg:px-7">
            <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ROMIL PLUS - tienda de suscripciones digitales en Perú">
              <div className="h-[78px] w-[92px] shrink-0 overflow-visible sm:h-[92px] sm:w-[110px] min-[700px]:h-[82px] min-[700px]:w-[122px] lg:h-[88px] lg:w-[132px] xl:h-[92px] xl:w-[138px]">
                <img src="/logo-romil-plus.png" alt="ROMIL PLUS, tienda digital en Perú" className="h-full w-full object-contain min-[700px]:scale-[1.08] lg:scale-[1.1]" />
              </div>
            </Link>
            <div className="flex gap-2 sm:gap-3 min-[700px]:gap-2.5 lg:gap-3">
              <Link href="/soporte" aria-label="Chat" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white shadow-[0_0_18px_rgba(213,165,54,.08)] sm:h-14 sm:w-14 min-[700px]:h-[52px] min-[700px]:w-[52px] lg:h-14 lg:w-14"><MessageCircle className="min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" size={23}/></Link>
              <Link href="/login" aria-label="Cuenta" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white sm:h-14 sm:w-14 min-[700px]:h-[52px] min-[700px]:w-[52px] lg:h-14 lg:w-14"><User className="min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" size={22}/></Link>
              <Link href="/carrito" aria-label="Carrito" className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d6a53b]/55 bg-black text-white sm:h-14 sm:w-14 min-[700px]:h-[52px] min-[700px]:w-[52px] lg:h-14 lg:w-14"><ShoppingCart className="min-[700px]:h-6 min-[700px]:w-6 lg:h-7 lg:w-7" size={22}/></Link>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 pt-4 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:pt-3">
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
            <div className="flex min-h-[92px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center sm:gap-3 min-[700px]:min-h-[70px]"><ShieldCheck className="shrink-0 text-[#e6b84f] min-[700px]:h-[22px] min-[700px]:w-[22px]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm min-[700px]:text-xs">Garantía</p><p className="mt-1 text-[10px] font-bold text-[#e6b84f] sm:text-xs min-[700px]:text-[11px]">12 meses</p></div></div>
            <div className="flex min-h-[92px] items-center justify-center gap-2 border-r border-white/10 px-2 text-center sm:gap-3 min-[700px]:min-h-[70px]"><Zap className="shrink-0 text-[#e6b84f] min-[700px]:h-[22px] min-[700px]:w-[22px]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm min-[700px]:text-xs">Entrega</p><p className="mt-1 text-[10px] font-bold sm:text-xs min-[700px]:text-[11px]">Inmediata</p></div></div>
            <div className="flex min-h-[92px] items-center justify-center gap-2 px-2 text-center sm:gap-3 min-[700px]:min-h-[70px]"><Headphones className="shrink-0 text-[#e6b84f] min-[700px]:h-[22px] min-[700px]:w-[22px]" size={25}/><div><p className="text-[11px] font-black uppercase sm:text-sm min-[700px]:text-xs">Soporte</p><p className="mt-1 text-[10px] font-bold sm:text-xs min-[700px]:text-[11px]">24/7</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pt-5 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:pt-4">
          <div className="rounded-3xl border border-[#a97a25]/45 bg-[radial-gradient(circle_at_90%_100%,rgba(230,184,79,.16),transparent_33%),linear-gradient(135deg,#0d0d0d,#111)] px-5 py-7 text-center shadow-[0_0_28px_rgba(197,139,33,.08)] sm:py-9 min-[700px]:py-5">
            <h1 className="text-3xl font-black sm:text-4xl min-[700px]:text-[28px]">Suscripciones digitales en Perú con <span className="text-[#e3b64f]">ROMIL PLUS</span></h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/65 sm:text-base min-[700px]:text-sm">Encuentra herramientas digitales para diseño, edición, productividad e inteligencia artificial, con entrega rápida y soporte.</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 min-[700px]:max-w-[900px] min-[700px]:py-4">
          <div className="rounded-3xl border border-white/10 bg-[#080808] p-4 sm:p-6 min-[700px]:p-4">
            <div className="text-center"><h2 className="text-2xl font-black sm:text-3xl min-[700px]:text-[24px]">PRODUCTOS <span className="text-[#e3b64f]">DESTACADOS</span></h2><div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#e3b64f] min-[700px]:mt-2"/></div>
            <div className="mt-6 space-y-3 min-[700px]:mt-4 min-[700px]:space-y-2.5">
              {featured.map((p)=><Link key={p.id} href={`/producto/${p.id}`} aria-label={`Ver ${p.name} en ROMIL PLUS`} className="grid grid-cols-[112px_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#101010] to-[#0a0a0a] p-3 transition hover:border-[#e3b64f]/40 sm:grid-cols-[140px_1fr_auto] min-[700px]:grid-cols-[104px_1fr_auto] min-[700px]:gap-3 min-[700px]:p-2.5">
                <img src={p.image || "/logo-romil-plus.png"} alt={`${p.name} - suscripción digital`} className="h-28 w-28 rounded-2xl bg-white object-cover sm:h-32 sm:w-32 min-[700px]:h-24 min-[700px]:w-24"/>
                <div className="min-w-0"><h2 className="text-lg font-black sm:text-xl min-[700px]:text-base">{p.name}</h2><p className="mt-2 text-sm text-white/60 min-[700px]:mt-1 min-[700px]:text-xs">Suscripción: <span className="font-bold text-[#e3b64f]">{p.duration}</span></p><p className="mt-3 inline-block rounded-xl border border-[#b17f26]/40 px-3 py-2 text-lg font-black text-[#e3b64f] min-[700px]:mt-2 min-[700px]:px-2.5 min-[700px]:py-1.5 min-[700px]:text-base">S/ {Number(p.price).toFixed(2)}</p></div>
                <span className="text-3xl text-white/75 min-[700px]:text-2xl">›</span>
              </Link>)}
            </div>
            <Link href="/catalogo" className="mt-5 flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-[#d5a536]/55 bg-black px-4 font-black min-[700px]:mt-4 min-[700px]:min-h-[48px] min-[700px]:text-sm">VER CATÁLOGO DE SUSCRIPCIONES DIGITALES <ShoppingBag size={18} className="text-[#e3b64f]"/></Link>
          </div>

          <Link href="/catalogo" className="mt-4 flex items-center gap-4 rounded-3xl border border-[#a97a25]/45 bg-[linear-gradient(90deg,#0a0a0a,#171107,#0b0b0b)] p-4 min-[700px]:mt-3 min-[700px]:p-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e3b64f]/10 text-2xl min-[700px]:h-10 min-[700px]:w-10 min-[700px]:text-xl">🏷️</div>
            <div className="min-w-0 flex-1"><p className="font-black text-[#e3b64f] min-[700px]:text-sm">PROMOCIÓN POR TIEMPO LIMITADO</p><p className="mt-1 text-sm text-white/60 min-[700px]:text-xs">Revisa las ofertas disponibles en nuestras suscripciones digitales.</p></div>
            <span className="text-2xl">›</span>
          </Link>

          <section className="mt-5 rounded-3xl border border-white/10 bg-[#080808] p-5 text-center sm:p-6">
            <h2 className="text-xl font-black">Herramientas digitales para estudiar, crear y trabajar</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-white/55">ROMIL PLUS reúne opciones digitales orientadas a diseño, edición de video, inteligencia artificial y productividad. Consulta cada producto para conocer su duración, precio y condiciones antes de comprar.</p>
          </section>
        </section>
      </main>
    </>
  );
}
