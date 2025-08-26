// src/app/stories/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Story } from '@/types/story';
import Image from 'next/image';

const mockStories: Story[] = [
  {
    slug: 'back-to-school-support',
    title: 'Back-to-School Support',
    excerpt: 'ICF helped 50 children return to school with supplies, uniforms, and fees covered.',
    content: 'Full story goes here...',
    image: '/stories/story1.JPG',
    createdAt: '2025-08-01',
  },
  {
    slug: 'community-literacy-program',
    title: 'Community Literacy Program',
    excerpt: 'We launched free literacy classes in underserved rural communities.',
    content: 'Full story goes here...',
    image: '/stories/story3.JPG',
    createdAt: '2025-07-10',
  },
];

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Later this would be an API call
    const sorted = [...mockStories].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setStories(sorted);
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-[#f9fafb] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#F15D69] mb-10"
        >
          Our Stories
        </motion.h2>

        {stories.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No stories yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <Link href={`/resources/blogs/${story.slug}`}>
                    <Image
                        src={story.image}
                        alt={story.title}
                        width={600}
                        height={224}
                        className="w-full h-56 object-cover"
                        placeholder="blur"
                        blurDataURL="/placeholder.jpg" // Optional: Replace with a real low-res placeholder image
                    />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#53CAE9]">{story.title}</h3>
                    <p className="text-gray-600 mt-2">{story.excerpt}</p>
                    <p className="text-sm text-gray-400 mt-2">{new Date(story.createdAt).toDateString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
