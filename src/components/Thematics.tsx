'use client';

import { motion } from 'framer-motion';
import { GraduationCapIcon, MoneyIcon, GenderIntersexIcon, GavelIcon} from '@phosphor-icons/react';

const thematics = [

  {
    title: 'Quality Education',
    color: '#F15D69',
    icon: <GraduationCapIcon size={40} color="#F15D69" weight="duotone" />,
  },
  {
    title: 'Enterpreneurship',
    color: '#146433ff',
    icon: <MoneyIcon size={40} color="#146433ff" />,
  },
  {
    title: 'Gender Equality & Protection',
    color: '#FDBB3E',
    icon: <GenderIntersexIcon size={40} color="#FDBB3E" />,
  },
  {
    title: 'Policy Advocacy',
    color: '#9B5DE5',
    icon: <GavelIcon size={40} color="#9B5DE5" />,
  }
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {thematics.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl shadow hover:shadow-lg transition"
              style={{ color: item.color }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
