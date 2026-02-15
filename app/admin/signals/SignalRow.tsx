"use client";

import type { Signal } from "@/data/signal.types";
import { Role } from "@/lib/auth";

export default function SignalRow({
  signal,
  role,
  onEdit,
  onReview,
  onDelete,
}: {
  signal: Signal;
  role: Role;
  onEdit: (s: Signal) => void;
  onReview: (s: Signal) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr className="border-t">
      <td className="p-2">{signal.signalId}</td>

      {/* Format */}
      <td className="p-2">
        {signal.creative.formatName}
      </td>

      {/* Platform */}
      <td className="p-2 text-center">
        {signal.platform.primary}
      </td>

      {/* Vehicle */}
      <td className="p-2 text-center">
        {signal.strategy.vehicleType}
      </td>

      {/* Velocity */}
      <td className="p-2 text-center">
        {signal.meta.velocity}
      </td>

      {/* Status */}
{/* Approval State */}
<td className="p-2 text-center">
  {signal.meta.approvalState}
</td>


      {/* Actions */}
      <td className="p-2 text-center space-x-2">
        <button
          onClick={() => onEdit(signal)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        {role === "admin" && (
          <>
            <button
              onClick={() => onReview(signal)}
              className="text-purple-600 hover:underline"
            >
              Review
            </button>

            <button
              onClick={() => onDelete(signal.signalId)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
