// src/app/blog/page.tsx
import type { Metadata } from 'next';
import HorizontalBlogCard from '@/features/blog/components/HorizontalBlogCard';
import { ALL_POSTS } from '@/features/blog/data/blog';

export const metadata: Metadata = {
  title: 'Cuaderno de Taller • Historias & Procesos | Origen Mates',
  description: 'Crónicas de alfarería, métodos de secado, botánica y vida cotidiana en torno al mate.',
};

export default function BlogIndexPage() {
  // Ordenar cronológicamente descendente
  const sortedPosts = [...ALL_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto px-margin md:px-margin-desktop py-space-2xl md:py-space-3xl">
      <div className="text-center max-w-2xl mx-auto mb-space-2xl">
        <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block mb-2">
          Cuaderno de Taller
        </span>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-4">
          Historias, Procesos &amp; Pausa
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Reflexiones sobre el oficio manual, el rescate de técnicas ancestrales y el ritual compartido del mate.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {sortedPosts.map((post) => (
          <HorizontalBlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}