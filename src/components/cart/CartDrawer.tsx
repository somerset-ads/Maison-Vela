"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, subtotal, updateQuantity, removeLine } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-warm-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-6">
              <h2 className="font-serif text-2xl">Your Bag ({lines.length})</h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-sm uppercase tracking-widest2 text-olive hover:text-charcoal"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="text-charcoal/60">Your bag is empty.</p>
                  <Link href="/shop" onClick={closeCart} className="btn-secondary">
                    Browse the Collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-charcoal/10">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4 py-6">
                      <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-sand/30">
                        <Image
                          src={line.image.url}
                          alt={line.image.alt}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-serif text-lg">{line.title}</p>
                          <p className="text-sm text-charcoal/50">{line.variantTitle}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-charcoal/20">
                            <button
                              className="px-3 py-1 text-sm"
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-2 text-sm">{line.quantity}</span>
                            <button
                              className="px-3 py-1 text-sm"
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm">{formatPrice(line.price * line.quantity)}</p>
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
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-charcoal/10 px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-charcoal/50">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
