"use client";

import { useParams } from "next/navigation";
import { useAdminProducts } from "@/components/admin/AdminProductsContext";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products, hydrated } = useAdminProducts();
  const product = products.find((p) => p.id.endsWith(`/${id}`));

  if (!hydrated) return <p className="text-charcoal/40">Loading…</p>;
  if (!product) return <p className="text-charcoal/60">Product not found.</p>;

  return (
    <div>
      <p className="eyebrow mb-2">Catalog</p>
      <h1 className="mb-10 font-serif text-3xl">Edit {product.title}</h1>
      <ProductForm existing={product} />
    </div>
  );
}
