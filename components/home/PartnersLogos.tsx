"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { title: "Premium Organic", image: "/images/badges/badge-1.jpg" },
  { title: "Fresh Vegetables", image: "/images/badges/badge-2.jpg" },
  { title: "Vegetables", image: "/images/badges/badge-3.jpg" },
  { title: "Vegetables", image: "/images/badges/badge-4.jpg" },
  { title: "Farmer's Market", image: "/images/badges/badge-5.jpg" },
  { title: "Family Farm", image: "/images/badges/badge-6.jpg" },
];

const VISIBLE_COUNT = 4;

export default function PartnerLogos() {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStart((prev) => (prev + 1) % logos.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const visibleLogos = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    return logos[(start + i) % logos.length];
  });

  return (
    <section className="px-6 py-14 text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto items-center">
        {visibleLogos.map((logo, i) => (
          <Link
            key={`${logo.title}-${start}-${i}`}
            href="/collections"
            className="relative w-full h-32 block hover:opacity-80 transition-opacity"
          >
            <Image
              src={logo.image}
              alt={logo.title}
              fill
              className="object-contain"
            />
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {logos.map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            aria-label={`Go to logo ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === start ? "bg-green-600" : "bg-green-200"
            }`}
          />
        ))}
      </div>
    </section>
  );
}