"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useCurrency } from "@/hooks/CurrencyContext";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { formatPrice } = useCurrency();
  const [notes, setNotes] = useState("");

  const suggestions = products
    .filter((p) => !items.some((item) => item.id === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-serif italic font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is currently empty.</p>
        <Link
          href="/collections"
          className="inline-block bg-primary text-white px-6 py-3 rounded-full 
                     hover:bg-orange-600 hover:shadow-md hover:scale-105 
                     transition-transform transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
  
      <div className="mb-8">
        <h1 className="text-3xl font-serif italic font-bold mb-1">Your cart</h1>
        <Link
          href="/collections"
          className="text-primary text-sm hover:underline transition-colors"
        >
          Continue shopping
        </Link>
      </div>

      <div className="border-t border-b">
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 py-3 text-xs uppercase text-gray-500 font-medium">
          <span>Product</span>
          <span>Quantity</span>
          <span className="text-right">Total</span>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_auto] gap-4 items-center py-5 border-t 
                       transition-transform duration-300 hover:shadow-sm hover:-translate-y-0.5 rounded-md"
          >
            <div className="flex items-center gap-4 col-span-2 sm:col-span-1">
              <div className="relative w-16 h-16 shrink-0 bg-[var(--color-surface)] rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-1 transition-transform duration-300 hover:scale-105"
                  sizes="64px"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 col-span-2 sm:col-span-1 sm:justify-self-start">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="border rounded p-1 hover:bg-[var(--color-surface)] hover:shadow-sm transition"
                aria-label="Decrease quantity"
              >
                <Minus size={12} />
              </button>
              <span className="text-sm w-5 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="border rounded p-1 hover:bg-[var(--color-surface)] hover:shadow-sm transition"
                aria-label="Increase quantity"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item"
                className="ml-2 bg-primary text-white rounded-full p-1.5 
                           hover:bg-orange-600 hover:shadow-md hover:scale-105 
                           transition-transform transition-colors duration-300"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <span className="text-sm font-semibold text-[var(--color-primary-dark)] justify-self-end">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-6 mt-6">
        <div className="flex-1">
          <label className="text-sm font-medium block mb-2">
            Order special instructions
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full border rounded p-2 text-sm resize-none hover:border-primary focus:border-primary transition-colors"
          />
        </div>

        <div className="sm:w-64 shrink-0 text-right">
          <div className="flex justify-between font-semibold mb-1">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Taxes and shipping calculated at checkout
          </p>
          <Button className="w-full hover:bg-orange-600 hover:shadow-md hover:scale-105 transition-transform transition-colors duration-300">
            Check Out
          </Button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-serif italic font-bold mb-6 text-center">
            You might also like
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
