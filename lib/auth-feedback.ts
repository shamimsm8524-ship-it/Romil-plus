export async function withRequestTimeout<T>(request: PromiseLike<T>, milliseconds = 15000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Promise.resolve(request),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("La conexión tardó demasiado. Comprueba tu internet y vuelve a intentar.")), milliseconds);
      }),
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

export function supportErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message
    : typeof error === "object" && error !== null && "message" in error ? String(error.message)
    : "No se pudo conectar. Vuelve a intentar.";
  if (/failed to fetch|network|abort|timeout/i.test(message)) {
    return "No se pudo conectar con el servicio. Comprueba tu internet y vuelve a intentar.";
  }
  return message;
}

export function loginDestination(next: string | null, isAdmin: boolean): string {
  const fallback = isAdmin ? "/admin" : "/convocatorias";
  if (!next || !next.startsWith("/") || next.startsWith("//") || /[\\\\\r\n]/.test(next)) return fallback;
  const target = new URL(next, "https://www.romilplus.me");
  if (target.origin !== "https://www.romilplus.me") return fallback;
  if (target.pathname === "/login") return fallback;
  if ((target.pathname === "/admin" || target.pathname.startsWith("/admin/")) && !isAdmin) return fallback;
  return target.pathname + target.search + target.hash;
}
