// src/app/projects/digitgals/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DIGITSGALS() {
  return (
    <div className="px-6 md:px-16 py-12 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{ color: "#FDBB3E" }}
        >
          DIGITSGALS
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Closing the digital divide for girls in secondary schools
        </p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="relative mb-16 h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/projects/digitgals/hero.webp"
          alt="DIGITSGALS Hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto text-gray-700 leading-relaxed mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
          Technology shapes the future, yet girls in public schools remain
          excluded from digital opportunities. DIGITSGALS, implemented in
          partnership with the National Information Technology Development
          Agency (NITDA), equips adolescent girls with digital literacy skills
          that expand their horizons and confidence.
        </p>
      </motion.div>

      {/* Impact Section (styled like CCLM page) */}
      <motion.div
        className="max-w-5xl mx-auto mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-2xl md:text-3xl font-semibold text-center mb-8"
          style={{ color: "#FDBB3E" }}
        >
          Impact so far
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "DIGITSGALS 1.0 trained 50 female students in core digital skills, while DIGITSGALS 2.0 scaled up to reach 100 participants.",
            "Students learned online safety, content creation, and digital presentation skills over an intensive three-week training.",
            "The program has built a foundation for young girls to participate fully in the digital economy.",
          ].map((point, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border-t-4"
              style={{ borderColor: "#FDBB3E" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <p className="text-gray-700">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Photos */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "#FDBB3E" }}
        >
          Project Photos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["dg1", "dg2", "dg3"].map((photo, index) => (
            <motion.div
              key={photo}
              className="relative w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Image
                src={`/projects/digitgals/${photo}.webp`}
                alt={`DIGITSGALS Project ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
