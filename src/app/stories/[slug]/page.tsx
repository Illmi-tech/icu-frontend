// src/app/stories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Story } from '@/types/story';
import Image from 'next/image';

const mockStories: Story[] = [
  {
    slug: 'back-to-school-support',
    title: 'Back-to-School Support',
    excerpt: 'Short description...',
    content: 'Full detailed content for back-to-school support...',
    image: '/stories/story1.jpg',
    createdAt: '2025-08-01',
  },
  {
    slug: 'community-literacy-program',
    title: 'Community Literacy Program',
    excerpt: 'We launched free literacy classes in underserved rural communities.',
    content: 'Full detailed content for Community Literacy Program...',
    image: '/stories/story3.jpg',
    createdAt: '2025-07-10',
  },
];


export default async function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  const story = mockStories.find((s) => s.slug === slug);

  if (!story) return notFound();

  return (
    <section className="py-16 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Image
            src={story.image}
            alt={story.title}
            width={1200}
            height={400}
            className="w-full h-80 object-cover rounded-xl mb-6"
            priority
        />
        <h1 className="text-3xl md:text-4xl font-bold text-[#F15D69] mb-4">{story.title}</h1>
        <p className="text-sm text-gray-400 mb-6">{new Date(story.createdAt).toDateString()}</p>
        <p className="text-gray-700 leading-7 whitespace-pre-line">{story.content}</p>
      </div>
    </section>
  );
}
