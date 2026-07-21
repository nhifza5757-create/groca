"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

type WishlistContextType = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  totalWishlist: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  function addToWishlist(product: Product) {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  function removeFromWishlist(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function isInWishlist(id: string) {
    return items.some((item) => item.id === id);
  }

  const totalWishlist = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, totalWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}