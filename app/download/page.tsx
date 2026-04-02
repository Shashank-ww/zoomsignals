"use client";

import { useState, useEffect } from "react";
import MailingList from "@/components/MailingList";
import { useSearchParams } from "next/navigation";

export default function DownloadPage() {
  const params = useSearchParams();
  const isPaid = params.get("paid");

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const saved = localStorage.getItem("subscribedEmail");

  if (saved) {
    setEmail(saved);
    setIsSubscribed(true);
  }
    }, []);

  const handleDownload = async () => {
    if (!email) return;

    setLoading(true);

    const res = await fetch(`/api/export/sample?email=${email}`);

    if (res.ok) {
      window.location.href = `/api/export/sample?email=${email}`;
    } else {
      alert("Please subscribe first");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-8 text-center">

        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="py-1 lg:text-6xl text-3xl md:text-5xl bg-linear-to-tr from-green-500 to-blue-400 bg-clip-text text-transparent">
            Access Signal Database
          </h1>
          <p className="text-sm text-gray-500">
            Start with a sample. Unlock full dataset anytime.
          </p>
        </div>

        {/* FREE FLOW */}
        <div className="space-y-4">
          <p className="text-xs text-gray-400">
            Free preview • 3 signals
          </p>

          {/* EMAIL */}
            <MailingList
            variant="download"
            setEmail={setEmail}
            setIsSubscribed={setIsSubscribed}
            />

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={handleDownload}
            disabled={!isSubscribed || loading}
            className={`inline-flex items-center justify-center gap-2 w-1/3 px-6 py-3 text-sm font-medium text-white rounded-full shadow-sm transition-all duration-200
              ${
                isSubscribed
                  ? "bg-blue-500 hover:bg-blue-600 border border-blue-500"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Checking..." : "Download Sample"}
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          <span>or unlock more</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* PAID FLOW */}
        {!isPaid ? (
          <div className="space-y-4">
            <p className="text-xs text-gray-500">
              Get full access to all signals, formats, and platform insights.
            </p>

            <a
              href="https://rzp.io/l/YOUR_LINK"
              className="inline-flex items-center justify-center gap-2 w-1/3 px-6 py-3 text-sm font-medium text-white bg-gray-800 border border-blue-600 rounded-full shadow-sm hover:bg-blue-600 transition-all duration-200"
            >
              Unlock Full Access
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-blue-600 font-medium">
              Payment successful 🎉
            </p>

            <p className="text-xs text-gray-500">
              Your full dataset is ready.
            </p>

            <a
              href={`/api/export/full?email=${email}`}
              className="inline-flex items-center justify-center gap-2 w-1/3 px-6 py-3 text-sm font-medium text-white bg-blue-500 border border-blue-600 rounded-full shadow-sm hover:bg-blue-600 transition-all duration-200"
            >
              Download Full CSV
            </a>
          </div>
        )}

        {/* FOOTNOTE */}
        <p className="text-[10px] text-gray-400 pt-2">
          Curated from real campaign execution • Updated regularly
        </p>

      </div>
    </div>
  );
}