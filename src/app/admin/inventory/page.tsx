"use client";

import { useAdminProducts } from "@/components/admin/AdminProductsContext";

export default function InventoryPage() {
  const { products, hydrated, setVariantInventory } = useAdminProducts();

  return (
    <div>
      <p className="eyebrow mb-2">Catalog</p>
      <h1 className="mb-10 font-serif text-3xl">Inventory</h1>

      <div className="border border-charcoal/10 bg-warm-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-left text-xs uppercase tracking-widest2 text-charcoal/50">
              <th className="px-6 py-3 font-normal">Product</th>
              <th className="px-6 py-3 font-normal">Variant</th>
              <th className="px-6 py-3 font-normal">SKU</th>
              <th className="px-6 py-3 font-normal">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {!hydrated ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-charcoal/40">
                  Loading…
                </td>
              </tr>
            ) : (
              products.flatMap((product) =>
                product.variants.map((variant) => (
                  <tr key={variant.id} className="border-b border-charcoal/5 last:border-0">
                    <td className="px-6 py-4">{product.title}</td>
                    <td className="px-6 py-4 text-charcoal/60">{variant.color}</td>
                    <td className="px-6 py-4 text-charcoal/60">{variant.sku}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min={0}
                        value={variant.inventory ?? 0}
                        onChange={(e) =>
                          setVariantInventory(product.id, variant.id, Number(e.target.value))
                        }
                        className={`w-20 border-b bg-transparent py-1 text-sm focus:outline-none ${
                          (variant.inventory ?? 0) <= 5 ? "border-red-700/50 text-red-700" : "border-charcoal/30"
                        }`}
                      />
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-charcoal/40">
        Stock levels are stored locally in your browser for demo purposes. Once
        SHOPIFY_ADMIN_API_TOKEN is set, wire this to adminSetInventory() in
        src/lib/shopify-admin.ts to update real Shopify inventory.
      </p>
    </div>
  );
}
