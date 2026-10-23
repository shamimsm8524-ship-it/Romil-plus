import { createClient } from "@supabase/supabase-js";

const url = "https://twcoaflcpllxupnwcbio.supabase.co";
const publishableKey = "sb_publishable_F0UN2n3kgDr2mPKmHrlAFg_m1nvlAaX";

export const supabase = createClient(url, publishableKey, {
  global: {
    fetch: async (input, init) => {
      const controller = new AbortController();
      const upstream = init?.signal;
      const abort = () => controller.abort();
      if (upstream?.aborted) controller.abort();
      else upstream?.addEventListener("abort", abort, { once: true });
      const timer = setTimeout(abort, 12000);
      try {
        return await fetch(input, { ...init, signal: controller.signal });
      } finally {
        clearTimeout(timer);
        upstream?.removeEventListener("abort", abort);
      }
    },
  },
});

export async function checkGoogleConnection(): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url + "/auth/v1/settings", {
      headers: { apikey: publishableKey },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) throw new Error("El servicio de acceso no está disponible. Vuelve a intentar más tarde.");
    const settings = await response.json() as { external?: { google?: boolean } };
    if (settings.external?.google !== true) throw new Error("El acceso con Google no está habilitado en Romilplus. Puedes intentar con correo.");
  } catch (error) {
    if (error instanceof TypeError || (error instanceof Error && error.name === "AbortError")) {
      throw new Error("No se pudo conectar con el servicio de acceso. Comprueba tu conexión o vuelve a intentar más tarde.");
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
