/* ================================
   ENUM / CONTROLLED VALUE ARRAYS
================================ */

// Lifecycle (Signal Maturity)
export const SIGNAL_LIFECYCLE = [
  "Early",
  "Peaking",
  "Saturated",
  "Declining",
] as const;

// Velocity
export const SIGNAL_VELOCITY = [
  "Accelerating",
  "Stable",
  "Declining",
  "Emerging",
] as const;

// Confidence Levels
export const SIGNAL_CONFIDENCE = [
  "Low",
  "Medium",
  "High",
] as const;

// Approval States
export const APPROVAL_STATE = [
  "Draft",
  "Review",
  "Approved",
  "Rejected",
] as const;

// Primary Platforms
export const PRIMARY_PLATFORM = [
  "Instagram-Reels",
  "YouTube-Shorts",
  "Twitter-X",
  "Facebook",
  "LinkedIn",
  "TikTok",
] as const;

// Narrative Types
export const NARRATIVE_TYPE = [
  "Silent",
  "Voiceover",
  "Text-Led",
  "Music-Led",
  "Visuals-Only",
  "UGC",
] as const;

// Launch Stage
export const LAUNCH_STAGE = [
  "Pre Launch",
  "Launch",
  "Post Launch",
  "Sustenance",
] as const;

// Vehicle Type
export const VEHICLE_TYPE = [
  "ICE",
  "HEV",
  "BEV",
  "PHEV",
] as const;

// Sort Options
export const SIGNAL_SORT_OPTIONS = [
  "Newest",
  "Oldest",
  "Lifecycle",
  "Velocity",
  "Confidence",
] as const;

/* ================================
   TYPE EXTRACTIONS
================================ */

export type SignalLifecycle = typeof SIGNAL_LIFECYCLE[number];
export type SignalVelocity = typeof SIGNAL_VELOCITY[number];
export type SignalConfidence = typeof SIGNAL_CONFIDENCE[number];
export type ApprovalState = typeof APPROVAL_STATE[number];
export type PrimaryPlatform = typeof PRIMARY_PLATFORM[number];
export type NarrativeType = typeof NARRATIVE_TYPE[number];
export type LaunchStage = typeof LAUNCH_STAGE[number];
export type VehicleType = typeof VEHICLE_TYPE[number];
export type SignalSortOption = typeof SIGNAL_SORT_OPTIONS[number];

/* ================================
   MAIN SIGNAL TYPE
================================ */

export type Signal = {
  signalId: string;

  meta: {
    lifecycle: SignalLifecycle;
    velocity: SignalVelocity;
    confidence: SignalConfidence;
    authorId: string;
    approvalState: ApprovalState;
    firstSeenDate: string | null;
    lastUpdatedDate: string | null;
  };

  platform: {
    primary: PrimaryPlatform;
    secondary: string[];
  };

  creative: {
    formatName: string;
    openingPattern: string;
    revealPattern: string;
    narrative: NarrativeType;
  };

  strategy: {
    vehicleType: VehicleType;
    launchStage: LaunchStage;
    repetitionCountObserved: number;
  };

  insight: {
    whyThisMatters: string;
    whatToIgnore: string;
  };

  media: {
    imageUrl: string | null;
    sourceLink: string | null;
  };
};
