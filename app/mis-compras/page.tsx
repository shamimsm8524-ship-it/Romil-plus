"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type OrderItem = {
  id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  delivery_status: string;
  expires_at: string | null;
};

type Order = {
  id: string;
  status: string;
  total: number;
  payment_method: string | null;
  created_at: string;
  order_items: OrderItem[];
};

const statusLabel: Record<string, string> = {
  pending: "Pendiente de verificación",
  paid: "Pagado",
  processing: "Procesando",
  delivered: "Entregado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

export default function MisComprasPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      if (!supabase) {
        window.location.replace("/login?next=%2Fmis-compras");
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        window.location.replace("/login?next=%2Fmis-compras");
        return;
      }

      const { data, error: ordersError } = await supabase
        .from("orders")
        .select("id,status,total,payment_method,created_at,order_items(id,product_name,unit_price,quantity,delivery_status,expires_at)")
        .order("created_at", { ascending: false });

      if (!active) return;
      if (ordersError) setError("No se pudo cargar tu historial de compras.");
      else setOrders((data ?? []) as Order[]);
      setLoading(false);
    };

    loadOrders();
    return () => { active = false; };
  }, []);

  return (
    <main className="mx-auto min-h-[75vh] max-w-6xl px-4 py-14">
      <p className="text-sm font-bold uppercase tracking-wider text-violet-300">Área del cliente</p>
      <h1 className="mt-2 text-4xl font-black">Mis compras</h1>
      <p className="mt-3 text-white/50">Tu historial de pedidos queda guardado en tu cuenta.</p>

      {loading && <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">Cargando tus compras...</div>}
      {error && <div className="mt-10 rounded-3xl border border-red-400/20 bg-red-400/10 p-6 text-red-200">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/[0.025] p-10 text-center">
          <p className="text-xl font-bold">Aún no tienes compras</p>
          <p className="mt-2 text-sm text-white/45">Cuando realices tu primera compra, aparecerá aquí.</p>
        </div>
      )}

      <div className="mt-10 space-y-5">
        {orders.map((order) => (
          <article key={order.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40">Pedido</p>
                <p className="font-mono text-sm text-white/70">{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div className="sm:text-right">
                <p className="font-black text-[#e3b64f]">{statusLabel[order.status] ?? order.status}</p>
                <p className="mt-1 text-xs text-white/40">{new Date(order.created_at).toLocaleString("es-PE")}</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-bold">{item.product_name}</p>
                    <p className="mt-1 text-xs text-white/40">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="shrink-0">S/ {(Number(item.unit_price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40">Pago</p>
                <p className="mt-1 text-sm font-bold">{order.payment_method?.toUpperCase() ?? "Sin especificar"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-white/40">Total</p>
                <p className="mt-1 text-xl font-black">S/ {Number(order.total).toFixed(2)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
