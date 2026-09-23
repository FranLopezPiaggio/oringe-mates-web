'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalCount } =
    useCart();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Formatear mensaje para WhatsApp o API
    const itemsSummary = items
      .map((i) => `• ${i.quantity}x ${i.title} ($${(i.numericPrice * i.quantity).toLocaleString('es-AR')})`)
      .join('%0A');

    const message = `*Nuevo Pedido - Origen Mates*%0A%0A` +
      `*Cliente:* ${formData.nombre}%0A` +
      `*Teléfono:* ${formData.telefono}%0A` +
      (formData.email ? `*Email:* ${formData.email}%0A` : '') +
      `*Dirección:* ${formData.direccion}%0A%0A` +
      `*Pedido:*%0A${itemsSummary}%0A%0A` +
      `*Subtotal:* $${subtotal.toLocaleString('es-AR')}%0A` +
      `_(Envío a coordinar)_`;

    // Abrir WhatsApp con el pedido listo (reemplaza por tu número)
    const phone = '5491100000000';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop oscuro translúcido */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* Drawer deslizante derecho */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md sm:max-w-lg bg-surface border-l border-outline-variant shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header del Carrito */}
          <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
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
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Productos o Carrito Vacío */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-outline-variant/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-outline stroke-[1]" />
                <p className="font-title-editorial text-lg text-primary">
                  Tu bolsa está vacía
                </p>
                <p className="font-body-sm text-on-surface-variant max-w-xs">
                  Aún no has agregado ninguna pieza a tu orden.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 px-6 py-2.5 bg-primary text-on-primary font-label-uppercase text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
                >
                  Explorar Piezas
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-20 h-24 aspect-[3/4] bg-surface-container-low border border-outline-variant shrink-0 overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-title-editorial text-sm text-primary truncate">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-xs font-semibold text-primary mt-0.5">
                      ${(item.numericPrice * item.quantity).toLocaleString('es-AR')}
                    </p>

                    {/* Controles de Cantidad */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-outline-variant">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-label-uppercase text-xs text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-error transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal + Mensaje de Envío + Checkout Form */}
          {items.length > 0 && (
            <div className="border-t border-outline-variant bg-surface-container-low p-6 space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-label-uppercase text-xs uppercase tracking-wider text-on-surface-variant">
                  Subtotal
                </span>
                <span className="font-headline-sm text-primary font-semibold">
                  ${subtotal.toLocaleString('es-AR')}
                </span>
              </div>

              {/* Mensaje de envío */}
              <div className="p-3 bg-surface border border-outline-variant/80 text-center">
                <p className="font-body-sm text-xs text-secondary font-medium">
                  El envío se calculará una vez envíes el pedido
                </p>
              </div>

              {/* Formulario de Checkout */}
              <form onSubmit={handleOrderSubmit} className="space-y-3 pt-2">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo *"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono / WhatsApp *"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email (opcional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Campo de dirección (listo para conectar autocomplete) */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Dirección y Ciudad de entrega *"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary text-on-primary font-label-uppercase text-xs tracking-widest uppercase hover:bg-secondary transition-colors duration-200 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Procesando...' : 'Enviar Pedido'}
                </button>
              </form>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
}