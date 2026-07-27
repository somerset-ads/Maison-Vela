import { getFeaturedProducts } from "@/lib/shopify";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

export default async function FeaturedCollection() {
  const products = await getFeaturedProducts();

  return (
    <section className="section-pad container-edit">
      <div className="mb-14 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-3">Signature Pieces</p>
          <h2 className="font-serif text-4xl md:text-5xl">The Featured Edit</h2>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm uppercase tracking-widest2 text-olive hover:text-charcoal md:block"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link href="/shop" className="btn-secondary mt-12 flex w-fit md:hidden">
        View All
      </Link>
    </section>
  );
}
