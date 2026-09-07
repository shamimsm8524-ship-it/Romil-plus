"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, Download, Eye, MessageCircle, ShieldCheck, Upload } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { supabase } from "@/lib/supabase";

type SupabaseLikeError = { message?: string; code?: string; details?: string; hint?: string };

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [paymentReported,setPaymentReported] = useState(false);
  const [checkingAuth,setCheckingAuth] = useState(true);
  const [savingOrder,setSavingOrder] = useState(false);
  const [saveError,setSaveError] = useState("");
  const [draftOrderId,setDraftOrderId] = useState("");
  const [submittedItems,setSubmittedItems] = useState<typeof items>([]);
  const [submittedTotal,setSubmittedTotal] = useState(0);
  const [receipt,setReceipt] = useState<File|null>(null);
  const [payerName,setPayerName] = useState("");

  const displayItems = paymentReported ? submittedItems : items;
  const displayTotal = paymentReported ? submittedTotal : total;

  useEffect(()=>{
    let active = true;
    const requireAccount = async()=>{
      if(!supabase){ window.location.replace("/login?next=%2Fcheckout"); return; }
      const {data} = await supabase.auth.getSession();
      if(!active) return;
      if(!data.session){ window.location.replace("/login?next=%2Fcheckout"); return; }
      setCheckingAuth(false);
    };
    requireAccount();
    return()=>{active=false;};
  },[]);

  const reportPayment = async()=>{
    if(!supabase || items.length===0 || paymentReported || savingOrder) return;
    if(!receipt){ setSaveError("Adjunta el comprobante de pago antes de enviarlo."); return; }
    if(receipt.size > 5*1024*1024){ setSaveError("El comprobante supera el máximo permitido de 5 MB."); return; }

    setSavingOrder(true);
    setSaveError("");

    try{
      const {data:sessionData} = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if(!user){ window.location.replace("/login?next=%2Fcheckout"); return; }

      const purchasedItems = [...items];
      const purchasedTotal = total;
      let currentOrderId = draftOrderId;

      if(!currentOrderId){
        currentOrderId = crypto.randomUUID();
        const {error:orderError} = await supabase.from("orders").insert({
          id: currentOrderId,
          user_id: user.id,
          customer_email: user.email||null,
          total: purchasedTotal,
          payment_method: "yape",
        });
        if(orderError) throw orderError;

        const orderItems = purchasedItems.map(item=>({
          order_id: currentOrderId,
          product_name: `${item.name} — ${item.duration}`,
          unit_price: item.price,
          quantity: 1,
        }));
        const {error:itemsError} = await supabase.from("order_items").insert(orderItems);
        if(itemsError) throw itemsError;
        setDraftOrderId(currentOrderId);
      }

      const safeName = String(receipt.name||"comprobante")
        .replace(/[^a-zA-Z0-9._-]/g,"_")
        .slice(-90);
      const receiptPath = `${user.id}/${currentOrderId}/${Date.now()}-${safeName}`;

      const {error:uploadError} = await supabase.storage
        .from("order-receipts")
        .upload(receiptPath,receipt,{contentType:receipt.type||"application/octet-stream",upsert:false});
      if(uploadError) throw uploadError;

      const {error:receiptError} = await supabase.rpc("submit_order_receipt",{
        p_order_id: currentOrderId,
        p_receipt_path: receiptPath,
        p_payer_name: payerName.trim()||null,
      });
      if(receiptError) throw receiptError;

      setSubmittedItems(purchasedItems);
      setSubmittedTotal(purchasedTotal);
      setPaymentReported(true);
      setDraftOrderId("");
      clear();
    }catch(err){
      console.error(err);
      const problem = err as SupabaseLikeError;
      const code = problem.code ? ` (${problem.code})` : "";
      setSaveError(`Error${code}: ${problem.message||"No se pudo enviar el comprobante"}`);
    }finally{
      setSavingOrder(false);
    }
  };

  if(checkingAuth){
    return <main className="mx-auto grid min-h-[75vh] max-w-md place-items-center px-4 py-14">
      <section className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-[#e3b64f]"/>
        <h1 className="mt-5 text-xl font-black">Verificando tu cuenta</h1>
        <p className="mt-2 text-sm text-white/50">Para comprar debes registrarte o iniciar sesión.</p>
      </section>
    </main>;
  }

  return <main className="mx-auto min-h-[75vh] max-w-6xl px-4 py-14">
    <h1 className="text-4xl font-black">Métodos de pago</h1>
    <p className="mt-2 text-white/50">Para Realizar el Pago Escanea este QR</p>

    <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
        <div className="rounded-3xl border border-[#d6b25e]/25 bg-black/25 p-5 sm:p-7">
          <div className="text-center">
            <p className="text-2xl font-black text-white">Para Realizar el Pago Escanea este QR</p>
            <p className="mt-3 text-base font-bold text-[#d6b25e]">Nombre: Romil Plus</p>
          </div>

          <div className="mx-auto mt-6 max-w-[520px] overflow-hidden rounded-[2rem] bg-white p-2 shadow-[0_18px_55px_rgba(0,0,0,.35)] sm:p-3">
            <img src="/qr-romil-plus.jpg" alt="Código QR para realizar el pago a Romil Plus" className="block h-auto w-full rounded-[1.6rem]"/>
          </div>

          <div className="mx-auto mt-4 grid w-full max-w-[520px] grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="/qr-romil-plus.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-black text-white transition hover:bg-white/[0.10]"
            >
              <Eye size={19}/>
              Ver QR
            </a>
            <a
              href="/qr-romil-plus.jpg"
              download="qr-romil-plus.jpg"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#d6b25e]/40 bg-[#d6b25e]/10 px-4 py-3 font-black text-[#f0d283] transition hover:bg-[#d6b25e]/20"
            >
              <Download size={19}/>
              Descargar QR
            </a>
          </div>

          <p className="mx-auto mt-3 max-w-[520px] text-center text-xs text-white/45">En celular, toca “Ver QR” y luego mantén presionada la imagen para guardarla en tu galería.</p>

          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-4">
            <div className="flex gap-3"><ShieldCheck className="text-amber-300" size={20}/><div><p className="font-bold text-amber-100">Entrega protegida</p><p className="mt-1 text-xs text-white/50">Tu producto no se entrega hasta que el pago haya sido confirmado.</p></div></div>
          </div>
        </div>
      </section>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.05] p-6">
        <h2 className="text-xl font-bold">{paymentReported?"Pedido registrado":"Resumen del pedido"}</h2>
        <div className="mt-5 space-y-3">
          {displayItems.length===0?<p className="text-sm text-white/45">Tu carrito está vacío.</p>:displayItems.map((item,index)=><div key={`${item.id}-${index}`} className="flex justify-between gap-4 text-sm"><span className="text-white/60">{item.name} — {item.duration}</span><span>S/ {item.price.toFixed(2)}</span></div>)}
        </div>
        <div className="mt-6 border-t border-white/10 pt-5"><div className="flex justify-between"><span className="font-bold">Total</span><span className="text-2xl font-black">S/ {displayTotal.toFixed(2)}</span></div></div>

        {!paymentReported&&<div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-2 text-[#e3b64f]"><Upload size={18}/><p className="text-xs font-black uppercase tracking-wider">Comprobante de pago</p></div>
            <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={e=>{setReceipt(e.target.files?.[0]||null);setSaveError("");}} className="mt-3 block w-full text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:font-bold file:text-black"/>
            <p className="mt-2 break-all text-xs text-white/40">{receipt?`${receipt.name} · ${Math.ceil(receipt.size/1024)} KB`:"Adjunta imagen o PDF (máx. 5 MB)."}</p>
          </div>
          <input value={payerName} onChange={e=>setPayerName(e.target.value)} placeholder="Nombre de quien realizó el pago (opcional)" className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3"/>
        </div>}

        {!paymentReported?<button type="button" onClick={reportPayment} disabled={items.length===0||savingOrder||!receipt} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e3b64f] px-4 py-3 font-black text-black disabled:opacity-40"><Check size={19}/>{savingOrder?"Enviando comprobante...":"Enviar comprobante"}</button>:<div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-4 text-center"><Clock3 className="mx-auto text-amber-300"/><p className="mt-2 font-black">✅ Comprobante enviado correctamente</p><p className="mt-1 text-xs">Tu pago está en revisión.</p></div>}

        {saveError&&<p className="mt-4 rounded-xl bg-red-400/10 p-3 text-sm text-red-200">{saveError}</p>}
        {displayItems.length>0&&<a href="/soporte" className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl border border-sky-500/55 bg-black/30 px-4 py-4 transition hover:bg-sky-500/10"><span className="flex items-center gap-3"><MessageCircle className="text-sky-400" size={28}/><span className="text-left font-black text-white">Chat de atención al cliente</span></span><span className="shrink-0 rounded-full border border-sky-500/50 bg-sky-500/10 px-2.5 py-1 text-xs font-bold text-sky-300"><span className="mr-1 text-emerald-400">●</span> En línea</span></a>}
        {paymentReported&&<a href="/mis-compras" className="mt-3 block text-center text-sm font-bold text-[#e3b64f]">Ver mi historial de compras</a>}
      </aside>
    </div>
  </main>;
}
