import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import ProductActions from "@/components/product/ProductActions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collections" className="hover:underline">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-primary mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-500">
              {product.rating} / 5.0 ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p
            className={`text-sm font-medium mb-6 ${
              product.inStock ? "text-primary" : "text-red-600"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <p className="text-gray-600 mb-6">
            Fresh, organic {product.name.toLowerCase()} sourced directly from
            trusted farms. Category: {product.category}.
          </p>

          <ProductActions product={product} />
        </div>
      </div>
    </section>
  );
}