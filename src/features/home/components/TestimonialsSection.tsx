import TestimonialCard, {
  Testimonial,
} from './TestimonialCard';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    rating: 5,
    quote:
      'La calidad de la cerámica y el embalaje libre de plástico superó mis expectativas. Se nota el amor y el pulso manual en cada textura.',
    author: 'Valentina R.',
    location: 'Buenos Aires',
  },
  {
    id: '2',
    rating: 5,
    quote:
      'La manta de lino transformó nuestro dormitorio. Su peso y textura son inigualables, da gusto apoyar proyectos que trabajan con esta nobleza.',
    author: 'Ignacio M.',
    location: 'Córdoba',
  },
  {
    id: '3',
    rating: 5,
    quote:
      'La vela de cedro y vetiver perfuma toda la casa de manera sutil y sin agobiar. El frasco de boticario quedó como florero perfecto.',
    author: 'Camila S.',
    location: 'Rosario',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-space-3xl max-w-[1380px] mx-auto px-margin md:px-margin-desktop">
      {/* Encabezado */}
      <div className="text-center max-w-xl mx-auto mb-space-xl">
        <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block mb-2">
          Voces del Círculo
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary">
          Experiencias en el Hogar
        </h2>
      </div>

      {/* Grid de Reseñas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}