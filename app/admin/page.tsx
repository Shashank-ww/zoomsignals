import { prisma } from "@/lib/prisma";
import AdminClient from "../components/admin/AdminClient"; 

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

        <AdminClient signals={signals} />

      </div>
    </div>
  );
}