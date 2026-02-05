import { Signal } from "@/data/signals";
import { Role } from "@/lib/auth";

export default function SignalRow({
  signal,
  role,
  onEdit,
  onReview,
}: {
  signal: Signal;
  role: Role;
  onEdit: (s: Signal) => void;
  onReview: (s: Signal) => void;
}) {
  return (
    <tr className="border-t">
      <td className="p-2">{signal.signalId}</td>
      <td className="p-2">{signal.formatNameInternal || "—"}</td>
      <td className="p-2 text-center">{signal.primaryPlatform || "—"}</td>
      <td className="p-2 text-center">{signal.vehicleType || "—"}</td>
      <td className="p-2 text-center">{signal.velocity}</td>
      <td className="p-2 text-center">{signal.status}</td>
      <td className="p-2 space-x-2 text-center">
        <button
          className="underline"
          onClick={() => onEdit(signal)}
        >
          Edit
        </button>

        {role === "admin" && (
          <button
            className="underline"
            onClick={() => onReview(signal)}
          >
            Review
          </button>
        )}
      </td>
    </tr>
  );
}
