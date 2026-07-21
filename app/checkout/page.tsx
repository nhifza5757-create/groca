"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/CartContext";
import { useCurrency } from "@/hooks/CurrencyContext";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { formatPrice } = useCurrency();
  const [useSameAddress, setUseSameAddress] = useState(true);

  const shipping = items.length > 0 ? 0.21 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClass = "w-full border rounded px-3 py-2 text-sm hover:border-primary focus:border-primary focus:outline-none transition-colors";

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Contact</h2>
            <button type="button" className="text-gray-900 hover:text-primary text-sm hover:underline">
              Sign in
            </button>
          </div>
          <input
            type="text"
            placeholder="Email or mobile phone number"
            className={inputClass}
          />
          <label className="flex items-center gap-2 text-sm mt-2 text-gray-600">
            <input type="checkbox" />
            Email me with news and offers
          </label>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Delivery</h2>
          <div className="space-y-3">
            <select className={`${inputClass} bg-white`}>
              <option>Pakistan</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name (optional)"
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Last name"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Postal code (optional)"
                className={inputClass}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              Save this information for next time
            </label>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Shipping method</h2>
          <div className="flex items-center justify-between border-2 border-primary rounded px-4 py-3 text-sm">
            <span>Standard</span>
            <span>{formatPrice(shipping)}</span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-1">Payment</h2>
          <p className="text-xs text-gray-500 mb-3">
            All transactions are secure and encrypted.
          </p>
          <div className="border rounded overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 text-sm font-medium border-b">
              Credit card
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Card number"
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Expiration date (MM / YY)"
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Security code"
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                placeholder="Name on card"
                className={inputClass}
              />
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={useSameAddress}
                  onChange={() => setUseSameAddress(!useSameAddress)}
                />
                Use shipping address as billing address
              </label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full hover:bg-accent-orange transition-colors">
          Pay now
        </Button>
      </form>

      {/* Right: order summary */}
      <div className="bg-[var(--color-surface)] rounded-lg p-6 h-fit">
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 bg-white rounded">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-1"
                />
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <span className="flex-1 text-sm">{item.name}</span>
              <span className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal · {items.length} items</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}