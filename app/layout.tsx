import type { Metadata } from "next";
import { Lemonada, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import NewsletterPopup from "@/components/home/NewsletterPopup";
import CookieConsent from "@/components/layout/CookieConsent";
import { CartProvider } from "@/hooks/CartContext";
import { WishlistProvider } from "@/hooks/WishlistContext";
import { CurrencyProvider } from "@/hooks/CurrencyContext";
import { LanguageProvider } from "@/hooks/LanguageContext";
import { AuthProvider } from "@/hooks/AuthContext";

const lemonada = Lemonada({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groca - Organic Grocery Store",
  description: "Your one-stop shop for fresh organic groceries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lemonada.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <CurrencyProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <CartDrawer />
                  <NewsletterPopup />
                  <CookieConsent />
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}