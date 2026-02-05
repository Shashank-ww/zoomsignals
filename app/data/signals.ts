// data/signals.ts

export type Signal = {
  signalId: string;
  firstSeenDate: string;
  lastUpdated: string;

  primaryPlatform: string;
  secondaryPlatformsSeen: string;

  formatNameInternal: string;
  openingPattern: string;
  revealPattern: string;
  narrativeType: string;

  vehicleType: string;
  launchStage: string;
  repetitionCountObserved: number;

  velocity: "Emerging" | "Stable" | "Accelerating";
  status: "EARLY" | "PEAKING" | "SATURATED";

  whyThisMatters: string;
  whatToIgnore: string;

  confidenceLevel: "Low" | "Medium" | "High";

  sourceLink?: string;
  image?: string;
};

export const signals: Signal[] = [
  // PV-001
  {
    signalId: "PV-001",
    firstSeenDate: "18-Jan-2026",
    lastUpdated: "02-Feb-2026",

    primaryPlatform: "Instagram Reels",
    secondaryPlatformsSeen: "YouTube Shorts",

    formatNameInternal: "Silent Interior Reveal",
    openingPattern: "Door opens – cabin lights turn on",
    revealPattern: "Slow pan of dashboard + infotainment",
    narrativeType: "Silent",

    vehicleType: "SUV",
    launchStage: "Pre-launch",
    repetitionCountObserved: 7,

    velocity: "Accelerating",
    status: "EARLY",

    whyThisMatters:
      "Interior-focused reels are outperforming exterior beauty shots; silence increases dwell time and avoids language barriers.",
    whatToIgnore:
      "Lighting quality differences; some reels look premium but structure is identical.",

    confidenceLevel: "High",
  },

  // PV-002
  {
    signalId: "PV-002",
    firstSeenDate: "08-Jan-2026",
    lastUpdated: "03-Feb-2026",

    primaryPlatform: "Meta Paid",
    secondaryPlatformsSeen: "Meta, Facebook",

    formatNameInternal: "Visual Ad",
    openingPattern: "Car shot",
    revealPattern: "Side shot of car with New Year offering",
    narrativeType: "Shots-Only",

    vehicleType: "EV",
    launchStage: "Launched",
    repetitionCountObserved: 6,

    velocity: "Stable",
    status: "PEAKING",

    whyThisMatters:
      "Uses a straightforward offering-led narrative with pricing cues, aligning brand confidence with conversion intent.",
    whatToIgnore:
      "Creative appears bland; effectiveness relies more on brand equity than execution.",

    confidenceLevel: "Medium",
    sourceLink:
      "https://www.facebook.com/ads/library/?id=2614135568946186",
  },

  // PV-003
  {
    signalId: "PV-003",
    firstSeenDate: "31-Dec-2025",
    lastUpdated: "02-Feb-2026",

    primaryPlatform: "Meta Paid",
    secondaryPlatformsSeen: "Meta, Facebook",

    formatNameInternal: "City Drive",
    openingPattern:
      "Exterior shots combined with interior features using four on-screen dividers",
    revealPattern:
      "Car driven across a bridge with sunlight in the backdrop",
    narrativeType: "Silent",

    vehicleType: "EV",
    launchStage: "Launched",
    repetitionCountObserved: 11,

    velocity: "Stable",
    status: "PEAKING",

    whyThisMatters:
      "Blends lifestyle motion with feature visibility, reinforcing premium positioning without voice or copy.",
    whatToIgnore:
      "High production value can disguise how repeatable this format actually is.",

    confidenceLevel: "High",
  },

  // PV-004
  {
    signalId: "PV-004",
    firstSeenDate: "31-Oct-2025",
    lastUpdated: "02-Feb-2026",

    primaryPlatform: "Instagram Reels",
    secondaryPlatformsSeen: "Instagram Reels",

    formatNameInternal: "VO Interior Showcase",
    openingPattern: "Dashboard showcase with voice-over description",
    revealPattern:
      "Fast-paced interior walkthrough with extreme camera movements",
    narrativeType: "VO-Led",

    vehicleType: "EV",
    launchStage: "Launched",
    repetitionCountObserved: 20,

    velocity: "Stable",
    status: "SATURATED",

    whyThisMatters:
      "Provides detailed feature education for users in the consideration phase.",
    whatToIgnore:
      "Inconsistent camera quality reduces perceived premium feel.",

    confidenceLevel: "Low",
  },

  // PV-005
  {
    signalId: "PV-005",
    firstSeenDate: "27-Jan-2026",
    lastUpdated: "02-Feb-2026",

    primaryPlatform: "Instagram Reels",
    secondaryPlatformsSeen: "Instagram Reels",

    formatNameInternal: "VO-Led Exterior",
    openingPattern:
      "Voice-over explaining exterior colours and new styling",
    revealPattern: "Engine bay reveal shots",
    narrativeType: "VO-Led",

    vehicleType: "EV",
    launchStage: "Launched",
    repetitionCountObserved: 20,

    velocity: "Emerging",
    status: "EARLY",

    whyThisMatters:
      "Aligns with user curiosity around design and engine detailing, reinforcing value-for-money perception.",
    whatToIgnore:
      "Over-emphasis on pricing or value can dilute visual storytelling.",

    confidenceLevel: "Medium",
    sourceLink: "https://www.instagram.com/p/DUAA1PBkVrw/",
  },
];
