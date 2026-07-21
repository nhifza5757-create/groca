"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";

const DISMISS_KEY = "groca_newsletter_popup_dismissed";
const SHOW_DELAY_MS = 4000;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadyDismissed = typeof window !== "undefined" && localStorage.getItem(DISMISS_KEY);
    if (alreadyDismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const close = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // TODO: wire up to your actual subscribe endpoint
    close();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      onClick={close}
    >
      <div
        className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* full-bleed background */}
        <div className="absolute inset-0">
          <Image
            src="/images/promo/newsletter-bg.jpeg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-[var(--color-accent-orange)] rounded-full p-1.5 shadow transition-colors group"
        >
          <X size={18} className="text-gray-700 group-hover:text-white transition-colors" />
        </button>

        <div className="relative px-8 py-14 md:py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-primary-dark)] uppercase mb-3">
            Newsletter
          </p>
          <h3 className="font-sans font-bold text-2xl md:text-[28px] text-gray-900 leading-tight mb-2">
            Subscribe &amp; Save 15% On Your First Order
          </h3>
          <p className="text-sm text-gray-600 mb-7">
            Fresh deals, new arrivals, and grocery tips — straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-accent-orange)] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            >
              Subscribe <Send size={15} />
            </button>
          </form>

          {error && <p className="text-[var(--color-accent-red)] text-sm mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}