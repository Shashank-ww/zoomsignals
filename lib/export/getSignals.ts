import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSignals(limit = 3) {
  return prisma.signal.findMany({
    where: { approvalStatus: "APPROVED" },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });
}