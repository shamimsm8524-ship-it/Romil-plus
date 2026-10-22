import { exactStateJobDetails } from "@/lib/exact-state-job-details";
import { exactStateJobs } from "@/lib/exact-state-jobs";
import { freshJobDetails } from "@/lib/fresh-job-details";
import { pardosJobDetails } from "@/lib/pardos-job-details";
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
  ...freshJobDetails,
  ...pardosJobDetails,
  ...priorityViews,
  ...exactViews,
];

function withVisibleExtras(job: JobDetailView): JobDetailView {
  const extraNotes = [
    ...(job.details.benefits?.length
      ? [`Beneficios: ${job.details.benefits.join(" · ")}`]
      : []),
    ...(job.details.contact ?? []),
  ];

  if (!extraNotes.length) return job;

  return {
    ...job,
    details: {
      ...job.details,
      notes: [...(job.details.notes ?? []), ...extraNotes],
    },
  };
}

export const allJobDetails: JobDetailView[] = detailedPublicJobs.map(withVisibleExtras);

export function getJobBySlug(slug: string) {
  return allJobDetails.find((job) => job.slug === slug);
}
