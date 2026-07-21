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

  const hasHoverImage = Boolean(product.hoverImage);

  return (
    // border-primary pe hover/tap dono -- active: mobile ke liye add kiya
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center hover:border-[var(--color-primary)] active:border-[var(--color-primary)] transition-colors duration-300 relative w-full h-full mx-auto">
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

      <Link href={`/products/${product.slug}`} className="w-full group touch-manipulation">
        <div className="relative w-full h-32 sm:h-40 md:h-48 mb-3 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
            className={`object-contain transition-all duration-300 ${
              hasHoverImage
                ? "group-hover:opacity-0 group-active:opacity-0"
                : "group-hover:scale-110 group-active:scale-110"
            }`}
          />

          {hasHoverImage && (
            <Image
              src={product.hoverImage as string}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
              className="object-contain absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"
            />
          )}

          {/* Icons: desktop pe hover se dikhte hain, mobile pe hamesha visible
              rahte hain (touch devices pe hover nahi hota, is liye
              opacity-100 default + md:opacity-0 md:group-hover:opacity-100) */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
            <button
              type="button"
              className="bg-black/70 text-white rounded-full p-1.5 hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)] transition-colors"
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
              className={`rounded-full p-1.5 transition-colors ${
                inWishlist
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-black/70 text-white hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)]"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart
                size={14}
                className={inWishlist ? "fill-[var(--color-accent-red)] text-[var(--color-accent-red)]" : ""}
              />
            </button>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 font-sans not-italic mb-1 line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
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

      <div className="w-full mt-auto">
        <Button
          size="sm"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          className="w-full whitespace-nowrap"
        >
          {product.inStock ? "Add to Cart" : "Sold Out"}
        </Button>
      </div>
    </div>
  );
}