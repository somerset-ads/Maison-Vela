"use client";

import { useWishlist } from "@/components/wishlist/WishlistContext";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { handles } = useWishlist();
  const products = getAllProducts().filter((p) => handles.includes(p.handle));

  return (
    <div className="container-edit section-pad">
      <p className="eyebrow mb-2">Account</p>
      <h1 className="mb-14 font-serif text-4xl">Wishlist</h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-charcoal/50">You haven&rsquo;t saved anything yet.</p>
          <Link href="/shop" className="btn-secondary">
            Browse the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
