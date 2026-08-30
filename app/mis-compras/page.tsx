export default function MisComprasPage() {
  return (
    <main className="mx-auto min-h-[75vh] max-w-6xl px-4 py-14">
      <p className="text-sm font-bold uppercase tracking-wider text-violet-300">Área del cliente</p>
      <h1 className="mt-2 text-4xl font-black">Mis compras</h1>
      <p className="mt-3 text-white/50">Aquí aparecerán los pedidos, fecha de expiración, estado y opciones de renovación.</p>
      <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-white/[0.025] p-10 text-center">
        <p className="text-xl font-bold">Aún no hay compras cargadas</p>
        <p className="mt-2 text-sm text-white/45">Cuando conectemos Supabase, esta pantalla leerá únicamente los pedidos del usuario autenticado.</p>
      </div>
    </main>
  );
}
