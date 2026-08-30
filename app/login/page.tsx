export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[75vh] max-w-md place-items-center px-4 py-14">
      <section className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-7">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-xl font-black">R+</div>
        <h1 className="mt-5 text-center text-3xl font-black">Inicia sesión</h1>
        <p className="mt-2 text-center text-sm text-white/50">La autenticación quedará conectada a Supabase Auth.</p>
        <form className="mt-7 space-y-3"><input type="email" placeholder="Correo" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400"/><input type="password" placeholder="Contraseña" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400"/><button type="button" className="w-full rounded-xl bg-white px-4 py-3 font-black text-slate-950">Entrar</button></form>
        <p className="mt-5 text-center text-xs text-white/40">Pantalla lista; falta enlazar el proyecto Supabase y activar el flujo real de registro/inicio de sesión.</p>
      </section>
    </main>
  );
}
