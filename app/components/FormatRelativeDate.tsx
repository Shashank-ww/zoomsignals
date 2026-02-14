type FormatRelativeDateProps = {
  date?: string;
  label?: string; // "Updated", "First seen"
};

const DAY = 1000 * 60 * 60 * 24;

export function FormatRelativeDate({
  date,
  label,
}: FormatRelativeDateProps) {
  if (!date) return null;

  const now = Date.now();
  const time = new Date(date).getTime();
  const diffDays = Math.floor((now - time) / DAY);

  let text = "";

  if (diffDays <= 0) {
    text = "Today";
  } else if (diffDays === 1) {
    text = "Yesterday";
  } else if (diffDays < 7) {
    text = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    text = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    text = `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    text = `${years} year${years > 1 ? "s" : ""} ago`;
  }

  const isToday = diffDays <= 0;
  const exactDate = new Date(date).toDateString();

  return (
    <span
      className={`relative group inline-flex items-center cursor-default gap-1 text-xs ${
        isToday ? "text-orange-400 font-medium" : "text-gray-500"
      }`}
    >
      {label && <span>{label}:</span>}

      <span>{text}</span>

      {/* Tooltip */}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-0.5 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
        {exactDate}
      </span>
    </span>
  );
}
