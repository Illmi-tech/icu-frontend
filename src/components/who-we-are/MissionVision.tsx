'use client';

import { motion } from 'framer-motion';

export default function MissionVision() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-12"
        >
          Our Mission & Vision
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-700">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#fef3f2] p-6 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold text-[#53CAE9] mb-3">Mission</h3>
            <p>
              To explore innovative solutions that will transform communities through improved equity and excellence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#fef3f2] p-6 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold text-[#53CAE9] mb-3">Vision</h3>
            <p>
              To secure the right to education and a life free from violence for less privileged children in Nigeria.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
