"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart/CartContext";

export default function CheckoutSuccessPage() {
  const { lines, updateQuantity } = useCart();

  useEffect(() => {
    lines.forEach((line) => updateQuantity(line.id, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-edit section-pad flex flex-col items-center gap-4 py-32 text-center">
      <p className="eyebrow">Order Confirmed</p>
      <h1 className="font-serif text-4xl">Thank you.</h1>
      <p className="max-w-md text-charcoal/60">
        Your order is being prepared in our Florence studio. A confirmation
        and tracking details have been sent to your email.
      </p>
      <Link href="/shop" className="btn-primary mt-6">
        Continue Shopping
      </Link>
    </div>
  );
}
