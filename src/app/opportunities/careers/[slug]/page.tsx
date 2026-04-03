// src/app/opportunities/careers/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

type Career = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_path: string | null;
  date: string;
};

export default async function CareerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the career from your API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const email = process.env.NEXT_PUBLIC_EMAIL
  const res = await fetch(
    `${baseUrl}/api/careers/${slug}`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) return notFound();

  const career: Career = await res.json();

  if (!career) return notFound();

  return (
    <section className="py-16 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {career.image_path && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden">
              <Image
                src={career.image_path}
                alt={career.title}
                fill
                className="object-cover bg-white"
                priority
              />
            </div>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-4">
          {career.title}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {new Date(career.date).toDateString()}
        </p>
        {/* ✅ Render Quill HTML safely */}
        <div
          className="prose prose-lg max-w-none text-gray-700 blog-content"
          dangerouslySetInnerHTML={{ __html: career.content }}
        />
        {/* Apply Button */}
        <div className="flex justify-center md:justify-start">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(career.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-[#FDBB3E] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#e0a732] transition-colors text-center"
        >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
