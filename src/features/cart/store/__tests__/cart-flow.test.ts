// src/features/cart/store/__tests__/cart-flow.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../useCartStore';
import { buildWhatsAppOrderUrl } from '@/lib/messaging/formatOrder';

describe('BDD: Flujo de Carrito y Checkout WhatsApp', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.getState().closeCart();
    localStorage.clear();
  });

  it('debe añadir un producto, calcular subtotal y abrir el drawer', () => {
    const store = useCartStore.getState();

    store.addItem({
      id: 'prod-1',
      title: 'Mate Imperial Calabaza',
      price: '$45.000',
      numericPrice: 45000,
      imageSrc: '/img.jpg',
    });

    const updated = useCartStore.getState();
    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].quantity).toBe(1);
    expect(updated.getTotalCount()).toBe(1);
    expect(updated.getSubtotal()).toBe(45000);
    expect(updated.isOpen).toBe(true);
  });

  it('debe incrementar la cantidad sin duplicar fila si el producto ya existe', () => {
    const store = useCartStore.getState();
    const product = {
      id: 'prod-1',
      title: 'Mate Imperial Calabaza',
      price: '$45.000',
      numericPrice: 45000,
      imageSrc: '/img.jpg',
    };

    store.addItem(product);
    store.addItem(product);

    const updated = useCartStore.getState();
    expect(updated.items).toHaveLength(1);
    expect(updated.items[0].quantity).toBe(2);
    expect(updated.getTotalCount()).toBe(2);
    expect(updated.getSubtotal()).toBe(90000);
  });

  it('debe decrementar y remover el producto al llegar a 0', () => {
    const store = useCartStore.getState();
    store.addItem({
      id: 'prod-1',
      title: 'Mate Imperial',
      price: '$45.000',
      numericPrice: 45000,
      imageSrc: '/img.jpg',
    });

    store.updateQuantity('prod-1', -1);

    const updated = useCartStore.getState();
    expect(updated.items).toHaveLength(0);
    expect(updated.getTotalCount()).toBe(0);
    expect(updated.getSubtotal()).toBe(0);
  });

  it('debe generar una URL de WhatsApp válida y con los parámetros codificados', () => {
    const customer = {
      nombre: 'Franco López',
      telefono: '3764000000',
      direccion: 'Posadas, Misiones',
      email: 'test@origenmates.com',
    };

    const items = [
      {
        id: '1',
        title: 'Mate Imperial Calabaza',
        price: '$45.000',
        numericPrice: 45000,
        imageSrc: '/img.jpg',
        quantity: 2,
      },
    ];

    const url = buildWhatsAppOrderUrl({
      customer,
      items,
      subtotal: 90000,
      adminPhone: '5491100000000',
      orderNumber: 'OM-99999',
    });

    expect(url).toContain('https://wa.me/5491100000000?text=');
    const decodedUrl = decodeURIComponent(url);
    expect(decodedUrl).toContain('OM-99999');
    expect(decodedUrl).toContain('Franco López');
    expect(decodedUrl).toContain('2x Mate Imperial Calabaza');
    expect(decodedUrl).toContain('$90.000');
  });
});