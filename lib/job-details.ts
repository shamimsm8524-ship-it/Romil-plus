import { exactStateJobDetails } from "@/lib/exact-state-job-details";
import { exactStateJobs } from "@/lib/exact-state-jobs";
import { expandedPublicJobDetails } from "@/lib/expanded-public-job-details";
import { freshJobDetails } from "@/lib/fresh-job-details";
import { mtcJobDetails } from "@/lib/mtc-job-details";
import { pardosJobDetails } from "@/lib/pardos-job-details";
import { privateJobDetails } from "@/lib/private-job-details";
import { priorityCareerJobs } from "@/lib/priority-career-jobs";
import type { PublicJobCategory, PublicJobStatus } from "@/lib/state-opportunities";

export type JobPosition = {
  title: string;
  vacancies?: number | null;
  location?: string;
  salary?: string;
};

export type JobDetailExtra = {
  processCode?: string;
  salary?: string;
  contractDuration?: string;
  workSchedule?: string;
  education?: string[];
  experience?: string[];
  requirements?: string[];
  functions?: string[];
  documents?: string[];
  benefits?: string[];
  contact?: string[];
  positions?: JobPosition[];
  applicationUrl?: string;
  applicationLabel?: string;
  applicationInstructions?: string;
  basesUrl?: string;
  notes?: string[];
};

export type JobDetailView = {
  slug: string;
  entity: string;
  title: string;
  category: PublicJobCategory;
  status: PublicJobStatus;
  regime: string;
  location: string;
  vacancies: number | null;
  publishedAt: string;
  closesAt: string;
  verifiedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  summary: string;
  details: JobDetailExtra;
};

const temporarilyIncompleteSlugs = new Set([
  "programa-contigo-019-2026-especialista-administracion-general",
]);

const hiddenFreshSlugs = new Set([
  "migraciones-cas-130-132-2026-cuatro-plazas",
  "ipd-cas-070-072-2026-tres-plazas",
  "proinnovate-cas-005-2026-especialista-proyectos-reembolsables",
  "mtc-cas-16-24-2026-nueve-plazas",
  "ministerio-publico-cas-155-huancavelica-2026",
  "sanipes-cas-39-43-2026-cinco-plazas",
]);

const hasVerifiedDetail = (job: (typeof exactStateJobs)[number]) => {
  const detail = exactStateJobDetails[job.slug];
  return Boolean(
    detail &&
      detail.applicationUrl &&
      (detail.education?.length || detail.requirements?.length) &&
      detail.experience?.length,
  );
};

const exactCompleteJobs = exactStateJobs.filter(
  (job) => !temporarilyIncompleteSlugs.has(job.slug) && hasVerifiedDetail(job),
);

const exactViews: JobDetailView[] = exactCompleteJobs.map((job) => ({
  ...job,
  details: exactStateJobDetails[job.slug],
}));

const priorityViews: JobDetailView[] = priorityCareerJobs.map((job) => ({
  ...job,
  details: job.details,
}));

const freshViews = freshJobDetails.filter((job) => !hiddenFreshSlugs.has(job.slug));

export const detailedPublicJobs: JobDetailView[] = [
  ...privateJobDetails,
  ...freshViews,
  ...expandedPublicJobDetails,
  ...mtcJobDetails,
  ...pardosJobDetails,
  ...priorityViews,
  ...exactViews,
];

export const allJobDetails: JobDetailView[] = detailedPublicJobs;

export function getJobBySlug(slug: string) {
  return allJobDetails.find((job) => job.slug === slug);
}
