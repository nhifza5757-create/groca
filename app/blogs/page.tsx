import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export default function BlogsPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Our Blog</h1>
      <p className="text-gray-600 mb-8">
        Tips, recipes, and news from the Groca team.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((b) => (
          <div
            key={b.slug}
            className="group border rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Link href={`/blogs/${b.slug}`}>
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className="p-5">
              <p className="text-xs text-gray-400 mb-2">
                {b.author} · {b.date}
              </p>
              <Link href={`/blogs/${b.slug}`}>
                <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                  {b.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-3">{b.excerpt}</p>
              <Link
                href={`/blogs/${b.slug}`}
                className="text-primary text-sm font-medium hover:underline"
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
