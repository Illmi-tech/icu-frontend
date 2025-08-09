'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#53CAE9] mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2021, Illmi Children’s Fund (ICF) is a non-profit organization committed 
            to bridging gaps in access to education and entrepreneurship, with a focus on empowering 
            marginalized communities, particularly women and girls. We work to advance policy advocacy 
            and combat all forms of gender-based violence.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-72 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            src="/images/who-we-are.jpg"
            alt="ICF About Us"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
