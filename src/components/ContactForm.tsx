"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-charcoal/10 bg-sand/20 p-8 text-center">
        <p className="font-serif text-xl">Thank you.</p>
        <p className="mt-2 text-sm text-charcoal/60">
          We&rsquo;ve received your message and will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">
            Name
          </label>
          <input
            required
            name="name"
            className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">
          Subject
        </label>
        <select
          name="subject"
          className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
        >
          <option>Order Enquiry</option>
          <option>Repair Request</option>
          <option>Press &amp; Partnerships</option>
          <option>Something Else</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">
          Message
        </label>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary">
        {status === "loading" ? "Sending" : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700/70">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
