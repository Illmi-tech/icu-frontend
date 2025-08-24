// src/app/projects/assh/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ASSHPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Heading Section */}
      <section className="bg-[#2E8B57] text-white py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Animal Source of Sustainable Health (ASSH)
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg max-w-3xl mx-auto"
        >
          Sustaining livelihoods, strengthening families
        </motion.p>
      </section>

      {/* Hero Section with Image */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <motion.img
          src="/projects/assh/hero.webp"
          alt="ASSH Project Hero"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-lg leading-relaxed text-gray-700"
        >
          For Fulani pastoralists, cattle are a lifeline. The Ruga livelihood
          support is a project that empowered the vulnerable and marginalized
          Fulani group through improving their existing means of livelihood
          (Dairy milk production). The project is targeted at promoting the
          healthy rearing of cattle, improving the financial outcomes of the
          beneficiaries, and equipping the beneficiaries with financial literacy
          skills that will lead to effective business management and accounting.
          The ASSH project trained Community Animal Health Workers (CAHW) within
          the community, which ensures sustainability.
        </motion.p>
      </section>

      {/* Impact Section (unique layout) */}
      {/* Impact Section - Unique Timeline Layout */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-gray-50">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-[#2E7D32]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Impact So Far
        </motion.h2>

        <div className="relative border-l-4 border-[#2E7D32] max-w-3xl mx-auto space-y-10">
          {/* Milestone 1 */}
          <motion.div
            className="ml-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#2E7D32] border-4 border-white shadow-md"></div>
            <h3 className="text-xl font-semibold text-[#2E7D32]">
              Improved Dairy Output & Income Stability
            </h3>
            <p className="text-gray-700 mt-2">
              Beneficiaries have seen significant improvements in dairy output and income stability.
            </p>
          </motion.div>

          {/* Milestone 2 */}
          <motion.div
            className="ml-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#2E7D32] border-4 border-white shadow-md"></div>
            <h3 className="text-xl font-semibold text-[#2E7D32]">
              Family Empowerment
            </h3>
            <p className="text-gray-700 mt-2">
              Families have been trained in bookkeeping, business management, and financial planning, 
              helping them turn subsistence into sustainable livelihoods.
            </p>
          </motion.div>

          {/* Milestone 3 */}
          <motion.div
            className="ml-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#2E7D32] border-4 border-white shadow-md"></div>
            <h3 className="text-xl font-semibold text-[#2E7D32]">
              Community Sustainability
            </h3>
            <p className="text-gray-700 mt-2">
              The establishment of local Animal Health Workers (CAHW) has created resilience that endures 
              beyond project cycles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Photos Section (3-photo grid) */}
      <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-[#2E8B57]"
        >
          Project Photos
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.img
            src="/projects/assh/assh1.webp"
            alt="ASSH Photo 1"
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg object-cover w-full h-64"
          />
          <motion.img
            src="/projects/assh/assh2.webp"
            alt="ASSH Photo 2"
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg object-cover w-full h-64"
          />
          <motion.img
            src="/projects/assh/assh3.webp"
            alt="ASSH Photo 3"
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg object-cover w-full h-64"
          />
        </div>
      </section>
    </div>
  );
}
