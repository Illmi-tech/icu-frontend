// src/app/projects/walk-in-their-shoes/page.tsx
"use client";

import { motion } from "framer-motion";

export default function WalkInTheirShoes() {
  return (
    <div className="px-6 md:px-16 py-12 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">
          Walk in Their Shoes (WITS)
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Turning compassion into opportunity for out-of-school children
        </p>
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
          ICF’s Walk in Their Shoes project is a nationwide campaign supporting
          out-of-school children in Nigeria through a digital crowdfunding
          initiative. The annual fundraiser empowers children, especially girls,
          to pursue education and achieve their dreams.
        </p>
        <p>
          Since its inception, WITS has awarded over 800 scholarships to
          underserved children, opening doors to brighter futures and breaking
          cycles of poverty.
        </p>
        <p>
          Each contribution helps turn hope into opportunity, ensuring no child
          has to walk alone on the path to learning.
        </p>
      </motion.div>

      {/* Project Photos */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Project Photos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["photo1", "photo2", "photo3"].map((photo, index) => (
            <motion.div
              key={photo}
              className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <span className="text-gray-500">Insert project photo</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
