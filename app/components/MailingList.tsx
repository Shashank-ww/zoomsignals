"use client";

import { useState, useEffect } from "react";
import { Loader, Mail } from "lucide-react";

type Props = {
  setEmail?: (email: string) => void;
  variant?: "default" | "download";
};

export default function MailingList({
  setEmail: setParentEmail,
  variant = "default",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [showSocialProof, setShowSocialProof] = useState(false);

  const isDownload = variant === "download";

  /* ---------- REAL SUBSCRIBER COUNT FROM DB ---------- */
  useEffect(() => {
    if (variant !== "default") return;

    const fetchCount = async () => {
      try {
        const res = await fetch("/api/subscribers");
        const data = await res.json();
        setCount(data.count);
      } catch {
        setCount(null);
      }
    };

    fetchCount();
  }, [variant]);

  /* ---------- PREFILL ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("subscribedEmail");
    if (saved) {
      setEmail(saved);
      setParentEmail?.(saved);
    }
  }, [setParentEmail]);

  /* ---------- AUTO HIDE SOCIAL PROOF ---------- */
  useEffect(() => {
    if (!showSocialProof) return;

    const timer = setTimeout(() => {
      setShowSocialProof(false);
    }, 8500);

    return () => clearTimeout(timer);
  }, [showSocialProof]);

/* ---------- EMAIL VALIDATION ---------- */
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/* ---------- SUBMIT ---------- */
const handleSubmit = async () => {
  if (!isValidEmail(email)) {
    setStatus("error");
    setMessage("That doesn’t look like a valid email");
    return;
  }

    try {
      setStatus("loading");
      setMessage("");

      if (variant === "default") {
        /* ONLY SAVE EMAIL */
        const res = await fetch("/api/subscribers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) throw new Error();

        setStatus("success");
        setMessage("We've added that email. Thanks!");

        /* INSTANT COUNT INCREMENT */

        if (status !== "success") {
          setCount(prev => prev !== null ? prev + 1 : prev);
        }

      } else {

        /* NOT SENDING EMAIL ON DEFAULT HERE */

        setParentEmail?.(email);
        setStatus("success");
      }

      localStorage.setItem("subscribedEmail", email);
      setParentEmail?.(email);
    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 p-4 space-y-3">

      {/* HEADER */}
      <div className="space-y-1">
        <h4 className="text-sm font-normal text-gray-800 dark:text-gray-200">
          {isDownload
            ? "Enter your email to get access"
            : "Get early access"}
        </h4>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isDownload
            ? "We will send your 3 free sample signals instantly"
            : "Join and see creative patterns first"}
        </p>
      </div>

      {/* INPUT */}
      <div className="relative flex items-center">
        <Mail
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          autoFocus={!email}
          onChange={(e) => {
            setEmail(e.target.value.trim());
            if (!showSocialProof) setShowSocialProof(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="
            w-full text-xs 
            pl-9 pr-16 py-2 
            rounded-full 
            border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-zinc-800 
            focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-white
          "
        />

        {/* BUTTON */}
        <button
          onClick={() => {
            handleSubmit();
            setShowSocialProof(true);
          }}
          disabled={!email || status === "loading"}
          className="
            absolute right-1
            px-3 py-1
            text-xs font-medium
            rounded-full
            text-white
            bg-gray-700
            border
            border-blue-500
            hover:bg-blue-500
            flex items-center gap-1
            transition-all
            cursor-pointer
            disabled:opacity-70 disabled:cursor-not-allowed
          "
        >
          {status === "loading" && (
            <Loader className="w-3 h-3 animate-spin" />
          )}

          {status === "success" ? "Added" : "Join"}

        </button>
      </div>

      {/* SOCIAL PROOF */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${showSocialProof ? "max-h-10 mt-2 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {variant === "default" && count !== null && (
          <p className="text-[11px] text-gray-500">
            {count}+ marketers already exploring signals
          </p>
        )}
      </div>

      {/* FEEDBACK */}
      {message && variant === "default" && (
        <p
          className={`text-xs ${
            status === "error"
              ? "text-amber-500"
              : "text-emerald-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}