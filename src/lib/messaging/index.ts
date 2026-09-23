// src/lib/messaging/index.ts
import { MessagingIntent, MessagingPayloadMap, MessagingStrategy } from './contracts';
import { WhatsAppStrategy } from './strategies/whatsapp.strategy';

// Estrategia por defecto (WhatsApp)
let currentStrategy: MessagingStrategy = new WhatsAppStrategy();

// Permite intercambiar la estrategia si el día de mañana conectas otra cosa
export function setMessagingStrategy(strategy: MessagingStrategy) {
  currentStrategy = strategy;
}

// Función helper para usar en cualquier componente con TypeScript estricto
export function createMessageUrl<K extends MessagingIntent>(
  intent: K,
  data: MessagingPayloadMap[K]
): string {
  return currentStrategy.buildUrl(intent, data);
}

export * from './contracts';