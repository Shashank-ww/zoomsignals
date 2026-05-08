export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import HeroSection from "@/app/components/HeroSection";
import Feed from "@/app/components/Feed";
import type { Signal } from "@/app/types/signal.types";

export default async function Page() {

  const headlines = [
    "Ad break that makes you stand out, first",
    "Make decisions before ads break your budget",
    "Early patterns that give you a real edge",
    "See patterns that repeat across live ads",
    "Stop guessing. Start seeing what scales",
    "Find winning ad patterns before they scale",
  ];

  const headline =
    headlines[Math.floor(Math.random() * headlines.length)];

  const [approvedSignalsCount, totalSignalsCount, rawSignals] =
    await Promise.all([
      prisma.signal.count({
        where: { approvalStatus: "APPROVED" },
      }),
      prisma.signal.count(),
      prisma.signal.findMany({
        where: { approvalStatus: "APPROVED" },
        include: {
          votes: true,
          advertiser: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const signals: Signal[] = rawSignals as Signal[];

  return (
    <main>
      <HeroSection
        headline={headline}
        approvedSignalsCount={approvedSignalsCount}
        totalSignalsCount={totalSignalsCount}
        signals={signals}
      />
      <Feed initialSignals={signals} />
    </main>
  );
}