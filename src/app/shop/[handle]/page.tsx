import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductByHandle } from "@/lib/shopify";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartForm from "@/components/product/AddToCartForm";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts as getMockAll } from "@/data/products";

export async function generateStaticParams() {
  const products = await getAllProducts().catch(() => getMockAll());
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} — Maison Vela`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const related = allProducts.filter((p) => p.handle !== product.handle).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Maison Vela" },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      price: v.price,
      priceCurrency: "GBP",
      availability: v.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      sku: v.sku,
    })),
  };

  return (
    <div className="container-edit section-pad">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <ProductGallery images={product.images} />

        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow mb-2">{product.collection.replace("-", " ")}</p>
          <h1 className="font-serif text-4xl">{product.title}</h1>
          <p className="mt-1 text-charcoal/50">{product.subtitle}</p>

          <AddToCartForm product={product} />

          <div className="mt-12 space-y-6 border-t border-charcoal/10 pt-8">
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-charcoal/80">{product.description}</p>
            </div>
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">
                Materials
              </h2>
              <ul className="text-sm leading-relaxed text-charcoal/80">
                {product.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">
                Dimensions
              </h2>
              <p className="text-sm text-charcoal/80">{product.dimensions}</p>
            </div>
            <div>
              <h2 className="mb-2 text-xs uppercase tracking-widest2 text-charcoal/60">
                Shipping &amp; Returns
              </h2>
              <p className="text-sm leading-relaxed text-charcoal/80">
                Free carbon-neutral shipping on all orders. 30-day returns on unused items.
                See our <a href="/shipping-returns" className="underline">Shipping &amp; Returns</a> page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="mb-10 text-center font-serif text-3xl">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
