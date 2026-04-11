import { NextResponse } from "next/server";

import {
  PrismaClient,
  Lifecycle,
  Velocity,
  Confidence,
  ApprovalStatus,
  Narrative,
  Platform,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {

    const secret = req.headers.get("x-admin-secret");

    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
const { mode, rows, fileName } = body as {
  mode: "append" | "upsert";
  rows: any[];
  fileName?: string;
};

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { error: "Invalid format" },
        { status: 400 }
      );
    }

    let inserted = 0;
    let updated = 0;
    let failed = 0;
    const errors: any[] = [];

    for (const row of rows) {
      try {
        /* ===========================
           BASIC REQUIRED FIELD CHECK
        =========================== */

        const formatName = row.formatName?.trim();
        if (!formatName) {
          throw new Error("Missing formatName");
        }

        /* ===========================
           ENUM NORMALIZATION
        =========================== */

        const lifecycleValue = row.lifecycle?.trim().toUpperCase();
        const velocityValue = row.velocity?.trim().toUpperCase();
        const confidenceValue = row.confidence?.trim().toUpperCase();
        const approvalStatusValue = row.approvalStatus?.trim().toUpperCase();
        const narrativeValue = row.narrative?.trim().toUpperCase();

        if (!Object.values(Lifecycle).includes(lifecycleValue))
          throw new Error(`Invalid lifecycle: ${row.lifecycle}`);

        if (!Object.values(Velocity).includes(velocityValue))
          throw new Error(`Invalid velocity: ${row.velocity}`);

        if (!Object.values(Confidence).includes(confidenceValue))
          throw new Error(`Invalid confidence: ${row.confidence}`);

        if (!Object.values(ApprovalStatus).includes(approvalStatusValue))
          throw new Error(`Invalid approvalStatus: ${row.approvalStatus}`);

        if (!Object.values(Narrative).includes(narrativeValue))
          throw new Error(`Invalid narrative: ${row.narrative}`);

        const lifecycle = lifecycleValue as Lifecycle;
        const velocity = velocityValue as Velocity;
        const confidence = confidenceValue as Confidence;
        const approvalStatus = approvalStatusValue as ApprovalStatus;
        const narrative = narrativeValue as Narrative;

        /* ===========================
           PLATFORM NORMALIZATION
        =========================== */

        const platformsRaw =
          row.primaryPlatforms
            ?.split(",")
            .map((p: string) => p.trim().toUpperCase())
            .filter((p: string) => p.length > 0) || [];

        for (const p of platformsRaw) {
          if (!Object.values(Platform).includes(p as Platform)) {
            throw new Error(`Invalid platform: ${p}`);
          }
        }

        const platforms = platformsRaw as Platform[];

        /* ===========================
          ADVERTISER NORMALIZATION
        =========================== */

        const advertiserRaw =
          row.advertiser
            ?.split(",")
            .map((b: string) => b.trim())
            .filter((b: string) => b.length > 0) || [];

        const advertiserConnect = advertiserRaw.map((brandName: string) => ({
          where: { brandName },
          create: { brandName },
        }));

        /* ===========================
           CLEAN DATA OBJECT
        =========================== */

        const data = {
          narrative,
          insight: row.insight?.trim() || "",
          lifecycle,
          velocity,
          confidence,
          approvalStatus,
          primaryPlatforms: platforms,
          repetitionCount: Number(row.repetitionCount) || 0,
          author: row.author?.trim() || null,
          imageUrl: row.imageUrl?.trim() || null,
          sourceLink: row.sourceLink?.trim() || null,
          relevantCount: Number(row.relevantCount) || 0,
          notRelevantCount: Number(row.notRelevantCount) || 0,

          ...(advertiserConnect.length > 0 && {
            advertiser: {
              connectOrCreate: advertiserConnect,
            },
          }),

        };

        /* ===========================
           APPEND MODE
        =========================== */

        if (mode === "append") {
          await prisma.signal.create({
            data: {
              formatName,
              ...data,
            },
          });

          inserted++;
        }

        /* ===========================
           UPSERT MODE (DETERMINISTIC)
        =========================== */

        if (mode === "upsert") {
          const existing = await prisma.signal.findUnique({
            where: { formatName },
          });

          if (existing) {
            await prisma.signal.update({
            where: { formatName },
            data: {
              ...data,
              ...(advertiserConnect.length > 0 && {
                advertiser: {
                  set: [], // needs to clear data before creating or adding more brands
                  connectOrCreate: advertiserConnect,
                },
              }),
            },
          });

            updated++;
          } else {
            await prisma.signal.create({
              data: {
                formatName,
                ...data,
              },
            });

            inserted++;
          }
        }
      } catch (err: any) {
        failed++;
        errors.push({
          formatName: row.formatName || "Unknown",
          message: err.message,
        });
      }
    }

/* ===========================
   CREATE IMPORT HISTORY RECORD
=========================== */

const historyRecord = await prisma.importLog.create({
  data: {
    fileName: fileName || "Unknown File",
    mode,
    inserted,
    updated,
    failed,
  },
});

return NextResponse.json({
  inserted,
  updated,
  failed,
  errors,
  historyId: historyRecord.id,
});
  } catch (err) {
    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}