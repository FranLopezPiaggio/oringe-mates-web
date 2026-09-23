# TASK: Migración de Estado Global de Carrito a Zustand y Checkout WhatsApp

## Objetivo

Reemplazar el `CartContext` existente por un store global ligero con **Zustand** que incluya persistencia en `localStorage`, conectar el flujo de checkout al generador de mensaje formateado de WhatsApp en el drawer lateral, y limpiar `app/(store)/layout.tsx` eliminando el Provider innecesario.

---

## 1. Dependencias

Ejecutar en la raíz del proyecto:

```bash
npm install zustand zod

```

---

## 2. Creación y Modificación de Archivos

### Archivo 2.1: `src/features/cart/store/useCartStore.ts`

> **Acción**: Crear archivo nuevo con el store de Zustand y persistencia.

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartProductItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  imageSrc: string;
  quantity: number;
}

interface CartState {
  items: CartProductItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Omit<CartProductItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartProductItem[],
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.numericPrice * item.quantity,
          0
        ),
    }),
    {
      name: 'origen-mates-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

```

---

### Archivo 2.2: `src/lib/whatsapp/formatOrder.ts`

> **Acción**: Crear utilidad de formateo de orden para enlace de WhatsApp.

```typescript
import { CartProductItem } from '@/features/cart/store/useCartStore';

export interface CheckoutCustomerData {
  nombre: string;
  telefono: string;
  email?: string;
  direccion: string;
}

export function buildWhatsAppOrderUrl({
  customer,
  items,
  subtotal,
  orderNumber = `OM-${Date.now().toString().slice(-5)}`,
  adminPhone = '5491100000000',
}: {
  customer: CheckoutCustomerData;
  items: CartProductItem[];
  subtotal: number;
  orderNumber?: string;
  adminPhone?: string;
}) {
  const itemsText = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.title} ($${(
          item.numericPrice * item.quantity
        ).toLocaleString('es-AR')})`
    )
    .join('\n');

  const message =
    `*¡Nueva Orden ${orderNumber} - Origen Mates!*\n\n` +
    `*Cliente:* ${customer.nombre}\n` +
    `*Teléfono:* ${customer.telefono}\n` +
    (customer.email ? `*Email:* ${customer.email}\n` : '') +
    `*Dirección de Entrega:* ${customer.direccion}\n\n` +
    `*Detalle del Pedido:*\n${itemsText}\n\n` +
    `*Subtotal:* $${subtotal.toLocaleString('es-AR')}\n` +
    `_(Envío a coordinar según zona)_\n\n` +
    `Hola, acabo de armar mi pedido en la web y quisiera coordinar el medio de pago y el envío. ¡Muchas gracias!`;

  return `[https://wa.me/$](https://wa.me/$){adminPhone}?text=${encodeURIComponent(message)}`;
}

```

---

### Archivo 2.3: `src/features/cart/components/CartTrigger.tsx`

> **Acción**: Modificar para suscribirse a `useCartStore` evitando advertencias de hidratación SSR mediante `useSyncExternalStore`.

```tsx
'use client';

import { useCartStore } from '../store/useCartStore';
import { ShoppingBag } from 'lucide-react';
import { useSyncExternalStore } from 'react';

export default function CartTrigger() {
  const openCart = useCartStore((state) => state.openCart);

  const totalCount = useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().getTotalCount(),
    () => 0
  );

  return (
    <button
      onClick={openCart}
      aria-label="Abrir bolsa de compras"
      className="text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-1.5 relative group cursor-pointer"
    >
      <ShoppingBag className="w-5 h-5"/>
      {totalCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-primary text-surface font-label-uppercase text-[10px] flex items-center justify-center font-semibold">
          {totalCount}
        </span>
      )}
      <span className="sr-only">Carrito con {totalCount} productos</span>
    </button>
  );
}

```

---

### Archivo 2.4: `src/features/cart/components/CartDrawer.tsx`

> **Acción**: Reemplazar consumo de contexto por `useCartStore` y conectar el envío a WhatsApp con `buildWhatsAppOrderUrl`.

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '../store/useCartStore';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp/formatOrder';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalCount,
  } = useCartStore();

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const totalCount = getTotalCount();

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const waUrl = buildWhatsAppOrderUrl({
      customer: formData,
      items,
      subtotal,
    });

    window.open(waUrl, '_blank');
    setIsSubmitting(false);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md sm:max-w-lg bg-surface border-l border-outline-variant shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary"/>
              <h2 className="font-title-editorial text-xl text-primary font-medium">
                Bolsa de Compras
              </h2>
              <span className="font-label-uppercase text-xs text-secondary ml-1">
                ({totalCount})
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Cerrar bolsa"
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5"/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-outline-variant/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-outline stroke-[1]"/>
                <p className="font-title-editorial text-lg text-primary">
                  Tu bolsa está vacía
                </p>
                <p className="font-body-sm text-on-surface-variant max-w-xs">
                  Aún no has seleccionado piezas para tu orden.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-6 py-2.5 bg-primary text-on-primary font-label-uppercase text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-20 h-24 aspect-[3/4] bg-surface-container-low border border-outline-variant shrink-0 overflow-hidden">
                    <Image alt="{item.title}" className="object-cover" fill sizes="80px" src="{item.imageSrc}"/>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-title-editorial text-sm text-primary truncate">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-xs font-semibold text-primary mt-0.5">
                      ${(item.numericPrice * item.quantity).toLocaleString('es-AR')}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-outline-variant">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5"/>
                        </button>
                        <span className="px-2.5 font-label-uppercase text-xs text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5"/>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-error transition-colors p-1 cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-outline-variant bg-surface-container-low p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-xs uppercase tracking-wider text-on-surface-variant">
                  Subtotal estimado
                </span>
                <span className="font-headline-sm text-primary font-semibold text-xl">
                  ${subtotal.toLocaleString('es-AR')}
                </span>
              </div>

              <div className="p-3 bg-surface border border-outline-variant/80 text-center">
                <p className="font-body-sm text-xs text-secondary font-medium">
                  El costo y plazo de envío se coordinará vía WhatsApp
                </p>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-2.5 pt-1">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Nombre y Apellido *"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono / Celular *"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Dirección, Altura y Localidad *"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary text-on-primary font-label-uppercase text-xs tracking-widest uppercase hover:bg-secondary transition-colors duration-200 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Preparando orden...' : 'Enviar Pedido por WhatsApp'}
                </button>
              </form>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

```

---

### Archivo 2.5: `src/features/catalog/components/ProductCard.tsx`

> **Acción**: Modificar para que el botón "Añadir" use `useCartStore`.

```tsx
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
        <Image alt="{product.imageAlt}" className="object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" src="{product.imageSrc}"/>
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

```

---

### Archivo 2.6: `src/app/(store)/layout.tsx`

> **Acción**: Eliminar cualquier referencia a `CartProvider` / `CartContext`. Renderizar layout limpio.

```tsx
import Navbar from '@/features/layout/components/Navbar';
import Footer from '@/features/layout/components/Footer';
import CartDrawer from '@/features/cart/components/CartDrawer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main className="flex-grow">{children}</main>
      <Footer/>
      <CartDrawer/>
    </>
  );
}

```

---

### Archivo 2.7: Limpieza de carpeta obsoleta

> **Acción**: Eliminar el archivo y la carpeta del contexto de React:

```bash
rm -f src/features/cart/context/CartContext.tsx
rmdir src/features/cart/context

```
