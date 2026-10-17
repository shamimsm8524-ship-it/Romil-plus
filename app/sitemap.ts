import type { MetadataRoute } from "next";
import { jobGuides } from "@/lib/job-guides";
import { allJobDetails } from "@/lib/job-details";
import { scholarships } from "@/lib/scholarships";

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
    ...allJobDetails.map((job) => ({ url: `${base}/convocatorias/${job.slug}`, lastModified: new Date("2026-10-17"), changeFrequency: "daily" as const, priority: 0.8 })),
    ...scholarships.map((scholarship) => ({ url: `${base}/becas/oportunidad/${scholarship.slug}`, lastModified: new Date("2026-10-17"), changeFrequency: scholarship.status === "Abierta" || scholarship.status === "Próxima" ? "daily" as const : "weekly" as const, priority: 0.8 })),
    ...jobGuides.map((guide) => ({ url: `${base}/guias/${guide.slug}`, lastModified: new Date("2026-10-17"), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
