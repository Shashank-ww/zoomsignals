import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import Feed from "@/components/Feed";

export default async function Page() {
  const [approvedSignalsCount, totalSignalsCount, signals] =
    await Promise.all([
      prisma.signal.count({
        where: { approvalStatus: "APPROVED" },
      }),
      prisma.signal.count(),
      prisma.signal.findMany({
        where: { approvalStatus: "APPROVED" },
        include: { votes: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  return (
    <main>
      <HeroSection
        approvedSignalsCount={approvedSignalsCount}
        totalSignalsCount={totalSignalsCount}
      />
      <Feed initialSignals={signals} />
    </main>
  );
}