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
   Signal (DB Strict Aligned)
================================ */

export type Signal = {
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

  votes?: Vote[];

  createdAt: Date;
  updatedAt: Date;
};