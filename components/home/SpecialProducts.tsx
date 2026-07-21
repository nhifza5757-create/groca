import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function SpecialProducts() {
  // groca.myshopify.com ki tarah, "Special Products" un items ko dikhata hai
  // jin par discount hai (oldPrice set hai) -- Featured Products se alag list.
  const specialProducts = products.filter((p) => p.oldPrice);

  return (
    <section className="px-6 py-10">
      <SectionHeading
        title="Special Products"
        subtitle="Handpicked deals -- limited time discounts on your favorite items"
      />

      {/* Chhoti/half screen par bhi hamesha kam se kam 3 columns rahenge --
          card khud shrink ho jata hai apni max-width (240px) ke andar */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {specialProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}