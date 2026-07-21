import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import BlogComments from "@/components/blog/BlogComments";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blogs" className="hover:underline">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{post.title}</span>
      </nav>

      <div className="relative w-full h-72 rounded-lg overflow-hidden mb-6">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <p className="text-sm text-gray-400 mb-2">
        {post.author} · {post.date}
      </p>
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

      <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
        {post.content}
      </div>

      <Link
        href="/blogs"
        className="inline-block mt-8 text-primary font-medium hover:underline"
      >
        ← Back to Blog
      </Link>

    <BlogComments slug={post.slug} />
    </section>
  );
}