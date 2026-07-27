"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, updateQuantity, removeLine } = useCart();

  if (lines.length === 0) {
    return (
      <div className="container-edit section-pad flex flex-col items-center gap-4 text-center">
        <h1 className="font-serif text-4xl">Your Bag Is Empty</h1>
        <Link href="/shop" className="btn-primary mt-4">
          Browse the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-edit section-pad">
      <h1 className="mb-14 font-serif text-4xl">Your Bag</h1>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <ul className="divide-y divide-charcoal/10">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-6 py-8">
                <div className="relative h-32 w-28 shrink-0 overflow-hidden bg-sand/30">
                  <Image src={line.image.url} alt={line.image.alt} fill sizes="112px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-serif text-xl">{line.title}</p>
                    <p className="text-sm text-charcoal/50">{line.variantTitle}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-charcoal/20">
                      <button className="px-4 py-2 text-sm" onClick={() => updateQuantity(line.id, line.quantity - 1)}>
                        −
                      </button>
                      <span className="px-3 text-sm">{line.quantity}</span>
                      <button className="px-4 py-2 text-sm" onClick={() => updateQuantity(line.id, line.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <p>{formatPrice(line.price * line.quantity)}</p>
                  </div>
                  <button
                    onClick={() => removeLine(line.id)}
                    className="w-fit text-xs uppercase tracking-widest2 text-charcoal/40 hover:text-charcoal"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit border border-charcoal/10 p-8">
          <div className="flex justify-between text-sm text-charcoal/60">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-charcoal/60">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-charcoal/10 pt-4 font-serif text-xl">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
