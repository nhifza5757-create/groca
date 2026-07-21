import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LatestBlog() {
  return (
    <section className="px-6 py-16">
      <SectionHeading
        title="Latest News"
        subtitle="Tips, recipes and stories from our kitchen to yours"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogPosts.map((b) => (
          <div key={b.slug} className="rounded-lg overflow-hidden">
            <Link href={`/blogs/${b.slug}`}>
              <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="pt-5">
              <p className="text-xs text-gray-400 mb-2">
                {b.author} · {b.date}
              </p>
              <Link href={`/blogs/${b.slug}`}>
                <h3 className="font-semibold mb-2 hover:text-[var(--color-primary-dark)] active:text-[var(--color-primary-dark)] transition-colors">
                  {b.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-4">{b.excerpt}</p>
              <Link
                href={`/blogs/${b.slug}`}
                className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-accent-orange)] active:bg-[var(--color-accent-orange)] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}