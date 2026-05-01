export function generateCsv(signals: any[]) {
  if (!signals.length) return "";

  const formatted = signals.map((s) => ({
    "Format Name": s.formatName,
    Narrative: s.narrative,
    Insight: s.insight,
    Lifecycle: s.lifecycle,
    Velocity: s.velocity,
    Confidence: s.confidence,
    Platforms: s.primaryPlatforms.join(" | "),
    "Repetition Count": s.repetitionCount,
    "Resonance Score": s.resonanceScore,
    "Source Link": s.sourceLink || "",
    "Last Updated": s.updatedAt.toISOString().split("T")[0],
  }));

  const headers = Object.keys(formatted[0]);

  const rows = formatted.map((row) =>
    headers.map((field) => `"${row[field as keyof typeof row] ?? ""}"`).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}