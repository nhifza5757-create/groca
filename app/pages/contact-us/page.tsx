"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const inputClass =
    "w-full border border-gray-300 rounded-full px-6 py-4 hover:border-primary focus:border-primary focus:outline-none transition-colors";

  return (
    <>
      <div className="bg-[var(--color-primary)] text-white py-10 text-center transition hover:shadow-lg">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-sm">Home / Contact Us</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10">
          <iframe
            src="https://www.google.com/maps?q=Baltimore,+MD,+USA&output=embed"
            className="w-full h-[400px] rounded-md transition-transform duration-500 hover:scale-[1.01] hover:shadow-md"
            loading="lazy"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Phone */}
          <div className="border border-gray-200 rounded-md p-8 h-56 flex flex-col justify-center transition-transform duration-300 hover:border-primary hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white flex items-center justify-center rounded mb-4">
              <Phone size={18} />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-sm text-gray-500">Toll Free: 0803 - 080 - 3081</p>
            <p className="text-sm text-gray-500">Fax: 0000 - 123 - 456789</p>
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-md p-8 h-56 flex flex-col justify-center transition-transform duration-300 hover:border-primary hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white flex items-center justify-center rounded mb-4">
              <Mail size={18} />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-gray-500">mail@example.com</p>
            <p className="text-sm text-gray-500">support@example.com</p>
          </div>

          {/* Address */}
          <div className="border border-gray-200 rounded-md p-8 h-56 flex flex-col justify-center transition-transform duration-300 hover:border-primary hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white flex items-center justify-center rounded mb-4">
              <MapPin size={18} />
            </div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-sm text-gray-500">
              No: 58 A, East Madison Street,
              <br />
              Baltimore, MD, USA 4508
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitted && (
            <p className="text-[var(--color-primary-dark)] text-sm bg-[var(--color-surface)] px-4 py-3 rounded-md transition animate-fadeIn">
              Thanks! Your message has been sent — we&apos;ll get back to you soon.
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>

          <textarea
            rows={6}
            placeholder="Comment"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-6 py-4 mt-6 hover:border-primary focus:border-primary focus:outline-none transition-colors"
          />

          <div className="flex justify-center">
            <Button className="mt-5 px-14 hover:bg-orange-600 hover:shadow-md hover:scale-105 transition-transform transition-colors duration-300">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
