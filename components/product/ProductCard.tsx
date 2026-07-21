"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Search, Heart } from "lucide-react";
import { Product } from "@/data/products";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { useCurrency } from "@/hooks/CurrencyContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.oldPrice
    ? Math.min(99, Math.floor(((product.oldPrice - product.price) / product.oldPrice) * 100))
    : null;

  // Agar product.hoverImage diya hai to hover pe wo photo dikhegi (groca.myshopify.com jaisa
  // "Special Products" swap effect). Nahi diya to same image thoda zoom hogi — clean fallback,
  // kyunke abhi har product ki 2nd photo available nahi hai.
  const hasHoverImage = Boolean(product.hoverImage);

  return (
    // Real site jaisa compact card: tight padding, chhota image, seedha
    // (non-italic) bold title, chhota pill button -- lime green hover border.
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:border-lime-400 transition-colors duration-300 relative max-w-[240px] w-full mx-auto">
      {/* Badges */}
      {!product.inStock && (
        <span className="absolute top-2 left-2 bg-[var(--color-accent-red)] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded z-10">
          Sold Out
        </span>
      )}
      {product.inStock && discountPercent && discountPercent > 0 && (
        <span className="absolute top-2 left-2 bg-[var(--color-accent-red)] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded z-10">
          Save {discountPercent}%
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="w-full group">
        <div className="relative w-full h-48 mb-3 overflow-hidden">
          {/* Base image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain transition-all duration-300 ${
              hasHoverImage
                ? "group-hover:opacity-0"
                : "group-hover:scale-110"
            }`}
          />

          {/* Hover-swap image (only renders if product has a second photo) */}
          {hasHoverImage && (
            <Image
              src={product.hoverImage as string}
              alt={product.name}
              fill
              className="object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}

          {/* Hover icons */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              className="bg-black text-white rounded-full p-1.5 hover:bg-gray-800"
              aria-label="Quick view"
            >
              <Search size={14} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToWishlist(product);
              }}
              className="bg-black text-white rounded-full p-1.5 hover:bg-gray-800"
              aria-label="Add to wishlist"
            >
              <Heart
                size={14}
                className={inWishlist ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>
        {/* font-sans se explicit non-italic seedha font -- pehle font-body
            variable italic-jaisi dikh rahi thi */}
        <h3 className="text-sm font-semibold text-gray-900 font-sans not-italic mb-1 line-clamp-1">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-1 mb-1">
        <Star size={12} className="fill-yellow-400 text-yellow-400" />
        <span className="text-[11px] text-gray-500">
          {product.rating} / 5.0 ({product.reviews})
        </span>
      </div>

      <div className="mb-2">
        <span className="text-sm font-semibold text-[var(--color-primary-dark)]">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <span className="text-[11px] text-gray-400 line-through ml-1.5">
            {formatPrice(product.oldPrice)}
          </span>
        )}
      </div>

      <Button
        size="sm"
        disabled={!product.inStock}
        onClick={() => addToCart(product)}
      >
        {product.inStock ? "Add to Cart" : "Sold Out"}
      </Button>
    </div>
  );
}