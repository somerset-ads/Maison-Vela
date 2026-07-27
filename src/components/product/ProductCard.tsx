"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/components/wishlist/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const price = Math.min(...product.variants.map((v) => v.price));
  const primaryImage = product.images[0];
  const hoverImage = product.images[1] ?? primaryImage;
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.handle);

  return (
    <Link href={`/shop/${product.handle}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/30">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={hoverImage.url}
          alt={hoverImage.alt}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {product.tags.includes("new") && (
          <span className="absolute left-4 top-4 bg-warm-white px-3 py-1 text-[10px] uppercase tracking-widest2 text-charcoal">
            New
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.handle);
          }}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-warm-white/90 text-charcoal"
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="font-serif text-lg">{product.title}</h3>
          <p className="text-sm text-charcoal/50">{product.subtitle}</p>
        </div>
        <p className="shrink-0 text-sm text-charcoal/80">{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
