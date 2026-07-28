"use client";

import Link from "next/link";
import Image from "next/image";
import { useAdminProducts } from "@/components/admin/AdminProductsContext";
import { formatPrice } from "@/lib/format";

export default function AdminProductsPage() {
  const { products, deleteProduct, hydrated } = useAdminProducts();

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2">Catalog</p>
          <h1 className="font-serif text-3xl">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          Add Product
        </Link>
      </div>

      <div className="border border-charcoal/10 bg-warm-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="px-6 py-3 font-normal">Product</th>
              <th className="px-6 py-3 font-normal">Collection</th>
              <th className="px-6 py-3 font-normal">Variants</th>
              <th className="px-6 py-3 font-normal">From</th>
              <th className="px-6 py-3 font-normal">Status</th>
              <th className="px-6 py-3 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!hydrated ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-charcoal/40">
                  Loading…
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const price = Math.min(...product.variants.map((v) => v.price));
                const anyAvailable = product.variants.some((v) => v.available);
                return (
                  <tr key={product.id} className="border-b border-charcoal/5 last:border-0">
                    <td className="flex items-center gap-3 px-6 py-4">
                      {product.images[0] && (
                        <div className="relative h-12 w-10 shrink-0 overflow-hidden bg-sand/30">
                          <Image src={product.images[0].url} alt={product.title} fill sizes="40px" className="object-cover" />
                        </div>
                      )}
                      <span>{product.title}</span>
                    </td>
                    <td className="px-6 py-4 capitalize text-charcoal/60">{product.collection.replace("-", " ")}</td>
                    <td className="px-6 py-4">{product.variants.length}</td>
                    <td className="px-6 py-4">{formatPrice(price)}</td>
                    <td className="px-6 py-4">{anyAvailable ? "Active" : "Sold Out"}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/products/${product.id.split("/").pop()}`} className="mr-4 text-xs uppercase tracking-widest2 text-olive hover:text-charcoal">
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${product.title}?`)) deleteProduct(product.id);
                        }}
                        className="text-xs uppercase tracking-widest2 text-red-700/60 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
