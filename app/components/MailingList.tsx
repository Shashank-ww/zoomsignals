"use client";

import { useState } from "react";

export default function MailingList() {
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

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="border rounded-xl p-3 text-xs space-y-2">
      <h4 className="font-semibold">Join Mailing List</h4>

      <input
        type="email"
        placeholder="email@domain.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting" || status === "success"}
        className="w-full border px-2 py-1.5 text-xs disabled:opacity-50"
      />

      <button
        onClick={handleSubmit}
        disabled={
          status === "submitting" ||
          status === "success" ||
          !email
        }
        className="w-full text-xs px-3 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 flex justify-center items-center"
      >
        {status === "submitting" && "Submitting..."}
        {status === "idle" && "Subscribe"}
        {status === "success" && "Subscribed ✓"}
        {status === "error" && "Try Again!"}
      </button>

      {message && (
        <p
          className={`text-xs ${
            status === "error"
              ? "text-red-500"
              : "text-emerald-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}