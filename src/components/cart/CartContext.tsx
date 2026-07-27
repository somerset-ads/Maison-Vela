"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, Product, ProductVariant } from "@/types/product";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  subtotal: number;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addLine: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "maison-vela-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setLines(JSON.parse(raw));
      } catch {
        // ignore corrupt cart data
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.variantId === variant.id);
        if (existing) {
          return prev.map((l) =>
            l.variantId === variant.id ? { ...l, quantity: l.quantity + quantity } : l
          );
        }
        const newLine: CartLine = {
          id: `${product.handle}-${variant.id}`,
          variantId: variant.id,
          productHandle: product.handle,
          title: product.title,
          variantTitle: variant.title,
          price: variant.price,
          quantity,
          image: product.images[0],
        };
        return [...prev, newLine];
      });
      setIsOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== lineId)
        : prev.map((l) => (l.id === lineId ? { ...l, quantity } : l))
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines]
  );

  const totalQuantity = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    subtotal,
    totalQuantity,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addLine,
    updateQuantity,
    removeLine,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
