// src/app/resources/page-releases/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

type PageRelease = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_path: string | null;
  date: string;
};

export default async function PageReleaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the Page Release from your API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(
    `${baseUrl}/api/press-releases/${slug}`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) return notFound();

  const pageRelease: PageRelease = await res.json();

  if (!pageRelease) return notFound();

  return (
    <section className="py-16 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {pageRelease.image_path && (
          <div className="w-full h-64 md:h-96 relative mb-8 rounded-xl">
            <Image
              src={pageRelease.image_path}
              alt={pageRelease.title}
              fill
              className="object-contain bg-white-100 rounded-lg"
              priority
            />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-4">
          {pageRelease.title}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {new Date(pageRelease.date).toDateString()}
        </p>
        <p className="text-gray-700 leading-7 whitespace-pre-line">
          {pageRelease.content}
        </p>
      </div>
    </section>
  );
}
