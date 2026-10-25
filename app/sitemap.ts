import type { MetadataRoute } from "next";
import { jobGuides } from "@/lib/job-guides";
import { allJobDetails } from "@/lib/job-details";
import { scholarships } from "@/lib/scholarships";
import { jobSearchTopics } from "@/lib/job-search-topics";

function reviewedDate(value: string): Date | undefined {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return undefined;
  return new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.romilplus.me";
  const staticRoutes = ["", "/convocatorias", "/becas", "/becas/nacionales", "/becas/internacionales", "/guias", "/como-verificamos", "/nosotros", "/contacto", "/privacidad", "/terminos"];
  return [
    ...staticRoutes.map((route) => ({
      url: base + route,
      ...(route === "" || route === "/convocatorias" ? { lastModified: new Date("2026-10-25") } : {}),
    })),
    ...jobSearchTopics.map((topic) => ({
      url: base + "/trabajos/" + topic.slug,
    })),
    ...allJobDetails.map((job) => ({
      url: base + "/convocatorias/" + job.slug,
      lastModified: reviewedDate(job.verifiedAt),
    })),
    ...scholarships.map((scholarship) => ({
      url: base + "/becas/oportunidad/" + scholarship.slug,
      lastModified: reviewedDate(scholarship.verifiedAt),
    })),
    ...jobGuides.map((guide) => ({ url: base + "/guias/" + guide.slug })),
  ];
}
