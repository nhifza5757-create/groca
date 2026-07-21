"use client";

import { useState } from "react";

type Comment = {
  id: string;
  name: string;
  text: string;
  date: string;
};

const initialCommentsBySlug: Record<string, Comment[]> = {
  "best-quality-fresh-meat-seafood": [
    {
      id: "1",
      name: "Joe",
      text: "Massa vitae tortor condimentum lacinia quis vel eros donec ac.",
      date: "May 20, 2026",
    },
    {
      id: "2",
      name: "Sanjau",
      text: "The seafood tips here are really helpful, thanks!",
      date: "May 15, 2026",
    },
  ],
  "best-way-to-eat-dry-fruits-nuts": [
    {
      id: "1",
      name: "Emy",
      text: "Never knew soaking almonds overnight made such a difference!",
      date: "May 18, 2026",
    },
    {
      id: "2",
      name: "Ravi",
      text: "Great reminder to not overeat nuts, easy to lose track.",
      date: "May 12, 2026",
    },
  ],
  "fruits-vegetable-nutrients-for-health": [
    {
      id: "1",
      name: "Lindse",
      text: "Five servings a day is a great goal, thanks for the breakdown.",
      date: "May 22, 2026",
    },
    {
      id: "2",
      name: "Mc Berry",
      text: "Love the tip about leafy greens and vitamin K.",
      date: "May 10, 2026",
    },
  ],
};

type BlogCommentsProps = {
  slug: string;
};

export default function BlogComments({ slug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(
    initialCommentsBySlug[slug] ?? []
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !text.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setComments((prev) => [newComment, ...prev]);
    setName("");
    setEmail("");
    setText("");
    setError("");
  };

  const inputClass =
    "border border-primary/30 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors";

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-xl font-bold mb-6">{comments.length} Comments</h2>

      <div className="space-y-4 mb-10">
        {comments.map((c) => (
          <div
            key={c.id}
            className="border border-primary/30 rounded-lg p-4 transition-transform duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-gray-700 mb-3">{c.text}</p>
            <p className="text-xs text-gray-400">
              <span className="font-medium">{c.name}</span> · {c.date}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-4">Leave A Comment</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <textarea
          placeholder="Comment *"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full border border-primary/30 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
        />

        {error && <p className="text-[var(--color-accent-red)] text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-full 
                     hover:bg-orange-600 hover:shadow-md hover:scale-105 
                     transition-transform transition-colors duration-300"
        >
          Post Comment
        </button>
      </form>
    </section>
  );
}
