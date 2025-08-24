// src/app/projects/tarm/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TARM() {
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
          style={{ color: "#FF6F61" }}
        >
          Training, Advocacy, Research and Mentorship (TARM)
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Safe schools and stronger futures for adolescent girls
        </p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-16 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/projects/tarm/hero.webp" // replace with actual hero image path
          alt="TARM Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center px-4">
            Empowering Teachers, Protecting Girls, Building Safer Schools
          </h2>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto text-gray-700 leading-relaxed mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
          Adolescent girls in Nigeria face unique challenges: early marriage,
          gender-based violence, and cultural barriers that often cut their
          education short. TARM responds by training female teachers as mentors,
          advocates, and protectors who guide adolescent girls to stay in school
          and pursue higher aspirations.
        </p>

        <div
          className="bg-white shadow-md rounded-xl p-6 border-l-4"
          style={{ borderColor: "#FF6F61" }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: "#FF6F61" }}
          >
            Impact so far
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              More than <strong>1,000 teachers</strong> have been equipped with
              knowledge and tools to support adolescent girls in safe and
              effective ways.
            </li>
            <li>
              Over <strong>3,500 adolescent girls</strong> have been mentored,
              encouraged, and supported to complete their secondary school
              education, opening doors to higher learning and career
              opportunities.
            </li>
          </ul>
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
          style={{ color: "#FF6F61" }}
        >
          Project Photos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["tarm1", "tarm2", "tarm3"].map((photo, index) => (
            <motion.div
              key={photo}
              className="relative w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Image
                src={`/projects/tarm/${photo}.webp`} // replace with actual images
                alt={`TARM ${photo}`}
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
