// src/lib/messaging/contracts.ts

export type MessagingIntent = 
  | 'ORDER_CHECKOUT'
  | 'PRODUCT_INQUIRY'
  | 'CUSTOM_ORDER'
  | 'GENERAL_SUPPORT';

export interface MessagingPayloadMap {
  ORDER_CHECKOUT: {
    orderNumber?: string;
    customer: {
      nombre: string;
      telefono: string;
      email?: string;
      direccion: string;
    };
    items: Array<{ title: string; quantity: number; price: number }>;
    subtotal: number;
  };
  PRODUCT_INQUIRY: {
    productTitle: string;
    productPrice?: string;
    productUrl?: string;
  };
  CUSTOM_ORDER: {
    details?: string;
  };
  GENERAL_SUPPORT: {
    subject?: string;
  };
}

export interface MessagingStrategy {
  buildUrl<K extends MessagingIntent>(intent: K, data: MessagingPayloadMap[K]): string;
}