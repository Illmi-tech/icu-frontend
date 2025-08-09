'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, HeartHandshake } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-4"
        >
          Who We Are
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-10"
        >
          Illmi Children’s Fund (ICF) is a nonprofit organization committed to
          bridging gaps in access to education and entrepreneurship — especially for
          women, girls, and marginalized communities. We advocate for inclusive policies
          and fight against all forms of gender-based violence in Nigeria.
        </motion.p>

        {/* Mission, Vision, Values Cards */}
        <div className="grid gap-8 md:grid-cols-3 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#53CAE9] text-white rounded-2xl p-6 shadow-md hover:scale-105 transition-transform"
          >
            <Lightbulb className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              To explore innovative solutions that will transform communities
              through improved equity and excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-[#FDBB3E] text-black rounded-2xl p-6 shadow-md hover:scale-105 transition-transform"
          >
            <Target className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p>
              To secure the right to education and a life free from violence
              for less privileged children in Nigeria.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#F15D69] text-white rounded-2xl p-6 shadow-md hover:scale-105 transition-transform"
          >
            <HeartHandshake className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <ul className="list-disc pl-5 text-left space-y-1">
              <li>Integrity</li>
              <li>Inclusion</li>
              <li>Impact</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
