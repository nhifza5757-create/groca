"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useCurrency } from "@/hooks/CurrencyContext";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, subtotal } =
    useCart();
  const { formatPrice } = useCurrency();

  return (
    <>
      {/* Dark overlay behind the drawer */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-light)]">
          <h2 className="text-lg font-serif italic font-bold">Your cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/collections" onClick={closeCart}>
              <Button className="hover:bg-orange-600 hover:shadow-md hover:scale-105 transition-transform transition-colors duration-300">
                Continue shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-start transition-transform duration-300 hover:shadow-sm hover:-translate-y-0.5 rounded-md p-2"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-[var(--color-surface)] rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1 transition-transform duration-300 hover:scale-105"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-[var(--color-primary-dark)] text-sm font-semibold mb-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border border-[var(--color-border-light)] rounded p-1 hover:bg-[var(--color-surface)] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border border-[var(--color-border-light)] rounded p-1 hover:bg-[var(--color-surface)] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="bg-primary text-white rounded-full p-1.5 hover:bg-orange-600 hover:shadow-md hover:scale-105 transition-transform transition-colors duration-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--color-border-light)] px-5 py-4 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-400">
                Taxes and shipping calculated at checkout
              </p>
              <Link href="/cart" onClick={closeCart}>
                <Button
                  variant="outline"
                  className="w-full hover:bg-gray-100 hover:shadow-sm hover:scale-105 transition-transform transition-colors duration-300"
                >
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full hover:bg-orange-600 hover:shadow-md hover:scale-105 transition-transform transition-colors duration-300">
                  Check out
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
