"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import { useAdminProducts } from "@/components/admin/AdminProductsContext";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function emptyVariant(): ProductVariant {
  return {
    id: `gid://shopify/ProductVariant/${crypto.randomUUID()}`,
    title: "Default",
    color: "Sand",
    colorHex: "#DCCDB8",
    price: 0,
    available: true,
    sku: "",
    inventory: 0,
  };
}

export default function ProductForm({ existing }: { existing?: Product }) {
  const router = useRouter();
  const { createProduct, updateProduct } = useAdminProducts();

  const [title, setTitle] = useState(existing?.title ?? "");
  const [subtitle, setSubtitle] = useState(existing?.subtitle ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [collection, setCollection] = useState<Product["collection"]>(existing?.collection ?? "card-holders");
  const [imageUrl, setImageUrl] = useState(existing?.images[0]?.url ?? "");
  const [variants, setVariants] = useState<ProductVariant[]>(existing?.variants ?? [emptyVariant()]);

  function updateVariant(index: number, patch: Partial<ProductVariant>) {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const product: Product = {
      id: existing?.id ?? `gid://shopify/Product/${crypto.randomUUID()}`,
      handle: existing?.handle ?? slugify(title),
      title,
      subtitle,
      description,
      descriptionHtml: `<p>${description}</p>`,
      collection,
      images: imageUrl ? [{ url: imageUrl, alt: title, width: 1600, height: 2000 }] : existing?.images ?? [],
      variants,
      materials: existing?.materials ?? [],
      dimensions: existing?.dimensions ?? "",
      featured: existing?.featured ?? false,
      tags: existing?.tags ?? [],
    };

    if (existing) {
      updateProduct(existing.id, product);
    } else {
      createProduct(product);
    }
    router.push("/admin/products");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">Subtitle</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">Collection</label>
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value as Product["collection"])}
            className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
          >
            <option value="card-holders">Card Holders</option>
            <option value="wallets">Wallets</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest2 text-charcoal/60">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
            className="w-full border-b border-charcoal/30 bg-transparent py-2 text-sm focus:border-charcoal focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-xs uppercase tracking-widest2 text-charcoal/60">Variants</label>
          <button
            type="button"
            onClick={() => setVariants((prev) => [...prev, emptyVariant()])}
            className="text-xs uppercase tracking-widest2 text-olive hover:text-charcoal"
          >
            + Add Variant
          </button>
        </div>
        <div className="space-y-4">
          {variants.map((v, i) => (
            <div key={v.id} className="grid grid-cols-2 gap-3 border border-charcoal/10 p-4 sm:grid-cols-5">
              <input
                placeholder="Colour"
                value={v.color}
                onChange={(e) => updateVariant(i, { color: e.target.value, title: e.target.value })}
                className="border-b border-charcoal/30 bg-transparent py-1 text-sm focus:border-charcoal focus:outline-none"
              />
              <input
                type="color"
                value={v.colorHex}
                onChange={(e) => updateVariant(i, { colorHex: e.target.value })}
                className="h-8 w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) => updateVariant(i, { price: Number(e.target.value) })}
                className="border-b border-charcoal/30 bg-transparent py-1 text-sm focus:border-charcoal focus:outline-none"
              />
              <input
                placeholder="SKU"
                value={v.sku}
                onChange={(e) => updateVariant(i, { sku: e.target.value })}
                className="border-b border-charcoal/30 bg-transparent py-1 text-sm focus:border-charcoal focus:outline-none"
              />
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={v.available}
                  onChange={(e) => updateVariant(i, { available: e.target.checked })}
                />
                In Stock
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button type="submit" className="btn-primary">
          {existing ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
