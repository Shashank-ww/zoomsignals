import type { Signal } from "@/data/signal.types";
import SignalRow from "./SignalRow";
import { Role } from "@/lib/auth";

export default function SignalsTable({
  signals,
  role,
  onEdit,
  onReview,
  onDelete,
}: {
  signals: Signal[];
  role: Role;
  onEdit: (s: Signal) => void;
  onReview: (s: Signal) => void;
  onDelete: (id: string) => void;
}) {
  if (!signals.length) {
    return (
      <div className="p-6 text-center text-gray-500 border">
        No signals yet.
      </div>
    );
  }

  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Format</th>
          <th className="p-2">Platform</th>
          <th className="p-2">Vehicle</th>
          <th className="p-2">Velocity</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {signals.map((signal) => (
          <SignalRow
            key={signal.signalId}
            signal={signal}
            role={role}
            onEdit={onEdit}
            onReview={onReview}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
