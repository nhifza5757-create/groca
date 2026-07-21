import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

const categories = [
  { name: "Cookies", slug: "cookies", fallbackImage: "/images/categories/cookies.jpg" },
  { name: "Eggs", slug: "eggs", fallbackImage: "/images/categories/eggs.jpg" },
  { name: "Flour", slug: "flour", fallbackImage: "/images/categories/flour.jpg" },
  { name: "Fruits", slug: "fruits", fallbackImage: "/images/categories/fruits.jpg" },
  { name: "Meat", slug: "meats", fallbackImage: "/images/categories/meat.jpg" },
  { name: "Milk", slug: "milk", fallbackImage: "/images/categories/milk.png" },
  { name: "Sidebar Collection", slug: "sidebar-collection", fallbackImage: "/images/categories/sidebar-collection.png" },
  { name: "Special Products", slug: "special-products", fallbackImage: "/images/categories/special-products.png" },
  { name: "Vegies", slug: "vegetables", fallbackImage: "/images/categories/vegies.jpg" },
];

export default function CollectionsPage() {
  return (
    <section>
   
      <div className="bg-primary py-6 text-center">
        <h1 className="text-2xl font-bold text-white">All Collections</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {categories.map((cat) => {
            const categoryProducts = products.filter(
              (p) => p.category === cat.slug
            );

            const thumbnail = categoryProducts[0]?.image ?? cat.fallbackImage;
            const itemCount = categoryProducts.length;

            return (
              <div
                key={cat.slug}
                className="group flex flex-col items-center text-center border border-gray-200 rounded-lg p-4 transition-colors duration-300 hover:border-lime-400 max-w-[240px] w-full mx-auto"
              >
                
                <div className="relative w-full h-48 mb-4 overflow-hidden">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={cat.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-serif italic font-bold mb-1">
                  {cat.name}
                </h3>
                <p className="text-primary text-sm mb-3">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </p>
                <Link
                  href={`/collections/${cat.slug}`}
                  className="inline-block bg-primary text-white px-5 py-1.5 rounded-full text-sm font-medium hover:bg-orange-600 transition"
                >
                  Shop Now
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}