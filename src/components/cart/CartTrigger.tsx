'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function CartTrigger() {
  const { openCart, totalCount } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label="Abrir bolsa de compras"
      className="text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-1.5 relative group cursor-pointer"
    >
      <ShoppingBag className="w-5 h-5" />
      {totalCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-primary text-surface font-label-uppercase text-[10px] flex items-center justify-center font-semibold">
          {totalCount}
        </span>
      )}
      <span className="sr-only">Carrito con {totalCount} productos</span>
    </button>
  );
}