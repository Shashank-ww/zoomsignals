"use client";

import { useEffect, useState } from "react";

export default function FullDownloadPage() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("hasAccess");
    if (access === "true") {
      setHasAccess(true);
    }
  }, []);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">
            Restricted Access
          </h1>
          <p className="text-sm text-gray-500">
            Please unlock full access to view this dataset.
          </p>

          <a
            href="/download"
            className="inline-flex
              items-center
              gap-2
              px-6
              py-3
              text-sm
              font-medium
              text-white
              bg-gray-800
              border
              border-blue-600
              rounded-full
              shadow-sm
              hover:bg-blue-600
              transition-all
              duration-200"
          >
            Go to Download Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-8 px-6">

      {/* PREMIUM HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Full Signal Database
        </h1>
        <p className="text-sm text-gray-500 max-w-md">
          You now have access to complete high-performing ad signals across platforms.
        </p>
      </div>

      {/* DOWNLOAD */}
      <a
        href="/full-signals.csv"
        download
        className="inline-flex
          items-center
          gap-2
          px-6
          py-3
          text-sm
          font-medium
          text-white
          bg-blue-500
          border
          border-blue-600
          rounded-full
          shadow-sm
          hover:bg-blue-600
          transition-all
          duration-200"
      >
        Download Full CSV
      </a>

      {/* PREMIUM FEEL ADD-ON */}
      <p className="text-xs text-gray-400">
        Updated weekly • Curated from real campaign data
      </p>

    </div>
  );
}