import type { MetadataRoute } from "next";
import { jobGuides } from "@/lib/job-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.romilplus.me";
  const staticRoutes = ["", "/convocatorias", "/becas", "/becas/nacionales", "/becas/internacionales", "/guias", "/como-verificamos", "/nosotros", "/contacto", "/privacidad", "/terminos"];
  const dailyRoutes = new Set(["/convocatorias", "/becas", "/becas/nacionales", "/becas/internacionales"]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-10-17"),
      changeFrequency: dailyRoutes.has(route) ? "daily" as const : "weekly" as const,
      priority: route === "" ? 1 : dailyRoutes.has(route) ? 0.9 : 0.7,
    })),
    ...jobGuides.map((guide) => ({ url: `${base}/guias/${guide.slug}`, lastModified: new Date("2026-10-17"), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
