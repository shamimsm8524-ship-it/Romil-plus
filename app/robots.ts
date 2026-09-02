import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/login/",
        "/carrito/",
        "/checkout/",
        "/mis-compras/",
        "/perfil/",
        "/soporte/",
      ],
    },
    sitemap: "https://romilplus.me/sitemap.xml",
    host: "https://romilplus.me",
  };
}
