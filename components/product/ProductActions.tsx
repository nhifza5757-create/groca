"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/CartContext";

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center border rounded-lg">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="p-2 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        disabled={!product.inStock}
        onClick={handleAddToCart}
        className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed w-full md:w-auto"
      >
        {product.inStock ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
}