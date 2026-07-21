import Image from "next/image";
import Link from "next/link";
import { Cherry, Egg, Beef, Leaf } from "lucide-react";

// Images now come from public/images/about/ — each one reveals a caption
// overlay on hover (like the real site's "Egg Supplies" / "Fruits & Nuts" text).
const GALLERY_IMAGES: { src: string; caption: string }[] = [
  { src: "/images/about/gallery-1.jpg", caption: "Egg Supplies" },
  { src: "/images/about/gallery-2.jpg", caption: "Fruits & Nuts" },
  { src: "/images/about/gallery-3.jpg", caption: "Grains & Flours" },
  { src: "/images/about/gallery-4.jpg", caption: "Nutri-Gains" },
  { src: "/images/about/gallery-5.jpg", caption: "Pure Veggies" },
  { src: "/images/about/gallery-6.jpg", caption: "All Nutrients" },
];

const HIGHLIGHTS = [
  {
    icon: Cherry,
    title: "Keeps Healthy Record",
    text: "We track the freshness and nutrition of every item we stock, so you always know exactly what you're bringing home to your family.",
  },
  {
    icon: Beef,
    title: "Meats Reduces Fat",
    text: "Our lean, farm-sourced meats are trimmed and prepared with care, giving you protein-rich options without the extra fat.",
  },
  {
    icon: Egg,
    title: "Eggs Make you Fit",
    text: "Packed with high-quality protein and essential nutrients, our farm-fresh eggs are a simple way to support a healthy, active lifestyle.",
  },
  {
    icon: Leaf,
    title: "Pure Green Vegetables",
    text: "Every vegetable on our shelves is grown organically and harvested at peak freshness, free from harmful pesticides and additives.",
  },
];

const SERVICES = [
  {
    icon: Beef,
    title: "Keeps Healthy Record",
    text: "We keep a close eye on where our produce and meats come from, so every product on our shelves meets a high standard of quality.",
  },
  {
    icon: Egg,
    title: "Eggs Make you Fit",
    text: "Sourced daily from trusted local farms, our eggs are a reliable, affordable way to add protein to any meal.",
  },
  {
    icon: Leaf,
    title: "Meats Reduces Fat",
    text: "We select cuts that are naturally lower in fat, helping you cook healthier meals without sacrificing flavor.",
  },
];

// To add a real photo later, just put the path in the `photo` field,
// e.g. "/images/team/lal.jpg". If no photo is given, an initials avatar
// is shown instead — no other code changes needed.
const TEAM: { name: string; role: string; photo?: string }[] = [
  { name: "June Celine", role: "Marketing Manager", photo: "/images/team/june.jpg" },
  { name: "Lal Johnson", role: "Store Manager", photo: "/images/team/lal.jpg" },
  { name: "Laila Berlinze", role: "Front Office",photo: "/images/team/laila.jpg"  },
  { name: "Sam Milton", role: "Human Resource" , photo: "/images/team/sam.jpg" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function CitrusSlice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="48" fill="var(--color-accent-orange)" opacity="0.9" />
      <circle cx="50" cy="50" r="38" fill="#FDE9A8" />
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 36 * Math.cos((i * Math.PI) / 4)}
          y2={50 + 36 * Math.sin((i * Math.PI) / 4)}
          stroke="var(--color-accent-orange)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function AboutUsPage() {
  return (
    <div>
      {/* Green title banner */}
      <div className="bg-[var(--color-primary)] py-14 text-center">
        <h1 className="text-4xl font-bold italic text-white mb-2">About Us</h1>
        <p className="text-white/90 text-sm">
          <Link href="/" className="hover:underline">Home</Link> / About Us
        </p>
      </div>

      {/* Image gallery grid */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="group relative h-64 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={img.src}
              alt={img.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white italic text-xl font-semibold mb-2">{img.caption}</p>
              <span className="w-10 h-0.5 bg-[var(--color-primary)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Know About Nutrio Programme */}
      <section className="bg-[var(--color-primary)] px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold italic text-white mb-2">
          Know About Nutrio Programme
        </h2>
        <p className="text-white/80 text-sm mb-12">Simple habits for a healthier everyday life</p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.title} className="flex items-start gap-4">
                <div className="order-2 md:order-1">
                  <h3 className="text-white font-bold italic mb-2">{h.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{h.text}</p>
                </div>
                <div className="order-1 md:order-2 shrink-0 bg-white rounded-full w-14 h-14 flex items-center justify-center">
                  <Icon size={24} className="text-[var(--color-primary-dark)]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Services */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-[var(--color-primary-dark)] font-bold italic mb-1">Our Services</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What we provide</h2>

          <div className="space-y-8">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex gap-4">
                  <Icon size={22} className="text-[var(--color-accent-orange)] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative h-80 md:h-full min-h-[320px] rounded-lg overflow-hidden bg-gray-100">
          <Image src="/images/blog/blog-1.jpg" alt="Grocery shopping" fill className="object-cover" />
        </div>
      </section>

      {/* Our Team */}
      <section className="relative bg-[var(--color-accent-yellow)] px-6 py-16 overflow-hidden">
        <CitrusSlice className="absolute -left-6 top-10 w-24 h-24 opacity-80 rotate-12" />
        <CitrusSlice className="absolute right-10 top-6 w-16 h-16 opacity-70 -rotate-12" />
        <CitrusSlice className="absolute left-1/4 bottom-6 w-12 h-12 opacity-60 rotate-45" />
        <CitrusSlice className="absolute right-1/4 bottom-10 w-20 h-20 opacity-70 -rotate-6" />

        <h2 className="relative text-2xl font-bold italic text-center text-gray-900 mb-2">
          Our Team
        </h2>
        <p className="relative text-center text-gray-700 text-sm mb-12">
          The people behind your everyday grocery run
        </p>

        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[var(--color-primary-dark)] flex items-center justify-center mb-4">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                ) : (
                  <span className="text-white text-3xl font-bold">{initials(member.name)}</span>
                )}
              </div>
              <h4 className="font-bold italic text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-700 italic">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}