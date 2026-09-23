// src/lib/messaging/templates.ts
import { MessagingIntent, MessagingPayloadMap } from './contracts';

export const messageTemplates: {
  [K in MessagingIntent]: (data: MessagingPayloadMap[K]) => string;
} = {
  ORDER_CHECKOUT: (data) => {
    const itemsText = data.items
      .map((i) => `• ${i.quantity}x ${i.title} ($${(i.price * i.quantity).toLocaleString('es-AR')})`)
      .join('\n');

    return (
      `*¡Nueva Orden ${data.orderNumber ?? 'Pendiente'} - Origen Mates!*\n\n` +
      `*Cliente:* ${data.customer.nombre}\n` +
      `*Teléfono:* ${data.customer.telefono}\n` +
      (data.customer.email ? `*Email:* ${data.customer.email}\n` : '') +
      `*Dirección de Entrega:* ${data.customer.direccion}\n\n` +
      `*Detalle del Pedido:*\n${itemsText}\n\n` +
      `*Subtotal:* $${data.subtotal.toLocaleString('es-AR')}\n` +
      `_(Envío a coordinar según zona)_\n\n` +
      `Hola, acabo de armar mi pedido en la web y quisiera coordinar el pago y el envío. ¡Muchas gracias!`
    );
  },

  PRODUCT_INQUIRY: (data) => {
    return (
      `*Consulta de Producto - Origen Mates*\n\n` +
      `Hola, estoy interesado en la pieza *${data.productTitle}*` +
      (data.productPrice ? ` (${data.productPrice})` : '') +
      `.\n¿Tienen disponibilidad inmediata o tiempo estimado entrega?` +
      (data.productUrl ? `\n\nLink: ${data.productUrl}` : '')
    );
  },

  CUSTOM_ORDER: (data) => {
    return (
      `*Pedido Personalizado - Taller Origen*\n\n` +
      `Hola, quisiera encargar una pieza personalizada con grabado especial / trabajo en alpaca a medida.\n` +
      (data.details ? `Idea inicial: ${data.details}\n` : '') +
      `¿Cómo podríamos coordinar el diseño y presupuesto?`
    );
  },

  GENERAL_SUPPORT: (data) => {
    return (
      `*Atención al Cliente - Origen Mates*\n\n` +
      `Hola, me comunico desde la tienda online para hacer una consulta` +
      (data.subject ? ` sobre *${data.subject}*` : '') +
      `. ¿Podrían asesorarme? Muchas gracias.`
    );
  },
};