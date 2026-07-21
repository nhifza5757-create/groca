import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 0 5.396 0 12.017c0 5.086 3.163 9.42 7.627 11.164-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.195.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.223.083.345-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.4.161-1.495-.696-2.43-2.884-2.43-4.64 0-3.778 2.745-7.252 7.914-7.252 4.155 0 7.387 2.961 7.387 6.919 0 4.129-2.603 7.452-6.219 7.452-1.215 0-2.357-.631-2.747-1.378 0 0-.601 2.291-.746 2.85-.271 1.043-1.002 2.35-1.492 3.146 1.123.347 2.317.534 3.556.534 6.621 0 12.017-5.396 12.017-12.017C24.034 5.396 18.638 0 12.017 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.256 1.216.6 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5zm5.25-8.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" />
    </svg>
  );
}

function PaymentBadge({ label, bg }: { label: string; bg: string }) {
  return (
    <span
      className="text-white text-[10px] font-bold px-2.5 py-1.5 rounded"
      style={{ backgroundColor: bg }}
    >
      {label}
    </span>
  );
}

const HELP_LINKS = [
  { label: "Search", href: "/search" },
  { label: "Help", href: "/pages/faqs" },
  { label: "Information", href: "/pages/about-us" },
  { label: "Privacy Policy", href: "/pages/about-us" },
  { label: "Shipping Information", href: "/pages/shipping-details" },
];

const SUPPORT_LINKS = [
  { label: "Contact", href: "/pages/contact-us" },
  { label: "About Us", href: "/pages/about-us" },
  { label: "Carrers", href: "/pages/contact-us" },
  { label: "Refund & Returns", href: "/pages/shipping-details" },
  { label: "Deliveries", href: "/pages/shipping-details" },
];

const INFO_LINKS = [
  { label: "Search Terms", href: "/pages/faqs" },
  { label: "Advanced Search", href: "/search" },
  { label: "Helps & Faqs", href: "/pages/faqs" },
  { label: "Store Location", href: "/pages/contact-us" },
  { label: "Orders & Returns", href: "/pages/contact-us" },
];
export default function Footer() {
  return (
    <footer className="relative text-gray-300 mt-auto overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/promo/footer-bg.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gray-900/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Image
            src="/images/logo-full.png"
            alt="Groca Grocery Mart"
            width={170}
            height={50}
            className="object-contain h-11 w-auto mb-4"
          />

         <ul className="space-y-3 text-sm">
  <li className="flex items-start gap-3">
    <MapPin
      size={18}
      className="text-white mt-0.5 flex-shrink-0"
      strokeWidth={2}
    />
    <span className="leading-6">
      No: 58 A, East Madison Street,
      <br />
      Baltimore, MD, USA 4508
    </span>
  </li>

  <li className="flex items-center gap-3">
    <Phone
      size={18}
      className="text-white flex-shrink-0"
      strokeWidth={2}
    />
    <span>423-845-6570</span>
  </li>

  <li className="flex items-center gap-3">
    <Mail
      size={18}
      className="text-white flex-shrink-0"
      strokeWidth={2}
    />
    <span>random@email.com</span>
  </li>
</ul>

 <div className="flex items-center gap-4 mt-5 text-white">
  <a href="#" className="hover:text-[var(--color-primary)] active:text-[var(--color-primary)] transition-colors">
    <TwitterIcon />
  </a>

  <a href="#" className="hover:text-[var(--color-primary)] active:text-[var(--color-primary)] transition-colors">
    <FacebookIcon />
  </a>

  <a href="#" className="hover:text-[var(--color-primary)] active:text-[var(--color-primary)] transition-colors">
    <PinterestIcon />
  </a>

  <a href="#" className="hover:text-[var(--color-primary)] active:text-[var(--color-primary)] transition-colors">
    <InstagramIcon />
  </a>
</div>

</div> 

<FooterColumn title="Help" links={HELP_LINKS} />
<FooterColumn title="Support" links={SUPPORT_LINKS} />
<FooterColumn title="Information" links={INFO_LINKS} />         

      </div>

      <div className="relative border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Groca. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <PaymentBadge label="VISA" bg="#1A1F71" />
            <PaymentBadge label="MC" bg="#EB001B" />
            <PaymentBadge label="PayPal" bg="#003087" />
            <PaymentBadge label="Diners" bg="#0079BE" />
            <PaymentBadge label="Discover" bg="#FF6000" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-[var(--color-primary)] active:text-[var(--color-primary)] transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}