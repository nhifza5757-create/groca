import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").toLowerCase().trim();

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-8">
        {query
          ? `${results.length} result(s) for "${q}"`
          : "Type something to search."}
      </p>

      {results.length === 0 && query && (
        <p className="text-gray-500">No products found matching your search.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((product) => (
          <div
            key={product.id}
            className="transition-transform duration-300 hover:scale-105 hover:shadow-md rounded-lg"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
