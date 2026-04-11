import type {
  Lifecycle,
  Velocity,
  Confidence,
  ApprovalStatus,
  VoteType,
  Narrative,
  Platform,
} from "@prisma/client";

/* ================================
   Vote
================================ */

export type Vote = {
  id: string;
  type: VoteType;
  signalId: string;
  voterHash: string;
  createdAt: Date;
};

/* ================================
   Advertiser Brand Name
================================ */

export type Advertiser = {
  id: string;
  brandName: string;
  createdAt: Date;
};

/* ================================
   Signal (DB Strict Aligned)
================================ */

export type Signal = {
  resonanceScore: number;
  id: string;

  formatName: string;
  narrative: Narrative;
  insight: string;

  lifecycle: Lifecycle;
  velocity: Velocity;
  confidence: Confidence;
  approvalStatus: ApprovalStatus;

  primaryPlatforms: Platform[];
  repetitionCount: number;
  author: string | null;

  imageUrl?: string | null;
  sourceLink?: string | null;

  relevantCount: number;
  notRelevantCount: number;

  advertiser?: Advertiser[];

  votes?: Vote[];

  createdAt: Date;
  updatedAt: Date;
};