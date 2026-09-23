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
                    <Image alt={item.title} className="object-cover" fill sizes="80px" src={item.imageSrc}/>
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