import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function SpecialDiscount() {
  return (
    <section className="relative overflow-hidden my-10 bg-[#DDEFC7]">
     
      <div className="hidden lg:block relative h-[480px]">
        <Image
          src="/images/promo/special-discount.png"
          alt="Special discount - fresh groceries"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center px-14">
          <div className="max-w-md">
            <Leaf size={22} className="mb-3 text-[var(--color-primary-dark)]" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Special Discount For All Grocery Products
            </h2>
            <p className="text-gray-700 mb-6">
              Fresh organic groceries delivered to your door — save more on
              every order.
            </p>
            <Link href="/collections">
              <button className="bg-[var(--color-primary)] text-white font-medium px-6 py-3 rounded-full hover:bg-accent-orange active:bg-accent-orange transition-colors">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      
      <div className="lg:hidden flex flex-col sm:flex-row items-center gap-6 px-6 py-10">
        <div className="flex-1 text-center sm:text-left">
          <Leaf size={22} className="mb-3 mx-auto sm:mx-0 text-[var(--color-primary-dark)]" />
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            Special Discount For All Grocery Products
          </h2>
          <p className="text-gray-700 mb-5">
            Fresh organic groceries delivered to your door — save more on
            every order.
          </p>
          <Link href="/collections">
            <button className="bg-[var(--color-primary)] text-white font-medium px-6 py-3 rounded-full hover:bg-accent-orange active:bg-accent-orange transition-colors">
              Buy Now
            </button>
          </Link>
        </div>

        <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 rounded-full overflow-hidden">
          <Image
            src="/images/promo/special-discount.png"
            alt="Special discount - fresh groceries"
            fill
            className="object-cover object-[75%_30%]"
          />
        </div>
      </div>
    </section>
  );
}