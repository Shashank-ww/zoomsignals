import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { calculateResonance } from "@/lib/resonanceEngine";
import {
  lifecycleWeight,
  velocityWeight,
  confidenceWeight,
} from "@/lib/resonance";

export async function GET() {
  try {
    /* ------------------ FETCH ------------------ */
    const rawSignals = await prisma.signal.findMany({
      take: 100,
      select: {
        id: true,
        formatName: true,
        insight: true,
        velocity: true,
        confidence: true,
        lifecycle: true,
        narrative: true,
        relevantCount: true,
        notRelevantCount: true,
        advertiser: {
          select: {
            id: true,
            brandName: true,
          },
        },
      },
    });

    /* ------------------ TOP SIGNALS ------------------ */
    const signals = rawSignals.map((s) => ({
      ...s,
      resonance: calculateResonance({
        relevant: s.relevantCount,
        notRelevant: s.notRelevantCount,
        lifecycle: s.lifecycle,
        velocity: s.velocity,
        confidence: s.confidence,
        lifecycleWeight,
        velocityWeight,
        confidenceWeight,
      }),
    }));

    const topSignals = signals
      .sort((a, b) => b.resonance.cappedScore - a.resonance.cappedScore)
      .slice(0, 50);

    /* ------------------ TOP FORMATS (MODE-BASED) ------------------ */
    const formatMap = new Map();

    signals.forEach((s) => {
      if (!formatMap.has(s.formatName)) {
        formatMap.set(s.formatName, {
          formatName: s.formatName,
          count: 0,
          narratives: new Set<string>(),
          velocityCount: {},
          confidenceCount: {},
        });
      }

      const entry = formatMap.get(s.formatName);

      entry.count++;

      // count occurrences
      entry.velocityCount[s.velocity] =
        (entry.velocityCount[s.velocity] || 0) + 1;

      entry.confidenceCount[s.confidence] =
        (entry.confidenceCount[s.confidence] || 0) + 1;

      if (s.narrative) entry.narratives.add(s.narrative);
    });

    const getTopKey = (obj: Record<string, number>) =>
      Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    const formats = Array.from(formatMap.values())
      .map((f: any) => ({
        formatName: f.formatName,
        count: f.count,
        narrative: Array.from(f.narratives)[0] || "—",

        // TRUE REPRESENTATION 
        velocity: getTopKey(f.velocityCount) || "STABLE",
        confidence: getTopKey(f.confidenceCount) || "MEDIUM",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);

    /* ------------------ TOP ADVERTISERS ------------------ */
    const advertiserMap = new Map();

    signals.forEach((s) => {
      const uniqueAdvertisers = new Map();

      s.advertiser.forEach((a: any) => {
        uniqueAdvertisers.set(a.id, a);
      });

      uniqueAdvertisers.forEach((a: any) => {
        if (!advertiserMap.has(a.id)) {
          advertiserMap.set(a.id, {
            id: a.id,
            brandName: a.brandName,
            count: 0,
            totalScore: 0,
            bestSignal: null,
          });
        }

        const entry = advertiserMap.get(a.id);

        entry.count++;
        entry.totalScore += s.resonance.cappedScore;

        if (
          !entry.bestSignal ||
          s.resonance.cappedScore >
            entry.bestSignal.resonance.cappedScore
        ) {
          entry.bestSignal = s;
        }
      });
    });

    const advertisers = Array.from(advertiserMap.values())
      .map((a: any) => ({
        brandName: a.brandName,
        count: a.count,
        score: a.totalScore,

        // Comes from best performing signal (clean + meaningful)
        topFormat: a.bestSignal?.formatName || "—",
        velocity: a.bestSignal?.velocity || "STABLE",
        confidence: a.bestSignal?.confidence || "MEDIUM",
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);

    return NextResponse.json({
      signals: topSignals,
      formats,
      advertisers,
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}