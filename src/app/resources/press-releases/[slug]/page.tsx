// src/app/resources/page-releases/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

type PressRelease = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_path: string | null;
  date: string;
};

export default async function PressReleaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the Press Release from your API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(
    `${baseUrl}/api/press-releases/${slug}`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) return notFound();

  const pressRelease: PressRelease = await res.json();

  if (!pressRelease) return notFound();

  return (
    <section className="py-16 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {pressRelease.image_path && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden">
              <Image
                src={pressRelease.image_path}
                alt={pressRelease.title}
                fill
                className="object-cover bg-white"
                priority
              />
            </div>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-4">
          {pressRelease.title}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {new Date(pressRelease.date).toDateString()}
        </p>
       {/* ✅ Render Quill HTML safely */}
        <div
          className="prose prose-lg max-w-none text-gray-700 blog-content"
          dangerouslySetInnerHTML={{ __html: pressRelease.content }}
        />
      </div>
    </section>
  );
}
