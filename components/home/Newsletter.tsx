"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setStatus("error");
      return;
    }

    // Real backend nahi hai abhi, isliye sirf success dikha rahe hain
    setStatus("success");
    setEmail("");
  };

  return (
    // Background image (cream + hand-drawn vegetable doodles) fill karti hai,
    // basket image upar overlay hoti hai
    <section className="relative px-6 py-16 text-center overflow-visible">
      <Image
        src="/images/promo/newsletter-bg.jpeg"
        alt=""
        fill
        className="object-cover -z-10"
        aria-hidden="true"
      />

      {/* Content ko bounded container mein rakha hai */}
      <div className="relative max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">Subscribe To Our Emails</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
            placeholder="Email Address"
            className="flex-1 px-4 py-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-full hover:bg-[var(--color-accent-orange)] transition-colors duration-300 inline-flex items-center justify-center gap-2"
          >
            Subscribe <Send size={16} />
          </button>
        </form>

        {status === "success" && (
          <p className="text-[var(--color-primary-dark)] text-sm mt-4">
            Thanks for subscribing! Check your inbox for your discount code.
          </p>
        )}
        {status === "error" && (
          <p className="text-[var(--color-accent-red)] text-sm mt-4">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
}