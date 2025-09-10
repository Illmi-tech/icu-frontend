// src/app/resources/blogs/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Spinner from '@/components/Spinner';

// This should match the Blog type returned by your API
type Blog = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_path: string;
  date: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs'); // Adjust if your API is deployed separately
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data: Blog[] = await res.json();

        // Sort by newest first
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogs(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
          Our Blogs
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            {/* Simple spinner */}
            <Spinner size={4} color='#53CAE9' />
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blogs yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <Link href={`/resources/blogs/${blog.slug}`}>
                  <Image
                    src={blog.image_path}
                    alt={blog.title}
                    width={600}
                    height={224}
                    className="w-full h-56 object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg" // Optional
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#53CAE9]">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{blog.excerpt}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(blog.date).toDateString()}
                    </p>
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
