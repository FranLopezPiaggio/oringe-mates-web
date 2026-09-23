import Image from 'next/image';
import Link from 'next/link';

// Server Component
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-high border-b border-outline-variant">
      <div className="max-w-[1380px] mx-auto px-margin md:px-margin-desktop py-space-2xl md:py-space-3xl grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
        
        {/* Texto & Narrativa Hero */}
        <div className="lg:col-span-6 z-10 space-y-6">
          <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block">
            Edición Limitada • Piezas de Taller
          </span>

          <h1 className="font-display-hero-mobile md:font-display-hero text-[36px] md:text-[56px] text-primary leading-tight">
            La belleza del detalle hecho a mano
          </h1>

          <p className="font-body-lg text-on-surface-variant max-w-lg">
            Piezas orgánicas modeladas lentamente con barro, lino hilado a mano y botánicos puros. Un elogio a la pausa y a los hogares con alma serena.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="#productos"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-container text-on-primary font-label-uppercase tracking-widest uppercase hover:bg-secondary transition-colors duration-200"
            >
              Explorar Colección
            </Link>
            <Link
              href="#manifiesto"
              className="inline-flex items-center justify-center px-6 py-4 border border-primary text-primary font-label-uppercase tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-colors duration-200"
            >
              Ver Manifiesto
            </Link>
          </div>

          {/* Indicadores de Carrusel / Slider Discretos */}
          <div className="pt-8 flex items-center gap-3">
            <button
              aria-label="Slide 1"
              className="w-8 h-[2px] bg-primary transition-all duration-300"
            />
            <button
              aria-label="Slide 2"
              className="w-4 h-[2px] bg-outline-variant hover:bg-primary transition-all duration-300"
            />
            <button
              aria-label="Slide 3"
              className="w-4 h-[2px] bg-outline-variant hover:bg-primary transition-all duration-300"
            />
          </div>
        </div>

        {/* Imagen Hero con marco editorial */}
        <div className="lg:col-span-6 relative lg:mt-0">
          <div className="relative h-full aspect-[4/5] overflow-hidden border border-outline-variant bg-surface-container-low">
            <Image
              src="/mate.jpg"
              alt="An artisanal ceramic vase placed next to draped raw linen textiles"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm border border-outline-variant px-4 py-2 text-right z-10">
              <p className="font-label-uppercase text-[10px] text-secondary tracking-widest uppercase">
                Taller Morelia • 01
              </p>
              <p className="font-title-editorial text-body-sm text-primary italic">
                Arcilla cocida a leña
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}