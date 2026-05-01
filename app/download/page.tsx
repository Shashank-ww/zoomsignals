"use client";

import { Suspense, useState, useEffect } from "react";
import MailingList from "@/app/components/MailingList";
import { useSearchParams } from "next/navigation";

function DownloadPageInner() {
  const params = useSearchParams();
  const isPaid = params.get("paid");

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("subscribedEmail");
    if (saved) {
      setEmail(saved);
    }
  }, []);

  const handleSend = async () => {
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      setIsSubmitted(true);
      setMessage("Check your inbox. We have sent your access link.");
    } catch {
      setMessage("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-8 text-center">

        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="py-1 lg:text-6xl text-3xl md:text-5xl bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent">
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

          {/* EMAIL INPUT */}
          <MailingList
            variant="download"
            setEmail={setEmail}
          />

          {/* ACTION BUTTON */}
          <button
            onClick={handleSend}
            disabled={!email || loading}
            className={`inline-flex items-center justify-center gap-2 
              w-full sm:w-auto sm:min-w-55 cursor-pointer
              px-6 py-3 text-sm font-medium text-white rounded-full shadow-sm 
              transition-all duration-200
              ${
                email
                  ? "bg-blue-500 hover:bg-blue-600 border border-blue-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {loading ? "Sending..." : isSubmitted ? "Resend Email" : "Get Sample via Email"}
          </button>

          {/* STATUS MESSAGE */}
          {message && (
            <p className={`text-xs ${
              message.includes("wrong") ? "text-amber-500" : "text-emerald-600"
            }`}>
              {message}
            </p>
          )}

          {/* SUCCESS STATE HELP */}
          {isSubmitted && (
            <p className="text-[10px] text-gray-500">
              Didn&apos;t receive it? Check spam or try again.
            </p>
          )}
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
              className="inline-flex items-center justify-center gap-2 
                w-full sm:w-auto sm:min-w-55
                px-6 py-3 text-sm font-medium text-white 
                bg-gray-800 border border-blue-600 rounded-full shadow-sm 
                hover:bg-blue-600 transition-all duration-200">
              Unlock Full Access
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-blue-600 font-medium">
              Payment successful!
            </p>

            <p className="text-xs text-gray-500">
              We have sent your full dataset to your email.
            </p>

            <button
              onClick={handleSend}
              className="inline-flex items-center justify-center gap-2 
                w-full sm:w-auto sm:min-w-55
                px-6 py-3 text-sm font-medium text-white 
                bg-blue-500 border border-blue-600 rounded-full shadow-sm 
                hover:bg-blue-600 transition-all duration-200">
              Resend Full Access
            </button>
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

export default function DownloadPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DownloadPageInner />
    </Suspense>
  );
}