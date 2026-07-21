import { Truck, Phone, Headphones, RefreshCw } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", subtitle: "Worldwide" },
  { icon: Phone, title: "Helpline", subtitle: "+(000)123-4567" },
  { icon: Headphones, title: "24x7 Support", subtitle: "Free For Customers" },
  { icon: RefreshCw, title: "Returns", subtitle: "30 Days Free Exchanges" },
];

export default function FeatureBar() {
  return (

    <section className="px-6 py-6">
      <div className="bg-[var(--color-primary)] rounded-xl px-6 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-center gap-4 cursor-pointer group">
                <div className="bg-white group-hover:bg-[var(--color-accent-orange)] group-active:bg-[var(--color-accent-orange)] rounded-full p-3 flex items-center justify-center shrink-0 transition-colors duration-200">
                  <Icon
                    size={22}
                    className="text-[var(--color-primary-dark)] group-hover:text-white group-active:text-white transition-colors duration-200"
                  />
                </div>
                <div className="text-white">
                  <p className="font-semibold">{f.title}</p>
                  <p className="text-sm text-white/80">{f.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}