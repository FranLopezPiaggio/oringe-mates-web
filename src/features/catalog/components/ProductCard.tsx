'use client';

import Image from 'next/image';
import { useCartStore } from '@/features/cart/store/useCartStore';

export interface Product {
  id: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  isNew?: boolean;
  isTrending?: boolean;
  numericPrice?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const numericPrice =
      product.numericPrice ||
      Number(product.price.replace(/[^0-9]/g, '')) ||
      0;

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      numericPrice,
      imageSrc: product.imageSrc,
    });
  };

  return (
    <article className="group flex flex-col bg-surface border border-outline-variant transition-all duration-200 hover:border-outline">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-low">
        <Image alt={product.imageAlt} className="object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" src={product.imageSrc}/>
        <span className="absolute top-3 left-3 bg-surface text-primary border border-outline-variant px-2 py-0.5 font-label-uppercase text-[10px] uppercase tracking-wider z-10">
          {product.badge}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between border-t border-outline-variant">
        <div>
          <p className="font-label-uppercase text-on-surface-variant uppercase mb-1">
            {product.category}
          </p>
          <h3 className="font-title-editorial text-primary mb-1 group-hover:text-secondary transition-colors">
            {product.title}
          </h3>
          <p className="font-body-sm text-outline mb-3">{product.description}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/60">
          <span className="font-body-md font-semibold text-primary">
            {product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1.5 border border-primary text-primary font-label-uppercase text-[10px] tracking-wider uppercase hover:bg-primary hover:text-on-primary transition-colors duration-150 cursor-pointer"
          >
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}