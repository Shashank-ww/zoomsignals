"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function DownloadPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(9);
  const [downloadUrl, setDownloadUrl] = useState("");

  const token = pathname.split("/").pop();

  useEffect(() => {
    if (!token) {
      setError("Invalid link");
      setLoading(false);
      return;
    }

    async function handleDownload() {
      try {
        const res = await fetch(`/api/download?token=${token}`);

        if (!res.ok) {
          setError("Link expired or invalid. Maybe retry with an official email.");
          setLoading(false);
          return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);

        const a = document.createElement("a");
        a.href = url;
        a.download = "myadbreak-sample.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();

        setLoading(false);

      } catch (err) {
        setError("Something went wrong");
        setLoading(false);
      }
    }

    handleDownload();
  }, [token]);

  // countdown + redirect
  useEffect(() => {
    if (loading || error) return;

    if (countdown <= 0) {
      router.push("/?downloaded=true");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, loading, error, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
          <div className="text-sm">Preparing your download...</div>
        </div>
      )}

      {/* ERROR */}
    {!loading && error && (
    <div className="flex flex-col items-center gap-4">

        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
        {error}
        </div>

        <Link
        href="/"
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
            duration-200
            active:scale-95"
        >
        Go to Homepage
        </Link>

    </div>
    )}

      {/* SUCCESS */}
      {!loading && !error && (
        <div className="flex flex-col items-center gap-4">

          <div className="text-lg font-medium">
            Your download has started
          </div>

          <div className="text-sm text-zinc-500">
            Redirecting in {countdown}s...
          </div>

          {/* fallback download */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="myadbreak-sample.csv"
              className="text-blue-500 underline text-sm"
            >
              If it doesn’t start, click here
            </a>
          )}

            <Link
            href="/"
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
                duration-200
                active:scale-95"
            >
            Go to Homepage
            </Link>

          <Link href="/legal" className="text-xs text-zinc-400 underline">
            Terms & Conditions
          </Link>

        </div>
      )}
    </div>
  );
}