'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Replace these with your actual logo paths (from /public/partners)
const partnerLogos = [
  '/partners/logo1.webp',
  '/partners/logo2.png',
  '/partners/logo3.png',
  '/partners/logo4.png',
  '/partners/logo5.webp',
  '/partners/logo6.png',
  '/partners/logo7.jpg',
  '/partners/logo8.webp',
  '/partners/logo9.png',
  '/partners/logo10.png',
];

export default function OurPartners() {
  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#53CAE9] mb-12"
        >
          Our Partners
        </motion.h2>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {/* Duplicate the logos twice for seamless loop */}
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 w-32 h-20 relative">
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
