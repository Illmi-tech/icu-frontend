'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Walk in Their Shoes',
    desc: 'A campaign supporting out-of-school children across Nigeria through a digital crowdfunding initiative. Over 800 scholarships awarded.',
    img: '/projects/wits/wits1.webp',
    link: '/our-projects/wits',
  },
  {
    title: 'Community Cluster Learning Model (CCLM)',
    desc: 'Providing basic literacy, vocational training, and financial inclusion strategies for underserved communities, including Fulani and IDP camps.',
    img: '/projects/cclm/cclm1.webp',
    link: '/our-projects/cclm',
  },
  {
    title: 'Training, Advocacy, Research, Mentorship (TARM)',
    desc: 'Enhancing education quality and safety for adolescent girls by equipping female teachers as mentors.',
    img: '/projects/tarm/hero.webp',
    link: '/our-projects/tarm',
  },
  {
    title: 'DIGITGALS',
    desc: 'Equipping female students in public schools with essential digital skills through NITDA partnerships.',
    img: '/projects/digitgals/dg3.webp',
    link: '/our-projects/digitgals',
  },
  {
    title: 'Ambassador Special Self-Help (ASSH)',
    desc: 'Supporting vulnerable Fulani groups through dairy production training, financial literacy, and sustainable livelihoods.',
    img: '/projects/assh/hero.webp',
    link: '/our-projects/assh',
  },
  {
    title: 'Adolescent Safety in all Spaces (ASIS)',
    desc: 'Addressing gender-based violence in schools and online, creating safe learning environments for adolescent girls.',
    img: '/projects/asis/asis1.webp',
    link: '/our-projects/asis',
  },
];

export default function Projects() {
  return (
    <section className="py-16 px-4 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#FDBB3E] text-center mb-12"
        >
          Our Impact Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#53CAE9] mb-2">{project.title}</h3>
                <p className="text-gray-700">{project.desc}</p>

                <div className="mt-4">
                  <Link
                    href={project.link}
                    className="inline-block bg-[#FDBB3E] text-white px-4 py-2 rounded-md font-medium hover:bg-[#e0a12e] transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
