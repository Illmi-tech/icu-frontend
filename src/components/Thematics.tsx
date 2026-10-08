'use client';

import { motion } from 'framer-motion';
import { BookOpenTextIcon, MegaphoneIcon, BackpackIcon, PlantIcon, ShieldCheckIcon } from '@phosphor-icons/react';

const thematics = [
  {
    title: 'Research & Learning',
    color: '#53CAE9',
    icon: <BookOpenTextIcon size={40} color="#53CAE9" weight="duotone" />,
  },
  {
    title: 'Policy Advocacy',
    color: '#9B5DE5',
    icon: <MegaphoneIcon size={40} color="#9B5DE5" weight="duotone" />,
  },
  {
    title: 'Access and Retention',
    subtitle: '(Basic Education)',
    color: '#F15D69',
    icon: <BackpackIcon size={40} color="#F15D69" weight="duotone" />,
  },
  {
    title: 'Livelihoods & Sustainability',
    color: '#146433ff',
    icon: <PlantIcon size={40} color="#146433ff" weight="duotone" />,
  },
  {
    title: 'Physical/Digital Safety',
    color: '#FDBB3E',
    icon: <ShieldCheckIcon size={40} color="#FDBB3E" weight="duotone" />,
  },
];

export default function Thematics() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#0F5D58]"
        >
          Our Thematic Areas
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {thematics.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] flex flex-col items-center text-center p-6 rounded-2xl shadow hover:shadow-lg transition"
              style={{ color: item.color }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg">
                {item.title}
                {item.subtitle && <span className="block">{item.subtitle}</span>}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
