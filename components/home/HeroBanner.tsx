"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

const slides = [
  {
    tag: "100% Healthy & Affordable",
    title: "Organic Vegetables",
    subtitle: "Small Changes Big Difference",
    button: "Shop Now",
    image: "/images/hero/slider-3.png",
    style: "right",
  },
  {
    tag: "GROCA",
    title: "Vegetable 100% Organic",
    subtitle: "Natural Health Care Ingredients -- 50% OFF",
    button: "Shop Now",
    image: "/images/hero/slider-2.png",
    style: "bordered",
  },
  {
    tag: "Natural Health Care Ingredients",
    title: "Grocery Shopping",
    subtitle: "Save upto 30% off",
    button: "Shop Now",
    image: "/images/hero/slider-1.png",
    style: "center",
  },
];

const styleConfig = {
  bordered: {
    justify: "justify-center",
    card: "border-2 border-[var(--color-primary)] text-center",
    showLeaf: false,
    tagClass: "font-serif uppercase tracking-wide text-lg text-gray-800 mb-3",
    titleColor: "text-red-600",
    buttonStyle: "plain",
  },
  right: {
    justify: "justify-end",
    card: "rounded-lg shadow-lg text-left",
    showLeaf: true,
    tagClass: "text-sm text-gray-500 mb-2",
    titleColor: "text-[var(--color-primary)]",
    buttonStyle: "pill-green",
  },
  center: {
    justify: "justify-center",
    card: "text-left",
    showLeaf: false,
    tagClass: "text-sm text-gray-500 mb-2",
    titleColor: "text-orange-600",
    buttonStyle: "pill-orange",
  },
};

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[current];
  const cfg = styleConfig[slide.style as keyof typeof styleConfig];

  const [subtitleMain, subtitleHighlight] =
    slide.style === "bordered" && slide.subtitle.includes("--")
      ? slide.subtitle.split("--").map((s) => s.trim())
      : [slide.subtitle, null];

  return (
    <section className="relative h-[420px] md:h-[480px] overflow-hidden bg-[var(--color-surface)]">
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />

      <div className={`absolute inset-0 flex items-center px-6 md:px-16 ${cfg.justify}`}>
        {slide.style === "bordered" ? (
          <div className="relative max-w-md w-full">
            <div className="absolute -top-6 -bottom-6 left-1/2 -translate-x-1/2 w-[72%] border-2 border-[var(--color-primary)]" />
            <div className="relative bg-white p-8 md:p-10 text-center">
              <p className={cfg.tagClass}>{slide.tag}</p>
              <h1 className={`text-3xl md:text-4xl font-serif italic font-bold mb-3 ${cfg.titleColor}`}>
                {slide.title}
              </h1>
              <p className={`text-gray-600 ${subtitleHighlight ? "mb-1" : "mb-6"}`}>
                {subtitleMain}
              </p>
              {subtitleHighlight && (
                <p className="text-3xl md:text-4xl font-bold text-black mb-6">
                  {subtitleHighlight}
                </p>
              )}
              <Link
                href="/collections"
                className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
              >
                {slide.button}
              </Link>
            </div>
          </div>
        ) : (
          <div className={`bg-white p-8 md:p-10 max-w-md w-full ${cfg.card}`}>
            {cfg.showLeaf && (
              <Leaf size={22} className="text-[var(--color-primary)] mb-3" />
            )}
            <p className={cfg.tagClass}>{slide.tag}</p>
            <h1 className={`text-3xl md:text-4xl font-serif italic font-bold mb-3 ${cfg.titleColor}`}>
              {slide.title}
            </h1>
            <p className="text-gray-600 mb-6">{subtitleMain}</p>
            <Link
              href="/collections"
              className={`inline-block text-white px-6 py-3 rounded-full transition ${
                cfg.buttonStyle === "pill-orange"
                  ? "bg-orange-600 hover:bg-black"
                  : "bg-[var(--color-primary)] hover:bg-orange-600"
              }`}
            >
              {slide.button}
            </Link>
          </div>
        )}
      </div>

      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-accent-orange hover:text-white rounded-full p-2 shadow z-10 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-accent-orange hover:text-white rounded-full p-2 shadow z-10 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}