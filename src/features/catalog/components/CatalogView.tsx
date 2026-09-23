'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/features/catalog/components/ProductCard';
import { CATALOG_PRODUCTS, CatalogProduct } from '@/features/catalog/data/catalog';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

const CATEGORIES = ['Todas', 'Mates', 'Bombillas', 'Accesorios', 'Yerbas'];
const ITEMS_PER_PAGE = 4;

export default function CatalogView() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortOrder, setSortOrder] = useState<'featured' | 'asc' | 'desc'>('featured');
  const [maxPrice, setMaxPrice] = useState(70000);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    let result = CATALOG_PRODUCTS.filter((prod) => {
      const matchCategory =
        selectedCategory === 'Todas' || prod.category === selectedCategory;
      const matchPrice = prod.numericPrice <= maxPrice;
      return matchCategory && matchPrice;
    });

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    }

    return result;
  }, [selectedCategory, sortOrder, maxPrice]);

  // Cálculo de Paginación
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePriceChange = (val: number) => {
    setMaxPrice(val);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-[1380px] mx-auto px-margin md:px-margin-desktop py-space-xl">
      {/* Encabezado del catálogo */}
      <div className="border-b border-outline-variant pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-uppercase text-secondary tracking-[0.2em] uppercase block mb-2">
            Catálogo Permanente
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary">
            Colección de Piezas Criollas
          </h1>
        </div>

        {/* Barra superior de controles: Botón filtro mobile y select de orden */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface font-label-uppercase text-xs uppercase"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>

          <div className="flex items-center gap-2">
            <span className="font-label-uppercase text-on-surface-variant text-[11px] uppercase tracking-wider hidden sm:inline">
              Ordenar:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as 'featured' | 'asc' | 'desc');
                setCurrentPage(1);
              }}
              className="bg-surface border border-outline-variant px-3 py-2 text-body-sm text-on-surface font-body-sm focus:outline-none focus:border-primary"
            >
              <option value="featured">Destacados</option>
              <option value="asc">Precio: Menor a Mayor</option>
              <option value="desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
        {/* ASIDE DE FILTROS (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 border border-outline-variant bg-surface p-6 space-y-8 sticky top-28">
          <div>
            <h3 className="font-label-uppercase text-primary text-xs uppercase tracking-widest font-semibold pb-3 border-b border-outline-variant mb-4">
              Categorías
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left font-body-sm transition-colors py-1 cursor-pointer ${
                      selectedCategory === cat
                        ? 'text-primary font-semibold'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label-uppercase text-primary text-xs uppercase tracking-widest font-semibold pb-3 border-b border-outline-variant mb-4">
              Precio Máximo
            </h3>
            <input
              type="range"
              min={7000}
              max={70000}
              step={1000}
              value={maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between items-center text-body-sm text-on-surface-variant mt-2 font-medium">
              <span>$7.000</span>
              <span className="text-primary font-semibold">${maxPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </aside>

        {/* MODAL / DRAWER DE FILTROS EN MOBILE */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end lg:hidden">
            <div className="w-[85%] max-w-xs bg-surface h-full p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
                  <h3 className="font-label-uppercase text-primary text-xs uppercase tracking-widest font-semibold">
                    Filtros
                  </h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-1 text-on-surface-variant"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h4 className="font-label-uppercase text-on-surface-variant text-[11px] uppercase tracking-wider mb-3">
                    Categorías
                  </h4>
                  <div className="flex flex-col gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          handleCategoryChange(cat);
                          setIsMobileFiltersOpen(false);
                        }}
                        className={`text-left text-body-sm py-1.5 ${
                          selectedCategory === cat
                            ? 'text-primary font-semibold'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-label-uppercase text-on-surface-variant text-[11px] uppercase tracking-wider mb-2">
                    Precio Máximo: ${maxPrice.toLocaleString('es-AR')}
                  </h4>
                  <input
                    type="range"
                    min={7000}
                    max={70000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-primary text-on-primary font-label-uppercase text-xs tracking-widest uppercase mt-6"
              >
                Ver {filteredProducts.length} Resultados
              </button>
            </div>
          </div>
        )}

        {/* COLUMNA DEL GRID & PAGINACIÓN */}
        <section className="lg:col-span-9 flex flex-col justify-between min-h-[600px]">
          {paginatedProducts.length > 0 ? (
            <div>
              {/* Grid 4 Columnas adaptativo (1 col en mobile, 2 en sm/md, 4 en lg/xl) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
                {paginatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              {/* PAGINACIÓN CONTROLADA */}
              <div className="mt-12 pt-6 border-t border-outline-variant flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-3 py-2 border border-outline-variant text-body-sm text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-label-uppercase text-[11px] uppercase">Anterior</span>
                </button>

                <div className="flex items-center gap-1.5 font-label-uppercase text-xs text-on-surface-variant">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center border transition-all ${
                          isActive
                            ? 'bg-primary text-on-primary border-primary font-semibold'
                            : 'border-outline-variant text-on-surface-variant hover:border-outline'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-3 py-2 border border-outline-variant text-body-sm text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
                >
                  <span className="hidden sm:inline font-label-uppercase text-[11px] uppercase">Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border border-dashed border-outline-variant bg-surface-container-low my-auto">
              <p className="font-title-editorial text-body-lg text-primary mb-2">
                No encontramos piezas con los filtros aplicados.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Todas');
                  setMaxPrice(70000);
                  setCurrentPage(1);
                }}
                className="mt-4 px-6 py-2.5 bg-primary text-on-primary font-label-uppercase text-xs uppercase tracking-wider"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}