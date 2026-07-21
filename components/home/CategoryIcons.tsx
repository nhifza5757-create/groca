"use client";

import { useState } from "react";
import Link from "next/link";
import { Milk, Cherry, Wheat, Beef, Carrot } from "lucide-react";

function EggIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C8 8 5 12.5 5 16a7 7 0 0 0 14 0c0-3.5-3-8-7-14z" />
    </svg>
  );
}

const categories = [
  { name: "Milk", slug: "milk", icon: Milk, bg: "bg-[#DDEFC7]" },
  { name: "Fruits", slug: "fruits", icon: Cherry, bg: "bg-[#F9D8DE]" },
  { name: "Flour", slug: "flour", icon: Wheat, bg: "bg-[#DDEFC7]" },
  { name: "Meat", slug: "meats", icon: Beef, bg: "bg-[#FBEAC2]" },
  { name: "Vegetables", slug: "vegetables", icon: Carrot, bg: "bg-[#F9D8DE]" },
  { name: "Eggs", slug: "eggs", icon: EggIcon, bg: "bg-[#DCEAF7]" },
];

export default function CategoryIcons() {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <section className="px-6 py-10">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.slug;

          return (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              onClick={() => setActiveCategory(cat.slug)}
              className="group flex flex-col items-center"
            >
              <div
                className={`
                  relative
                  w-28
                  h-28
                  rounded-full
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-[var(--color-primary)] scale-105"
                      : cat.bg
                  }

                  hover:bg-[var(--color-primary)]
                  hover:scale-105

                  active:bg-[var(--color-primary)]
                  active:scale-105
                `}
              >
                <Icon
                  size={32}
                  strokeWidth={1.75}
                  className={`
                    transition-colors duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-800 group-hover:text-white group-active:text-white"
                    }
                  `}
                />

                <p
                  className={`
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-800 group-hover:text-white group-active:text-white"
                    }
                  `}
                >
                  {cat.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}