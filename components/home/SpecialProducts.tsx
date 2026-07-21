"use client";
import { products } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, Search, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { useCurrency } from "@/hooks/CurrencyContext";

export default function SpecialProducts() {
  const specialProducts = products.filter((p) => p.oldPrice);

  return (
    <section className="px-6 py-10">
      <SectionHeading
        title="Special Products"
        subtitle="Handpicked deals -- limited time discounts on your favorite items"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {specialProducts.map((product) => (
          <SpecialProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function SpecialProductCard({ product }: { product: (typeof products)[number] }) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.oldPrice
    ? Math.min(99, Math.floor(((product.oldPrice - product.price) / product.oldPrice) * 100))
    : null;

  return (
    <div className="group border border-gray-200 rounded-lg p-4 flex items-center gap-4 relative h-full hover:border-[var(--color-primary)] transition-colors duration-300">
      {(!product.inStock || (discountPercent && discountPercent > 0)) && (
        <span className="absolute top-3 left-3 bg-[var(--color-accent-red)] text-white text-[10px] font-semibold px-2 py-0.5 rounded z-10">
          {!product.inStock ? "Sold Out" : `Save ${discountPercent}%`}
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="relative w-24 h-24 shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="96px"
          className="object-contain"
        />

        {/* Yahan bhi same icons -- mobile pe hamesha visible, desktop pe hover se */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
          <button
            type="button"
            className="bg-black/70 text-white rounded-full p-1 hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)] transition-colors"
            aria-label="Quick view"
          >
            <Search size={11} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(product);
            }}
            className={`rounded-full p-1 transition-colors ${
              inWishlist
                ? "bg-[var(--color-primary)] text-white"
                : "bg-black/70 text-white hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)]"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              size={11}
              className={inWishlist ? "fill-[var(--color-accent-red)] text-[var(--color-accent-red)]" : ""}
            />
          </button>
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-bold text-gray-900 font-sans not-italic mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
            />
          ))}
        </div>

        <div className="mb-2">
          <span className="text-base font-semibold text-[var(--color-primary-dark)]">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through ml-1.5">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white disabled:bg-gray-300 disabled:text-gray-500"
        >
          {product.inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}