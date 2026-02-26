import { prisma } from "@/lib/prisma";
import AdminSignalsTable from "./AdminSignalsTable";

export default async function AdminPage() {
  const signals = await prisma.signal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-6xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center border-b py-8">
          Admin Control Panel
        </h1>

        <AdminSignalsTable signals={signals} />

          {/* ADMIN GUIDELINES */}
      <section className="bg-white border rounded-xl p-6 space-y-4 text-sm">
        <h2 className="text-lg font-semibold">Operational Guidelines</h2>

        <ul className="space-y-2 text-gray-600 list-disc list-inside">
          <li>
            <strong>Signal Creation:</strong> Ensure narrative is concise, insight is strategic, and source URL is valid.
          </li>
          <li>
            <strong>Primary Platforms:</strong> Only include platforms directly responsible for signal propagation.
          </li>
          <li>
            <strong>Velocity Classification:</strong> Assign based on measurable traction (Emerging → Accelerating → Stable → Declining).
          </li>
          <li>
            <strong>Confidence Score:</strong> High only if backed by multiple independent confirmations.
          </li>
          <li>
            <strong>Repetition Count:</strong> Reflect frequency across ecosystem, not repost volume.
          </li>
          <li>
            <strong>Editing Signals:</strong> Update lifecycle and velocity if market behavior changes.
          </li>
          <li>
            <strong>Approval Logic:</strong> Only approve signals that indicate broader pattern relevance — not one-off noise.
          </li>
        </ul>

        <div className="text-xs text-gray-500 border-t pt-4">
          This panel is for internal signal validation and quality control. 
          All actions should maintain analytical integrity.
        </div>
      </section>
            </div>
    </div>
  );
}