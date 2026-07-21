"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export type CategoryColumn = {
  title: string;
  slug: string;
  items: { name: string; slug: string }[];
};

export const CATEGORY_COLUMNS: CategoryColumn[] = [
  {
    title: "Fruits",
    slug: "fruits",
    items: [
      { name: "Apple", slug: "apple" },
      { name: "Orange", slug: "orange" },
      { name: "Plum", slug: "plum" },
      { name: "Jamun Fruit", slug: "jamun-fruit" },
      { name: "Cherry", slug: "cherry" },
      { name: "Elderberry", slug: "elderberry" },
      { name: "Watermelon", slug: "watermelon" },
    ],
  },
  {
    title: "Vegetables",
    slug: "vegetables",
    items: [
      { name: "Beetroot", slug: "beetroot" },
      { name: "Broccoli", slug: "broccoli" },
      { name: "Capsicum", slug: "capsicum" },
      { name: "Cucumber", slug: "cucumber" },
      { name: "Potato", slug: "potato" },
      { name: "Coriander", slug: "coriander" },
      { name: "Parsley", slug: "parsley" },
    ],
  },
  {
    title: "Grain Foods",
    slug: "grain-foods",
    items: [
      { name: "Badam", slug: "badam" },
      { name: "Brown Rice", slug: "brown-rice" },
      { name: "Green Peas", slug: "green-peas" },
      { name: "Horse Gram", slug: "horse-gram" },
      { name: "TM Rice", slug: "tm-rice" },
      { name: "Parsley", slug: "parsley-grain" },
      { name: "Wheats", slug: "wheats" },
    ],
  },
  {
    title: "Meats",
    slug: "meats",
    items: [
      { name: "Chicken Brest", slug: "chicken-breast" },
      { name: "Chicken Boneless", slug: "chicken-boneless" },
      { name: "Egg Curry", slug: "egg-curry" },
      { name: "Fresh Meat", slug: "fresh-meat" },
      { name: "Fish Curry", slug: "fish-curry" },
      { name: "Mushroom", slug: "mushroom" },
      { name: "Meat Curry", slug: "meat-curry" },
    ],
  },
];

export default function CategoryMegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-[#F3F3F3] px-5 py-3 min-w-[190px] text-sm font-medium text-[#1a1a1a] rounded-l-md"
      >
        All Categories
        <ChevronDown size={14} className="ml-auto" />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 left-0 bg-white border border-gray-100 shadow-xl rounded-md p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-[92vw] max-w-[860px]">
          {CATEGORY_COLUMNS.map((col) => (
            <div key={col.slug}>
              <div className="bg-[#8DC63F] text-white font-bold text-sm px-4 py-2.5 rounded-md mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/collections/${col.slug}?item=${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-sm text-[#333] hover:text-[#8DC63F] active:text-[#8DC63F] flex items-center gap-1.5 transition-colors"
                    >
                      <span className="text-[#8DC63F]">-</span> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}