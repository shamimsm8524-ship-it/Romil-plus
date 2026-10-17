import type { MetadataRoute } from "next";
import { jobGuides } from "@/lib/job-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.romilplus.me";
  const staticRoutes = ["", "/convocatorias", "/becas", "/guias", "/como-verificamos", "/nosotros", "/contacto", "/privacidad", "/terminos"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-10-17"),
      changeFrequency: route === "/convocatorias" || route === "/becas" ? "daily" as const : "weekly" as const,
      priority: route === "" ? 1 : route === "/convocatorias" || route === "/becas" ? 0.9 : 0.7,
    })),
    ...jobGuides.map((guide) => ({ url: `${base}/guias/${guide.slug}`, lastModified: new Date("2026-10-17"), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
