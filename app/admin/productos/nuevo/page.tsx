export default function NuevoProductoPage() {
  return (
    <main className="mx-auto min-h-[75vh] max-w-3xl px-4 py-14">
      <p className="text-sm font-bold uppercase tracking-wider text-fuchsia-300">Admin · Productos</p>
      <h1 className="mt-2 text-4xl font-black">Nuevo producto</h1>
      <form className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2">
        <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Nombre"/>
        <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Categoría"/>
        <input type="number" step="0.01" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Precio"/>
        <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Duración"/>
        <input type="number" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="Stock"/>
        <input className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400" placeholder="URL de imagen"/>
        <textarea className="min-h-32 rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400 md:col-span-2" placeholder="Descripción"/>
        <button type="button" className="rounded-xl bg-white px-5 py-3 font-black text-slate-950 md:col-span-2">Guardar cuando Supabase esté conectado</button>
      </form>
    </main>
  );
}
