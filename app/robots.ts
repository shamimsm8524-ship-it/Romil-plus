import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/checkout/", "/carrito/", "/mis-compras/", "/perfil/", "/catalogo/", "/producto/"],
      },
    ],
    sitemap: "https://www.romilplus.me/sitemap.xml",
    host: "https://www.romilplus.me",
  };
}
