// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ALL_POSTS } from '@/features/blog/data/blog';
import { ArrowLeft, Clock } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generación de metadatos dinámicos para SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = ALL_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Artículo no encontrado' };

  return {
    title: `${post.title} • Origen Mates`,
    description: post.excerpt,
  };
}

// Server Component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = ALL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full max-w-[840px] mx-auto px-margin md:px-margin-desktop py-space-2xl md:py-space-3xl">
      {/* Botón Volver */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-label-uppercase text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Historias
      </Link>

      {/* Encabezado del Artículo */}
      <header className="space-y-4 mb-8">
        <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block">
          {post.category}
        </span>
        <h1 className="font-display-hero-mobile md:font-display-hero text-3xl md:text-5xl text-primary leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-outline font-label-uppercase text-[11px] uppercase tracking-wider border-y border-outline-variant py-3">
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
          <span>•</span>
          <span>
            Por {post.author} ({post.authorRole})
          </span>
        </div>
      </header>

      {/* Imagen Principal */}
      <div className="relative w-full aspect-[16/10] overflow-hidden border border-outline-variant bg-surface-container-low mb-10">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          priority
          sizes="(max-width: 840px) 100vw, 840px"
          className="object-cover"
        />
      </div>

      {/* Cuerpo del Artículo */}
      <div className="space-y-6 text-on-surface font-body-lg text-lg leading-relaxed">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Firma de Autor */}
      <footer className="mt-16 pt-8 border-t border-outline-variant flex items-center justify-between">
        <div>
          <p className="font-title-editorial text-lg text-primary">{post.author}</p>
          <p className="font-label-uppercase text-[11px] text-outline uppercase tracking-wider">
            {post.authorRole} • Taller Origen
          </p>
        </div>
        <Link
          href="/productos"
          className="px-6 py-3 border border-primary text-primary font-label-uppercase text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors"
        >
          Explorar Piezas
        </Link>
      </footer>
    </article>
  );
}