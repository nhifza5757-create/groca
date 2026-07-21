import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="px-6 py-10">
      {/* Chhoti/half screen par bhi hamesha kam se kam 3 columns rahenge --
          card khud shrink ho jata hai apni max-width (240px) ke andar */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}