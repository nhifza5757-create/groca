import Link from "next/link";

export default function ShippingDetailsPage() {
  return (
    <section>
      <div className="bg-primary py-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Shipping Details</h1>
        <p className="text-white/90 text-sm">
          <Link href="/" className="hover:underline">Home</Link> / Shipping Details
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-bold text-base">Returns policy</h2>
        <p>
          You may return most new, unopened items within 30 days of delivery for a
          full refund. We&apos;ll also pay the return shipping costs if the return
          is a result of our error (you received an incorrect or defective item, etc.).
        </p>
        <p>
          You should expect to receive your refund within four weeks of giving your
          package to the return shipper, however, in many cases you will receive a
          refund more quickly. This time period includes the transit time for us to
          receive your return from the shipper (5 to 10 business days), the time it
          takes us to process your return once we receive it (3 to 5 business days),
          and the time it takes your bank to process our refund request (5 to 10
          business days).
        </p>
        <p>
          If you need to return an item, simply login to your account, view the
          order using the &apos;Complete Orders&apos; link under the My Account menu
          and click the Return Item(s) button. We&apos;ll notify you via e-mail of
          your refund once we&apos;ve received and processed the returned item.
        </p>

        <h2 className="font-bold text-base pt-4">Shipping details</h2>
        <p>
          We can ship to virtually any address in the world. Note that there are
          restrictions on some products, and some products cannot be shipped to
          international destinations.
        </p>
        <p>
          When you place an order, we will estimate shipping and delivery dates for
          you based on the availability of your items and the shipping options you
          choose. Depending on the shipping provider you choose, shipping date
          estimates may appear on the shipping quotes page.
        </p>
        <p>
          Please also note that the shipping rates for many items we sell are
          weight-based. The weight of any such item can be found on its detail page.
          To reflect the policies of the shipping companies we use, all weights will
          be rounded up to the next full pound.
        </p>
      </div>
    </section>
  );
}