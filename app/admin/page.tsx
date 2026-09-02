"use client";

import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL="milagroslove.1693@gmail.com";

type OrderItem={
  id:string;
  order_id:string;
  product_name:string;
  unit_price:number;
  quantity:number;
  delivery_email:string|null;
  delivery_password:string|null;
  delivery_verification:string|null;
  delivery_link:string|null;
  delivery_notes:string|null;
};

type Order={
  id:string;
  user_id:string;
  customer_email:string|null;
  status:string;
  total:number;
  payment_method:string|null;
  created_at:string;
  receipt_path:string|null;
  receipt_payer_name:string|null;
  receipt_uploaded_at:string|null;
  order_items:OrderItem[];
};

type Delivery={email:string;password:string;verification:string;link:string;notes:string};
const emptyDelivery:Delivery={email:"",password:"",verification:"",link:"",notes:""};
const hasDelivery=(i:OrderItem)=>!!(i.delivery_email||i.delivery_password||i.delivery_verification||i.delivery_link||i.delivery_notes);
const isClosedStatus=(status:string)=>status==="delivered"||status==="cancelled"||status==="refunded";

export default function AdminPage(){
  const[orders,setOrders]=useState<Order[]>([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState("");
  const[forms,setForms]=useState<Record<string,Delivery>>({});
  const[feedback,setFeedback]=useState<Record<string,string>>({});
  const[saving,setSaving]=useState<Record<string,boolean>>({});
  const[editing,setEditing]=useState<Record<string,boolean>>({});

  const clickSound=()=>{
    try{
      const AC=window.AudioContext||(window as any).webkitAudioContext;
      const ctx=new AC();
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      osc.frequency.value=850;
      gain.gain.value=.05;
      osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.06);osc.onended=()=>ctx.close();
    }catch{}
  };

  const load=async()=>{
    if(!supabase){setError("Supabase no está configurado.");setLoading(false);return;}
    const{data:s}=await supabase.auth.getSession();
    const user=s.session?.user;
    if(!user){window.location.replace("/login?next=%2Fadmin");return;}
    if((user.email||"").toLowerCase()!==ADMIN_EMAIL){window.location.replace("/catalogo");return;}

    setError("");
    const{data:orderRows,error:orderError}=await supabase
      .from("orders")
      .select("id,user_id,customer_email,status,total,payment_method,created_at,receipt_path,receipt_payer_name,receipt_uploaded_at")
      .order("created_at",{ascending:false});
    if(orderError){setError(`${orderError.code||"Error"}: ${orderError.message}`);setLoading(false);return;}

    const ids=(orderRows||[]).map(o=>o.id);
    let itemRows:OrderItem[]=[];
    if(ids.length){
      const{data,error:itemError}=await supabase
        .from("order_items")
        .select("id,order_id,product_name,unit_price,quantity,delivery_email,delivery_password,delivery_verification,delivery_link,delivery_notes")
        .in("order_id",ids);
      if(itemError){setError(`${itemError.code||"Error"}: ${itemError.message}`);setLoading(false);return;}
      itemRows=(data||[]) as OrderItem[];
    }

    const rows=(orderRows||[]).map(o=>({...o,order_items:itemRows.filter(i=>i.order_id===o.id)})) as Order[];
    setOrders(rows);
    const next:Record<string,Delivery>={};
    itemRows.forEach(i=>next[i.id]={email:i.delivery_email||"",password:i.delivery_password||"",verification:i.delivery_verification||"",link:i.delivery_link||"",notes:i.delivery_notes||""});
    setForms(next);
    setLoading(false);
  };

  useEffect(()=>{load();},[]);

  const openReceipt=async(order:Order)=>{
    clickSound();
    if(!supabase||!order.receipt_path)return;
    const w=window.open("","_blank");
    try{
      const{data,error:e}=await supabase.storage.from("order-receipts").createSignedUrl(order.receipt_path,300);
      if(e)throw e;
      if(w)w.location=data.signedUrl;else window.location.href=data.signedUrl;
    }catch(err){
      console.error(err);
      if(w)w.close();
      setFeedback(p=>({...p,[order.id]:"❌ No se pudo abrir el comprobante."}));
    }
  };

  const changeStatus=async(id:string,status:string,current:string)=>{
    clickSound();
    if(!supabase)return;
    if(isClosedStatus(current)){setFeedback(p=>({...p,[id]:current==="delivered"?"✅ Este pedido ya fue entregado.":"Este pedido ya está cerrado."}));return;}
    setFeedback(p=>({...p,[id]:"Guardando..."}));
    const{error:e}=await supabase.from("orders").update({status}).eq("id",id);
    if(e){setFeedback(p=>({...p,[id]:`❌ ${e.code||"Error"}: ${e.message}`}));return;}
    setFeedback(p=>({...p,[id]:status==="paid"?"✅ Pago confirmado.":"✅ Estado actualizado."}));
    await load();
  };

  const cancelOrder=async(order:Order)=>{
    clickSound();
    if(!supabase||isClosedStatus(order.status))return;
    if(!window.confirm("¿Cancelar este pedido? Hazlo solo si verificaste que el pago NO se refleja."))return;
    setFeedback(p=>({...p,[order.id]:"Cancelando pedido..."}));
    const{error:e}=await supabase.from("orders").update({status:"cancelled"}).eq("id",order.id);
    if(e){setFeedback(p=>({...p,[order.id]:`❌ ${e.code||"Error"}: ${e.message}`}));return;}
    await load();
  };

  const setField=(itemId:string,key:keyof Delivery,value:string)=>setForms(p=>({...p,[itemId]:{...(p[itemId]||emptyDelivery),[key]:value}}));
  const beginEdit=(item:OrderItem)=>{clickSound();setEditing(p=>({...p,[item.id]:true}));};
  const cancelEdit=(item:OrderItem)=>{
    clickSound();
    setForms(p=>({...p,[item.id]:{email:item.delivery_email||"",password:item.delivery_password||"",verification:item.delivery_verification||"",link:item.delivery_link||"",notes:item.delivery_notes||""}}));
    setEditing(p=>({...p,[item.id]:false}));
  };

  const deliverItem=async(order:Order,item:OrderItem)=>{
    clickSound();
    if(!supabase||order.status==="cancelled"||order.status==="refunded")return;
    const alreadyDelivered=hasDelivery(item);
    if(alreadyDelivered&&!editing[item.id])return;
    const f=forms[item.id]||emptyDelivery;
    if(!f.email.trim()&&!f.password.trim()&&!f.verification.trim()&&!f.link.trim()&&!f.notes.trim()){
      setFeedback(p=>({...p,[item.id]:"❌ Completa al menos un dato de acceso."}));return;
    }
    if(alreadyDelivered&&!window.confirm("¿Actualizar los datos que verá el cliente?"))return;

    setSaving(p=>({...p,[item.id]:true}));
    let link=f.link.trim();if(link&&!/^https?:\/\//i.test(link))link=`https://${link}`;
    const{error:e}=await supabase.from("order_items").update({
      delivery_email:f.email.trim()||null,
      delivery_password:f.password.trim()||null,
      delivery_verification:f.verification.trim()||null,
      delivery_link:link||null,
      delivery_notes:f.notes.trim()||null,
    }).eq("id",item.id);
    if(e){setSaving(p=>({...p,[item.id]:false}));setFeedback(p=>({...p,[item.id]:`❌ ${e.code||"Error"}: ${e.message}`}));return;}

    const{data:latest}=await supabase.from("order_items").select("delivery_email,delivery_password,delivery_verification,delivery_link,delivery_notes").eq("order_id",order.id);
    const allDelivered=!!latest?.length&&latest.every((x:any)=>x.delivery_email||x.delivery_password||x.delivery_verification||x.delivery_link||x.delivery_notes);
    await supabase.from("orders").update({status:allDelivered?"delivered":"processing"}).eq("id",order.id);
    setSaving(p=>({...p,[item.id]:false}));setEditing(p=>({...p,[item.id]:false}));setFeedback(p=>({...p,[item.id]:"✅ Datos guardados correctamente."}));
    await load();
  };

  const delivered=orders.filter(o=>o.status==="delivered").length;
  const pending=orders.filter(o=>!isClosedStatus(o.status)).length;
  const cancelled=orders.filter(o=>o.status==="cancelled").length;
  const receipts=orders.filter(o=>!!o.receipt_path).length;

  return <main className="mx-auto min-h-[75vh] max-w-5xl px-4 py-14">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-sm font-bold uppercase tracking-wider text-[#e3b64f]">Administración</p><h1 className="mt-2 text-4xl font-black">Pedidos y comprobantes</h1><p className="mt-3 text-white/50">Aquí verás el comprobante y el correo exacto del cliente que lo envió.</p></div>
      <button type="button" onClick={()=>{setLoading(true);load();}} className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 font-black">↻ Actualizar</button>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-4"><p className="text-xs font-black uppercase tracking-wider text-amber-300">Por atender</p><p className="mt-2 text-4xl font-black">{pending}</p></div>
      <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.07] p-4"><p className="text-xs font-black uppercase tracking-wider text-violet-300">Comprobantes</p><p className="mt-2 text-4xl font-black">{receipts}</p></div>
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4"><p className="text-xs font-black uppercase tracking-wider text-emerald-300">Entregados</p><p className="mt-2 text-4xl font-black">{delivered}</p></div>
      <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.07] p-4"><p className="text-xs font-black uppercase tracking-wider text-red-300">Cancelados</p><p className="mt-2 text-4xl font-black">{cancelled}</p></div>
    </div>

    {loading&&<p className="mt-10 text-white/50">Cargando pedidos...</p>}
    {error&&<p className="mt-6 rounded-xl bg-red-400/10 p-4 text-red-200">{error}</p>}

    <div className="mt-8 space-y-5">
      {orders.map(o=>{
        const closed=isClosedStatus(o.status);
        const cancelledOrder=o.status==="cancelled";
        return <article key={o.id} className={`rounded-3xl border p-5 ${cancelledOrder?"border-red-400/20 bg-red-400/[0.03]":"border-white/10 bg-white/[0.04]"}`}>
          <div className="flex flex-wrap justify-between gap-3"><div><p className="font-mono text-sm text-[#e3b64f]">{o.id.slice(0,8).toUpperCase()}</p><p className="mt-1 text-xs text-white/40">{new Date(o.created_at).toLocaleString("es-PE")}</p></div><p className="text-xl font-black">S/ {Number(o.total).toFixed(2)}</p></div>

          <div className="mt-4 rounded-xl border border-[#e3b64f]/20 bg-[#e3b64f]/5 p-3">
            <p className="text-xs font-bold uppercase text-[#e3b64f]">Correo del cliente</p>
            <p className="mt-1 break-all font-bold">{o.customer_email||"Correo no registrado"}</p>
          </div>

          <div className="mt-3 rounded-xl border border-violet-400/20 bg-violet-400/[0.06] p-3">
            <p className="text-xs font-bold uppercase text-violet-300">Comprobante de pago</p>
            {o.receipt_path?<>
              <p className="mt-1 break-all text-sm"><b>Enviado por:</b> {o.customer_email||"Correo no registrado"}</p>
              <p className="mt-1 text-xs text-white/50"><b>Pagador:</b> {o.receipt_payer_name||"No indicado"}</p>
              {o.receipt_uploaded_at&&<p className="mt-1 text-xs text-white/40">Recibido: {new Date(o.receipt_uploaded_at).toLocaleString("es-PE")}</p>}
              <button type="button" onClick={()=>openReceipt(o)} className="mt-3 rounded-xl bg-violet-500 px-4 py-2 text-sm font-black text-white">👁 Ver comprobante</button>
            </>:<p className="mt-1 text-sm text-white/45">Aún no se adjuntó comprobante.</p>}
          </div>

          <p className="mt-4 text-sm">Estado: <b className={cancelledOrder?"text-red-300":""}>{cancelledOrder?"CANCELADO":o.status}</b></p>
          <p className="mt-1 text-xs text-white/40">Método: {o.payment_method?.toUpperCase()||"—"}</p>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button type="button" disabled={closed||!o.receipt_path} onClick={()=>changeStatus(o.id,"paid",o.status)} className="rounded-xl bg-emerald-500 px-4 py-3 font-black disabled:opacity-40">Confirmar pago</button>
            <button type="button" disabled={closed} onClick={()=>changeStatus(o.id,"processing",o.status)} className="rounded-xl bg-amber-400 px-4 py-3 font-black text-black disabled:opacity-40">Procesando</button>
            <button type="button" disabled={closed} onClick={()=>cancelOrder(o)} className="rounded-xl bg-red-500 px-4 py-3 font-black text-white disabled:opacity-40">Cancelar pedido</button>
          </div>
          {feedback[o.id]&&<p className="mt-3 rounded-xl border border-white/10 p-3 text-sm font-bold">{feedback[o.id]}</p>}

          <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
            <h2 className="font-black text-[#e3b64f]">Cuentas a entregar ({o.order_items.length})</h2>
            {o.order_items.map((item,index)=>{
              const f=forms[item.id]||emptyDelivery;
              const sent=hasDelivery(item);
              const unlocked=(!sent||!!editing[item.id])&&!cancelledOrder&&o.status!=="refunded";
              const inputClass=`rounded-xl border border-white/10 px-4 py-3 ${unlocked?"bg-black/30":"cursor-not-allowed bg-white/[0.03] text-white/60"}`;
              return <section key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wider text-violet-300">Cuenta {index+1}</p><p className="mt-1 font-black">{item.product_name}</p></div>{sent&&<span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">Enviada</span>}</div>
                <div className="mt-4 grid gap-3">
                  <input disabled={!unlocked} value={f.email} onChange={e=>setField(item.id,"email",e.target.value)} placeholder="Correo / usuario" className={inputClass}/>
                  <input disabled={!unlocked} value={f.password} onChange={e=>setField(item.id,"password",e.target.value)} placeholder="Contraseña" className={inputClass}/>
                  <input disabled={!unlocked} value={f.verification} onChange={e=>setField(item.id,"verification",e.target.value)} placeholder="Código o verificación" className={inputClass}/>
                  <input disabled={!unlocked} value={f.link} onChange={e=>setField(item.id,"link",e.target.value)} placeholder="Enlace de acceso" className={inputClass}/>
                  <textarea disabled={!unlocked} value={f.notes} onChange={e=>setField(item.id,"notes",e.target.value)} placeholder="Instrucciones" rows={2} className={inputClass}/>
                  {cancelledOrder?<p className="rounded-xl bg-red-400/10 p-3 text-center text-sm font-black text-red-200">Pedido cancelado — entrega bloqueada</p>:sent&&!editing[item.id]?<button type="button" onClick={()=>beginEdit(item)} className="rounded-xl border border-[#e3b64f]/40 bg-[#e3b64f]/10 px-4 py-3 font-black text-[#e3b64f]">✏️ Editar datos</button>:<div className="grid gap-2 sm:grid-cols-2">{sent&&<button type="button" disabled={!!saving[item.id]} onClick={()=>cancelEdit(item)} className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 font-black">Cancelar</button>}<button type="button" disabled={!!saving[item.id]||!o.receipt_path} onClick={()=>deliverItem(o,item)} className="rounded-xl bg-[#e3b64f] px-4 py-3 font-black text-black disabled:opacity-40">{saving[item.id]?"Guardando...":sent?"💾 Guardar cambios":`Enviar cuenta ${index+1}`}</button></div>}
                  {feedback[item.id]&&<p className="rounded-xl border border-white/10 p-3 text-sm font-bold">{feedback[item.id]}</p>}
                </div>
              </section>;
            })}
          </div>
        </article>;
      })}
    </div>
  </main>;
}
