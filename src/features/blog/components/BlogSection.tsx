import Link from 'next/link';
import BlogPostCard from './HorizontalBlogCard';
import HorizontalBlogCard from './HorizontalBlogCard';

const BLOG_POSTS: HorizontalBlogCard[] = [
  {
    id: '1',
    category: 'Artesanía',
    date: '12 Mayo',
    title: 'El arte del barro negro en los valles centrales',
    excerpt:
      'Recorremos la tradición alfarera milenaria y cómo adaptamos la quema en reducción para nuestras vasijas más silenciosas.',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Burnished dark black clay pottery resting on an old wooden worktable',
    slug: 'arte-del-barro-negro',
  },
  {
    id: '2',
    category: 'Cuidados',
    date: '28 Abril',
    title: 'Guía para cuidar y preservar tus textiles de lino natural',
    excerpt:
      'Consejos sencillos para mantener la caída y suavidad de las fibras naturales con lavados a baja temperatura y jabones neutros.',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Air-drying pure natural linen textiles hanging outdoors',
    slug: 'guia-cuidar-preservar-lino-natural',
  },
  {
    id: '3',
    category: 'Bienestar',
    date: '15 Abril',
    title: 'Aromas que transforman la energía del hogar',
    excerpt:
      'Cómo las notas amaderadas de cedro y vetiver ayudan a calmar el ritmo cotidiano y a crear un espacio de introspección diaria.',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Botanical distillation apparatus with fresh wild herbs and cedarwood',
    slug: 'aromas-transforman-energia-hogar',
  },
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="w-full py-space-2xl bg-surface-container-low border-y border-outline-variant"
    >
      <div className="max-w-[1380px] mx-auto px-margin md:px-margin-desktop">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-xl gap-4">
          <div>
            <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block mb-1">
              Cuaderno de Taller
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary">
              Historias &amp; Procesos
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-label-uppercase text-primary hover:text-secondary transition-colors uppercase tracking-wider pb-1 border-b border-primary"
          >
            Ver todas las publicaciones
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Grid 3 Entradas de Blog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {BLOG_POSTS.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}