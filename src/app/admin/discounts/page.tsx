"use client";

import { useEffect, useState } from "react";
import { discountCodes as seedCodes, type DiscountCode } from "@/data/admin";

const STORAGE_KEY = "maison-vela-admin-discounts";

export default function DiscountsPage() {
  const [codes, setCodes] = useState<DiscountCode[]>(seedCodes);
  const [hydrated, setHydrated] = useState(false);
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState(10);
  const [expiresAt, setExpiresAt] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCodes(JSON.parse(raw));
      } catch {
        // ignore corrupt data
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  }, [codes, hydrated]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/admin/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase(), percentage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create discount code");

      setCodes((prev) => [
        {
          code: code.toUpperCase(),
          percentage,
          createdAt: new Date().toISOString().slice(0, 10),
          expiresAt: expiresAt || null,
          usageCount: 0,
          active: true,
        },
        ...prev,
      ]);
      setCode("");
      setPercentage(10);
      setExpiresAt("");
      setStatus("idle");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div>
      <p className="eyebrow mb-2">Marketing</p>
      <h1 className="mb-10 font-serif text-3xl">Discount Codes</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <form onSubmit={handleCreate} className="space-y-4 border border-charcoal/10 bg-warm-white p-6 lg:col-span-1">
          <h2 className="font-serif text-lg">New Code</h2>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest2 text-charcoal/60">Code</label>
            <input
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="SUMMER15"
              className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm uppercase focus:border-charcoal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest2 text-charcoal/60">Percentage Off</label>
            <input
              required
              type="number"
              min={1}
              max={100}
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest2 text-charcoal/60">Expires (optional)</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
            />
          </div>
          <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
            {status === "loading" ? "Creating…" : "Create Code"}
          </button>
          {error && <p className="text-sm text-red-700/70">{error}</p>}
        </form>

        <div className="border border-charcoal/10 bg-warm-white lg:col-span-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
                <th className="px-6 py-3 font-normal">Code</th>
                <th className="px-6 py-3 font-normal">Discount</th>
                <th className="px-6 py-3 font-normal">Expires</th>
                <th className="px-6 py-3 font-normal">Used</th>
                <th className="px-6 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((c) => (
                <tr key={c.code} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-6 py-4 font-serif">{c.code}</td>
                  <td className="px-6 py-4">{c.percentage}%</td>
                  <td className="px-6 py-4 text-charcoal/60">
                    {c.expiresAt
                      ? new Date(c.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                      : "No expiry"}
                  </td>
                  <td className="px-6 py-4">{c.usageCount}</td>
                  <td className="px-6 py-4">{c.active ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
