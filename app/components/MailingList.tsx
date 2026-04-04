"use client";

import { useState, useEffect } from "react";
import { Loader } from "lucide-react"; 

type Props = {
  setEmail?: (email: string) => void;
  setIsSubscribed?: (val: boolean) => void;
  variant?: "default" | "download";
};

export default function MailingList({
  setEmail: setParentEmail,
  setIsSubscribed,
  variant = "default",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // ✅ Hydrate email from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("subscribedEmail");
    if (saved) {
      setEmail(saved);
      setStatus("success");
      setParentEmail?.(saved);
      setIsSubscribed?.(true);

      if (variant === "download") {
        setMessage("Already subscribed. Download unlocked ↓");
      } else {
        setMessage("You're already subscribed!");
      }
    }
  }, [setParentEmail, setIsSubscribed, variant]);

  // ✅ Submit handler
  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Enter a valid email");
      return;
    }

    try {
      setStatus("submitting");
      setMessage("");

      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("success");
      setMessage(
        variant === "download"
          ? "You're nice. Download unlocked ↓"
          : "Thanks for subscribing!"
      );

      localStorage.setItem("subscribedEmail", email);
      setParentEmail?.(email);
      setIsSubscribed?.(true);
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong";

      // ✅ Handle already subscribed
      if (errorMessage.toLowerCase().includes("already")) {
        setStatus("success");
        setMessage(
          variant === "download"
            ? "Already subscribed. Download unlocked ↓"
            : "You're already subscribed!"
        );
        setParentEmail?.(email);
        setIsSubscribed?.(true);
        localStorage.setItem("subscribedEmail", email);
        return;
      }

      setStatus("error");
      setMessage(errorMessage);
    }
  };

  // ✅ Reset handler
  const handleReset = () => {
    setEmail("");
    setStatus("idle");
    setMessage("");
    localStorage.removeItem("subscribedEmail");
    setParentEmail?.("");
    setIsSubscribed?.(false);
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 p-4 text-sm space-y-2">
      <h4 className="font-semibold">Get Early Access</h4>

      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white text-gray-800">

        {/* Email input */}
        <input
          type="email"
          placeholder="alisha@marketing.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          disabled={status === "submitting" || status === "success"}
          className="flex-1 px-3 py-2 text-xs outline-none disabled:opacity-50 bg-transparent"
        />

        {/* Submit button */}
        <button
          onClick={
            status === "success" && variant === "default"
              ? handleReset   // Reset email
              : handleSubmit  // Submit normally
          }
          disabled={status === "submitting" || (!email && status !== "success")}
          className="px-4 py-2 text-xs font-medium bg-zinc-800 text-white hover:bg-blue-500 transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          {status === "submitting" && <Loader className="w-4 h-4 animate-spin" />}
          {status === "idle" && "Join"}
          {status === "success" && (variant === "default" ? "Update" : "Nice!")}
          {status === "error" && "Retry"}
        </button>
      </div>

        {variant === "download" && status === "success" && (
    <div className="mt-1 text-left">
      <button
        onClick={handleReset}
        className="text-[10px] text-gray-600 hover:underline underline-offset-1 hover:text-blue-500"
      >
        Not you? Change email
      </button>
    </div>
  )}


      {/* Message */}
      {message && (
        <p className={`text-xs ${status === "error" ? "text-amber-500" : "text-emerald-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}