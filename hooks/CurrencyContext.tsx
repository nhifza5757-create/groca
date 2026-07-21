"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CurrencyOption {
  code: string;
  country: string;
  symbol: string;
  label: string;
  flagEmoji: string;
  rate: number; // 1 USD = `rate` units of this currency (base = USD, since tumhare product prices $ mein hain)
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", country: "US", symbol: "$", label: "United States", flagEmoji: "🇺🇸", rate: 1 },
  { code: "PKR", country: "PK", symbol: "Rs", label: "Pakistan", flagEmoji: "🇵🇰", rate: 278.5 },
  { code: "GBP", country: "GB", symbol: "£", label: "United Kingdom", flagEmoji: "🇬🇧", rate: 0.78 },
  { code: "EUR", country: "EU", symbol: "€", label: "European Union", flagEmoji: "🇪🇺", rate: 0.92 },
  { code: "AED", country: "AE", symbol: "د.إ", label: "UAE", flagEmoji: "🇦🇪", rate: 3.67 },
  { code: "INR", country: "IN", symbol: "₹", label: "India", flagEmoji: "🇮🇳", rate: 83.5 },
];

interface CurrencyContextType {
  currency: CurrencyOption;
  setCurrency: (code: string) => void;
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const STORAGE_KEY = "groca_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyOption>(CURRENCIES[1]);

  // load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = CURRENCIES.find((c) => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  const setCurrency = (code: string) => {
    const found = CURRENCIES.find((c) => c.code === code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem(STORAGE_KEY, code);
    }
  };

  // hamesha USD base price ko selected currency mein convert karega
  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * currency.rate;
    // PKR/INR jaise round-number currencies decimals ke bina, baaki 2 decimal
    const decimals = currency.code === "USD" || currency.code === "EUR" || currency.code === "GBP" ? 2 : 0;
    return `${currency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}