"use client";

import { useMemo, useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "@/components/CartProvider";

type PaymentMethod = "yape" | "plin" | "bcp" | "interbank" | "paypal";

const holder = "Milagros Olinda Quispe Venegas";
const whatsappNumber = "51970825741";

const paymentData = {
  yape: { label: "Yape", subtitle: "Paga escaneando el QR", qr: "0002010102113932184b659db5b05375a402477a73bb68105204561153036045802PE5906YAPERO6004Lima63047ACC" },
  plin: { label: "Plin", subtitle: "Paga escaneando el QR", qr: "0002015802PE0102115204482953036045912P2P Transfer6004Lima265600329751102dbd374d2b99a91b1c74ebda0d0116Plin Network P2P6304EE01" },
  bcp: { label: "BCP", subtitle: "Transferencia bancaria", account: "19109678540001", cci: "00219110967854000158" },
  interbank: { label: "Interbank", subtitle: "Transferencia bancaria", account: "8983392293592", cci: "00389801339229359248" },
  paypal: { label: "PayPal", subtitle: "Paga por PayPal", email: "milagroslove.1693@gmail.com", qr: "https://www.paypal.com/qrcodes/p2pqrc/92DEGPDN9GX8E", url: "https://www.paypal.com/qrcodes/p2pqrc/92DEGPDN9GX8E" },
} as const;

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("yape");
  const [copied, setCopied] = useState("");
  const selected = paymentData[method];

  const whatsappUrl = useMemo(() => {
    const products = items.map((item) => `• ${item.name} — S/ ${item.price.toFixed(2)}`).join("\n");
    const message = encodeURIComponent(`Hola, realicé un pedido en Romil Plus.\n\nProductos:\n${products || "Sin productos"}\n\nTotal: S/ ${total.toFixed(2)}\nMétodo de pago: ${selected.label}\n\nAdjunto mi comprobante de pago.`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  }, [items, total, selected.label]);

  const copyValue = async (value: string, key: string) => {
    try { await navigator.clipboard.writeText(value); setCopied(key); window.setTimeout(() => setCopied(""), 1500); } catch { setCopied(""); }
  };

  return (
    <main className="mx-auto min-h-[75vh] max-w-6xl px-4 py-14">
      <h1 className="text-4xl font-black">Métodos de pago</h1>
      <p className="mt-2 text-white/50">Elige cómo quieres pagar tu pedido.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <h2 className="text-xl font-bold">Elige un método</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {(Object.keys(paymentData) as PaymentMethod[]).map((key) => {
              const item = paymentData[key]; const active = method === key;
              return <button key={key} type="button" onClick={() => setMethod(key)} className={`rounded-2xl border px-3 py-4 text-center transition ${active ? "border-[#e3b64f] bg-[#e3b64f]/15 text-[#f5d98e]" : "border-white/10 bg-black/20 text-white/65 hover:border-white/25"}`}><span className="block font-black">{item.label}</span></button>;
            })}
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-2xl font-black">{selected.label}</p><p className="mt-1 text-sm text-white/50">{selected.subtitle}</p></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">Disponible</span></div>

            {(method === "yape" || method === "plin") && (
              <div className="mt-6 flex flex-col items-center rounded-2xl bg-white p-5 text-slate-950">
                <QRCodeSVG value={paymentData[method].qr} size={230} level="M" includeMargin />
                <p className="mt-4 text-center text-sm font-bold">Titular: {holder}</p>
                <p className="mt-1 text-center text-xs text-slate-500">Escanea el QR e ingresa el total de tu pedido.</p>
              </div>
            )}

            {(method === "bcp" || method === "interbank") && (() => {
              const bank = paymentData[method];
              return <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-wider text-white/40">Titular</p><p className="mt-1 font-bold">{holder}</p></div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-wider text-white/40">Número de cuenta</p><div className="mt-1 flex items-center justify-between gap-3"><p className="break-all font-bold">{bank.account}</p><button type="button" onClick={() => copyValue(bank.account, `${method}-account`)} className="shrink-0 rounded-lg border border-white/10 p-2 text-white/65" aria-label="Copiar número de cuenta">{copied === `${method}-account` ? <Check size={17} /> : <Copy size={17} />}</button></div></div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-wider text-white/40">CCI</p><div className="mt-1 flex items-center justify-between gap-3"><p className="break-all font-bold">{bank.cci}</p><button type="button" onClick={() => copyValue(bank.cci, `${method}-cci`)} className="shrink-0 rounded-lg border border-white/10 p-2 text-white/65" aria-label="Copiar CCI">{copied === `${method}-cci` ? <Check size={17} /> : <Copy size={17} />}</button></div></div>
              </div>;
            })()}

            {method === "paypal" && (
              <div className="mt-6">
                <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-slate-950"><QRCodeSVG value={paymentData.paypal.qr} size={230} level="M" includeMargin /><p className="mt-4 text-center text-sm font-bold">PayPal: {paymentData.paypal.email}</p></div>
                <a href={paymentData.paypal.url} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full rounded-xl bg-[#0070ba] px-4 py-3 text-center font-black text-white transition hover:brightness-110">Abrir PayPal</a>
              </div>
            )}
            <p className="mt-5 text-xs leading-5 text-white/45">Después de pagar, envía tu comprobante por WhatsApp para confirmar y coordinar la entrega.</p>
          </div>
        </section>
        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.05] p-6">
          <h2 className="text-xl font-bold">Resumen del pedido</h2>
          <div className="mt-5 space-y-3">{items.length === 0 ? <p className="text-sm text-white/45">Tu carrito está vacío.</p> : items.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span className="text-white/60">{item.name}</span><span className="shrink-0">S/ {item.price.toFixed(2)}</span></div>)}</div>
          <div className="mt-6 border-t border-white/10 pt-5"><div className="flex justify-between"><span className="font-bold">Total</span><span className="text-2xl font-black">S/ {total.toFixed(2)}</span></div></div>
          <a href={items.length > 0 ? whatsappUrl : undefined} target="_blank" rel="noopener noreferrer" className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-center font-black transition ${items.length > 0 ? "bg-emerald-500 text-white hover:bg-emerald-400" : "pointer-events-none bg-white/10 text-white/35"}`}><MessageCircle size={19} /> Enviar comprobante por WhatsApp</a>
          <p className="mt-3 text-center text-xs text-white/35">Método elegido: {selected.label}</p>
        </aside>
      </div>
    </main>
  );
}
