"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useWishlist } from "@/hooks/WishlistContext";
import { useCurrency, CURRENCIES } from "@/hooks/CurrencyContext";
import { useLanguage, LANGUAGES, LanguageOption } from "@/hooks/LanguageContext";
import { useAuth } from "@/hooks/AuthContext";

function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

const categoryMenu = [
  { title: "Fruits", slug: "fruits", items: ["Apple", "Orange", "Plum", "Jamun Fruit", "Cherry", "Elderberry", "Watermelon"] },
  { title: "Vegetables", slug: "vegetables", items: ["Beetroot", "Broccoli", "Capsicum", "Cucumber", "Potato", "Coriander", "Parsley"] },
  { title: "Grain Foods", slug: "grain-foods", items: ["Badam", "Brown Rice", "Green Peas", "Horse Gram", "TM Rice", "Parsley", "Wheats"] },
  { title: "Meats", slug: "meats", items: ["Chicken Brest", "Chicken Boneless", "Egg Curry", "Fresh Meat", "Fish Curry", "Mushroom", "Meat Curry"] },
];

const pagesMenu = [
  { name: "About Us", href: "/pages/about-us" },
  { name: "Blog", href: "/blogs" },
  { name: "Faq", href: "/pages/faqs" },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const { totalWishlist } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [bestSellersOpen, setBestSellersOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [mobileBestSellersOpen, setMobileBestSellersOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (accountRef.current && !accountRef.current.contains(target)) setAccountOpen(false);
      if (bestSellersRef.current && !bestSellersRef.current.contains(target)) setBestSellersOpen(false);
      if (pagesRef.current && !pagesRef.current.contains(target)) setPagesOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(target)) setCurrencyOpen(false);
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(target)) setCategoryOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams({ q: query.trim() });
      if (category !== "all") params.set("category", category);
      router.push(`/search?${params.toString()}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="hidden md:block bg-primary text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2"><Mail size={14} /> info@example.com</span>
            <span className="flex items-center gap-2"><Phone size={14} /> 0000 - 123456789</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="X" className="hover:opacity-80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.5h3.7l-8 9.2 9.4 12.3h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.9L0 1.5h7.6l5.3 7 6-7Zm-1.3 19.3h2L6.5 3.6H4.3l13.3 17.2Z" /></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:opacity-80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" /></svg>
            </a>
            <a href="#" aria-label="Pinterest" className="hover:opacity-80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.086 3.163 9.42 7.627 11.164-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.195.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.223.083.345-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.4.161-1.495-.696-2.43-2.884-2.43-4.64 0-3.778 2.745-7.252 7.914-7.252 4.155 0 7.387 2.961 7.387 6.919 0 4.129-2.603 7.452-6.219 7.452-1.215 0-2.357-.631-2.747-1.378 0 0-.601 2.291-.746 2.85-.271 1.043-1.002 2.35-1.492 3.146 1.123.347 2.317.534 3.556.534 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c2.7 0 3 0 4.1.1 1.1 0 1.7.2 2.1.4.5.2.9.5 1.3.9.4.4.6.7.9 1.3.2.4.4 1 .4 2.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.7-.4 2.1-.2.5-.5.9-.9 1.3-.4.4-.7.6-1.3.9-.4.2-1 .4-2.1.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.7-.2-2.1-.4a3.7 3.7 0 0 1-1.3-.9 3.7 3.7 0 0 1-.9-1.3c-.2-.4-.4-1-.4-2.1C2.2 15 2.2 14.7 2.2 12s0-3 .1-4.1c0-1.1.2-1.7.4-2.1.2-.5.5-.9.9-1.3.4-.4.7-.6 1.3-.9.4-.2 1-.4 2.1-.4C8 2.2 8.3 2.2 12 2.2Zm0 1.8c-2.6 0-2.9 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1.1.1 1.4.1 4 .1s2.9 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1.1.1-1.4.1-4s0-2.9-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1a2.6 2.6 0 0 0-1-.6c-.3-.1-.8-.3-1.7-.3-1.1-.1-1.4-.1-4-.1Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-2a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-full.png"
              alt="Groca Logo"
              width={180}
              height={55}
              priority
              className="h-9 sm:h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className={`italic text-sm font-bold transition-colors ${pathname === "/" ? "text-primary" : "text-gray-800 hover:text-primary"}`}>{t("home")}</Link>
            <Link href="/collections" className="italic text-sm font-bold text-gray-800 hover:text-primary">{t("shop")}</Link>

            <div className="relative" ref={bestSellersRef}>
              <button type="button" onClick={() => setBestSellersOpen((p) => !p)} className="flex items-center gap-1 italic text-sm font-bold text-gray-800 hover:text-primary">
                {t("bestSellers")}
                <ChevronDown size={14} className={`transition-transform ${bestSellersOpen ? "rotate-180" : ""}`} />
              </button>
              {bestSellersOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-4xl bg-white border border-gray-200 rounded-lg shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 z-50">
                  {categoryMenu.map((col) => (
                    <div key={col.slug}>
                      <Link href={`/collections/${col.slug}`} onClick={() => setBestSellersOpen(false)} className="block bg-primary text-white text-sm font-bold rounded px-3 py-2 mb-3 hover:bg-primary">{col.title}</Link>
                      <ul className="space-y-2">
                        {col.items.map((item) => (
                          <li key={item}><Link href={`/search?q=${encodeURIComponent(item)}`} onClick={() => setBestSellersOpen(false)} className="text-xs text-gray-600 hover:text-primary">- {item}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/deal-of-the-day" className={`italic text-sm font-bold transition-colors ${pathname === "/deal-of-the-day" ? "text-primary" : "text-gray-800 hover:text-primary"}`}>{t("dealOfTheDay")}</Link>

            <div className="relative" ref={pagesRef}>
              <button type="button" onClick={() => setPagesOpen((p) => !p)} className="flex items-center gap-1 italic text-sm font-bold text-gray-800 hover:text-primary">
                {t("pages")}
                <ChevronDown size={14} className={`transition-transform ${pagesOpen ? "rotate-180" : ""}`} />
              </button>
              {pagesOpen && (
                <div className="absolute mt-4 w-44 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                  {pagesMenu.map((p) => (
                    <Link key={p.name} href={p.href} onClick={() => setPagesOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">{p.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pages/contact-us" className="italic text-sm font-bold text-gray-800 hover:text-primary">{t("contactUs")}</Link>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <button type="button" onClick={() => setSearchOpen((p) => !p)} className="lg:hidden group p-1 -m-1" aria-label="Toggle search">
              <Search size={20} className="text-gray-700 group-hover:text-primary group-active:text-primary transition-colors" />
            </button>

            <div className="relative" ref={accountRef}>
              <button type="button" onClick={() => setAccountOpen((p) => !p)} className="text-gray-700 hover:text-primary active:text-primary p-1 -m-1" aria-label="Account menu">
                <User size={20} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">Hi, <span className="font-semibold text-gray-800">{user.name}</span></div>
                      <button type="button" onClick={() => { logout(); setAccountOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary text-left">
                        <LogIn size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/account/login" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                        <LogIn size={16} /> {t("login")}
                      </Link>
                      <Link href="/account/register" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary">
                        <UserPlus size={16} /> {t("createAccount")}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={openCart} className="relative text-gray-700 hover:text-primary active:text-primary p-1 -m-1">
              <ShoppingCart size={20} />
              {totalItems > 0 && (<span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{totalItems}</span>)}
            </button>

            <Link href="/wishlist" className="relative text-gray-700 hover:text-primary active:text-primary p-1 -m-1">
              <Heart size={20} />
              {totalWishlist > 0 && (<span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{totalWishlist}</span>)}
            </Link>

            <div className="relative hidden md:block" ref={currencyRef}>
              <button type="button" onClick={() => setCurrencyOpen((p) => !p)} className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-primary">
                <span>{getFlagEmoji(currency.country)}</span>
                <span>{currency.country}</span>
                <ChevronDown size={12} className={`transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 mt-3 w-52 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {CURRENCIES.map((c) => (
                    <button key={c.code} type="button" onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }} className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${c.code === currency.code ? "text-primary font-semibold" : "text-gray-700"}`}>
                      <span>{getFlagEmoji(c.country)}</span>
                      <span className="font-medium">{c.country}</span>
                      <span className="text-gray-500">{c.label}</span>
                      <span className="text-xs text-gray-400 ml-auto">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative hidden md:block" ref={langRef}>
              <button type="button" onClick={() => setLangOpen((p) => !p)} className="flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                <span>{language.label}</span>
                <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} type="button" onClick={() => { setLanguage(l.code); setLangOpen(false); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${l.code === language.code ? "text-primary font-semibold" : "text-gray-700"}`}>
                      {l.nativeLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" onClick={() => setMobileMenuOpen((p) => !p)} className="lg:hidden group p-1 -m-1" aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <X size={22} className="text-gray-700 group-hover:text-primary group-active:text-primary transition-colors" />
              ) : (
                <Menu size={22} className="text-gray-700 group-hover:text-primary group-active:text-primary transition-colors" />
              )}
            </button>
          </div>
        </div>

        <div className={`border-t bg-white ${searchOpen ? "block" : "hidden"} lg:block`}>
          <form onSubmit={handleSearchSubmit} className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-stretch gap-2 sm:gap-3">
            <div className="relative" ref={categoryRef}>
              <button type="button" onClick={() => setCategoryOpen((p) => !p)} className="flex items-center gap-2 border border-gray-300 rounded-full pl-3 sm:pl-4 pr-3 h-full text-sm bg-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
                <span className="hidden sm:inline">
                  {category === "all" ? t("allCategories") : categoryMenu.find((c) => c.slug === category)?.title}
                </span>
                <span className="sm:hidden">
                  {category === "all" ? t("allCategories").split(" ")[0] : categoryMenu.find((c) => c.slug === category)?.title}
                </span>
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  <button type="button" onClick={() => { setCategory("all"); setCategoryOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-100 ${category === "all" ? "text-primary font-semibold" : "text-gray-700"}`}>
                    {t("allCategories")}
                  </button>
                  {categoryMenu.map((c) => (
                    <button key={c.slug} type="button" onClick={() => { setCategory(c.slug); setCategoryOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-100 ${category === c.slug ? "text-primary font-semibold" : "text-gray-700"}`}>
                      {c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-stretch flex-1 rounded-full border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("searchPlaceholder")} className="flex-1 min-w-0 px-3 sm:px-4 py-2 text-sm focus:outline-none" />
              <button type="submit" aria-label={t("search")} className="bg-primary text-white px-4 sm:px-6 hover:bg-primary-dark transition flex items-center justify-center shrink-0">
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white z-40 border-t shadow-lg max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col py-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors hover:bg-primary hover:text-white active:bg-primary active:text-white ${
                  pathname === "/" ? "bg-primary text-white" : "text-gray-800"
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors hover:bg-primary hover:text-white active:bg-primary active:text-white ${
                  pathname === "/collections" ? "bg-primary text-white" : "text-gray-800"
                }`}
              >
                {t("shop")}
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileBestSellersOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-6 py-3 text-base font-medium text-gray-800 hover:bg-primary hover:text-white active:bg-primary active:text-white transition-colors"
                >
                  {t("bestSellers")}
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${mobileBestSellersOpen ? "rotate-90" : ""}`}
                  />
                </button>
                {mobileBestSellersOpen && (
                  <div className="pb-2">
                    {categoryMenu.map((col) => (
                      <Link
                        key={col.slug}
                        href={`/collections/${col.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block pl-10 pr-6 py-2 text-sm text-gray-600 hover:text-primary active:text-primary"
                      >
                        {col.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/deal-of-the-day"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors hover:bg-primary hover:text-white active:bg-primary active:text-white ${
                  pathname === "/deal-of-the-day" ? "bg-primary text-white" : "text-gray-800"
                }`}
              >
                {t("dealOfTheDay")}
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobilePagesOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-6 py-3 text-base font-medium text-gray-800 hover:bg-primary hover:text-white active:bg-primary active:text-white transition-colors"
                >
                  {t("pages")}
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${mobilePagesOpen ? "rotate-90" : ""}`}
                  />
                </button>
                {mobilePagesOpen && (
                  <div className="pb-2">
                    {pagesMenu.map((p) => (
                      <Link
                        key={p.name}
                        href={p.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block pl-10 pr-6 py-2 text-sm text-gray-600 hover:text-primary active:text-primary"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/pages/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors hover:bg-primary hover:text-white active:bg-primary active:text-white ${
                  pathname === "/pages/contact-us" ? "bg-primary text-white" : "text-gray-800"
                }`}
              >
                {t("contactUs")}
              </Link>

              {user ? (
                <button
                  type="button"
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 px-6 py-3 mt-2 text-base text-gray-800 border-t text-left hover:text-primary active:text-primary"
                >
                  <LogIn size={18} /> Logout ({user.name})
                </button>
              ) : (
                <Link
                  href="/account/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 mt-2 text-base text-gray-800 border-t hover:text-primary active:text-primary"
                >
                  <LogIn size={18} /> {t("login")}
                </Link>
              )}

              <div className="flex items-center gap-4 px-6 py-4">
                <a href="#" aria-label="X" className="text-gray-600 hover:text-primary active:text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.5h3.7l-8 9.2 9.4 12.3h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.9L0 1.5h7.6l5.3 7 6-7Zm-1.3 19.3h2L6.5 3.6H4.3l13.3 17.2Z" /></svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-primary active:text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" /></svg>
                </a>
                <a href="#" aria-label="Pinterest" className="text-gray-600 hover:text-primary active:text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.086 3.163 9.42 7.627 11.164-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.195.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.223.083.345-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.4.161-1.495-.696-2.43-2.884-2.43-4.64 0-3.778 2.745-7.252 7.914-7.252 4.155 0 7.387 2.961 7.387 6.919 0 4.129-2.603 7.452-6.219 7.452-1.215 0-2.357-.631-2.747-1.378 0 0-.601 2.291-.746 2.85-.271 1.043-1.002 2.35-1.492 3.146 1.123.347 2.317.534 3.556.534 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" /></svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-primary active:text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c2.7 0 3 0 4.1.1 1.1 0 1.7.2 2.1.4.5.2.9.5 1.3.9.4.4.6.7.9 1.3.2.4.4 1 .4 2.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.7-.4 2.1-.2.5-.5.9-.9 1.3-.4.4-.7.6-1.3.9-.4.2-1 .4-2.1.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.7-.2-2.1-.4a3.7 3.7 0 0 1-1.3-.9 3.7 3.7 0 0 1-.9-1.3c-.2-.4-.4-1-.4-2.1C2.2 15 2.2 14.7 2.2 12s0-3 .1-4.1c0-1.1.2-1.7.4-2.1.2-.5.5-.9.9-1.3.4-.4.7-.6 1.3-.9.4-.2 1-.4 2.1-.4C8 2.2 8.3 2.2 12 2.2Zm0 1.8c-2.6 0-2.9 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1.1-.1 1.4-.1 4s0 2.9.1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1.1.1 1.4.1 4 .1s2.9 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1.1.1-1.4.1-4s0-2.9-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1a2.6 2.6 0 0 0-1-.6c-.3-.1-.8-.3-1.7-.3-1.1-.1-1.4-.1-4-.1Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-2a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" /></svg>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}