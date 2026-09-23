import { CartProductItem } from '@/features/cart/store/useCartStore';

export interface CheckoutCustomerData {
  nombre: string;
  telefono: string;
  email?: string;
  direccion: string;
}

const whatsappNumber = process.env.WHATSAPP_NUMBER 

export function buildWhatsAppOrderUrl({
  customer,
  items,
  subtotal,
  orderNumber = `OM-${Date.now().toString().slice(-5)}`,
  adminPhone = whatsappNumber,
}:{
  customer: CheckoutCustomerData;
  items: CartProductItem[];
  subtotal: number;
  orderNumber?: string;
  adminPhone?: string;
}){
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

  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
}
