import { exactStateJobDetails } from "@/lib/exact-state-job-details";
import { exactStateJobs } from "@/lib/exact-state-jobs";
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

const exactCompleteJobs = exactStateJobs.filter(
  (job) => !temporarilyIncompleteSlugs.has(job.slug),
);

const exactViews: JobDetailView[] = exactCompleteJobs.map((job) => ({
  ...job,
  details: exactStateJobDetails[job.slug] ?? {},
}));

const priorityViews: JobDetailView[] = priorityCareerJobs.map((job) => ({
  ...job,
  details: job.details,
}));

export const detailedPublicJobs: JobDetailView[] = [
  ...priorityViews,
  ...exactViews,
];

export const allJobDetails: JobDetailView[] = detailedPublicJobs;

export function getJobBySlug(slug: string) {
  return allJobDetails.find((job) => job.slug === slug);
}
