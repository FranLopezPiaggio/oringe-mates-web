export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="p-8 bg-surface border border-outline-variant flex flex-col justify-between space-y-6">
      {/* Calificación por estrellas */}
      <div className="flex items-center gap-1 text-on-tertiary-container">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <span
            key={index}
            className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        ))}
      </div>

      {/* Cita de la reseña */}
      <p className="font-title-editorial text-body-md text-on-surface leading-relaxed italic">
        “{testimonial.quote}”
      </p>

      {/* Autor y Ubicación */}
      <div className="pt-4 border-t border-outline-variant/60">
        <p className="font-label-uppercase text-body-sm font-semibold text-primary">
          {testimonial.author}
        </p>
        <p className="font-body-sm text-[12px] text-outline">
          {testimonial.location}
        </p>
      </div>
    </div>
  );
}