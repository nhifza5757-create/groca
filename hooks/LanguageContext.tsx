"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
  { code: "nl", label: "Dutch", nativeLabel: "Nederlands" },
  { code: "fr", label: "French", nativeLabel: "Français" },
];

// Yahan sirf demo/header ke liye chand keys hain.
// Site ke baaki hisson mein translate karna ho to isi dictionary mein
// naye keys add karte jao aur wahan t("yourKey") use karo.
const translations: Record<string, Record<string, string>> = {
  home: { en: "Home", ar: "الرئيسية", de: "Startseite", nl: "Home", fr: "Accueil" },
  shop: { en: "Shop", ar: "المتجر", de: "Shop", nl: "Winkel", fr: "Boutique" },
  bestSellers: { en: "Best Sellers", ar: "الأكثر مبيعاً", de: "Bestseller", nl: "Bestsellers", fr: "Meilleures ventes" },
  dealOfTheDay: { en: "Deal Of The Day", ar: "عرض اليوم", de: "Angebot des Tages", nl: "Deal van de dag", fr: "Offre du jour" },
  pages: { en: "Pages", ar: "الصفحات", de: "Seiten", nl: "Pagina's", fr: "Pages" },
  contactUs: { en: "Contact Us", ar: "اتصل بنا", de: "Kontakt", nl: "Contact", fr: "Contactez-nous" },
  aboutUs: { en: "About Us", ar: "من نحن", de: "Über uns", nl: "Over ons", fr: "À propos" },
  blog: { en: "Blog", ar: "المدونة", de: "Blog", nl: "Blog", fr: "Blog" },
  faq: { en: "Faq", ar: "الأسئلة الشائعة", de: "FAQ", nl: "FAQ", fr: "FAQ" },
  search: { en: "Search", ar: "بحث", de: "Suchen", nl: "Zoeken", fr: "Rechercher" },
  searchPlaceholder: {
    en: "Search",
    ar: "بحث",
    de: "Suchen",
    nl: "Zoeken",
    fr: "Rechercher",
  },
  allCategories: { en: "All Categories", ar: "جميع الفئات", de: "Alle Kategorien", nl: "Alle categorieën", fr: "Toutes les catégories" },
  login: { en: "Login", ar: "تسجيل الدخول", de: "Anmelden", nl: "Inloggen", fr: "Connexion" },
  createAccount: { en: "Create Account", ar: "إنشاء حساب", de: "Konto erstellen", nl: "Account aanmaken", fr: "Créer un compte" },
  wishlist: { en: "Wishlist", ar: "المفضلة", de: "Wunschliste", nl: "Verlanglijst", fr: "Liste de souhaits" },
  cart: { en: "Cart", ar: "السلة", de: "Warenkorb", nl: "Winkelwagen", fr: "Panier" },
};

interface LanguageContextType {
  language: LanguageOption;
  setLanguage: (code: string) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "groca_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageOption>(LANGUAGES[0]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setLanguageState(found);
    }
  }, []);

  const setLanguage = (code: string) => {
    const found = LANGUAGES.find((l) => l.code === code);
    if (found) {
      setLanguageState(found);
      localStorage.setItem(STORAGE_KEY, code);
      // Arabic RTL ke liye
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key]?.[language.code] ?? translations[key]?.en ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}