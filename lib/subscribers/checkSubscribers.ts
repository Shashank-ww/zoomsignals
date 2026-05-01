import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkSubscribers(email: string) {
  if (!email) return false;

  const user = await prisma.subscriber.findUnique({
    where: { email },
  });

  return !!user;
}