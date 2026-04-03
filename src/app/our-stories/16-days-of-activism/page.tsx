"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SixteenDaysPage() {
  return (
    <main className="pt-24 px-4 md:px-12 lg:px-24 bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-[#4B2E83] mb-4"
        >
          16 Days of Activism Against Gender-Based Violence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700"
        >
          Raising Awareness and Driving Change
        </motion.p>
      </section>

      {/* Highlight Section */}
      <section className="max-w-5xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8 md:p-12 bg-[#FDBB3E] text-black shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Campaign Highlights
          </h2>
          <p className="text-lg leading-relaxed">
            As part of the global 16 Days of Activism campaign, ICF conducted a
            school outreach program across 16 schools in Abuja. The initiative
            educated students on gender-based violence, inclusivity, gender
            equality, and their rights under the Child Rights Act.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Through interactive sessions, the program empowered young people to
            recognize, prevent, and act against GBV within their communities.
          </p>
        </motion.div>
      </section>

      {/* Project Gallery */}
      <section className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-[#4B2E83] text-center mb-8"
        >
          Project in Action
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["doa1.webp", "doa2.webp", "doa3.webp"].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg border-4 border-[#FDBB3E]"
            >
              <Image
                src={`/stories/16-days-of-activism/${img}`} // Replace with real photos
                alt={`16 Days photo ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
