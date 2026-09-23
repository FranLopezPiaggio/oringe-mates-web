// src/lib/messaging/strategies/whatsapp.strategy.ts
import { MessagingIntent, MessagingPayloadMap, MessagingStrategy } from '../contracts';
import { messageTemplates } from '../templates';

export class WhatsAppStrategy implements MessagingStrategy {
  private phone: string;

  constructor(phone?: string) {
    // Tomamos la variable de entorno o un default de fallback
    this.phone = phone || process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '5493765402968';
  }

  buildUrl<K extends MessagingIntent>(intent: K, data: MessagingPayloadMap[K]): string {
    const templateFn = messageTemplates[intent];
    const message = templateFn(data);
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }
}