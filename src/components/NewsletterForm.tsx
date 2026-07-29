"use client";

import { useState } from "react";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={compact ? "text-sm text-charcoal/70" : "text-charcoal/80"}>
        Thank you — welcome to Maison Vela.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
      {!compact && (
        <p className="text-sm text-charcoal/60">
          Join our list for early access to new arrivals and considered notes on craft.
        </p>
      )}
      <div className={compact ? "flex flex-col gap-2" : "flex border-b border-charcoal/30 focus-within:border-charcoal"}>
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            compact
              ? "min-w-0 border-b border-charcoal/30 bg-transparent py-2 text-sm placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none"
              : "min-w-0 flex-1 bg-transparent py-2 text-sm placeholder:text-charcoal/40 focus:outline-none"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            compact
              ? "self-start text-xs uppercase tracking-widest2 text-olive hover:text-charcoal disabled:opacity-50"
              : "shrink-0 text-xs uppercase tracking-widest2 text-olive hover:text-charcoal disabled:opacity-50"
          }
        >
          {status === "loading" ? "Sending" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-700/70">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
