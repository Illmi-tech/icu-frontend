'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

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
          bridging gaps in access to education and entrepreneurship especially for
          women, girls, and marginalized communities. We advocate for inclusive policies
          and fight against all forms of gender-based violence in Nigeria.
        </motion.p>

        {/* Mission, Vision, Values Cards */}
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#53CAE9] text-white rounded-2xl p-6 shadow-md hover:scale-105 transition-transform"
          >
            <Lightbulb className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              We strengthen education systems that empower every child to thrive by
              advancing equitable opportunities through strategic partnerships,
              evidence-based solutions, policy advocacy, and capacity strengthening,
              fostering safe, inclusive, and sustainable communities.
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
              A Society where strong education systems and empowered communities
              enable children access to quality education, reach their full
              potential, thrive and contribute to sustainable transformation by
              2035.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 bg-[#F15D69] text-white rounded-2xl p-6 md:p-8 shadow-md text-left"
        >
          <div className="flex items-center gap-3 mb-6">
            <HeartHandshake className="w-10 h-10 shrink-0" />
            <h3 className="text-xl font-semibold">Our Values</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-semibold mb-1">People First</p>
              <p className="text-white/95 text-sm leading-relaxed">
                We place the dignity, wellbeing, and potential of people at the
                heart of everything we do.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Inclusion</p>
              <p className="text-white/95 text-sm leading-relaxed">
                We embrace diversity, challenge exclusion, and work to ensure
                everyone has a fair opportunity to thrive.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Integrity</p>
              <p className="text-white/95 text-sm leading-relaxed">
                We act with honesty, transparency, and responsibility, holding
                ourselves accountable for our decisions, commitments, and impact.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Collaboration</p>
              <p className="text-white/95 text-sm leading-relaxed">
                We believe lasting change is built together. We listen, build
                meaningful partnerships, and value diverse perspectives and
                collective action.
              </p>
            </div>
          </div>
        </motion.div>
        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/who-we-are/about-us"
            className="inline-block bg-[#FDBB3E] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#e0a12e] transition"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
