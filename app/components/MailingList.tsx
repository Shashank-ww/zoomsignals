"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

type Props = {
  setEmail?: (email: string) => void;
  variant?: "default" | "download";
};

export default function MailingList({
  setEmail: setParentEmail,
  variant = "default",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("subscribedEmail");
    if (saved) {
      setEmail(saved);
      setParentEmail?.(saved);
    }
  }, [setParentEmail]);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/send-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setMessage(
        variant === "download"
          ? "Check your email for access ↓"
          : "You're in. Check your inbox."
      );

      localStorage.setItem("subscribedEmail", email);
      setParentEmail?.(email);
    } catch {
      setStatus("error");
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 p-4 text-sm space-y-2">
      <h4 className="font-semibold">Join access list</h4>

      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white text-gray-800">
        <input
          type="email"
          placeholder="alisha@marketing.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 px-3 py-2 text-xs outline-none bg-transparent"
        />

        <button
          onClick={handleSubmit}
          disabled={status === "loading" || !email}
          className="px-4 py-2 text-xs font-medium bg-zinc-800 text-white hover:bg-blue-500 transition-all flex items-center gap-1 cursor-pointer"
        >
          {status === "loading" && <Loader className="w-4 h-4 animate-spin" />}
          {status === "success"
            ? "Resend"
            : variant === "download"
            ? "Get Access"
            : "Join"}
        </button>
      </div>

      {message && (
        <p className={`text-xs ${status === "error" ? "text-amber-500" : "text-emerald-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}