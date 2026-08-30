import Link from "next/link";

const modules = ["Productos", "Pedidos", "Clientes", "Categorías", "Cupones", "Configuración"];

export default function AdminPage() {
  return (
    <main className="mx-auto min-h-[75vh] max-w-7xl px-4 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-fuchsia-300">Administración</p><h1 className="mt-2 text-4xl font-black">Panel ROMIL+</h1><p className="mt-3 text-white/50">Base visual para administrar el negocio sin editar código.</p></div><Link href="/admin/productos/nuevo" className="rounded-xl bg-white px-5 py-3 font-black text-slate-950">+ Nuevo producto</Link></div>
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{modules.map((module, index) => <div key={module} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><span className="text-sm text-white/35">0{index + 1}</span><h2 className="mt-6 text-xl font-bold">{module}</h2><p className="mt-2 text-sm leading-6 text-white/45">Módulo preparado para conectarse con Supabase y políticas de acceso de administrador.</p></div>)}</section>
      <section className="mt-8 rounded-3xl border border-amber-300/15 bg-amber-300/[0.04] p-6"><h2 className="font-bold text-amber-100">Antes de publicar</h2><p className="mt-2 text-sm leading-6 text-amber-100/55">Protege esta ruta con autenticación y rol admin. No almacenes contraseñas de clientes ni credenciales de terceros en texto plano.</p></section>
    </main>
  );
}
