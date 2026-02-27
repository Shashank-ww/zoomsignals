// app/types/signal.types.ts

import {
  Lifecycle,
  Velocity,
  Confidence,
  ApprovalStatus,
  VoteType,
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
   Signal (DB Aligned)
================================ */

export type Signal = {
  id: string;

  formatName: string;
  narrative: string;
  insight: string;

  lifecycle: Lifecycle;
  velocity: Velocity;
  confidence: Confidence;
  approvalStatus: ApprovalStatus;

  primaryPlatforms: string[]; 
  repetitionCount: number;
  author: string | null;

  imageUrl?: string | null;
  sourceLink?: string | null;

  votes?: Vote[];

  createdAt: Date;
  updatedAt: Date;
};