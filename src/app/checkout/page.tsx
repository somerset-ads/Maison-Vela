"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="container-edit section-pad flex flex-col items-center gap-4 text-center">
        <h1 className="font-serif text-4xl">Nothing to Checkout</h1>
        <Link href="/shop" className="btn-primary mt-4">
          Browse the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-edit section-pad grid grid-cols-1 gap-16 md:grid-cols-2">
      <div>
        <p className="eyebrow mb-3">Secure Checkout</p>
        <h1 className="font-serif text-4xl">Complete Your Order</h1>
        <p className="mt-4 text-sm text-charcoal/60">
          Payment is processed securely by Stripe. Apple Pay and Google Pay are
          available automatically on supported devices and browsers.
        </p>

        <button onClick={handleCheckout} disabled={loading} className="btn-primary mt-10 w-full">
          {loading ? "Redirecting to Payment…" : `Pay ${formatPrice(subtotal)}`}
        </button>
        {error && <p className="mt-4 text-sm text-red-700/70">{error}</p>}

        <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-widest2 text-charcoal/40">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Amex</span>
          <span>Apple Pay</span>
          <span>Google Pay</span>
        </div>
      </div>

      <div className="h-fit border border-charcoal/10 p-8">
        <h2 className="mb-6 font-serif text-xl">Order Summary</h2>
        <ul className="divide-y divide-charcoal/10">
          {lines.map((line) => (
            <li key={line.id} className="flex items-center gap-4 py-4">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-sand/30">
                <Image src={line.image.url} alt={line.image.alt} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{line.title}</p>
                <p className="text-xs text-charcoal/50">
                  {line.variantTitle} × {line.quantity}
                </p>
              </div>
              <p className="text-sm">{formatPrice(line.price * line.quantity)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-charcoal/10 pt-4 font-serif text-xl">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
