'use client';

import { useState } from 'react';
import ProductCard, { Product } from '../../catalog/components/ProductCard';

type FilterType = 'all' | 'new' | 'trending';

const PRODUCTS: Product[] = [
  {
    id: '1',
    badge: 'Artesanal',
    category: 'Cerámica',
    title: 'Florero Cerámica Ocre',
    description: 'Gres tostado, esmalte mate al agua',
    price: '$34.500',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Handmade ochre ceramic vase with a textured matte glaze',
    isTrending: true,
  },
  {
    id: '2',
    badge: 'Lino Puro',
    category: 'Textiles',
    title: 'Manta de Lino Lavado',
    description: '100% lino europeo prelavado a la piedra',
    price: '$58.000',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Folded natural washed linen throw blanket resting gracefully',
    isTrending: true,
  },
  {
    id: '3',
    badge: 'Botánica',
    category: 'Aromaterapia',
    title: 'Vela Botánica Vetiver & Cedro',
    description: 'Cera de soja virgen, mecha de algodón',
    price: '$19.200',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Hand-poured soy wax botanical candle in dark amber glass',
    isTrending: true,
  },
  {
    id: '4',
    badge: 'Set de Taller',
    category: 'Vajilla',
    title: 'Set Vajilla Arcilla Natural (4 piezas)',
    description: '2 platos llanos y 2 cuencos profundos',
    price: '$72.000',
    imageSrc:
      '/mate.jpg',
    imageAlt: 'Curated set of four handcrafted raw clay tableware plates and bowls',
    isTrending: true,
  },
];

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'new', label: 'Novedades' },
  { id: 'trending', label: 'Más Vendidos' },
];

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filtrado de la lista en memoria según la pestaña activa
  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === 'new') return product.isNew;
    if (activeFilter === 'trending') return product.isTrending;
    return true;
  });

  return (
    <section
      id="productos"
      className="w-full py-space-2xl md:py-space-3xl max-w-[1380px] mx-auto px-margin md:px-margin-desktop"
    >
      {/* Encabezado de Sección */}
      <div className="text-center max-w-2xl mx-auto mb-space-xl">
        <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block mb-2">
          Piezas Seleccionadas
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-[28px] md:text-[40px] text-primary mb-3">
          Objetos atemporales creados a fuego lento
        </h2>
        <p className="font-body-md text-on-surface-variant">
          Cada elemento guarda la impronta irrepetible del torno, el telar y los extractos botánicos de estación.
        </p>

        {/* Botones de Filtro / Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 font-label-uppercase text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-outline hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid 4 Columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Estado vacío cuando ningún producto cumple el filtro */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant font-body-md">
          No hay productos disponibles en esta categoría por el momento.
        </div>
      )}
    </section>
  );
}