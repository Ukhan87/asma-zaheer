export type VideoCategory = "ugc-demo" | "tactile_asmr" | "aesthetic_routines";

export type PortfolioItem = {
  id: string;
  brand: string;
  product: string;
  title: string;
  category: VideoCategory;
  src: string;
  poster: string;
  badges: string[];
};

export type PortfolioData = {
  videos: PortfolioItem[];
};

export type StatPill = {
  value: string;
  label: string;
};

export type PercentRow = {
  label: string;
  percent: number;
};

export type Kpi = {
  value: string;
  label: string;
};

export type CreatorStats = {
  name: string;
  handle: string;
  tagline: string;
  email: string;
  socials: {
    tiktok: string;
    instagram: string;
  };
  pills: StatPill[];
  demographics: {
    gender: PercentRow[];
    age: PercentRow[];
    locations: PercentRow[];
  };
  kpis: Kpi[];
};

export const BUDGET_RANGES = [
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500+",
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number];

export const DELIVERABLE_OPTIONS = [
  "UGC Ad",
  "Organic Post",
  "Bundle",
  "Whitelisting",
] as const;

export type Deliverable = (typeof DELIVERABLE_OPTIONS)[number];

export type InquiryPayload = {
  brandName: string;
  website: string;
  contactName: string;
  email: string;
  budget: BudgetRange;
  deliverables: Deliverable[];
  timeline: string;
  brief: string;
  honeypot: string;
};
