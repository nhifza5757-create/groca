"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { LayoutGrid, List, ChevronDown, ChevronUp } from "lucide-react";

const categoryNames: Record<string, string> = {
  cookies: "Cookies",
  eggs: "Eggs",
  flour: "Flour",
  fruits: "Fruits",
  meats: "Meat",
  milk: "Milk",
  "sidebar-collection": "Sidebar Collection",
  "special-products": "Special Products",
  vegetables: "Vegies",
};

const PER_PAGE = 9;

export default function CollectionDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const categoryName = categoryNames[slug] ?? slug;

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("best-selling");
  const [availability, setAvailability] = useState<"all" | "in" | "out">("all");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === slug),
    [slug]
  );

  const inStockCount = categoryProducts.filter((p) => p.inStock).length;
  const outOfStockCount = categoryProducts.filter((p) => !p.inStock).length;
  const highestPrice = useMemo(
    () => Math.max(0, ...categoryProducts.map((p) => p.price)),
    [categoryProducts]
  );

  
  const typeOptions = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return Array.from(counts.entries()).map(([value, count]) => ({
      value,
      label: categoryNames[value] ?? value,
      count,
    }));
  }, []);

  const brandOptions = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => {
      const brand = (p as { brand?: string }).brand;
      if (brand) counts.set(brand, (counts.get(brand) ?? 0) + 1);
    });
    return Array.from(counts.entries()).map(([value, count]) => ({ value, count }));
  }, []);

  const sizeOptions = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => {
      const weight = (p as { weight?: string }).weight;
      if (weight) counts.set(weight, (counts.get(weight) ?? 0) + 1);
    });
    return Array.from(counts.entries()).map(([value, count]) => ({ value, count }));
  }, []);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  
  const filtered = useMemo(() => {
    
    let list =
      selectedTypes.length > 0
        ? products.filter((p) => selectedTypes.includes(p.category))
        : [...categoryProducts];

    if (availability === "in") list = list.filter((p) => p.inStock);
    if (availability === "out") list = list.filter((p) => !p.inStock);

    const from = parseFloat(priceFrom);
    const to = parseFloat(priceTo);
    if (!isNaN(from)) list = list.filter((p) => p.price >= from);
    if (!isNaN(to)) list = list.filter((p) => p.price <= to);

    if (selectedBrands.length > 0) {
      list = list.filter((p) =>
        selectedBrands.includes((p as { brand?: string }).brand ?? "")
      );
    }
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        selectedSizes.includes((p as { weight?: string }).weight ?? "")
      );
    }

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "alpha") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [
    categoryProducts,
    availability,
    priceFrom,
    priceTo,
    selectedTypes,
    selectedBrands,
    selectedSizes,
    sort,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section>
     
      <div className="bg-primary py-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Collection</h1>
        <p className="text-white/90 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {" / "}
          <span>{categoryName}</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
      
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <FilterSection title="Availability">
            <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availability === "in"}
                onChange={() =>
                  setAvailability(availability === "in" ? "all" : "in")
                }
              />
              In stock ({inStockCount})
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={availability === "out"}
                onChange={() =>
                  setAvailability(availability === "out" ? "all" : "out")
                }
              />
              Out of stock ({outOfStockCount})
            </label>
          </FilterSection>

          <FilterSection title="Price">
            <p className="text-xs text-gray-500 mb-3">
              The highest price is ${highestPrice.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm">$</span>
              <input
                type="number"
                placeholder="From"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                placeholder="To"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
          </FilterSection>

          <FilterSection title="Product Type">
            {typeOptions.map(({ value, label, count }) => (
              <label
                key={value}
                className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(value)}
                  onChange={() => toggle(selectedTypes, setSelectedTypes, value)}
                />
                {label} ({count})
              </label>
            ))}
          </FilterSection>

          <FilterSection title="More Filters">
            {sizeOptions.length > 0 ? (
              sizeOptions.map(({ value, count }) => (
                <label
                  key={value}
                  className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(value)}
                    onChange={() => toggle(selectedSizes, setSelectedSizes, value)}
                  />
                  {value} ({count})
                </label>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                Products mein "weight" field add karein isse activate karne ke liye.
              </p>
            )}
          </FilterSection>

          <FilterSection title="Brand">
            {brandOptions.length > 0 ? (
              brandOptions.map(({ value, count }) => (
                <label
                  key={value}
                  className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(value)}
                    onChange={() => toggle(selectedBrands, setSelectedBrands, value)}
                  />
                  {value} ({count})
                </label>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                Products mein "brand" field add karein isse activate karne ke liye.
              </p>
            )}
          </FilterSection>
        </aside>

      
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 px-4 py-3 rounded mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded transition ${
                  view === "grid" ? "bg-primary text-white" : "text-gray-500"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded transition ${
                  view === "list" ? "bg-primary text-white" : "text-gray-500"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="best-selling">Best selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="alpha">Alphabetically, A-Z</option>
                </select>
              </div>
              <span className="text-gray-500">{filtered.length} products</span>
            </div>
          </div>

          <div
            className={
              view === "grid"
                ? "flex flex-wrap gap-4"
                : "flex flex-col gap-4"
            }
          >
            {pageItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pageItems.length === 0 && (
            <p className="text-gray-500 text-center py-16">
              No products found.
            </p>
          )}

         
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm transition ${
                      page === n
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Collapsible sidebar filter box -- green header bar + expandable body,
// jaisa real site ke Availability/Price/Product Type sections mein hai.
function FilterSection({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-primary text-white px-4 py-2 rounded font-medium text-sm"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && children && (
        <div className="p-3 border border-t-0 rounded-b">{children}</div>
      )}
    </div>
  );
}