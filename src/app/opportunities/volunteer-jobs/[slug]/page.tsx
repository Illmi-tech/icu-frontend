// src/app/opportunities/volunteer-jobs/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

type VolunteerJob = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_path: string | null;
  date: string;
};

export default async function VolunteerJobDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the volunteer job from your API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const email = process.env.NEXT_PUBLIC_EMAIL
  const res = await fetch(
    `${baseUrl}/api/volunteer-jobs/${slug}`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) return notFound();

  const volunteerJob: VolunteerJob = await res.json();

  if (!volunteerJob) return notFound();

  return (
    <section className="py-16 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {volunteerJob.image_path && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden">
              <Image
                src={volunteerJob.image_path}
                alt={volunteerJob.title}
                fill
                className="object-cover bg-white"
                priority
              />
            </div>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-4">
          {volunteerJob.title}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {new Date(volunteerJob.date).toDateString()}
        </p>
        {/* ✅ Render Quill HTML safely */}
        <div
          className="prose prose-lg max-w-none text-gray-700 blog-content"
          dangerouslySetInnerHTML={{ __html: volunteerJob.content }}
        />
        {/* Apply Button */}
        <div className="flex justify-center md:justify-start">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(volunteerJob.title)}`}
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
