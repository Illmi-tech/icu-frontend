"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Spinner";

type NewsletterIssue = {
  id: number;
  slug: string;
  title: string;
  image_path?: string;
  pdf_path: string;
  date: string;
};

export default function NewsletterPage() {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/newsletter-issues");
        if (!res.ok) throw new Error("Failed to fetch newsletters");
        const data: NewsletterIssue[] = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setIssues(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
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
          Our Newsletters
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size={4} color="#53CAE9" />
          </div>
        ) : issues.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No newsletters yet. Check back soon!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {issues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={issue.pdf_path}
                  target="_blank"
                  className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                >
                  {issue.image_path && (
                    <Image
                      src={issue.image_path}
                      alt={issue.title}
                      width={600}
                      height={224}
                      className="w-full h-56 object-cover"
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#53CAE9]">
                      {issue.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(issue.date).toDateString()}
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
