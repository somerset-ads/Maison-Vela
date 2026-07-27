"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function AddToCartForm({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(
    product.variants.find((v) => v.available)?.id ?? product.variants[0].id
  );
  const [quantity, setQuantity] = useState(1);
  const { addLine } = useCart();

  const variant = product.variants.find((v) => v.id === variantId)!;

  return (
    <div>
      <p className="mt-2 text-xl text-charcoal/80">{formatPrice(variant.price)}</p>

      <div className="mt-8">
        <p className="mb-3 text-xs uppercase tracking-widest2 text-charcoal/60">
          Colour — {variant.color}
        </p>
        <div className="flex gap-3">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariantId(v.id)}
              aria-label={v.color}
              aria-pressed={v.id === variantId}
              disabled={!v.available}
              className={`h-9 w-9 rounded-full border-2 transition-all disabled:cursor-not-allowed disabled:opacity-30 ${
                v.id === variantId ? "border-charcoal" : "border-transparent"
              }`}
            >
              <span
                className="block h-full w-full rounded-full border border-charcoal/10"
                style={{ backgroundColor: v.colorHex }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center border border-charcoal/20">
          <button
            className="px-4 py-3 text-sm"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 text-sm">{quantity}</span>
          <button
            className="px-4 py-3 text-sm"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={() => addLine(product, variant, quantity)}
          disabled={!variant.available}
          className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {variant.available ? "Add to Bag" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}
