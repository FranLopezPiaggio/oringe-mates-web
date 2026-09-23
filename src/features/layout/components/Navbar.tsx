import Link from 'next/link';
import { Search, ChevronDown, Heart, ShoppingBag, ShoppingCart } from 'lucide-react';
import CartTrigger from '@/features/cart/components/CartTrigger';

// Server Component
export default function Navbar() {
  return (
    <header className="w-full bg-surface border-b border-outline-variant sticky top-0 z-40">
      {/* FILA 1: Logotipo Central Soberbio */}
      <div className="max-w-[1380px] mx-auto px-margin md:px-margin-desktop pt-6 pb-4 flex flex-col items-center justify-center border-b border-outline-variant/60">
        <Link className="group text-center" href="/">
          <span className="font-display-hero-mobile md:font-headline-lg text-[28px] md:text-[40px] text-primary tracking-tight font-medium uppercase block transition-opacity duration-200 group-hover:opacity-85">
            ORIGEN MATES
          </span>
          <span className="font-label-uppercase text-on-surface-variant tracking-[0.25em] uppercase block mt-1">
            COMPARTIR
          </span>
        </Link>
      </div>

      {/* FILA 2: Búsqueda, Menú Central & Acciones Rápidas */}
      <div className="max-w-[1380px] mx-auto px-margin md:px-margin-desktop h-14 flex items-center justify-between gap-4">
        {/* Izquierda: Búsqueda minimalista */}
        <div className="w-1/4 flex items-center">
          <div className="relative w-full max-w-[240px] hidden sm:flex items-center">
            <Search className="absolute left-0 text-outline pointer-events-none w-4 h-4" />
            <input
              className="w-full pl-7 pr-2 py-1 bg-transparent border-0 border-b border-outline-variant font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors duration-150"
              placeholder="Buscar piezas, esencias..."
              type="text"
            />
          </div>
          <button
            aria-label="Buscar"
            className="sm:hidden p-1 text-on-surface-variant hover:text-primary transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Centro: Navegación Principal */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          <div className="relative group">
            <button className="flex items-center gap-1 font-label-uppercase text-on-surface-variant hover:text-primary transition-colors duration-150 uppercase tracking-wider py-2">
              Categorías
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {/* Dropdown Sutil */}
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-surface-container-lowest border border-outline-variant py-3 px-5 shadow-sm min-w-[180px] z-50">
              <Link
                className="py-1.5 font-body-sm text-on-surface-variant hover:text-primary transition-colors"
                href="#productos"
              >
                Cerámica Artesanal
              </Link>
              <Link
                className="py-1.5 font-body-sm text-on-surface-variant hover:text-primary transition-colors"
                href="#productos"
              >
                Textiles de Lino
              </Link>
              <Link
                className="py-1.5 font-body-sm text-on-surface-variant hover:text-primary transition-colors"
                href="#productos"
              >
                Botánica &amp; Velas
              </Link>
              <Link
                className="py-1.5 font-body-sm text-on-surface-variant hover:text-primary transition-colors"
                href="#productos"
              >
                Vajilla de Arcilla
              </Link>
            </div>
          </div>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-label-uppercase tracking-wider uppercase"
            href="#blog"
          >
            Blog
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-label-uppercase tracking-wider uppercase"
            href="#manifiesto"
          >
            Nosotros
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-label-uppercase tracking-wider uppercase"
            href="#footer"
          >
            Contacto
          </Link>
        </nav>

        {/* Derecha: Acciones Rápidas (Favoritos & Carrito) */}
        <div className="w-1/4 flex items-center justify-end gap-5">
          {/* <Link
            aria-label="Favoritos"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 relative"
            href="#"
          >
            <Heart className="w-5 h-5" />
            <span className="sr-only">Favoritos</span>
          </Link> */}
          <CartTrigger />
        </div>
      </div>
    </header>
  );
}