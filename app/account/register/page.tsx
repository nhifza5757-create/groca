"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    const result = register(name, email, password);
    if (!result.success) {
      setError(result.error ||"Unable to create account." );
      return;
    }
    router.push("/");
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm bg-white hover:border-primary focus:border-primary focus:outline-none transition-colors";

  return (
    <section>
      <div className="bg-primary py-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
        <p className="text-white/90 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Create Account
        </p>
      </div>

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 transition hover:shadow-lg hover:-translate-y-1">
          <h2 className="text-xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />

            {error && (
              <p className="text-sm text-[var(--color-accent-red)]">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-full font-medium hover:bg-orange-600 transition-colors hover:shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center justify-between mt-5 text-sm">
            <Link
              href="/account/login"
              className="text-gray-900 hover:text-primary transition-colors hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
