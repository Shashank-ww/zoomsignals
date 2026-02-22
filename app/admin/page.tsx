import { prisma } from "@/lib/prisma";
import AdminSignalsTable from "./AdminSignalsTable";

export default async function AdminPage() {
  const signals = await prisma.signal.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin Control Panel</h1>
      <AdminSignalsTable signals={signals} />
    </div>
  );
}