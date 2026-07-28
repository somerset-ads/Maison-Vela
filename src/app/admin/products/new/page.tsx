"use client";

import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <p className="eyebrow mb-2">Catalog</p>
      <h1 className="mb-10 font-serif text-3xl">Add Product</h1>
      <ProductForm />
    </div>
  );
}
