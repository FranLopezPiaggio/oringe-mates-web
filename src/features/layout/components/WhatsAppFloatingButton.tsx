'use client';

import Image from 'next/image';
import { createMessageUrl, MessagingIntent, MessagingPayloadMap } from '@/lib/messaging';

interface WhatsAppFloatingButtonProps {
  intent?: MessagingIntent;
  data?: MessagingPayloadMap[MessagingIntent];
  className?: string;
  iconPath?: string;
}

export default function WhatsAppFloatingButton({
  intent = 'GENERAL_SUPPORT',
  data = {},
  className = '',
  iconPath = '/whatsapp-svgrepo-com.svg', // Ruta a tu SVG descargado en /public
}: WhatsAppFloatingButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = createMessageUrl(intent as any, data as any);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center group ${className}`}
      aria-label="Atención por WhatsApp"
    >
      {/* Tooltip accesible que aparece al hover */}
      <span className="hidden sm:inline-block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-surface text-primary border border-outline-variant px-3 py-1.5 mr-3 font-label-uppercase text-[11px] uppercase tracking-wider shadow-md whitespace-nowrap">
        ¿Dudas? Escríbenos
      </span>

      {/* Botón flotante interactivo */}
      <a
        href="#"
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-10 h-10 bg-white hover:bg-[#20ba59] active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Image
            src={iconPath}
            alt="WhatsApp"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </div>
      </a>
    </div>
  );
}