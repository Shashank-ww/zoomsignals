import { prisma } from "@/lib/prisma";

export async function validateToken(token: string) {
  if (!token) return null;

  const access = await prisma.accessToken.findUnique({
    where: { token },
  });

  if (!access) return null;

  if (access.expiresAt < new Date()) return null;

  return access; // contains email + metadata
}