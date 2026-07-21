"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    name: "Mc Berry Walter",
    role: "Food Analyst",
    text: "Amazing quality products, fresh every single time. Highly recommend to anyone looking for organic groceries.",
    image: "/images/testimonials/mcberry.jpg",
  },
  {
    name: "Emy Raizaa",
    role: "Nutritionist",
    text: "Delivery is always on time and the packaging keeps everything fresh. Great experience overall.",
    image: "/images/testimonials/emy.jpg",
  },
  {
    name: "Lindse Johnson",
    role: "Dietician",
    text: "Best prices for organic produce I've found online. My family loves the fruits and veggies.",
    image: "/images/testimonials/lindse.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const review = reviews[current];

  return (
    // Real site ki tarah citrus-pattern background image, fallback color ke sath
    <section className="relative bg-[var(--color-testimonial-bg)] px-6 py-16 overflow-hidden">
      <Image
        src="/images/promo/testimonial-bg.png"
        alt=""
        fill
        className="object-cover -z-10"
        aria-hidden="true"
      />

      <SectionHeading
        title="Our Client Say"
        subtitle="Real feedback from customers who shop with us every week"
      />

      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-8 text-center shadow-sm relative">
          <Quote
            size={36}
            className="absolute top-4 left-6 text-[var(--color-primary)]/20"
            fill="currentColor"
          />
          <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
            <Image
              src={review.image}
              alt={review.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-600 text-sm mb-4">{review.text}</p>
          <h4 className="font-semibold">{review.name}</h4>
          <p className="text-[var(--color-primary-dark)] text-sm mb-3">{review.role}</p>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        {/* Arrows — hover pe orange ho jaate hain */}
        <button
          onClick={goPrev}
          aria-label="Previous testimonial"
          className="absolute left-[-1rem] md:left-[-3rem] top-1/2 -translate-y-1/2 bg-[var(--color-primary)] hover:bg-accent-orange text-white rounded-full p-2 shadow transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next testimonial"
          className="absolute right-[-1rem] md:right-[-3rem] top-1/2 -translate-y-1/2 bg-[var(--color-primary)] hover:bg-accent-orange text-white rounded-full p-2 shadow transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-[var(--color-primary)]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}