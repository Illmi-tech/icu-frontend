"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (!email.includes("@")) {
      setStatus("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Thanks for subscribing! 🎉");
        setEmail("");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#53CAE9]/10 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#53CAE9]">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mt-4">
          Get the latest updates on our stories, opportunities, and impact at
          Illmi Children’s Fund.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col md:flex-row items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F15D69] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#d94d59] transition w-full md:w-auto"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-3 text-sm font-medium ${
              status.includes("Thanks")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </motion.div>
    </section>
  );
}
