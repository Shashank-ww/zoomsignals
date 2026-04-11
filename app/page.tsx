import { prisma } from "@/app/lib/prisma";
import HeroSection from "@/app/components/HeroSection";
import Feed from "@/app/components/Feed";
import type { Signal } from "@/app/types/signal.types";

export const dynamic = "force-dynamic"

export default async function Page() {

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
        approvedSignalsCount={approvedSignalsCount}
        totalSignalsCount={totalSignalsCount}
        signals={signals}
      />
      <Feed initialSignals={signals} />
    </main>
  );
}