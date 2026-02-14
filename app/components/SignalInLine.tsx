import Link from "next/link";

export default function SignalInline({ id }: { id: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 text-xs border rounded-full bg-gray-50">
      <span className="font-medium text-gray-700">
        Signal
      </span>
      <Link
        href={`/signals#${id}`}
        className="text-blue-600 hover:underline"
      >
        {id}
      </Link>
    </span>
  );
}
