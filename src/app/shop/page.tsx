import type { Metadata } from "next";
import { getAllProducts, getProductsByCollection } from "@/lib/shopify";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Maison Vela collection — minimalist full-grain leather card holders, wallets, and travel goods, hand-finished in small runs.",
};

const collections: { value: Product["collection"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "card-holders", label: "Card Holders" },
  { value: "wallets", label: "Wallets" },
  { value: "travel", label: "Travel" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { collection?: string };
}) {
  const active = (searchParams.collection as Product["collection"] | undefined) ?? "all";
  const products =
    active === "all" ? await getAllProducts() : await getProductsByCollection(active);

  return (
    <div className="container-edit section-pad">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">The Collection</p>
        <h1 className="font-serif text-4xl md:text-5xl">Shop All</h1>
      </div>

      <nav className="mb-12 flex justify-center gap-8">
        {collections.map((c) => (
          <a
            key={c.value}
            href={c.value === "all" ? "/shop" : `/shop?collection=${c.value}`}
            className={`text-sm uppercase tracking-widest2 transition-colors ${
              active === c.value ? "text-charcoal" : "text-charcoal/40 hover:text-charcoal"
            }`}
          >
            {c.label}
          </a>
        ))}
      </nav>

      {products.length === 0 ? (
        <p className="text-center text-charcoal/50">No products found in this collection yet.</p>
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
