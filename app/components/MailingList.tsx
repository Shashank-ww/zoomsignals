"use client";

import { useState } from "react";

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
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // ✅ SUCCESS FLOW (THIS IS THE KEY ADDITION)
      setStatus("success");
      if (variant === "download") {
            setMessage("You're in. Download unlocked ↓");
          } else {
            setMessage("Thanks for subscribing!");
          }

      localStorage.setItem("subscribedEmail", email);

      setParentEmail?.(email);      // pass email to parent
      setIsSubscribed?.(true);      // unlock button

      // optional: don't clear email (helps UX continuity)
      setEmail("");

    } catch (err: any) {

      const errorMessage = err.message || "Something went wrong";

// ✅ HANDLE "ALREADY SUBSCRIBED"
if (errorMessage.toLowerCase().includes("already")) {
  setStatus("success");

  if (variant === "download") {
    setMessage("Already subscribed. Download unlocked ↓");
  } else {
    setMessage("You're already subscribed!");
  }

  setParentEmail?.(email);
  setIsSubscribed?.(true);

  localStorage.setItem("subscribedEmail", email);
  return;
}

  setStatus("error");
  setMessage(errorMessage);
}
  };

  return (
    <div className="border border-gray-300 bg-gray-200/20 rounded-xl p-4 text-sm space-y-2">
      <h4 className="font-semibold">Get Early Access</h4>

<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">

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

        {variant === "download" && status === "success" && (
          <p className="text-[10px] text-gray-400 p-2">
            Not you? Change email
          </p>
        )}

      <button
    onClick={handleSubmit}
    disabled={
      status === "submitting" ||
      status === "success" ||
      !email
    }
    className="px-4 py-2 text-xs font-medium bg-zinc-900 text-white hover:bg-blue-500 disabled:opacity-50 transition-all"
  >
    {status === "submitting" && "..." }
    {status === "idle" && "Join"}
    {status === "success" && "Nice!"}
    {status === "error" && "Retry"}
  </button>

</div>
      {message && (
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