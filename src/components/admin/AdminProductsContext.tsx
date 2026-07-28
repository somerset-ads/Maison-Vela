"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { products as seedProducts } from "@/data/products";

interface AdminProductsContextValue {
  products: Product[];
  hydrated: boolean;
  getProduct: (id: string) => Product | undefined;
  createProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  setVariantInventory: (productId: string, variantId: string, inventory: number) => void;
}

const AdminProductsContext = createContext<AdminProductsContextValue | null>(null);
const STORAGE_KEY = "maison-vela-admin-products";

/**
 * Browser-local product store backing the admin CRUD UI. Seeded from the
 * static catalog (src/data/products.ts) and persisted to localStorage so
 * Add/Edit/Delete actually work before a real Shopify store exists. Once
 * SHOPIFY_ADMIN_API_TOKEN is set, swap the mutation functions here for the
 * real calls in src/lib/shopify-admin.ts.
 */
export function AdminProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setProducts(JSON.parse(raw));
      } catch {
        // ignore corrupt data, fall back to seed
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, hydrated]);

  const value: AdminProductsContextValue = {
    products,
    hydrated,
    getProduct: (id) => products.find((p) => p.id === id),
    createProduct: (product) => setProducts((prev) => [...prev, product]),
    updateProduct: (id, product) =>
      setProducts((prev) => prev.map((p) => (p.id === id ? product : p))),
    deleteProduct: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    setVariantInventory: (productId, variantId, inventory) =>
      setProducts((prev) =>
        prev.map((p) =>
          p.id !== productId
            ? p
            : { ...p, variants: p.variants.map((v) => (v.id === variantId ? { ...v, inventory } : v)) }
        )
      ),
  };

  return <AdminProductsContext.Provider value={value}>{children}</AdminProductsContext.Provider>;
}

export function useAdminProducts() {
  const ctx = useContext(AdminProductsContext);
  if (!ctx) throw new Error("useAdminProducts must be used within AdminProductsProvider");
  return ctx;
}
