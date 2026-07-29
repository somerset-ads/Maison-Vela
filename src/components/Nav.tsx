"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartContext";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-warm-white/95 backdrop-blur border-b border-charcoal/10" : "bg-transparent"
      }`}
    >
      {/*
        Both flanking elements below share the same fixed width (md:w-80) so
        that a plain flex `justify-between` places the centered logo exactly
        at the midpoint — equal-width flanks + space-between is what
        guarantees perfect centering, not `1fr` grid tracks (which grow to
        fit unequal content and throw the center off) or `absolute` centering
        against the wrong containing block.
      */}
      <div className="container-edit flex h-20 items-center justify-between">
        <div className="flex items-center gap-8 md:w-56 lg:w-80">
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-px w-5 bg-charcoal" />
            <span className="block h-px w-5 bg-charcoal" />
          </button>

          <nav className="hidden gap-8 md:flex">
            {links.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-sm uppercase tracking-widest2 text-charcoal/80 transition-colors hover:text-charcoal"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="shrink-0 whitespace-nowrap font-serif text-2xl tracking-wide">
          Maison Vela
        </Link>

        <div className="flex items-center justify-end gap-6 md:w-56 lg:w-80">
          <nav className="hidden gap-8 md:flex">
            {links.slice(2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap text-sm uppercase tracking-widest2 text-charcoal/80 transition-colors hover:text-charcoal"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/account"
            className="hidden whitespace-nowrap text-sm uppercase tracking-widest2 text-charcoal/80 hover:text-charcoal lg:block"
          >
            Account
          </Link>
          <button
            onClick={openCart}
            className="relative whitespace-nowrap text-sm uppercase tracking-widest2 text-charcoal/80 hover:text-charcoal"
            aria-label="Open cart"
          >
            Bag
            {totalQuantity > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-warm-white">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-charcoal/10 bg-warm-white px-6 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm uppercase tracking-widest2 text-charcoal/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-sm uppercase tracking-widest2 text-charcoal/80"
          >
            Account
          </Link>
        </nav>
      )}
    </header>
  );
}
