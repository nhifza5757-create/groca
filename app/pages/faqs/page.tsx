"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How fresh are your products?",
    answer:
      "All our fruits, vegetables and other perishables are sourced fresh from local farms and delivered within 24-48 hours of harvest.",
  },
  {
    question: "What are your delivery times?",
    answer:
      "Standard delivery takes 2-4 business days. Same-day delivery is available in select areas for orders placed before 12 PM.",
  },
  {
    question: "Do you offer organic products?",
    answer:
      "Yes — a large portion of our catalog is 100% certified organic. Look for the organic badge on the product page.",
  },
  {
    question: "What is your return policy?",
    answer:
      "If you're not satisfied with a product, you can request a return or refund within 7 days of delivery. Perishable items are covered by our freshness guarantee.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive an email with a tracking link. You can also check order status anytime from your account page.",
  },
  {
    question: "Do you deliver internationally?",
    answer:
      "Currently we deliver within the country only. We're working on expanding to international shipping soon.",
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500">
          Everything you need to know about shopping with Groca.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border-2 rounded-lg overflow-hidden transition-colors ${
                isOpen
                  ? "border-lime-500"
                  : "border-[var(--color-border-light)] hover:border-lime-400"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium hover:bg-[var(--color-surface)] transition-colors"
              >
                {faq.question}
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${
                    isOpen ? "rotate-180 text-[var(--color-primary-dark)]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-gray-600 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}