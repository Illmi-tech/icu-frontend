'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const stories = [
  {
    title: "International Women's Day",
    description:
      "Celebrating women’s achievements and promoting gender equality with ICF’s impactful initiatives.",
    image: "/stories/iwd/iwd1.webp",
    link: "/our-stories/iwd",
  },
  {
    title: "16 Days of Activism",
    description:
      "ICF conducted outreach across 16 Abuja schools, educating students on GBV, rights, and inclusivity.",
    image: "/stories/16-days-of-activism/doa1.webp",
    link: "/our-stories/16-days-of-activism",
  },
  {
    title: "International Day of the Girl Child ",
    description:
      "An essay competition empowered peer advocates to amplify girls’ voices in the fight against GBV.",
    image: "/stories/idgc/idgc3.webp",
    link: "/our-stories/idgc",
  },
  {
    title: "Safe Space for Girls",
    description:
      "Our new safe space provides mentorship and protection for girls facing abuse.",
    image: "/projects/asis/asis4.webp",
    link: "/our-projects/asis",
  },
];

export default function OurStories() {
  return (
    <section id="stories" className="bg-[#f9fafb] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#F15D69] mb-12"
        >
          Our Stories
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative w-full h-56">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill                      // <-- Tells Image to fill the parent container
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"               // <-- Adds responsive size hints
                  priority={index === 0}     // <-- Loads the first image eagerly for faster display
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#53CAE9] mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-700 text-sm">{story.description}</p>

                <div className="mt-4">
                  <Link
                    href={story.link}
                    className="inline-block bg-[#FDBB3E] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#e0a12e] transition"
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
