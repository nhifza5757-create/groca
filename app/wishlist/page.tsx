"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/WishlistContext";
import { useCart } from "@/hooks/CartContext";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-gray-600 mb-8">Your wishlist is currently empty.</p>
        <Link
          href="/collections"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition inline-block"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(item)}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}