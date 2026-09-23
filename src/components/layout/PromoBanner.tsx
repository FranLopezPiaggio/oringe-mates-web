import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-primary-container text-on-primary py-space-xl border-y border-outline">
      <div className="max-w-[1380px] mx-auto px-margin md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <span className="font-label-uppercase text-label-uppercase text-primary-fixed tracking-[0.2em] uppercase block">
            Temporada Otoño / Invierno
          </span>
          <h2 className="font-headline-sm text-headline-sm text-surface-bright">
            15% de descuento adicional abonando mediante transferencia bancaria
          </h2>
          <p className="font-body-sm text-body-sm text-on-primary-container">
            Válido en todo el catálogo de piezas únicas, textiles y colecciones botánicas.
          </p>
        </div>

        <Link
          href="#productos"
          className="shrink-0 px-7 py-3 border border-surface-bright text-surface-bright font-label-uppercase text-label-uppercase tracking-widest uppercase hover:bg-surface-bright hover:text-primary transition-colors duration-200"
        >
          Ver Promociones
        </Link>
      </div>
    </section>
  );
}