"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextValue {
  handles: string[];
  isSaved: (handle: string) => boolean;
  toggle: (handle: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "maison-vela-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [handles, setHandles] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setHandles(JSON.parse(raw));
      } catch {
        // ignore corrupt wishlist data
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
  }, [handles, hydrated]);

  const toggle = (handle: string) => {
    setHandles((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    );
  };

  return (
    <WishlistContext.Provider
      value={{ handles, isSaved: (h) => handles.includes(h), toggle }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
