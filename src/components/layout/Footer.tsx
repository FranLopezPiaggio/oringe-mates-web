import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant" id="footer">
      <div className="max-w-[1380px] mx-auto px-margin md:px-margin-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {/* Columna 1: Logo & Redes */}
          <div className="space-y-4">
            <span className="font-title-editorial text-headline-sm uppercase text-primary block">
              ATELIER MORELIA
            </span>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Taller artesanal de piezas de cerámica, textiles en hilado lento y botánica consciente para el hogar sereno.
            </p>
            <div className="flex items-center gap-4 pt-2 text-on-surface-variant">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <span className="font-label-uppercase text-label-uppercase tracking-wider">Instagram</span>
              </a>
              <span className="text-outline-variant">•</span>
              <a
                href="#"
                aria-label="Pinterest"
                className="hover:text-primary transition-colors"
              >
                <span className="font-label-uppercase text-label-uppercase tracking-wider">Pinterest</span>
              </a>
              <span className="text-outline-variant">•</span>
              <a
                href="#"
                aria-label="Spotify"
                className="hover:text-primary transition-colors"
              >
                <span className="font-label-uppercase text-label-uppercase tracking-wider">Spotify</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación & FAQ */}
          <div className="space-y-3">
            <h3 className="font-label-uppercase text-label-uppercase text-primary uppercase tracking-widest font-semibold mb-2">
              Navegación &amp; FAQ
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#productos" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Colecciones de Temporada
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Envíos y Entregas
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Guía de Tallas &amp; Cuidados
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Stockists &amp; Puntos de Venta
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legales */}
          <div className="space-y-3">
            <h3 className="font-label-uppercase text-label-uppercase text-primary uppercase tracking-widest font-semibold mb-2">
              Legales &amp; Transparencia
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Términos &amp; Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Políticas de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Cambios y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Defensa del Consumidor
                </Link>
              </li>
              <li>
                <Link href="#" className="font-body-sm text-on-surface-variant hover:text-primary transition-colors">
                  Shipping &amp; Provenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto & Showroom */}
          <div className="space-y-3">
            <h3 className="font-label-uppercase text-label-uppercase text-primary uppercase tracking-widest font-semibold mb-2">
              Contacto &amp; Showroom
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Pasaje de los Artesanos 420<br />
              San Telmo, Buenos Aires, Argentina
            </p>
            <p className="font-body-sm text-on-surface-variant">
              Miércoles a Sábados: 11:00 a 19:00 hs
            </p>
            <div className="pt-2 space-y-1 font-body-sm">
              <p>
                <a href="tel:+541145678900" className="text-primary hover:underline">
                  +54 (11) 4567-8900
                </a>
              </p>
              <p>
                <a href="mailto:hola@ateliermorelia.com" className="text-primary hover:underline">
                  hola@ateliermorelia.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Barra inferior de copyright y sellos */}
        <div className="mt-12 pt-6 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-[12px] text-outline text-center md:text-left">
            © 2025 Atelier Morelia. All rights reserved. Handcrafted slowly and sustainably.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-label-uppercase text-[10px] text-outline tracking-wider uppercase">
              Pago Seguro SSL
            </span>
            <div className="flex items-center gap-3 text-outline">
              <span className="material-symbols-outlined text-xl" title="Tarjetas de crédito y débito">
                credit_card
              </span>
              <span className="material-symbols-outlined text-xl" title="Pagos bancarios">
                account_balance
              </span>
              <span className="material-symbols-outlined text-xl" title="Embalaje seguro y sustentable">
                package_2
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}