'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Spinner from '@/components/Spinner';

type Report = {
  id: number;
  slug: string;
  title: string;
  image_path?: string;
  pdf_path: string;
  date: string;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/reports');
        if (!res.ok) throw new Error('Failed to fetch reports');
        const data: Report[] = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setReports(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
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
          Our Reports
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size={4} color="#53CAE9" />
          </div>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No reports yet. Check back soon!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {reports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={report.pdf_path}
                  className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                >
                  {report.image_path && (
                    <Image
                      src={report.image_path}
                      alt={report.title}
                      width={600}
                      height={224}
                      className="w-full h-56 object-cover"
                      placeholder="blur"
                      blurDataURL="/placeholder.jpg"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#53CAE9]">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(report.date).toDateString()}
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
