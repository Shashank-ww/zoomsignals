// app/data/signal.types.ts

export const SIGNAL_STATUS = [
  "EARLY",
  "PEAKING",
  "SATURATED",
] as const;

export const SIGNAL_VELOCITY = [
  "Accelerating",
  "Stable",
  "Declining",
  "Emerging",
] as const;

export const VEHICLE_TYPE = [
  "ICE",
  "HEV",
  "BEV",
  "PHEV",
  "SUV",
] as const;

export type SignalStatus = typeof SIGNAL_STATUS[number];
export type SignalVelocity = typeof SIGNAL_VELOCITY[number];
export type VehicleType = typeof VEHICLE_TYPE[number];

export type Signal = {
  signalId: string;
  meta: {
    status: SignalStatus;
    velocity: SignalVelocity;
    confidence: string;
    authorId: string;
    approvalState: string;
    firstSeenDate: string;
    lastUpdatedDate: string;
  };
  strategy: {
    vehicleType: VehicleType;
    launchStage: string;
    repetitionCountObserved: number;
  };
  platform: {
    primary: string;
    secondary: string[];
  };
  creative: {
    formatName: string;
    openingPattern: string;
    revealPattern: string;
    narrative: string;
  };
  insight: {
    whyThisMatters: string;
    whatToIgnore: string;
  };
  media: {
    imageUrl?: string;
    sourceLink?: string;
  };
};
