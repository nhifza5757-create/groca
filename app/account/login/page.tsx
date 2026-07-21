"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (!result.success) {
      setError(result.error || "Login nahi ho saka.");
      return;
    }
    router.push("/");
  };

  return (
    <section>
      <div className="bg-primary py-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Login</h1>
        <p className="text-white/90 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Login
        </p>
      </div>

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm bg-white hover:border-primary focus:border-primary focus:outline-none transition-colors"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm bg-white hover:border-primary focus:border-primary focus:outline-none transition-colors"
            />

            {error && (
              <p className="text-sm text-[var(--color-accent-red)]">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-accent-orange transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center justify-between mt-5 text-sm">
            <Link href="/account/register" className="text-gray-900 hover:text-primary transition-colors">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}