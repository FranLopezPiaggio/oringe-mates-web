import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { FullBlogPost } from '@/features/blog/data/blog';

interface HorizontalBlogCardProps {
  post: FullBlogPost;
}

export default function HorizontalBlogCard({ post }: HorizontalBlogCardProps) {
  return (
    <article className="group bg-surface border border-outline-variant hover:border-outline transition-all duration-300 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
      {/* Imagen lateral */}
      <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto h-full min-h-[220px] bg-surface-container-low overflow-hidden">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-surface text-primary border border-outline-variant px-2.5 py-0.5 font-label-uppercase text-[10px] tracking-wider uppercase z-10">
          {post.category}
        </span>
      </div>

      {/* Contenido Editorial */}
      <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-outline font-label-uppercase text-[11px] uppercase tracking-wider mb-2">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>

          <h2 className="font-title-editorial text-xl md:text-2xl text-primary group-hover:text-secondary transition-colors mb-3 leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p className="font-body-sm text-on-surface-variant line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between">
          <span className="font-body-sm text-xs text-outline italic">
            Por {post.author}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 font-label-uppercase text-xs text-primary group-hover:text-secondary transition-colors uppercase tracking-wider font-medium"
          >
            Leer artículo completo
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}