"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "groca_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const respond = (value: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-200 z-[70] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-center sm:text-left">
        The cookie settings on this website are set to &apos;allow all
        cookies&apos; to give you the very best experience. Please click
        Accept Cookies to continue to use the site.
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={() => respond("declined")}
          className="px-4 py-2 text-sm rounded-md border border-gray-500 hover:bg-gray-800 transition-colors"
        >
          Decline
        </button>
        <button
          onClick={() => respond("accepted")}
          className="px-4 py-2 text-sm rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
}