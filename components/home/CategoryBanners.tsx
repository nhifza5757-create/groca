import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Veggies",
    tagline: "Organic Products",
    image: "/images/promo/veggies.jpg",
    bg: "bg-[#F6C6CE]",
  },
  {
    name: "Fruits",
    tagline: "Fresh Products",
    image: "/images/promo/fruits.jpg",
    bg: "bg-[#F7D046]",
  },
];

export default function CategoryBanners() {
  return (
    <section className="px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="group relative rounded-lg h-48 sm:h-56 overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover object-left"
            />
          </div>

          <div
            className={`absolute inset-y-0 right-0 ${cat.bg} w-[42%] group-hover:w-[46%] group-active:w-[46%] rounded-l-full transition-all duration-300 ease-out flex items-center`}
          >
            <div className="pl-6 pr-4 sm:pl-10 sm:pr-6">
              <h3 className="font-heading italic text-lg sm:text-2xl font-bold mb-1">{cat.name}</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-4">
                <span className="font-bold">100%</span> {cat.tagline}
              </p>
              <Link href="/collections">
                <button className="bg-accent-orange text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-primary active:bg-primary transition-colors duration-300 whitespace-nowrap">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}